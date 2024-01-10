import { z } from 'zod';

// Define the Zod validation schema for IClasses
const classesZodSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    dateTime: z.date().optional(),
  }),
});

export const ClassValidation = {
  classesZodSchema,
};
