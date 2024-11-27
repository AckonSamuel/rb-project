import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import Spinner from "@/components/ui/Spinner"; // Import Spinner component

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    toast.loading("Logging in...");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      toast.dismiss();
      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Login failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-14">
      <Card className="w-full md:w-[70%] lg:w-[90%] xl:w-[90%] flex flex-col md:flex-row p-6">
        {/* Left Section - Login Form */}
        <div className="flex-1 space-y-4 pl-12 pr-16 pt-16">
          <h2 className="text-4xl font-bold text-green-500 mb-2">Login</h2>
          <p className="text-gray-600 mb-6">How do I get started?</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Switch id="remember" {...register("remember")} />
                <label htmlFor="remember" className="ml-2 text-sm">
                  Remember me
                </label>
              </div>
              <a href="/auth/forgot-password" className="text-green-500 text-sm">
                Forgot Password
              </a>
            </div>

            {/* Submit Button with Spinner */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-400 to-green-600 relative"
            >
              {loading ? (
                <Spinner />  // Show spinner while loading
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <img
            src="/forest-image.png"  // Replace with your image URL
            alt="Forest"
            className="rounded-md w-full max-w-md"
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
