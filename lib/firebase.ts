import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

interface Summary {
  originalText: string
  summary: string
  timestamp: string
}

export async function saveSummary(userId: string, summary: Summary) {
  try {
    const docRef = await addDoc(collection(db, "summaries"), {
      userId,
      ...summary,
    })
    return docRef.id
  } catch (error) {
    console.error("Error saving summary:", error)
    throw error
  }
}

export async function getSavedSummaries(userId: string) {
  try {
    const q = query(collection(db, "summaries"), where("userId", "==", userId), orderBy("timestamp", "desc"))

    const querySnapshot = await getDocs(q)
    const summaries: any[] = []

    querySnapshot.forEach((doc) => {
      summaries.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    return summaries
  } catch (error) {
    console.error("Error getting summaries:", error)
    throw error
  }
}

export async function deleteSummary(userId: string, summaryId: string) {
  try {
    await deleteDoc(doc(db, "summaries", summaryId))
  } catch (error) {
    console.error("Error deleting summary:", error)
    throw error
  }
}

