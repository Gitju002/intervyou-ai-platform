"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  MapPin,
  Target,
  Award,
  Loader2,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
  const [selectedCareer, setSelectedCareer] = useState("");
  const [experience, setExperience] = useState("");
  const [goals, setGoals] = useState("");
  const [roadmapGenerated, setRoadmapGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState("");

  const careers = [
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "UX/UI Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "Machine Learning Engineer",
    "Cybersecurity Specialist",
    "Cloud Architect",
    "Business Analyst",
    "Software Engineer",
    "Web Developer",
    "Game Developer",
    "Blockchain Developer",
    "AI Researcher",
    "Systems Analyst",
    "Network Engineer",
    "Database Administrator",
    "Technical Writer",
    "IT Support Specialist",
    "Quality Assurance Engineer",
    "Digital Marketing Specialist",
    "Sales Engineer",
    "Project Manager",
    "Technical Recruiter",
    "Data Analyst",
    "Frontend Developer",
    "Backend Developer",
    "Embedded Systems Engineer",
    "Robotics Engineer",
    "Augmented Reality Developer",
    "Virtual Reality Developer",
    "Internet of Things (IoT) Developer",
    "Game Designer",
    "Augmented Reality (AR) Developer",
    "Virtual Reality (VR) Developer",
    "Computer Vision Engineer",
    "Natural Language Processing (NLP) Engineer",
  ];

  const experienceLevels = [
    "Complete Beginner",
    "No Technical Background",
    "Some Technical Background",
    "Entry Level (0-1 year)",
    "Junior (0-2 years)",
    "Mid-level (2-5 years)",
    "Senior (5+ years)",
  ];

  const generateRoadmap = async () => {
    if (!selectedCareer || !experience) {
      alert("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career: selectedCareer,
          experience: experience,
          goals: goals,
        }),
      });

      const data = await response.json();
      if (data.roadmap) {
        setRoadmapContent(data.roadmap);
        setRoadmapGenerated(true);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  function parseGeminiRoadmap(text: string) {
    const phases = [];
    const phaseRegex =
      /\*\*PHASE\s\d+: (.+?) \(Duration: (.+?)\)\*\*\n\*\*Description:\*\* (.*?)\n\*\*Skills to Learn:\*\*\n([\s\S]*?)\*\*Recommended Resources:\*\*\n([\s\S]*?)\*\*Projects to Build:\*\*\n([\s\S]*?)(?=(\*\*PHASE|\*\*MILESTONES|\*\*INDUSTRY|\*\*NETWORKING|\*\*$))/g;

    let match;
    while ((match = phaseRegex.exec(text)) !== null) {
      const [
        _,
        title,
        duration,
        description,
        skillsText,
        resourcesText,
        projectsText,
      ] = match;
      phases.push({
        title,
        duration,
        description,
        skills: skillsText
          .trim()
          .split("\n")
          .map((s) => s.replace(/^- /, "").trim()),
        resources: resourcesText
          .trim()
          .split("\n")
          .map((r) => r.replace(/^- /, "").trim()),
        projects: projectsText
          .trim()
          .split("\n")
          .map((p) => p.replace(/^- /, "").trim()),
      });
    }

    const titleMatch = text.match(/\*\*CAREER ROADMAP: (.+?)\*\*/);
    const durationMatch = text.match(/\*\*Estimated Duration:\*\* (.+?)\n/);

    return {
      title: titleMatch?.[1] || "Career Roadmap",
      duration: durationMatch?.[1] || "Not specified",
      phases,
    };
  }

  const parsedRoadmap = useMemo(
    () => parseGeminiRoadmap(roadmapContent),
    [roadmapContent]
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pattern">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
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
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              Career Roadmap
            </span>
          </div>
        </div>
        <Badge
          variant={"outline"}
          className="bg-blue-500/20 text-blue-300 text-xs sm:text-sm"
        >
          Powered by Gemini AI
        </Badge>
      </nav>

      <div className="relative z-10 p-4 sm:p-6 lg:px-8">
        {!roadmapGenerated ? (
          // Setup Phase
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Generate Your Career Roadmap
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Get a personalized learning path tailored to your career goals
                and current experience
              </p>
            </div>

            <Card className="bg-premium-card border border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl">
                  Roadmap Configuration
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Tell us about your career aspirations and current skill level
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">
                    Target Career *
                  </label>
                  <Select
                    value={selectedCareer}
                    onValueChange={setSelectedCareer}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your target career" />
                    </SelectTrigger>
                    <SelectContent>
                      {careers.map((career) => (
                        <SelectItem key={career} value={career}>
                          {career}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">
                    Current Experience Level *
                  </label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">
                    Specific Goals (Optional)
                  </label>
                  <Textarea
                    placeholder="Tell us about your specific career goals, timeline, or areas of interest..."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  />
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">
                    Your roadmap will include:
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Step-by-step learning phases with timelines</li>
                    <li>• Required skills and technologies</li>
                    <li>• Recommended resources and courses</li>
                    <li>• Project ideas for practice</li>
                    <li>• Industry insights and trends</li>
                    <li>• Networking and community recommendations</li>
                  </ul>
                </div>

                <Button
                  onClick={generateRoadmap}
                  className="w-full text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                  disabled={isGenerating || !selectedCareer || !experience}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Roadmap...
                    </>
                  ) : (
                    <>
                      Generate My Roadmap
                      <MapPin className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Generated Roadmap Display
          <div className="max-w-6xl mx-auto">
            <Card className="glass border border-white/10 mb-8">
              <CardContent className="p-6 sm:p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">
                      {parsedRoadmap.title} Career Roadmap
                    </h1>
                    <div className="flex items-center justify-center space-x-4">
                      <Badge
                        variant={"outline"}
                        className="bg-blue-500/20 text-blue-300"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        {parsedRoadmap.duration}
                      </Badge>
                      <Badge
                        variant={"outline"}
                        className="bg-green-500/20 text-green-300"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        {selectedCareer}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {parsedRoadmap.phases.map((phase, index) => (
                      <Card
                        key={index}
                        className="bg-white/5 border-white/10 bg-premium-dark"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="w-full flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                  <span className="text-white font-bold">
                                    {index + 1}
                                  </span>
                                </div>
                                <div>
                                  <CardTitle className="text-white">
                                    {phase.title}
                                  </CardTitle>
                                  <CardDescription className="text-gray-300 hidden md:block">
                                    {phase.description}
                                  </CardDescription>
                                </div>
                              </div>
                              <Badge
                                variant={"outline"}
                                className="bg-purple-500/20 text-nowrap text-purple-300"
                              >
                                {phase.duration}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-white font-medium mb-3 flex items-center">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Skills to Learn
                              </h4>
                              <div className="space-y-2">
                                {phase.skills.map((skill, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start space-x-2"
                                  >
                                    <div className="pt-1 flex-shrink-0">
                                      <CheckCircle className="w-4 h-4 text-green-400" />
                                    </div>
                                    <span className="text-gray-300 break-words">
                                      {skill}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-3 flex items-center">
                                <Award className="w-4 h-4 mr-2" />
                                Recommended Resources
                              </h4>
                              <div className="space-y-2">
                                {phase.resources.map((resource, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-2"
                                  >
                                    <div className="pt-1 flex-shrink-0">
                                      <ArrowRight className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <span className="text-gray-300 break-words">
                                      {resource}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button
                onClick={() => {
                  setRoadmapGenerated(false);
                  setRoadmapContent("");
                  setSelectedCareer("");
                  setExperience("");
                  setGoals("");
                }}
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
              >
                Generate New Roadmap
              </Button>
              <Button className="w-full text-white transition-all duration-200 sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-blue-700">
                Save Roadmap
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
