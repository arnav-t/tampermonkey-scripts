// ==UserScript==
// @name         ERP Autofill
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto fill roll number.
// @author       You
// @match        https://erp.iitkgp.ac.in/SSOAdministration/login.htm*
// @grant        none
// ==/UserScript==

var roll = '17NA30002';

function ansQues()
{
    var ques = document.getElementById('question').innerHTML;
    var ans = ''
    if(ques === 'Question1')
        ans = 'Ans1';
    else if(ques === 'Question2')
        ans = 'Ans2';
    else if(ques === 'Question3')
        ans = 'Ans3';
    else
    {
        setTimeout(ansQues, 500);
        return;
    }
    document.getElementById('answer').value = ans;
}

(function() {
    'use strict';

    // Your code here...
    var idField = document.getElementById('user_id');
    if(idField !== null)
    {
        idField.value = roll;
        idField.focus();
    }
    ansQues();
    document.getElementById('password').focus();
})();