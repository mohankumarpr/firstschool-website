import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b2038] px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-xl font-bold text-[#0b2038]">
          First School Admin
        </h1>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            Incorrect password.
          </p>
        )}
        <label className="mb-1 block text-sm font-medium text-[#0b2038]">Password</label>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mb-4 w-full rounded-lg border border-black/10 px-3 py-2 outline-none focus:border-brand-orange"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-orange px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
