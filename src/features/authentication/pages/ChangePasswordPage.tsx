import ChangePasswordForm from "@/features/authentication/components/ChangePasswordForm";
import { ArrowLeft, Lock, Check } from "lucide-react";
import { Link } from "react-router-dom";

const ChangePasswordPage = () => {
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
            <span className="text-text-white">Secure Your Account.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent-purple bg-clip-text text-transparent">Change Password</span>
            <span className="text-text-white">&gt;</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-text-white text-opacity-90 mb-8 leading-relaxed">
            Keep your account safe with a strong password.
          </p>

          {/* Description */}
          <p className="text-base text-text-white text-opacity-80 mb-10 leading-relaxed">
            Update your password to maintain account security. Use a strong password with a mix of uppercase, lowercase, numbers, and special characters.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Secure Update</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Password Strength</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Instant Effect</span>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="flex items-center gap-6 text-sm text-text-white text-opacity-80">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>Encrypted Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>Secure Process</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Change Password Form */}
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
            <h2 className="text-3xl font-bold text-text-primary mb-2">Change Password</h2>
            <p className="text-sm text-text-secondary">
              Please enter your current password and set a new one.
            </p>
          </div>

          <ChangePasswordForm />

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

export default ChangePasswordPage;
