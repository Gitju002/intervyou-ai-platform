"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Check,
  Crown,
  Zap,
  Star,
  Mic,
  Brain,
  FileText,
  MessageCircle,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: "session",
      name: "Per Session",
      price: "₹99",
      period: "per session",
      description: "Perfect for occasional practice",
      features: [
        "Voice Interview Only",
        "AI-powered feedback",
        "Basic performance metrics",
        "Standard question bank",
        "Email support",
      ],
      limitations: [
        "No CV analysis",
        "No career roadmap",
        "No chat assistant",
        "Limited to voice interviews",
      ],
      buttonText: "Buy Session",
      popular: false,
      color: "from-gray-600 to-gray-700",
      icon: Mic,
    },
    {
      id: "weekly",
      name: "Weekly Plan",
      price: "₹500",
      period: "per week",
      description: "Most popular for intensive preparation",
      features: [
        "All Features Included",
        "Unlimited voice interviews",
        "CV analysis & optimization",
        "Personalized career roadmaps",
        "24/7 AI chat assistant",
        "Advanced analytics",
        "Priority support",
        "Industry-specific questions",
      ],
      limitations: [],
      buttonText: "Start Weekly Plan",
      popular: true,
      color: "from-purple-600 to-blue-600",
      icon: Crown,
    },
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "₹1000",
      period: "per month",
      description: "Best value for comprehensive preparation",
      features: [
        "All Features Included",
        "Unlimited everything",
        "Advanced AI models",
        "Custom interview scenarios",
        "Detailed progress reports",
        "Expert-level feedback",
        "Premium support",
        "Early access to new features",
      ],
      limitations: [],
      buttonText: "Start Monthly Plan",
      popular: false,
      color: "from-blue-600 to-cyan-600",
      icon: Star,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Redirect to payment page with selected plan
    window.location.href = `/payment?plan=${planId}`;
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden antialiased pattern">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8 glass">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <Image
              src="/IntervYou-Logo.svg"
              alt="IntervYou Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold text-white">Pricing Plans</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 p-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select the perfect plan for your interview preparation journey.
              All plans include our core AI technology.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.id}
                  className={`glass border ${
                    plan.id === "weekly" ? "bg-premium-dark" : ""
                  } ${
                    plan.popular
                      ? "border-purple-500/50 neon-purple"
                      : "border-white/10 hover:border-white/20"
                  } transition-all duration-300 relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2">
                        <Crown className="w-4 h-4 mr-2" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-20">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${
                        plan.color
                      } rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                        plan.popular ? "neon-purple" : ""
                      }`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                      {plan.name}
                    </CardTitle>
                    <div className="text-5xl font-bold text-white mb-2">
                      {plan.price}
                    </div>
                    <div className="text-gray-400 mb-4">{plan.period}</div>
                    <p className="text-gray-300">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="px-8 pb-8">
                    <div className="space-y-4 mb-8">
                      <h4 className="text-white font-semibold flex items-center">
                        <Check className="w-5 h-5 text-green-400 mr-2" />
                        Included Features
                      </h4>
                      {plan.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}

                      {plan.limitations.length > 0 && (
                        <>
                          <h4 className="text-white font-semibold flex items-center mt-6">
                            <span className="w-5 h-5 text-red-400 mr-2">×</span>
                            Not Included
                          </h4>
                          {plan.limitations.map((limitation, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <span className="w-4 h-4 text-red-400 flex-shrink-0">
                                ×
                              </span>
                              <span className="text-gray-400">
                                {limitation}
                              </span>
                            </div>
                          ))}
                        </>
                      )}
                    </div>

                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 neon-purple"
                          : "bg-white/10 hover:bg-white/20 border border-white/20"
                      } text-white py-6 text-lg font-semibold`}
                    >
                      {plan.buttonText}
                      <Zap className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature Comparison */}
          <div className="bg-premium-card border border-white/10 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Feature Comparison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-white font-semibold py-4">
                      Features
                    </th>
                    <th className="text-center text-white font-semibold py-4">
                      Per Session
                    </th>
                    <th className="text-center text-white font-semibold py-4">
                      Weekly
                    </th>
                    <th className="text-center text-white font-semibold py-4">
                      Monthly
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="py-4 flex items-center">
                      <Mic className="w-5 h-5 mr-3 text-purple-400" />
                      Voice Interviews
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 flex items-center">
                      <FileText className="w-5 h-5 mr-3 text-blue-400" />
                      CV Analysis
                    </td>
                    <td className="text-center py-4">
                      <span className="text-red-400">×</span>
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-3 text-green-400" />
                      Career Roadmaps
                    </td>
                    <td className="text-center py-4">
                      <span className="text-red-400">×</span>
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 flex items-center">
                      <MessageCircle className="w-5 h-5 mr-3 text-orange-400" />
                      AI Chat Assistant
                    </td>
                    <td className="text-center py-4">
                      <span className="text-red-400">×</span>
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-4">
                      <Check className="w-5 h-5 text-green-400 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 flex items-center">
                      <Brain className="w-5 h-5 mr-3 text-indigo-400" />
                      Question Bank Access
                    </td>
                    <td className="text-center py-4">
                      <span className="text-yellow-400">Basic</span>
                    </td>
                    <td className="text-center py-4">
                      <span className="text-green-400">Full</span>
                    </td>
                    <td className="text-center py-4">
                      <span className="text-green-400">Premium</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 flex items-center">
                      <Users className="w-5 h-5 mr-3 text-pink-400" />
                      Support Level
                    </td>
                    <td className="text-center py-4">
                      <span className="text-gray-400">Email</span>
                    </td>
                    <td className="text-center py-4">
                      <span className="text-yellow-400">Priority</span>
                    </td>
                    <td className="text-center py-4">
                      <span className="text-green-400">Premium</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-premium-card border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">
                  How does the credit system work?
                </h3>
                <p className="text-gray-300">
                  Each plan gives you credits that are consumed based on usage.
                  Voice interviews consume more credits than text-based
                  features.
                </p>
              </div>
              <div className="bg-premium-card border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">
                  Can I upgrade or downgrade anytime?
                </h3>
                <p className="text-gray-300">
                  Yes, you can change your plan at any time. Unused credits will
                  be carried forward to your new plan.
                </p>
              </div>
              <div className="bg-premium-card border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">
                  Is there a free trial?
                </h3>
                <p className="text-gray-300">
                  New users get 3 free voice interview sessions to try our
                  platform before choosing a plan.
                </p>
              </div>
              <div className="bg-premium-card border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-3">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-300">
                  We accept all major credit/debit cards, UPI, net banking, and
                  digital wallets through Razorpay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
