"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, ArrowLeft, Clock, Menu, X, User, Square, Play } from "lucide-react"
import Link from "next/link"

export default function MockInterviewPage() {
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [questions, setQuestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [feedback, setFeedback] = useState<string>("")

  const roles = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Marketing Manager",
    "Sales Representative",
    "DevOps Engineer",
    "Business Analyst",
  ]

  const levels = ["Entry Level", "Mid Level", "Senior Level", "Executive"]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (interviewStarted) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [interviewStarted])

  const generateQuestion = async (questionNum: number) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: selectedRole,
          level: selectedLevel,
          questionNumber: questionNum + 1,
          previousQuestions: questions.slice(0, questionNum),
        }),
      })

      const data = await response.json()
      if (data.question) {
        const newQuestions = [...questions]
        newQuestions[questionNum] = data.question
        setQuestions(newQuestions)
      }
    } catch (error) {
      console.error("Error generating question:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const startInterview = async () => {
    if (!selectedRole || !selectedLevel) {
      alert("Please select both role and experience level")
      return
    }
    setInterviewStarted(true)
    setCurrentQuestion(0)
    setTimeElapsed(0)
    setQuestions([])
    await generateQuestion(0)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const nextQuestion = async () => {
    if (currentQuestion < 4) {
      // 5 questions total (0-4)
      const nextQ = currentQuestion + 1
      setCurrentQuestion(nextQ)
      if (!questions[nextQ]) {
        await generateQuestion(nextQ)
      }
    } else {
      // End interview
      setInterviewStarted(false)
      alert("Interview completed! Generating feedback...")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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
      <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b border-white/10 glass">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Mic className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">Mock Interview</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {interviewStarted && (
            <>
              <Badge className="bg-green-500/20 text-green-300 text-xs sm:text-sm">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(timeElapsed)}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-300 text-xs sm:text-sm">
                Question {currentQuestion + 1}/5
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </>
          )}
        </div>
      </nav>

      <div className="relative z-10 p-4 sm:p-6 lg:px-8">
        {!interviewStarted ? (
          // Setup Phase
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Mock Interview Setup</h1>
              <p className="text-gray-300 text-base sm:text-lg">
                Configure your interview settings and get ready to practice
              </p>
            </div>

            <Card className="bg-premium-card border border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-xl sm:text-2xl">Interview Configuration</CardTitle>
                <CardDescription className="text-gray-300">
                  Select your target role and experience level for a personalized interview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">Target Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">Experience Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">What to Expect:</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• 5 carefully selected questions based on your role</li>
                    <li>• AI-powered interview experience with Gemini</li>
                    <li>• Real-time feedback and scoring</li>
                    <li>• Detailed analysis after completion</li>
                  </ul>
                </div>

                <Button
                  onClick={startInterview}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!selectedRole || !selectedLevel || isLoading}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isLoading ? "Starting Interview..." : "Start Interview"}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Interview Phase
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Interview Area */}
              <div className="lg:col-span-2">
                <Card className="bg-premium-card border border-white/10 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-purple-400" />
                        <span className="text-white font-medium">AI Interviewer</span>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-300 text-xs sm:text-sm">
                        {selectedRole} - {selectedLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-white/5 rounded-lg p-4 sm:p-6">
                      <h3 className="text-white text-lg font-medium mb-4">Question {currentQuestion + 1}:</h3>
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span className="text-gray-300">Generating question...</span>
                        </div>
                      ) : (
                        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                          {questions[currentQuestion] || "Loading question..."}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <Button
                        onClick={toggleRecording}
                        size="lg"
                        className={`${
                          isRecording
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        } w-16 h-16 rounded-full`}
                        disabled={isLoading}
                      >
                        {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-gray-300 text-sm mb-4">
                        {isRecording ? "Recording your response..." : "Click the microphone to start recording"}
                      </p>
                      <Button
                        onClick={nextQuestion}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={isLoading}
                      >
                        {currentQuestion < 4 ? "Next Question" : "Finish Interview"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className={`${sidebarOpen ? "block" : "hidden"} lg:block space-y-6`}>
                <Card className="bg-premium-card border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Interview Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 p-2 rounded ${
                            index === currentQuestion
                              ? "bg-purple-500/20"
                              : index < currentQuestion
                                ? "bg-green-500/20"
                                : "bg-white/5"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              index === currentQuestion
                                ? "bg-purple-500 text-white"
                                : index < currentQuestion
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-600 text-gray-300"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className={`text-sm ${index <= currentQuestion ? "text-white" : "text-gray-400"}`}>
                            Question {index + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-premium-card border border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• Speak clearly and at a moderate pace</li>
                      <li>• Take a moment to think before answering</li>
                      <li>• Use specific examples when possible</li>
                      <li>• Maintain good posture and eye contact</li>
                      <li>• Use the STAR method for behavioral questions</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
