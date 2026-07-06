import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { applyActionCode } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../ThemeContext';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function ProcessingVerification({ oobCode }) {
  const { theme } = useTheme();
  const { currentUser, setCurrentUser } = useAuth();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1816' : '#f5f3f0';
  const cardBg = isDark ? '#2a2723' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#3f3c38' : '#e5e7eb';

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await applyActionCode(auth, oobCode);
        
        // If the user is currently logged in on this browser, reload their profile 
        // to get the updated emailVerified status immediately.
        if (currentUser) {
          await currentUser.reload();
          // Force a state update with the fresh user data
          setCurrentUser({ ...auth.currentUser });
        }
        
        setStatus('success');
        
        // Remove the query parameters from the URL so it doesn't try to verify again on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
        
      } catch (error) {
        setStatus('error');
        setErrorMsg(error.message || 'The link is invalid or has expired.');
      }
    };

    if (oobCode) {
      verifyEmail();
    }
  }, [oobCode, currentUser, setCurrentUser]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: bgColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: textColor,
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          backgroundColor: cardBg,
          width: '100%',
          maxWidth: '400px',
          borderRadius: '16px',
          boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          border: `1px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {status === 'processing' && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{ marginBottom: '24px', color: '#3b82f6' }}
            >
              <Loader2 size={48} />
            </motion.div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>
              Verifying your email...
            </h1>
            <p style={{ color: secondaryText, margin: 0, fontSize: '15px' }}>
              Please wait just a moment.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{ color: '#10b981', marginBottom: '24px' }}>
              <CheckCircle size={64} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>
              Email Verified!
            </h1>
            <p style={{ color: secondaryText, margin: '0 0 32px 0', fontSize: '15px' }}>
              Your account has been successfully verified.
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Enter PMverse
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{ color: '#ef4444', marginBottom: '24px' }}>
              <XCircle size={64} />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>
              Verification Failed
            </h1>
            <p style={{ color: secondaryText, margin: '0 0 32px 0', fontSize: '15px' }}>
              {errorMsg}
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Go Back
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
