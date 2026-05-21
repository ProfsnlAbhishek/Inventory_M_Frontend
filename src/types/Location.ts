import type { Building } from "./Building";

export interface Location{
    locationID?: number;
    building: Building;
    cubicle: string;
}