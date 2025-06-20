"use client";

import type React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  FileText,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function CVAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<{
    overallScore: number;
    sections: {
      name: string;
      score: number;
      status: string;
      feedback: string;
    }[];
    strengths: string[];
    improvements: string[];
    keywords: { present: string[]; missing: string[] };
  } | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {};

  const analyzeCV = async () => {
    const trimmedText = cvText.trim();

    if (!trimmedText) {
      alert("Please upload a CV or paste your content.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze-cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvContent: trimmedText,
          targetRole: targetRole,
        }),
      });

      const data = await response.json();
      if (data.overallScore) {
        setAnalysisResults(data);
        setAnalysisComplete(true);
      }
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze CV. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

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
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              CV Analysis
            </span>
          </div>
        </div>
        <Badge
          variant={"outline"}
          className="hidden lg:block bg-green-500/20 text-green-300 text-xs sm:text-sm"
        >
          Powered by Gemini AI
        </Badge>
      </nav>

      <div className="relative z-10 p-4 sm:p-6 lg:px-8">
        {!analysisComplete ? (
          // Upload and Analysis Phase
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                CV Analysis
              </h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Upload your resume for AI-powered analysis and improvement
                suggestions
              </p>
            </div>

            <Card className="glass border border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl">
                  Upload Your CV
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload a file or paste your CV content below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 sm:p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-white mb-2 text-sm sm:text-base">
                      {file ? file.name : "Click to upload your CV"}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Supported: PDF, DOC, DOCX, TXT (Max 5MB)
                    </p>
                  </label>
                </div>

                <div className="text-center text-gray-400 text-sm">OR</div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cv-text" className="text-white font-medium">
                      Paste CV Content
                    </Label>
                    <Textarea
                      id="cv-text"
                      placeholder="Paste your CV content here..."
                      value={cvText}
                      onChange={(e) => setCvText(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[200px] mt-2"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="target-role"
                      className="text-white font-medium"
                    >
                      Target Role (Optional)
                    </Label>
                    <Input
                      id="target-role"
                      placeholder="e.g., Software Engineer, Product Manager"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 mt-2"
                    />
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">
                    Analysis includes:
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Overall CV score and detailed feedback</li>
                    <li>• Section-by-section analysis</li>
                    <li>• Keyword optimization suggestions</li>
                    <li>• Formatting and design recommendations</li>
                    <li>• Industry-specific improvements</li>
                    <li>• ATS compatibility check</li>
                  </ul>
                </div>

                <Button
                  onClick={analyzeCV}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!cvText.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing CV...
                    </>
                  ) : (
                    <>
                      Analyze My CV
                      <FileText className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Analysis Results
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                CV Analysis Results
              </h1>
              <div className="flex items-center justify-center space-x-4">
                <Badge
                  variant={"outline"}
                  className="bg-green-500/20 text-green-300 text-lg px-4 py-2"
                >
                  Overall Score: {analysisResults?.overallScore}/100
                </Badge>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {/* Overall Score Card */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Overall Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">
                      {analysisResults?.overallScore}%
                    </div>
                    <Progress
                      value={analysisResults?.overallScore}
                      className="mb-4"
                    />
                    <Badge className="bg-yellow-500/20 text-yellow-300">
                      Good - Room for Improvement
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Key Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults?.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-orange-400" />
                    Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults?.improvements
                      .slice(0, 4)
                      .map((improvement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <AlertCircle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            {improvement}
                          </span>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section Analysis */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-white">
                  Section-by-Section Analysis
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Detailed breakdown of each CV section
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analysisResults?.sections.map((section, index) => (
                    <div
                      key={index}
                      className="border-b border-white/10 pb-4 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">
                          {section.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={"outline"}
                            className={`${
                              section.status === "excellent"
                                ? "bg-green-500/20 text-green-300"
                                : section.status === "good"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {section.score}/100
                          </Badge>
                        </div>
                      </div>
                      <Progress value={section.score} className="mb-2" />
                      <p className="text-gray-300 text-sm">
                        {section.feedback}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Keyword Analysis</CardTitle>
                <CardDescription className="text-gray-300">
                  Keywords found in your CV and suggestions for improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Keywords Present
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults?.keywords.present.map(
                        (keyword, index) => (
                          <Badge
                            variant={"outline"}
                            key={index}
                            className="bg-green-500/20 text-green-300"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-orange-400" />
                      Suggested Keywords
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults?.keywords.missing.map(
                        (keyword, index) => (
                          <Badge
                            variant={"outline"}
                            key={index}
                            className="bg-orange-500/20 text-orange-300"
                          >
                            {keyword}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Button
                onClick={() => {
                  setAnalysisComplete(false);
                  setFile(null);
                }}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 mr-4"
              >
                Analyze Another CV
              </Button>
              <Button className="bg-gradient-to-r from-emerald-300 to-emerald-500 hover:from-emerald-400 hover:to-emerald-600">
                Download Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
