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
import { useDisposalAll } from "../hooks/useDisposalAll";
import { useBuildingAll } from "../hooks/useBuildingAll";
import { useLocationsByBuilding } from "../hooks/useLocationByBuilding";
import type { Location } from "../../../types/Location";
import type { AddItemInput } from "../../../types/Item";
import { toErrorMessage } from "../../../utils/errors";
import { useUpdateItem } from "../hooks/useUpdateItem";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  initialData?: EquipmentFormValues | null;
};
export default function EquipmentEditDialog({
  open,
  onClose,
  onSaved,
  initialData,
}: Props) {
  const { data: allBuilding, isLoading: buildingLoading } = useBuildingAll();

  const defaultValues: EquipmentFormValues = {
    itemID: 0,
    typeID: 0,
    inv_no: "",
    purchased: "",
    amount: 0,
    total_units: 1,
    type: "",
    mfgr: "",
    model: "",
    po: "",
    disposal: "",
    disposal_date: null,
    sn_no: "",
    locationID: 0,
    vendor: "AMAZON",
    comments: "",
    building: 0,
    cubicle: 0,
  };

  const { data: disposalData } = useDisposalAll();

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

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        console.log("initil data", initialData);
        reset({
          ...initialData,
          total_units: 1,
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [open, initialData, reset]);

  const building = watch("building");

  const { data: locationByBuilding, isLoading: locationByBuilidngLoading } =
    useLocationsByBuilding(Number(watch("building")));

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const updateMutation = useUpdateItem(initialData?.itemID ?? NaN);

  const onSubmit = async (data: EquipmentFormValues) => {
    try {
      const payload: AddItemInput = {
        typeID: data.typeID!,
        inv_no: data.inv_no,
        disposal: data.disposal,
        disposal_dt: data.disposal_date,
        purchased: data.purchased,
        amount: data.amount,
        po: data.po,
        sn_no: data.sn_no,
        locationID: data.cubicle!,
        vendor: "AMAZON",
        comments: data.comments,
        total_units: data.total_units,
      };

      const updated = await updateMutation.mutateAsync(payload);
      console.log("data is inserted", updated);
    } catch (e: unknown) {
      console.error("Item save failed!", toErrorMessage(e));
    }

    onSaved?.();
    handleClose();
  };

  const [equipmentTypeDialogOpen, setEquipmentTypeDialogOpen] =
    React.useState(false);

  const closeEquipmentTypeDialog = () => {
    setEquipmentTypeDialogOpen(false);
  };

  const handleTypeCreated= ()=>{
    console.log("worked");
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("VALID SUBMIT", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("VALIDATION ERRORS", errors);
          },
        )}
      >
        <DialogTitle>Edit Equipment</DialogTitle>

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
                      slotProps={{ input: { readOnly: true } }}
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
                name="disposal"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    options={disposalData ?? []}
                    value={field.value || ""}
                    onChange={(_, value) => {
                      field.onChange(value ?? "");
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    noOptionsText={
                      <Box>
                        <div>No Results Found</div>
                      </Box>
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Disposal"
                        error={!!errors.disposal}
                        helperText={errors.disposal?.message}
                      />
                    )}
                  />
                )}
              />

              <Controller
                name="disposal_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Date"
                    type="date"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    slotProps={{ inputLabel: { shrink: true } }}
                    error={!!errors.disposal_date}
                    helperText={errors.disposal_date?.message}
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
                    value={field.value ?? ""}
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
            Update
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
