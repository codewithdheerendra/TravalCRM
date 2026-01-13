"use client";

import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Button, Box, Typography } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { useTourForm } from "./@tourForms/tourForm";
import { TourFormType } from "@/lib/TourFormSchema";
import StepBasicDetails from "./@tourForms/basicTourForm";
import StepDepartureDetails from "./@tourForms/departureForm";
import { StepAttractionsItinerary } from "./@tourForms/attractionForm";
import { StepAdditionalInfo } from "./@tourForms/additionalInfoForm";
import { BiChevronRight } from "react-icons/bi";

const steps = [
  "Basic Details",
  "Departure Details",
  "Main Attractions & Itinerary",
  "Additional Information",
];

const stepFields: Record<number, (keyof TourFormType)[]> = {
  0: ["tourName", "duration", "altitude", "startingPrice", "destinations", "difficultyLevel", "bestSeason", "region", "tourDescription"],
  1: ["availableDates", "departureCities"],
  2: ["travelCosts", "fitCustom", "noOfPersons", "noOfRooms", "mealsPlan", "vehiclePreference", "slots", "discount", "childCost", "partialPayment", "thingsToCarry", "inclusionsExclusions", "cancellationPolicy"],
};

export default function TourFormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const {form, formState} = useTourForm();
  // const [isCurrentStepValid, setIsCurrentStepValid] = useState(false);

  const onSubmit = (data: TourFormType) => {
    console.log("Final Submit ✅", data);
    // here you can call API for Create/Update
  };

  const handleNext = async () => {
    const isValid = await form.trigger(stepFields[activeStep]);
    const value = await form.getValues();
    console.log(isValid, value);
    if (!isValid) return;
    if (activeStep === steps.length - 1) {
      form.handleSubmit(onSubmit)();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  useEffect(() => {
    // const validateStep = async () => {
    //   const valid = await form.trigger(stepFields[activeStep]);
    //   setIsCurrentStepValid(valid);
    // };

    // validateStep();

    // const subscription = form.watch(() => {
    //   validateStep();
    // });

    // return () => subscription.unsubscribe();
  }, [activeStep]);


  return (
    <FormProvider {...form}>
      <Box display="flex" justifyContent='flex-start' flexDirection="column" flexGrow={1} px={2}>
        <Typography variant="body2" fontSize={'small'} display={"flex"} alignItems={"center"} gap={1} gutterBottom>Tour <BiChevronRight/> Add Tour</Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ my: 4 }} flexGrow={1}>
          {activeStep === 0 && <StepBasicDetails />}
          {activeStep === 1 && <StepDepartureDetails />}
          {activeStep === 2 && <StepAttractionsItinerary />}
          {activeStep === 3 && <StepAdditionalInfo />}
        </Box>

        <Box sx={{ mt: 4, pb: 2, gap: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" color="primary" sx={{flex: '0 0 100px'}} disabled={activeStep === 0} onClick={handleBack}>Cancel</Button>
          <Button variant="contained" sx={{flex: '0 0 100px'}} onClick={handleNext} disabled={ formState.isSubmitting}>
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
}
