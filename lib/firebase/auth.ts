import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

// Helper to check if user has admin privileges (for now, simply checking if they are logged in and their email meets a condition, or using a basic check.
// In a real app, you should use Firebase Custom Claims or a Firestore lookup).
export const isUserAdmin = (user: any) => {
    if (!user) return false;
    // Example rule: matching the specific admin emails
    return user.email?.includes('admin') || user.email === 'admin@zemen.com' || user.email === 'shikur@gmail.com';
};

export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
