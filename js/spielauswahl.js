function beschreibungAnzeigen(divid) {
    let obj = document.getElementById(divid);
    obj.style.display = obj.style.display == 'block' ? 'none' : 'block';
}

const modi = {
    normal : 1,
    cricket: 2,
    bob: 3
}

const modusParam = 'modus';

function weiterleiten(modus) {
    window.location.href = '../html/spielkonfiguration.html?' + modusParam + '=' + modus;
}