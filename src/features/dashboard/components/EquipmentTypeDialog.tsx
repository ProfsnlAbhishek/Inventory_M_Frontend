import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { equipmentTypeSchema, type EquipmentTypeFormValues } from "./equipmentTypeSchema";

type Props = {
  open: boolean;
  onClose: () => void;
};


export default function EquipmentTypeDialog({
  open,
  onClose,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipmentTypeFormValues>({
    resolver:
      zodResolver(equipmentTypeSchema) as Resolver<EquipmentTypeFormValues>,
    defaultValues: {
      type: "",
      mfgr: "",
      model: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: EquipmentTypeFormValues) => {
    console.log(data);

    // save logic here

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add Type</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Type"
                  fullWidth
                  error={!!errors.type}
                  helperText={errors.type?.message}
                />
              )}
            />

            <Controller
              name="mfgr"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Manufacturer"
                  fullWidth
                  error={!!errors.mfgr}
                  helperText={errors.mfgr?.message}
                />
              )}
            />

            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Model"
                  fullWidth
                  error={!!errors.model}
                  helperText={errors.model?.message}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>
            Close
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}