import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Key, Mail, Compass, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../ThemeContext';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';

import loginIllustration from '../assets/login_illustration.jpg';
import loginBgWaves from '../assets/login_bg_waves.jpg';

export default function Signup({ onSwitchToLogin }) {
  const { theme } = useTheme();
  const { setCurrentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isDark = theme === 'dark';
  
  // Color palette matching the mockup
  const brandPurple = '#8b5cf6';
  const brandPurpleHover = '#7c3aed';
  
  const bgColor = isDark ? '#0f0e13' : '#f8f9fc';
  const cardBg = isDark ? '#1a1820' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#6b7280';
  const inputBg = isDark ? '#23212b' : '#f8fafc';
  const borderColor = isDark ? '#3f3c46' : '#e2e8f0';
  const leftPanelBg = isDark ? '#141218' : '#fafafa';

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
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
    if (!auth) {
      setError("Firebase is not configured. Please use email/password for mock login.");
      return;
    }

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
      backgroundImage: `url(${loginBgWaves})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: textColor,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundColor: cardBg,
          width: '100%',
          maxWidth: '1000px',
          height: '100%',
          maxHeight: '650px',
          borderRadius: '24px',
          boxShadow: isDark ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 25px 50px -12px rgba(0, 0, 0, 0.05), 0 0 40px rgba(139, 92, 246, 0.1)',
          display: 'flex',
          overflow: 'hidden',
          border: `1px solid ${borderColor}`
        }}
      >
        {/* Left Panel - Branding & Illustration */}
        <div style={{
          flex: '1',
          backgroundColor: leftPanelBg,
          display: 'none', // Hidden on small screens
          flexDirection: 'column',
          padding: '48px',
          boxSizing: 'border-box',
          position: 'relative',
          borderRight: `1px solid ${borderColor}`
        }} className="login-left-panel">
          
          <style>{`
            @media (min-width: 768px) {
              .login-left-panel { display: flex !important; }
            }
          `}</style>

          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: brandPurple,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            boxShadow: `0 8px 16px rgba(139, 92, 246, 0.3)`
          }}>
            <Compass size={24} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Fast-track your PM career 📈
          </h1>
          
          <p style={{ color: secondaryText, margin: '0 0 40px 0', fontSize: '15px', lineHeight: '1.5', maxWidth: '80%' }}>
            Stop guessing. Start practicing with real-world scenarios to ace your interviews and land your dream PM role.
          </p>

          <div style={{
            flex: 1,
            backgroundImage: `url(${loginIllustration})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            borderRadius: '12px'
          }} />
        </div>

        {/* Right Panel - Form */}
        <div style={{
          flex: '1',
          padding: '48px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          width: '100%'
        }}>
          
          {/* Mobile Logo Header */}
          <div className="mobile-header" style={{ display: 'none', marginBottom: '32px', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px', backgroundColor: brandPurple,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Compass size={20} color="#ffffff" />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700 }}>PMverse</span>
          </div>
          <style>{`
            @media (max-width: 767px) {
              .mobile-header { display: flex !important; }
            }
          `}</style>

          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>
            Create an account
          </h2>
          <p style={{ color: secondaryText, margin: '0 0 24px 0', fontSize: '14px' }}>
            Join PMverse and start your journey
          </p>

          {error && (
            <div style={{
              width: '100%', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '8px',
              fontSize: '13px', marginBottom: '20px', boxSizing: 'border-box',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold' }}>!</div>
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color={secondaryText} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@test.com"
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '12px 12px 12px 42px',
                    backgroundColor: inputBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: '8px',
                    color: textColor,
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = brandPurple}
                  onBlur={(e) => e.target.style.borderColor = borderColor}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} color={secondaryText} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '12px 42px 12px 42px',
                      backgroundColor: inputBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      color: textColor,
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = brandPurple}
                    onBlur={(e) => e.target.style.borderColor = borderColor}
                    required
                  />
                  <div 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: secondaryText }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Confirm</label>
                <div style={{ position: 'relative' }}>
                  <Key size={18} color={secondaryText} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: '100%', boxSizing: 'border-box',
                      padding: '12px 42px 12px 42px',
                      backgroundColor: inputBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: '8px',
                      color: textColor,
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = brandPurple}
                    onBlur={(e) => e.target.style.borderColor = borderColor}
                    required
                  />
                   <div 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: secondaryText }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: brandPurple,
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
                opacity: loading ? 0.8 : 1,
                transition: 'background-color 0.2s',
                boxShadow: `0 4px 12px rgba(139, 92, 246, 0.25)`
              }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = brandPurpleHover)}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = brandPurple)}
            >
              <UserPlus size={18} />
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '24px 0', gap: '16px' }}>
            <div style={{ height: '1px', flex: 1, backgroundColor: borderColor }} />
            <span style={{ color: secondaryText, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>OR</span>
            <div style={{ height: '1px', flex: 1, backgroundColor: borderColor }} />
          </div>

          <button 
            onClick={handleGoogleSignup}
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'transparent',
              color: textColor,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'background-color 0.2s',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = isDark ? '#2a2732' : '#f1f5f9')}
            onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = 'transparent')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p style={{ marginTop: '32px', fontSize: '14px', color: secondaryText, textAlign: 'center' }}>
            Already have an account? <span 
              onClick={onSwitchToLogin}
              style={{ color: brandPurple, cursor: 'pointer', fontWeight: 600 }}
            >Sign in</span>
          </p>

        </div>
      </motion.div>
    </div>
  );
}
