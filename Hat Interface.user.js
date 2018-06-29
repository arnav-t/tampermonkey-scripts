// ==UserScript==
// @name         Hat Interface
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ease the process of hat flipping
// @author       You
// @match        https://scrap.tf/buy/hats
// @grant        none
// ==/UserScript==

var importantItems = ['Pip-Boy', 'Cosa Nostra Cap', 'Doublecross-Comm', 'Dead of Night', 'Head Warmer', 'Le Party Phantom', 'Reggaelator', 'Red Army Robin', 'Cold Killer', 'Law', 'Void Monk Hair', 'Fancy Dress Uniform', 'Team Captain', 'Hunger Force', 'Grenadier Helm', 'Das Ubersternmann', 'Birdman of Australiacatraz', 'Packable Provisions'];
var priority = 100;

var autoReload = true;
var notFound = true;

(function() {
    'use strict';

    // Your code here...
    var divList = document.getElementsByTagName('div');
    for (var i = 0; i < divList.length; ++i)
    {
        if(divList[i].classList.contains('item'))
        {
            if(divList[i].getAttribute("data-num-available") === "1")
            {
                divList[i].style.boxShadow = "0 0 10px white";
                divList[i].getElementsByClassName("item-value-indicator")[0].style.backgroundColor = '#880000';
            }
            var itemName = divList[i].getAttribute("data-title").split(' ').join('+').split("&apos;").join("%27");

            for(var j = 0; j < importantItems.length; ++j)
            {
                if(itemName.split('+').join(' ').includes(importantItems[j]) && !itemName.includes("<span+class='quality11'>"))
                {
                    if(!divList[i].getAttribute("data-content").includes('This item will decrease in price shortly.') || j === 0) {
                        document.title = '[!] ' + document.title;
                        divList[i].getElementsByClassName("item-value-indicator")[0].style.backgroundColor = '#aa0099';
                        notFound = false;
                        if(j <= priority) {
                            divList[i].getElementsByClassName("item-value-indicator")[0].scrollIntoView();
                            priority = j;
                            window.scrollBy(0,-270);
                        }
                    }
                }
            }

            var bpLink = document.createElement('a');
            bpLink.innerHTML = ' (check)';
            var url = '';
            if(itemName.includes("<span+class='quality11'>"))
            {
                itemName = itemName.replace("<span+class='quality11'>Strange+", "");
                itemName = itemName.replace("</span>", "");
                url = "https://backpack.tf/stats/Strange/" + itemName + "/Tradable/Craftable";
            }
            else
                url = "https://backpack.tf/stats/Unique/" + itemName + "/Tradable/Craftable";
            bpLink.setAttribute('href', url);
            divList[i].getElementsByClassName("item-value-indicator")[0].appendChild(bpLink);
        }
    }
    if(notFound && autoReload) {
        document.title = '[...] ' + document.title;
        setTimeout(function(){
            location.reload(true);
        }, 15000);
    }
    if((!notFound && autoReload) && !document.hasFocus())
    {
        window.open('http://Found');
    }

})();