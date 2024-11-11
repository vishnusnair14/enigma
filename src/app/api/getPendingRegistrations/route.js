import { collection, getDocs, query, where } from "firebase/firestore"; 
import {db} from '../../../lib/firebase'

// Named export for the GET method
export async function GET(req) {
  try {
    const citiesCol = collection(db, 'PendingRegistrations');
    const citySnapshot = await getDocs(citiesCol);
    const pendingRegistrations = citySnapshot.docs.map(doc => doc.data());
    
    // Return the fetched data as a JSON response
    return new Response(JSON.stringify(pendingRegistrations), { status: 200 });

  } catch (error) {
    console.error("Error fetching pending registrations:", error);
    
    // If there's an error, return a 500 error with a message
    return new Response("Failed to load pending registrations.", { status: 500 });
  }
}
