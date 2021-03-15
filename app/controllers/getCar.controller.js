const carList = require("../models/cars.model");
const carVariance = require("../models/variance.model");

exports.getCar = function (req, res, next) {
  var pageindex = parseInt(req.query.pageindex) || 1;
  var pagesize = parseInt(req.query?.pagesize) || 10;

  if (pageindex < 0 || pageindex === 0) {
    return res.status(403).send({
      errors: "invalid page number, should start with 1",
    });
  }
  const skip = pagesize * (pageindex - 1);

  // Find some documents
  carList.count({}, async function (err, resultCount) {
    if (err) {
      response = { error: true, message: "Error fetching data" };
    }
    const carData = await carList.find({}).skip(skip).limit(pagesize);
    console.log("🚀 ~ file: getCar.controller.js ~ line 23 ~ carData", carData)

    // Mongo command to fetch all data from collection.

    if (err) {
      response = { error: true, message: "Error fetching data" };
    } else {
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
    }
  });
};
