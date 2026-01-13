"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface BookingDetails {
    bookingId: string;
    bookingDate: string;
    status: "Confirmed" | "Pending";
    totalCost: string;
    paymentMethod: string;
    traveller: {
        name: string;
        email: string;
        phone: string;
        gender: string;
        dob: string;
        travelers: number;
    };
    trip: {
        packageName: string;
        destinations: string[];
        departureCity: string;
        duration: string;
        startDate: string;
        endDate: string;
    };
    inclusions: string[];
    exclusions: string[];
}

async function getBookingDetailsById(id: string): Promise<BookingDetails> {
    return {
        bookingId: id,
        bookingDate: "15/04/2024",
        status: parseInt(id) % 2 === 0 ? "Confirmed" : "Pending",
        totalCost: "₹18,500 Paid",
        paymentMethod: "UPI",
        traveller: {
            name: "Logan AB",
            email: "loganwqre@gmail.com",
            phone: "+91 01234567890",
            gender: "M",
            dob: "12/12/1990",
            travelers: 1,
        },
        trip: {
            packageName: "Badrinath-Kedarnath",
            destinations: ["Haridwar", "Rishikesh", "Tungnath"],
            departureCity: "Delhi",
            duration: "7 Days",
            startDate: "10/01/2025",
            endDate: "17/01/2025",
        },
        inclusions: ["Hotel Stay", "Transportation", "Sightseeing", "Breakfast & Dinner"],
        exclusions: ["Flight Tickets", "Travel Insurance"],
    };
}

interface BookingDetailsModalProps {
    bookingId: string | null;
    open: boolean;
    onClose: () => void;
}

export default function BookingDetailsModal({
    bookingId,
    open,
    onClose,
}: BookingDetailsModalProps) {
    const [details, setDetails] = useState<BookingDetails | null>(null);

    useEffect(() => {
        if (bookingId) {
            getBookingDetailsById(bookingId).then(setDetails);
        }
    }, [bookingId]);

    if (!details) return null;

    const handleDownload = () => {
        const printContent = `
            <html>
                <head>
                    <title>Booking Invoice</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { margin-bottom: 20px; }
                        fieldset { border: 1px solid #ddd; border-radius: 8px; padding: 10px 15px; margin-bottom: 16px; }
                        legend { font-weight: bold; padding: 0 6px; }
                        p { margin: 4px 0; }
                        .section { margin-bottom: 12px; }
                    </style>
                </head>
                <body>
                    <h2>Booking Invoice</h2>

                    <fieldset>
                        <legend>Traveller Information</legend>
                        <p><b>Name:</b> ${details.traveller.name}</p>
                        <p><b>Email:</b> ${details.traveller.email}</p>
                        <p><b>Phone:</b> ${details.traveller.phone}</p>
                        <p><b>Gender:</b> ${details.traveller.gender}</p>
                        <p><b>DOB:</b> ${details.traveller.dob}</p>
                        <p><b>No. of Travellers:</b> ${details.traveller.travelers}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Trip Details</legend>
                        <p><b>Package:</b> ${details.trip.packageName}</p>
                        <p><b>Destinations:</b> ${details.trip.destinations.join(", ")}</p>
                        <p><b>Departure City:</b> ${details.trip.departureCity}</p>
                        <p><b>Duration:</b> ${details.trip.duration}</p>
                        <p><b>Dates:</b> ${details.trip.startDate} - ${details.trip.endDate}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Booking Summary</legend>
                        <p><b>Booking ID:</b> ${details.bookingId}</p>
                        <p><b>Booking Date:</b> ${details.bookingDate}</p>
                        <p><b>Status:</b> ${details.status}</p>
                        <p><b>Total Cost:</b> ${details.totalCost}</p>
                        <p><b>Payment Method:</b> ${details.paymentMethod}</p>
                    </fieldset>

                    <fieldset>
                        <legend>Inclusions & Exclusions</legend>
                        <p><b>Inclusions:</b> ${details.inclusions.join(", ")}</p>
                        <p><b>Exclusions:</b> ${details.exclusions.join(", ")}</p>
                    </fieldset>
                </body>
            </html>
        `;
        const printWindow = window.open("", "", "width=800,height=600");
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* Header */}
            <DialogTitle className="flex justify-between items-center !pb-3">
                <span className="text-lg font-bold">Booking Details</span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="text"
                        startIcon={<FileDownloadOutlinedIcon />}
                        onClick={handleDownload}
                        className="!text-black !font-normal"
                    >
                        Download Invoice
                    </Button>

                    <IconButton onClick={onClose} className="!text-gray-700">
                        <CloseIcon fontSize="small" />
                    </IconButton>

                </div>
            </DialogTitle>

            <DialogContent className="space-y-6">
                {/* Traveller Information */}
                <fieldset className="border border-gray-300 rounded-xl p-4">
                    <legend className="px-2 text-sm font-bold">Traveller Information</legend>
                    <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
                        <div><p className="text-gray-500">Name</p><p>{details.traveller.name}</p></div>
                        <div><p className="text-gray-500">Email</p><p>{details.traveller.email}</p></div>
                        <div><p className="text-gray-500">Phone</p><p>{details.traveller.phone}</p></div>
                        <div><p className="text-gray-500">Gender</p><p>{details.traveller.gender}</p></div>
                        <div><p className="text-gray-500">Birth Date</p><p>{details.traveller.dob}</p></div>
                        <div><p className="text-gray-500">No. of Travellers</p><p>{details.traveller.travelers}</p></div>
                    </div>
                </fieldset>

                {/* Trip Details */}
                <fieldset className="border border-gray-300 rounded-xl p-4">
                    <legend className="px-2 text-sm font-bold">Trip Details</legend>
                    <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
                        <div><p className="text-gray-500">Package Name</p><p>{details.trip.packageName}</p></div>
                        <div><p className="text-gray-500">Destinations</p><p>{details.trip.destinations.join(", ")}</p></div>
                        <div><p className="text-gray-500">Departure City</p><p>{details.trip.departureCity}</p></div>
                        <div><p className="text-gray-500">Duration</p><p>{details.trip.duration}</p></div>
                        <div><p className="text-gray-500">Dates</p><p>{details.trip.startDate} - {details.trip.endDate}</p></div>
                    </div>
                </fieldset>

                {/* Booking Summary + Inclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <fieldset className="border border-gray-300 rounded-xl p-4">
                        <legend className="px-2 text-sm font-bold">Booking Summary</legend>
                        <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
                            <div><p className="text-gray-500">Booking ID</p><p>{details.bookingId}</p></div>
                            <div><p className="text-gray-500">Booking Date</p><p>{details.bookingDate}</p></div>
                            <div><p className="text-gray-500">Status</p>
                                <p className={`font-medium ${details.status === "Confirmed" ? "text-green-600" : "text-red-600"}`}>
                                    {details.status === "Confirmed" ? "✔ Confirmed" : "✘ Pending"}
                                </p>
                            </div>
                            <div><p className="text-gray-500">Total Cost</p><p>{details.totalCost}</p></div>
                            <div><p className="text-gray-500">Payment Method</p><p>{details.paymentMethod}</p></div>
                        </div>
                    </fieldset>

                    <fieldset className="border border-gray-300 rounded-xl p-4">
                        <legend className="px-2 text-sm font-bold">Inclusions & Exclusions</legend>
                        <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm">
                            {details.inclusions.map((inc, i) => <div key={i}>✔ {inc}</div>)}
                            {details.exclusions.map((exc, i) => <div key={i}>✘ {exc}</div>)}
                        </div>
                    </fieldset>
                </div>
            </DialogContent>
        </Dialog>
    );
}
