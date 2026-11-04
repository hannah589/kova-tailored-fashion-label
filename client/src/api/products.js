// import Firebase functions: 
import {
  collection, // reference to collection/table
  doc, // reference to a specific doc/instance
  addDoc, // creates a new doc/instance with an auto generated id = doc.id,
  getDocs, //read/get all docs from a collection/table 
  getDoc, //get a single document 
  updateDoc,
  deleteDoc, 
  increment,
} from "firebase/firestore";

//import db connection from firebase.js
import { db } from "../config/firebase";


// ALL API PRODUCT FUNCTIONS
// CREATE/ADD 
export async function createProduct(productData) {
  try{
    //reference to products collection/table
    const productsRef = collection(db, "products");
    //add new product and get the document reference
    const docRef = await addDoc(productsRef, productData);
    // Log the product name and the unique Firestore document ID
    console.log("Added product: ", docRef.id );
    //return new document ID
    return docRef.id;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET ALL
export async function getAllProducts() {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// GET by Id
export async function getProductById(productId) {
  try {
    const productRef = doc(db, "products", productId);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// UPDATE PRODUCT
export async function updateProduct(productId, updates) {
  try{
    // db connection, point to table, point to specific productId
    const productRef = doc(db, "products", productId );

    // update product
    await updateDoc(productRef, updates)
  }catch(err){
    console.error(err)
    throw err;
  }
}

// DELETE
export async function deleteProduct(productId) {
  try{
    await deleteDoc(doc(db, "products", productId));
    console.log("Successfully deleted:", productId);
  }catch(err){
    console.error(err)
    throw err;
  }    
}

// DECREASE STOCK?
// productId = which document to update.
// quantityPurchased = how much to subtract from stock.
export async function decrementStock(productId, quantityPurchased) {
  try{
    // Get a reference to the specific product document.
    const productRef = doc(db, "products", productId);

    // Decrease the stock by the quantity purchased.
    await updateDoc(productRef, {
    stock: increment(-quantityPurchased),
    });
  } catch (err) {
    console.error(err)
    throw err;
  }
}
    