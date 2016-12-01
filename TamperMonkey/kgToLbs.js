// ==UserScript==
// @name         kg to lbs
// @namespace    https://www.omnimed.com/
// @version      0.1
// @description  Display lbs data
// @author       Gabriel Girard
// @match        https://www.omnimed.com/omnimed/do/dashboard/patientDashboard*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function getWeightInImperial() {
        setTimeout(function() {
            var weight;
            var vitalSign = $('div[class="vitalSignUnit vitalSignUnitSumaryBox ng-binding"]');
            $.each(vitalSign,function(e) {
                if (vitalSign[e].innerHTML === "kg") {
                    weight = vitalSign[e];
                }
            });

            if (weight) {
                var imperial = kToLbs($(weight).prev()[0].innerHTML);

                $(weight).parent().attr('title', 'Pounds+Ounces : ' + imperial.pounds + ' lb  ' + imperial.ounces + ' oz \nPounds: ' + imperial.combine + ' lb' );
            }

            getWeightInImperial();
        }, 5000);
    }

    function kToLbs(pK) {
        var nearExact = pK/0.45359237;
        var lbs = Math.floor(nearExact);
        var oz = (nearExact - lbs) * 16;
        var lb = pK * 2.20462262185;
        return {
            pounds: lbs,
            ounces: oz,
            combine: lb
        };
    }
    getWeightInImperial();
})();
