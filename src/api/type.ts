import type { Type } from "../types/Type";
import api from "./axios";


export const getAllType = async (): Promise<Type[]>=>{
    const {data} = await api.get<Type[]> (`/itemType/`);
    return data;
}


export const createItemType = async (payload: Type): Promise<Type> => {
    const {data} = await api.post<Type> (`/itemType`, payload);
    return data;
}

