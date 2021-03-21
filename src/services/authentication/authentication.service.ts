import * as firebase from 'firebase';

export const loginRequest = (
  email: string,
  password: string,
): Promise<firebase.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password);
