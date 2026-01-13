import { Grid } from "@mui/material";
import TopCard from "./TopCard";
import styles from "./Dashboard.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A robust theme setup for modern web apps.",
};

type DashboardProps = {
  children: React.ReactNode;
  recentActivity: React.ReactNode;
  revenueCard: React.ReactNode;
  topPerformingCard: React.ReactNode;
  analyticsChart: React.ReactNode;
};

const DashboardLayout = ({
  children,
  recentActivity,
  revenueCard,
  topPerformingCard,
  analyticsChart,
}: DashboardProps) => {
  return (
    <>
      <Grid component={"section"} container spacing={2} mb={4} my={3} px={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TopCard
            cardClass={styles["total-booking-card"]}
            iconClass={styles["total-booking-card--icon"]}
            iconName="Booking.svg"
            label="Total Bookings"
            value={1250}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TopCard
            cardClass={styles["revenue-card"]}
            iconClass={styles["revenue-card--icon"]}
            iconName="Revenue.svg"
            label="Revenue"
            value="$1213"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TopCard
            cardClass={styles["new-booking-card"]}
            iconClass={styles["new-booking-card--icon"]}
            iconName="Booking.svg"
            label="New Bookings"
            value="250"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TopCard
            cardClass={styles["payments-card"]}
            iconClass={styles["payments-card--icon"]}
            iconName="Revenue.svg"
            label="Pending Payments"
            value="$1213"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} component={"section"} px={2} pb={2}>
        <Grid container spacing={2} size={{ xs: 12, sm: 7.5, lg: 3 }}>
          {analyticsChart}
        </Grid>
        <Grid size={{ xs: 12, sm: 4.5, lg: 3 }}>{topPerformingCard}</Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>{revenueCard}</Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>{recentActivity}</Grid>
        <Grid size={12} className="pt-3">
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardLayout;
