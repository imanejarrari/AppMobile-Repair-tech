import React, { useEffect } from 'react';
import AuthForm from "./signUp";

export default function LoginPage({ setisLoggedIn}) {
  useEffect(() => {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      setisLoggedIn(true);
    }
  }, [setisLoggedIn]);

  const handleLogin = () => {
    setisLoggedIn(true);
  };

  return (
    <AuthForm setisLoggedIn={handleLogin} />
  );
}