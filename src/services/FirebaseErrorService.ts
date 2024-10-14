// src/services/firebaseErrorService.ts
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getFirebaseErrorMessage = (error: FirebaseError): string => {
  switch (error.code) {
    case 'Failed to get document because the client is offline.':
      return 'Check youre internet connection';
    case 'auth/user-not-found':
      return 'User not found. Please check your credentials.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'user not found';
    case 'auth/email-already-in-use':
      return 'Email is already in use. Please use a different email.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password.';
    case 'firestore/permission-denied':
      return 'You do not have permission to perform this action.';
    case 'firestore/unavailable':
      return 'The service is currently unavailable. Please try again later.';
    case 'firestore/not-found':
      return 'The requested document was not found.';
    case 'firestore/failed-precondition':
      return 'Operation failed due to a failed precondition.';
    case 'firestore/cancelled':
      return 'Operation was cancelled.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

export const handleFirebaseError = (error: FirebaseError): string => {
  const errorMessage = getFirebaseErrorMessage(error);
  toast.error(errorMessage);
  return errorMessage;
};
