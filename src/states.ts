import request from 'request-promise-native';
import cheerio from 'cheerio';

export interface PlateAvailabilityResponse {
    available: boolean;
    preview?: string;
    state?: string;
}

export async function alabama(plate: string): Promise<PlateAvailabilityResponse> {
    const available = await request(`https://pros.mvtrip.alabama.gov/api/Plate/Availability?message=${plate}&firstName=&lastName=&isReorder=false&_=1562696560319`);
    return {available};
}

function alaska(plate: string) {
    // https://online.dmv.alaska.gov/DOS/PersonalizedPlate/VerifyPlateAvailability
    // They use a CAPTCHA :(
}

export async function arizona(plate: string): Promise<PlateAvailabilityResponse> {
    const $ = await request({
        uri: `https://servicearizona.com/webapp/vehicle/plates/personalizedChoiceSearch.do`,
        method: 'POST',
        body: {
            plateChoice: '001',
            choice: plate
        },
        transform: function(body: string) {
            return cheerio.load(body);
        }
    });

    let $img = $('img[src="images/001.gif"]');
    if ($img.toArray().length) {
        return {
            available: true,
            // TODO: This is not right - it gives a preview either way
            preview: $img.attr('src')
        }
    } else {
        return {
            available: false
        }
    }
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