import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{ background: "#1A2C39" }}
        className="flex sm:justify-evenly p-3 items-center justify-between"
      >
        <div>
          <img width={"80px"} src="./src/assets/logo.png" alt="Mines Logo" />
        </div>
        <div>
          <button onClick={() => navigate("/login")} className="text-white m-2">
            Signin
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-2 rounded m-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
