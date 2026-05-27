import { useQuery } from "@tanstack/react-query";
import { getAllItem } from "../../../api/items";
import type { Item } from "../../../types/Item";

export const useItemAll = () =>
  useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: getAllItem,

   
  });