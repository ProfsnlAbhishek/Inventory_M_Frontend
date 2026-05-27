import type { Location } from "./Location";
import type { Type } from "./Type";

export interface Item {
  itemID?: number;
  type: Type;
  inv_no: string;
  disposal?: string;
  disposal_dt?: string | null;
  purchased?: string;
  verif_time?: string;
  verified_by?: string;
  amount: number;
  po: string;
  sn_no?: string;
  location: Location;
  emp_at_loca: string;
  vendor: string;
  comments?: string;
}

export type ItemInput = Omit<Item, `itemID`>;

export interface AddItem {
  itemID?: number;
  typeID: number;
  inv_no: string;
  purchased?: string;
  amount: number;
  po: string;
  sn_no?: string;
  vendor: string;
  comments?: string;
  verif_time?: string | null;
  verified_by?: string | null;
  locationID: number;
  disposal?: string | null;
  disposal_dt?: string | null;
  total_units: number;
}

export type AddItemInput = Omit<AddItem, `itemID`>;
