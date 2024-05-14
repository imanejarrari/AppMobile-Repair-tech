import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/components/auth/LoginPage';
import MainPage from './components/Repair/MainRepair';
import MainTech from './components/Technicians/techList/TechMain';
import AddMain from './components/Technicians/newTech/addMain';
import MainMeet from './components/meeting/MainMeet';

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
                     <Route path='/add' element={<AddMain />} />
                     <Route path='/meeting' element={<MainMeet />} />

                     
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
