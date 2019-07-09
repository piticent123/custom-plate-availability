const customPlateAvailability = require('../lib');

test('Availability for all works', async () => {
    // This will get done when all the states are in
});

test('Availability for one state works', async () => {
    const ohioHello = await customPlateAvailability.getPlateAvailabilityForState('hello', 'ohio');
    expect(ohioHello.available).toBe(false);
});