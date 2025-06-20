import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/interview-card";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import { ArrowLeft, AudioLines } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/layout/Container";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="min-h-screen relative overflow-hidden antialiased pattern">
        {/* Background */}
        <div className="absolute inset-0 ">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-black to-blue-800/30"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b border-white/10 glass">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <AudioLines className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                Interview with AI
              </span>
            </div>
          </div>
          <Badge
            variant={"outline"}
            className="hidden lg:block bg-green-500/20 text-green-300 text-xs sm:text-sm"
          >
            Powered by VAPI
          </Badge>
        </nav>

        <Container className="space-y-6 mb-6">
          {/* Banner Content */}
          <div className="relative z-10 glass mt-4 px-4 py-6 rounded-3xl flex items-center justify-between mx-auto ">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold w-[80%] ">
                Get Interview-Ready with AI-Powered Practice & Feedback
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-200 mona-sans-font">
                Practice real interview questions & get instant feedback
              </p>

              <Button asChild variant={"default"} className="w-max">
                <Link href="/interview/mock">Start an Interview</Link>
              </Button>
            </div>

            <Image
              src="/robot.png"
              alt="robo-dude"
              width={400}
              height={400}
              className="max-sm:hidden"
            />
          </div>

          {/* Interviews Section */}
          {/* Your Interview Section */}
          <div className="relative z-10 flex flex-col gap-3 mx-auto w-full ">
            <h2 className="text-lg font-bold">Your Interviews</h2>
            <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
              {hasPastInterviews ? (
                userInterviews?.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <p>You haven&apos;t taken any interviews yet</p>
              )}
            </div>
          </div>
          {/* Take Interviews Section */}
          <div className="relative z-10 flex flex-col gap-3 mx-auto w-full">
            <h2 className="text-lg font-bold">Take Interviews</h2>
            <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
              {hasUpcomingInterviews ? (
                allInterview?.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <p>There are no interviews available</p>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default Home;
