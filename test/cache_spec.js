const Cacher = require('../src/utils/cache');
let expect  = require('chai').expect;


describe('cache test', function () {

    it('check function basic', async function () {
        let getData=async function(key) {
            return key+'2';
        };

        const Cache = new Cacher(getData,{maxAge: 1000,max: 10000});
        let testResult = await Cache.get("AA");

        expect(testResult).to.equal("AA2");
    });

    it('check function overload', async function () {
        let getData=async function(key) {
            return '{"utest":"'+key+'"}';
        };

        let overload=function(x) {
            let parsed=JSON.parse(x);
            return parseInt(parsed.utest)+5;
        };

        const Cache = new Cacher(getData,{maxAge: 1000,max: 10000});
        let testResult = await Cache.get("2",overload);

        expect(testResult).to.equal(7);
    });

    it('check function overload to lower', async function () {
        let getData=async function(key) {
            return '{"utest":"'+key+'1"}';
        };
        let overload=function(x) {
            let parsed=JSON.parse(x);
            return parsed.utest.toLowerCase();
        };
        const Cache = new Cacher(getData,{maxAge: 1000,max: 10000});
        let testResult = await Cache.get("A", overload);
        expect(testResult).to.equal("a1");
    });

    it('check function functionality', async function () {
        let numberAdd=1;
        let overLoadFunction=async function(key) {
            key=parseInt(key) + numberAdd;
            return key;
        };
        const Cache = new Cacher(overLoadFunction,{maxAge: 1000,max: 10000});

        let testResultNormal = await Cache.get("1");
        numberAdd=2;
        let testResultTwo = await Cache.get("2");
        let testResultCashed = await Cache.get("1");

        expect(testResultNormal).to.equal(2);
        expect(testResultTwo).to.equal(4);
        expect(testResultCashed).to.equal(2);
    });

});