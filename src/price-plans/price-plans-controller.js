const { pricePlans } = require("./price-plans");
const { usageForAllPricePlans } = require("../usage/usage");

/**
 * Compare and recommned best plan for customer
 * @param {*} getReadings 
 * @param {*} req 
 * @returns : 
 */
const recommend = (getReadings, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getReadings(meter)).sort((a, b) => extractCost(a) - extractCost(b))
    if("limit" in req.query) {
        return pricePlanComparisons.slice(0, req.query.limit);
    }
    return pricePlanComparisons;
};

const extractCost = (cost) => {
    const [, value] = Object.entries(cost).find( ([key]) => key in pricePlans)
    return value
}

/**
 * Compare cost for avialble plans in market 
 * @param {*} getData 
 * @param {*} req 
 * @returns : 
 */
const compare = (getData, req) => {
    const meter = req.params.smartMeterId;
    const pricePlanComparisons = usageForAllPricePlans(pricePlans, getData(meter));;
    return {
        smartMeterId: req.params.smartMeterId,
        pricePlanComparisons,
    };
};

module.exports = { recommend, compare };
