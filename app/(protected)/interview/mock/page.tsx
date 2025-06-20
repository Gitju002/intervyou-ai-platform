import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { ArrowLeft, SquarePen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
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
                <SquarePen className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white">
                Generate Mock Interview
              </span>
            </div>
          </div>
          <Badge className="hidden lg:block bg-green-500/20 text-green-300 text-xs sm:text-sm">
            Powered by VAPI
          </Badge>
        </nav>

        <div className="relative z-10 p-4 sm:p-6 lg:px-8">
          <h3 className="text-3xl mb-4">Interview generation</h3>

          <Agent
            userName={user?.name!}
            userId={user?.id}
            profileImage={user?.profileURL}
            type="generate"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
