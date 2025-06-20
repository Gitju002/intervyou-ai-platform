"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Bot,
  User,
  Lightbulb,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI interview assistant powered by Google's Gemini AI. I'm here to help you prepare for interviews, practice responses, and answer any career-related questions. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();

      console.log("Response from Gemini:", data);
      if (data?.choices?.[0]?.message?.content) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.choices[0].message.content,
          },
        ]);
      } else {
        throw new Error("Empty response from Gemini");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "How do I answer 'Tell me about yourself'?",
    "What are common behavioral interview questions?",
    "How should I prepare for a technical interview?",
    "What questions should I ask the interviewer?",
    "How do I negotiate salary?",
    "What's the STAR method for answering questions?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestedQuestion = (question: string) => {
    setInput(question); // Replace handleInputChange with setInput
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen overflow-hidden relative pattern ">
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
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              AI Chat Assistant
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="hidden lg:block bg-gradient-to-r from-orange-500 to-red-500 text-orange-100 text-xs sm:text-sm">
            Powered by Gemini AI
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </nav>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }  lg:translate-x-0 fixed lg:relative z-40 basis-1/4 border-r border-white/10 p-4 sm:p-6 transition-transform duration-300 ease-in-out bg-black lg:bg-transparent`}
        >
          <Card className="glass border border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center text-lg">
                <Lightbulb className="w-5 h-5 mr-2" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestedQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-white/10 h-auto p-3 whitespace-normal text-sm"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Messages */}
        <div className="h-[calc(100vh-100px)] overflow-y-auto flex flex-col basis-3/4">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[85%] sm:max-w-3xl ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-premium-card border border-white/10 text-gray-300"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1
                            className="text-2xl font-bold text-purple-400 mb-2"
                            {...props}
                          />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2
                            className="text-xl font-semibold text-purple-300 mb-2"
                            {...props}
                          />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3
                            className="text-lg font-semibold text-purple-200 mb-2"
                            {...props}
                          />
                        ),
                        p: ({ node, ...props }) => (
                          <p
                            className="text-gray-200 leading-relaxed mb-3"
                            {...props}
                          />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong
                            className="text-white font-semibold"
                            {...props}
                          />
                        ),
                        em: ({ node, ...props }) => (
                          <em className="text-gray-300 italic" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-6 text-gray-300 mb-3"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-6 text-gray-300 mb-3"
                            {...props}
                          />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="mb-1" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-purple-500 pl-4 text-purple-200 italic mb-3"
                            {...props}
                          />
                        ),
                        code: ({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }: {
                          node?: any;
                          inline?: boolean;
                          className?: string;
                          children?: React.ReactNode;
                        }) =>
                          inline ? (
                            <code
                              className="bg-gray-800 px-1 py-0.5 rounded text-orange-300 text-sm"
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-900 text-green-400 p-3 rounded-md overflow-x-auto mb-3">
                              <code className="text-sm" {...props}>
                                {children}
                              </code>
                            </pre>
                          ),
                        a: ({ node, ...props }) => (
                          <a
                            className="text-blue-400 underline hover:text-blue-300"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    <div
                      className={`text-xs mt-2 ${
                        message.role === "user"
                          ? "text-purple-100"
                          : "text-gray-500"
                      }`}
                    >
                      {/* {new Date().toLocaleTimeString()} */}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-3xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-premium-card border border-white/10 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-white/10 p-4 sm:p-6">
            <form onSubmit={handleSend} className="flex space-x-2 sm:space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about interviews..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-500"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
