// import { type NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(request: NextRequest) {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       planId,
//       userDetails,
//     } = await request.json();

//     // Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Invalid signature",
//         },
//         { status: 400 }
//       );
//     }

//     // Payment verified successfully
//     // Here you would typically:
//     // 1. Save payment details to database
//     // 2. Update user credits
//     // 3. Send confirmation email
//     // 4. Create user account if new user

//     const plans = {
//       session: { credits: 1, duration: null },
//       weekly: { credits: 50, duration: 7 },
//       monthly: { credits: 150, duration: 30 },
//     };

//     const selectedPlan = plans[planId as keyof typeof plans];

//     // Simulate database operations
//     console.log("Payment verified for:", {
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       planId,
//       userDetails,
//       creditsAdded: selectedPlan.credits,
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Payment verified successfully",
//       credits: selectedPlan.credits,
//     });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to verify payment",
//       },
//       { status: 500 }
//     );
//   }
// }
