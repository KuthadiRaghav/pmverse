import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Compass, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebase';
import { useTheme } from '../ThemeContext';
import { getFriendlyErrorMessage } from '../utils/firebaseErrors';

import loginIllustration from '../assets/login_illustration.jpg';
import loginBgWaves from '../assets/login_bg_waves.jpg';

export default function ResetPassword({ oobCode }) {
  const { theme } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const isDark = theme === 'dark';
  
  const brandPurple = '#8b5cf6';
  const brandPurpleHover = '#7c3aed';
  
  const bgColor = isDark ? '#0f0e13' : '#f8f9fc';
  const cardBg = isDark ? '#1a1820' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#6b7280';
  const inputBg = isDark ? '#23212b' : '#f8fafc';
  const borderColor = isDark ? '#3f3c46' : '#e2e8f0';
  const leftPanelBg = isDark ? '#141218' : '#fafafa';

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    
    if (!auth) {
      setError('Firebase is not configured.');
      setLoading(false);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      setSuccess(true);
    } catch (err) {
      setError(getFriendlyErrorMessage(err));
    }
    setLoading(false);
  };

  const navigateToHome = () => {
    // Remove query params to get back to clean root
    window.location.href = window.location.origin;
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
          display: 'none', 
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
            <img src="/favicon.jpg" alt="PMverse Mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
            Secure your account <span role="img" aria-label="lock">🔒</span><br/>
            in <span style={{ color: brandPurple }}>PMverse</span>
          </h1>
          
          <p style={{ color: secondaryText, margin: '0 0 40px 0', fontSize: '15px', lineHeight: '1.5', maxWidth: '80%' }}>
            Set a new, strong password to regain access to your product management workspace.
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
          
          <div className="mobile-header" style={{ display: 'none', marginBottom: '32px', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px', backgroundColor: brandPurple,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <img src="/favicon.jpg" alt="PMverse Mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 700 }}>PMverse</span>
          </div>
          <style>{`
            @media (max-width: 767px) {
              .mobile-header { display: flex !important; }
            }
          `}</style>

          {success ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <CheckCircle size={32} />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>Password Reset Complete</h2>
              <p style={{ color: secondaryText, margin: '0 0 32px 0', fontSize: '15px', lineHeight: '1.5' }}>
                Your password has been successfully updated. You can now use it to sign in to your account.
              </p>
              <button 
                onClick={navigateToHome}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: brandPurple,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  boxShadow: `0 4px 12px rgba(139, 92, 246, 0.25)`
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = brandPurpleHover)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = brandPurple)}
              >
                Return to Login
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>
                Create new password
              </h2>
              <p style={{ color: secondaryText, margin: '0 0 24px 0', fontSize: '14px' }}>
                Please enter your new password below.
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

              <form onSubmit={handleResetPassword} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>New Password</label>
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: textColor }}>Confirm New Password</label>
                  <div style={{ position: 'relative' }}>
                    <Key size={18} color={secondaryText} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="password" 
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
                  <Key size={18} />
                  {loading ? 'Updating...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

        </div>
      </motion.div>
    </div>
  );
}
