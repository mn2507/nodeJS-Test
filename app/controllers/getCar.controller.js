const carList = require("../models/cars.model");
const carVariance = require("../models/variance.model");

exports.getCar = function (req, res) {
  var pageindex = parseInt(req.body.pageindex) || 1;
  var pagesize = parseInt(req.body.pagesize) || 10;
  const skip = pagesize * (pageindex - 1);

  pageindex <= 0
    ? res.status(403).send({
        errors: "Invalid page number, should start with 1",
      })
    : null;

  carList.count({}, async function (err, resultCount) {
    const carData = await carList
      .find(req.body.carname ? { carname: req.body.carname } : {})
      .skip(skip)
      .limit(pagesize);
    err
      ? res.status(403).send({
          errors: "Error fetching data",
        })
      : null;
    const result = await Promise.all(
      carData.map(async (car) => {
        const carVarianceInfo = await carVariance.find({ car_id: car._id });
        return {
          id: car._id,
          carname: car.carname,
          brand: car.brand,
          description: car.description,
          carVarianceInfo,
        };
      })
    );
    var totalPages = Math.ceil(resultCount / pagesize);
    await res.status(200).send({ List: result, totalCount: totalPages });
  });
};
