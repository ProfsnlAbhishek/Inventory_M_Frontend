import React from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import type { Item } from "../../../types/Item";

const EquipmentPrintSection = React.forwardRef<
  HTMLDivElement,
  { selectedItem: Item | null }
>(({ selectedItem }, ref) => {
  return (
    <Box ref={ref} sx={{ p: 3, width: 500 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Equipment Information
      </Typography>

      <Stack spacing={3}>
        {/* Description + Type */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="Description"
            fullWidth
            value={
              selectedItem
                ? selectedItem.type.mfgr + " " + selectedItem.type.model
                : ""
            }
            InputLabelProps={{ shrink: !!selectedItem }}
            InputProps={{ readOnly: true }}
            variant="standard"
          />

          <TextField
            label="Type"
            fullWidth
            value={selectedItem?.type.type ?? ""}
            InputLabelProps={{ shrink: !!selectedItem }}
            InputProps={{ readOnly: true }}
            variant="standard"
          />
        </Stack>

        {/* Inventory */}
        <TextField
          label="Inventory Number"
          fullWidth
          value={selectedItem?.inv_no ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        {/* Serial */}
        <TextField
          label="Serial Number"
          fullWidth
          value={selectedItem?.sn_no ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        {/* Purchase Info */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="Purchased Date"
            fullWidth
            value={selectedItem?.purchased ?? ""}
            InputLabelProps={{ shrink: !!selectedItem }}
            InputProps={{ readOnly: true }}
            variant="standard"
          />

          <TextField
            label="Purchased Amount"
            fullWidth
            value={selectedItem?.amount ?? ""}
            InputLabelProps={{ shrink: !!selectedItem }}
            InputProps={{ readOnly: true }}
            variant="standard"
          />
        </Stack>

        <TextField
          label="PO"
          fullWidth
          value={selectedItem?.po ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        <TextField
          label="Vendor"
          fullWidth
          value={selectedItem?.vendor ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        {/* Disposal */}
        <TextField
          label="Disposal"
          fullWidth
          value={selectedItem?.disposal ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        <TextField
          label="Disposal Date"
          fullWidth
          type="datetime-local"
          value={selectedItem?.disposal_dt ?? ""}
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        {/* Location */}
        <TextField
          label="Verified Time"
          fullWidth
          type="datetime-local"
          value={selectedItem?.verif_time ?? ""}
          InputLabelProps={{ shrink: true }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        <TextField
          label="Person At Location"
          fullWidth
          value={selectedItem?.emp_at_loca ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        <TextField
          label="Building"
          fullWidth
          value={selectedItem?.location?.building?.bldgName ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        <TextField
          label="Cubicle"
          fullWidth
          value={selectedItem?.location?.cubicle ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
        />

        {/* Comments */}
        <TextField
          label="Comments"
          fullWidth
          value={selectedItem?.comments ?? ""}
          InputLabelProps={{ shrink: !!selectedItem }}
          InputProps={{ readOnly: true }}
          variant="standard"
          multiline
          minRows={2}
        />
      </Stack>
    </Box>
  );
});

export default EquipmentPrintSection;