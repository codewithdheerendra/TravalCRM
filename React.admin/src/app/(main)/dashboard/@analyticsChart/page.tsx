import { Grid } from "@mui/material";
import styles from "../Dashboard.module.css";
import PaymentIcon from "~/public/images/icons/Payment.svg";
import TotalBookingIcon from "~/public/images/icons/Booking.svg";
import BookingChart, { ChartDataPoint } from "./BookingChart";

const AnalyticsChart = () => {
  return (
    <>
      <Grid size={12} component={"aside"}>
        <BookingChart
          chartData={sampleChartData}
          totalBooking="$27K"
          bookingLabel="Booking this year"
          percentageChange={10.23}
          percentageLabel="Since last year"
        />
      </Grid>
      <Grid size={6} component={"aside"}>
        <div
          className={`${styles["total-booking-card"]} h-full py-3 text-black rounded-2xl flex flex-col justify-around items-center text-center`}
        >
          <span className="p-2 rounded-full shadow-2xl bg-white shadow-blue-900">
            <TotalBookingIcon width={32} height={32} />
          </span>
          <span className="mt-3 font-bold">230</span>
          <small className="text-gray-600">Avg. user per day</small>
        </div>
      </Grid>
      <Grid size={6} component={"aside"}>
        <div className={`${styles["avg-user-day-card"]} text-white rounded-2xl flex flex-col justify-around items-center p-3`}>
          <span className="p-2">
          <PaymentIcon width={32} height={32} /></span>
          <span className="font-bold mt-3">230</span>
          <small>Avg. user per day</small>
        </div>
      </Grid>
    </>
  );
};

export default AnalyticsChart;

const sampleChartData: ChartDataPoint[] = [
  { name: "Jan", success: 400, cancel: 240 },
  { name: "Feb", success: 600, cancel: 220 },
  { name: "Mar", success: 800, cancel: 290 },
  { name: "Apr", success: 850, cancel: 200 },
  { name: "May", success: 700, cancel: 400 },
  { name: "Jun", success: 950, cancel: 300 },
  { name: "Jul", success: 1100, cancel: 350 },
  { name: "Aug", success: 1000, cancel: 320 },
  { name: "Sep", success: 900, cancel: 380 },
  { name: "Oct", success: 1050, cancel: 450 },
];
