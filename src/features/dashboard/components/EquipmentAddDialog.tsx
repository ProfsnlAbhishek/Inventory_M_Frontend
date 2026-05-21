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
import type { Building } from "../../../types/Building";
type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};
export default function EquipmentAddDialog({ open, onClose, onSaved }: Props) {
  const dummyVendor: string[] = ["Google", "Microsoft", "Netflix", "Meta"];
  const dummyTypes: Type[] = [
    {
      typeID: 1,
      type: "Laptop",
      mfgr: "Dell",
      model: "Latitude 7420",
      comments: "Business laptop",
    },
    {
      typeID: 2,
      type: "Monitor",
      mfgr: "LG",
      model: "UltraWide 34WN80C",
      comments: "Ultra-wide display",
    },
    {
      typeID: 3,
      type: "Printer",
      mfgr: "HP",
      model: "LaserJet Pro M404",
      comments: "Office printer",
    },
    {
      typeID: 4,
      type: "Desktop",
      mfgr: "Lenovo",
      model: "ThinkCentre M90",
      comments: "Workstation desktop",
    },
    {
      typeID: 5,
      type: "Tablet",
      mfgr: "Apple",
      model: "iPad Pro 12.9",
      comments: "Field tablet",
    },
  ];

  type LocationOption = {
    locationID: number;
    building: Building;
    cubicle: string;
  };
  const dummyLocations: LocationOption[] = [
    {
      locationID: 1,
      building: {
        bldgID: 1,
        bldgNo: "ENG",
        bldgName: "Engineering Building",
      },
      cubicle: "ENG-201A",
    },
    {
      locationID: 2,
      building: {
        bldgID: 2,
        bldgNo: "ADM",
        bldgName: "Administration Building",
      },
      cubicle: "CONF-01",
    },
    {
      locationID: 3,
      building: {
        bldgID: 3,
        bldgNo: "OPS",
        bldgName: "Operations Center",
      },
      cubicle: "OPS-15",
    },
    {
      locationID: 4,
      building: {
        bldgID: 4,
        bldgNo: "FIN",
        bldgName: "Finance Building",
      },
      cubicle: "FIN-304",
    },
    {
      locationID: 5,
      building: {
        bldgID: 5,
        bldgNo: "FS",
        bldgName: "Field Services",
      },
      cubicle: "FS-110",
    },
  ];
  const defaultValues: EquipmentFormValues = {
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
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema) as Resolver<EquipmentFormValues>,
    defaultValues,
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
    new Map(
      dummyLocations.map((i) => [i.building.bldgName, i.building]),
    ).values(),
  );
  const cubicleOptions = building
    ? dummyLocations.filter((i) => i.building.bldgName === building)
    : [];

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: EquipmentFormValues) => {
    const payload = {
      ...data,
      typeID: dummyTypes.find((t) => t.model === data.model)?.typeID ?? 0,
      locationID:
        dummyLocations.find(
          (l) =>
            l.building.bldgName === data.building && l.cubicle === data.cubicle,
        )?.locationID ?? 0,
    };

    console.log("CREATE", payload);

    onSaved?.();
    handleClose();
  };

  const [equipmentTypeDialogOpen, setEquipmentTypeDialogOpen] =
    React.useState(false);

  const closeEquipmentTypeDialog = () => {
    setEquipmentTypeDialogOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>"Add Equipment"</DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={3}>
              {/* BASIC FIELDS */}
              <Stack direction="row" spacing={2}>
                <Controller
                  name="inv_no"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Inventory Number" fullWidth />
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
                      buildingOptions.find((b) => b.bldgName === field.value) ||
                      null
                    }
                    onChange={(_, v) => {
                      field.onChange(v?.bldgName ?? "");
                      reset((prev) => ({
                        ...prev,
                        cubicle: "",
                      }));
                    }}
                    getOptionLabel={(o) => o.bldgName}
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
                          onClick={() => setEquipmentTypeDialogOpen(true)}
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
                          onClick={() => setEquipmentTypeDialogOpen(true)}
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
            "Save"
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
