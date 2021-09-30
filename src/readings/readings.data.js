const { meters } = require("../meters/meters");

const maxMeterReading= 2    // Max Power Usage by any Meter
const maxDataCount= 20 // Max Number of Data Points for a Meter Reading

const hour = 3600; // Seconds in a Hour
const startTime = 1607686125; // Friday, 11 December 2020 11:28:45 GMT+00:00

/**
 * Generates random meter readings in range (0, maxDataCount] with each data point contain:
 * Power usage(kW): meter reading between(0, maxMeterReading) 
 * Time of reading (Epoch timestamp): time in range of (startTime - maxDataCount*hour, startTime) 
 * @returns array of objects with random meter reading & time of reading
 */
const generateSingle = () => {
    const readingsLength = Math.ceil(Math.random() * maxDataCount); 

    return [...new Array(readingsLength)].map((reading, index) => ({
        time: startTime - index * hour,
        reading: Math.random() * maxMeterReading,
    }));
};


/**
 * Generate random (between 0-maxDataCount) readings data points for all meters
 * @returns Key-Value Pair containing meters as key and random reading points as value
 */
const generateAllMeters = () => {
    const readings = {};

    for (const key in meters) {
        if (meters.hasOwnProperty(key)) {
            readings[meters[key]] = generateSingle();
        }
    }

    return readings;
};

const readingsData = generateAllMeters();

module.exports = { readingsData };
