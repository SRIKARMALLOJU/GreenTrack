import React, { useState, type ChangeEvent } from "react";
import "./Login.css";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChartNoAxesCombined,
} from "lucide-react";

// Import Shadcn UI primitive components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { login as loginApiCall } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login: saveTokenToContext } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const responseData = await loginApiCall(formData);

      saveTokenToContext(responseData.token);

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login component intercepted a failure:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] font-sans antialiased text-[#1B1B1B] flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 min-h-[640px] border-0 py-0">
        {/* ================= LEFT SIDE: BRAND & METRIC CONTAINER ================= */}
        <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="flex items-center relative z-10">
            <div className="p-2 rounded-xl">
              <Leaf className="size-8 text-greenTrack" />
            </div>
            <span className="text-3xl font-bold tracking-tight">
              GreenTrack
            </span>
          </div>

          <div className="my-12 relative z-10 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Measure your footprint. <br />
              Grow your impact.
            </h1>
            <p className="text-emerald-100 text-sm md:text-base max-w-sm">
              Access enterprise-grade ESG analytics platforms to track carbon
              outputs effortlessly.
            </p>
            <div className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-emerald-300 border border-emerald-500/20">
              <ChartNoAxesCombined />
              <span>1,240 metric tons offset this month globally</span>
            </div>
          </div>

          <div className="text-xs text-emerald-200/70 border-t border-emerald-700/50 pt-4 relative z-10 flex items-center justify-between"></div>
        </div>

        {/* ================= RIGHT SIDE: LOGIN FORM ================= */}
        <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-white border-0 shadow-none">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1B1B1B]">Welcome</h2>
              <p className="text-gray-500 text-sm mt-1">
                Enter your details to access your sustainability dashboard.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="bg-[#F4F7F6] border-0 rounded-xl pl-10 pr-4 py-6 text-sm focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-0 transition shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Password
                  </Label>
                  <a
                    href="#forgot"
                    className="text-xs text-[#2D6A4F] hover:underline font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="bg-[#F4F7F6] border-0 rounded-xl pl-10 pr-10 py-6 text-sm focus-visible:ring-2 focus-visible:ring-[#2D6A4F] focus-visible:ring-offset-0 transition shadow-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-medium py-6 rounded-xl transition flex items-center justify-center space-x-2 shadow-sm shadow-[#2D6A4F]/20 mt-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* <p className="text-center text-xs text-gray-500 pt-2">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setView("onboarding")}
                  className="text-[#2D6A4F] font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
