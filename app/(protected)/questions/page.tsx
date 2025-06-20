"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Brain,
  Search,
  Filter,
  BookOpen,
  Star,
  Users,
  Code,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface Question {
  id: string;
  question: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: "Behavioral" | "Technical" | "Situational" | "General";
  industry: string;
  tags: string[];
  role?: string;
  companyTags?: string[];
  sampleAnswer?: string;
}

export default function QuestionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5; // Or 10, adjust per your UI

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          difficulty: selectedDifficulty,
          type: selectedType,
          role: selectedRole,
          company: selectedCompany,
        }),
      });
      const data = await response.json();
      setQuestions(data.questions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [
    selectedTopic,
    selectedDifficulty,
    selectedType,
    selectedRole,
    selectedCompany,
  ]);

  const topics = [
    "All",
    "React",
    "System Design",
    "Leadership",
    "SQL",
    "JavaScript",
    "Python",
    "Data Structures",
    "Algorithms",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Agile Methodologies",
    "Project Management",
    "Cybersecurity",
    "UI/UX Design",
    "Mobile Development",
    "Web Development",
    "Software Testing",
    "Networking",
    "Big Data",
    "Blockchain",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
    "Game Development",
    "Virtual Reality (VR)",
    "Augmented Reality (AR)",
    "Robotics",
    "Quantum Computing",
    "Natural Language Processing (NLP)",
    "Computer Vision",
    "Data Visualization",
    "Business Analysis",
    "Digital Marketing",
    "Content Strategy",
    "SEO (Search Engine Optimization)",
    "SEM (Search Engine Marketing)",
    "Social Media Marketing",
    "Email Marketing",
    "E-commerce",
    "Product Management",
    "Sales Strategy",
    "Customer Relationship Management (CRM)",
    "Supply Chain Management",
    "Financial Analysis",
    "Risk Management",
    "Compliance and Regulations",
    "Human Resources (HR)",
    "Talent Acquisition",
    "Employee Engagement",
    "Performance Management",
    "Training and Development",
    "Organizational Development",
    "Change Management",
    "Diversity and Inclusion",
    "Workplace Culture",
    "Remote Work",
    "Collaboration Tools",
    "Agile Project Management",
    "Scrum Methodology",
    "Kanban Methodology",
    "Lean Methodology",
    "Design Thinking",
    "User Experience (UX) Research",
    "User Interface (UI) Design",
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const types = ["All", "General", "Behavioral", "Technical", "Situational"];
  const roles = [
    "All",
    "Frontend Developer",
    "Backend Developer",
    "Data Scientist",
    "Product Manager",
    "DevOps Engineer",
    "Software Engineer",
    "Data Analyst",
    "Machine Learning Engineer",
    "UI/UX Designer",
    "Mobile Developer",
    "Full Stack Developer",
    "System Administrator",
    "Network Engineer",
    "Security Analyst",
    "Cloud Engineer",
    "Game Developer",
    "Business Analyst",
    "Project Manager",
    "Digital Marketer",
    "Content Strategist",
    "SEO Specialist",
    "Social Media Manager",
    "E-commerce Specialist",
    "Sales Engineer",
    "Customer Success Manager",
    "Technical Support Engineer",
    "Quality Assurance Engineer",
    "Database Administrator",
    "Web Developer",
    "AI Researcher",
    "Blockchain Developer",
    "Robotics Engineer",
    "IoT Developer",
  ];
  const companies = [
    "All",
    "Google",
    "Amazon",
    "Meta",
    "Infosys",
    "TCS",
    "Wipro",
    "Microsoft",
    "Apple",
    "IBM",
    "Accenture",
    "Cognizant",
    "Salesforce",
    "Oracle",
    "Adobe",
    "SAP",
    "Intel",
    "NVIDIA",
    "Tesla",
    "Uber",
    "Airbnb",
    "Spotify",
    "Netflix",
    "LinkedIn",
    "Twitter",
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesTopic =
      selectedTopic === "All" ||
      selectedTopic === "" ||
      q.topic === selectedTopic;
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      selectedDifficulty === "" ||
      q.difficulty === selectedDifficulty;
    const matchesType =
      selectedType === "All" || selectedType === "" || q.type === selectedType;
    const matchesRole =
      selectedRole === "All" || selectedRole === "" || q.role === selectedRole;
    const matchesCompany =
      selectedCompany === "All" ||
      selectedCompany === "" ||
      q.companyTags?.includes(selectedCompany);

    return (
      matchesSearch &&
      matchesTopic &&
      matchesDifficulty &&
      matchesType &&
      matchesRole &&
      matchesCompany
    );
  });

  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedTopic,
    selectedDifficulty,
    selectedType,
    selectedRole,
    selectedCompany,
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-300";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-300";
      case "Hard":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Technical":
        return <Code className="w-4 h-4" />;
      case "Behavioral":
        return <Users className="w-4 h-4" />;
      case "Situational":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const renderSkeletons = () => {
    return Array.from({ length: questionsPerPage }).map((_, index) => (
      <Card
        key={index}
        className="bg-white/5 border-white/10 backdrop-blur-sm p-6"
      >
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4 bg-white/10" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 bg-white/10" />
            <Skeleton className="h-5 w-20 bg-white/10" />
            <Skeleton className="h-5 w-16 bg-white/10" />
          </div>
          <Skeleton className="h-4 w-full bg-white/10" />
          <Skeleton className="h-4 w-5/6 bg-white/10" />
        </div>
      </Card>
    ));
  };

  return (
    <div className="min-h-screen relative overflow-hidden antialiased pattern">
      <div className="absolute inset-0 ">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-black to-blue-800/30"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-4 sm:p-6 lg:px-8 border-b border-white/10 glass">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Interview Questions
            </span>
          </div>
        </div>
        <Badge variant={"outline"} className="bg-indigo-500/20 text-indigo-300">
          {filteredQuestions.length} Questions
        </Badge>
      </nav>

      <div className="relative z-10 p-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Interview Questions Repository
            </h1>
            <p className="text-gray-300 text-lg">
              Practice with our comprehensive collection of interview questions
              across various roles and industries
            </p>
          </div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">
                    Search
                  </label>
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                {[
                  {
                    label: "Topic",
                    value: selectedTopic,
                    setter: setSelectedTopic,
                    options: topics,
                  },
                  {
                    label: "Difficulty",
                    value: selectedDifficulty,
                    setter: setSelectedDifficulty,
                    options: difficulties,
                  },
                  {
                    label: "Type",
                    value: selectedType,
                    setter: setSelectedType,
                    options: types,
                  },
                  {
                    label: "Role",
                    value: selectedRole,
                    setter: setSelectedRole,
                    options: roles,
                  },
                  // {
                  //   label: "Company",
                  //   value: selectedCompany,
                  //   setter: setSelectedCompany,
                  //   options: companies,
                  // },
                ].map(({ label, value, setter, options }) => (
                  <div key={label} className="space-y-2">
                    <label className="text-white text-sm font-medium">
                      {label}
                    </label>
                    <Select value={value} onValueChange={setter}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder={`All ${label}s`} />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="grid gap-6">{renderSkeletons()}</div>
          ) : error ? (
            <div className="text-center text-red-400 py-10">{error}</div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-300">
                Try adjusting your filters or search terms
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6">
                {paginatedQuestions.map((question) => (
                  <Card
                    key={question.id}
                    className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-white text-lg mb-2">
                            {question.question}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge
                              variant={"outline"}
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>
                            <Badge
                              variant={"outline"}
                              className="bg-blue-500/20 text-blue-300 flex items-center"
                            >
                              {getTypeIcon(question.type)}
                              <span className="ml-1">{question.type}</span>
                            </Badge>
                            <Badge
                              variant={"outline"}
                              className="bg-purple-500/20 text-purple-300"
                            >
                              {question.topic}
                            </Badge>
                            {question.role && (
                              <Badge
                                variant={"outline"}
                                className="bg-pink-500/20 text-pink-300"
                              >
                                {question.role}
                              </Badge>
                            )}
                            {question.companyTags?.map((c) => (
                              <Badge
                                variant={"outline"}
                                key={c}
                                className="bg-orange-500/20 text-orange-300"
                              >
                                {c}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {question.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-white/20 text-gray-300 text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                        >
                          <Star className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    {question.sampleAnswer && (
                      <CardContent>
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Sample Approach:
                          </h4>
                          <p className="text-gray-300 text-sm">
                            {question.sampleAnswer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? " pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="text-white px-3">
                          Page {currentPage} of {totalPages}
                        </span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
