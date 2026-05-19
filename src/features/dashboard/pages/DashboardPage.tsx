import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import type { Item } from "../../../types/Item";
import ItemTable from "../components/ItemTable";
import EquipmentAddDialog from "../components/EquipmentAddDialog";

export default function DashboardPage() {
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);

  const grabSelectedRow = (row: Item) => {
    console.log(row);
    setSelectedItem(row);
  };


  const [equipmentDialogOpen, setEquipmentDialogOpen] = React.useState(false);
  // const [equipmentDialogInitial, setEquipmentDialogInitial] = React.use

  const openEquipmentAddDialog = ()=>{
    // setEquipmentDialogInitial(null);
    setEquipmentDialogOpen(true);
  }

  const closeEquipmentAddDialog = ()=>{
    setEquipmentDialogOpen(false)
  }

    const onEquipmentSaved = () => {
 
  };
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box>
          <Typography>
            <h2>Equipment Infromation</h2>
          </Typography>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              width: 500,
              bgcolor: "#fafafa",
              m: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                label="Description"
                fullWidth
                value={
                  selectedItem
                    ? selectedItem.type.mfgr + selectedItem.type.model
                    : ""
                }
                slotProps={{
                  inputLabel: { shrink: !!selectedItem },
                  input: { readOnly: true },
                }}
              />

              <TextField
                label="Type"
                fullWidth
                value={selectedItem?.type.type ?? ""}
                slotProps={{
                  inputLabel: { shrink: !!selectedItem },
                  input: { readOnly: true },
                }}
              />
            </Stack>

            <TextField
              label="Invoice Number"
              fullWidth
              value={selectedItem?.inv_no ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />

            <TextField
              label="Serial Number"
              fullWidth
              value={selectedItem?.sn_no ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              width: 500,
              bgcolor: "#fafafa",
              m: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={2}>
              <TextField
                label="Purchased Date"
                fullWidth
                value={selectedItem?.purchased ?? ""}
                slotProps={{
                  inputLabel: { shrink: !!selectedItem },
                  input: { readOnly: true },
                }}
              />
              <TextField
                label="Purchased Amount"
                fullWidth
                value={selectedItem?.amount ?? ""}
                slotProps={{
                  inputLabel: { shrink: !!selectedItem },
                  input: { readOnly: true },
                }}
              />
            </Stack>

            <TextField
              label="PO"
              fullWidth
              value={selectedItem?.po ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />

            <TextField
              label="Vendor"
              fullWidth
              value={selectedItem?.vendor ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              width: 500,
              bgcolor: "#fafafa",
              m: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Disposal"
              fullWidth
              value={selectedItem?.disposal ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />

            <TextField
              label="Disposal Date"
              fullWidth
              value={selectedItem?.disposal_dt ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              width: 500,
              bgcolor: "#fafafa",
              m: 2,

              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Verified Time"
              fullWidth
              value={selectedItem?.verif_time ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />

            <TextField
              label="Person At Location"
              fullWidth
              value={selectedItem?.verif_by ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />
            <TextField label="Building" fullWidth />
            <TextField label="Cubicle" fullWidth />
          </Box>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              p: 2,
              width: 500,
              bgcolor: "#fafafa",
              m: 2,

              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Comment"
              fullWidth
              value={selectedItem?.comments ?? ""}
              slotProps={{
                inputLabel: { shrink: !!selectedItem },
                input: { readOnly: true },
              }}
            />
          </Box>
          <Stack direction="row" spacing={2} sx={{ marginLeft: 2 }}>
            <Button variant="contained" onClick={() => setSelectedItem(null)}>
              Clear Form
            </Button>
            <Button variant="contained">Edit</Button>
            <Button variant="contained" onClick={openEquipmentAddDialog}>Add</Button>
            <Button variant="contained">Print</Button>
            <Button variant="contained">Reports</Button>
          </Stack>
        </Box>

        <ItemTable setSelectedRow={grabSelectedRow} />

        {/* EquipmentAddDialog */}
        <EquipmentAddDialog 
          open={equipmentDialogOpen}
          onClose={closeEquipmentAddDialog}
          onSaved={onEquipmentSaved}
          />

          
              

      </Stack>
    </Box>
  );
}
