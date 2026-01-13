import { z } from "zod";

const requiredMessage = (title:string) => `${title} is required`;

export const tourFormSchema = z.object({
    // Step 1: Basic Details
    tourName: z.string().min(2, "Tour name is required").max(30, "Maximum 30 characters").regex(/^(?![ ])[a-zA-Z ]{2,30}(?<![ ])$/, "Invalid format"),
    duration: z.string().min(1, "Duration is required"),
    altitude: z.string().optional(),
    startingPrice: z.number().min(1, "Price must be greater than 0").max(99999, "Maximum price is 99999")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
            message: "Maximum 2 digits allowed after decimal"
        }),
    destinations: z.string().min(3, "Destinations required").refine(val => /^(?![ ])[a-zA-Z0-9 ,.-]{2,50}(?<![ ])$/.test(val), {
        message: "Invalid format"}),
    difficultyLevel: z.string().optional(),
    bestSeason: z.string().optional(),
    region: z.string().min(2, "Region required").refine(val => /^(?![ ])[a-zA-Z ]{2,10}(?<![ ])$/.test(val), {
        message: "Invalid format"}),
    tourDescription: z.string().optional(),
    coverImage: z.array(z.string()).catch([]),

    // Step 2: Departure Details
    departureCities: z.array(
        z.object({
            city: z.string().min(1, "City required").refine(val => /^(?![ ])[a-zA-Z ]{2,10}(?<![ ])$/.test(val), {
                message: "Invalid format"}),
            duration: z.string().min(1, "Duration required"),
            pricePerPerson: z.number().min(0, "Price per person required").max(99999, "Maximum price is 99999")
                .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
                    message: "Maximum 2 digits allowed after decimal"
                }),
        })
    ).min(1, "At least one departure city is required"),
    availableDates: z.array(
        z.object({ 
            value: z.string().min(1, "Date is required").refine(val => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            }, { message: "Invalid date format" })
            .refine(val => {
                const date = new Date(val);
                const now = new Date();
                return date.setHours(0,0,0,0) > now.setHours(0,0,0,0);
            }, { message: "Date must be in the future" })
        })
    )
    .refine(arr => arr.length > 0, { message: "At least one date required" })
    .refine(arr => arr.some(item => {
        const date = new Date(item.value);
        return item.value.trim() !== "" && !isNaN(date.getTime()) && date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0);
    }), { message: "At least one valid date is required" }),


    // Step 3: Attractions & Itinerary
    attractions: z.array(
        z.object({ value: z.string().min(3, "Attraction is required") })
    ).nonempty("Add at least one attraction"),
    itinerary: z.array(
        z.object({
            day: z.number().min(1, "Day is required").max(30, "Maximum 30 days").refine(val => Number.isInteger(val), {
                message: "Day must be an integer"}),
            title: z.string().min(3, "Title required").catch(""),
            description: z.string().optional(),
            reportingTime: z.string().catch(""),
            reportingDate: z.string().refine(val => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            }, { message: "Invalid date format" })
            .refine(val => {
                const date = new Date(val);
                const now = new Date();
                return date.setHours(0,0,0,0) > now.setHours(0,0,0,0);
            }, { message: "Date must be in the future" }).catch(''),
        })
    ).catch([]),

    // Step 4: Additional Info
    travelCosts: z.array(z.object({
        city: z.string().optional().catch(""),
        packageCost: z.number().min(0, "Minimum cost is 0").max(99999, "Maximum cost is 99999")
            .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
                message: "Maximum 2 digits allowed after decimal"
            }).catch(0),
        travelType: z.string().nonempty(requiredMessage('Travel type')).min(1, requiredMessage('Travel type')).catch(""),
    })).min(1, "Add at least one travel cost").catch([{city: "", packageCost: 0, travelType: 'Bus'}]),
    fitCustom: z.boolean().catch(false),
    noOfPersons: z.number().min(0, "Minimum Person 0").max(100, "Maximum 100 persons").refine(val => Number.isInteger(val), {
        message: "No of persons must be an integer"}).optional().catch(0),
    noOfRooms: z.number().min(0, "Room can't be negative").max(100, "Max value is 100").optional().catch(0),
    mealsPlan: z.string().optional().catch(""),
    vehiclePreference: z.string().optional().catch(""),
    slots: z.number().min(0, "Minimum slot is 0").max(100, "Maximum slot is 100").refine(val => Number.isInteger(val), {
        message: "Slot must be an integer"}).optional().catch(0),
    discount: z.number().min(0, "Minimum discount is 0").max(100, "Maximum discount is 100").refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum 2 digits allowed after decimal"}).optional().catch(0),
    childCost: z.number().min(0, "Minimum cost is 0").max(9999, "Maximum cost is 9999").catch(0).refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum 2 digits allowed after decimal"
    }).catch(0),
    partialPayment: z.number().min(0, "Minimum payment is 0").max(99999, "Maximum payment is 99999").catch(0).refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message: "Maximum 2 digits allowed after decimal"
    }).optional().catch(0),
    thingsToCarry: z.string().catch(""),
    inclusionsExclusions: z.string().optional().catch(""),
    cancellationPolicy: z.string().optional().catch(""),
    isDrafted: z.boolean().catch(true)
});


export type TourFormType = z.infer<typeof tourFormSchema>;

export interface Tour {
    tourName: string,
    duration: string,
    altitude: string,
    startingPrice: number,
    destinations: string,
    difficultyLevel: string
    bestSeason: string,
    region: string,
    tourDescription: string,
    coverImage: string[],
    departureCities: {
        city: string,
        duration: string,
        pricePerPerson: number,
    }[],
    availableDates: Array<string>,
    attractions: Array<string>,
    itinerary: {
        day: number,
        title: string,
        description: string,
        reportingTime: string,
        reportingDate: string,
    }[],
    travelCosts: {
        city: string,
        packageCost: number,
        travelType: string,
    }[],
    fitCustom: boolean,
    noOfPersons: number,
    noOfRooms: number,
    mealsPlan: string,
    vehiclePreference: string,
    slots: number,
    discount: number,
    childCost: number,
    partialPayment: number,
    thingsToCarry: string,
    inclusionsExclusions: string,
    cancellationPolicy: string,
    isDrafted: boolean;
}