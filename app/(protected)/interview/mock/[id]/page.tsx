import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/agent";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/display-tech-icons";
import Container from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AudioLines } from "lucide-react";
import Link from "next/link";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/interview");

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
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <AudioLines className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              Take Mock Interview
            </span>
          </div>
        </div>
        <Badge className="bg-green-500/20 text-green-300 text-xs sm:text-sm">
          Powered by VAPI
        </Badge>
      </nav>

      <Container className="relative z-20 mt-6 space-y-8">
        <div className="flex flex-row gap-4 justify-between">
          <div className="flex flex-row gap-4 items-center max-sm:flex-col">
            <div className="flex flex-row gap-4 items-center">
              <Image
                src={getRandomInterviewCover()}
                alt="cover-image"
                width={40}
                height={40}
                className="rounded-full object-cover size-[40px]"
              />
              <h3 className="capitalize">{interview.role} Interview</h3>
            </div>

            <DisplayTechIcons techStack={interview.techstack} />
          </div>

          <p className="bg-slate-900 px-4 py-2 rounded-lg h-fit">
            {interview.type}
          </p>
        </div>
        <Agent
          userName={user?.name!}
          userId={user?.id}
          interviewId={id}
          type="interview"
          questions={interview.questions}
          feedbackId={feedback?.id}
        />
      </Container>
    </div>
  );
};

export default InterviewDetails;
