export default async function fetchData() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${apiUrl}/api/fixtures`);
    if (!res.ok) throw new Error("Failed to fetch fixtures");
    const data = await res.json();
    return data || { fixtures: [] };
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { fixtures: [] };
  }
}
