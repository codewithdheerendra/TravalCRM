import { TourFormType } from "@/lib/TourFormSchema";
import {
  Box,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Divider,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { SectionHeading } from "./departureForm";
import { BiPlus, BiTrash } from "react-icons/bi";
import React, { useEffect } from "react";
import { QuilEditor } from "@/components/QuilEditor";

export const StepAdditionalInfo = () => {
  const { control, resetField, formState: { errors } } = useFormContext<TourFormType>();
  const fitCustom = useWatch({ control, name: "fitCustom" });

  useEffect(() => {
    if (!fitCustom) {
      resetField("noOfPersons", { defaultValue: 0 });
      resetField("noOfRooms", { defaultValue: 0 });
      resetField("mealsPlan", { defaultValue: "" });
      resetField("vehiclePreference", { defaultValue: "" });
    }
  }, [fitCustom, resetField]);

  return (
    <>
        <TravelCostsFormArray/>
        <FormControlLabel
            control={
            <Controller name="fitCustom" control={control}
                render={({ field }) => (
                <Switch {...field} color="info" checked={field.value} />
                )}
            />
            }
            label="FIT (Customise the tour according to yourself)"
        />
        {fitCustom && 
        <Grid container spacing={2}>
            <Grid size={{xs: 6, sm: 4, md: 2}}>
                <InputLabel>No. of Person</InputLabel>
                <Controller name="noOfPersons" control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth
                    {...field}
                    error={!!errors.noOfPersons}
                    helperText={errors.noOfPersons?.message}
                    />
                )}
                />
            </Grid>

            <Grid size={{xs: 6, sm: 4, md: 2}}>
                <InputLabel>No. of Rooms</InputLabel>
                <Controller name="noOfRooms" control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth
                    {...field}
                    error={!!errors.noOfRooms}
                    helperText={errors.noOfRooms?.message}
                    />
                )}
                />
            </Grid>

            <Grid size={{xs: 12, sm: 4, md: 3}}>
                <InputLabel>Meals Plan</InputLabel>
                <Controller name="mealsPlan" control={control}
                render={({ field }) => (
                    <Select {...field} value={field?.value ?? ""} size="small" fullWidth displayEmpty error={!!errors.mealsPlan}>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Veg">Veg</MenuItem>
                        <MenuItem value="Non Veg">Non Veg</MenuItem>
                    </Select>
                )}
                />
            </Grid>

            <Grid size={{xs: 12, sm: 6, md: 3}}>
                <InputLabel>Vehicle Preference</InputLabel>
                <Controller name="vehiclePreference" control={control}
                render={({ field }) => (
                    <Select {...field} value={field?.value ?? ""} size="small" fullWidth displayEmpty error={!!errors.vehiclePreference}>
                        <MenuItem value="">Select</MenuItem>
                        <MenuItem value="Veg">Veg</MenuItem>
                        <MenuItem value="Non Veg">Non Veg</MenuItem>
                    </Select>
                )}
                />
            </Grid>
        </Grid>
        }

        <Box mt={4}>
            <SectionHeading title="Additional" />
            <Grid container spacing={2}>
            <Grid size={{xs: 12, sm: 3}}>
                <InputLabel>No. of Slots</InputLabel>
                <Controller name="slots" control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth {...field}
                    error={!!errors.slots}
                    helperText={errors.slots?.message}
                    />
                )}
                />
            </Grid>

            <Grid size={{xs: 12, sm: 3}}>
                <InputLabel>Discount (%)</InputLabel>
                <Controller
                name="discount"
                control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth {...field}
                    error={!!errors.discount}
                    helperText={errors.discount?.message}
                    />
                )}
                />
            </Grid>

            <Grid size={{xs: 12, sm: 3}}>
                <InputLabel>Child Cost</InputLabel>
                <Controller name="childCost" control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth {...field}
                    error={!!errors.childCost}
                    helperText={errors.childCost?.message}
                    />
                )}
                />
            </Grid>

            <Grid size={{xs: 12, sm: 3}}>
                <InputLabel>Partial Payment</InputLabel>
                <Controller name="partialPayment" control={control}
                render={({ field }) => (
                    <TextField placeholder="00" size="small" type="number" inputMode="numeric"
                    fullWidth {...field}
                    error={!!errors.partialPayment}
                    helperText={errors.partialPayment?.message}
                    />
                )}
                />
            </Grid>
            </Grid>
        </Box>

      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid size={{xs: 12}}>
            <QuilEditor control={control} placeholder="Describe here" label="Things to Carry" name="thingsToCarry" />
          </Grid>

          <Grid size={{xs: 12}}>
            <QuilEditor control={control} placeholder="Describe here" label="Inclusions & Exclusions" name="inclusionsExclusions" />
          </Grid>

          <Grid size={{xs: 12}}>
            <QuilEditor control={control} placeholder="Describe here" label="Cancellation Policy" name="cancellationPolicy" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};


export function TravelCostsFormArray() {
  const { control, getValues } = useFormContext<TourFormType>();

  const { fields, append, remove } = useFieldArray<TourFormType, "travelCosts">({
    control,
    name: 'travelCosts',
  });

  const handleAddDay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({
      city: '',
      packageCost: 0,
      travelType: "Bus"
    });
  };

  return (
    <>
        <SectionHeading title="Package Cost" />

        {fields.map((item, index) => (
            <Grid container key={item.id} spacing={2} mb={2} alignItems="flex-start">
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <InputLabel>City</InputLabel>
                    <Controller name={`travelCosts.${index}.city`} control={control}
                        render={({field, fieldState}) => (
                            <Select {...field} size="small" value={field.value ?? ""} fullWidth displayEmpty error={!!fieldState?.error?.message}>
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="China">China</MenuItem>
                                <MenuItem value="UK">UK</MenuItem>
                            </Select>
                        )}
                    ></Controller>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <InputLabel>Travel Accommodation Type</InputLabel>
                    <Controller name={`travelCosts.${index}.travelType`} control={control}
                        render={({field, fieldState}) => (
                            <Select {...field} size="small" fullWidth displayEmpty error={!!fieldState?.error?.message}>
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Bus">Bus</MenuItem>
                                <MenuItem value="Cycle">Cycle</MenuItem>
                                <MenuItem value="Train">Train</MenuItem>
                                <MenuItem value="Aeroplane">Aeroplane</MenuItem>
                                <MenuItem value="Yatch">Yatch</MenuItem>
                            </Select>
                        )}
                    ></Controller>
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 4}} display={'flex'}>
                    <Box flexGrow={1}>
                        <InputLabel>Price Per Person</InputLabel>
                        <Controller
                        name={`travelCosts.${index}.packageCost`}
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                            {...field}
                            type="number"
                            size="small"
                            fullWidth
                            placeholder="00"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            onChange={(e) => {
                                field.onChange(e);
                                console.log("Form values:", getValues());
                            }}
                            />
                        )}
                        />
                    </Box>
                    {fields.length > 1 && 
                        <IconButton color="error" aria-label="Delete Item" sx={{alignSelf: 'flex-start', mt: 3, ml: 2}} onClick={() => remove(index)}><BiTrash/></IconButton>
                    }
                    {index === fields.length - 1 ?
                        <IconButton color="primary" aria-label="Add new" sx={{alignSelf: 'flex-start', mt: 3}} onClick={(e) => handleAddDay(e)}><BiPlus/></IconButton>
                        : <Divider sx={{mt:2}}/>
                    }
                </Grid>
            </Grid>
        ))}
    </>
  );
};