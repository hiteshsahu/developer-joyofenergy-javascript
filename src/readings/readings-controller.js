/**
 * Read readings for meter under @param req using strategy @param getData
 * @param {*} getData: way to retrieve Data
 * @param {*} req 
 * @returns list of meter readings
 */
const read = (getData, req) => {
    const meter = req.params.smartMeterId;
    return getData(meter);
};

/**
 * Store readings of meter under @param req using strategy @param setData
 * @param {*} setData: way to store Data
 * @param {*} req 
 * @returns list of meter readings with old & new data
 */
const store = (setData, req) => {
    const data = req.body;
    return setData(data.smartMeterId, data.electricityReadings);
};

module.exports = { read, store };
