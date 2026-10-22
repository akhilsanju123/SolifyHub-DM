import { navigate } from '../../data/siteData';

export default function Logo(){ return <button className="flex items-center" onClick={()=>navigate('/')} aria-label="Go to SOLIFYHUB home"><img src="/logo_png.png" alt="SOLIFYHUB" className="logo-image h-12 w-auto object-contain" /></button> }
