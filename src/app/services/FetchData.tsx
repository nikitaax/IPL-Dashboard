export default async function fetchData() {
  try {
    const res = await fetch("http://localhost:3000/api/fixtures");
    if (!res.ok) throw new Error("Failed to fetch fixtures");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    return { fixtures: [] };
  }
}
