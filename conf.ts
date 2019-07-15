export const config = {
    specs: ['tests/**/*.spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    framework: 'jasmine2',
};