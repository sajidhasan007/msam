import { z } from 'zod';

const regStudentZodSchema = z.object({
  body: z.object({
    fullName: z.string(),
    phoneNumber: z.string().regex(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    fatherName: z.string(),
    fatherContactNo: z
      .string()
      .regex(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/),
    motherName: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    rollNo: z.string(),
    dhakaUniversityRegNo: z.string(),
    session: z.string(),
    sscYear: z.number().int().min(1900).max(new Date().getFullYear()),
    sscGpa: z.number().min(0).max(5),
    hscYear: z.number().int().min(1900).max(new Date().getFullYear()),
    hscGpa: z.number().min(0).max(5),
    gender: z.enum(['male', 'female', 'other']),
    profileImage: z.string().optional(),
  }),
});

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      bloodGroup: z
        .string({
          required_error: 'Blood group is required',
        })
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),

      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
        middleName: z.string().optional(),
      }),

      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),

      gender: z.string({
        required_error: 'Gender is required',
      }),

      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),

      contactNo: z.string({
        required_error: 'Contact number is required',
      }),

      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      managementDepartment: z.string({
        required_error: 'Management department is required',
      }),

      designation: z.string({
        required_error: 'Designation is required',
      }),
      profileImage: z.any().optional(),
    }),
  }),
});

export const UserValidation = {
  regStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
};
