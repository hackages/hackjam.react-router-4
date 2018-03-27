const request = require('request');
const {runCLI} = require('jest');
const path = require('path');
const {id, email} = require('./hackjamrc.json');

const rootPath = __dirname;

const options = {
  projects: [rootPath],
  silent: true,
  json: true,
};

const createJestConfig = require('react-scripts/utils/createJestConfig.js');
const jestConfig = createJestConfig(function (relativePath) {
  return path.resolve(path.join(rootPath, 'node_modules/react-scripts'), relativePath);
}, rootPath);

jestConfig.testEnvironment = 'jsdom';

options.config = JSON.stringify(jestConfig);

runCLI(options, options.projects, (results) => {
  const {numPassedTests, numTotalTests} = results;
  request.post({
    uri: `https://us-central1-hackjam-timer.cloudfunctions.net/hackTests/${id}`,
    method: 'POST',
    json: {
      results: {
        numPassedTests,
        numTotalTests,
      },
      email
    }
  })
});
