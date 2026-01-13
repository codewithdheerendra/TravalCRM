"use client";
import { QuilEditor } from "@/components/QuilEditor";
import { richTextRequired } from "@/lib/constants";
import { TextField, Grid, InputAdornment, Button, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

export default function StepBasicDetails() {
  const { register, setValue, watch, control, formState: {errors} } = useFormContext();
  const coverImage = watch("coverImage") || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      console.log("Uploaded new files:", newFiles);
      setValue("coverImage", newFiles, { shouldValidate: true });
    }
  };

  const uploadAdorment = (
    <InputAdornment position="end">
      <Button variant="contained" component="label" color="info" size="small">
        Upload Image
        <input type="file" hidden multiple accept="image/*" onChange={handleImageUpload} />
      </Button>
    </InputAdornment>
  );

  return (
    <Grid container spacing={2} flexGrow={1}>
        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Tour Name</InputLabel>
            <TextField {...register("tourName")} placeholder="Enter tour name" size="small" fullWidth error={!!errors.tourName} helperText={errors?.tourName?.message as string ?? ""}/>
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Duration</InputLabel>
            <Controller name="duration" control={control} defaultValue=""
                rules={{ required: {value: true, message: "Duration is required"} }}
                render={({ field }) => (
                    <Select {...field} size="small" fullWidth displayEmpty error={!!errors.duration}>
                        <MenuItem value="" disabled>Select</MenuItem>
                        <MenuItem value="1 Day">1 Day</MenuItem>
                        <MenuItem value="2 Days">2 Days</MenuItem>
                        <MenuItem value="1 Week">1 Week</MenuItem>
                    </Select>
                )}
            />
            {errors.duration && ( <FormHelperText sx={{px: 2}} error>{errors.duration?.message as string ?? ""}</FormHelperText>)}
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Altitude</InputLabel>
            <TextField placeholder="Enter Altitude" id="attitudeCtrl" size="small" fullWidth error={!!errors.altitude} helperText={errors.altitude?.message as string ?? ""} {...register("altitude")}/>
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Starting Price</InputLabel>
            <TextField inputMode="numeric" type="number" placeholder="0.0" size="small" fullWidth error={!!errors.startingPrice} helperText={errors.startingPrice?.message as string ?? ""} {...register("startingPrice", { valueAsNumber: true })}/>
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Destinations Covered</InputLabel>
            <TextField type="text" placeholder="e.g., 'with Chopta - Haridwar - Rishikesh'" size="small" fullWidth error={!!errors.destinations} helperText={errors.destinations?.message as string ?? ""} {...register("destinations")}/>
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel component={'label'}>Difficulty Level</InputLabel>
            <Controller name="difficultyLevel" control={control} defaultValue=""
            rules={{ required: {value: true, message: "Difficulty is required"} }}
            render={({ field }) => (
                <Select {...field} size="small" fullWidth displayEmpty error={!!errors.difficultyLevel}>
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Moderate">Moderate</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </Select>
            )}
            />
            {errors.difficultyLevel && ( <FormHelperText sx={{px: 2}} error>{errors.difficultyLevel?.message as string ?? ""}</FormHelperText>)}
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Best Season</InputLabel>
            <Controller name="bestSeason" control={control} defaultValue=""
            rules={{ required: {value: true, message: "Best Season is required"} }}
            render={({ field }) => (
                <Select {...field} size="small" fullWidth displayEmpty error={!!errors.bestSeason}>
                    <MenuItem value="" disabled>Select</MenuItem>
                    <MenuItem value="Summer">Summer</MenuItem>
                    <MenuItem value="Winter">Winter</MenuItem>
                    <MenuItem value="All Year">All Year</MenuItem>
                </Select>
            )}
            />
            {errors.bestSeason && (<FormHelperText sx={{px: 2}} error>{errors.bestSeason?.message as string ?? ""}</FormHelperText>)}
        </Grid>

        <Grid size={{lg: 3, md: 4, sm: 6, xs: 12}}>
            <InputLabel>Region</InputLabel>
            <TextField type="text" placeholder="Enter Region" size="small" fullWidth error={!!errors.region} helperText={errors.region?.message as string ?? ""} {...register("region")}/>
        </Grid>

        <Grid size={{xs: 12}}>
            <QuilEditor control={control} label="Tour Description" name="description" rules={{required: {value: true,message: "Description is required"}, validate: richTextRequired("Description is required"),}} />
        </Grid>

        <Grid size={{xs: 12}}>
            <InputLabel>Cover Images</InputLabel>
            <TextField size="small" placeholder="No File Chosen" value={""} slotProps={{ input: { readOnly: true, endAdornment: uploadAdorment } }} />
            {coverImage.length > 0 && 
                <Button variant="contained" size="small" sx={{mt:1, ml: 2}} color="error" onClick={(e) => {
                    e.preventDefault();
                    setValue("coverImage", [], { shouldValidate: true });
                }}>Remove All Images</Button>
            }
        </Grid>
    </Grid>
  );
}
