'use client';

import React, { useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  TextField,
  IconButton,
  Button,
  InputLabel,
  Stack,
  Divider,
} from '@mui/material';
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import { TourFormType } from '@/lib/TourFormSchema';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { SectionHeading } from './departureForm';
import { BiPlus, BiTrash } from 'react-icons/bi';

export function StepAttractionsItinerary() {
  return (
    <>
      <AttractionForm/><br/><br/>
      <ItineraryForm/>
    </>
  )
}

export function AttractionForm() {
  const { control } = useFormContext<TourFormType>();
  const { fields, append, remove } = useFieldArray<TourFormType, "attractions", "id">({
    control,
    name: "attractions",
  });
  const hasAttraction = useRef(false);

  useEffect(()=> {
    if (!hasAttraction.current && fields.length < 1) {
      append({value: ""});
      hasAttraction.current = true;
    }
  }, []);

  return (
    <>
      <SectionHeading title="Main Attractions" />
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Box key={field.id}>
            <InputLabel>Attraction {index + 1}</InputLabel>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Stack flexGrow={1}>
                <Controller control={control} name={`attractions.${index}.value`}
                  render={({ field, fieldState }) => (
                    <TextField placeholder="Describe your place" size="small"
                      fullWidth {...field} error={!!fieldState.error} helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Stack>
              {fields.length > 1 && (
                <IconButton aria-label="Delete attraction" onClick={() => {remove(index)}} color="error">
                  <BiTrash />
                </IconButton>
              )}
              {index === fields.length - 1 && (
                <IconButton aria-label="Add attraction" onClick={() => {append({value: ""})}} color="primary">
                  <BiPlus />
                </IconButton>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export function ItineraryForm() {
  const { control, register } = useFormContext<TourFormType>();

  const { fields, append, remove } = useFieldArray<TourFormType, "itinerary">({
    control,
    name: 'itinerary',
  });

  const handleAddDay = () => {
    append({
      day: fields.length + 1,
      title: '',
      description: '',
      reportingTime: '',
      reportingDate: '',
    });
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && fields.length < 1) {
      handleAddDay();
      hasInitialized.current = true;
    }
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <>
        <SectionHeading title="Day-wise Itinerary"/>

        {fields.map((item, index) => (
          <Grid container key={item.id} spacing={2} mb={2} alignItems="center">
            <Grid size={{md:2, xs:12}}>
              <InputLabel>Day</InputLabel>
              <Controller control={control} name={`itinerary.${index}.day`}
              render={({field, fieldState}) => (
                <TextField {...field} placeholder="Day" type="number" slotProps={{input: {required: true}}} inputMode='numeric' size='small' value={field.value ?? 1} fullWidth error={!!fieldState.error?.message} helperText={!!fieldState.error?.message} />
              )}
              ></Controller>
            </Grid>

            <Grid size={{lg:6, md:10, xs:12}}>
              <InputLabel>Title/Activity</InputLabel>
              <Controller control={control} name={`itinerary.${index}.title`}
              render={({field, fieldState}) => (
                <TextField {...field} type='text' placeholder='Describe your place' size='small' error={!!fieldState.error} fullWidth/>
              )}/>
            </Grid>

            <Grid size={{lg:2, sm:6, xs:12}}>
              <InputLabel>Reporting Time</InputLabel>
              <Controller control={control} name={`itinerary.${index}.reportingTime`}
                render={({ field, fieldState }) => (
                  <TimePicker
                    value={field.value ? dayjs(field.value, 'HH:mm') : null}
                    onChange={(time) =>
                      field.onChange(time ? dayjs(time).format('HH:mm') : '')
                    }
                    slotProps={{
                      textField: {
                        size: 'small', 
                        fullWidth: true, 
                        placeholder: '00:00',
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={{lg:2, sm:6, xs:12}}>
              <InputLabel>Reporting Date</InputLabel>
              <Controller
                control={control}
                name={`itinerary.${index}.reportingDate`}
                render={({ field, fieldState }) => (
                  <DatePicker
                    disablePast
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date?.toISOString() || '')}
                    slotProps={{
                      textField: {
                        size: 'small',
                        fullWidth: true,
                        error: !!fieldState.error,
                        helperText: fieldState.error?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            <Grid size={12}>
              <InputLabel>Description</InputLabel>
              <TextField placeholder="Enter Activity Name" size='small' multiline rows={3} {...register(`itinerary.${index}.description`)} fullWidth />
            </Grid>
            <Grid size={12}>
              {fields.length > 1 && 
                <Button variant='outlined' color="error" startIcon={<DeleteIcon />} sx={{mr: 2}} onClick={() => remove(index)}>Remove Day</Button>
              }
              {index === fields.length - 1 ?
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddDay}>Add Another Day</Button>
                : <Divider sx={{mt:2}}/>
              }
            </Grid>
          </Grid>
        ))}
      </>
    </LocalizationProvider>
  );
};
