'use client';

import { Card, CardContent, CardMedia, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FaEllipsisH } from 'react-icons/fa';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { AppMenu } from './AppMenu';

export interface TourItem {
    title: string;
    image: string;
    subtitle: string;
    address: string;
    price: number;
    duration: string;
    isDrafted: boolean;
    uniqueId: string
}

export default function TourCard({ item, component }:  {item: TourItem, component: React.ElementType}) {

  return (
    <Card component={component} variant='outlined'
      sx={{ backgroundColor: "Background",
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 1rem #00000014',
        userSelect: 'none',
        // cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        // '&:hover': {
        //   transform: 'scale(1.02)',
        // },
      }}
    >
      <CardMedia component="img" height="120" sx={{maxWidth: '100%'}} image={item.image || '/images/default_img.jpg'} alt={item.title}/>

      <Chip label={item.isDrafted ? "Draft" : "Published"} color={item.isDrafted ? "secondary" : "success"} size="small" sx={{ position: 'absolute', top: 8, left: 8, fontSize: 11 }}/>

      <TourToggleMenu keyId={item.uniqueId ?? "tour_menu"}/>
      {/* <IconButton aria-label='Toggle Menu' size='small' color='secondary' sx={{ position: 'absolute', top: 8, right: 8 }}><FaEllipsisH/></IconButton> */}

      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" textOverflow={"ellipsis"} overflow={"hidden"}>{item.title}</Typography>
        <Typography variant="body2" color="text.primary" textOverflow={"ellipsis"} overflow={"hidden"}>{item.subtitle}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ fontSize: 18 }} color="action" />
            {item.address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarMonthIcon sx={{ fontSize: 18 }} color="action" />
            {item.duration || '2 days - 3 nights'}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, borderTop: '1px solid #eee', pt: 1 }}>
          From{' '}
          <Typography component="span" fontWeight="bold" color="primary">
            ₹{item.price || '7499'}
          </Typography>
          /person
        </Typography>
      </CardContent>
      <s></s>
    </Card>
  );
}

export function TourToggleMenu({keyId}: {keyId: string}) {
    const router = useRouter();
  return(
    <AppMenu trigger={
      <Tooltip title="Toggle Menu">
        <IconButton size="small" sx={{ position: 'absolute', top: 8, right: 8 }}><FaEllipsisH/></IconButton>
      </Tooltip>
    }
    menuId={`${keyId}_tour-menu`}
    options={[
      {label: "View", onClick() {router.push(`/tours/${keyId}`);}, icon: <Visibility fontSize='small' />},
      {label: "Edit", onClick() {}, icon: <Edit fontSize='small' />},
      {label: "Delete", onClick() {}, icon: <Delete fontSize='small' color='error' />, props: {color: 'red'}}
    ]} 
    ></AppMenu>
  );
}
