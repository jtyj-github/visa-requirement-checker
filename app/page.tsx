'use client';
import AppTitle from '@/components/AppTitle';
import VisaInput from '@/modules/visa/components/VisaInput';
import WorldMapComponent from '@/components/WorldMapComponent';
import './globals.css';

function HomePage() {
  return (
    <div>
      <AppTitle />
      <VisaInput />
      <WorldMapComponent />
    </div>
  );
}

export default HomePage;
