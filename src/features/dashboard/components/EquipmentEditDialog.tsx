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
    total_units: 1,
    type: "",
    mfgr: "",
    model: "",
    po: "",
    disposal: "",
    disposal_date: null,
    sn_no: "",
    locationID: 0,
    vendor: "",
    comments: "",
    building: "",
    cubicle: "",
  };


  const {data: disposalData} = useDisposalAll();

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

 



const buildingOptions = Array.from(
  new Map(dummyLocations.map((i) => [i.building.bldgName, i.building]),).values(),
);
const cubicleOptions = building
  ? dummyLocations.filter(
      (i) => i.building.bldgName === building,
    )
  : [];

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: EquipmentFormValues) => {
    const payload = {
      ...data,
      locationID:
        dummyLocations.find(
          (l) => l.building.bldgName === data.building && l.cubicle === data.cubicle,
        )?.locationID ?? 0,
        
    };

   
      console.log("UPDATE", payload);
 

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
      <form onSubmit={handleSubmit(
  (data) => {
    console.log("VALID SUBMIT", data);
    onSubmit(data);
  },
  (errors) => {
    console.log("VALIDATION ERRORS", errors);
  }
)}>
        <DialogTitle>
        "Edit Equipment"
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={3}>
              {/* BASIC FIELDS */}
              <Stack direction="row" spacing={2}>
                <Controller
                  name="inv_no"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="Inventory Number" fullWidth slotProps={{input: {readOnly: true}}} />
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
                      <TextField {...params} label="Disposal" error={!!errors.disposal} helperText={errors.disposal?.message} />
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
                        onChange={(e)=> field.onChange(e.target.value)}
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
          "Update"
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
