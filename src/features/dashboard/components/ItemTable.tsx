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
  {field: "invoice_no", headerName:"Invoice Number", width: 250}
];

export default function ItemTable({ setSelectedRow }: Props) {
  const dummyItems: Item[] = [
    {
      itemID: 1,
      type: {
        typeID: 101,
        type: "Laptop",
        mfgr: "Dell",
        model: "Latitude 7420",
      },
      invoice_no: 5001,
      disposal: "No",
      disposal_date: "",
      purchased: "2025-01-15",
      verify_by: "John Smith",
      verify_time: "2025-05-10 09:30 AM",
      amount: 1450,
      po: 90011,
      serial_number: "DL7420-ABC123",
      locationID: 1,
      vendor: "CDW",
      comments: "Assigned to engineering team",
    },

    {
      itemID: 2,
      type: {
        typeID: 102,
        type: "Monitor",
        mfgr: "LG",
        model: "UltraWide 34WN80C",
      },
      invoice_no: 5002,
      disposal: "No",
      disposal_date: "",
      purchased: "2024-11-03",
      verify_by: "Sarah Johnson",
      verify_time: "2025-05-11 11:15 AM",
      amount: 799,
      po: 90012,
      serial_number: "LG34W-XY987",
      locationID: 2,
      vendor: "Best Buy Business",
      comments: "Installed in conference room",
    },

    {
      itemID: 3,
      type: {
        typeID: 103,
        type: "Printer",
        mfgr: "HP",
        model: "LaserJet Pro M404",
      },
      invoice_no: 5003,
      disposal: "Yes",
      disposal_date: "2025-02-18",
      purchased: "2022-08-10",
      verify_by: "Michael Brown",
      verify_time: "2025-02-18 03:45 PM",
      amount: 420,
      po: 90013,
      serial_number: "HPM404-ZX456",
      locationID: 3,
      vendor: "Staples",
      comments: "Disposed due to hardware failure",
    },

    {
      itemID: 4,
      type: {
        typeID: 104,
        type: "Desktop",
        mfgr: "Lenovo",
        model: "ThinkCentre M90",
      },
      invoice_no: 5004,
      disposal: "No",
      disposal_date: "",
      purchased: "2025-03-21",
      verify_by: "Emily Davis",
      verify_time: "2025-05-12 01:20 PM",
      amount: 1200,
      po: 90014,
      serial_number: "LNV-M90-7788",
      locationID: 4,
      vendor: "Insight",
      comments: "Finance department workstation",
    },

    {
      itemID: 5,
      type: {
        typeID: 105,
        type: "Tablet",
        mfgr: "Apple",
        model: "iPad Pro 12.9",
      },
      invoice_no: 5005,
      disposal: "No",
      disposal_date: "",
      purchased: "2025-02-01",
      verify_by: "Chris Wilson",
      verify_time: "2025-05-13 10:05 AM",
      amount: 1099,
      po: 90015,
      serial_number: "APL-IPD-1122",
      locationID: 5,
      vendor: "Apple Business",
      comments: "Used for field inspections",
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
