export function getFriendlyErrorMessage(error) {
  if (!error) return 'An unknown error occurred.';
  
  // Extract the code from the Firebase error object or use the error string if it's already a code
  const code = error.code || error.message || error;

  switch (code) {
    case 'auth/email-already-in-use':
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'This email address is already registered. Please sign in instead.';
    case 'auth/invalid-email':
    case 'Firebase: Error (auth/invalid-email).':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
    case 'Firebase: Error (auth/user-not-found).':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
    case 'Firebase: Error (auth/wrong-password).':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
    case 'Firebase: Error (auth/invalid-credential).':
      return 'Invalid email or password. Please try again.';
    case 'auth/weak-password':
    case 'Firebase: Error (auth/weak-password).':
      return 'Your password is too weak. Please use at least 6 characters.';
    case 'auth/too-many-requests':
    case 'Firebase: Error (auth/too-many-requests).':
      return 'Too many failed login attempts. Please try again later or reset your password.';
    case 'auth/network-request-failed':
    case 'Firebase: Error (auth/network-request-failed).':
      return 'Network error. Please check your internet connection and try again.';
    case 'auth/popup-closed-by-user':
    case 'Firebase: Error (auth/popup-closed-by-user).':
      return 'Sign-in popup was closed before completing. Please try again.';
    default:
      // If it's a raw Firebase message, try to strip the ugly prefix
      if (typeof code === 'string' && code.includes('Firebase: Error')) {
        return 'Authentication failed. Please check your details and try again.';
      }
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}
