Package.describe({
  name: 'cfs:data-man',
  version: '0.0.1',
  summary: 'A data manager, allowing you to attach various types of data and get it back in various other types',
  git: 'https://github.com/CollectionFS/Meteor-data-man.git'
});

Npm.depends({
  mime: "1.2.11",
  'buffer-stream-reader': "0.1.1",
  //request: "2.44.0",
  // We use a specific commit from a fork of "request" package for now; we need fix for
  // https://github.com/mikeal/request/issues/887 (https://github.com/CollectionFS/Meteor-CollectionFS/issues/347)
  request: "https://github.com/aldeed/request/tarball/259bcd6206d0ad994972c5cd0c0803d6f6d2ca2f",
  temp: "0.7.0" // for tests only
});

Package.on_use(function(api) {
  api.versionsFrom('METEOR@0.9.1');

  api.use(['ejson']);

  api.use(['cfs:filesaver@0.0.0'], {weak: true});

  api.export('DataMan');

  api.add_files([
    'client/Blob.js', //polyfill for browsers without Blob constructor; currently necessary for phantomjs support, too
    'client/data-man-api.js'
  ], 'client');

  api.add_files([
    'server/data-man-api.js',
    'server/data-man-buffer.js',
    'server/data-man-datauri.js',
    'server/data-man-filepath.js',
    'server/data-man-url.js',
    'server/data-man-readstream.js'
  ], 'server');

});

Package.on_test(function (api) {
  api.use(['cfs:data-man', 'http', 'tinytest', 'test-helpers', 'cfs:http-methods@0.0.24']);

  api.add_files(['tests/common.js', 'tests/client-tests.js'], 'client');
  api.add_files(['tests/common.js', 'tests/server-tests.js'], 'server');
});
