'use strict';

const Keyv = require('keyv');

// instantiate key value store
const keyv = new Keyv();
//const keyv = new Keyv('redis://user:pass@localhost:6379');
//const keyv = new Keyv('mongodb://user:pass@localhost:27017/dbname');
//const keyv = new Keyv('sqlite://path/to/database.sqlite');
//const keyv = new Keyv('postgresql://user:pass@localhost:5432/dbname');
//const keyv = new Keyv('mysql://user:pass@localhost:3306/dbname');

// Handle DB connection errors
//keyv.on('error', err => console.log('Connection Error', err));

//await keyv.set('foo', 'expires in 1 second', 1000); // true
//await keyv.set('foo', 'never expires'); // true
//await keyv.get('foo'); // 'never expires'
//await keyv.delete('foo'); // true
//await keyv.clear(); // undefined


/**
 * Get tab configuration for particualr user
 * Return array of tabs
 *
 * userId String return array of tabs
 * returns String
 **/
exports.userApiUserIdGET = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    
    keyv.get(userId).then (function(results){
     
      if (typeof results == "undefined" ) {
        console.log("tabConf undefine")
        examples['application/json'] = "[{\"position\": 0, \"id\": \"1\", \"title\": \"Home\", \"rows\": []}]";
        keyv.set(userId, examples);
     } else {
        console.log("tabconf defined")
        console.log(results);
        examples = results;
    
     }

     if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }

    })
    
  });
}


/**
 * Update tab configuration for particualr user
 * Save array of tabs and return result tabs
 *
 * userId String return array of tabs
 * tabconfig String 
 * returns String
 **/
exports.userApiUserIdPOST = function(userId,tabconfig) {
  return new Promise(function(resolve, reject) {

    keyv.set(userId, tabconfig);

    var examples = {};
    examples['application/json'] = tabconfig;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

