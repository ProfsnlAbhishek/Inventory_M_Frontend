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
  vendor: string;
  comments?: string;
}


export interface AddItem{
 itemID?: number;
 typeID: number;
 inv_no: number;
 purchased?: string;
 amount : number;
 po: number;
 sn_no?: string;
 locationID: number,
 vendor: string,
 comments?: string;
}


