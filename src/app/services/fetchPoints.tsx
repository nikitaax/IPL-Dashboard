export default async function fetchPoints() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/table`);

    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
