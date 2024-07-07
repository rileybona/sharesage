export default function ExpenseTypeImage({ type }) {
  const types_url = new Map();
    types_url.set("Food", "../../public/food.png");
    types_url.set("Travel", "../../public/travel.png");
    types_url.set("Home", "../../public/home.png");
    types_url.set("Entertainment", "../../public/entertainment.png");
    types_url.set("Other", "../../public/other.png");
    types_url.default = "https://dummyimage.com/300";

  const imgsrc = types_url.get(type) || types_url.default;
  return <img src={imgsrc} alt={type || "default"}></img>;
}
