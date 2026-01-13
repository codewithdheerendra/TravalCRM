"use client";

import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CancelIcon from "@mui/icons-material/Cancel";
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import BookingDetailsModal from "./BookingDetailsModal";

export default function BookingHistoryTable({ bookings }: { bookings: any[] }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuIndex, setMenuIndex] = useState<number | null>(null);
    const [selectedBookingId, setSelectedBookingId] = useState<null | string>(null)
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, idx: number) => {
        setAnchorEl(event.currentTarget);
        setMenuIndex(idx);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuIndex(null);
    };

    return (
        <>
            <BookingDetailsModal
                bookingId={selectedBookingId}
                open={Boolean(selectedBookingId)}
                onClose={() => setSelectedBookingId(null)}
            />

            <div className="space-y-3">
                {/* Section Title */}
                <h2 className="text-base font-medium text-gray-700">Booking History</h2>

                {/* Table */}
                <div className="overflow-x-auto border border-gray-300 rounded-xl">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600">
                                <th className="p-3 text-left">Booking ID</th>
                                <th className="p-3 text-left">Tour Package</th>
                                <th className="p-3 text-left">Duration</th>
                                <th className="p-3 text-left">Departure City</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Payment</th>
                                <th className="p-3 w-[50px] text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{b.bookingId}</td>
                                    <td className="p-3">{b.tourPackage}</td>
                                    <td className="p-3">{b.duration}</td>
                                    <td className="p-3">{b.departureCity}</td>
                                    <td className="p-3">{b.date}</td>
                                    <td className="p-3">
                                        {b.status === "Confirmed" ? (
                                            <span className="text-green-600 font-medium flex items-center gap-1">
                                                ✔ Confirmed
                                            </span>
                                        ) : (
                                            <span className="text-yellow-600 font-medium flex items-center gap-1">
                                                ⏳ Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {b.payment.amount}{" "}
                                        <span
                                            className={`ml-1 font-medium ${b.payment.status === "Paid"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {b.payment.status}
                                        </span>
                                    </td>

                                    {/* MoreVert Menu */}
                                    <td className="p-3 w-[50px] text-center relative">
                                        <IconButton
                                            onClick={(e) => handleMenuOpen(e, idx)}
                                            size="small"
                                        >
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MUI Menu */}
                {/* MUI Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            if (menuIndex !== null) {
                                setSelectedBookingId(bookings[menuIndex].bookingId); // ✅ set correct bookingId
                            }
                            handleMenuClose();
                        }}
                    >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>View Details</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose}>
                        <ListItemIcon>
                            <ReceiptLongIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Download Invoice</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleMenuClose} sx={{ color: "red" }}>
                        <ListItemIcon>
                            <CancelIcon fontSize="small" sx={{ color: "red" }} />
                        </ListItemIcon>
                        <ListItemText>Cancel Booking</ListItemText>
                    </MenuItem>
                </Menu>

            </div>
        </>
    );
}
