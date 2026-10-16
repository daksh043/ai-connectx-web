import { useCallback, useEffect, useState } from "react";
import { contactAPI, companyAPI } from "../lib/api";
import { Users, Plus, Search, Mail, ExternalLink, Trash2, Building2 } from "lucide-react";
import InlineError from "../components/InlineError";

interface Contact {
  id: number;
  company_id: number;
  name: string;
  title?: string;
  linkedin_url?: string;
  business_email?: string;
  email_status?: string;
  source?: string;
}

interface Company {
  id: number;
  name: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactsError, setContactsError] = useState("");
  const [companiesError, setCompaniesError] = useState("");
  const [retryLoad, setRetryLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ company_id: "" as number | "", name: "", title: "", linkedin_url: "", business_email: "" });

  const fetchContacts = useCallback(() => {
    contactAPI.list({ search: search || undefined }).then((r) => {
      setContacts(r.data);
      setContactsError("");
      setRetryLoad(false);
    }).catch(() => {
      setContactsError("Could not load contacts.");
      setRetryLoad(true);
    }).finally(() => setLoading(false));
  }, [search]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);
  useEffect(() => {
    companyAPI.list().then((r) => setCompanies(r.data)).catch(() => setCompaniesError("Could not load the company list for the contact form."));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactAPI.create(form);
      setShowAdd(false);
      setForm({ company_id: "", name: "", title: "", linkedin_url: "", business_email: "" });
      fetchContacts();
    } catch {
      setContactsError("Could not add the contact. Please check the details and try again.");
      setRetryLoad(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this contact?")) return;
    try {
      await contactAPI.delete(id);
      fetchContacts();
    } catch {
      setContactsError("Could not delete this contact.");
      setRetryLoad(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {contactsError && <InlineError message={contactsError} onRetry={retryLoad ? () => fetchContacts() : undefined} />}
      {companiesError && <InlineError message={companiesError} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark-100 flex items-center gap-3">
            <Users className="w-6 h-6 text-primary-400" /> Contacts
          </h1>
          <p className="text-dark-400 text-sm mt-1">{contactsError && retryLoad ? "—" : contacts.length} decision-makers tracked</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary"><Plus className="w-4 h-4" /> Add Contact</button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" placeholder="Search contacts..." />
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(5)].map((_, i) => <div key={i} className="h-20 shimmer-loading rounded-2xl" />)}</div>
      ) : contactsError && retryLoad ? null : contacts.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Users className="w-12 h-12 text-dark-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-300">No contacts yet</h3>
          <p className="text-dark-500 text-sm mt-2">Add decision-makers to start your outreach</p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Company</th>
                <th>Email</th>
                <th>LinkedIn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td className="font-medium text-dark-100">{c.name}</td>
                  <td className="text-dark-400">{c.title || "—"}</td>
                  <td>
                    <span className="flex items-center gap-1.5 text-dark-400">
                      <Building2 className="w-3 h-3" />
                      {companies.find((co) => co.id === c.company_id)?.name || `ID: ${c.company_id}`}
                    </span>
                  </td>
                  <td>
                    {c.business_email ? (
                      <a href={`mailto:${c.business_email}`} className="flex items-center gap-1 text-primary-400 hover:underline text-sm">
                        <Mail className="w-3 h-3" /> {c.business_email}
                      </a>
                    ) : <span className="text-dark-500">—</span>}
                  </td>
                  <td>
                    {c.linkedin_url ? (
                      <a href={c.linkedin_url} target="_blank" rel="noreferrer" className="text-primary-400 hover:text-primary-300">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : <span className="text-dark-500">—</span>}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(c.id)} className="text-dark-500 hover:text-danger-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-100 mb-6">Add Contact</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Company *</label>
                <select value={form.company_id} onChange={(e) => setForm({ ...form, company_id: e.target.value ? parseInt(e.target.value, 10) : "" })} className="input-field" required>
                  <option value="">Select company...</option>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Full Name *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Job Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Engineering Manager" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">Business Email</label>
                <input type="email" value={form.business_email} onChange={(e) => setForm({ ...form, business_email: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-1">LinkedIn URL</label>
                <input value={form.linkedin_url} onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })} className="input-field" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">Add Contact</button>
                <button type="button" onClick={() => setShowAdd(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
