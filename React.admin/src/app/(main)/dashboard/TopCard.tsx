import { Typography } from "@mui/material";
import Image from "next/image";

type TopCardProps = {
  iconName: string;
  label: string;
  value: string | number;
  cardClass?: string;
  iconClass?: string;
};

const TopCard = ({
  iconName,
  label,
  value,
  cardClass,
  iconClass,
}: TopCardProps) => {
  return (
    <div className={`flex p-3 gap-3 items-center rounded-3xl ${cardClass}`}>
      <span className={`flex p-2 rounded-full shadow-2xl items-center ${iconClass}`}>
        <Image src={`/images/icons/${iconName}`} alt="logo" width={36} height={36} className="max-h-[36px] object-contain"/>
      </span>
      <p className="grid">
        <Typography component={'span'} fontWeight={"bold"} fontSize={"1.5rem"}>{value}</Typography>
        {label}
      </p>
    </div>
  );
};

export default TopCard;
