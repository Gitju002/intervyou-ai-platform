"use client";
import { LogOut, Zap } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

const NavBar = ({ userName }: { userName: string }) => {
  const [credits, setCredits] = useState(25);
  const handleSignOut = () => {
    signOut();
    redirect("/");
  };

  const getCreditStatus = () => {
    if (credits > 20)
      return {
        color: "text-green-400",
        bg: "bg-green-500/20",
        status: "Excellent",
      };
    if (credits > 10)
      return {
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
        status: "Good",
      };
    if (credits > 5)
      return {
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        status: "Low",
      };
    return { color: "text-red-400", bg: "bg-red-500/20", status: "Critical" };
  };

  const creditStatus = getCreditStatus();

  return (
    <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8 glass">
      <div className="flex items-center space-x-3">
        <Image
          src="/IntervYou-Logo.svg"
          alt="IntervYou Logo"
          width={40}
          height={40}
        />

        <div>
          <span className="text-2xl font-semibold text-white">IntervYou</span>
          <div className="text-xs text-purple-400 font-medium">Dashboard</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden lg:flex items-center space-x-2">
          <Zap className={`w-4 h-4 ${creditStatus.color}`} />
          <span className="text-white font-medium">{credits} Credits</span>
          <Badge
            variant={"outline"}
            className={`${creditStatus.bg} ${creditStatus.color} border-0`}
          >
            {creditStatus.status}
          </Badge>
        </div>
        <span className="hidden md:block text-gray-300">
          Welcome, {userName}
        </span>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="text-gray-300 hover:text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
