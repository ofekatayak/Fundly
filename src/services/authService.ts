// src/services/authService.ts
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { fetchUserFromDb } from './dbService';
import User from '../models/User';

export const handleAuthStateChanged = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, async (currentUser: FirebaseUser | null) => {
    if (currentUser) {
      const { uid, email } = currentUser;
      if (email) {
        const user = await fetchUserFromDb(uid);
        callback(user);
      }
    } else {
      callback(null);
    }
  });
};

export const registerUser = async (
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  await updateProfile(userCredential.user, { displayName });
  
  return userCredential;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async (): Promise<void> => {
  return await signOut(auth);
};
