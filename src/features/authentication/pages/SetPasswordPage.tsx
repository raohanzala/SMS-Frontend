import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import SetPasswordForm from "../components/SetPasswordForm";
import { Lock, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/common/ErrorMessage";
import Spinner from "@/components/common/Spinner";

const SetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex min-h-screen bg-bg-main">
        <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <ErrorMessage
              message="Invalid or missing invite token. Please check your email for the correct invite link."
              onRetry={() => window.location.href = "/login"}
            />
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg-main">
      {/* Left Side - Branding (Dark Blue with Gradient) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-sidebar via-sidebar-secondary to-sidebar items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10"></div>
        
        <div className="max-w-lg text-left relative z-10">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-text-white">S</span>
            </div>
            <span className="text-2xl font-bold text-text-white">SchoolPro</span>
          </div>

          {/* Headline with Purple Gradient */}
          <h1 className="text-5xl font-bold font-sora text-nowrap mb-6 leading-tight">
            <span className="text-text-white">Welcome Aboard.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent-purple bg-clip-text text-transparent">Set Your Password</span>
            <span className="text-text-white">&gt;</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-text-white text-opacity-90 mb-8 leading-relaxed">
            You&apos;ve been invited to join our school management system.
          </p>

          {/* Description */}
          <p className="text-base text-text-white text-opacity-80 mb-10 leading-relaxed">
            Create a secure password to activate your account and start managing your school activities. Your password should be strong and unique.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Secure Account</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Instant Access</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Full Features</span>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="flex items-center gap-6 text-sm text-text-white text-opacity-80">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>Password Security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>Auto Login</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Set Password Form */}
      <div className="flex-1 flex items-center justify-center bg-bg-main p-8 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-text-white">S</span>
            </div>
            <span className="text-xl font-bold text-text-primary">SchoolPro</span>
          </div>

          <div className="text-left mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">Set Your Password</h2>
            <p className="text-sm text-text-secondary">
              Create a secure password to activate your account and get started.
            </p>
          </div>

          <SetPasswordForm token={token} />

          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-text-tertiary">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SetPasswordPage;

