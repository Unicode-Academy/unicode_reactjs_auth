import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login";
import { getToken } from "./utils/auth";
import { useLayoutEffect, useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
export default function App() {
  const [isAuthenticate, setAuthenticate] = useState(false);
  const checkAuth = () => {
    const token = getToken();
    if (token) {
      setAuthenticate(true);
    }
  };
  const handleLoginSuccess = () => {
    setAuthenticate(true);
  };
  const handleLogoutSuccess = () => {
    setAuthenticate(false);
  };
  useLayoutEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      {isAuthenticate ? (
        <Dashboard onSuccess={handleLogoutSuccess} />
      ) : (
        <Login onSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
