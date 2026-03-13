import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/use-auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import logoPng from "@assets/file_000000001adc71f58731a09f21d2988d_1772208715788.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(
    window.location.search.includes("signup") ? "signup" : "signin"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/signin";
      const body = mode === "signup"
        ? { firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }
      window.location.href = "/";
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <img src={logoPng} alt="TenantTrack" className="h-14 w-14 rounded-xl mb-4" />
          <h1 className="text-2xl font-bold text-foreground">TenantTrack</h1>
          <p className="text-muted-foreground text-sm mt-1">Maintenance management made simple</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button
              onClick={() => { setMode("signin"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              data-testid="tab-signin"
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${mode === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              data-testid="tab-signup"
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">First name</label>
                  <Input
                    value={form.firstName}
                    onChange={update("firstName")}
                    placeholder="Chris"
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Last name</label>
                  <Input
                    value={form.lastName}
                    onChange={update("lastName")}
                    placeholder="Smith"
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
              <Input
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                required
                data-testid="input-email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update("password")}
                  placeholder={mode === "signup" ? "At least 8 characters" : "••••••••"}
                  required
                  className="pr-10"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Confirm password</label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={update("confirmPassword")}
                  placeholder="••••••••"
                  required
                  data-testid="input-confirm-password"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-400" data-testid="text-error">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              data-testid="button-submit"
            >
              {loading
                ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Please wait...</>
                : mode === "signup" ? "Create Account" : "Sign In"
              }
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-replit-login"
            type="button"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.42 0H6.857v6.857H0v4.563h6.857V18h4.563v-6.58H18V6.857h-6.58V0z" />
            </svg>
            Continue with Replit
          </Button>
        </div>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-muted-foreground">
            Want to explore first?{" "}
            <button
              onClick={() => window.location.href = "/?demo=1"}
              className="text-primary hover:underline font-medium"
              data-testid="link-try-demo"
            >
              Try the demo
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground">← Back to home</a>
          </p>
        </div>
      </div>
    </div>
  );
}
