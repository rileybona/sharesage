import { all } from "underscore";

export default function ExpenseTypeImage({ type, allExpenses = false }) {
  const types_url = { default: "https://dummyimage.com/300" };
  const imgsrc = types_url[type] || types_url.default;
  return (
    <img
      className={allExpenses ? "expense-type-image" : ""}
      src={imgsrc}
      alt={type || "default"}
    ></img>
  );
}
