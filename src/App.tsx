import React, { useState } from 'react';
import { CatalogProvider, useCatalog } from './context/CatalogContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { MultiDayPackages } from './components/MultiDayPackages';
import { DailyQuadTours } from './components/DailyQuadTours';
import { HowItWorks } from './components/HowItWorks';
import { PillarsSection } from './components/PillarsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BaseOperationsMap } from './components/BaseOperationsMap';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ItineraryModal } from './components/ItineraryModal';
import { BookingQuoterModal } from './components/BookingQuoterModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminManagerModal } from './components/AdminManagerModal';
import { MultiDayPackage, DailyQuadTour } from './data/toursData';

function MainAppContent() {
  const { packages, tours, isAdmin } = useCatalog();
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es');
  const [activeView, setActiveView] = useState<'multiday' | 'atv'>('multiday');

  // Modal States
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [selectedItineraryPackage, setSelectedItineraryPackage] = useState<MultiDayPackage | null>(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPkg, setBookingPkg] = useState<MultiDayPackage | null>(null);
  const [bookingTour, setBookingTour] = useState<DailyQuadTour | null>(null);
  const [bookingIsDouble, setBookingIsDouble] = useState(false);

  // Admin Modals
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminManagerOpen, setIsAdminManagerOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'multiday' | 'atv' | 'cloudflare' | 'security'>('multiday');
  const [adminEditPackageId, setAdminEditPackageId] = useState<string | undefined>(undefined);
  const [adminEditTourId, setAdminEditTourId] = useState<string | undefined>(undefined);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const handleOpenItinerary = (pkg: MultiDayPackage) => {
    setSelectedItineraryPackage(pkg);
    setIsItineraryOpen(true);
  };

  const handleOpenBookingPackage = (pkg: MultiDayPackage) => {
    setBookingPkg(pkg);
    setBookingTour(null);
    setBookingIsDouble(false);
    setIsBookingOpen(true);
  };

  const handleOpenBookingTour = (tour: DailyQuadTour, isDouble: boolean) => {
    setBookingTour(tour);
    setBookingPkg(null);
    setBookingIsDouble(isDouble);
    setIsBookingOpen(true);
  };

  const handleOpenGeneralBooking = () => {
    if (activeView === 'multiday') {
      setBookingPkg(packages[0] || null);
      setBookingTour(null);
    } else {
      setBookingTour(tours[0] || null);
      setBookingPkg(null);
    }
    setBookingIsDouble(false);
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithParams = (type: string, pax: string, date: string) => {
    if (type === 'daily') {
      setBookingTour(tours[0] || null);
      setBookingPkg(null);
    } else {
      setBookingPkg(packages[0] || null);
      setBookingTour(null);
    }
    setIsBookingOpen(true);
  };

  // Open Admin Management directly if already logged in, otherwise show login modal
  const handleOpenAdminSection = (tab: 'multiday' | 'atv' | 'cloudflare' = 'multiday', editId?: string) => {
    setAdminTab(tab);
    if (tab === 'multiday') {
      setAdminEditPackageId(editId);
      setAdminEditTourId(undefined);
    } else if (tab === 'atv') {
      setAdminEditTourId(editId);
      setAdminEditPackageId(undefined);
    } else {
      setAdminEditPackageId(undefined);
      setAdminEditTourId(undefined);
    }

    if (isAdmin) {
      setIsAdminManagerOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-carbon-950 text-ivory-200 font-sans antialiased selection:bg-flame-600 selection:text-white">
      {/* Sticky Header with Navigation and View Switcher */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        onOpenBooking={handleOpenGeneralBooking}
        onOpenAdmin={() => handleOpenAdminSection('multiday')}
      />

      {/* Hero Section */}
      <HeroSection
        currentLang={currentLang}
        activeView={activeView}
        onSelectView={(view) => setActiveView(view)}
        onOpenBookingWithParams={handleOpenBookingWithParams}
      />

      {/* Trust Proof Bar with Google Maps Reviews Link */}
      <TrustBar currentLang={currentLang} />

      {/* Dynamic Content Ordered by Active View */}
      {activeView === 'multiday' ? (
        <>
          {/* Multi-Day Featured Packages with Cloudflare D1 Admin Mode */}
          <MultiDayPackages
            currentLang={currentLang}
            onOpenItinerary={handleOpenItinerary}
            onOpenBooking={handleOpenBookingPackage}
            onOpenAdminLogin={() => handleOpenAdminSection('multiday')}
            onOpenAdminManager={(tab, editId) => handleOpenAdminSection(tab || 'multiday', editId)}
          />

          {/* Daily Quad Tours with Cloudflare D1 Admin Mode */}
          <DailyQuadTours
            currentLang={currentLang}
            onBookTour={handleOpenBookingTour}
            onOpenAdminLogin={() => handleOpenAdminSection('atv')}
            onOpenAdminManager={(tab, editId) => handleOpenAdminSection(tab || 'atv', editId)}
          />
        </>
      ) : (
        <>
          {/* Daily Quad Tours Featured First */}
          <DailyQuadTours
            currentLang={currentLang}
            onBookTour={handleOpenBookingTour}
            onOpenAdminLogin={() => handleOpenAdminSection('atv')}
            onOpenAdminManager={(tab, editId) => handleOpenAdminSection(tab || 'atv', editId)}
          />

          {/* Multi-Day Packages Second */}
          <MultiDayPackages
            currentLang={currentLang}
            onOpenItinerary={handleOpenItinerary}
            onOpenBooking={handleOpenBookingPackage}
            onOpenAdminLogin={() => handleOpenAdminSection('multiday')}
            onOpenAdminManager={(tab, editId) => handleOpenAdminSection(tab || 'multiday', editId)}
          />
        </>
      )}

      {/* How it Works / Workflow */}
      <HowItWorks currentLang={currentLang} />

      {/* Pillars of Excellence */}
      <PillarsSection currentLang={currentLang} />

      {/* Testimonials and Reviews with Official Google Maps link */}
      <ReviewsSection currentLang={currentLang} />

      {/* Base Camp, Briefing & Map */}
      <BaseOperationsMap currentLang={currentLang} />

      {/* FAQ Accordions */}
      <FaqSection currentLang={currentLang} />

      {/* Footer with Google Maps Link */}
      <Footer
        currentLang={currentLang}
        onSelectView={(view) => setActiveView(view)}
        onOpenBooking={handleOpenGeneralBooking}
      />

      {/* Floating Action Button */}
      <FloatingWhatsApp currentLang={currentLang} />

      {/* Modals */}
      <ItineraryModal
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        packageData={selectedItineraryPackage}
        currentLang={currentLang}
        onBook={(pkg) => {
          setIsItineraryOpen(false);
          handleOpenBookingPackage(pkg);
        }}
      />

      <BookingQuoterModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentLang={currentLang}
        initialPackage={bookingPkg}
        initialTour={bookingTour}
        initialIsDouble={bookingIsDouble}
      />

      {/* Administrator Authentication Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => setIsAdminManagerOpen(true)}
      />

      {/* Administrator Management Panel for Cloudflare D1 & Catalog */}
      <AdminManagerModal
        isOpen={isAdminManagerOpen}
        onClose={() => {
          setIsAdminManagerOpen(false);
          setAdminEditPackageId(undefined);
          setAdminEditTourId(undefined);
        }}
        defaultTab={adminTab}
        initialEditPackageId={adminEditPackageId}
        initialEditTourId={adminEditTourId}
      />
    </div>
  );
}

export default function App() {
  return (
    <CatalogProvider>
      <MainAppContent />
    </CatalogProvider>
  );
}
