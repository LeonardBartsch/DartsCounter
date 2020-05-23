$(document).ready(function(){
  $("#normalButton").click(function(){weiterleiten(Spielmodus.Normal);});
  $("#cricketButton").click(comingsoon);
  $("#bobButton").click(comingsoon);

  favoritenErmitteln();
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
let favoritenKeys = []; 
function favoritenErmitteln() {
  
  $.get('../html/favoritenErmittelnJson.php', function(data) {
    let favoritenLokal = (data.favoritenLokal !== false || data.favoritenLokal === "true");

    let dictionary = {};
    if(favoritenLokal){
      let keyString = localStorage.getItem(keyFuerFavoritenKeys);
      
      let keys = [];
      if(!(keyString === '' || keyString === null)){          
        keys = keyString.split(seperator);      
      }

      for(let i = 0; i < keys.length; i++){
        let key = keys[i];
        let parameterString = localStorage.getItem(key);
        if(parameterString === null) {
          favoritLoeschen(key);
          continue;
        }

        dictionary[key] = parameterString;
      }
    }else{
      let favoriten = data.favoriten;
      // Favoriten besteht aus mehren Properties, die wiederum Json sind
      for (let key in favoriten) {
        if (favoriten.hasOwnProperty(key)) {
            let einstellungenJson = favoriten[key];
            let parameterString = getParameterStringGeneral(einstellungenJson);

            if(parameterString === '') continue;

            dictionary[key] = parameterString;
        }
      }
    }

    if(Object.keys(dictionary).length > 0){
      $('#favoriten').removeClass('unsichtbar');
    }

    for(let key in dictionary){
      if(dictionary.hasOwnProperty(key)){
        appendFavorit(key, dictionary[key], favoritenLokal);
      }
    }
  }, 'json'); 
}

const PhpStatus = {
  Fehlgeschlagen: 0,
  Erfolgreich: 1,
  NichtAngemeldet: 2
};
function appendFavorit(key, parameterString, favoritenLokal) {
  let li = document.createElement('li');
  let a = document.createElement("a");
  a.classList.add("favorit");
  a.innerHTML = key;
  a.href = "spiel.php?" + parameterString;
  li.appendChild(a);

  $(li).append(
    $("<img src='../pics/delete.jpg' class='deletePic'>").click(function(){
      if(favoritenLokal){
        favoritLoeschen(key);
        favoritEntfernen(key);
      }else{
        $.post("favoritLoeschen.php", {favoritName: key}, function(data){
          let dataInt = parseInt(data);
          switch(dataInt){
            case PhpStatus.Erfolgreich:
              favoritEntfernen(key);
              break;
            case PhpStatus.NichtAngemeldet:
              alert('Nicht mehr angemeldet');
              break;
            default:
              alert('Fehler beim Löschen');
          }
        });   
      }
    }));

  document.getElementById('favoritenListe').appendChild(li);
}

function favoritEntfernen(key){
  $(".favorit:contains('" + key + "')").parent().remove();

  if(!$("#favoritenListe").has("li").length){
    $("#favoriten").addClass("unsichtbar");
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