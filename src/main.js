import style from './css/style.scss';
console.log(style)

let app = document.getElementById("app");
app.innerHTML = `<div id='${style.app}'>hello webpack</div>`;