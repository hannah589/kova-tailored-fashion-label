//import firebase functions
//collection = table
//document = row instance
import {
  collection,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
//import db from firebase.js file
import { db } from "../firebase.js";

// CREATE/ADD
export async function createUser() {
  const usersRef = collection(db, "users");
  
  const userRef = await addDoc()
};

// READ/GET
export async function getUsers() => {
  
};

// UPDATE/PUT
export async function updateUser(userId, username) {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    username: (username),
  })
};

// DELETE
export async function deleteUser(userId) {
  //connect w/db, users table, delete the userId
  await deleteDoc(doc(db, "users", userId));
  console.log("Successfully deleted:", userId);
};