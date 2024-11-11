import { db } from "@/lib/firebase"; // Adjusted import to match initialization

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  
  try {
    const snapshot = await db.collection("registrations").where("status", "==", "completed").get();
    const completedRegistrations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(completedRegistrations);
  } catch (error) {
    console.error("Error fetching completed registrations:", error);
    res.status(500).json({ message: "Failed to fetch completed registrations" });
  }
}

export async function GET(req) {
  try {
    const response = await fetch("your-api-endpoint");
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response("Error fetching data", { status: 500 });
  }
}