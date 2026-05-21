import type { Item } from "../types/Item";
import api from "./axios";

export const getAllItem = async (): Promise <Item[]> => {
    const {data} = await api.get<Item[]>(`/item/`);
    return data;
}