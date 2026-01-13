import { Typography } from "@mui/material";
import Image from "next/image";

const TopPerformingCard = () => {
  const data = [
    { iconName: "Tour.svg", label: "Paris Getaway", description: "5 Nights" },
    { iconName: "Booking.svg", label: "5,400", description: "Bookings" },
    { iconName: "Payment.svg", label: "$1.2M", description: "Revenue" },
    { iconName: "Star.svg", label: "4.8/5", description: "Rating" },
  ];
  return (
    <div
      style={{ height: "19.438rem" }}
      className="border flex flex-col border-gray-200 h-full rounded-2xl p-2"
    >
      <Typography className="primary-text" fontWeight="bold" fontSize="1rem">
        Top Performing Tours
      </Typography>
      <div className="flex-grow-1 overflow-auto ms-2">
        {data?.map((item, index) => (
          <div key={item?.label+'_0'+index} className="flex gap-3 my-3">
            <div>
              <Image
                src={`/images/icons/${item.iconName}`}
                alt="icon"
                height={18.75}
                width={24}
              />
            </div>
            <div>
              <div>
                <Typography fontSize={"0.875rem"} fontWeight={"bold"}>
                  {item?.label}
                </Typography>
              </div>
              <div className="border-b inline-block pb-1">
                <Typography fontSize={"0.75rem"}>
                  {item?.description}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformingCard;
