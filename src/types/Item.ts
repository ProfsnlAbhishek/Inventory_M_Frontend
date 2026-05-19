import type { Type } from "./Type";

export interface Item{
 itemID?: number;
 type: Type;
 inv_no: number;
 disposal?: string;
 disposal_dt?: string;
 purchased?: string;
 verif_time?: string;
 verif_by?: string;
 amount : number;
 po: number;
 sn_no?: string;
 locationID: number,
 vendor: string,
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


