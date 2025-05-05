export default async function fetchPoints() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/table`);
    if (!res.ok) throw new Error("Failed to fetch points table");
    const data = await res.json();
    return data || { table: [] };
  } catch (error) {
    console.error("Error fetching points table:", error);
    return { table: [] };
  }
}
