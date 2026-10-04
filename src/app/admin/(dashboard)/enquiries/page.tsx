import { getAdmissionEnquiries, getContactEnquiries } from "@/lib/queries/enquiries";

function formatDate(date: Date) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminEnquiriesPage() {
  const [admissionEnquiries, contactEnquiries] = await Promise.all([
    getAdmissionEnquiries(),
    getContactEnquiries(),
  ]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Admission enquiries</h1>
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
              <tr>
                <th className="px-4 py-3">Parent</th>
                <th className="px-4 py-3">Child</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Program</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {admissionEnquiries.map((e) => (
                <tr key={e.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium">{e.parentName}</td>
                  <td className="px-4 py-3">{e.childName}</td>
                  <td className="px-4 py-3 text-[#0b2038]/70">
                    {e.contactNo}
                    <br />
                    {e.email}
                  </td>
                  <td className="px-4 py-3">{e.program}</td>
                  <td className="px-4 py-3">{e.location}</td>
                  <td className="px-4 py-3 text-[#0b2038]/60">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
              {admissionEnquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-[#0b2038]/50">
                    No admission enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Contact enquiries</h2>
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f5f6f8] text-xs uppercase text-[#0b2038]/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {contactEnquiries.map((e) => (
                <tr key={e.id} className="border-t border-black/5">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-[#0b2038]/70">
                    {e.mobile}
                    <br />
                    {e.email}
                  </td>
                  <td className="px-4 py-3">{e.subject || "—"}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{e.message || "—"}</td>
                  <td className="px-4 py-3 text-[#0b2038]/60">{formatDate(e.createdAt)}</td>
                </tr>
              ))}
              {contactEnquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-[#0b2038]/50">
                    No contact enquiries yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
