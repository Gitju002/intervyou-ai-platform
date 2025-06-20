import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { AlertCircle, ArrowLeft, CheckCircle, ListChecks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pattern">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* header */}
      <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b border-white/10 glass">
        <div className="flex items-center space-x-4">
          <Link href="/interview">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Interview</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-red-800 rounded-lg flex items-center justify-center">
              <ListChecks className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              Feedback on the Interview
            </span>
          </div>
        </div>
        <Badge
          variant={"outline"}
          className="hidden lg:block bg-green-500/20 text-green-300 text-xs sm:text-sm"
        >
          Powered by GEMINI
        </Badge>
      </nav>

      {/* Main Content */}
      <section className="relative z-10 p-4 sm:p-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Feedback on {interview.role} Interview
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <Badge className="bg-green-500/20 text-green-300 text-base px-4 py-2">
              Overall Score: {feedback?.totalScore}/100
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 text-base px-4 py-2">
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "Date not available"}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Overall Performance */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Overall Performance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {feedback?.totalScore}%
              </div>
              <Progress value={feedback?.totalScore} className="mb-4" />
              <p className="text-gray-300 text-sm">
                {feedback?.finalAssessment}
              </p>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Strengths</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback?.strengths?.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span className="text-gray-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feedback?.areasForImprovement?.map((point, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5" />
                    <span className="text-gray-300 text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Breakdown */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white">Interview Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {feedback?.categoryScores?.map((category, i) => (
              <div
                key={i}
                className="border-b border-white/10 pb-4 last:border-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{category.name}</h3>
                  <Badge
                    className={`${
                      category.score >= 80
                        ? "bg-green-500/20 text-green-300"
                        : category.score >= 60
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {category.score}/100
                  </Badge>
                </div>
                <Progress value={category.score} className="mb-2" />
                <p className="text-gray-300 text-sm">{category.comment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex w-full justify-evenly gap-4 max-sm:flex-col max-sm:items-center">
          <Button variant={"secondary"} className="flex-1">
            <Link href="/dashboard" className="flex w-full justify-center">
              <p className="text-sm font-semibold text-primary-200 text-center">
                Back to dashboard
              </p>
            </Link>
          </Button>
          <Button variant={"default"} className="flex-1">
            <Link
              href={`/interview/mock/${id}`}
              className="flex w-full justify-center"
            >
              <p className="text-sm font-semibold text-black text-center">
                Retake Interview
              </p>
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Feedback;
