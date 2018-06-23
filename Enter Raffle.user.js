// ==UserScript==
// @name         Enter Raffle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enter current raffle.
// @author       You
// @match        https://scrap.tf/raffles/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var enterBtn = document.getElementById('raffle-enter');
    if(enterBtn != null)
    {
        if((!enterBtn.classList.contains('btn-danger') && enterBtn.classList.contains('btn-info')))
        {
            enterBtn.click();
            setTimeout(close, 2000);
        }
    }
})();