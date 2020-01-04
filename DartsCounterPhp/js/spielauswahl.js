$(document).ready(function(){
  $("#normalButton").click(function(){weiterleiten(Spielmodus.Normal);});
  $("#cricketButton").click(comingsoon);
  $("#bobButton").click(comingsoon);

  favoritenErmitteln();
  favoritenLoeschenHinzufuegen();
});

function beschreibungAnzeigen(divid) {
    let obj = document.getElementById(divid);
    obj.style.display = obj.style.display == 'block' ? 'none' : 'block';
}

const Spielmodus = {
  Normal : 0,
  Cricket: 1,
  Bob: 2
}

const modusParam = 'modus';

function weiterleiten(modus) {
    window.location.href = '../html/spielkonfiguration.php?' + modusParam + '=' + modus;
}

const keyFuerFavoritenKeys = 'favoritenTriple20', seperator = ';';
let favoritenKeys = [], favoritenLokal = false;
function favoritenErmitteln() {
  favoritenLokal = ($("#favoritenLokal").text() == 1);

  if(!favoritenLokal) return;

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
      let key = keys[i];
      favoritenKeys.push(key);
      let li = document.createElement('li');
      let a = document.createElement("a");
      a.classList.add("favorit");
      a.innerHTML = key;

      let parameterString = localStorage.getItem(key);
      if(parameterString === null) {
        favoritLoeschen(key);
        console.log('Favorit nicht mehr vorhanden.');
        continue;
      }
      a.href = "spiel.php?" + parameterString;
      li.appendChild(a);
      document.getElementById('favoritenListe').appendChild(li);
  }
}

const PhpStatus = {
  Fehlgeschlagen: 0,
  Erfolgreich: 1,
  NichtAngemeldet: 2
};
function favoritenLoeschenHinzufuegen() {
  $("#favoritenListe .favorit").each(function(){
    let favoritName = $(this).text();
    let element = $("<img src='../pics/delete.jpg' class='deletePic'>").click(function(){
      if(favoritenLokal){
        favoritLoeschen(favoritName);
        $(this).parent().remove();
      }else{
        $.post("favoritLoeschen.php", {favoritName: favoritName}, function(data){
          let dataInt = parseInt(data);
          switch(dataInt){
            case PhpStatus.Erfolgreich:
              $(".favorit:contains('" + favoritName + "')").parent().remove();
              break;
            case PhpStatus.NichtAngemeldet:
              alert('Nicht mehr angemeldet');
              break;
            default:
              alert('Fehler beim Löschen');
          }
        });   
      }
    });
    $(this).after(element);
  });
}

function favoritClick(index) {
  let key = favoritenKeys[index];
  let parameterString = localStorage.getItem(key);

  if(parameterString === null) {
    favoritLoeschen(key);
    alert('Favorit nicht mehr vorhanden.');
    return;
  }

  window.location.href = '../html/spiel.php?' + parameterString;
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