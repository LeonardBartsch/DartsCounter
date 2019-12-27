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
    window.location.href = '../html/spielkonfiguration.php?' + modusParam + '=' + modus;
}

const keyFuerFavoritenKeys = 'favoritenTriple20', seperator = ';';
let favoritenKeys = [];
function favoritenErmitteln() {
  let keyString = localStorage.getItem(keyFuerFavoritenKeys);
  console.log(keyString);
  if(keyString === '' || keyString === null) 
      return;
    
  let keys = keyString.split(seperator);
  if(keys.length === 0){
    return;
  }else { 
    document.getElementById('favoriten').classList.remove('unsichtbar');
  }

  for(let i = 0; i < keys.length; i++) {
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
  let key = favoritenKeys[index];
  let parameterString = localStorage.getItem(key);

  if(parameterString === null) {
    favoritLoeschen(key);
    alert('Favorit nicht mehr vorhanden.');
    return;
  }

  window.location.href = '../html/spiel.html?' + parameterString;
}

function favoritLoeschen(key) {
  localStorage.removeItem(key);
  
  let keyString = localStorage.getItem(keyFuerFavoritenKeys);
  let loeschen = false, index = keyString.indexOf(key);
  while(!loeschen && index >= 0) {
    loeschen = true;
    let replaceString = '';
    if(index > 0){
      if(keyString.charAt(index - 1) !== seperator) {
        loeschen = false;
      }
      replaceString = seperator;
    }
    
    replaceString += key;

    if(keyString.length > (index + key.length)) {
      if(keyString.charAt(index + key.length) !== seperator){
        loeschen = false;
      }else {
        if(index === 0)
          replaceString += seperator;
      }
    }
    
    if(loeschen) {
      console.log('Löschen');
      let resultString = keyString.replace(replaceString, '');
      localStorage.setItem(keyFuerFavoritenKeys, resultString);
    }

    index = keyString.indexOf(key, index + 1);

  }
}