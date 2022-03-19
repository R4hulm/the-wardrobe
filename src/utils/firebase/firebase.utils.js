import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
      
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);
     

      objectsToAdd.forEach((object) => {
          const docRef = doc(collectionRef,object.title.toLowerCase());
          batch.set(docRef, object);
      });

      await batch.commit();
      console.log('done');
  };

  export const getCategoriesAndDocuments= async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot =await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title,items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;

    },{});
    return categoryMap;
  }

  export const createUserDocumentFromAuth =async (
      userAuth,
      additionalInformation={}
      ) => {
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

      return await createUserWithEmailAndPassword(auth,email,password);
  };
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener  = (callback) => 
onAuthStateChanged(auth,callback);