import * as states from './states';
import {usaStates} from "typed-usa-states";
import {PlateAvailabilityResponse} from "./states";

export async function getPlateAvailabilityForState(plateText: string, state: string): Promise<PlateAvailabilityResponse> {
    // @ts-ignore (TODO: Tighten!)
    return await states[state](plateText);
}

export async function getPlateAvailability(plateText: string): Promise<PlateAvailabilityResponse[]> {
    return Promise.all(usaStates.map(async s => Object.assign(
        {state: s.name},
        // @ts-ignore (TODO: Tighten!)
        await states[s.name](plateText) as PlateAvailabilityResponse
    )));
}