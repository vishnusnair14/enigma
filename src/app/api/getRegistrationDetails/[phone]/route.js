// app/api/registration/[phone]/route.js
import { db } from '../../../../lib/firebase';
import { doc, getDoc } from "firebase/firestore";

export async function GET(request, { params }) {
  const { phone } = params;
  const docRef = doc(db, "PendingRegistrations", phone);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {  // Correctly check if the document exists
      const docData = docSnap.data(); // Use .data() to get document data
      return new Response(JSON.stringify(docData), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response('Registration not found', { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return new Response('Failed to fetch data', { status: 500 });
  }
}
