$(function () {
  'use strict';
        
    var countElement=5;
    var sizeElement=2;
    var activeColor='yellow';
    var inactiveColor='grey';
    var hoverColor='red'; 
    
  $('.star').rating({
    typeOfElement: 'star',
    countOfElements: countElement,
    sizeOfElement: sizeElement,
    colorActive: activeColor,
    colorInactive: inactiveColor,
    colorHover: hoverColor,
    readOnly: true,
    countOfActiveElements: 1,
    clickCallback: function (countOfStars, countOfActiveStars, e) {
      alert('Click on ' + countOfActiveStars);
    }
  });

  $('.heart').rating({
    typeOfElement: 'heart',
    countOfElements: countElement,
    sizeOfElement: sizeElement,
    colorActive: activeColor,
    colorInactive: inactiveColor,
    colorHover: hoverColor,
    readOnly: false,
    countOfActiveElements: 1,
    clickCallback: function (countOfStars, countOfActiveStars, e) {
      alert('Click on ' + countOfActiveStars);
    }
  });
    
   
});
