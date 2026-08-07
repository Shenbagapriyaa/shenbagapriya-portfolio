import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axios.js';

const TABS = ['messages', 'projects', 'skills', 'achievements', 'certificates', 'resume'];

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [tab, setTab] = useState('messages');

  return (
    <div className="min-h-screen px-6 py-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl">Admin Dashboard</h1>
          <p className="text-sm text-slate">Signed in as {user?.email || 'admin'}</p>
        </div>
        <button onClick={logout} className="btn btn-ghost">Log Out</button>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${tab === t ? 'bg-ink text-white' : 'glass'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'messages' && <MessagesPanel />}
      {tab === 'projects' && <ResourcePanel resource="projects" fields={['title', 'description', 'githubUrl', 'liveUrl']} />}
      {tab === 'skills' && <ResourcePanel resource="skills" fields={['category', 'name', 'proficiency']} />}
      {tab === 'achievements' && <ResourcePanel resource="achievements" fields={['title', 'organization', 'date', 'type']} />}
      {tab === 'certificates' && <ResourcePanel resource="certificates" fields={['title', 'issuer', 'grade', 'date']} />}
      {tab === 'resume' && <ResumePanel />}
    </div>
  );
}

function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await api.get('/messages');
    setMessages(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    await api.delete(`/messages/${id}`);
    load();
  }
  async function markRead(id) {
    await api.patch(`/messages/${id}/read`);
    load();
  }

  if (loading) return <p className="text-sm text-slate">Loading messages…</p>;
  if (!messages.length) return <p className="text-sm text-slate">No messages yet.</p>;

  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div key={m._id} className={`glass rounded-2xl p-5 ${!m.read ? 'ring-2 ring-violet/40' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <b className="text-sm">{m.name}</b> <span className="text-xs text-slate">&lt;{m.email}&gt;</span>
              <p className="text-xs text-slate mt-0.5">{new Date(m.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              {!m.read && <button onClick={() => markRead(m._id)} className="text-xs font-semibold text-violetDeep">Mark read</button>}
              <button onClick={() => remove(m._id)} className="text-xs font-semibold text-red-500">Delete</button>
            </div>
          </div>
          <p className="text-sm font-semibold mb-1">{m.subject}</p>
          <p className="text-sm text-slate">{m.message}</p>
        </div>
      ))}
    </div>
  );
}

// Generic list + add + delete panel reused for projects/skills/achievements/certificates.
// Keeps the dashboard functional without hand-writing four nearly-identical forms.
function ResourcePanel({ resource, fields }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(Object.fromEntries(fields.map((f) => [f, ''])));
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await api.get(`/${resource}`);
    setItems(data);
    setLoading(false);
  }
  useEffect(() => { load(); }, [resource]);

  async function handleAdd(e) {
    e.preventDefault();
    await api.post(`/${resource}`, form);
    setForm(Object.fromEntries(fields.map((f) => [f, ''])));
    load();
  }
  async function remove(id) {
    await api.delete(`/${resource}/${id}`);
    load();
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="glass rounded-2xl p-5 mb-6 grid sm:grid-cols-2 gap-3">
        {fields.map((f) => (
          <input
            key={f}
            placeholder={f}
            value={form[f]}
            onChange={(e) => setForm((s) => ({ ...s, [f]: e.target.value }))}
            className="px-3 py-2 rounded-xl border border-black/[0.08] bg-white/70 text-sm outline-none focus:border-violet"
          />
        ))}
        <button type="submit" className="btn btn-primary sm:col-span-2 justify-center">+ Add {resource.slice(0, -1)}</button>
      </form>

      {loading ? (
        <p className="text-sm text-slate">Loading…</p>
      ) : !items.length ? (
        <p className="text-sm text-slate">Nothing here yet — add your first {resource.slice(0, -1)} above.</p>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it._id} className="glass rounded-xl p-4 flex justify-between items-center">
              <span className="text-sm font-medium">{it[fields[0]]}</span>
              <button onClick={() => remove(it._id)} className="text-xs font-semibold text-red-500">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResumePanel() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    api.get('/resume').then((r) => setCurrent(r.data)).catch(() => setCurrent(null));
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setStatus('Uploading…');
    const fd = new FormData();
    fd.append('resume', file);
    try {
      await api.post('/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setStatus('✓ Uploaded');
      const { data } = await api.get('/resume');
      setCurrent(data);
    } catch {
      setStatus('Upload failed');
    }
  }

  return (
    <div className="glass rounded-2xl p-6 max-w-md">
      {current && <p className="text-sm mb-4">Current resume: <b>{current.originalName}</b></p>}
      <form onSubmit={handleUpload}>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="text-sm mb-4 block" />
        <button type="submit" className="btn btn-primary">Upload New Resume</button>
      </form>
      {status && <p className="text-xs text-slate mt-3">{status}</p>}
    </div>
  );
}
