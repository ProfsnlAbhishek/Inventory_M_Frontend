import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Autocomplete,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import type { Type } from "../../../types/Type";
import { equipmentSchema, type EquipmentFormValues } from "./equipmentSchema";
import EquipmentTypeDialog from "./EquipmentTypeDialog";
type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};
export default function EquipmentAddDialog({ open, onClose, onSaved }: Props) {


  const dummyVendor: string[] = ["Google", "Microsoft", "Netflix", "Meta"];
  const dummyTypes: Type[] = [
    { typeID: 1, type: "Laptop", mfgr: "Dell", model: "XPS 15" },
    { typeID: 2, type: "Smartphone", mfgr: "Apple", model: "iPhone 15 Pro" },
    { typeID: 3, type: "Tablet", mfgr: "Samsung", model: "Galaxy Tab S9" },
    { typeID: 4, type: "Monitor", mfgr: "LG", model: "UltraGear 27GP850" },
    { typeID: 5, type: "Printer", mfgr: "HP", model: "LaserJet Pro M404" },
    { typeID: 6, type: "Router", mfgr: "Netgear", model: "Nighthawk AX5400" },
    { typeID: 7, type: "Keyboard", mfgr: "Logitech", model: "MX Keys" },
    { typeID: 8, type: "Mouse", mfgr: "Razer", model: "DeathAdder V3" },
  ];

  type LocationOption = { id: number; building: string; cubicle: string };
  const dummyLocations: LocationOption[] = [
    { id: 1, building: "Headquarters", cubicle: "A-101" },
    { id: 2, building: "Headquarters", cubicle: "A-102" },
    { id: 3, building: "Engineering Center", cubicle: "B-210" },
    { id: 4, building: "Engineering Center", cubicle: "B-211" },
    { id: 5, building: "Operations", cubicle: "C-305" },
    { id: 6, building: "Operations", cubicle: "C-306" },
  ];

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema) as Resolver<EquipmentFormValues>,
    defaultValues: {
      typeID: 0,
      inv_no: "",
      purchased: "",
      amount: 0,
      total_units: 0,
      type: "",
      mfgr: "",
      model: "",
      po: "",
      sn_no: "",
      locationID: 0,
      vendor: "",
      comments: "",
      building: "",
      cubicle: "",
    },
  });

  const type = watch("type");
  const mfgr = watch("mfgr");
  const building = watch("building");

  const typeOptions = Array.from(new Set(dummyTypes.map((i) => i.type)));

  const mfgrOptions = type
    ? Array.from(
        new Set(dummyTypes.filter((i) => i.type === type).map((i) => i.mfgr)),
      )
    : [];

  const modelOptions =
    type && mfgr
      ? dummyTypes.filter((i) => i.type === type && i.mfgr === mfgr)
      : [];

  const buildingOptions = Array.from(
    new Map(dummyLocations.map((i) => [i.building, i])).values(),
  );

  const cubicleOptions = building
    ? dummyLocations.filter((i) => i.building === building)
    : [];

  const handleClose = () => {
    reset({
      itemID: 0,
      typeID: 0,
      inv_no: "",
      purchased: "",
      amount: 0,
      total_units: 0,
      type: "",
      mfgr: "",
      model: "",
      po: "",
      sn_no: "",
      locationID: 0,
      vendor: "",
      comments: "",
      building: "",
      cubicle: "",
    });

    onClose();
  };

  const onSubmit = (data: EquipmentFormValues) => {
    const payload = {
      ...data,
      typeID: dummyTypes.find((t) => t.model === data.model)?.typeID ?? 0,
      locationID:
        dummyLocations.find(
          (l) => l.building === data.building && l.cubicle === data.cubicle,
        )?.id ?? 0,
    };

    console.log(payload);
  };

  const [equipmentTypeDialogOpen, setEquipmentTypeDialogOpen] = React.useState(false);

  const closeEquipmentTypeDialog = () => {
    setEquipmentTypeDialogOpen(false)
  }


  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Equipment</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={3}>
              {/* BASIC FIELDS */}
              <Stack direction="row" spacing={2}>
                <Controller
                  name="inv_no"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Invoice Number" fullWidth />
                  )}
                />

                <Controller
                  name="po"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="PO" fullWidth />
                  )}
                />

                <Controller
                  name="total_units"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Total Units"
                      fullWidth
                      type="number"
                    />
                  )}
                />

                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cost (per unit)"
                      fullWidth
                      type="number"
                    />
                  )}
                />
              </Stack>

              {/* BUILDING */}
              <Controller
                name="building"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={buildingOptions}
                    value={
                      buildingOptions.find((b) => b.building === field.value) ||
                      null
                    }
                    onChange={(_, v) => {
                      field.onChange(v?.building ?? "");
                      reset((prev) => ({
                        ...prev,
                        cubicle: "",
                      }));
                    }}
                    getOptionLabel={(o) => o.building}
                    renderInput={(params) => (
                      <TextField {...params} label="Building" />
                    )}
                  />
                )}
              />

              {/* CUBICLE */}
              <Controller
                name="cubicle"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={cubicleOptions}
                    value={
                      cubicleOptions.find((c) => c.cubicle === field.value) ||
                      null
                    }
                    onChange={(_, v) => {
                      field.onChange(v?.cubicle ?? "");
                    }}
                    getOptionLabel={(o) => o.cubicle}
                    disabled={!building}
                    renderInput={(params) => (
                      <TextField {...params} label="Cubicle" />
                    )}
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={typeOptions}
                    value={field.value || null}
                    onChange={(_, v) => {
                      field.onChange(v ?? "");
                      reset((prev) => ({
                        ...prev,
                        mfgr: "",
                        model: "",
                      }));
                    }}
                    noOptionsText={
                      <Box>
                        <div>No Results Found</div>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>setEquipmentTypeDialogOpen(true)}
                        >
                          Add Type
                        </Button>
                      </Box>
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Type" />
                    )}
                  />
                )}
              />

              <Controller
                name="mfgr"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={mfgrOptions}
                    value={field.value || null}
                    onChange={(_, v) => {
                      field.onChange(v ?? "");
                      reset((prev) => ({
                        ...prev,
                        model: "",
                      }));
                    }}
                    disabled={!type}
                    noOptionsText={
                      <Box>
                        <div>No Results Found</div>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setEquipmentTypeDialogOpen(true)}
                        >
                          Add Type
                        </Button>
                      </Box>
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Manufacturer" />
                    )}
                  />
                )}
              />

              {/* MODEL */}
              <Controller
                name="model"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={modelOptions}
                    value={
                      modelOptions.find((m) => m.model === field.value) || null
                    }
                    onChange={(_, v) => {
                      field.onChange(v?.model ?? "");
                    }}
                    getOptionLabel={(o) => o.model}
                    disabled={!mfgr}
                    noOptionsText={
                      <Box>
                        <div>No Results Found</div>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>setEquipmentTypeDialogOpen(true)}
                        >
                          Add Type
                        </Button>
                      </Box>
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Model" />
                    )}
                  />
                )}
              />

              <Controller
                name="sn_no"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Serial Number"
                    error={!!errors.sn_no}
                    helperText={errors.sn_no?.message}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />

              <Controller
                name="vendor"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={dummyVendor}
                    value={field.value || null}
                    onChange={(_, value) => field.onChange(value ?? "")}
                    renderInput={(params) => (
                      <TextField {...params} label="Vendor" fullWidth />
                    )}
                  />
                )}
              />

              <Controller
                name="comments"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Comments"
                    error={!!errors.comments}
                    helperText={errors.comments?.message}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
      <EquipmentTypeDialog
          open={equipmentTypeDialogOpen}
          onClose={closeEquipmentTypeDialog}
          

        />
    </Dialog>
  );
}
