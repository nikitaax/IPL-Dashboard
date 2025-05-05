export default async function fetchPoints() {
  try {
    const res = await fetch("http://localhost:3000/api/table", {});
    if (!res.ok) throw new Error("Failed to fetch data");
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
