import { z } from "zod";

export const equipmentSchema = z.object({
  itemID: z.number().optional(),

  inv_no: z.string().min(1, "Invoice number is required"),
  po: z.string().min(1, "PO is required"),
  total_units: z.coerce.number().min(1, "Total units must be at least 1"),
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
  
  purchased: z.string().optional(),
  sn_no: z.string().optional(),
  vendor: z.string().optional(),
  comments: z.string().optional(),
disposal: z.string().optional(),
disposal_date: z.string().optional().nullable(),
  
  
  

  // Cascading dropdowns (stored as strings from Autocomplete)
  type: z.string().min(1, "Type is required"),
  mfgr: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),

  // Location
  building: z.string().min(1, "Building is required"),
  cubicle: z.string().min(1, "Cubicle is required"),

  // IDs derived at submit time (optional in form)
  typeID: z.number().optional(),
  locationID: z.number().optional(),
});


export type EquipmentFormValues = z.infer<typeof equipmentSchema>;


export type EquipmentPayload = Omit<
  EquipmentFormValues,
  "typeID" | "locationID"
> & {
  typeID: number;
  locationID: number;
};