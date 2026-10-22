import { images } from '../data/siteData';
import PageHero from '../components/shared/PageHero';
import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';

export default function SimplePage({title}:{title:string}){
  useSEO({
    title: `${title} | SOLIFYHUB`,
    description: `${title} — SOLIFYHUB is a creative digital marketing agency in Visakhapatnam offering branding, web design, advertising and performance marketing.`,
    path: `/${title.toLowerCase().replace(/\s+/g,'-')}`,
  });

  return <><PageHero label="SOLIFYHUB" title={title} body="This page is part of the SOLIFYHUB experience. Explore our capabilities or start a conversation with the team." image={images.strategy}/><CTA/></>;
}
