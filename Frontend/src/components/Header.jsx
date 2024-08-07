import { useNavigate } from "react-router-dom";
import { authState } from "../state/auth";
import { useRecoilValue } from "recoil";
import Logout from "./Logout";

export default function Header() {
  const navigate = useNavigate();
  const MenuRoutes = ({ children }) => {
    const auth = useRecoilValue(authState);
    return auth ? <Logout /> : children;
  };

  return (
    <div>
      <div className="flex sm:px-10 px-2 items-center justify-between sticky top-0 left-0 right-0 z-50 bg-white bg-opacity-80 shadow-lg backdrop-blur-lg">
        <div>
          <img
            className="sm:p-0 p-1"
            onClick={() => navigate("/")}
            width={"80px"}
            src="./src/assets/logo.png"
            alt="Mines Logo"
          />
        </div>
        <MenuRoutes>
          <div>
            <button
              onClick={() => navigate("/login")}
              className="text-black py-3  px-4 rounded m-2"
            >
              Signin
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-blue-700 hover:bg-blue-500 text-white py-3  px-4 rounded sm:m-2"
            >
              Register
            </button>
          </div>
        </MenuRoutes>
      </div>
    </div>
  );
}
