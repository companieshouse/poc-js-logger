require("mocha");
const proxyquire = require("proxyquire");
const chai = require("chai");
const expect = chai.expect;

describe("#createLogger", function () {

    const testNamespace = "my-namespace";

    const createHumanConfig = function (level) {
        return {
            level: level,
            humanReadable: true
        };
    };

    const createLoggerWithTestConfig = function (config) {
        return proxyquire("../lib/createLogger", {
            "./config": config,
            "./formatters/humanFormatter": function () {
                return "human formatter";
            },
            "./formatters/jsonFormatter": function () {
                return "json formatter";
            }
        })({
            namespace: testNamespace
        });
    };

    // beforeEach(function () {
    //     logger = createLoggerWithTestConfig({
    //         namespace: testNamespace
    //     });
    // });

    it("has the log level supplied to it", function () {

        const traceConfig = createHumanConfig("trace");
        const traceLogger = createLoggerWithTestConfig(traceConfig);

        const debugConfig = createHumanConfig("debug");
        const debugLogger = createLoggerWithTestConfig(debugConfig);

        const infoConfig = createHumanConfig("info");
        const infoLogger = createLoggerWithTestConfig(infoConfig);

        const requestConfig = createHumanConfig("request");
        const requestLogger = createLoggerWithTestConfig(requestConfig);

        const errorConfig = createHumanConfig("error");
        const errorLogger = createLoggerWithTestConfig(errorConfig);

        expect(traceLogger.level).to.equal("trace");
        expect(debugLogger.level).to.equal("debug");
        expect(errorLogger.level).to.equal("error");
        expect(infoLogger.level).to.equal("info");
        expect(requestLogger.level).to.equal("request");
    });

    it("has selects the human formatter if humanReadable is true", function () {

        const humanLogger = createLoggerWithTestConfig(createHumanConfig("trace"));

        expect(humanLogger._readableState.pipes.format).to.equal("human formatter");
    });
});
