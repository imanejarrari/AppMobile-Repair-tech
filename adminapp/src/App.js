import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../src/components/auth/LoginPage';
import Sidebar from'./components/sidebar/sidebar';
import RepairRequests from './components/Repair/RequestList';


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
                     <Route path='/dashboard' element={<Sidebar />} />
                     <Route path='/repair' element={<RepairRequests />} />

              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
