"use client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Select, Slider, Stack, TableCell, TablePagination, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import { Fragment, useState } from "react";
import AppTable, { Column } from "@/components/ui/AppTable";
import { Close, MoreVert, Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { AppMenu } from "@/components/ui/AppMenu";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// Helper functions for random data
function randomId(length = 8) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
function randomName() {
    const firstNames = ["John", "Jane", "Alex", "Emily", "Chris", "Sara", "Michael", "Olivia"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia"];
    return (
        firstNames[Math.floor(Math.random() * firstNames.length)] +
        " " +
        lastNames[Math.floor(Math.random() * lastNames.length)]
    );
}
function randomTourName() {
    const tours = ["Safari Adventure", "City Lights", "Mountain Escape", "Beach Retreat", "Historic Journey"];
    return tours[Math.floor(Math.random() * tours.length)];
}
function randomDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString();
}
function randomPaymentStatus() {
    const statuses = ["Paid", "Pending", "Failed"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}
function randomAmount() {
    return "$" + (Math.random() * 500).toFixed(2);
}

function generateBooking() {
    return {
        bookingId: randomId(),
        tourName: randomTourName(),
        customerName: randomName(),
        bookingDate: randomDate(),
        paymentStatus: randomPaymentStatus(),
        paymentDue: randomAmount(),
    };
}

export default function BookingsPage() {
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPagesize] = useState<number>(10);
    const router = useRouter();
    const tableColumns: Column[] = [
        {id: 'bookingId', label: 'Booking ID', isVisbible: true},
        {id: 'tourName', label: 'Tour Name', isVisbible: true},
        {id: 'customerName', label: 'Customer Name', isVisbible: true},
        {id: 'bookingDate', label: 'Booking Date', isVisbible: true},
        {id: 'paymentStatus', label: 'Payment', isVisbible: true},
        {id: 'paymentDue', label: 'Balance Due', isVisbible: true},
    ];

    const [bookings] = useState(() =>
        Array.from({ length: 12 }, generateBooking)
    );

    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => {
        event?.stopPropagation();
        setPage(page);
    }
    const handlePageSizeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPagesize(Number(event.target.value));
    }

    return (
        <>
            <h1 hidden>Bookings Page</h1>
            {bookings.length < 1 ? <EmptySection/> :(
                <>
                <header className="sm:flex items-center justify-between mb-4 pt-2s px-4">
                    <p className="searchbar mb-2 sm:mb-0 flex border border-gray-200 rounded-full items-center basis-1/2">
                        <BiSearch className="inline-block ms-3 text-gray-500"/>
                        <input type="search" className="px-3 py-1 grow-1 outline-0 border-0" placeholder="Search by booking ID, customer name, or tour name" />
                    </p>
                    <div className="filterSorting flex gap-3 items-center">
                        {/* <IconButton aria-label="Sort tours">
                            <CiFilter className="text-[var(--text-primary)]"/>
                        </IconButton> */}
                        <FilterModal/>
                        <Button variant="outlined" color="primary" endIcon={<BiChevronDown/>}>Sort By</Button>
                    </div>
                </header>
                <Box component="section" px={2}>
                    <AppTable columns={tableColumns} data={bookings} sx={{maxHeight: '80dvh'}} renderRow={(item, index) => {
                        return (
                        <TableRow key={index} hover>
                            <TableCell>{item?.bookingId ?? ""}</TableCell>
                            <TableCell>{item?.tourName ?? ""}</TableCell>
                            <TableCell>{item?.customerName ?? ""}</TableCell>
                            <TableCell>{item?.bookingDate ?? ""}</TableCell>
                            <TableCell>{item?.paymentStatus ?? ""}</TableCell>
                            <TableCell>
                                <Stack justifyContent="space-between" direction="row" gap={1} alignItems="center">
                                    <Typography variant="body2">{item?.paymentDue ?? ""}</Typography>
                                    <AppMenu trigger={
                                        <Tooltip title="Menu">
                                            <IconButton size="small" color="primary" sx={{ml: "auto"}}><MoreVert/></IconButton>
                                        </Tooltip>
                                        }
                                        menuId={`composition-menu_${index}`}
                                        options={[
                                            {label: "View Details", icon: <Visibility fontSize="small"/>, onClick: () => {router.push('/bookings/bookings-432-adsaf')}},
                                            {label: "View", icon: <Visibility fontSize="small"/>}
                                        ]} 
                                    />
                                </Stack>
                            </TableCell>
                        </TableRow>);
                    }} />
                    <TablePagination component={"div"} labelRowsPerPage="Bookings per page:" count={bookings.length} page={page} rowsPerPage={pageSize} rowsPerPageOptions={[10,15,20]} onPageChange={handlePageChange} onRowsPerPageChange={handlePageSizeChange}></TablePagination>
                </Box>
                </>
            )}
        </>
    );
}

function EmptySection(){
    return (
        <article className="bg-gray-50 rounded-lg shadow emptySection p-4 mt-10 md:mt-17 md:py-5">
            <h2 className="text-2xl font-bold mb-2 text-center">No Booking is Available</h2>
        </article>
    )
}

function FilterModal(){ 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [form, setForm] = useState({
        tour: "",
        city: "",
        dateRange: ['', ''],
        paymentStatus: "",
        amountRange: [0, 0],
    });

    const handleChange = (event: Event, newValue: number[]) => {
        setForm(pre => ({...pre, amountRange: newValue}));
    };
    return (
        <>
            <IconButton aria-label="Filter tours" onClick={() => setIsOpen(true)}>
                <CiFilter className="text-[var(--text-primary)]"/>
            </IconButton>
            <Dialog scroll="paper" open={isOpen} maxWidth='lg' slotProps={{paper:{sx:{minWidth: {xs: '90vw', sm: '400px'}}}}}>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <DialogTitle fontWeight={"bold"} color="text.primary">Filter</DialogTitle>
                    <IconButton size="small" aria-label="Close dialog" tabIndex={-1} onClick={() => setIsOpen(false)}><Close/></IconButton>
                </Stack>
                <DialogContent>
                    <form id="bookingFilterForm" onSubmit={(e) => {e.preventDefault();}} onReset={(e) => {
                        e.preventDefault();
                        setForm({tour: '', city: '', dateRange: [], paymentStatus: '', amountRange: [0,0]})
                    }} noValidate>
                        <InputLabel>Tour</InputLabel>
                        <TextField size="small" placeholder="Tour name" fullWidth value={form.tour} onChange={(e) => {
                            setForm(pre => ({...pre, tour: (e.target as HTMLInputElement).value}));
                        }} />
                        <InputLabel sx={{mt: 2}}>Date Range</InputLabel>
                        <Stack direction={'row'} spacing={2}>
                            <Box flex={1}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={form.dateRange[0] ? dayjs(form.dateRange[0]) : null}
                                        onChange={(date) => {
                                            const preDateRange = form.dateRange;
                                            preDateRange[0] = date?.toISOString() || "";
                                            setForm(pre => ({...pre, dateRange: preDateRange}))
                                        }}
                                        slotProps={{
                                            textField: {
                                                placeholder: 'Enter date',
                                                size: 'small',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Box flex={1}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={form.dateRange[1] ? dayjs(form.dateRange[1]) : null}
                                        onChange={(date) => {
                                            const preDateRange = form.dateRange;
                                            preDateRange[1] = date?.toISOString() || "";
                                            setForm(pre => ({...pre, dateRange: preDateRange}))
                                        }}
                                        slotProps={{
                                            textField: {
                                                placeholder: 'Enter date',
                                                size: 'small',
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Stack>
                        <Stack direction={'row'} spacing={2} mt={2}>
                            <Box flex={1}>
                                <InputLabel>City</InputLabel>
                                <Select size="small" value={form.city} displayEmpty fullWidth onChange={(e) => {
                                    setForm(pre => ({...pre, city: e.target.value}))
                                }}>
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="adsf">Mohan</MenuItem>
                                    <MenuItem value="adsf">Mohan</MenuItem>
                                    <MenuItem value="adsf">Mohan</MenuItem>
                                </Select>
                            </Box>
                            <Box flex={1}>
                                <InputLabel>Payment status</InputLabel>
                                <Select size="small" value={form.paymentStatus} displayEmpty fullWidth onChange={(e) => {
                                    setForm(pre => ({...pre, paymentStatus: e.target.value}))
                                }}>
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="paid">Paid</MenuItem>
                                    <MenuItem value="unpaid">Unpaid</MenuItem>
                                </Select>
                            </Box>
                        </Stack>
                        <Typography mt={2} mb={1}>Amount Range</Typography>
                        <Box px={1}>
                            <Slider component={"p"} min={0} value={form.amountRange} max={99999} aria-label="Amount Range" step={100} valueLabelDisplay="auto" onChange={handleChange} />
                        </Box>
                        <Typography variant="caption">Min: {form.amountRange[0]} Max: {form.amountRange[1]}</Typography>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" type="reset" form="bookingFilterForm">Reset</Button>
                    <Button variant="contained" type="submit" form="bookingFilterForm" onClick={() => console.log(form)}>Apply</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}