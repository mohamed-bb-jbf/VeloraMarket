import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
// @ts-ignore - getReactNativePersistence exists at runtime for React Native but TS can't resolve it here
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyAPlxWHD4FANo2M2BgN4UOWPclVyMATWmU',
    authDomain: 'veloramarket-15db0.firebaseapp.com',
    projectId: 'veloramarket-15db0',
    storageBucket: 'veloramarket-15db0.firebasestorage.app',
    messagingSenderId: '733076151545',
    appId: '1:733076151545:web:806edee132e23fd3599628',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);