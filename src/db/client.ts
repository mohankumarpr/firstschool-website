import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let instance: PostgresJsDatabase<typeof schema> | null = null;

function getDb(): PostgresJsDatabase<typeof schema> {
  if (!instance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set.");
    }
    // prepare: false — required when DATABASE_URL points at a pooled/PgBouncer
    // connection (e.g. Neon's pooled connection string on Vercel), which doesn't
    // support prepared statements. Harmless against a direct Postgres connection too.
    instance = drizzle(postgres(process.env.DATABASE_URL, { prepare: false }), { schema });
  }
  return instance;
}

// Proxied so importing this module never requires DATABASE_URL to be set —
// the connection is only created (and only then needs the env var) the first
// time a query actually runs. Without this, simply importing this module
// (e.g. while a build tool collects route metadata) throws before any
// request-time environment variables are even in scope.
export const db: PostgresJsDatabase<typeof schema> = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop);
    // Bind so methods keep `this` pointing at the real instance, not this proxy —
    // otherwise Drizzle's internal state access breaks when called as db.select() etc.
    return typeof value === "function" ? value.bind(real) : value;
  },
});
