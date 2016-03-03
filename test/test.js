var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should;
var utils = require('../src/js/utils/utils');

describe('UTILS >', function(){
    describe('getOnlyNumbers', function(){
        it('method exist', function () {
            assert(utils.getOnlyNumbers);
        });

        it('should return only numbers', function () {
            var numbers = utils.getOnlyNumbers('some123');
            assert.equal(numbers, 123);
        });
    });

    describe('upperCase', function () {
        it('method exist', function () {
            assert(utils.upperCase);
        });

        it('should return a upperCase', function () {
            var target = {
                value: 'test'
            };

            expect(utils.upperCase(target)).to.equal('TEST')
        })
    });
});
