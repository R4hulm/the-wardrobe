import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
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

  const provider =new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account',
  });

  export const auth= getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth =async (userAuth) => {
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
            });
        }catch (error){
            console.log ('error creating the user',error.message);
        }
    }

    return userDocRef;

  };