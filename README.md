# WebDriverIO Tests for Verivox

# Framework
The tests are located at

.test/specs/dslcalculator.js This test ensures that DSL calculator page is loaded and does several checks for loading different tariffs.
.test/specs/dslcalculatorloadalltariff.js This test ensures that all traiffs can be loaded and it's consecutive checks are asserted.
.test/specs/citiesfrompostcodeapi.js This test ensures that API which fetches cities for given post code works fine.
.test/pageobjects/* contains the elements stored in page object format
.test/httputil/* have http utility class that deals with GET,POST,PUT,DELETE
./test/utils/parse.js class have utility methods that are used to parse api responses

# Run test
Tests are configured to run on circleci. You can use /.circleci/config.yml to setup the job run on circleci.
Please checkout the current build at https://app.circleci.com/pipelines/github/Sumedh31/verivoxauto 

Alternatively to run the tests locally please follow below steps:

1-Download this repo

2- Run
```cmd
cd verivoxauto
```
3- For the first time run
```cmd
npm ci or npm install
```
3- To run a single tests execute
```npx wdio wdio.conf.js --spec ./test/specs/dslcalculator.js```
```npx wdio wdio.conf.js --spec ./test/specs/dslcalculatorloadalltariff.js```
```npx wdio wdio.conf.js --spec ./test/specs/citiesfrompostcodeapi.js```
```npx wdio wdio.conf.js --spec ./test/specs/streetsfrompostcode.js```

To run all test use following command
``` npm run test```

4- After tests are run generate the report using following commands.
``` allure generate```
``` allure open```

Reports from the last run can be found at ./allure-report/index.html

# Room for Improvements:
1:Allure reports artifacts can be pushed to circleci.
2: The API tests are run as a part of wdio test which is not the classiest way to run these tests. They can be run as apart of jasmin or some other framework intsead of wdio.
