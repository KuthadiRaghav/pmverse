import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import { ThemeProvider } from './ThemeContext';
import { CaseProvider } from './case/CaseContext';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function AuthRouter() {
  const { currentUser } = useAuth();
  const [onboarded, setOnboarded] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // We still use local storage to remember if they've seen the intro text
    const hasOnboarded = localStorage.getItem('pmverse_onboarded');
    if (!hasOnboarded) {
      setOnboarded(false);
    }
  }, []);

  if (!currentUser) {
    if (showSignup) {
      return <Signup onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <Login onSwitchToSignup={() => setShowSignup(true)} />;
  }

  // User is logged in, but hasn't seen the intro onboarding
  if (!onboarded) {
    return (
      <Onboarding onComplete={() => {
        localStorage.setItem('pmverse_onboarded', 'true');
        setOnboarded(true);
      }} />
    );
  }

  // Logged in and onboarded -> OS Mode
  return <Desktop />;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CaseProvider>
            <div className="App">
              <AuthRouter />
            </div>
          </CaseProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
