/**
 * @param {*} readings: list of power readings
 * @returns Average power usage in kw by meter @param readings
 */
const average = (readings) => {
    return (
        readings.reduce((prev, next) => prev + next.reading, 0) /
        readings.length
    );
};

/**
 * @param {*} readings: list of power readings
 * @returns time interval in hours between first and last in meter @param readings
 */
const timeElapsedInHours = (readings) => {
    readings.sort((a, b) => a.time - b.time);
    const seconds = readings[readings.length - 1].time - readings[0].time;
    const hours = Math.floor(seconds / 3600);
    return hours;
};

/**
 * @param {*} readings: list of power readings
 * @returns Average Power usage in KWHour by meter @param readings
 */
const usage = (readings) => {
    return average(readings) / timeElapsedInHours(readings);
};

/**
 * @param {*} readings: list of power readings
 * @param {*} rate: charges per kwH power usage
 * @returns cost of power usage by meter @param readings
 */
const usageCost = (readings, rate) => {
    return usage(readings) * rate;
};


/**
 * Calculate estimated cost for other plans for given meter reading
 * @param {*} pricePlans : avialble price plans
 * @param {*} readings : list of power readings
 * @returns Key Value pair of Plan Name &
 *  estimated cost under that Plan for meter @param readings
 */
const usageForAllPricePlans = (pricePlans, readings) => {
    return Object.entries(pricePlans).map(([key, value]) => {
        let planName = key
        return {
            [planName]: usageCost(readings, value.rate),
        };
    });
};

module.exports = {
    average,
    timeElapsedInHours,
    usage,
    usageCost,
    usageForAllPricePlans,
};
