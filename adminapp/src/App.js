import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/components/auth/LoginPage';
import MainPage from './components/Repair/MainRepair';
import MainTech from './components/Technicians/TechMain';


function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setisLoggedIn(true);
    }
  }, []);


  return (
    <>
     <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/repair" /> : <LoginPage setisLoggedIn={setisLoggedIn} />}
              />

            {isLoggedIn && (
              <>
                     <Route path='/repair' element={<MainPage />} />
                     <Route path='add-technician' element={<MainTech />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
