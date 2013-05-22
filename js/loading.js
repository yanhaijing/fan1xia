/**
 * @author yan
 */

(function($, global){
    "use strict";
    var load = 1;
    global.console.log("load",load++);
    $(function(){
        
    });
    window.addEventListener("load", function(){
        $("#loading").fadeOut();
    }, false);           
}(jQuery, window));
