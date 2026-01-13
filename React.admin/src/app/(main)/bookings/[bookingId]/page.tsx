'use client';

import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AppFieldset } from '@/components/ui/UITemplate';


export default function BookingDetail() {
  const params = useParams();
  const bookingId = params?.bookingId;
  const [bookingDetail] = useState<any>({});

  useEffect(() => {
    if(bookingId && !bookingDetail) {
      // fetch(`/api/booking/${tourId}`)
      //   .then(res => res.json())
      //   .then(data => {
      //     setBookingDetail(data);
      //   })
      //   .catch(err => {
      //     console.error('Error fetching booking details:', err);
      //   });
    }
  },[bookingId, bookingDetail]);


  return (
    <Box sx={{ p: 2 }}>
      <Typography className='sr-only' variant="subtitle1" fontWeight="bold" gutterBottom>Booking Details</Typography>

      <Grid container component={"section"} spacing={2}>
        <Grid size={{xs:12, lg:8}}>
          <AppFieldset title='Booking Details'>
            <Grid container spacing={2}>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Booking ID</Typography>
                <Typography variant='body2'>#20231234</Typography>
              </Grid>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Package Name</Typography>
                <Typography variant='body2'>Badrinath-Kedarnath</Typography>
              </Grid>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Departure City</Typography>
                <Typography variant='body2'>Delhi</Typography>
              </Grid>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Duration</Typography>
                <Typography variant='body2'>6 days - 7 nights</Typography>
              </Grid>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Number of Slots Booked</Typography>
                <Typography variant='body2'>2</Typography>
              </Grid>
              <Grid size={{xs:6, sm:4}}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Start Date - End Date</Typography>
                <Typography variant='body2'>10/01/2025 - 17/01/2025</Typography>
              </Grid>
            </Grid>
          </AppFieldset>
        </Grid>
        <Grid size={{xs:12, lg:4}}>
          <AppFieldset title='Booking Summary'>
            <Table size='small' aria-label='Booking Summary'>
              <TableBody>
                <TableRow>
                  <TableCell sx={{border: 0, pl:0}} color='text.secondary'>Payment Status</TableCell>
                  <TableCell sx={{border: 0}} color="green">Paid</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{border: 0, pl:0}} color='text.secondary'>Payment Method</TableCell>
                  <TableCell sx={{border: 0}}>UPI</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{border: 0, pl:0}} color='text.secondary'>Amount Paid</TableCell>
                  <TableCell sx={{border: 0}}>₹14,998</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{border: 0, pl:0}} color='text.secondary'>Balance Due</TableCell>
                  <TableCell sx={{border: 0}}>₹0</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{border: 0, pl:0}} color='text.secondary'>Total Amount</TableCell>
                  <TableCell sx={{border: 0}}>₹14,998 (₹7,499 x 2)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AppFieldset>
        </Grid>
        <Grid size={12}>
          <AppFieldset title='Traveller Information'>
            <Stack direction={"row"} flexWrap={"wrap"} alignItems={"flex-start"} gap={2}>
              <Box minWidth={"150px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Name</Typography>
                <Typography variant='body2'>Logan AB</Typography>
              </Box>
              <Box minWidth={"150px"} flexBasis={"250px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Email</Typography>
                <Typography variant='body2'>loganrwqre@gmail.com</Typography>
              </Box>
              <Box minWidth={"150px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Phone Number</Typography>
                <Typography variant='body2'>+91 01234567890</Typography>
              </Box>
              <Box minWidth={"150px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Gender</Typography>
                <Typography variant='body2'>M</Typography>
              </Box>
              <Box minWidth={"150px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Birth Date</Typography>
                <Typography variant='body2'>12/12/1990</Typography>
              </Box>
              <Box minWidth={"150px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>Address</Typography>
                <Typography variant='body2' component={"address"}>123, Shiv Nagar, Ahmedabad</Typography>
              </Box>
            </Stack>
          </AppFieldset>
        </Grid>
        <Grid size={{xs:12, md:4, lg:3}}>
          <AppFieldset title='Additional Information'>
            <Stack>
              <Typography variant='caption' color='text.secondary' component={"small"}>Child Cost</Typography>
              <Typography variant='body2'>₹3,499</Typography>
            </Stack>
          </AppFieldset>
        </Grid>
        <Grid size={{xs:12, md:8, lg:9}}>
          <AppFieldset title='Part Payment Details'>
            <Stack direction={"row"} flexWrap={"wrap"} alignItems={"flex-start"} gap={2}>
              <Box flexBasis={"200px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>1st Payment </Typography>
                <Typography variant='body2'>₹5,000 (01/03/2024)</Typography>
              </Box>
              <Box flexBasis={"200px"}>
                <Typography variant='caption' color='text.secondary' component={"small"}>2nd Payment</Typography>
                <Typography variant='body2'>₹2,499 (01/03/2024)</Typography>
              </Box>
            </Stack>
          </AppFieldset>
        </Grid>
      </Grid>
    </Box>
  );
}