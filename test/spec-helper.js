global.SRC = __dirname + '/../src'
global.DEVICE = __dirname + '/../assets/device'

Object.defineProperty(global, 'should', {writable: true});

global.should = require('should');
global.sinon = require('sinon');
