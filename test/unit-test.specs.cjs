/**
 * To generate tests for ESM:
 * $> npm run build:test
 */
const {expect} = require("chai");

/** to-esm-esm: remove **/
const {getIps, getIpList, findIp} = require("../cjs/index.cjs");
/** to-esm-esm: end-remove **/

/** to-esm-esm: add
 import {getIps, getIpList, findIp} from "../esm/index.mjs";
 **/


describe("On cjs/index.cjs", () =>
{
    describe("The function getIps", () =>
    {
        it("should return an ip", async () =>
        {
            const ips = getIps();
            expect(Object.keys(ips).length).to.be.greaterThan(0);
        });
    });

    describe("The function getIpList", () =>
    {
        it("should return a list of ips", async () =>
        {
            const ips = getIpList();
            expect(ips.length).to.be.greaterThan(0);
        });
    });

    describe("The function getLocalIp", () =>
    {
        it("should return an ip", async () =>
        {
            const localIp = findIp();
            expect(localIp).to.match(/\d+\.\d+\.\d+\.\d+/);
        });
    });

});