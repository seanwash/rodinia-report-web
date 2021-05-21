import firebase from "firebase/app";
// eslint-disable-next-line import/no-duplicates
import "firebase/auth";
// eslint-disable-next-line import/no-duplicates
import "firebase/firestore";
// eslint-disable-next-line import/no-duplicates
import "firebase/storage";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const fire = firebase;

if (fire.apps.length === 0) {
  fire.initializeApp(config);
}

fire.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export const auth = fire.auth();
export const firestore = fire.firestore();
export const storage = fire.storage();

// TODO: I was having some trouble getting the firebase emulator to work. Leaving
//       this commented code in here for now so I can revisit.
//
// if (process.env.DEV) {
//   // NOTE: disableWarnings hides a banner added to the page that warns when the
//   // auth emulator is being used. It can be disabled as below, but TS doesn't
//   // seem to know about the config options that can be passed in.
//   // @ts-ignore
//   fire.auth().useEmulator('http://localhost:9099', { disableWarnings: true });
//   fire.firestore().useEmulator('localhost', 8080);
// }

export default fire;
