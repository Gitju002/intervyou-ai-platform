"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")

  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle")
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const plans = {
    session: { name: "Per Session", price: 99, credits: 1, description: "Voice Interview Only" },
    weekly: { name: "Weekly Plan", price: 500, credits: 50, description: "All Features for 1 Week" },
    monthly: { name: "Monthly Plan", price: 1000, credits: 150, description: "All Features for 1 Month" },
  }

  const selectedPlan = plans[planId as keyof typeof plans] || plans.session

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = async () => {
    if (!userDetails.name || !userDetails.email || !userDetails.phone) {
      alert("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setPaymentStatus("processing")

    try {
      // Create order on backend
      const orderResponse = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: selectedPlan.price * 100, // Convert to paise
          currency: "INR",
          planId,
          userDetails,
        }),
      })

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error(orderData.error || "Failed to create order")
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "IntervYou",
        description: `${selectedPlan.name} - ${selectedPlan.description}`,
        order_id: orderData.order.id,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: "#7c3aed",
        },
        handler: async (response: any) => {
          // Verify payment on backend
          const verifyResponse = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId,
              userDetails,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            setPaymentStatus("success")
            // Redirect to dashboard after 3 seconds
            setTimeout(() => {
              window.location.href = "/dashboard"
            }, 3000)
          } else {
            setPaymentStatus("failed")
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
            setPaymentStatus("idle")
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="bg-premium-card border border-green-500/50 max-w-md w-full neon-green">
          <CardContent className="text-center p-8">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Payment Successful!</h2>
            <p className="text-gray-300 mb-6">
              Your {selectedPlan.name} has been activated. You now have {selectedPlan.credits} credits.
            </p>
            <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="bg-premium-card border border-red-500/50 max-w-md w-full">
          <CardContent className="text-center p-8">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Payment Failed</h2>
            <p className="text-gray-300 mb-6">There was an issue processing your payment. Please try again.</p>
            <Button
              onClick={() => setPaymentStatus("idle")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8 glass">
        <Link href="/pricing">
          <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-400" />
          <span className="text-sm text-gray-300">Secure Payment</span>
        </div>
      </nav>

      <div className="relative z-10 p-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Complete Your Purchase</h1>
            <p className="text-gray-300">Secure payment powered by Razorpay</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card className="bg-premium-card border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{selectedPlan.name}</h3>
                  <p className="text-gray-300 mb-4">{selectedPlan.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-300">Credits Included:</span>
                    <Badge className="bg-purple-600/20 text-purple-300">{selectedPlan.credits} Credits</Badge>
                  </div>
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-white">Total:</span>
                    <span className="text-white">₹{selectedPlan.price}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">What you get:</h4>
                  {planId === "session" ? (
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />1 Voice Interview Session
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        AI-powered Feedback
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Performance Metrics
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Unlimited Voice Interviews
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        CV Analysis & Optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Career Roadmap Generation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        24/7 AI Chat Assistant
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Advanced Analytics
                      </li>
                    </ul>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="bg-premium-card border border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={userDetails.name}
                      onChange={(e) => setUserDetails((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={userDetails.phone}
                      onChange={(e) => setUserDetails((prev) => ({ ...prev, phone: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-white font-semibold">Secure Payment</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Your payment is secured by Razorpay with 256-bit SSL encryption. We support all major payment
                    methods including cards, UPI, and net banking.
                  </p>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isLoading || paymentStatus === "processing"}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 text-lg font-semibold neon-purple"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay ₹{selectedPlan.price}
                      <CreditCard className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-400">
                    By proceeding, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
