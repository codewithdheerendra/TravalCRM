import { Typography } from "@mui/material";
import TrendsCard from "./TrendsCard";

export default function DashboardPage() {
  return <div>
    <div className=" flex justify-between items-center mb-1">
      <Typography className="primary-text" fontWeight="bold" fontSize="1rem">
        Top Performing Tours
      </Typography>
      <div>
        Dropdown filter
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {trends.map((trend, index) => (
        <TrendsCard
          key={index}
          imgSrc={trend.imgSrc}
          location={trend.location}
          price={trend.price}
          label={trend.label}
        />
      ))}
    </div>
  </div>;
}

const trends = [
  {
    // UPDATED: This URL is now valid.
    imgSrc: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1025&auto=format&fit=crop',
    location: 'Bali',
    label: 'Most Popular Destination',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1032&auto=format&fit=crop',
    location: 'North America',
    label: 'Most Active User Region',
  },
  {
    // UPDATED: This URL is now valid.
    imgSrc: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=1074&auto=format&fit=crop',
    location: 'Luxury Tour - Maldives',
    price: 9500,
    label: 'Highest Paying Booking',
  },
  {
    // UPDATED: This URL is now valid.
    imgSrc: 'https://images.unsplash.com/photo-1563492065599-3520f775ee05?q=80&w=870&auto=format&fit=crop',
    location: 'Weekend Getaway - Thailand',
    price: 250,
    label: 'Lowest Priced Booking',
  },
];
