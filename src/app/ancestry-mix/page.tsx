"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import AncestryMixTool from '../components/tools/AncestryMix/AncestryMixTool';

export default function AncestryMixPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <main className="min-h-screen bg-black pt-10">
      <AncestryMixTool />
    </main>
  );
}