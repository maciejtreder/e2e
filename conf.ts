import * as jasmineReporters from 'jasmine-reporters';
import * as fs from 'fs-extra';
import * as htmlReporter from 'protractor-html-reporter-2';
import { browser } from 'protractor';

const request = require('sync-request');


const gridInstances: string[] = process.env.grid ? [process.env.grid] : [
    'http://localhost:4444',
    'http://otherGrid.com',
    'http://yetAnotherSelenium.com:4444'
];

function getFirstAvailableInstance(): string {
    let availableGrid;
    gridInstances.forEach(address => {
        try {
            let res = request('GET', `${address}/wd/hub`);
            if (res.statusCode === 200) {
                availableGrid = `${address}/wd/hub`;
            }
        } catch(e) {}
    });
    if (availableGrid) 
        return availableGrid;
    throw new Error('No grid instance available');
}


export const config = {
    specs: ['tests/**/*.spec.js'],
    capabilities: {
        'browserName': process.env.browser ? process.env.browser : 'chrome'
    },
    seleniumAddress: getFirstAvailableInstance(),
    framework: 'jasmine2',

    onPrepare: () => {
        fs.emptyDir('./reports/xml/', console.log);
        fs.emptyDir('./reports/screenshots/', console.log);

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            savePath: './reports/xml/',
            filePrefix: 'xmlresults',
            consolidateAll: true
        }));

        jasmine.getEnv().addReporter({
            specDone: result => {
                browser.getCapabilities().then(capabilities => {
                    const browserName = capabilities.get('browserName');

                    browser.takeScreenshot().then(png => {
                        const stream = fs.createWriteStream(`./reports/screenshots/${browserName}-${result.fullName}.png`);
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                });
            }
        });
    },
    onComplete: () => {
        const capabilities$ = browser.getCapabilities();

        capabilities$.then(capabilities => {
            const testConfig = {
                reportFile: 'Protractor Test Execution Report',
                outputPath: './reports/',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: capabilities.get('browserName'),
                browserVersion: capabilities.get('version'),
                testPlatform: capabilities.get('platform'),
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: false
            };
            new htmlReporter().from('./reports/xml/xmlresults.xml', testConfig);
        });
    }
};
