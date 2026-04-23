// src/app/components/ui/PremiumIncentive.tsx
import { Zap, Crown, Check, X } from 'lucide-react';

export const PremiumIncentive = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="relative bg-zinc-950 border border-amber-500/30 rounded-3xl p-8 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.1)]">
      <button onClick={onClose} className="absolute top-4 right-4 text-zinc-500 hover:text-white">
        <X size={20} />
      </button>
      
      <div className="flex items-center gap-2 text-amber-500 font-black tracking-widest text-xs mb-4">
        <Crown size={14} fill="currentColor" /> AXIS LEGACY PRO
      </div>

      <h3 className="text-2xl font-bold text-white mb-6 italic">Unlock Unlimited Potential</h3>

      <div className="space-y-4 mb-8">
        {[
          { f: "3 Daily Credits", p: "Unlimited Generation" },
          { f: "Standard Quality", p: "Ultra-HD 4K Upscaling" },
          { f: "Standard Queue", p: "Priority Neural Processing" }
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-zinc-500 text-sm">{item.f}</span>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Check size={14} /> {item.p}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl transition-all flex items-center justify-center gap-2">
        UPGRADE TO PRO <Zap size={18} fill="currentColor" />
      </button>
    </div>
  );
};