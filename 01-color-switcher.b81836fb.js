const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.body;function o(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}let a=null;t.addEventListener("click",(()=>{a=setInterval(o,1e3),t.disabled=!0})),e.addEventListener("click",(()=>{clearInterval(a),t.disabled=!1}));
//# sourceMappingURL=01-color-switcher.b81836fb.js.map
