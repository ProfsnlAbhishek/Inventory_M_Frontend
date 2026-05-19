import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Stack,
  MenuItem,
  FormHelperText,
} from "@mui/material";

// import { useForm, Controller } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
};

export default function EquipmentAddDialog({ open, onClose, onSaved }: Props) {

    return(
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>



            <DialogTitle>Add Equipment Information</DialogTitle>
        </Dialog>
    )




}
