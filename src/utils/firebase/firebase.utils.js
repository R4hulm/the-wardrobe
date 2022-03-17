import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDTGQZ8nfvYUesz_9skmxMCZYBcDI8i4SY",
    authDomain: "the-wardrobe-db-d4e98.firebaseapp.com",
    projectId: "the-wardrobe-db-d4e98",
    storageBucket: "the-wardrobe-db-d4e98.appspot.com",
    messagingSenderId: "1066004315266",
    appId: "1:1066004315266:web:0ca9eb24784d17e368c89b"
  };
  
  
    const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: 'select_account',
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () =>
   signInWithPopup(auth,googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth =async (userAuth,additionalInformation={}) => {
      if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    
    const userSnapshot = await getDoc(userDocRef);
    if(!userSnapshot.exists()){
        const { displayName,email } =userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        }catch (error){
            console.log ('error creating the user',error.message);
        }
    }

    return userDocRef;

  };

  export const createAuthUserWithEmailAndPassword =async (email,password) => {
      if (!email || !password) return;

      return await createUserWithEmailAndPassword(auth,email,password)
  };
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener  = (callback) => 
onAuthStateChanged(auth,callback);