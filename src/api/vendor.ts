import type { Vendor } from "../types/Vendor";
import api from "./axios";


export const getAllVendor = async(): Promise<Vendor[]>=>{
    const {data} = await api.get<Vendor[]>(`/vendor/`);
    return data;
}