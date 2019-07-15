"use strict";
exports.__esModule = true;
exports.config = {
    specs: ['tests/**/*.spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2'
};
