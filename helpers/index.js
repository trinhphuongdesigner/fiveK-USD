const fs = require('fs');

const writeFileSync = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data), function (err) {
    if (err) {

      throw err
    };
    console.log('Saved!');
  });
};

const combineObjects = (obj1, obj2) => {
  const combinedObj = {};

  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && typeof obj1[key] !== "undefined") {
      combinedObj[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && typeof obj2[key] !== "undefined") {
      combinedObj[key] = obj2[key];
    }
  }

  return combinedObj;
};

const generationID = () => Math.floor(Date.now());

const validateSchema = (schema) => async (req, res, next) => { // thực thi việc xác thực
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    },
    {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    console.log('««««« err »»»»»', err);
    return res.status(400).json({ type: err.name, errors: err.errors, provider: "YUP" });
  }
};

module.exports = {
  writeFileSync,
  combineObjects,
  generationID,
  validateSchema,

  asyncForEach: async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index, array); // eslint-disable-line
    }
  },

  getQueryDateTime: (from, to, type = 'IN') => {
    fromDate = new Date(from);
  
    const tmpToDate = new Date(to);
    toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));
  
    let query = {};
  
    if (type === 'IN') {
      const compareFromDate = { $gte: ['$createdDate', fromDate] };
      const compareToDate = { $lt: ['$createdDate', toDate] };
    
      query = {
        $expr: { $and: [compareFromDate, compareToDate] },
      };
    } else {
      const compareFromDate = { $lt: ['$createdDate', fromDate] };
      const compareToDate = { $gt: ['$createdDate', toDate] };
    
      query = {
        $expr: { $or: [compareFromDate, compareToDate] },
      };
    }
  
    return query;
  }  
}