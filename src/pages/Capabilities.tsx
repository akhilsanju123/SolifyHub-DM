import { ArrowRight } from 'lucide-react';
import { navigate, services, images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

export default function Capabilities(){
  useSEO({
    title: 'Digital Marketing Services in Visakhapatnam | SOLIFYHUB',
    description: 'Explore SOLIFYHUB\u2019s 11 digital marketing capabilities: branding, graphic design, advertising, video production, social media, web design, motion graphics, content creation, campaigns, creative strategy and digital marketing.',
    path: '/services',
    keywords: 'digital marketing services Visakhapatnam, branding Vizag, web design Andhra Pradesh, advertising agency, social media marketing, video production, content creation, motion graphics',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ServiceCatalog',
      name: 'SOLIFYHUB Digital Marketing Services',
      description: '11 digital marketing capabilities for businesses in Visakhapatnam.',
      url: 'https://solifyhub.com/services',
    },
  });

  return <><PageHero label="Capabilities" title={'The right work\nfor the right moment.'} body="Choose the capability that matches your next move, or bring us the whole challenge." image={images.strategy}/><section className="section-pad bg-white"><div className="container-wide grid gap-5 md:grid-cols-2">{services.map((s)=><button key={s.slug} className="capability-card card-lift group rounded-[26px] border border-[#D9E2F0] bg-white p-8 text-left" onClick={()=>navigate(`/services/${s.slug}`)}><div className="flex justify-between"><span className="eyebrow">{s.number}</span><s.icon className="text-[#1254F4]" size={28}/></div><h2 className="mt-20 font-display text-3xl font-bold text-[#07194E]">{s.title}</h2><p className="body-copy mt-3">{s.text}</p><span className="mt-8 inline-flex items-center gap-2 font-bold text-[#1254F4]">Explore <ArrowRight size={16}/></span></button>)}</div></section><CTA/></>}
