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
  const [showPassword, setShowPassword] = useState(false);

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
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-40">
      <h1 className="text-center text-4xl">Signin</h1>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm w-80 mx-auto">
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => setUsername(e.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex mt-2">
            <input
              id="hs-toggle-password-checkbox"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label
              htmlFor="hs-toggle-password-checkbox"
              className="text-sm   ms-3 "
            >
              Show password
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            <br />
            <div className="text-sm ">
              <a
                onClick={() => navigate("/register")}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                New User?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
