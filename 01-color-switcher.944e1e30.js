!function(){var t={body:document.querySelector("body"),startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]")},n=null;function e(e){o(t.startBtn),e.target.disabled=!0,clearInterval(n)}function o(t){t.disabled=!1}function r(n){t.body.style.backgroundColor=n}function a(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(function(d){o(t.stopBtn),d.target.disabled=!0,t.stopBtn.addEventListener("click",e),r(a()),n=setInterval((function(){return r(a())}),1e3)}))}();
//# sourceMappingURL=01-color-switcher.944e1e30.js.map