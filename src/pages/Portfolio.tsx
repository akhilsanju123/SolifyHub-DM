import { images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

export default function Portfolio(){
  useSEO({
    title: 'Portfolio — Selected Creative & Digital Work | SOLIFYHUB',
    description: 'Explore selected SOLIFYHUB work including branding, web design and creative strategy projects for businesses in Visakhapatnam and beyond.',
    path: '/portfolio',
    keywords: 'creative portfolio Visakhapatnam, branding work Vizag, web design portfolio Andhra Pradesh, digital marketing case studies',
  });

  const work:[string,string,string][]=[['A sharper first impression','Branding',images.brand],['Digital spaces with a pulse','Web Design',images.web],['Ideas made visible','Creative Strategy',images.strategy]]; return <><PageHero label="Selected work" title={'Work with a point\nof view.'} body="A selection of the kinds of problems we like to solve: finding the signal, shaping the story and making the next move clear." image={images.brand}/><section className="section-pad bg-white"><div className="container-wide grid gap-6 md:grid-cols-2">{work.map(([title,category,image],index)=><article key={title} className={`group ${index===0?'md:col-span-2':''}`}><div className={`relative overflow-hidden rounded-[28px] ${index===0?'aspect-[2.1]':'aspect-[1.25]'}`}><img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#07194E]/80 via-transparent to-transparent"/><div className="absolute bottom-0 p-7 text-white"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#00CFFF]">{category}</p><h2 className="mt-2 font-display text-2xl font-bold">{title}</h2></div></div></article>)}</div></section><CTA/></>}
