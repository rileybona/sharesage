export default function ExpenseTypeImage({ type }) {
  const types_url = { default: "https://dummyimage.com/300" };
  const imgsrc = types_url[type] || types_url.default;
  return <img src={imgsrc} alt={type || "default"}></img>;
}
