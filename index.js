"use strict";
var f = function () {
    var main = document.querySelector("main");
    var form = document.querySelector("main form");
    var text = "";
    var initialHTML = "";
    if (location.hash && location.hash.indexOf("#/") === 0) {
        text = atob(location.hash.split("#/")[1].split("/")[0]);
        initialHTML = main.innerHTML;
        main.innerHTML = "Loading...";
        if (typeof window.snarkdown === "function")
            text = window.snarkdown(text);
        main.innerHTML = text;
        if (location.hash.split("#/")[1].split("/").length > 1) {
            setTimeout(function () {
                window.agastya.api("cssClass", location.hash.split("#/")[1].split("/")[1]);
            }, 200);
        }
    }
    else if (form) {
        form.addEventListener("submit", function (event) {
            var textarea = document.querySelector("form textarea");
            if (textarea)
                text = textarea.value;
            var link = location.href.replace("index.html", "") + "#/" + btoa(text);
            location.href = link;
            event.preventDefault();
            return false;
        });
    }
    else {
        main.innerHTML = initialHTML;
    }
};
f();
window.addEventListener("hashchange", function (event) {
    f();
});
