var mockData = require('./mock-data.json'),
    _ = require('underscore');

exports.setHeaders = function(res) {
    _.each(mockData['headers'], function(header) {
        res.setHeader(header.name, header.value);
    });
};

exports.getItems = function(name) {
    if (name) {
        return mockData[name];
    }
};

exports.generateUUID = function() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

exports.getHelper = function(id, collection) {
    return _.findWhere(collection, { id: id});
};

exports.updateHelper = function(id, overrides, collection) {
    var i = _.findIndex(collection, function(j) {
        return j.id === id;
    });

    if (i >= 0) {
        return _.extend(collection[i], overrides);
    }
};

exports.createHelper = function(newItem, collection) {
    collection.push(newItem);

    return newItem;
};

exports.deleteHelper = function(id, collection) {
    var getJobIndex = function() {
          return _.findIndex(collection, function(j) {
              return j.id === id;
          });
      },
      i = getJobIndex();

    if (i >= 0) {
        collection.splice(i, 1);
        return getJobIndex() < 0;
    }
};
