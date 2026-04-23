// src/app/page.tsx
export const dynamic = 'force-dynamic';

// Try this path instead:
import HomeHub from "@/components/HomeHub/HomeHub";
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <HomeHub />
    </main>
  );
}