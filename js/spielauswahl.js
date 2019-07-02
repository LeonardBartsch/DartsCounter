function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
      window.onload = func;
    } else {
      window.onload = function() {
        if (oldonload) {
          oldonload();
        }
        func();
      }
    }
  }
  
  addLoadEvent(function() {
    favoritenErmitteln();
  });

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

let favoritenKeys = [];
function favoritenErmitteln() {
    let keys = Object.keys(localStorage), length = keys.length;

        if(length > 0) {
            document.getElementById('favoriten').classList.remove('unsichtbar');
        }

        for(i = 0; i < length; i++) {
            console.log(i);
            favoritenKeys.push(keys[i]);
            let li = document.createElement('li');
            li.classList.add('favorit');
            let temp = i;
            li.addEventListener('click', function() {
                favoritClick(temp);
            });
            li.innerHTML = keys[i];
            document.getElementById('favoritenListe').appendChild(li);
        }

    }

function favoritClick(index) {
    let parameterString = localStorage.getItem(favoritenKeys[index])

    window.location.href = '../html/spiel.html?' + parameterString;
}