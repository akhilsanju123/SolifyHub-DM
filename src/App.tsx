
import './App.css';

import { usePath } from './data/siteData';

// ==========================================
// SHARED COMPONENTS
// ==========================================

import AdminPage from './components/AdminPage';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import SocialRail from './components/shared/SocialRail';

// ==========================================
// MAIN WEBSITE PAGES
// ==========================================

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Capabilities from './pages/Capabilities';
import ContactUs from './pages/ContactUs';
import Career from './pages/Career';
import TeamPage from './pages/TeamPage';
import Industries from './pages/Industries';
import Portfolio from './pages/Portfolio';
import BlogArticle from './pages/BlogArticle';
import Blogs from './pages/Blogs';
import LegalPage from './pages/LegalPage';
import SimplePage from './pages/SimplePage';

// ==========================================
// ALL 12 SERVICE PAGE IMPORTS
// ==========================================

import Branding from './pages/services/Branding';
import GraphicDesign from './pages/services/GraphicDesign';
import Advertising from './pages/services/Advertising';
import VideoProduction from './pages/services/VideoProduction';
import SocialMediaCreatives from './pages/services/SocialMediaCreatives';
import ContentCreation from './pages/services/ContentCreation';
import WebDesign from './pages/services/WebDesign';
import MotionGraphics from './pages/services/MotionGraphics';
import Campaigns from './pages/services/Campaigns';
import CreativeStrategy from './pages/services/CreativeStrategy';
import DigitalMarketing from './pages/services/DigitalMarketing';
import AppDevelopment from './pages/services/AppDevelopment';

// ==========================================
// ALL 12 SERVICE ROUTES
// ==========================================

const serviceRoutes: Record<string, () => JSX.Element> = {
  // 01 - Branding
  branding: Branding,

  // 02 - Graphic Design
  'graphic-design': GraphicDesign,

  // 03 - Advertising
  advertising: Advertising,

  // 04 - Video Production
  'video-production': VideoProduction,

  // 05 - Social Media Creatives
  'social-media-creatives': SocialMediaCreatives,

  // 06 - Content Creation
  'content-creation': ContentCreation,

  // 07 - Web Design
  'web-design': WebDesign,

  // 08 - Motion Graphics
  'motion-graphics': MotionGraphics,

  // 09 - Campaigns
  campaigns: Campaigns,

  // 10 - Creative Strategy
  'creative-strategy': CreativeStrategy,

  // 11 - Digital Marketing
  'digital-marketing': DigitalMarketing,

  // 12 - App Development
  'app-development': AppDevelopment,
};

// ==========================================
// BLOG ROUTES
// ==========================================

const blogSlugs = [
  'local-seo-visakhapatnam',
  'social-media-marketing-2026',
  'why-choose-solifyhub',
];

// ==========================================
// MAIN APPLICATION
// ==========================================

function App() {
  const currentPath = usePath();

  // Remove query parameters, hash and trailing slash
  // so existing routes continue working.
  const path =
    currentPath.split('?')[0].split('#')[0].replace(/\/+$/, '') ||
    '/';

  let page: JSX.Element;

  // ========================================
  // ADMIN PAGE
  // ========================================

  if (path.startsWith('/admin')) {
    page = <AdminPage />;
  }

  // ========================================
  // HOME PAGE
  // ========================================

  else if (path === '/') {
    page = <Home />;
  }

  // ========================================
  // ABOUT US PAGE
  // ========================================

  else if (path === '/about-us') {
    page = <AboutUs />;
  }

  // ========================================
  // ALL SERVICES PAGE
  // ========================================

  else if (path === '/services') {
    page = <Capabilities />;
  }

  // ========================================
  // INDIVIDUAL SERVICE PAGES
  // ========================================

  else if (path.startsWith('/services/')) {
    const slug = path.split('/')[2];

    const ServicePage = serviceRoutes[slug];

    if (ServicePage) {
      page = <ServicePage />;
    } else {
      page = <SimplePage title="Service not found." />;
    }
  }

  // ========================================
  // CONTACT US PAGE
  // ========================================

  else if (path === '/contact-us') {
    page = <ContactUs />;
  }

  // ========================================
  // CAREER PAGE
  // ========================================

  else if (path === '/career') {
    page = <Career />;
  }

  // ========================================
  // OUR TEAM PAGE
  // ========================================

  else if (path === '/our-team') {
    page = <TeamPage />;
  }

  // ========================================
  // INDUSTRIES PAGE
  // ========================================

  else if (path === '/industries') {
    page = <Industries />;
  }

  // ========================================
  // PORTFOLIO PAGE
  // ========================================

  else if (path === '/portfolio') {
    page = <Portfolio />;
  }

  // ========================================
  // BLOGS MAIN PAGE
  // ========================================

  else if (path === '/blogs') {
    page = <Blogs />;
  }

  // ========================================
  // BLOG ARTICLE PAGE
  // Supports:
  //
  // /blogs/article
  // /blogs/article?post=local-seo-visakhapatnam
  // /blogs/article?post=social-media-marketing-2026
  // /blogs/article?post=why-choose-solifyhub
  //
  // /blogs/local-seo-visakhapatnam
  // /blogs/social-media-marketing-2026
  // /blogs/why-choose-solifyhub
  // ========================================

  else if (path === '/blogs/article') {
    page = <BlogArticle />;
  }

  else if (path.startsWith('/blogs/')) {
    const slug = path.split('/')[2];

    if (blogSlugs.includes(slug)) {
      page = <BlogArticle />;
    } else {
      page = <SimplePage title="Blog article not found." />;
    }
  }

  // ========================================
  // PRIVACY POLICY PAGE
  // ========================================

  else if (path === '/privacy-policy') {
    page = <LegalPage type="privacy" />;
  }

  // ========================================
  // TERMS AND CONDITIONS PAGE
  // ========================================

  else if (path === '/terms-and-conditions') {
    page = <LegalPage type="terms" />;
  }

  // ========================================
  // FALLBACK PAGE
  // ========================================

  else {
    page = (
      <SimplePage title="Let's make something useful." />
    );
  }

  // ========================================
  // GLOBAL WEBSITE LAYOUT
  // ========================================

  return (
    <div className="app-shell">
      <Header />

      <SocialRail />

      <div key={currentPath} className="page-enter">
        {page}
      </div>

      <Footer />
    </div>
  );
}

export default App;
