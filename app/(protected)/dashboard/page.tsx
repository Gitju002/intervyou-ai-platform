import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MapPin,
  FileText,
  MessageCircle,
  Brain,
  TrendingUp,
  Target,
  LogOut,
  Zap,
  Crown,
  Plus,
  CreditCard,
  Star,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // const [credits, setCredits] = useState(25);
  const user = await getCurrentUser();

  // const handleSignOut = () => {
  //   signOut();
  // };

  const credits = 25;
  const getCreditStatus = () => {
    if (credits > 20)
      return {
        color: "text-green-400",
        bg: "bg-green-500/20",
        status: "Excellent",
      };
    if (credits > 10)
      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        status: "Good",
      };
    if (credits > 5)
      return {
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        status: "Low",
      };
    return { color: "text-red-400", bg: "bg-red-500/20", status: "Critical" };
  };

  const creditStatus = getCreditStatus();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8 glass">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center neon-purple">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-white">IntervYou</span>
            <div className="text-xs text-purple-400 font-medium">Dashboard</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Zap className={`w-4 h-4 ${creditStatus.color}`} />
            <span className="text-white font-medium">{credits} Credits</span>
            <Badge
              variant={"outline"}
              className={`${creditStatus.bg} ${creditStatus.color} border-0`}
            >
              {creditStatus.status}
            </Badge>
          </div>
          <span className="text-gray-300">Welcome, {user.name}</span>
          <Button
            variant="ghost"
            // onClick={handleSignOut}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="relative z-10 p-6 lg:px-8">
        {/* Credits Warning */}
        {credits <= 10 && (
          <div className="mb-6">
            <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-orange-400" />
                    <div>
                      <h3 className="text-white font-semibold">
                        Low Credits Warning
                      </h3>
                      <p className="text-gray-300 text-sm">
                        You have {credits} credits remaining. Purchase more to
                        continue using all features.
                      </p>
                    </div>
                  </div>
                  <Link href="/pricing">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Buy Credits
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Dashboard</h1>
          <p className="text-gray-300 text-lg">
            Track your progress and continue your interview preparation journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-premium-card border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    Available Credits
                  </p>
                  <p className="text-3xl font-bold text-white">{credits}</p>
                  <p className={`text-sm ${creditStatus.color}`}>
                    {creditStatus.status}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center neon-purple`}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-premium-card border border-white/10 hover:border-green-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    Interviews Completed
                  </p>
                  <p className="text-3xl font-bold text-white">12</p>
                  <p className="text-sm text-green-400">+3 this week</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center neon-green">
                  <Mic className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-premium-card border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    Average Score
                  </p>
                  <p className="text-3xl font-bold text-white">87%</p>
                  <p className="text-sm text-blue-400">+5% improvement</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center neon-blue">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-premium-card border border-white/10 hover:border-orange-500/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">
                    Study Streak
                  </p>
                  <p className="text-3xl font-bold text-white">7 days</p>
                  <p className="text-sm text-orange-400">Keep it up!</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="bg-premium-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Quick Actions
              </CardTitle>
              <CardDescription className="text-gray-300">
                Jump into your interview preparation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-y-4">
                <Link href="/interview">
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-8 text-lg neon-purple"
                    disabled={credits < 5}
                  >
                    <Mic className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div>Start Mock Interview</div>
                      <div className="text-sm opacity-80">Costs 5 credits</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/roadmap">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 py-8 text-lg glass"
                    disabled={credits < 3}
                  >
                    <MapPin className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div>Generate Career Roadmap</div>
                      <div className="text-sm opacity-80">Costs 3 credits</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/cv-analysis">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 py-8 text-lg glass"
                    disabled={credits < 2}
                  >
                    <FileText className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div>Analyze CV</div>
                      <div className="text-sm opacity-80">Costs 2 credits</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 py-8 text-lg glass"
                    disabled={credits < 1}
                  >
                    <MessageCircle className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div>AI Chat Assistant</div>
                      <div className="text-sm opacity-80">
                        Costs 1 credit per session
                      </div>
                    </div>
                  </Button>
                </Link>
                <Link href="/questions">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-white/20 text-white hover:bg-white/10 py-8 text-lg glass"
                  >
                    <Brain className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div>Browse Questions</div>
                      <div className="text-sm opacity-80">Free access</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Credit Management */}
          <Card className="bg-premium-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <CreditCard className="w-6 h-6 mr-3" />
                Credit Management
              </CardTitle>
              <CardDescription className="text-gray-300">
                Manage your credits and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-semibold">
                    Current Balance
                  </span>
                  <div className="flex items-center space-x-2">
                    <Zap className={`w-5 h-5 ${creditStatus.color}`} />
                    <span className="text-2xl font-bold text-white">
                      {credits}
                    </span>
                  </div>
                </div>
                <Progress value={(credits / 50) * 100} className="mb-4" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Voice Interview:</span>
                    <span className="text-white ml-2">5 credits</span>
                  </div>
                  <div>
                    <span className="text-gray-400">CV Analysis:</span>
                    <span className="text-white ml-2">2 credits</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Career Roadmap:</span>
                    <span className="text-white ml-2">3 credits</span>
                  </div>
                  <div>
                    <span className="text-gray-400">AI Chat:</span>
                    <span className="text-white ml-2">1 credit</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 neon-purple">
                    <Plus className="w-5 h-5 mr-2" />
                    Buy More Credits
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 py-4 glass"
                  >
                    <Crown className="w-5 h-5 mr-2" />
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities & Performance */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="bg-premium-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    Software Engineer Mock Interview
                  </p>
                  <p className="text-gray-400 text-sm">
                    2 hours ago • 5 credits used
                  </p>
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-green-500/20 text-green-300"
                >
                  Score: 88%
                </Badge>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    CV Analysis Completed
                  </p>
                  <p className="text-gray-400 text-sm">
                    1 day ago • 2 credits used
                  </p>
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-blue-500/20 text-blue-300"
                >
                  Improved
                </Badge>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">
                    Full Stack Developer Roadmap
                  </p>
                  <p className="text-gray-400 text-sm">
                    3 days ago • 3 credits used
                  </p>
                </div>
                <Badge
                  variant={"outline"}
                  className="bg-purple-500/20 text-purple-300"
                >
                  Generated
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-premium-card border border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl">
                Performance Metrics
              </CardTitle>
              <CardDescription className="text-gray-300">
                Your improvement over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Communication Skills</span>
                    <span className="text-white font-semibold">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Technical Knowledge</span>
                    <span className="text-white font-semibold">82%</span>
                  </div>
                  <Progress value={82} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Problem Solving</span>
                    <span className="text-white font-semibold">94%</span>
                  </div>
                  <Progress value={94} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Confidence Level</span>
                    <span className="text-white font-semibold">91%</span>
                  </div>
                  <Progress value={91} className="h-3" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div>
                    <h3 className="text-white font-semibold">
                      Achievement Unlocked!
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Completed 10+ interviews with 85%+ average score
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
