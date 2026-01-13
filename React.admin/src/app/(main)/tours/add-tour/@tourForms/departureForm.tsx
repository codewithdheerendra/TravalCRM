"use client";

import { Controller, FieldErrorsImpl, useFieldArray, useFormContext } from "react-hook-form";
import { Box, Divider, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { BiPlus, BiTrash } from "react-icons/bi";
import { TourFormType } from "@/lib/TourFormSchema";
import { useTourForm } from "./tourForm";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from "react";

export default function StepDepartureDetails() {
  const { register, control, formState: {errors} } = useFormContext();
  const { form, departureCitiesArray } = useTourForm();
  const departureCitiesErrors = errors.departureCities as | FieldErrorsImpl<TourFormType["departureCities"]> | undefined;

  const removeDepartureCity = (index: number) => {
    const path = `departureCities.${index}` as const;
    form.unregister(path);
    departureCitiesArray.remove(index);
    const currentErrors = form.formState.errors.departureCities ?? [];
    if (Array.isArray(currentErrors)) {
      currentErrors.splice(index, 1);
    }
  };

  return (
    <>
      <SectionHeading title="Departure Cities"/>
      {
        departureCitiesArray.fields.map((item, index) => (
          <Grid container spacing={2} key={`departure_${index}`} mb={2}>
            <Grid size={{lg: 3, md: 4, sm: 6, xs: 6}}>
              <InputLabel>City</InputLabel>
              <Controller name={`departureCities.${index}.city`} control={control} render={({ field }) => (
                  <Select {...field} value={field?.value ?? ""} fullWidth size="small" displayEmpty error={!!departureCitiesErrors?.[index]?.city}>
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="New York">New York</MenuItem>
                    <MenuItem value="Paris">Paris</MenuItem>
                  </Select>
                )} />
                <FormHelperText sx={{px: 2}} error>{departureCitiesErrors?.[index]?.city?.message as string ?? ""}</FormHelperText>
            </Grid>

            <Grid size={{lg: 3, md: 4, sm: 6, xs: 6}}>
              <InputLabel>Duration</InputLabel>
              <Controller name={`departureCities.${index}.duration`} control={control}
                render={({ field }) => (
                  <Select {...field} value={field?.value ?? ""} size="small" fullWidth displayEmpty error={!!departureCitiesErrors?.[index]?.duration}>
                    <MenuItem value="">Select</MenuItem>
                    <MenuItem value="1 Day">1 Day</MenuItem>
                    <MenuItem value="2 Days">2 Days</MenuItem>
                    <MenuItem value="3 Days">3 Days</MenuItem>
                    <MenuItem value="7 Days">7 Days</MenuItem>
                  </Select>
                )}
              />
              <FormHelperText sx={{px: 2}} error>{departureCitiesErrors?.[index]?.duration?.message as string ?? ""}</FormHelperText>
            </Grid>

            <Grid size={{lg: 3, md: 4, sm: 6, xs: 6}}>
              <InputLabel>Price Per Person</InputLabel>
              <Controller name={`departureCities.${index}.pricePerPerson`} control={control}
                render={({ field }) => (
                  <TextField {...field} size="small" fullWidth type="number" inputMode="numeric" value={field?.value ?? 0} error={!!departureCitiesErrors?.[index]?.pricePerPerson} {...register(`departureCities.${index}.pricePerPerson`, { valueAsNumber: true })} helperText={departureCitiesErrors?.[index]?.pricePerPerson?.message as string ?? ""} />
                )}
              />
            </Grid>
            <Grid display={'flex'} alignItems={'flex-end'} size={{lg: 3, md: 4, sm: 6, xs: 6}} sx={{ pb: 1}}>
              {index === departureCitiesArray.fields.length - 1 && (
                <Box component={'span'} sx={{border: '1px solid', borderColor: 'primary', borderRadius: '10px', mr: 2}}>
                  <IconButton color="primary" onClick={() => departureCitiesArray.append({ city: "", duration: "", pricePerPerson: 0 })} size="small">
                  <BiPlus size={22} />
                </IconButton>
                </Box>
              )}
              {departureCitiesArray.fields.length > 1 && (
                <Box component={'span'} sx={{border: '1px solid', borderColor: 'red', borderRadius: '10px', mr: 2}}>
                  <IconButton color="error" onClick={() => removeDepartureCity(index)} size="small">
                    <BiTrash size={22}/>
                  </IconButton>
                </Box>
              )}
            </Grid>
          </Grid>
        ))
      }

      <Box mt={3}>
        <SectionHeading title="Available Dates"/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AvailableDatesField/>
        </LocalizationProvider>
      </Box>
    </>
  );
}

export function SectionHeading({ title }: { title: string }) {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <Typography variant="h6" fontWeight={600} sx={{ whiteSpace: "nowrap", mr: 2 }}>{title}</Typography>
      <Divider sx={{ flexGrow: 1 }} />
    </Box>
  );
}


export const AvailableDatesField = () => {
  const { control, formState: {errors} } = useFormContext<TourFormType>();
  const { fields, append, remove } = useFieldArray<TourFormType, "availableDates", "id">({
    control,
    name: "availableDates",
  });

  useEffect(() => {
    if (fields.length < 1) {
      append({value: ''});
    }
  })

  return (
    <>
      <Grid container spacing={2}>
        {fields.map((field, index) => {
          return (
            <Grid size={{lg: 3, md: 4, sm: 6, xs: 6}} key={field.id} display={"flex"} alignItems="flex-start">
              <Controller
                control={control}
                name={`availableDates.${index}.value`}
                render={({ field, fieldState }) => (
                  <DatePicker
                    {...field}
                    disablePast
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      field.onChange(date?.toISOString() || "");
                    }}
                    slotProps={{
                      textField: {
                        placeholder: 'Enter date',
                        size: 'small',
                        error: !!fieldState?.error,
                        helperText: fieldState?.error?.message,
                      },
                    }}
                  />
                )}
              />
              {fields.length > 1 &&
                (<IconButton aria-label="Delete date" sx={{ml:1}} onClick={() => remove(index)} color="error">
                  <BiTrash />
                </IconButton>)
              }
              {index === fields.length - 1 && 
                (<IconButton aria-label="Add date" onClick={() => append({value: ""})} color="primary">
                  <BiPlus />
                </IconButton>)
              }
            </Grid>
          )
        })}
      </Grid>
      {typeof errors.availableDates?.message === "string" && (
        <FormHelperText error sx={{ mt: 1, px: 2  }}>
          {errors.availableDates.message}
        </FormHelperText>
      )}
    </>
  );
};