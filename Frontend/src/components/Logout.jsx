import { useSetRecoilState } from "recoil";
import { authState } from "../state/auth"; // Ensure the path is correct
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null);
    navigate("/login");
  };

  return (
    <div>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
}
