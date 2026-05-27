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
import {
  equipmentTypeSchema,
  type EquipmentTypeFormValues,
} from "./equipmentTypeSchema";
import { useCreateItemType } from "../hooks/useCreateItemType";
import type { TypeInput } from "../../../types/Type";
import { toErrorMessage } from "../../../utils/errors";
import { toUpperStr } from "../../../utils/formatting";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: (data: TypeInput) => void;
  onToast?: (t: {
    open: boolean;
    msg: string;
    sev: "success" | "info" | "error" | "warning";
  }) => void;
};

export default function EquipmentTypeDialog({
  open,
  onClose,
  onCreated,
  onToast,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EquipmentTypeFormValues>({
    resolver: zodResolver(
      equipmentTypeSchema,
    ) as Resolver<EquipmentTypeFormValues>,
    defaultValues: {
      type: "",
      mfgr: "",
      model: "",
      comments: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const createMutation = useCreateItemType();

  const onSubmit = async (data: EquipmentTypeFormValues) => {
    console.log(data);
    try {
      const payload: TypeInput = {
        type: data.type,
        mfgr: data.mfgr,
        model: data.model,
        comments: data.comments,
      };

      const created = await createMutation.mutateAsync(payload);
      onCreated?.(created);
      console.log("created", created);

      onToast?.({
        open: true,
        msg: "Type Created!",
        sev: "success",
      });
    } catch (e: unknown) {
      console.error("ItemType creation failed", toErrorMessage(e));

      onToast?.({
        open: true,
        msg: "Type Creation Failed!",
        sev: "error",
      });
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
                  onChange={(e)=> field.onChange(toUpperStr(e.target.value))}
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
                  onChange={(e)=> field.onChange(toUpperStr(e.target.value))}
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
                  onChange={(e)=> field.onChange(toUpperStr(e.target.value))}
                />
              )}
            />
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Comments"
                  fullWidth
                  error={!!errors.comments}
                  helperText={errors.comments?.message}
                  onChange={(e)=> field.onChange(toUpperStr(e.target.value))}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose}>Close</Button>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
