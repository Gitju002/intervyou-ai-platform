import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Mic,
  Brain,
  FileText,
  MessageCircle,
  MapPin,
  Users,
  Star,
  Zap,
  Shield,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const isLoggedIn = await isAuthenticated();

  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 glass">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center neon-purple">
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-white">
              IntervYou
            </span>
            <div className="text-xs text-purple-400 font-medium hidden sm:block">
              AI Interview Platform
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10 border border-white/10 text-sm sm:text-base px-3 sm:px-4"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 neon-purple text-sm sm:text-base px-3 sm:px-4">
              Get Started
              <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-20 sm:pb-32">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant={"outline"}
            className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/30 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
          >
            <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Premium AI-Powered Interview Preparation
          </Badge>

          <h1 className=" text-4xl font-bold sm:text-6xl lg:text-7xl  text-white mb-6 sm:mb-8 leading-tight">
            Where Your Career
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block">
              Conversation Begins
            </span>
          </h1>

          <p className="mona-sans-font text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
            Master your interviews with cutting-edge AI technology. Get
            personalized feedback, career roadmaps, and expert guidance to land
            your dream job.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 neon-purple"
              >
                Start Free Trial
                <Zap className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 glass"
              >
                View Pricing
                <Star className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                50,000+
              </div>
              <div className="text-gray-400 text-sm sm:text-base">
                Successful Interviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                98%
              </div>
              <div className="text-gray-400 text-sm sm:text-base">
                Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-gray-400 text-sm sm:text-base">
                AI Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              Premium Features
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto px-4">
              Everything you need to excel in interviews and advance your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-premium-card border border-white/10 hover:border-purple-500/50 transition-all duration-300 neon-purple">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 neon-purple">
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  AI Mock Interviews
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Practice with advanced AI that adapts to your responses and
                  provides real-time feedback.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-purple-600/20 text-purple-300 text-xs sm:text-sm"
                >
                  Voice Powered
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-premium-card border border-white/10 hover:border-blue-500/50 transition-all duration-300 neon-blue">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 neon-blue">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Career Roadmaps
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Get personalized learning paths and development strategies for
                  your target career.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-blue-600/20 text-blue-300 text-xs sm:text-sm"
                >
                  AI Generated
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-premium-card border border-white/10 hover:border-green-500/50 transition-all duration-300 neon-green">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 neon-green">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  CV Analysis
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Advanced AI analysis with industry-specific recommendations
                  and ATS optimization.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-green-600/20 text-green-300 text-xs sm:text-sm"
                >
                  Expert Level
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-premium-card border border-white/10 hover:border-orange-500/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  AI Chat Assistant
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  24/7 intelligent support for interview questions and career
                  guidance.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-orange-600/20 text-orange-300 text-xs sm:text-sm"
                >
                  Always Available
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-premium-card border border-white/10 hover:border-indigo-500/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Question Bank
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Access 10,000+ curated interview questions across all
                  industries and roles.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-indigo-600/20 text-indigo-300 text-xs sm:text-sm"
                >
                  Comprehensive
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-premium-card border border-white/10 hover:border-pink-500/50 transition-all duration-300">
              <CardContent className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
                  Performance Analytics
                </h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Detailed insights and progress tracking with personalized
                  improvement plans.
                </p>
                <Badge
                  variant={"outline"}
                  className="bg-pink-600/20 text-pink-300 text-xs sm:text-sm"
                >
                  Data Driven
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl mb-8 sm:mb-12 px-4">
            Choose the plan that fits your interview preparation needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-premium-card border border-white/10 p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Per Session
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  ₹99
                </div>
                <div className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  Voice Interview Only
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-purple-600/20 text-purple-300 text-xs sm:text-sm"
                >
                  Pay as you go
                </Badge>
              </div>
            </Card>

            <Card className="bg-premium-card border border-purple-500/50 p-6 sm:p-8 neon-purple relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <Badge
                  variant={"outline"}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm"
                >
                  Most Popular
                </Badge>
              </div>
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Weekly
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  ₹500
                </div>
                <div className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  All Features
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-purple-600/20 text-purple-300 text-xs sm:text-sm"
                >
                  Best Value
                </Badge>
              </div>
            </Card>

            <Card className="bg-premium-card border border-white/10 p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Monthly
                </h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  ₹1000
                </div>
                <div className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                  All Features
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-blue-600/20 text-blue-300 text-xs sm:text-sm"
                >
                  Premium
                </Badge>
              </div>
            </Card>
          </div>

          <div className="mt-8 sm:mt-12">
            <Link href="/pricing">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 neon-purple">
                View All Plans
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-purple-500/30 neon-purple">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
              Join thousands of professionals who have successfully landed their
              dream jobs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 neon-purple"
                >
                  Start Your Journey
                  <Zap className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-6 glass"
                >
                  Watch Demo
                  <Shield className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 glass">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center neon-purple">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  IntervYou
                </span>
                <div className="text-xs text-purple-400 hidden sm:block">
                  AI Interview Platform
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-sm text-center md:text-right">
              © 2024 IntervYou. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
