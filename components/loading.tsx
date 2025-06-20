interface LoadingProps {
  message?: string;
}

export default function Loading({
  message = "Initializing AI systems...",
}: LoadingProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black pattern antialiased">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      </div>

      {/* Glass morphism container */}
      <div className="relative flex flex-col items-center justify-center p-10 rounded-3xl bg-white/10 glass border border-white/20 shadow-2xl shadow-black/50 max-w-md mx-4">
        {/* AI Brain Icon with Neural Network Animation */}
        <div className="relative w-20 h-20 mb-8">
          {/* Neural network connections */}
          <div className="absolute inset-0">
            {/* Connection lines */}
            <div className="absolute top-2 left-2 w-16 h-16">
              <div className="absolute top-0 left-1/2 w-px h-4 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse"></div>
              <div
                className="absolute bottom-0 right-1/4 w-px h-4 bg-gradient-to-t from-purple-400/60 to-transparent animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute left-0 top-1/2 w-4 h-px bg-gradient-to-r from-pink-400/60 to-transparent animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute right-0 top-1/3 w-4 h-px bg-gradient-to-l from-cyan-400/60 to-transparent animate-pulse"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          </div>

          {/* Central AI Brain */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-white/30 flex items-center justify-center animate-pulse">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg shadow-cyan-400/50 animate-ping"></div>
          </div>

          {/* Neural nodes */}
          <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute left-0 top-1/2 w-2 h-2 -mt-1 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute right-0 top-1/3 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        {/* AI Interviewer Branding */}
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-3xl font-bold text-white/95 tracking-tight">
            intervYou AI
          </h1>
          <p className="text-white/70 text-sm font-medium">
            Preparing your intelligent interview experience
          </p>
        </div>

        {/* Loading Status */}
        <div className="text-center space-y-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-cyan-400/80 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-purple-400/80 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-400/80 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>

          {/* Loading messages */}
          <div className="h-6">
            <p className="text-white/60 text-sm animate-pulse">{message}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs">
          <div className="flex justify-between text-xs text-white/50 mb-2">
            <span>Setting up</span>
            <span>AI Ready</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-full animate-pulse shadow-sm"></div>
          </div>
        </div>

        {/* Subtle feature hints */}
        <div className="mt-6 text-center">
          <p className="text-white/40 text-xs">
            ✨ Smart questions • 🎯 Real-time analysis • 📊 Instant feedback
          </p>
        </div>
      </div>

      {/* Background AI-themed decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Circuit-like background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/2 w-px h-20 bg-white animate-pulse"></div>
        <div
          className="absolute top-1/2 left-1/4 w-20 h-px bg-white animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/2 w-px h-20 bg-white animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/2 right-1/4 w-20 h-px bg-white animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
