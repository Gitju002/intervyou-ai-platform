// import { type NextRequest, NextResponse } from "next/server"
// import Razorpay from "razorpay"

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// })

// export async function POST(request: NextRequest) {
//   try {
//     const { amount, currency, planId, userDetails } = await request.json()

//     const options = {
//       amount: amount, // amount in paise
//       currency: currency || "INR",
//       receipt: `receipt_${Date.now()}`,
//       notes: {
//         planId,
//         userEmail: userDetails.email,
//         userName: userDetails.name,
//       },
//     }

//     const order = await razorpay.orders.create(options)

//     return NextResponse.json({
//       success: true,
//       order,
//     })
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error)
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Failed to create order",
//       },
//       { status: 500 },
//     )
//   }
// }
