import type { Location } from "../types/Location";
import api from "./axios";


export const getLocationsByBuilding = async (id: number): Promise<Location[]> => {
    const {data} = await api.get<Location[]>(`/location/bldg/${id}`);
    return data;
}