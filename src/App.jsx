import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import { ThemeProvider } from './ThemeContext';
import { CaseProvider } from './case/CaseContext';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyEmail from './components/VerifyEmail';
import ProcessingVerification from './components/ProcessingVerification';
import ResetPassword from './components/ResetPassword';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function AuthRouter() {
  const { currentUser } = useAuth();
  const [onboarded, setOnboarded] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  // Check URL for email verification action codes
  const queryParams = new URLSearchParams(window.location.search);
  const mode = queryParams.get('mode');
  const oobCode = queryParams.get('oobCode');

  if (mode === 'verifyEmail' && oobCode) {
    return <ProcessingVerification oobCode={oobCode} />;
  }

  if (mode === 'resetPassword' && oobCode) {
    return <ResetPassword oobCode={oobCode} />;
  }

  useEffect(() => {
    if (currentUser) {
      const hasOnboardedLocal = localStorage.getItem('pmverse_onboarded');
      
      // If we already completed it locally, we're good
      if (hasOnboardedLocal === 'true') {
        setOnboarded(true);
        return;
      }

      // Check if it's a new user based on Firebase metadata
      const creationTime = currentUser.metadata?.creationTime;
      const lastSignInTime = currentUser.metadata?.lastSignInTime;
      
      // For mock users, they are always "new" unless local storage says otherwise
      const isMockUser = currentUser.uid === 'mock-uid';
      
      // If creation time is very close to last sign in time, they are a new user
      const isNewUser = isMockUser || creationTime === lastSignInTime;

      if (isNewUser) {
        setOnboarded(false);
      } else {
        // If they are an existing user who just logged in on a new device, skip onboarding
        setOnboarded(true);
        localStorage.setItem('pmverse_onboarded', 'true');
      }
    }
  }, [currentUser]);

  if (!currentUser) {
    if (showSignup) {
      return <Signup onSwitchToLogin={() => setShowSignup(false)} />;
    }
    return <Login onSwitchToSignup={() => setShowSignup(true)} />;
  }

  // User is logged in, but their email is not verified (and it's not a mock user)
  if (!currentUser.emailVerified && currentUser.uid !== 'mock-uid') {
    // Note: Google sign-ins automatically have emailVerified = true
    return <VerifyEmail />;
  }

  // User is logged in and verified, but hasn't seen the intro onboarding
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
