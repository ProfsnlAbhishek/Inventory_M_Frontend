import type { Building } from "../types/Building";
import api from "./axios";


export const getAllBuilding = async (): Promise<Building[]> => {
    const {data} = await api.get<Building[]>(`/building/`);
    return data;
}
