import request from 'request-promise-native';
import cheerio from 'cheerio';

export interface PlateAvailabilityResponse {
    available: boolean;
    preview?: string;
}

export async function ohio(plate: string): Promise<PlateAvailabilityResponse> {
    const $ = await request({
        uri: `https://services.dps.ohio.gov/BMVOnlineServices/VR/Availability/Passenger/GetAvailability?vehicleClass=Passenger&newPlate=${plate}&organizationCode=0`,
        transform: function(body: string) {
            return cheerio.load(body);
        }
    });

    // Ohio's API returns an image preview if the plate is available
    let $img = $('img');
    if ($img.toArray().length) {
        return {
            available: true,
            preview: $img.attr('src')
        }
    } else {
        return {
            available: false
        }
    }
}