"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/authService";
import { setAuthSession } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";

// ✅ Email validation
const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submitted = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (loading || submitted.current) return;
    submitted.current = true;
    setLoading(true);

    const { email, password } = form;

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      submitted.current = false;
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      setLoading(false);
      submitted.current = false;
      return;
    }

    try {
      console.log("🔐 Attempting login...");
      const result = await loginUser({ email, password });

      if (!result.success) {
        setError(result.message || "Login failed");
        setLoading(false);
        submitted.current = false;
        return;
      }

      if (!result.user) {
        setError("Server did not return user data");
        setLoading(false);
        submitted.current = false;
        return;
      }

      if (!result.token) {
        setError("Server did not return authentication token");
        setLoading(false);
        submitted.current = false;
        return;
      }

      // 🔒 Check if user is admin
      if (result.user.role !== "admin") {
        setError("Admin access required");
        setLoading(false);
        submitted.current = false;
        return;
      }

      // ✅ Store token in memory
      setAuthSession(result.token, result.user.role);
      console.log("✅ Token stored, user role:", result.user.role);

      // ✅ Login success - Admin
      setForm({ email: "", password: "" });
      console.log("✅ Redirecting to dashboard...");
      router.push("/");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed. Please try again.");
      submitted.current = false;
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          Admin Login
        </h2>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-3 rounded text-black"
            disabled={loading}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border p-3 pr-10 rounded text-black"
              disabled={loading}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
