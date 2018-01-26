
const fetch = require('node-fetch')

exports.check = function(url, invocationParameters,  expectedResultData, expectedResultStatus) {

    const checkResult = { // this is the object you need to set and return
        urlChecked: url,
        resultData: null,
        resultStatus: null,
        statusTestPassed: null,
        resultDataAsExpected: null
    }

    var i = 0;
    url += "?";
    for(var name in invocationParameters) {
        url += name + "=" + invocationParameters[name] + "&";
    }

    url = url.substring(0, url.length - 1);

    var fetchObject;

    console.log("url: " + url);
    return fetch(url)
        .then(response =>
            response.json()
        )
        .then(json => {
            console.log(json)

            var compared = compareResults(expectedResultData,json)

            checkResult.resultData = json;
            checkResult.resultDataAsExpected = compared
            console.log(checkResult)
            return checkResult;
        });
}


// funzione che confronta due oggetti semplici e verifica se actual contiene tutti gli attributi di expected, e se per
// questi ha gli stessi valori
function compareResults(expected, actual) {
    if (!expected) return true //always ok if there are no expectations
    if (!actual) return false
    for (let e of Object.keys(expected)) {
        if (actual[e]===undefined || expected[e]!=actual[e]  ) return false
    }
    return true
}

//module.exports = check
