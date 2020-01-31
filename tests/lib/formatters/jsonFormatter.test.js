require("mocha");
const chai = require("chai");
const expect = chai.expect;

const jsonFormatter = require("../../../lib/formatters/jsonFormatter");

describe("#jsonFormatter", function () {

    const testNamespace = "my-namespace";

    let formatter;

    const getLog = function (testInfo) {
        return JSON.parse(formatter.template(testInfo));
    };

    beforeEach(function () {
        formatter = jsonFormatter(testNamespace);
    });

    it("shows the message passed in", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test"
        };

        const log = getLog(testInfo);

        expect(log.event).to.equal(testInfo.level);
        expect(log.data.message).to.equal(testInfo.message);
    });

    it("prints only possible keys", function () {

        const testInfo = {
            level: "info",
            message: "This is a great test",
            path: "/dog-pictures",
            method: "PATCH",
            status: 200,
            duration: 43
        };

        const log = getLog(testInfo);

        const actualNumKeysWithDataKey = Object.keys(log).length + Object.keys(log.data).length;
        const expectedNumKeysWithDataKey = 9;

        expect(actualNumKeysWithDataKey).to.equal(expectedNumKeysWithDataKey);
        expect(log.created).to.not.equal(undefined);
        expect(log.namespace).to.equal(testNamespace);
        expect(log.event).to.equal(testInfo.level);
        expect(log.data.message).to.equal(testInfo.message);
        expect(log.data.path).to.equal(testInfo.path);
        expect(log.data.method).to.equal(testInfo.method);
        expect(log.data.status).to.equal(testInfo.status);
        expect(log.data.duration).to.equal(testInfo.duration);
    });

    it("doesn't print undefined message keys");

    it("doesn't handle keys which are not in the spec");

    it("adds a created date and namespace");
});
