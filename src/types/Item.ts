import type { Type } from "./Type";

export interface Item{
 itemID?: number;
 type: Type;
 invoice_no: number;
 disposal: string;
 disposal_date: string;
 purchased: string;
 verify_by: string;
 verify_time: string;
 amount : number;
 po: number;
 serial_number: string;
 locationID: number,
 vendor: string,
 comments: string;
}