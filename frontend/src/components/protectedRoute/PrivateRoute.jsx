import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl, authUser, login } from "../../network/endPoints.js";
import apiClient from "../../services/apiClient.js";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means loading
  const navigate = useNavigate();

  useEffect(() => {
    const validateUserAuth = async () => {
      try {
        const response = await apiClient({
          method: "GET",
          url: authUser,
          baseURL: baseUrl,
          withCredentials: true,
        });

        if (response.success) {
          setIsAuthenticated(true);
        } else {
          navigate(login);
        }
      } catch (error) {
        console.log(error);
        navigate(login);
      }
    };

    validateUserAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or show a spinner
  }

  return children;
};

export default PrivateRoute;
