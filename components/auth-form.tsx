"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Crown, Eye, EyeOff, Mic, Shield, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center pattern p-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      </div>

      <div className="[background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-xl border-2 border-transparent animate-border">
        <Card className="w-full max-w-md bg-premium-dark relative z-10 neon-purple">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Image
                src="/IntervYou-Logo.svg"
                alt="IntervYou Logo"
                width={48}
                height={48}
              />
              <div>
                <span className="text-3xl font-bold text-white">IntervYou</span>
                <div className="text-xs text-purple-400 font-medium">
                  AI Interview Platform
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl text-white mb-2">
              {isSignIn ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              {isSignIn
                ? "Sign in to continue your interview preparation journey"
                : "Start your interview preparation journey today"}
            </CardDescription>

            {!isSignIn && (
              <Badge
                variant={"outline"}
                className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-300 border border-green-500/30 px-4 py-2 mt-4"
              >
                <Crown className="w-4 h-4 mr-2" />
                Free Trial: 25 Credits Included
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {!isSignIn && (
                <div className="space-y-2">
                  <label className="text-white font-medium">Full Name</label>
                  <Input
                    {...form.register("name")}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-white font-medium">Email Address</label>
                <Input
                  {...form.register("email")}
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white font-medium">Password</label>
                <div className="relative">
                  <Input
                    {...form.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-12 h-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {!isSignIn && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                    What you get for free:
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• 25 free credits to start</li>
                    <li>• 5 voice interview sessions</li>
                    <li>• Basic AI feedback</li>
                    <li>• Access to question bank</li>
                    <li>• Performance tracking</li>
                  </ul>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white h-12 text-lg font-semibold neon-purple"
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>
            </form>

            <div className="mt-8 text-center text-gray-300">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <Link
                href={isSignIn ? "/sign-up" : "/sign-in"}
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                {isSignIn ? "Sign up for free" : "Sign in"}
              </Link>
            </div>

            {isSignIn && (
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span>
                    Your data is protected with enterprise-grade security
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
