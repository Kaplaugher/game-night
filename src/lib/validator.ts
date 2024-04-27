import { z } from "zod";

export const gameFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be at most 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be at most 400 characters"),
  image: z.string().url(),
  startDateTime: z.date(),
  endDateTime: z.date(),
  gameType: z.string(),
  price: z.string(),
  isFree: z.boolean(),
});
