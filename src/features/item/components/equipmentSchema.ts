import { z } from "zod";

export const equipmentSchema = z.object({
  itemID: z.number().optional(),

  inv_no: z.string().min(1, "Invoice number is required"),
  po: z.string().min(1, "PO is required"),
  total_units: z.coerce.number().min(1, "Total units must be at least 1"),
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),

  purchased: z.string().min(1, "Date is required"),
  sn_no: z.string().optional(),
  vendor: z.string().min(1, "Vendor is required"),
  comments: z.string().optional(),
  disposal: z.string().optional().nullable(),
  disposal_date: z.string().optional().nullable(),

  // Cascading dropdowns (stored as strings from Autocomplete)
  type: z.string().min(1, "Type is required"),
  mfgr: z.string().min(1, "Manufacturer is required"),
  model: z.string().min(1, "Model is required"),

  // Location
  building: z.number().min(1, "Building is required"),
  cubicle: z.number().int().min(1, "Cubicle is required"),
  emp_at_loca: z.string().optional().nullable(),

  // IDs derived at submit time (optional in form)
  typeID: z.number().optional(),
  locationID: z.number().optional(),
}) .refine(
    (data) => {
      // if disposal exists, disposal_date must exist
      if (data.disposal && !data.disposal_date) {
        return false;
      }

      return true;
    },
    {
      path: ["disposal_date"],
      message: "Disposal date is required when disposal is selected",
    },
  );

export type EquipmentFormValues = z.infer<typeof equipmentSchema>;

export type EquipmentPayload = Omit<
  EquipmentFormValues,
  "typeID" | "locationID" | "emp_at_loca"
> & {
  typeID: number;
  locationID: number;
};
