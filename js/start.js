const accountParam = "mitAccount";

function weiterleiten(mitAccount){
    window.location.href = '../html/spielauswahl.html?' + accountParam + '=' + mitAccount;
}
