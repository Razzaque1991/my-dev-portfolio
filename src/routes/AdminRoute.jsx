import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

const auth = getAuth(app);

const AdminRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Auth error: {error.message}</p>;
  }

  // ✅ যদি user না থাকে → login এ পাঠানো হবে
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 👉 চাইলে এখানে admin role check করতে পারো
  // উদাহরণ:
  // if (user.email !== "admin@gmail.com") {
  //   return <Navigate to="/" replace />;
  // }

  return children;
};

export default AdminRoute;

