import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tourFormSchema, TourFormType } from "@/lib/TourFormSchema";

export const useTourForm = (defaultValues?: Partial<TourFormType>) => {
  const form = useForm<TourFormType>({
    resolver: zodResolver(tourFormSchema),
    mode: "all",
    defaultValues: {
      tourName: defaultValues?.tourName ?? "",
      duration: defaultValues?.duration ?? "",
      altitude: defaultValues?.altitude ?? "",
      startingPrice: defaultValues?.startingPrice ?? 0,
      destinations: defaultValues?.destinations ?? "",
      difficultyLevel: defaultValues?.difficultyLevel ?? "",
      bestSeason: defaultValues?.bestSeason ?? "",
      region: defaultValues?.region ?? "",
      tourDescription: defaultValues?.tourDescription ?? "",
      coverImage: defaultValues?.coverImage ?? [],

      departureCities: defaultValues?.departureCities ?? [
        {
          city: '',
          duration: "",
          pricePerPerson: 0,
        }
      ],
      availableDates: defaultValues?.availableDates?.map((a) => typeof a === "string" ? { value: a } : a ) ?? [{ value: "" }],

      attractions: defaultValues?.attractions?.map((a) => typeof a === "string" ? { value: a } : a ) ?? [{ value: "" }],
      itinerary: defaultValues?.itinerary ?? [],

      travelCosts: defaultValues?.travelCosts && defaultValues.travelCosts.length > 0
        ? defaultValues.travelCosts
        : [{ city: "", packageCost: 0, travelType: "" }],
      fitCustom: defaultValues?.fitCustom ?? false,
      noOfPersons: defaultValues?.noOfPersons ?? 0,
      noOfRooms: defaultValues?.noOfRooms ?? 0,
      mealsPlan: defaultValues?.mealsPlan ?? "",
      vehiclePreference: defaultValues?.vehiclePreference ?? "",
      slots: defaultValues?.slots ?? 0,
      discount: defaultValues?.discount ?? 0,
      childCost: defaultValues?.childCost ?? 0,
      partialPayment: defaultValues?.partialPayment ?? 0,
      thingsToCarry: defaultValues?.thingsToCarry ?? "",
      inclusionsExclusions: defaultValues?.inclusionsExclusions ?? "",
      cancellationPolicy: defaultValues?.cancellationPolicy ?? "",
      isDrafted: defaultValues?.isDrafted ?? true
    },
  });

  const departureCitiesArray = useFieldArray<TourFormType, "departureCities", "id">({
    control: form.control,
    name: "departureCities",
  });

  const itineraryArray = useFieldArray<TourFormType, "itinerary", "id">({
    control: form.control,
    name: "itinerary",
  });

  const formState = form.formState;
  return {form, formState, departureCitiesArray, itineraryArray};
};
