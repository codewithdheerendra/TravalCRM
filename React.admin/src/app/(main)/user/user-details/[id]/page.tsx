'use client';

import BookingHistoryTable from "../../BookingHistoryTable";
import UserCard, { User } from "../../UserCard";
import UserBasicDetailsCard from "../../UserBasicDetailsCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Types
interface BasicDetails {
  address: string;
  country: string;
  state: string;
  city: string;
  username: string;
  password: string;
}

interface Booking {
  bookingId: string;
  tourPackage: string;
  duration: string;
  departureCity: string;
  date: string;
  status: "Confirmed" | "Pending";
  payment: {
    amount: string;
    status: "Paid" | "Unpaid";
  };
}

// Dummy Data Loader
async function getUsersById(id: number): Promise<{
  user: User;
  basicDetails: BasicDetails;
  bookingHistory: Booking[];
}> {
  return {
    user: {
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      phone: "+1 234 567 890",
      userType: id % 2 === 0 ? "B2C (Individual)" : "B2B (Agent)",
      totalBookings: 12 + id,
      lastLogin: `${(id % 5) + 1} days ago`,
      status: (id % 3 === 0
        ? "Active"
        : id % 3 === 1
        ? "Inactive"
        : "Pending") as "Active" | "Inactive" | "Pending",
      avatar: `https://randomuser.me/api/portraits/${
        id % 2 === 0 ? "men" : "women"
      }/${30 + id}.jpg`,
      viewPath: `/user/view/${id}`,
      editPath: `/user/edit/${id}`,
      canDelete: id % 2 === 0,
    },

    basicDetails: {
      address: "123 St, Los Angeles, USA",
      country: "USA",
      state: "California",
      city: "Los Angeles",
      username: "USER@234",
      password: "********",
    },

    bookingHistory: Array.from({ length: 10 }, (_, i) => ({
      bookingId: `#2023123${i}`,
      tourPackage: "Badrinath-Kedarnath",
      duration: `${5 + i} Days`,
      departureCity: "Delhi",
      date: `${15 + i}/04/2024`,
      status: i % 2 === 0 ? "Confirmed" : "Pending",
      payment: { amount: "₹18,500", status: "Paid" },
    })),
  };
}

export default function UserViewPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await getUsersById(Number(id));
      if(data != null) setUserData(data);
    };
    fetchData();
  }, [id]);

  if (!id) return <div>User ID is missing</div>;
  if (!userData) return <div>Loading...</div>;

  const { user, basicDetails, bookingHistory } = userData;

  return (
    <div className="p-6 space-y-6">
      <UserCard user={user} />
      <UserBasicDetailsCard details={basicDetails} />
      <BookingHistoryTable bookings={bookingHistory} />
    </div>
  );
}
