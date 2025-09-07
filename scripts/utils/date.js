export function formatDate(isoDate){
  const date = new Date(isoDate);
  const options = { month: "long", day: "numeric" };
  const formatted = date.toLocaleDateString("en-US", options);
  return formatted
}
export function formatDateMod(isoDate){
  const date = new Date(isoDate);
  const options = { weekday: 'long', month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}