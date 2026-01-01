import { useNavigate } from "react-router-dom";
import { Check, CreditCard, Users, Building, Calendar, DollarSign, Award, FileText } from "lucide-react";
import Button from "@/components/common/Button";
import Spinner from "@/components/common/Spinner";
import ErrorMessage from "@/components/common/ErrorMessage";
import { usePublicPlans } from "../hooks/usePublicPlans";
import { Plan } from "../types/plans.types";

const PlansListingPage = () => {
  const navigate = useNavigate();
  const { plans, isPlansLoading, plansError } = usePublicPlans();

  const handleSelectPlan = (planId: string) => {
    // Save planId to localStorage
    localStorage.setItem("selectedPlanId", planId);
    // Navigate to signup with plan param
    navigate(`/register?plan=${planId}`);
  };

  const getPlanFeatures = (plan: Plan) => {
    const features = [];
    if (plan.features?.maxStudents) {
      features.push(`${plan.features.maxStudents} Students`);
    }
    if (plan.features?.maxTeachers) {
      features.push(`${plan.features.maxTeachers} Teachers`);
    }
    if (plan.features?.maxCampuses) {
      features.push(`${plan.features.maxCampuses} Campuses`);
    }
    if (plan.features?.attendance) features.push("Attendance Management");
    if (plan.features?.exams) features.push("Exams & Results");
    if (plan.features?.fees) features.push("Fee Management");
    if (plan.features?.payroll) features.push("Payroll");
    if (plan.features?.certificates) features.push("Certificates");
    return features;
  };

  const getPlanIcon = (code?: string) => {
    switch (code) {
      case "FREE":
        return <CreditCard className="w-6 h-6" />;
      case "BASIC":
        return <Users className="w-6 h-6" />;
      case "PRO":
        return <Building className="w-6 h-6" />;
      case "ENTERPRISE":
        return <Award className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  if (isPlansLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (plansError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ErrorMessage
          message={plansError.message || "Failed to load plans"}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-secondary to-bg-main">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Select the perfect plan for your school. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {plans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">No plans available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan: Plan) => {
              const features = getPlanFeatures(plan);
              const isPopular = plan.code === "PRO";

              return (
                <div
                  key={plan._id}
                  className={`relative bg-white rounded-2xl border-2 shadow-lg transition-all hover:shadow-xl ${
                    isPopular
                      ? "border-primary scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary">
                        {getPlanIcon(plan.code)}
                      </div>
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-text-primary">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-text-secondary">
                          {plan.currency}/{plan.billingCycle === "MONTHLY" ? "mo" : "yr"}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                          <span className="text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      fullWidth
                      size="lg"
                      variant={isPopular ? "primary" : "outline"}
                      onClick={() => handleSelectPlan(plan._id)}
                      className="mt-auto"
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl border border-border p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              All Plans Include
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-text-secondary">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-accent-teal" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-accent-teal" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-accent-teal" />
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansListingPage;

