import { z } from 'zod';

// Define the Zod validation schema for IClasses
const classRoomZodSchema = z.object({
  body: z.object({
    title: z.string(),
    classCode: z.string(),
    teacherId: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const ClassRoomValidation = {
  classRoomZodSchema,
};
