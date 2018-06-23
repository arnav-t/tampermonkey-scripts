// ==UserScript==
// @name         Raffle Opener
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enter raffles that haven't been joined.
// @author       You
// @match        https://scrap.tf/raffles
// @exclude      https://scrap.tf/raffles/puzzle
// @grant        none
// ==/UserScript==

var scrollTime = 2000;
var sleepTime = 4000;
var unjoined = [];
var currIndex = 0;
var oTitle = '';

function openTab()
{
    if(currIndex >= unjoined.length)
    {
        document.title = oTitle;
        alert("Done!");
        return;
    }
    document.title = oTitle + ' [' + (currIndex + 1) + '/' + unjoined.length + ']';
    var home = 'https://scrap.tf';
    window.open(home.concat(unjoined[currIndex]));
    currIndex += 1;
    setTimeout(function()
    {
        openTab();
    }, sleepTime);
}

function addRaffle(rafObj)
{
    if(rafObj.classList.contains('raffle-entered'))
        return;
    else
    {
        var link = rafObj.getElementsByTagName('a')[0].getAttribute('href');
        unjoined.push(link)
    }
}

function begin()
{
    oTitle = document.title;
    var raffles = document.getElementsByClassName("panel-raffle");
    for (var i = 0; i < raffles.length; ++i)
    {
        addRaffle(raffles[i]);
    }
    openTab();
}

function scroll()
{
    if(document.getElementsByClassName('pag-done')[0].innerHTML === 'That\'s all, no more!')
    {
        window.scrollTo(0, 0);
        begin();
        return;
    }
    window.scrollBy(0,50000);
    setTimeout(scroll, scrollTime);
}

function check()
{
    var entered = parseInt(document.getElementsByTagName('var')[0].innerHTML.split('/')[0]);
    var total = parseInt(document.getElementsByTagName('var')[0].innerHTML.split('/')[1]);
    if(entered < total)
        scroll();
    else
        alert('Already joined all raffles!');
}

(function() {
    'use strict';

    // Your code here...
    var topPanel = document.getElementsByClassName("panel-heading")[0];
    var refBut = topPanel.getElementsByTagName('div')[0];
    var ajBut = document.createElement('div');
    ajBut.className = 'btn btn-inverse btn-embossed new-raffle';
    ajBut.style.marginLeft = '5px';
    ajBut.innerHTML = 'Auto Join';
    ajBut.onclick = check;
    topPanel.insertBefore(ajBut, refBut);
})();