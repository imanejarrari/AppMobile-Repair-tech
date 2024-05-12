import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/components/auth/LoginPage';
import MainPage from './components/Repair/MainRepair';
import MainTech from './components/Technicians/TechMain';
import newTech from './components/Technicians/new/addMain';

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
                     <Route path='/technicians' element={<MainTech />} />
                     <Route path='/add' element={<newTech />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
