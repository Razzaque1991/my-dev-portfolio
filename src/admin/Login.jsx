import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";  

const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔐 Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetSuccess("");   
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");  
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password.");
      toast.error("Login failed. Please check your credentials.");  
      console.error("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Forgot Password
  const handleForgotPassword = async () => {
    setError("");
    setResetSuccess("");

    if (!email) {
      setError("Please enter your email first.");
      toast.error("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Password reset email sent successfully.");
      toast.success("Reset email sent to your inbox.");
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      toast.error("Reset email failed. Try again.");
      console.error("Password reset error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <input
            type="email"
            placeholder="Admin Email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          {/* Password */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="mb-4 text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline"
              disabled={loading}
            >
              Forgot Password?
            </button>
          </div>

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {resetSuccess && <p className="text-green-600 mb-2">{resetSuccess}</p>}

          {/* Submit */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
