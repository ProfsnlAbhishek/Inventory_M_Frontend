import { useQuery } from "@tanstack/react-query";
import { getAllBuilding } from "../../../api/building";
import type { Building } from "../../../types/Building";

export const useBuildingAll = () => useQuery<Building[]>({
    queryKey: ["buildings"],
    queryFn: () => getAllBuilding(),
})


