/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from './store/useStore';
import { Layout } from './components/Layout';
import { WhatsNew } from './components/WhatsNew';
import { PushNotificationPopup } from './components/PushNotificationPopup';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Courses = lazy(() => import('./pages/Courses').then(m => ({ default: m.Courses })));
const Paths = lazy(() => import('./pages/Paths').then(m => ({ default: m.Paths })));
const Course = lazy(() => import('./pages/Course').then(m => ({ default: m.Course })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Certificate = lazy(() => import('./pages/Certificate').then(m => ({ default: m.Certificate })));
const CertificatesList = lazy(() => import('./pages/CertificatesList').then(m => ({ default: m.CertificatesList })));
const PathDetails = lazy(() => import('./pages/PathDetails').then(m => ({ default: m.PathDetails })));
const Masterclasses = lazy(() => import('./pages/Masterclasses').then(m => ({ default: m.Masterclasses })));
const Verify = lazy(() => import('./pages/Verify').then(m => ({ default: m.Verify })));
const Admin = lazy(() => import('./pages/Admin').then(m => ({ default: m.Admin })));
const Leaderboard = lazy(() => import('./pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Copyright = lazy(() => import('./pages/Copyright').then(m => ({ default: m.Copyright })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Creator = lazy(() => import('./pages/Creator').then(m => ({ default: m.Creator })));

const SuspenseLoader = () => (
  <div className="w-full h-screen flex items-center justify-center bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

export default function App() {
  const { loadContent, language } = useStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language || 'en';
  }, [language, i18n]);

  return (
    <Router>
      <WhatsNew />
      <PushNotificationPopup />
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="paths" element={<Paths />} />
            <Route path="masterclasses" element={<Masterclasses />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="certificates" element={<CertificatesList />} />
            <Route path="certificate/:courseId" element={<Certificate />} />
            <Route path="path/:pathId" element={<PathDetails />} />
            <Route path="verify" element={<Verify />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="about" element={<About />} />
            <Route path="copyright" element={<Copyright />} />
            <Route path="contact" element={<Contact />} />
            <Route path="creator/:creatorId" element={<Creator />} />
          </Route>
          <Route path="/course/:courseId" element={<Course />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
