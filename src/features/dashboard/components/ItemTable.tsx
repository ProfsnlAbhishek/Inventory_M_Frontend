import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

import type { Item } from "../../../types/Item";

type Props = {
  setSelectedRow: (row: Item) => void;
};

const equipmentCols: GridColDef<Item>[] = [
  { field: "itemID", headerName: "ID", width: 80 },
  {
    field: "equipment",
    headerName: "Type",
    width: 200,
    valueGetter: (_, row) => `${row.type.mfgr} ${row.type.model}`,
  },
  {field: "inv_no", headerName:"Inventory Number", width: 250}
];

export default function ItemTable({ setSelectedRow }: Props) {
 const dummyItems: Item[] = [
  {
    itemID: 1,
    type: {
      typeID: 1,
      type: "Laptop",
      mfgr: "Dell",
      model: "Latitude 7420",
      comments: "Business-grade laptop for engineering staff",
    },
    inv_no: "5001",
    disposal: "No",
    disposal_dt: null,
    purchased: "2025-01-15",
    verified_by: "John Smith",
    verif_time: "2025-05-10 09:30 AM",
    amount: 1450,
    po: "90011",
    sn_no: "DL7420-ABC123",
    location: {
      locationID: 1,
      building: {
        bldgID: 1,
        bldgNo: "ENG",
        bldgName: "Engineering Building",
      },
      cubicle: "ENG-201A",
    },
    vendor: "CDW",
    comments: "Assigned to backend engineering team",
  },

  {
    itemID: 2,
    type: {
      typeID: 2,
      type: "Monitor",
      mfgr: "LG",
      model: "UltraWide 34WN80C",
      comments: "Ultra-wide monitor for conference rooms",
    },
    inv_no: "5002",
    disposal: "No",
    disposal_dt: null ,
    purchased: "2024-11-03",
    verified_by: "Sarah Johnson",
    verif_time: "2025-05-11 11:15 AM",
    amount: 799,
    po: "90012",
    sn_no: "LG34W-XY987",
    location: {
      locationID: 2,
      building: {
        bldgID: 2,
        bldgNo: "ADM",
        bldgName: "Administration Building",
      },
      cubicle: "CONF-01",
    },
    vendor: "Best Buy Business",
    comments: "Conference room display unit",
  },

  {
    itemID: 3,
    type: {
      typeID: 3,
      type: "Printer",
      mfgr: "HP",
      model: "LaserJet Pro M404",
      comments: "Office laser printer",
    },
    inv_no: "5003",
    disposal: "Yes",
    disposal_dt: "2025-02-18",
    purchased: "2022-08-10",
    verified_by: "Michael Brown",
    verif_time: "2025-02-18 03:45 PM",
    amount: 420,
    po: "90013",
    sn_no: "HPM404-ZX456",
    location: {
      locationID: 3,
      building: {
        bldgID: 3,
        bldgNo: "OPS",
        bldgName: "Operations Center",
      },
      cubicle: "OPS-15",
    },
    vendor: "Staples",
    comments: "Removed due to hardware failure",
  },

  {
    itemID: 4,
    type: {
      typeID: 4,
      type: "Desktop",
      mfgr: "Lenovo",
      model: "ThinkCentre M90",
      comments: "Finance department workstation",
    },
    inv_no: "5004",
    disposal: "No",
    disposal_dt: null,
    purchased: "2025-03-21",
    verified_by: "Emily Davis",
    verif_time: "2025-05-12 01:20 PM",
    amount: 1200,
    po: "90014",
    sn_no: "LNV-M90-7788",
    location: {
      locationID: 4,
      building: {
        bldgID: 4,
        bldgNo: "FIN",
        bldgName: "Finance Building",
      },
      cubicle: "FIN-304",
    },
    vendor: "Insight",
    comments: "Used by accounting department",
  },

  {
    itemID: 5,
    type: {
      typeID: 5,
      type: "Tablet",
      mfgr: "Apple",
      model: "iPad Pro 12.9",
      comments: "Field inspection tablet",
    },
    inv_no: "5005",
    disposal: "No",
    disposal_dt: null,
    purchased: "2025-02-01",
    verified_by: "Chris Wilson",
    verif_time: "2025-05-13 10:05 AM",
    amount: 1099,
    po: "90015",
    sn_no: "APL-IPD-1122",
    location: {
      locationID: 5,
      building: {
        bldgID: 5,
        bldgNo: "FS",
        bldgName: "Field Services",
      },
      cubicle: "FS-110",
    },
    vendor: "Apple Business",
    comments: "Used by field inspection team",
  },
];
  return (
    <Paper sx={{ height: 700, width: "49%" }}>
      <DataGrid
        rows={dummyItems ?? []}
        columns={equipmentCols}
        getRowId={(row) => row.itemID!}
        onRowClick={({ row }) => setSelectedRow(row)}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
