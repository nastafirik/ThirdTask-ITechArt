$(function () {
  'use strict';
        
    var countElement;
    countElement=prompt("Введите количество элементов", countElement);
    
    var sizeElement;
    sizeElement=prompt("Введите желаемый размер элементов", sizeElement);
   
    var activeColor;
    activeColor=prompt("Введите желаемый цвет активного элемента", activeColor);
    
    var inactiveColor;
    inactiveColor=prompt("Введите желаемый цвет для неактивного элемента", inactiveColor);
    
    var hoverColor;
    hoverColor=prompt("Введите желаемый цвет наведения на элемент", hoverColor);
    
    
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
