# WebDriverIO Tests for Verivox

# Framework
The tests are located at

.test/specs/dslcalculator.js This test ensures that DSL calculator page is loaded and does several checks for loading different tariffs.
.test/specs/citiesfrompostcodeapi.js This test ensures that API which fetches cities for given post code works fine.
.test/specs/streetsfrompostcode.js This test ensures that API which fetches streets for given city works fine.

.test/pageobjects/* contains the elements stored in page object format
.test/httputil/* have http utility class that deals with GET,POST,PUT,DELETE
./test/utils/parse.js class have utility methods that are used to parse api responses

# Run test
To run the tests:

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
```npx wdio wdio.conf.js --spec ./test/specs/citiesfrompostcodeapi.js```
```npx wdio wdio.conf.js --spec ./test/specs/streetsfrompostcode.js```

All test can be run with
``` npm test```
or ```npx wdio wdio.conf.js```
