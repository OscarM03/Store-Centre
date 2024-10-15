import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // Initial state is null
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    auth().catch(() => {
      setIsAuthorized(false);
      setLoading(false);
    });
  }, []);

  const refreshToken = async () => {
    const refreshToken = Cookies.get('refresh_token');
    try {
      const res = await api.post("api/v1/jwt/refresh/", {
        refresh: refreshToken,
      });
      if (res.status === 200) {
        Cookies.set('access_token', res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
    setLoading(false);
  };

  const auth = async () => {
    const token = Cookies.get('access_token');
    if (!token) {
      setIsAuthorized(false);
      setLoading(false);
      return;
    }
    console.log(token)
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
      setLoading(false);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

    
  console.log('isAuthorized:', isAuthorized);
  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

