"use client"; // Must be at the very top

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import AgeTransformTool from '../components/tools/AgeTransform/AgeTransformTool';

export default function AgeTransformPage() {
  const [mounted, setMounted] = useState(false);

  // This ensures the code only runs once the browser is ready
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a clean black screen while the AI engine mounts
  if (!mounted) {
    return <div className="bg-black min-h-screen" />;
  }

  return (
    <main className="min-h-screen bg-black">
       <AgeTransformTool />
    </main>
  );
}