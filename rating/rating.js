(function ($) {
  'use strict';

  $.fn.rating = function (options) {
    var elementClasses = {
      starWrapper: 'star-element-wrapper',
      star: 'star-element',
      starBefore: 'star-element-before',
      starAfter: 'star-element-after',
      heartWrapper: 'heart-element-wrapper',
      heart: 'heart-element',
      heartBefore: 'heart-element-before'
    };

    var paths = {
      starStyles: 'rating/star.css',
      heartStyles: 'rating/heart.css'
    };

    options = $.extend({
      typeOfElement: 'star',
      countOfElements: 1,
      sizeOfElement: 1,
      colorActive: 'green',
      colorInactive: 'grey',
      colorHover: 'blue',
      readOnly: false,
      countOfActiveElements: 0,
      clickCallback: function () {},
      mouseenterCallback: function () {},
      mouseleaveCallback: function () {}
    }, options);


    var setStyles = function (path) {
      var link = $('<link></link>').attr({
        rel: 'stylesheet',
        type: 'text/css',
        href: path
      });

      $('head').append(link);
    };

    var setSizeOfStars = function (element, size) {
      var itemsWrappers = $(element);
      var items = $(element).children();
      var itemsBefore = $(items).children('.' + elementClasses.starBefore);
      var itemsAfter = $(items).children('.' + elementClasses.starAfter);

      itemsWrappers.css({
        'padding-top': 5.7 * size + 'px',
        'padding-bottom': 5.7 * size + 'px',
        'display': 'inline-block'
      });

      items.css({
        'border-right-width': 10 * size + 'px',
        'border-bottom-width': 7 * size + 'px',
        'border-left-width': 10 * size + 'px'
      });

      itemsBefore.css({
        'border-left-width': 3 * size + 'px',
        'border-bottom-width': 8 * size + 'px',
        'border-right-width': 3 * size + 'px',
        'top': -4.5 * size + 'px',
        'left': -6.5 * size + 'px'
      });

      itemsAfter.css({
        'border-left-width': 10 * size + 'px',
        'border-bottom-width': 7 * size + 'px',
        'border-right-width': 10 * size + 'px',
        'top': 0.3 * size + 'px',
        'left': -10.5 * size + 'px'
      });
    };

    var setSizeOfHearts = function (element, size) {
      var itemsWrappers = $(element);
      var items = $(element).children();
      var itemsBefore = $(items).children('.' + elementClasses.heartBefore);

      itemsWrappers.css({
        'padding-left': 3 * size + 'px',
        'display': 'inline-block',
        'padding-bottom': 1 * size + 'px'
      });

      items.css({
        'width': 10 * size + 'px',
        'height': 17.5 * size + 'px',
        'margin-right': 11 * size + 'px',
        '-webkit-border-radius': 5.0 * size + 'px ' + 5.0 * size + 'px 0 0',
        '-moz-border-radius': 5.0 * size + 'px ' + 5.0 * size + 'px 0 0',
        'border-radius': 5.0 * size + 'px ' + 5.0 * size + 'px 0 0'
      });

      itemsBefore.css({
        'width': 17.5 * size + 'px',
        'height': 10 * size + 'px',
        '-webkit-border-radius': 5.0 * size + 'px ' + 5.0 * size + 'px 0 0',
        '-moz-border-radius': 5.0 * size + 'px ' + 5.0 * size + 'px 0 0',
        'border-radius': '0 ' + 5.0 * size + 'px ' + 5.0 * size + 'px 0',
      });
    };

    var paintOver = function (element, color) {
      if (options.typeOfElement === 'star') {
        var star = $(element).children();

        star.css({
          'border-bottom-color': color
        });
      }

      if (options.typeOfElement === 'heart') {
        var heart = $(element).children();

        heart.css({
          'background-color': color
        });
      }
    };

    var paintAllOver = function (elements, countOfActive, colorActive, colorInactive) {
      for (var i = 0, length = elements.length; i < length; i += 1) {
        var color = i < countOfActive ? colorActive : colorInactive;

        var item = $(elements[i]);
        var allInnerItems = $(item).children();

        paintOver(item, color);
        paintOver(allInnerItems, color);
      }
    };

    var setActiveElements = function (elements, count) {
      if (count > elements.length) {
        return;
      }

      paintAllOver(elements, options.countOfActiveElements, options.colorActive, 
        options.colorInactive);
    };

    var attachSelect = function (element) {
      $(element).click(function () {
        var prevElements = $(this).prevAll();
        var allSiblingsElements = $(this).parent().children();

        options.countOfActiveElements = prevElements.length + 1;

        paintAllOver(allSiblingsElements, options.countOfActiveElements,
          options.colorActive, options.colorInactive);
      });
    };

    var attachClick = function (element, callback) {
      $(element).click(function (e) {
        callback(options.countOfElements, options.countOfActiveElements, e);
      });
    };

    var attachMouseenter = function (element, callback) {
      $(element).mouseenter(function (e) {
        var prevElements = $(this).prevAll();
        var allSiblingsElements = $(this).parent().children();
        var countOfSelectElements = prevElements.length + 1;

        paintAllOver(allSiblingsElements, countOfSelectElements, 
          options.colorHover, options.colorInactive);

        callback(options.countOfElements, options.countOfActiveElements, e);
      });
    };

    var attachMouseleave = function (element, callback) {
      $(element).mouseleave(function (e) {
        var allSiblingsElements = $(this).parent().children();

        paintAllOver(allSiblingsElements, options.countOfActiveElements, 
          options.colorActive, options.colorInactive);

        callback(options.countOfElements, options.countOfActiveElements, e);
      });
    };      
      
    var setOptions = function (element) {
      if (options.typeOfElement === 'star') {
        setSizeOfStars(element, options.sizeOfElement);
      }

      if (options.typeOfElement === 'heart') {
        setSizeOfHearts(element, options.sizeOfElement);
      }

      setActiveElements(element, options.countOfActiveElements);

      if (!options.readOnly) {
        attachSelect(element);
      }

      attachClick(element, options.clickCallback);
      attachMouseenter(element, options.mouseenterCallback);
      attachMouseleave(element, options.mouseleaveCallback);
    };

    var createStars = function (wrapper) {
      for (var i = 0; i < options.countOfElements; i += 1) {
        var starBeforeElement = $('<span></span>').addClass(elementClasses.starBefore);
        var starAfterElement = $('<span></span>').addClass(elementClasses.starAfter);
        var starElement = $('<span></span>').addClass(elementClasses.star).
          append(starBeforeElement, starAfterElement);
        var starWrapper = $('<div></div>').addClass(elementClasses.starWrapper).
          append(starElement);
        $(wrapper).append(starWrapper);
      }
    };

    var createHearts = function (wrapper) {
      for (var i = 0; i < options.countOfElements; i += 1) {
        var heartBeforeElement = $('<span></span>').addClass(elementClasses.heartBefore);
        var heartElement = $('<span></span>').addClass(elementClasses.heart).append(heartBeforeElement);
        var heartWrapper = $('<div></div>').addClass(elementClasses.heartWrapper).
          append(heartElement);
        $(wrapper).append(heartWrapper);
      }
    };

    var make = function () {
      if (options.typeOfElement === 'star') {
        setStyles(paths.starStyles);

        createStars(this);
      }

      if (options.typeOfElement === 'heart') {
        setStyles(paths.heartStyles);

        createHearts(this);
      }

      setOptions($(this).children());
    };

    return this.each(make);
  };
})(jQuery);