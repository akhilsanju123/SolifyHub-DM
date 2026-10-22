import { useEffect, useState } from 'react';
import { BarChart3, Compass, MessageCircle, Monitor, Play, Search, Sparkles, Target, Zap, Instagram } from 'lucide-react';

export type Slide = { kicker:string; title:string; body:string; image:string; alt:string };
export type Service = { number:string; icon:typeof Search; title:string; tagline:string; text:string; items:string[]; slug:string; image:string; seoTitle:string; seoDescription:string };
export type Industry = { name:string; desc:string; whatWeDo:string; image:string; headline:string; challenges:string[]; services:string[]; seoTitle:string; seoDescription:string; seoKeywords:string };
export type Post = { category:string; title:string; date:string; image:string };

export const images = {
  team:'https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  strategy:'https://images.pexels.com/photos/7698712/pexels-photo-7698712.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  brand:'https://images.pexels.com/photos/7598019/pexels-photo-7598019.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  web:'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
  meeting:'https://images.pexels.com/photos/1181738/pexels-photo-1181738.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  retail:'https://images.pexels.com/photos/29502371/pexels-photo-29502371.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

export const slides:Slide[] = [
  {kicker:'01 / Digital growth partner',title:'Grow your business.\nBuild your brand.',body:'We combine strategy, creative and performance to give ambitious businesses an unfair digital advantage.',image:images.team,alt:'Digital marketing team collaborating in a modern workspace'},
  {kicker:'02 / Search & visibility',title:'Get found.\nGet trusted.\nGet chosen.',body:'Turn every search into a meaningful first impression with practical SEO and search campaigns.',image:images.strategy,alt:'Business strategy meeting in a bright office'},
  {kicker:'03 / Brand & creative',title:'Create a brand\npeople remember.',body:'Distinctive identity systems and content that make your business impossible to scroll past.',image:images.brand,alt:'Brand moodboard with creative tools and colour palettes'},
  {kicker:'04 / Digital experiences',title:'Your website.\nYour first impression.',body:'Web experiences designed to look sharp, load fast and turn attention into action.',image:images.web,alt:'Laptop and smartphone showing a modern website design'},
];

const serviceCatalog:Service[] = [
  {number:'01',icon:Sparkles,title:'Branding',tagline:'Make your brand impossible to ignore.',text:'Build a distinctive identity that gives every customer touchpoint a clear point of view.',items:['Brand strategy','Visual identity systems','Brand guidelines'],slug:'branding',image:'https://images.pexels.com/photos/7661590/pexels-photo-7661590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Branding agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Distinctive brand strategy and identity systems for ambitious businesses in Visakhapatnam.'},
  {number:'02',icon:Sparkles,title:'Graphic Design',tagline:'Turn every touchpoint into a statement.',text:'Create clear, considered visual communication across print, digital and every space in between.',items:['Campaign design','Marketing collateral','Presentation design'],slug:'graphic-design',image:'https://images.pexels.com/photos/6663/desk-white-black-header.jpg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Graphic design studio in Visakhapatnam | SOLIFYHUB',seoDescription:'Graphic design that makes brands clearer, more memorable and more useful.'},
  {number:'03',icon:Target,title:'Advertising',tagline:'Campaigns people choose to remember.',text:'Turn a strong idea into advertising that earns attention and gives your audience a reason to act.',items:['Campaign concepts','Digital advertising','Creative direction'],slug:'advertising',image:'https://images.pexels.com/photos/13120127/pexels-photo-13120127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Advertising agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Creative advertising campaigns built to be noticed and remembered.'},
  {number:'04',icon:Play,title:'Video Production',tagline:'Move hearts. Move markets.',text:'From a first frame to the final cut, we make video that gives your message momentum.',items:['Brand films','Social video','Product and campaign films'],slug:'video-production',image:'https://images.pexels.com/photos/34598087/pexels-photo-34598087.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Video production company in Visakhapatnam | SOLIFYHUB',seoDescription:'Video production for brands that want to move people and markets.'},
  {number:'05',icon:Instagram,title:'Social Media Creatives',tagline:'Stop the scroll with something worth stopping for.',text:'Make social feeds feel less like a content calendar and more like a living brand.',items:['Social campaign systems','Static and carousel design','Short-form creative'],slug:'social-media-creatives',image:'https://images.pexels.com/photos/7481984/pexels-photo-7481984.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Social media creative agency | SOLIFYHUB',seoDescription:'Social media creative systems that help brands earn attention consistently.'},
  {number:'06',icon:MessageCircle,title:'Content Creation',tagline:'Say the thing in a way only you can.',text:'Find your voice, sharpen your message and create content your audience is glad to spend time with.',items:['Content strategy','Copywriting','Editorial content'],slug:'content-creation',image:'https://images.pexels.com/photos/9052143/pexels-photo-9052143.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Content creation agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Content strategy and creation for brands with something worth saying.'},
  {number:'07',icon:Monitor,title:'Web Design',tagline:'Digital spaces with a pulse.',text:'Design and build websites that feel unmistakably yours and make the next step easy.',items:['UX and UI design','Responsive websites','Conversion journeys'],slug:'web-design',image:'https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Web design company in Visakhapatnam | SOLIFYHUB',seoDescription:'Web design with clarity, character and conversion in mind.'},
  {number:'08',icon:Zap,title:'Motion Graphics',tagline:'Give your ideas a little more gravity.',text:'Add rhythm, movement and visual energy to ideas that deserve more than a still frame.',items:['Animated brand systems','Explainer motion','Social animations'],slug:'motion-graphics',image:'https://images.pexels.com/photos/31949770/pexels-photo-31949770.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Motion graphics studio in Visakhapatnam | SOLIFYHUB',seoDescription:'Motion graphics that make complex ideas feel immediate and alive.'},
  {number:'09',icon:Target,title:'Campaigns',tagline:'One idea. Everywhere it matters.',text:'Connect the message across channels so every part of the campaign feels like the same conversation.',items:['Campaign strategy','Integrated creative','Launch toolkits'],slug:'campaigns',image:'https://images.pexels.com/photos/19387231/pexels-photo-19387231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Campaign agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Integrated campaigns that carry one powerful idea across every channel.'},
  {number:'10',icon:Compass,title:'Creative Strategy',tagline:'Make the right idea inevitable.',text:'Turn a business challenge into a sharp creative direction the whole team can believe in.',items:['Audience insight','Creative direction','Messaging frameworks'],slug:'creative-strategy',image:'https://images.pexels.com/photos/17724746/pexels-photo-17724746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Creative strategy agency | SOLIFYHUB',seoDescription:'Creative strategy that turns business challenges into focused ideas.'},
  {number:'11',icon:BarChart3,title:'Digital Marketing',tagline:'Turn attention into action.',text:'Build a connected digital presence that brings the right people closer to your business.',items:['Digital growth plans','Performance campaigns','Analytics and optimisation'],slug:'digital-marketing',image:'https://images.pexels.com/photos/8062289/pexels-photo-8062289.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',seoTitle:'Digital marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Digital marketing strategy, creative and performance for sustainable growth.'},
  

{
  number: '12',
  icon: Monitor,
  title: 'App Development',
  tagline: 'Build powerful mobile and web applications.',
  text: 'We design and develop scalable mobile and web applications that help businesses deliver seamless digital experiences.',
  items: [
    'Mobile App Development',
    'Web App Development',
    'UI/UX Design'
  ],
  slug: 'app-development',
  image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  seoTitle: 'App Development Company in Visakhapatnam | SOLIFYHUB',
  seoDescription: 'Professional mobile app and web application development services in Visakhapatnam by SOLIFYHUB.'
},

];

const serviceOrder = ['web-design','app-development','branding','digital-marketing','campaigns','content-creation','creative-strategy','advertising','graphic-design','social-media-creatives','video-production','motion-graphics'];

export const services:Service[] = serviceOrder.map((slug, index) => ({
  ...serviceCatalog.find((service) => service.slug === slug)!,
  number: String(index + 1).padStart(2, '0'),
}));

export const capabilityServices = services.filter(s => ['Branding','Graphic Design','Advertising','Social Media Creatives','Motion Graphics','Digital Marketing'].includes(s.title));
export const performanceServices = services.filter(s => ['Campaigns','Web Design','Content Creation','Creative Strategy'].includes(s.title));

export const industries:Industry[] = [
  {name:'Technology & SaaS',desc:'Make complex products feel clear, useful and ready to choose.',whatWeDo:'We simplify your product story, sharpen positioning and build content, campaigns and digital experiences that help buyers understand your value faster.',image:images.web,headline:'SaaS and technology marketing that makes complex products easy to choose',challenges:['Explaining technical products to non-technical buyers','Generating qualified demo and trial signups','Building authority and thought leadership','Shortening long B2B sales cycles'],services:['Web Design','Content Creation','Digital Marketing','Branding','Creative Strategy','Motion Graphics'],seoTitle:'SaaS and technology marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Marketing for SaaS and technology companies in Visakhapatnam. Product positioning, content and performance campaigns.',seoKeywords:'SaaS marketing Visakhapatnam, technology digital marketing Vizag, B2B software marketing Andhra Pradesh'},
  {name:'Healthcare',desc:'Build trust before the first appointment with clear, reassuring digital experiences.',whatWeDo:'We shape calm, credible brands and digital journeys that help patients understand your services, find the right information and take the next step with confidence.',image:'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',headline:'Healthcare marketing that builds trust and grows patient relationships',challenges:['Building credibility and trust with new patients','Communicating complex medical services simply','Standing out in a competitive local healthcare market','Managing online reviews and patient feedback'],services:['Branding','Web Design','Content Creation','Digital Marketing','Social Media Creatives'],seoTitle:'Healthcare marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Digital marketing for healthcare providers in Visakhapatnam. Build patient trust with clear branding, websites and content.',seoKeywords:'healthcare marketing Visakhapatnam, medical digital marketing Vizag, hospital branding Andhra Pradesh, healthcare SEO'},
  {name:'Education',desc:'Help the right learners find, understand and choose your institution.',whatWeDo:'We turn your institution\u2019s strengths into an engaging story, supported by campaigns, content and websites that make the choice easier for students and families.',image:'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',headline:'Education marketing that connects institutions with the right students',challenges:['Reaching students and parents at the right decision moment','Differentiating from competing institutions','Explaining courses and admissions clearly','Building a digital presence that feels modern and credible'],services:['Branding','Web Design','Content Creation','Campaigns','Social Media Creatives','Video Production'],seoTitle:'Education marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Marketing for schools, colleges and training institutes in Visakhapatnam. Enrolment-focused campaigns and digital experiences.',seoKeywords:'education marketing Visakhapatnam, school branding Vizag, college digital marketing Andhra Pradesh, student enrolment campaigns'},
  {name:'Real Estate',desc:'Turn location, lifestyle and intent into a pipeline that moves.',whatWeDo:'We create a sharper property story, better digital touchpoints and lead-focused campaigns that help developments and real estate teams stay top of mind.',image:'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',headline:'Real estate marketing that turns property listings into qualified leads',challenges:['Generating qualified buyer and investor leads','Showcasing properties with compelling visuals','Standing out in a crowded real estate market','Nurturing leads through long buying cycles'],services:['Branding','Web Design','Digital Marketing','Campaigns','Video Production','Motion Graphics'],seoTitle:'Real estate marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Real estate digital marketing in Visakhapatnam. Lead generation, property campaigns and conversion-focused websites.',seoKeywords:'real estate marketing Visakhapatnam, property digital marketing Vizag, real estate lead generation Andhra Pradesh'},
  {name:'Retail & E-Commerce',desc:'Connect product, story and performance across every touchpoint.',whatWeDo:'We connect product storytelling, social creative, performance campaigns and conversion-focused experiences so more attention becomes more action.',image:images.retail,headline:'Retail and e-commerce marketing that turns browsers into buyers',challenges:['Driving consistent online and footfall sales','Competing with large marketplaces on visibility','Creating content that stops the scroll','Reducing cart abandonment and improving conversion'],services:['Digital Marketing','Social Media Creatives','Web Design','Content Creation','Graphic Design','Motion Graphics'],seoTitle:'Retail and e-commerce marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'E-commerce marketing in Visakhapatnam. Performance campaigns, social creative and conversion-focused web design.',seoKeywords:'ecommerce marketing Visakhapatnam, retail digital marketing Vizag, online store promotion Andhra Pradesh'},
  {name:'Hospitality & Travel',desc:'Turn places, stays and experiences into reasons to go.',whatWeDo:'We create distinctive hospitality brands and high-intent digital journeys that inspire discovery, build trust and make booking feel effortless.',image:images.meeting,headline:'Hospitality and travel marketing that inspires discovery and drives bookings',challenges:['Inspiring travellers to choose your destination or stay','Standing out on OTAs and travel platforms','Building a brand that feels worth the visit','Converting inspiration into direct bookings'],services:['Branding','Web Design','Video Production','Social Media Creatives','Content Creation','Digital Marketing'],seoTitle:'Hospitality and travel marketing agency in Visakhapatnam | SOLIFYHUB',seoDescription:'Marketing for hotels, resorts and travel brands in Visakhapatnam. Branding, video and booking-focused digital experiences.',seoKeywords:'hospitality marketing Visakhapatnam, travel digital marketing Vizag, hotel branding Andhra Pradesh, tourism marketing'},
];

export const posts:Post[] = [
  {category:'Local SEO',title:'How does Local SEO help businesses in Visakhapatnam?',date:'06 Oct 2026',image:images.strategy},
  {category:'Social',title:'What is social media marketing really meant to do?',date:'28 Sep 2026',image:images.team},
  {category:'Websites',title:'Why businesses need a professional website in 2026',date:'18 Sep 2026',image:images.web},
];

export function navigate(path:string){ window.history.pushState({},'',path); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({top:0,behavior:'smooth'}); }

export function usePath(){
  const [path,setPath]=useState(window.location.pathname);
  useEffect(()=>{const handler=()=>setPath(window.location.pathname); window.addEventListener('popstate',handler); return()=>window.removeEventListener('popstate',handler)},[]);
  return path;
}
