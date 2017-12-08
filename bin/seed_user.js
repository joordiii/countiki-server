'use strict';

// READ THIS ON HOW BEST IMPORT DOCUMENTOS TO MONGODB WITH HELP OF MONGOOSE!!!!
// https://stackoverflow.com/a/24848148/4275509

const mongoose = require('mongoose');
const User = require('../models/user').User;
/* const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; */

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/countikidb', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

const fakeUser = [
  {
    organizationName: 'orgName',
    myAddress: 'MyAddress',
    myTelephone: 'Tel',
    myEmail: 'email',
    myWeb: 'myWeb',
    myUsername: 'myUser',
    myPassword: 'myPass',
    photo: 'photo'
  }];

User.insertMany(fakeUser)
  .then(results => console.log(results))
  .then(() => mongoose.connection.close())
  .catch(error => console.log(error));
