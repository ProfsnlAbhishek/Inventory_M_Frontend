import { useQuery } from "@tanstack/react-query";
import { getAllType } from "../../../api/type";
import type { Type } from "../../../types/Type";

export const useItemTypeAll = () => useQuery<Type[]>({
    queryKey: ["itemType"],
    queryFn: () => getAllType(),
})