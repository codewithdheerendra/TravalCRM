"use client";
import { Button, IconButton, CircularProgress, Alert } from "@mui/material";
import { BiPlus, BiSearch } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import './tours.css';
import { useState, useEffect } from "react";
import TourCard, { TourItem } from "@/components/ui/TourCard";
import { getTours, tourToTourItem, ApiError } from "@/services/tours.api";
import { API_BASE_URL } from "@/lib/api.config";

export default function ToursPage() {
    const [tours, setTours] = useState<TourItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getTours({
                searchValue: searchValue || undefined,
                sortByLatestUpdate: true,
            });

            if (response.success && response.data) {
                // Transform backend tours to frontend format
                const transformedTours = response.data.map((tour) =>
                    tourToTourItem(tour, API_BASE_URL)
                );
                setTours(transformedTours);
            } else {
                setError(response.message || "Failed to fetch tours");
                setTours([]);
            }
        } catch (err) {
            console.error("Error fetching tours:", err);
            if (err instanceof ApiError) {
                setError(err.message || "Failed to fetch tours");
            } else {
                setError("An unexpected error occurred");
            }
            setTours([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        await fetchTours();
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <CircularProgress />
            </div>
        );
    }

    return (
        <>
            <h1 hidden>Tours Page</h1>
            {error && (
                <div className="px-4 mb-4">
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </div>
            )}
            {tours.length < 1 && !loading ? (
                <EmptySection />
            ) : (
                <>
                    <header className="sm:flex items-center justify-between mb-4 pt-2s px-4">
                        <p className="searchbar mb-2 sm:mb-0 flex border border-gray-200 rounded-full items-center basis-1/2">
                            <BiSearch className="inline-block ms-3 text-gray-500" />
                            <input
                                type="search"
                                className="px-3 py-1 grow-1 outline-0 border-0"
                                placeholder="Search by Tour Name, Destination, ID"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyPress={handleSearchKeyPress}
                            />
                        </p>
                        <div className="filterSorting flex gap-3 items-center">
                            <IconButton aria-label="Sort tours">
                                <CiFilter className="text-[var(--text-primary)]" />
                            </IconButton>
                            <Button
                                LinkComponent={"a"}
                                href="/tours/add-tour"
                                variant="contained"
                                color="primary"
                                startIcon={<BiPlus />}
                            >
                                Add New Tour
                            </Button>
                        </div>
                    </header>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 pb-3 px-4">
                        {tours.map((item, index) => (
                            <TourCard
                                key={index}
                                item={item}
                                component={"li"}
                            />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

function EmptySection(){
    return (
        <article className="bg-gray-50 rounded-lg shadow emptySection p-4 mt-10 md:mt-17 md:py-5">
            <h2 className="text-2xl font-bold mb-2 text-center">No Tours Available</h2>
            <p className="text-gray-600 mb-4 text-center">You haven&apos;t added any tours yet. Start by creating your first tour!</p>
            <div className="flex justify-center">
                <Button variant="contained" color="primary" size="large" startIcon={<BiPlus />}>Add First Tour</Button>
            </div>
        </article>
    )
}