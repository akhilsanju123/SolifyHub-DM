import { FormEvent, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, ChevronRight, LockKeyhole, LogOut, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

type AdminService = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  display_number: string;
  description: string;
  hero_image: string;
  publish_status: string;
  seo_title: string;
  seo_description: string;
};

type Enquiry = {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  service: string;
  requirements: string;
  created_at: string;
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [membershipChecked, setMembershipChecked] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [services, setServices] = useState<AdminService[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const selected = services.find((service) => service.id === selectedId) ?? services[0];

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setMembershipChecked(false);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setMembershipChecked(true);
      setIsMember(false);
      return;
    }
    let active = true;
    const userId = session.user.id;
    async function checkMembership() {
      const { data, error } = await supabase
        .from('admin_members')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();
      if (!active) return;
      setIsMember(!error && Boolean(data));
      setMembershipChecked(true);
    }
    void checkMembership();
    return () => {
      active = false;
    };
  }, [session]);

  useEffect(() => {
    if (!session || !isMember) return;
    let active = true;
    async function loadContent() {
      const [servicesResult, enquiriesResult] = await Promise.all([
        supabase.from('services').select('id,title,slug,tagline,display_number,description,hero_image,publish_status,seo_title,seo_description').order('display_order'),
        supabase.from('enquiries').select('id,full_name,business_name,email,phone,service,requirements,created_at').order('created_at', { ascending: false }),
      ]);
      if (!active) return;
      if (servicesResult.error || enquiriesResult.error) {
        setMessage('We could not load the management data. Please try again.');
        return;
      }
      setServices(servicesResult.data ?? []);
      setEnquiries(enquiriesResult.data ?? []);
      setSelectedId((current) => current || servicesResult.data?.[0]?.id || '');
    }
    void loadContent();
    return () => {
      active = false;
    };
  }, [session, isMember]);

  async function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (result.error) {
      setMessage(mode === 'signin' ? 'The sign-in details were not accepted.' : 'We could not create that account. Please try again.');
      return;
    }
    setMessage(mode === 'signup' ? 'Account created. A project owner must grant management access before you can enter.' : '');
  }

  async function saveService(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setLoading(true);
    setMessage('');
    const form = new FormData(event.currentTarget);
    const updates = {
      title: String(form.get('title') || ''),
      tagline: String(form.get('tagline') || ''),
      description: String(form.get('description') || ''),
      hero_image: String(form.get('hero_image') || ''),
      publish_status: String(form.get('publish_status') || 'draft'),
      seo_title: String(form.get('seo_title') || ''),
      seo_description: String(form.get('seo_description') || ''),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('services').update(updates).eq('id', selected.id).select('id,title,slug,tagline,display_number,description,hero_image,publish_status,seo_title,seo_description').maybeSingle();
    setLoading(false);
    if (error || !data) {
      setMessage('The service could not be saved. Please try again.');
      return;
    }
    setServices((current) => current.map((service) => service.id === data.id ? data : service));
    setMessage('Service saved successfully.');
  }

  if (!session || !isMember) {
    return <main className="min-h-screen bg-[#F5F4FF] pb-24 pt-40"><div className="container-wide max-w-xl"><div className="rounded-[28px] border border-[#F5F7FA] bg-white p-8 shadow-xl sm:p-10"><div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#07194E] text-[#00CFFF]"><LockKeyhole size={25}/></div><p className="eyebrow mb-4">SOLIFYHUB management</p><h1 className="section-title !text-5xl">Keep the work moving.</h1><p className="body-copy mt-5">Sign in to manage published services and review private enquiries.</p>{!membershipChecked && session ? <p className="mt-8 text-sm text-[#505050]">Checking access…</p> : session && !isMember ? <div className="mt-8 rounded-2xl bg-[#fff8e7] p-4 text-sm leading-6 text-[#7a5a00]">Your account is signed in, but it has not been granted management access yet.</div> : <form onSubmit={authenticate} className="mt-8 grid gap-4"><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Work email"/><input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password"/><button disabled={loading} className="btn-primary justify-center">{loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'} <ChevronRight size={16}/></button></form>}{message&&<p className="mt-5 text-sm font-semibold text-[#1254F4]">{message}</p>}<button className="mt-7 text-sm font-semibold text-[#505050] underline underline-offset-4" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>{mode === 'signin' ? 'Need to create an account?' : 'Already have an account?'}</button></div></div></main>;
  }

  return <main className="min-h-screen bg-[#F5F4FF] pb-24 pt-32"><div className="container-wide"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow mb-4">SOLIFYHUB management</p><h1 className="section-title !text-5xl">Control the signal.</h1><p className="body-copy mt-4">Update public service content and keep private enquiries in one place.</p></div><button className="btn-ghost" onClick={() => void supabase.auth.signOut()}><LogOut size={16}/> Sign out</button></div>{message&&<div className="mb-6 flex items-center gap-2 rounded-2xl bg-white p-4 text-sm font-semibold text-[#1254F4]"><Check size={16}/>{message}</div>}<div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr]"><aside className="rounded-[24px] border border-[#F5F7FA] bg-white p-4"><p className="px-3 pb-3 text-xs font-bold uppercase tracking-[.16em] text-[#505050]">Services</p><div className="grid gap-1">{services.map((service) => <button key={service.id} className={`flex items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${selected?.id === service.id ? 'bg-[#07194E] text-white' : 'text-[#505050] hover:bg-[#F5F4FF] hover:text-[#1254F4]'}`} onClick={() => setSelectedId(service.id)}><span><span className="mr-3 text-xs opacity-60">{service.display_number}</span>{service.title}</span><ChevronRight size={15}/></button>)}</div><div className="mt-8 border-t border-[#F5F7FA] pt-6"><p className="px-3 pb-3 text-xs font-bold uppercase tracking-[.16em] text-[#505050]">Inbox</p><p className="px-3 text-sm leading-6 text-[#505050]">{enquiries.length} private {enquiries.length === 1 ? 'enquiry' : 'enquiries'} awaiting review.</p></div></aside><section className="rounded-[24px] border border-[#F5F7FA] bg-white p-6 sm:p-8">{selected&&<form onSubmit={saveService} className="grid gap-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="eyebrow">Service {selected.display_number}</p><p className="mt-2 text-sm text-[#505050]">/{selected.slug}</p></div><select name="publish_status" defaultValue={selected.publish_status} key={`${selected.id}-${selected.publish_status}`} className="w-auto"><option value="published">Published</option><option value="draft">Draft</option></select></div><label className="text-sm font-semibold text-[#07194E]">Title<input name="title" defaultValue={selected.title} key={`${selected.id}-title`} className="mt-2"/></label><label className="text-sm font-semibold text-[#07194E]">Tagline<input name="tagline" defaultValue={selected.tagline} key={`${selected.id}-tagline`} className="mt-2"/></label><label className="text-sm font-semibold text-[#07194E]">Description<textarea name="description" defaultValue={selected.description} key={`${selected.id}-description`} className="mt-2 min-h-28"/></label><label className="text-sm font-semibold text-[#07194E]">Hero image URL<input name="hero_image" defaultValue={selected.hero_image} key={`${selected.id}-image`} className="mt-2"/></label><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-semibold text-[#07194E]">SEO title<input name="seo_title" defaultValue={selected.seo_title} key={`${selected.id}-seo-title`} className="mt-2"/></label><label className="text-sm font-semibold text-[#07194E]">SEO description<textarea name="seo_description" defaultValue={selected.seo_description} key={`${selected.id}-seo-description`} className="mt-2 min-h-28"/></label></div><button disabled={loading} className="btn-primary w-fit">{loading ? 'Saving…' : 'Save service'} <Save size={16}/></button></form>}<div className="mt-12 border-t border-[#F5F7FA] pt-8"><p className="eyebrow mb-4">Recent enquiries</p>{enquiries.length===0?<p className="text-sm text-[#505050]">No enquiries yet.</p>:<div className="grid gap-3">{enquiries.slice(0,5).map((enquiry)=><div key={enquiry.id} className="rounded-2xl bg-[#F5F4FF] p-4"><div className="flex flex-wrap justify-between gap-2"><p className="font-semibold text-[#07194E]">{enquiry.full_name} · {enquiry.business_name}</p><span className="text-xs text-[#505050]">{new Date(enquiry.created_at).toLocaleDateString()}</span></div><p className="mt-2 text-sm text-[#1254F4]">{enquiry.service} · {enquiry.email}</p><p className="mt-2 text-sm leading-6 text-[#505050]">{enquiry.requirements}</p></div>)}</div>}</div></section></div></div></main>;
}

export default AdminPage;
