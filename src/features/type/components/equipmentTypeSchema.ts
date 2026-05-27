import { z } from "zod";
export const equipmentTypeSchema = z.object({
  type: z.string().min(1, "Type is required"),
  mfgr: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),
  comments: z.string().optional(),
});

export type EquipmentTypeFormValues = z.infer<typeof equipmentTypeSchema>;