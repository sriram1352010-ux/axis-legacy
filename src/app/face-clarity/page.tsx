"use client";

import dynamicImport from 'next/dynamic'; 
import { useEffect, useState } from "react";

// THE FIX: This prevents Next.js from looking at the tool during build-time.
// 'ssr: false' ensures it only loads on the client side (the browser).
const FaceClarityTool = dynamicImport(
  () => import('@/components/tools/FaceClarity/FaceClarityTool'),
  { 
    ssr: false, 
    loading: () => <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-emerald-500 font-bold animate-pulse">LOADING NEURAL ENGINE...</div>
    </div> 
  }
);

export const dynamic = 'force-dynamic';

export default function FaceClarityPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Standard safety check
  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-black pt-10">
      <FaceClarityTool />
    </main>
  );
}
