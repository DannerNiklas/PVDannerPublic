"use client";

import { auth } from '@/services/firestore'
import Image from 'next/image'
import LandingPage from './LandingPage';

export default function Home() {
  return (
    <div className="w-full overflow-hidden block max-w-screen-lg self-center">
      <LandingPage />
    </div>
  )
}
