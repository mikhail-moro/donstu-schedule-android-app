const http = require('http');
const { parse } = require('path');
const hostname = '127.0.0.1';
const port = 3000;
const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const service = new chrome.ServiceBuilder('chromedriver.exe');
const options = new chrome.Options();


class SeleniumParsing {
    constructor() {
        this.driver = new Builder()
            .forBrowser('chrome')
            .setChromeService(service)
            .build();

    }

    previous_parse() {
        options.addExtensions("--disable-extensions");
        options.excludeSwitches("enable-automation");

        this.driver.get("https://api.t-uni.ru/oauth/TDSTU");
    
    };

    async parse(firstdate, seconddate, token, studentID) {
        this.firstdate = firstdate;
        this.seconddate = seconddate;
        this.token = token;
        this.studentID = studentID;

        //options.addExtensions("--disable-extensions");
        //options.excludeSwitches("enable-automation");
/*

hl: ru
TL: AM3QAYZcuU0WcpzaT2aB2em-uA86n6ajyaJEDWV9PRWpQdzhzcdtBg6rR4y0TvIC
_reqid: 284408
rt: j

hl: ru
TL: AM3QAYbbhcYtGCuDir5GtzwxT2Ld395j7cldQKFPfp_JZziO4e62N42OPOaEKUdQ
_reqid: 184957
rt: j

*/


        try {
            await this.driver.executeScript("window.open('https://www.t-uni.ru').focus();")

            await this.driver.sleep(5000);

            await this.driver.executeScript(
                `
                fetch("https://api.t-uni.ru/student/UniKorAcademy/getEvents", {
                    "headers": {
                        "accept": "application/json, text/plain, */*",
                        "content-type": "application/json",
                `
                + '        "sec-ch-ua": "' + '\\' + '\"' + ' Not A;Brand' + '\\' + '\"' + ';v=' + '\\' + '\"' + '99' + '\\' + '\"' + ', ' + '\\' + '\"' + 'Chromium' + '\\' + '\"' + ';v=' + '\\' + '\"' + '100' + '\\' + '\"' + ', ' + '\\' + '\"' + 'Opera GX' + '\\' + '\"' + ';v=' + '\\' + '\"' + '86' + '\\' + '\"' + '",' +
                `
                        "sec-ch-ua-mobile": "?0",
                `
                + '        "sec-ch-ua-platform": "' + '\\' + '\"' + 'Windows' + '\\' + '\"' + '"' +
                `
                    },
                    "referrer": "https://www.t-uni.ru/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                `
                + '   "body": "{' + '\\' + '\"' + 'token' + '\\' + '\"' + ':' + '\\' + '\"' + `${this.token}` + '\\' + '\"' + ',' + '\\' + '\"' + 'fromDate' + '\\' + '\"' + ':' + '\\' + '\"' + '2022-06-03T00:00:00.000+03:00' + '\\' + '\"' + ',' + '\\' + '\"' + 'toDate' + '\\' + '\"' + ':' + '\\' + '\"' + '2022-06-04T23:59:59.999+03:00' + '\\' + '\"' + ',' + '\\' + '\"' + 'studentId' + '\\' + '\"' + ':' + '\\' + '\"' + 'oWEzwotS' + '\\' + '\"' + '}",' +
                `
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "omit"
                })
                .then((data) => (data.json()))
                .then((text) => (console.log(JSON.stringify(text))));
                ` 
            );
        } finally {
            setTimeout(() => {
                this.driver.quit();
            }, 1000000);
        }
    };
};


parsing = new SeleniumParsing();
parsing.previous_parse();

const server = http.createServer((req, res) => {

    res.statusCode = 200;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Access-Control-Allow-Origin, Access-Control-Allow-Headers');

    res.end();
    
    if (req.method == 'POST') {

        const firstdate = "2022-06-02";
        const seconddate = "2022-06-03";
        const studentID = "oWEzwotS";

        `
        req.on('data', function(data) {
            data = data.toString();
            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                token[_data[0]] = _data[1];
            }
            console.log(token);
        })
        `
        var token = "";
        req.on('data', function (chunk) {
            token += chunk;
        });
        req.on('end', async function () {
            
            try {
                await console.log(token);

                await parsing.parse(firstdate, seconddate, token, studentID);

            } finally {
                res.end();
            }    
        });
    }

    //if (req.method == 'GET') {
        //parsing.previous_parse();

    //}
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})


// https://api.t-uni.ru/oauth/TDSTU