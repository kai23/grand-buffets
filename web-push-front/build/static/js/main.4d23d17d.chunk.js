(window["webpackJsonpweb-push-front"]=window["webpackJsonpweb-push-front"]||[]).push([[0],[,,,function(e,n,o){e.exports=o.p+"static/media/logo.5d5d9eef.svg"},function(e,n,o){e.exports=o(11)},,,,,function(e,n,o){},function(e,n,o){},function(e,n,o){"use strict";o.r(n);var t=o(0),r=o.n(t),a=o(2),i=o.n(a),c=(o(9),o(3)),s=o.n(c);o(10);var l=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.js")," and save to reload."),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))},u=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function d(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var o=e.installing;null!=o&&(o.onstatechange=function(){"installed"===o.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}var p=function(e){for(var n=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),o=window.atob(n),t=new Uint8Array(o.length),r=0;r<o.length;++r)t[r]=o.charCodeAt(r);return t}("BA13aNs9a9ALPCh2GARkwJ5JJ-fXdvaeo06Q7Du9TsxLvXZT3D19au-onAdpn61340Ey1F3aPsuVTAHEGaxeSZo");function f(e){return fetch("".concat("https://gb.florianchevallier.fr/api","/notifications/subscribe"),{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})}i.a.render(r.a.createElement(l,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("","/").concat("service-worker.js");u?(!function(e,n){fetch(e).then(function(o){var t=o.headers.get("content-type");404===o.status||null!=t&&-1===t.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):d(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):d(n,e)})}}(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.pushManager?e.pushManager.getSubscription().then(function(n){null===n?(console.log("No subscription detected, make a request."),e.pushManager.subscribe({applicationServerKey:p,userVisibleOnly:!0}).then(function(e){console.log("New subscription added."),f(e)}).catch(function(e){"granted"!==Notification.permission?console.log("Permission was not granted."):console.error("An error ocurred during the subscription process.",e)})):(console.log("Existed subscription detected."),f(n))}):console.log("Push manager unavailable.")}).catch(function(e){console.error("An error ocurred during Service Worker registration.",e)})}],[[4,1,2]]]);
//# sourceMappingURL=main.4d23d17d.chunk.js.map