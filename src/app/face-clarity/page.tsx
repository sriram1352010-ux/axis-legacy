"use client";

import { useEffect, useState } from "react";
import FaceClarityTool from '@/components/tools/FaceClarity/FaceClarityTool';
export const dynamic = 'force-dynamic';
export default function FaceClarityPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-black pt-10">
      <FaceClarityTool />
    </main>
  );
}