"use client";

import React, { useState } from 'react';
import { Check, Zap, Crown, Star } from 'lucide-react';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // THE ACTION: This function handles the checkout trigger
  const handlePayment = async (planName: string, cycle: string) => {
    console.log(`Initializing payment for ${planName} on ${cycle} billing...`);
    
    // As a builder, this alert confirms your logic is working before we add Razorpay
    alert(`Redirecting to Secure Checkout for ${planName} (${cycle})...`);
    
    // In the next phase, we will call the /api/create-order route here
  };

  const plans = [
    {
      name: "Legacy Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Neural testing tier for hobbyists.",
      features: ["3 Neural credits / day", "Standard speed", "Public archive", "Community support"],
      button: "Current Plan",
      icon: <Zap className="text-gray-400" />,
      highlight: false
    },
    {
      name: "Legacy Pro",
      monthlyPrice: 99,
      yearlyPrice: 79, 
      description: "For digital builders and creators.",
      features: ["Unlimited Credits", "Priority AI Queue", "HD Face Clarity", "Private Vault", "Priority Support"],
      button: "Upgrade to Pro",
      icon: <Star className="text-blue-400" />,
      highlight: false
    },
    {
      name: "Legacy Ultra",
      monthlyPrice: 199,
      yearlyPrice: 159,
      description: "The CEO tier. Maximum power.",
      features: ["All Pro Features", "Batch Processing", "Commercial Rights", "API Access", "Early Access"],
      button: "Claim Ultra",
      icon: <Crown className="text-emerald-500" />,
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 pb-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Scale Your Legacy
        </h1>
        
        {/* THE HOOK: Billing Toggle (MNC Logic) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={billingCycle === 'monthly' ? 'text-white font-medium' : 'text-gray-500'}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 bg-emerald-500/20 rounded-full p-1 flex items-center transition-all cursor-pointer border border-emerald-500/30"
          >
            <div className={`w-5 h-5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all ${billingCycle === 'yearly' ? 'translate-x-7' : ''}`} />
          </button>
          <span className={billingCycle === 'yearly' ? 'text-white font-medium' : 'text-gray-500'}>
            Yearly <span className="text-emerald-500 text-xs font-bold ml-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">SAVE 20%</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`p-8 rounded-3xl border transition-all duration-300 hover:scale-[1.02] flex flex-col relative ${
              plan.highlight 
                ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
                : 'border-white/10 bg-white/5'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-tighter">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {plan.icon}
                </div>
                <h2 className="text-xl font-bold">{plan.name}</h2>
              </div>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-500 text-sm font-medium">/month</span>
              </div>
              {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                <p className="text-emerald-500/80 text-[10px] mt-1 font-bold italic">
                  *Billed ₹{plan.yearlyPrice * 12} annually
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> 
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handlePayment(plan.name, billingCycle)}
              disabled={plan.name === "Legacy Free"}
              className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                plan.highlight 
                  ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20' 
                  : plan.name === "Legacy Free"
                    ? 'bg-white/5 text-gray-500 cursor-default border border-white/10'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            >
              {plan.button}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-500 text-xs">
          Payments secured by <span className="text-white font-bold tracking-widest">RAZORPAY</span>
        </p>
        <p className="text-gray-600 text-[10px] mt-2 italic">
          By upgrading, you agree to the Axis Legacy Terms of Digital Restoration.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;