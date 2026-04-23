import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Ensure these match your .env.local exactly
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: Request) {
  try {
    const { amount, planName } = await request.json();

    // Razorpay expects amount in PAISE (100 Paise = 1 Rupee)
    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: `axis_legacy_${Date.now()}`,
      notes: {
        plan: planName,
      }
    });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("RAZORPAY_ORDER_ERROR:", error);
    return NextResponse.json(
      { error: "Order creation failed", details: error.message }, 
      { status: 500 }
    );
  }
}
