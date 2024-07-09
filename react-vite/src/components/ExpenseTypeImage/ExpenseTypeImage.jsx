import food from "./food.png";
import travel from "./travel.png";
import home from "./home.png";
import entertainment from "./entertainment.png";
import other from "./other.png";

export default function ExpenseTypeImage({ type, allExpenses = false }) {
  const types_url = new Map();
  types_url.set("Food", food);
  types_url.set("Travel", travel);
  types_url.set("Home", home);
  types_url.set("Entertainment", entertainment);
  types_url.set("Other", other);
  types_url.default = "https://dummyimage.com/300";

  const imgsrc = types_url.get(type) || types_url.default;
  return (
    <img
      className={allExpenses ? "expense-type-image" : ""}
      src={imgsrc}
      alt={type || "default"}
    ></img>
  );
}
