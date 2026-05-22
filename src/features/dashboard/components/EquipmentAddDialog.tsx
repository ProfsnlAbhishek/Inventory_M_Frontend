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
import { equipmentSchema, type EquipmentFormValues } from "./equipmentSchema";
import EquipmentTypeDialog from "./EquipmentTypeDialog";
import type { Building } from "../../../types/Building";
import { useItemTypeAll } from "../hooks/useItemTypeAll";

import { useBuildingAll } from "../hooks/useBuildingAll";
import { useLocationsByBuilding } from "../hooks/useLocationByBuilding";
import type { Location } from "../../../types/Location";
import { useVendorAll } from "../hooks/useVendorAll";
import { useCreateItem } from "../hooks/useCreateItem";
import type { AddItemInput } from "../../../types/Item";
import { toErrorMessage } from "../../../utils/errors";
import type { Type } from "../../../types/Type";
type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};
export default function EquipmentAddDialog({ open, onClose, onSaved }: Props) {
  const { data: allItemType } = useItemTypeAll();

  const { data: allBuilding, isLoading: buildingLoading } = useBuildingAll();
  // console.log("all building", allBuilding)

  const { data: allVendor } = useVendorAll();

  const defaultValues: EquipmentFormValues = {
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
    building: 0,
    cubicle: 0,
  };

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema) as Resolver<EquipmentFormValues>,
    defaultValues,
  });

  const type = watch("type");
  const mfgr = watch("mfgr");
  const building = watch("building");

  const typeOptions = Array.from(new Set(allItemType?.map((i) => i.type)));

  const mfgrOptions = type
    ? Array.from(
        new Set(allItemType?.filter((i) => i.type === type).map((i) => i.mfgr)),
      )
    : [];

  const modelOptions =
    type && mfgr
      ? allItemType?.filter((i) => i.type === type && i.mfgr === mfgr)
      : [];

  const extendedModelOptions = [
    ...(modelOptions ?? []),
    { model: "UNKNOWN", typeID: -1 }, // or any safe placeholder
  ];

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const { data: locationByBuilding, isLoading: locationByBuilidngLoading } =
    useLocationsByBuilding(Number(watch("building")));
  // console.log("building locations", locationByBuilding)

  const createMutation = useCreateItem();

  const onSubmit = async (data: EquipmentFormValues) => {
    console.log("the data is:", data);

    try {
      const payload: AddItemInput = {
        typeID: data.typeID!,
        inv_no: data.inv_no,
        disposal: null,
        disposal_dt: null,
        purchased: data.purchased,
        amount: data.amount,
        po: data.po,
        sn_no: data.sn_no,
        locationID: data.cubicle!,
        vendor: data.vendor,
        comments: data.comments,
        total_units: data.total_units,
      };

      const created = await createMutation.mutateAsync(payload);
      console.log("this is created", created);
    } catch (e: unknown) {
      console.error("Item save failed!", toErrorMessage(e));
    }

    // console.log("CREATE", payload);

    onSaved?.();
    handleClose();
  };

  const [equipmentTypeDialogOpen, setEquipmentTypeDialogOpen] =
    React.useState(false);

  const closeEquipmentTypeDialog = () => {
    setEquipmentTypeDialogOpen(false);
  };

  const handleTypeCreated = (data: Type) => {
    setValue("type", data.type);
    setValue("mfgr", data.mfgr);
    setValue("model", data.model);
    setValue("typeID", data.typeID)
  };
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
                    <TextField
                      {...field}
                      label="Inventory Number"
                      fullWidth
                      error={!!errors.inv_no}
                      helperText={errors.inv_no?.message}
                    />
                  )}
                />

                <Controller
                  name="po"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="PO"
                      fullWidth
                      error={!!errors.po}
                      helperText={errors.po?.message}
                    />
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
                      error={!!errors.total_units}
                      helperText={errors.total_units?.message}
                      value={field.value === 0 ? "" : (field.value ?? "")}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val === "" ? 0 : Number(val));
                      }}
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
                render={({ field }) => {
                  const selectedBuilding =
                    allBuilding?.find(
                      (b) => b.bldgID === Number(field.value),
                    ) ?? null;

                  return (
                    <Autocomplete<Building>
                      options={allBuilding ?? []}
                      value={selectedBuilding}
                      loading={buildingLoading}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.bldgID ?? null);

                        reset((prev) => ({
                          ...prev,
                          cubicle: -1,
                        }));
                      }}
                      getOptionLabel={(option) => option.bldgName}
                      isOptionEqualToValue={(option, value) =>
                        option.bldgID === value.bldgID
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Building"
                          error={!!errors.building}
                          helperText={errors.building?.message}
                        />
                      )}
                    />
                  );
                }}
              />

              {/* CUBICLE */}
              <Controller
                name="cubicle"
                control={control}
                render={({ field }) => {
                  const selectedLocation =
                    locationByBuilding?.find(
                      (c) =>
                        c.locationID != null && c.locationID === field.value,
                    ) ?? null;

                  return (
                    <Autocomplete<Location>
                      options={locationByBuilding ?? []}
                      value={selectedLocation}
                      loading={locationByBuilidngLoading}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.locationID ?? null);
                        console.log(newValue?.locationID);
                      }}
                      getOptionLabel={(option) => option.cubicle}
                      isOptionEqualToValue={(option, value) =>
                        option.locationID === value.locationID
                      }
                      disabled={!building}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Cubicle"
                          error={!!errors.cubicle}
                          helperText={errors.cubicle?.message}
                        />
                      )}
                    />
                  );
                }}
              />

              <Controller
                name="purchased"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Purchased Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                    error={!!errors.purchased}
                    helperText={errors.purchased?.message}
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
                      <TextField
                        {...params}
                        label="Type"
                        error={!!errors.type}
                        helperText={errors.type?.message}
                      />
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
                      <TextField
                        {...params}
                        label="Manufacturer"
                        error={!!errors.mfgr}
                        helperText={errors.mfgr?.message}
                      />
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
                    options={extendedModelOptions ?? []}
                    value={
                      extendedModelOptions?.find(
                        (m) => m.model === field.value,
                      ) || null
                    }
                    onChange={(_, v) => {
                      field.onChange(v?.model ?? "");
                      reset((prev) => ({
                        ...prev,
                        typeID: v?.typeID,
                      }));
                    }}
                    getOptionLabel={(o) =>
                      o.model === "UNKNOWN" ? "Unknown" : o.model
                    }
                    disabled={!mfgr}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Model"
                        error={!!errors.model}
                        helperText={errors.model?.message}
                      />
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
                render={({ field }) => {
                  const selectedVendor =
                    allVendor?.find((v) => v.vendor === field.value) ?? null;

                  return (
                    <Autocomplete
                      options={allVendor ?? []}
                      value={selectedVendor}
                      onChange={(_, newValue) => {
                        field.onChange(newValue?.vendor ?? "");
                      }}
                      getOptionLabel={(option) => option.vendor}
                      isOptionEqualToValue={(option, value) =>
                        option.vendor === value.vendor
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Vendor"
                          fullWidth
                          error={!!errors.vendor}
                          helperText={errors.vendor?.message}
                        />
                      )}
                    />
                  );
                }}
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
        onCreated={handleTypeCreated}
      />
    </Dialog>
  );
}
