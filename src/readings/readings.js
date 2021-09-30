/**
 * In memory storage for storing/retrieving meter readings
 * @param {*} data: test data to begin app
 * @returns: stored readings for meter with id: meterId
 */
const readings = (data) => ({
    // Return all readings for meterId else empty array
    getReadings: (meterId) => data[meterId] || [],

    // Append & return new readings with existing meter reading
    setReadings: (meterId, readings) => {
        const currentReadings = data[meterId];
        data[meterId] = [...currentReadings, ...readings];
        return data[meterId];
    },
});

module.exports = { readings };
