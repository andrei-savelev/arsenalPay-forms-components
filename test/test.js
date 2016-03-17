var assert = require('chai').assert;
var should = require('chai').should;
var utils = require('../src/js/utils/utils');

import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Phone from '../src/js/components/phone-form.jsx';

describe('UTILS >', function(){
    describe('getOnlyNumbers > ', function(){
        it('method exist', function () {
            assert( utils.getOnlyNumbers );
        });

        it('should return only numbers', function () {
            var numbers = utils.getOnlyNumbers( 'some123' );
            assert.equal( numbers, 123 );
        });
    });

    describe('upperCase > ', function () {
        it('method exist', function () {
            assert( utils.upperCase );
        });

        it('should return a upperCase', function () {
            var target = {
                value: 'test'
            };

            expect( utils.upperCase(target.value) ).to.equal( 'TEST' )
        })
    });

    describe('cardFromNumber > ', function () {
        it('method exist', function () {
            assert( utils.getCard )
        });

        it('should return mastercard', function () {
            expect( utils.getCard( 5444870724493746 ).type ).to.equal( 'mastercard' );
        });

        it('should be maestro', function () {
            expect( utils.getCard( 6777060877427221 ).type).to.equal( 'maestro' );
        });
    });

    describe('luhnCheck > ', function () {
        it('method exist', function () {
            assert( utils.luhnCheck );
        });

        it('luhn test should be passed', function () {
            expect( utils.luhnCheck( 6777060877427221 ) ).to.equal(true);
        })
    });
});
