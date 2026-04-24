import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';



export async function POST(request: Request) {
  // 1. Get keys ONLY when the request happens
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  // 2. Prevent the crash if keys aren't ready yet
  if (!key_id || !key_secret) {
    return NextResponse.json(
      { error: "Payment system is activating. Please try again soon." },
      { status: 503 }
    );
  }

  try {
    const razorpay = new Razorpay({ key_id, key_secret });
    const { amount, planName } = await request.json();

    
    const order = await razorpay.orders.create({
      amount: amount * 100, // Correctly converted to Paise
      currency: "INR",
      receipt: `axis_legacy_${Date.now()}`,
      notes: { plan: planName }
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
