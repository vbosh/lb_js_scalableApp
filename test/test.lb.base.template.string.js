/*
 * test.lb.base.template.string.js - Unit Tests of lb.base.template.string
 *
 * Author:    Eric Bréchemier <legalbox@eric.brechemier.name>
 * Copyright: Legal-Box (c) 2010-2011, All Rights Reserved
 * License:   BSD License - http://creativecommons.org/licenses/BSD/
 * Version:   2011-01-11
 *
 * Based on Test Runner from bezen.org JavaScript library
 * CC-BY: Eric Bréchemier - http://bezen.org/javascript/
 */

/*requires lb.base.template.string.js */
/*jslint white:false, onevar:false, plusplus:false */
/*global lb, bezen, window */
(function() {
  // Builder of
  // Closure object for Test of lb.base.template.string

  // Define aliases
      /*requires bezen.assert.js */
  var assert = bezen.assert,
      /*requires bezen.object.js */
      object = bezen.object,
      /*requires bezen.testrunner.js */
      testrunner = bezen.testrunner,
      /*requires bezen.dom.js*/
      element = bezen.dom.element;

  function testNamespace(){

    assert.isTrue( object.exists(window,'lb','base','template','string'),
                           "lb.base.template.string namespace was not found");
  }

  function testWithValuesFrom(){
    var ut = lb.base.template.string.withValuesFrom;

    var filter = ut();
    assert.equals( typeof ut, 'function',
                                  "function getter expected to be returned");
    assert.equals( filter('param'), null,
                             "no replacement value expected (missing data)");

    filter = ut({param: 'value'});
    assert.equals( filter('param'), 'value',
                                "replacement value expected (single value)");
    assert.equals( filter('other'), null,
        "no replacement value expected for missing property (single value)");

    filter = ut({
      section:{
        subsection:{
          param: 'nestedValue'
        }
      }
    });
    assert.equals( filter('section.subsection.param'), 'nestedValue',
      "replacement value expected for nested property (single nested value)");
    assert.equals( filter('other'), null,
  "no replacement value expected for missing property (single nested value)");
  }

  function testReplaceParams(){
    var ut = lb.base.template.string.replaceParams;

    assert.equals( ut(), null,
                            "null expected when required getter is missing");

    var captured = [];
    var returnValues = [];
    function captureParams(key){
      captured.push(key);
      return returnValues.pop();
    }

    var filter = ut(captureParams);
    assert.equals( typeof filter, 'function',
                              "a filter function is expected to be returned");

    var noParam = 'No param to replace';
    assert.equals( filter(noParam), noParam,
                              "no change expected without params to replace");
    assert.arrayEquals(captured, [],
                      "no call to getter expected without params to replace");

    var noParamReally = 'No #param, #here!#really$#';
    assert.equals( filter(noParamReally), noParamReally,
                      "no change expected without params to replace, really");
    assert.arrayEquals(captured, [],
              "no call to getter expected without params to replace, really");

    var rangeParam = '#abc-xyz_ABC-XYZ_0-9#';
    captured = [];
    returnValues = ['value'];
    assert.equals( filter(rangeParam), 'value',
                                       "replacement expected for parameter "+
                                    "with large range of characters in name");
    assert.arrayEquals(captured, ['abc-xyz_ABC-XYZ_0-9'],
      "param name with large range of characters expected in call to getter");

    var nestedParam = '#a.b.c.d#';
    captured = [];
    returnValues = ['value'];
    assert.equals( filter(nestedParam),'value',
                              "replacement expected for nested param value");
    assert.arrayEquals(captured,['a.b.c.d'],
                              "dotted param nam expected in call to getter");

    var paramInText = 'Before #param# after';
    captured = [];
    returnValues = ['value'];
    assert.equals( filter(paramInText), 'Before value after',
                               "parameter in text expectec to be replaced");
    assert.arrayEquals(captured,['param'],
                        "name of param in text expected in call to getter");

    var missingParam = '#missing#';
    captured = [];
    returnValues = [null];
    assert.equals( filter(missingParam), missingParam,
                          "missing parameter expected to be left unreplaced");
    assert.arrayEquals(captured,['missing'],
                          "name of missing param expected in call to getter");

    var multipleParams = 'Before#param1##param2##param3#After';
    captured = [];
    returnValues = [';value1;','',';value3'];
    assert.equals( filter(multipleParams), 'Before;value1;;value3;After',
        "multiple parameters expected to be replaced, including empty string");
    assert.arrayEquals(captured,['param1','param2','param3'],
                "multiple parameters expected in sequence in calls to getter");
  }

  var tests = {
    testNamespace: testNamespace,
    testWithValuesFrom: testWithValuesFrom,
    testReplaceParams: testReplaceParams
  };

  testrunner.define(tests, "lb.base.template.string");
  return tests;

}());
