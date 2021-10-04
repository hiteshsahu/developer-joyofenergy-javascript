const { meters } = require("../meters/meters");

// Meter Reading
const maxMeterReading= 2    // Max Power Usage by any Meter
const maxDataCount= 20 // Max Number of Data Points for a Meter Reading

// Time
const hour = 3600; // Seconds in a Hour
//@deprecated: Replaced Original Time Stamp usd for testing : 1607686125 with real time value
const originalTimeStamp = new Date("Friday, 11 December 2020 11:28:45 GMT+00:00") 
const startTime =  Date.now()  // real time data
console.log("Using Start Time: "+ new Date(startTime))

// Original Value used Real time now
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
