const accountParam = "mitAccount";

function weiterleiten(mitAccount){
    window.location.href = '../html/spielauswahl.html?' + accountParam + '=' + mitAccount;
}

function backtotop(){
  window.scroll(0,0);
}

document.querySelector(".backtotopdiv").addEventListener("click",backtotop);
