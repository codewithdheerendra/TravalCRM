import { Avatar, IconButton, Typography } from "@mui/material";
import { FiArrowRight } from "react-icons/fi";

export default function RecentActivity() {
  const activities = [
    {
      avatar: "A",
      message: "Natasha booked a tour to Paris",
      dateTime: new Date().getFullYear(),
    },
    {
      avatar: "B",
      message: "Natasha booked a tour to Paris and also shim",
      dateTime: new Date().getFullYear(),
    },
    {
      avatar: "C",
      message: "Natasha booked a tour to Paris",
      dateTime: new Date().getFullYear(),
    },
    {
      avatar: "D",
      message: "Natasha booked a tour to Paris",
      dateTime: new Date().getFullYear(),
    },
  ];
  return (
    <div
      style={{ height: "19.438rem" }}
      className="border flex flex-col border-gray-200 h-full rounded-2xl p-2"
    >
      <Typography className="primary-text" fontWeight="bold" fontSize="1rem">
        Recent Activity
      </Typography>
      <ul className="flex-grow-1 overflow-auto">
        {activities?.map((activity, index) => (
          <li key={activity?.message+'_01'+index} className="my-2 flex gap-2 justify-between items-start">
            <Avatar style={{width: "30px", height: "30px"}} variant="circular">{activity.avatar}</Avatar>
            <p className="flex-grow-1">
              <span className="flex justify-between items-center">
                {activity?.message}
                <IconButton color="error" aria-label="View Report">
                  <FiArrowRight size={'16px'}/>
                </IconButton>
              </span>
              <small className="muted-text block text-end pe-2">{activity?.dateTime}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
