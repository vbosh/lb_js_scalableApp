/*
 * Namespace: lb.base.dom
 * DOM (Document Object Model) Adapter Module for Base Library
 *
 * Author:
 * Eric Bréchemier <legalbox@eric.brechemier.name>
 *
 * Copyright:
 * Legal Box (c) 2010, All Rights Reserved
 *
 * Version:
 * 2010-05-14
 */
/*requires lb.base.js */
/*requires closure/goog.dom.js */
/*jslint nomen:false, white:false, onevar:false, plusplus:false */
/*global lb, goog */
// preserve the module, if already loaded
lb.base.dom = lb.base.dom || (function() {
  // Builder of
  // Closure for lb.base.dom module

  // Declare aliases
  var dom = goog.dom;

  function $(id){
    // Function: $(id): Element
    // An alias for document.getElementById(id).
    //
    // Parameter:
    //   id - string, the identifier of an HTML element
    //
    // Returns:
    //   Element, the DOM element with given id, if present in the document,
    //   null otherwise
    //
    // Note:
    // "Behavior is not defined if more than one element has this ID"
    //
    // DOM Level 2 Core
    // <http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-getElBId>

    //
    return dom.$(id);
  }

  return { // public API
    $:$
  };
}());
