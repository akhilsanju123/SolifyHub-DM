
import { lazy, Suspense, useEffect } from 'react';
import './App.css';
import { usePath } from './data/siteData';

import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import SocialRail from './components/shared/SocialRail';

const AdminPage = lazy(() => import('./components/AdminPage'));
const Home = lazy(() => import('./pages/Home'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Capabilities = lazy(() => import('./pages/Capabilities'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Career = lazy(() => import('./pages/Career'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const Industries = lazy(() => import('./pages/Industries'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));
const Blogs = lazy(() => import('./pages/Blogs'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const SimplePage = lazy(() => import('./pages/SimplePage'));

const serviceRoutes = {
  branding: lazy(() => import('./pages/services/Branding')),
  'graphic-design': lazy(() => import('./pages/services/GraphicDesign')),
  advertising: lazy(() => import('./pages/services/Advertising')),
  'video-production': lazy(() => import('./pages/services/VideoProduction')),
  'social-media-creatives': lazy(() => import('./pages/services/SocialMediaCreatives')),
  'content-creation': lazy(() => import('./pages/services/ContentCreation')),
  'web-design': lazy(() => import('./pages/services/WebDesign')),
  'motion-graphics': lazy(() => import('./pages/services/MotionGraphics')),
  campaigns: lazy(() => import('./pages/services/Campaigns')),
  'creative-strategy': lazy(() => import('./pages/services/CreativeStrategy')),
  'digital-marketing': lazy(() => import('./pages/services/DigitalMarketing')),
  'app-development': lazy(() => import('./pages/services/AppDevelopment')),
};

const blogSlugs = new Set([
  'local-seo-visakhapatnam',
  'social-media-marketing-2026',
  'why-choose-solifyhub',
]);

function RouteContent({ path }: { path: string }) {
  if (path === '/') return <Home />;
  if (path === '/about-us') return <AboutUs />;
  if (path === '/services') return <Capabilities />;

  if (path.startsWith('/services/')) {
    const slug = path.split('/')[2] as keyof typeof serviceRoutes;
    const ServicePage = serviceRoutes[slug];

    return ServicePage
      ? <ServicePage />
      : <SimplePage title="Service not found." />;
  }

  if (path === '/contact-us') return <ContactUs />;
  if (path === '/career') return <Career />;
  if (path === '/our-team') return <TeamPage />;
  if (path === '/industries') return <Industries />;
  if (path === '/portfolio') return <Portfolio />;
  if (path === '/blogs') return <Blogs />;
  if (path === '/blogs/article') return <BlogArticle />;

  if (path.startsWith('/blogs/')) {
    return blogSlugs.has(path.split('/')[2])
      ? <BlogArticle />
      : <SimplePage title="Blog article not found." />;
  }

  if (path === '/privacy-policy')
    return <LegalPage type="privacy" />;

  if (path === '/terms-and-conditions')
    return <LegalPage type="terms" />;

  return <SimplePage title="Let's make something useful." />;
}

function RouteFallback() {
  return (
    <div
      className="route-fallback"
      role="status"
      aria-live="polite"
    >
      <span
        className="route-fallback-spinner"
        aria-hidden="true"
      />
      <span>Loading page…</span>
    </div>
  );
}

export default function App() {
  const currentPath = usePath();

  const path =
    currentPath
      .split('?')[0]
      .split('#')[0]
      .replace(/\/+$/, '') || '/';

  const isAdmin = path.startsWith('/admin');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [path]);

  if (isAdmin) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <AdminPage />
      </Suspense>
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <SocialRail />

      <main className="page-enter">
        <Suspense fallback={<RouteFallback />}>
          <RouteContent path={path} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
