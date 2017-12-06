'use stric';

// READ THIS ON HOW BEST IMPORT DOCUMENTOS TO MONGODB WITH HELP OF MONGOOSE!!!!
// https://stackoverflow.com/a/24848148/4275509

const mongoose = require("mongoose");
const Event = require('../models/event').Event;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/countikidb", {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const fakeEvent = [
{
  
    slogan: "Fake Slogan",
    startDate: new Date(),
    endDate: new Date(),
    location: {
      latitude: "41.591158899999996",
      longitude: "1.5208624"
    },
    description: "Fake Description",
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    attendance : [{
      lat : "41.591158899999996",
      lng : "1.5208624"
      ,
      lat : "41.641158899999996",
      lng : "1.6708624"
      ,
      lat : "42.591158899999996",
      lng : "1.5208624"
      ,
      lat : "41.941158899999996",
      lng : "1.5708624"
      }]
  }
]



Event.insertMany(events)
  .then(results => console.log(results))
  .then(() => mongoose.connection.close())
  .catch(error => console.log(error));
