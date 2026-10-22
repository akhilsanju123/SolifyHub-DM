import { images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import SectionIntro from '../components/shared/SectionIntro';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

export default function TeamPage(){
  useSEO({
    title: 'Our Team — Creative Digital Marketing Experts in Visakhapatnam | SOLIFYHUB',
    description: 'Meet the SOLIFYHUB team — strategy, creative and digital performance experts in Visakhapatnam working together to help ambitious businesses grow.',
    path: '/our-team',
    keywords: 'digital marketing team Visakhapatnam, creative team Vizag, marketing experts Andhra Pradesh, SOLIFYHUB team',
  });

  const team:[string,string,string][]=[['Strategy & direction','We ask the questions that make the work sharper.',images.meeting],['Creative & identity','We turn positioning into a visual language people recognise.',images.brand],['Digital & performance','We connect the idea to the action and keep learning.',images.web]]; return <><PageHero label="Our team" title={'A team of thinkers, makers\nand momentum builders.'} body="SOLIFYHUB brings strategy, creative and digital craft together under one roof in Visakhapatnam." image={images.team}/><section className="section-pad bg-white"><div className="container-wide"><SectionIntro eyebrow="How we work together" title={'Different strengths.\nOne point of view.'} body="The best work happens when curious people bring their full perspective to the table. Our team is built around collaboration, clarity and a healthy respect for the details."/><div className="grid gap-5 md:grid-cols-3">{team.map(([role,text,image])=><article key={role} className="team-card card-lift overflow-hidden rounded-[24px] border border-[#F5F7FA] bg-white"><div className="aspect-[1.15] overflow-hidden"><img src={image} alt={role} className="h-full w-full object-cover transition duration-500 hover:scale-105"/></div><div className="p-6"><p className="eyebrow">SOLIFYHUB</p><h2 className="mt-4 font-display text-2xl font-bold text-[#07194E]">{role}</h2><p className="mt-3 text-sm leading-7 text-[#505050]">{text}</p></div></article>)}</div></div></section><section className="section-pad bg-[#07194E] text-white"><div className="container-wide grid gap-12 lg:grid-cols-2"><div><p className="eyebrow !text-[#00CFFF] mb-5">Our culture</p><h2 className="section-title !text-white">Make room for<br/><span className="text-[#00CFFF]">better ideas.</span></h2></div><div className="body-copy !text-white/65 text-lg"><p>We believe great creative work is generous. It listens before it speaks, makes space for new perspectives and leaves the business stronger than it found it.</p><p className="mt-6">That means thoughtful briefs, honest feedback and a shared ambition to make work that is both beautiful and useful.</p></div></div></section><CTA/></>}
