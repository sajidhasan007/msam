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

const enrollInClassRoomZodSchema = z.object({
  body: z.object({
    classCode: z.string(),
  }),
});

export const ClassRoomValidation = {
  classRoomZodSchema,
  enrollInClassRoomZodSchema,
};
