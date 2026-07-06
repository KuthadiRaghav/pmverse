import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../ThemeContext';
import { sendEmailVerification } from 'firebase/auth';

export default function VerifyEmail() {
  const { theme } = useTheme();
  const { currentUser, logout } = useAuth();
  
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1a1816' : '#f5f3f0';
  const cardBg = isDark ? '#2a2723' : '#ffffff';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const secondaryText = isDark ? '#9ca3af' : '#6b7280';
  const borderColor = isDark ? '#3f3c38' : '#e5e7eb';

  const handleResend = async () => {
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser);
        alert('Verification email resent! Please check your inbox.');
      } catch (err) {
        alert('Error sending email: ' + err.message);
      }
    }
  };

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
          maxWidth: '440px',
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
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <Mail size={40} color="#10b981" />
        </div>

        <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0' }}>
          Verify your email
        </h1>
        <p style={{ color: secondaryText, margin: '0 0 32px 0', fontSize: '15px', lineHeight: '1.5' }}>
          We've sent a verification link to <strong>{currentUser?.email}</strong>. 
          Please click the link in the email to activate your account.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            I've verified my email <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={handleResend}
            style={{
              padding: '12px',
              backgroundColor: 'transparent',
              color: secondaryText,
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            Resend verification email
          </button>
        </div>

        <button 
          onClick={logout}
          style={{
            marginTop: '32px',
            background: 'none',
            border: 'none',
            color: '#ef4444',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </motion.div>
    </div>
  );
}
