const express = require("express");
const { readings } = require("./readings/readings");
const { readingsData } = require("./readings/readings.data");
const { read, store } = require("./readings/readings-controller");
const { recommend, compare } = require("./price-plans/price-plans-controller");

const { getReadings, setReadings } = readings(readingsData);

const app = express();
app.use(express.json());

// Below routes Create & Read meter readings
app.post("/readings/store", (req, res) => {
    res.send(store(setReadings, req));
});

app.get("/readings/read/:smartMeterId", (req, res) => {
    res.send(read(getReadings, req));
});

// Below routes Compare and Recommend Connection"`
app.get("/price-plans/recommend/:smartMeterId", (req, res) => {
    res.send(recommend(getReadings, req));
});

app.get("/price-plans/compare-all/:smartMeterId", (req, res) => {
    res.send(compare(getReadings, req));
});

// Show Static site on home
app.use(express.static(__dirname + '/www'));

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`🚀 app listening on port ${port}`);
