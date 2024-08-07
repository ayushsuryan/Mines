import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../state/auth";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await login({ username, password });
      setAuth({ token: data.token });
      navigate("/dashboard"); // Redirect to the protected route
      toast.success("Welcome");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Error Logging In");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
