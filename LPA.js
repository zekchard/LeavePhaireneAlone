// ==UserScript==
// @name         Leave #Phairene alone!
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Block all users on Twitter/X who spam the Phairene tag. Based on Block BecomingElla's Twitter Blocklist (by Ella Keens).
// @author       zekchard
// @match        https://x.com/*
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @downloadURL  https://raw.githubusercontent.com/zekchard/LeavePhaireneAlone/main/LPA.js
// @require  	https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js
// @license MIT
// ==/UserScript==
/* globals $ */

// Now using the Phairene Shippers' Essential Blocklist! https://docs.google.com/spreadsheets/d/1wosl7__oyppUDTXdN2GhgVJgygsz0eCGoSFzUmmLFrw/preview

let blockList = [
  {
    "blk" : {
      "accountId" : "1465337522997760010",
    }
  },
  {
    "blk" : {
      "accountId" : "1914561393438941188",
    }
  },
  {
    "blk" : {
      "accountId" : "1687164424677703696",
    }
  },
  {
    "blk" : {
      "accountId" : "1922775804678983680",
    }
  },
  {
    "blk" : {
      "accountId" : "1839961952757383169",
    }
  },
  {
    "blk" : {
      "accountId" : "1794683963178663936",
    }
  },
  {
    "blk" : {
      "accountId" : "1943474756537454596",
    }
  },
  {
    "blk" : {
      "accountId" : "1913054279415279616",
    }
  },
  {
    "blk" : {
      "accountId" : "1661157097185083400",
    }
  },
  {
    "blk" : {
      "accountId" : "857858103706091520",
    }
  },
  {
    "blk" : {
      "accountId" : "1424811124713734147",
    }
  },
  {
    "blk" : {
      "accountId" : "1898749215490379776",
    }
  }
];

let redirected = false;

//window.addEventListener('load', function() {
//(function() {
//    'use strict';

// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
if(window.location.href.toString().includes('twitter.com') || window.location.href.toString().includes('x.com'))
   {
   setTimeout(function(){
       let userIndex = GM_getValue('userIndex', -1);
        if(typeof userIndex === 'undefined' || userIndex == 'NaN' || typeof userIndex == 'NaN' || userIndex == NaN)
        {
            let userIndex = -1;
        }

        if(userIndex >= 0 && $("[data-testid='userActions']") !== null && $("[data-testid='userActions']").length > 0){
            if($("[data-testid='confirmationSheetDialog']") !== null && typeof $("[data-testid='confirmationSheetDialog']") !== 'undefined' && typeof $("[data-testid='confirmationSheetDialog']") !== null)
            {
                $("[data-testid='confirmationSheetCancel']").click();
            }

            $("[data-testid='userActions']").click();

            setTimeout(function(){
                if($("[data-testid='block']") !== null && $("[data-testid='block']").find("span") !== null && $("[data-testid='block']").find("span")[0] !== null && $("[data-testid='block']").find("span")[0].innerText.includes("Unblock"))
                {
                    setTimeout(function(){
                        userIndex++;
                        GM_setValue('userIndex', userIndex);

                        let redirectUrl = "https://x.com/i/user/"+blockList[userIndex].blk.accountId;
                        //redirected = true;
                        window.location.href = redirectUrl;
                    }, 500);}
                else{
                    $("[data-testid='block']").click();
                    setTimeout(function(){
                        $("[data-testid='confirmationSheetConfirm']").click();
                        userIndex++;
                        GM_setValue('userIndex', userIndex);

                        let redirectUrl = "https://x.com/i/user/"+blockList[userIndex].blk.accountId;
                        setTimeout(function(){
                            redirected = true;
                            window.location.href = redirectUrl;
                        }, 300);
                    }, 500);
                }
            }, 500);
        }

       else{
           setTimeout(function(){
               userIndex++;
               GM_setValue('userIndex', userIndex);

               let redirectUrl = "https://x.com/i/user/"+blockList[userIndex].blk.accountId;
               redirected = true;
               window.location.href = redirectUrl;
           }, 500);
       }
    }, 10000);}
