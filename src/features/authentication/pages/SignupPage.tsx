import SignupForm from "@/features/authentication/components/SignupForm";
import { Check, BookOpen } from "lucide-react";

const SignupPage = () => {
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
            <span className="text-text-white">Start Your Journey.</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent-purple bg-clip-text text-transparent">Create Your School</span>
            <span className="text-text-white">&gt;</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl text-text-white text-opacity-90 mb-8 leading-relaxed">
            Join thousands of schools managing their operations efficiently.
          </p>

          {/* Description */}
          <p className="text-base text-text-white text-opacity-80 mb-10 leading-relaxed">
            Create your school owner account and get access to comprehensive management tools. Manage students, teachers, attendance, and results all in one professional platform.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Easy Setup</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Full Control</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-accent-teal/50 rounded-lg bg-accent-teal/10 backdrop-blur-sm">
              <Check className="h-4 w-4 text-accent-teal" />
              <span className="text-sm text-text-white">Secure & Private</span>
            </div>
          </div>

          {/* Bottom Features */}
          <div className="flex items-center gap-6 text-sm text-text-white text-opacity-80">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>Free 14-Day Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent-teal"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
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
            <h2 className="text-3xl font-bold text-text-primary mb-2">Create Account</h2>
            <p className="text-sm text-text-secondary">
              Sign up to create and manage your school
            </p>
          </div>

          <SignupForm />

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-text-tertiary">
            © {new Date().getFullYear()} School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
