import { z } from "zod";

export const FormSchema = z.object({
  climberWeight: z.coerce.number().refine(val => val > 0, {
    message: "Climber weight must be a positive number.",
  }),
  belayerWeight: z.coerce.number().refine(val => val > 0, {
    message: "Belayer weight must be a positive number.",
  }),
  unit: z.enum(["kg", "lbs"]),
  device: z.enum(["manual", "assistedPassive", "assistedActive"]),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
});

export type FormData = z.infer<typeof FormSchema>; 