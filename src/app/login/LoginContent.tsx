"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/PasswordInput";
import CustomButton from "@/components/ui/CustomButton";
import { Lock } from "lucide-react";
import { UseToast } from "@/lib/helperComponents";

const MotionCustomButton = motion(CustomButton);

export default function LoginContent() {
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    if (username === "admin" && password === "admin123") {
      Cookies.set("auth", "true", { expires: 1 });
      router.push("/dashboard");
      UseToast("Success", "Logged in successfully", "success", 3000);
    } else {
      setErrors({ general: "Invalid credentials" });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "unauthenticated") {
      UseToast("Error", "Please login to continue", "error");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm shadow-lg"
      >
        <Card className="shadow-xl border border-border/40 backdrop-blur-md bg-white/80 dark:bg-[#0b0b0b]/80">
          <CardHeader>
            <CardTitle className="text-center text-xl text-primary">
              Welcome Admin 👋
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-8">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                />
                {errors.username && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.username}
                  </p>
                )}
              </div>

              <div>
                <PasswordInput
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  autoComplete="current-password"
                  className="placeholder:text-gray-300"
                />
                {errors.password && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {errors.general && (
                <p className="text-[10px] text-red-500 text-center">
                  {errors.general}
                </p>
              )}

              <MotionCustomButton
                loading={isLoading}
                icon={<Lock />}
                iconPosition="left"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="w-full"
              >
                Login
              </MotionCustomButton>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
