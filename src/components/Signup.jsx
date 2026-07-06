import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Key, Mail, Compass } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../ThemeContext';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';

export default function Signup({ onSwitchToLogin }) {
  const { theme } = useTheme();
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1816' : '#f5f3f0';
  const cardBg = isDark ? '#2a2723' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#6b7280';
  const inputBg = isDark ? '#1f1d1a' : '#f9fafb';
  const borderColor = isDark ? '#3f3c38' : '#e5e7eb';

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    // Fallback for mock environment
    if (!auth) {
      localStorage.setItem('pmverse_onboarded', 'true');
      setCurrentUser({ uid: 'mock-uid', email });
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email
      await sendEmailVerification(userCredential.user);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    }
    setLoading(false);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: bgColor,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: textColor,
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: cardBg,
          width: '100%',
          maxWidth: '420px',
          borderRadius: '16px',
          boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          border: `1px solid ${borderColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
          boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
        }}>
          <Compass size={32} color="#ffffff" />
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
          Create Account
        </h1>
        <p style={{ color: secondaryText, margin: '0 0 32px 0', fontSize: '15px' }}>
          Join PMverse and start your journey
        </p>

        {error && (
          <div style={{
            width: '100%', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px',
            fontSize: '13px', marginBottom: '20px', boxSizing: 'border-box'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: secondaryText }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color={secondaryText} style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 12px 12px 36px',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor,
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: secondaryText }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} color={secondaryText} style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 12px 12px 36px',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor,
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 500, color: secondaryText }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} color={secondaryText} style={{ position: 'absolute', left: '12px', top: '14px' }} />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', boxSizing: 'border-box',
                  padding: '12px 12px 12px 36px',
                  backgroundColor: inputBg,
                  border: `1px solid ${borderColor}`,
                  borderRadius: '8px',
                  color: textColor,
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s'
            }}
          >
            <UserPlus size={18} />
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '32px', fontSize: '14px', color: secondaryText }}>
          Already have an account? <span 
            onClick={onSwitchToLogin}
            style={{ color: '#10b981', cursor: 'pointer', fontWeight: 500 }}
          >Sign in</span>
        </p>

      </motion.div>
    </div>
  );
}
