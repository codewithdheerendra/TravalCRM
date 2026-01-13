'use client';

import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CardMedia,
  Stack,
  styled,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'next/navigation';
import { CalendarMonth, CalendarToday, Delete, Edit, Height, Place, Speed } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Tour } from '@/lib/TourFormSchema';
import AppTable from '@/components/ui/AppTable';
import { packageCostColumns, packageCostData } from '@/lib/constants';
import { AppFieldset, IconTooltipButton } from '@/components/ui/UITemplate';

const RoutedBorderedIcon = styled(Box)(({ theme }) => ({
  border: '1px solid', 
  borderRadius: '50vw',
  borderColor: theme.palette.divider,
  p: theme.spacing,
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
}));

const GridIconItem = ({caption, detail, icon}: {caption: string, detail: string, icon: React.ElementType}) => {
  return (
    <Grid size={{xs:6, md:4, lg: 2.4, xl:2.4}} display="flex" alignItems="start" gap={1}>
      <RoutedBorderedIcon>
        {icon && React.createElement(icon, { color: 'primary' })}
      </RoutedBorderedIcon>
      <Typography variant='body2'>
        <Typography component="span" color='text.secondary' variant="body2">{caption}</Typography><br/>
        {detail}
      </Typography>
    </Grid>
  );
}

export default function TourDetail() {
  const params = useParams();
  const tourId = params?.tourId;
  const [tourDetail, setTourDetail] = useState<Partial<Tour>>({isDrafted: true});


  // Sample itinerary data
  const itinerary = [
    {
      day: 'Day 1',
      title: 'Journey starts from Ahmedabad',
      date: 'May 8 2024',
      details: [
        'Reporting time: 10:15 AM',
        'Boarding time: 11:00 AM',
        'Location: Kalupur railway station BRTS',
        'More details goes here',
        'More details goes here with bullet points'
      ]
    },
    {
      day: 'Day 2',
      title: 'Morning arrival & Manali Local',
      date: 'May 9 2024',
      details: []
    },
    {
      day: 'Day 3',
      title: 'Manali - Solang/Attal Tunnel/ Sissu Waterfall',
      date: 'May 10 2024',
      details: []
    },
    {
      day: 'Day 4',
      title: 'Bijali Mahadev Trek/Malana Village trek',
      date: 'May 11 2024',
      details: []
    }
  ];

  useEffect(() => {
    if(tourId && !tourDetail) {
      // fetch(`/api/tours/${tourId}`)
      //   .then(res => res.json())
      //   .then(data => {
          setTourDetail({isDrafted: true});
      //   })
      //   .catch(err => {
      //     console.error('Error fetching tour details:', err);
      //   });
    }
  },[tourId, tourDetail]);

  // if(tourDetail == null) {
  //   return <Typography>No data found.</Typography>
  // }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Card variant='outlined' sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, p: 1, gap: 2 }}>
        <CardMedia
          component="img"
          image="/images/default_img.jpg"
          alt="Himalayan Trek"
          sx={{
            width: { xs: '100%', md: 200 },
            maxWidth: '100%',
            height: { xs: 150, md: 140 },
            borderRadius: 1,
          }}
        />

        {/* Main Content */}
        <Stack flex={1}>
          <Stack direction={"row"}>
            <Typography variant="h6" fontWeight="bold">Himalayan Trek</Typography>
            <Stack direction="row" spacing={1} alignItems="start" justifyContent="flex-end" sx={{ mt: { xs: 2, md: 0 }, ml:"auto" }}>
              <IconTooltipButton title="Edit" size='small' color='primary'>
                <Edit fontSize="small" />
              </IconTooltipButton>
              <IconTooltipButton title="Delete" size='small' color='primary'>
                <Delete fontSize="small" />
              </IconTooltipButton>
            </Stack>
          </Stack>
          <Typography variant="body2" color="text.secondary" gutterBottom>Dholavira - Rann utsav - Mandvi</Typography>
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="body2" color="text.secondary" display="flex" gap={1} alignItems="center">
              <Place fontSize="small" color="action" />
              Nepal
            </Typography>
            <Typography variant="body2" color="text.secondary" display="flex" gap={1} alignItems="center">
              <CalendarToday fontSize="small" color="action" />
              2 days - 3 nights
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} justifyContent={"space-between"} alignItems="center" mt={"auto"}>
            <Chip label={tourDetail?.isDrafted ? "Draft" : "Published"} color={tourDetail?.isDrafted ? "error" : "success"} size="small" sx={{px:1}} />
            <Typography variant="body1" fontWeight="bold" pr={1}>
              <Typography component={"span"} variant="body2" color='text.secondary'>From</Typography> ₹7499 <Typography component={"span"} variant="body2" color='text.secondary'>/person</Typography>
            </Typography>
          </Stack>
        </Stack>
      </Card>

      <Grid container spacing={2} mt={3}>
        <GridIconItem caption='Duration' detail={tourDetail?.duration ?? '6 days - 7 nights'} icon={CalendarMonth}></GridIconItem>
        <GridIconItem caption='Difficulty' detail={tourDetail?.difficultyLevel ?? "Easy to Moderate"} icon={Speed}></GridIconItem>
        <GridIconItem caption='Altitude' detail={tourDetail?.altitude ? `${tourDetail?.altitude} ft` : "12,000 ft"} icon={Height}></GridIconItem>
        <GridIconItem caption='Best season' detail={tourDetail?.bestSeason ?? "May to October"} icon={CalendarMonth}></GridIconItem>
        <GridIconItem caption='Region' detail={tourDetail?.region ?? "Uttarakhand, Himalaya"} icon={Place}></GridIconItem>
      </Grid>

      {/* About */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          About
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Explore a soul-stirring journey to the mystical Himalayan marvels of Kedarnath and Tungnath...
        </Typography>
      </Box>

      {/* Departure Details */}
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 4 }} gutterBottom>
        Departure Details
      </Typography>
      <TableContainer component={Paper} variant='outlined' sx={{overflow: "auto"}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>City Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Available Dates</TableCell>
              <TableCell>Price Per Person</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Ahmedabad</TableCell>
              <TableCell>5 days - 6 nights</TableCell>
              <TableCell>8 May 2024 to 16 May 2024</TableCell>
              <TableCell>₹7499</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Delhi</TableCell>
              <TableCell>7 Days</TableCell>
              <TableCell>8 May 2024 to 16 May 2024</TableCell>
              <TableCell>₹18,500</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <AppFieldset sx={{ mt: 4 }} title='Main Attractions'>
        <List dense>
          {[
            'Ganga Aarti at Har ki Pauri Ghat',
            'Shri BhairavNath Temple',
            'Haridwar: Har ki pauri ghat, Ganga Aarti',
            'River confluence at Devprayag and Rudraprayag',
            'Dharidevi Temple',
            'Chopta and Tungnath - Highest Shiva Temple',
            'Chandrashila Summit (4000 metre/13000 feet)',
            'Rishikesh: Rafting , Ramjhula, Laxmanjhula etc.',
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemText sx={{my:0}} primary={`- ${item}`} />
            </ListItem>
          ))}
        </List>
      </AppFieldset>

      {/* Itinerary */}
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 4 }} gutterBottom>Itinerary</Typography>
      {itinerary.map((item, index) => (
        <Accordion className='shadow-none' key={index} sx={{mb:2}} defaultExpanded={index === 0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: 'bold' }}>
              <Typography component="span" color='error' sx={{ fontWeight: 'bold' }}>{item.day}:</Typography> {item.title} &nbsp; ({item.date})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Divider sx={{mb:3}} />
            {item.details.length > 0 ? (
              <ul>
                {item.details.map((detail, i) => (
                  <li key={i}>
                    <Typography variant="body2">{detail}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Details coming soon...
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Things to Carry */}
      <AppFieldset sx={{ mt: 4 }} title='Things To Carry'>
        <Typography variant="subtitle2" sx={{ mt: 1 }}>Basic Essentials</Typography>
        <List dense>
          {[
            'Backpack (Main bag, preferably ruckshak)',
            'Small bagpack (to carry water bottle & personal stuff /20-30 ltr)',
            'Refillable Water bottle',
            'Sports/Trekking shoes (comfortable in long hike/trek)',
            'Socks (extra pair of woolen socks)',
            'Slipper/Sandals',
            'Original ID proof',
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemText sx={{my:0}} primary={`- ${item}`} />
            </ListItem>
          ))}
        </List>
      </AppFieldset>

      {/* Inclusions & Exclusions */}
      <AppFieldset sx={{ mt: 4 }} title='Inclusions & Exclusions'>
        <Grid container spacing={4}>
          <Grid size={{xs:12, md: 6}}>
            <Typography variant="subtitle2" gutterBottom>Includes</Typography>
            <List dense>
              {[
                'Transportation from Hometown (as per package)',
                'Transportation from Ex. Delhi (Tempo Traveller or Similar)',
                'Accommodation 3-4 sharing tents/hotel as per itinerary',
                'Food (Veg meal as per itinerary)',
                'Mountaineering Course Certified Trek Leader',
                '16km Rafting in Rishikesh',
                'Forest Permit, Local support, First Aid',
              ].map((item, i) => (
                <ListItem key={i}>
                  <ListItemText sx={{my:0}} primary={`- ${item}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid size={{xs:12, md: 6}}>
            <Typography variant="subtitle2" gutterBottom>Excludes</Typography>
            <List dense>
              {[
                '5% GST',
                'Any personal expenses not mentioned above',
                'Porter or mule charges for personal need',
                'Rented gears and equipment',
              ].map((item, i) => (
                <ListItem key={i}>
                  <ListItemText sx={{my:0}} primary={`- ${item}`} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </AppFieldset>

      {/* Package Cost Details */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Package Cost Details</Typography>
        <AppTable columns={packageCostColumns} data={packageCostData}
          renderRow={(item, index) => (
            <TableRow key={index}>
              <TableCell>{item.srNo}</TableCell>
              <TableCell>{item.availableFrom}</TableCell>
              <TableCell>{item.travelAccommodationType}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.pricePerPerson}</TableCell>
            </TableRow>
          )}
        />
      </Box>

      {/* Cancelation and booking policies */}
      <AppFieldset sx={{ mt: 4 }} title='Cancellation Policy'>
        <Typography variant="subtitle2" gutterBottom>Booking Policy:</Typography>
        <List dense>
          {[
            'Booking shall only getconfirmed once received part/full payments',
            '30% advance amount while confirmation',
            '70% balance amount minimum 14 days prior to trip date',
          ].map((item, i) => (
            <ListItem key={i}>
              <ListItemText sx={{my:0}} primary={`${item}`} />
            </ListItem>
          ))}
        </List><br/><br/>
        <Typography variant="subtitle2" gutterBottom>Cancellation Policy:</Typography>
        <List dense>
          {[
            '100% refund 28days prior to trip date exclusive of GST',
            '30% cancellation charges if cancellation done between 28 to 14 days prior or Full amount can be transferred to any of our upcoming event in next 2 month, but cannot be transferredto another participant',
            '70% cancellation charges if cancellation done between 14 to 7 days prior or 50% amount can be transferred to any of our upcoming event in next 2 month, but cannot be transferredto another participant',
            'Fees are neither refundable nor transferable if cancellation done, less than 7 days prior to event date',
          ].map((item, i) => (
            <ListItem key={i}>
              <ListItemText sx={{my:0}} primary={`${item}`} />
            </ListItem>
          ))}
        </List>
      </AppFieldset>
    </Box>
  );
}


{/* <Card>
  <Grid container spacing={2}>
    <Grid size={{xs:12, md: 4}}>
      <Box
        component="img"
        src="/images/default_img.jpg"
        alt="Himalayan Trek"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Grid>
    <Grid size={{xs:12, md: 8}}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Himalayan Trek
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Dholavira - Rann Utsav - Mandvi
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip icon={<LocationOnIcon />} label="Nepal" />
          <Chip icon={<EventIcon />} label="2 days - 3 nights" />
          <Chip icon={<TrendingUpIcon />} label="Easy to Moderate" />
          <Chip icon={<TerrainIcon />} label="12,000 ft" />
          <Chip icon={<CalendarMonthIcon />} label="May to October" />
          <Chip label="From ₹7499/person" color="success" />
        </Box>
      </CardContent>
    </Grid>
  </Grid>
</Card> */}