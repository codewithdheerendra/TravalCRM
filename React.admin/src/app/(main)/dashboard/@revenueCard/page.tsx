import styles from "../Dashboard.module.css";

const RevenueCard = () => {
  return (
    <aside style={{ height: "19.438rem" }} className={`${styles["revenue-card-year"]} rounded-2xl flex justify-center items-center text-center text-white text-lg flex-col gap-3`}>
      <p className="font-extrabold">Revenue this year</p>
      <p className="font-extrabold text-5xl">27K</p>
      <p>2021</p>
    </aside>
  );
};

export default RevenueCard;
