import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

import type { Item } from "../../../types/Item";
import { useItemAll } from "../hooks/useItemAll";

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
 
  const {data: allItems, isLoading: itemsLoading} = useItemAll();


  return (
    <Paper sx={{ height: 700, width: "49%" }}>
      <DataGrid
        rows={allItems ?? []}
        columns={equipmentCols}
        loading={itemsLoading}
        getRowId={(row) => row.itemID!}
        onRowClick={({ row }) => setSelectedRow(row)}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        pageSizeOptions={[10, 20]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
