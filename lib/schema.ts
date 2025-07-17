import { z } from "zod";

export const FormSchema = z.object({
  climberWeight: z.number().refine((val: number) => val > 0, {
    message: "Climber weight must be a positive number.",
  }),
  belayerWeight: z.number().refine((val: number) => val > 0, {
    message: "Belayer weight must be a positive number.",
  }),
  unit: z.enum(["kg", "lbs"]),
  device: z.enum(["manual", "assistedPassive", "assistedActive"]),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  useOhm: z.boolean(),
});

export type FormData = z.infer<typeof FormSchema>;