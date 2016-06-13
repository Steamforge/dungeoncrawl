var DungeonCrawl = (function () { 
    'use strict';

    var resultElement;
    var dieElement;
    var tables = [4, 6, 8, 10, 12, 20];
    var resultSet = [];

    var dice = {
        4: { name: 'four', outter: 'triangle', inner: 'triangle2' },
        6: { name: 'six', outter: 'hexagon', inner: 'rhombus' },
        8: { name: 'eight', outter: 'rhombus', inner: 'triangle2' },
        10: { name: 'ten', outter: 'rhombus', inner: 'rhombus2' },
        12: { name: 'twelve', outter: 'decagon', inner: 'pentagon' },
        20: { name: 'twenty', outter: 'hexagon', inner: 'triangle' }
    };

    /**
     * create the die element
     * @param  {number} sides [description]
     * @param  {number} num   [description]
     * @return {element}       [description]
     */
    var getDice = function (sides, num) {
        var newDiv;
        var innerDiv;
        var newSpan;
        var text;

        if (sides === 10 && num === 10) {
            num = 0;
        }

        newDiv = document.createElement('div');
        newDiv.classList.add('die', dice[sides].name, dice[sides].outter);

        innerDiv = document.createElement('div');
        innerDiv.classList.add('innerPoly', dice[sides].inner);

        newSpan = document.createElement('span');

        text = document.createTextNode(num);
        newSpan.appendChild(text);
        innerDiv.appendChild(newSpan);
        newDiv.appendChild(innerDiv);

        return newDiv;
    };

    /**
     * gets a random number
     * @param  {number} maxNumber [the upper limit]
     * @return {number}           [return the random number]
     */
    var getRand = function (maxNumber) {
        return Math.floor((Math.random() * maxNumber) + 1);
    };

    /**
     * adds a random for each table
     * @param {number} item  [the value in the array]
     * @param {number} index [the index of the array]
     */
    var setTable = function (item, index) {
        var rand = getRand(item);
        resultSet.push(rand);
        dieElement.appendChild(getDice(item, rand));
    };

    /**
     * gets the results of the random numbers
     * @return {void}
     */
    var getResults = function () {
        resultSet.length = 0;
        while (dieElement.firstChild) {
            dieElement.removeChild(dieElement.firstChild);
        }
        tables.forEach(setTable);
        resultElement.innerHTML = resultSet.toString();
    };

    /**
     * sets eventListeners
     */
    var eventListeners = function () {
        document.getElementById('btnResult').addEventListener('click', getResults);   
    };

    /**
     * init the page
     * @return {void}
     */
    var init = function () {
        resultElement = document.getElementById('result');
        dieElement = document.getElementById('dice');
        eventListeners();
    };

    return {
        init: init
    };
})();

DungeonCrawl.init();
