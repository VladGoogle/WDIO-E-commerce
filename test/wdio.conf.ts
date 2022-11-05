import type { Options } from '@wdio/types'
import * as commands from './commands'
import * as video from 'wdio-video-reporter'
import {join} from 'path'
import {allure} from 'allure-commandline'

export const config: Options.Testrunner = {

    before(capabilities, specs) {
        Object.keys(commands).forEach(key=>{
            browser.addCommand(key, commands[key])
        })
    },

    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise<void>((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: './tsconfig.json'
        }
    },
    specs: [
        './test/specs/**/*.ts'
    ],
    "suites": {
        end2end: [
                "./test/specs/e2e/*.e2e.ts"
        ]
    },
    exclude: [],
    maxInstances: 14,
    capabilities: [{
        maxInstances: 2,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                // "--user-data-dir=C:/Users/xukin/AppData/Local/Google/Chrome/User Data/Profile 1",
                // "--profile-directory=Profile 6"
            ]
        },
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://magento.softwaretestingboard.com/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver','firefox-profile','crossbrowsertesting','rerun',
        ['image-comparison',
            // The options
            {
                // Some options, see the docs for more
                baselineFolder: join(process.cwd(), './baselineImages/sauceLabsBaseline/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), './actualImages/'),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                clearRuntimeFolder: true,
                blockOutToolBar: true,
                isHybridApp: true,
                tabbableOptions:{
                    circle:{
                        size: 18,
                        fontSize: 18,
                        // ...
                    },
                    line:{
                        color: 'red', // hex-code or for example words like `red|black|green`
                        width: 3,
                    },
                }
            }],
    ],
    reporters: [
        [video, {
        saveAllVideos: true,
        videoSlowdownMultiplier: 3,
            outputDir: './test/videos'
    }],
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        ['spec', {
            symbols: {
                passed: '[PASS]',
                failed: '[FAIL]',
            },
        }],
        'dot',
        ['junit', {
            outputDir: 'junit-reports',
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 999999999
    },
}
