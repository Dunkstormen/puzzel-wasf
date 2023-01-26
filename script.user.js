// ==UserScript==
// @name         Puzzel Wallboard Anti-Tamper and Session fix
// @namespace    http://tampermonkey.net/
// @version      0.1.8
// @description  Solves the issue with colleagues tampering with wallboards and prevents their session from expiring.
// @author       Benjamin Jørgensen (Dunkstormen)
// @match        https://admin.puzzel.com/admin/RealtimeWallboard/Index
// @match        https://admin.puzzel.com/admin/RealtimeWallboard
// @match        https://admin.puzzel.com/admin/RealtimeWallboard/settings
// @icon         https://www.google.com/s2/favicons?sz=64&domain=puzzel.com
// @require      https://code.jquery.com/jquery-3.6.3.js
// @grant        none
// ==/UserScript==

(function ($, undefined) {
  $(function () {
      'use strict';

      // Wait for webpage to fully load
      $( document ).ready(function() {
        
      if(document.location.href === 'https://admin.puzzel.com/admin/RealtimeWallboard/settings') {
          location.replace("https://admin.puzzel.com/admin/RealtimeWallboard/Index")
      }

      // Force wallboard into fullscreen
      $('#fullscreenButton').click();
        
      // Removing "Settings" button
      $('button.grey').remove();

      function refreshAt(hours, minutes, seconds) {
          var now = new Date();
          var then = new Date();

          if(now.getHours() > hours ||
             (now.getHours() == hours && now.getMinutes() > minutes) ||
             now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
              then.setDate(now.getDate() + 1);
          }
          then.setHours(hours);
          then.setMinutes(minutes);
          then.setSeconds(seconds);

          var timeout = (then.getTime() - now.getTime());
          setTimeout(function() { window.location.reload(true); }, timeout);
      }

          refreshAt(8,0,0);
          refreshAt(20,0,0);

    });
  });
})(window.jQuery.noConflict(true));
