const accountParam = "mitAccount";

function weiterleiten(mitAccount){
    window.location.href = '../html/spielauswahl.html?' + accountParam + '=' + mitAccount;
}

function showHideRegistrieren(){
    showHideBackdrop();
    let element = document.getElementById('registrieren')
    let sichtbar = computedStyle(element, 'display') == 'block';
    if(!sichtbar){
        element.style.display = "block";
    }else{
        element.style.display = "none";
    }
}

