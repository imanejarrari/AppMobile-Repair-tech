import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from '../src/components/firebase/firebase'; 
import SignUpForm from '../src/components/auth/signUp'; 

function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/main" /> : <SignUpForm setisLoggedIn={setisLoggedIn} />}
            />
            {isLoggedIn && (
              <>
                
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
