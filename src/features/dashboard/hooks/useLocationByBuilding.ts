import { useQuery } from "@tanstack/react-query";
import { getLocationsByBuilding } from "../../../api/location";
import type { Location } from "../../../types/Location";


export const useLocationsByBuilding = (locationID?: number) => useQuery<Location[]>({
    queryKey: ["location", locationID],
    queryFn: () => getLocationsByBuilding(locationID!),
    enabled: !!locationID,
    
})