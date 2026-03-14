import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_EMAIL = "shikur@gmail.com";
const ADMIN_PASSWORD = process.argv[2];

if (!ADMIN_PASSWORD) {
    console.error("❌ Please provide a password as an argument.");
    console.log("Usage: node scripts/create-admin.mjs <your_new_password>");
    process.exit(1);
}

async function setupAdmin() {
    try {
        let userCredential;
        let isNewUser = false;

        console.log(`⏳ Setting up admin for ${ADMIN_EMAIL}...`);

        try {
            // Try to sign in first
            userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
            console.log("✅ User already exists with this password. Updating Firestore record...");
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                console.error("❌ User exists but wrong password. Please use the correct existing password to update, or try resetting it.");
                process.exit(1);
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                // User does not exist, let's create them
                console.log("Creating new user in Firebase Auth...");
                userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
                isNewUser = true;
                console.log("✅ Successfully created new user in Firebase Auth.");
            } else {
                throw error;
            }
        }

        const user = userCredential.user;
        const targetUid = "8gngSx3XLdPvG9LJqLX97kDL6h13"; // Using the user's specific requested UID to sync
        const actualUid = user.uid;

        console.log(`Current Auth UID: ${actualUid}`);

        // Set the Firestore document
        const userDocRef = doc(db, "users", actualUid);

        const adminData = {
            createdAt: new Date("2026-03-12T01:08:13+03:00"),
            displayName: "Admin",
            email: ADMIN_EMAIL,
            isAdmin: true,
            role: "admin",
            uid: actualUid,
            updatedAt: new Date("2026-03-12T01:08:13+03:00")
        };

        await setDoc(userDocRef, adminData, { merge: true });

        console.log("✅ Admin user document successfully written to Firestore 'users' collection!");
        console.log("🎉 You can now login at http://localhost:3000/admin/login");
        process.exit(0);

    } catch (error) {
        console.error("❌ Error setting up admin:", error.message);
        process.exit(1);
    }
}

setupAdmin();
