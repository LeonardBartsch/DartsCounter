$(document).ready(function(){
  //favoritenErmitteln();
})

function switchMenue(ausgewaehlt, alleMenues) {
  const ausgewaehltClass = 'ausgewaehlt';
  alleMenues.forEach(function(x) {
    if(x === ausgewaehlt){
      document.getElementById('button' + x).classList.add(ausgewaehltClass);
      document.getElementById('menue' + x).style.display = 'grid';
    }else {
      document.getElementById('button' + x).classList.remove(ausgewaehltClass);
      document.getElementById('menue' + x).style.display = 'none'; 
    }
  })
}

function switchMenueStatistik(name) {
  const names = ['Allgemein', 'Freunde', 'ComingSoon'];
  switchMenue(name, names);
}

function favoritenErmitteln() {
  $.get('../html/favoritenErmitteln.php', function(data){
    if(data.favoritenLokal) return;

    data.favoriten.forEach(function(x){
      let json = {tag: 'div', 
                  attributes: [{name: 'class', value: 'untermenue unsichtbar'}],
                  children: [
                    {
                      
                    }
                  ]};

    })
  })
}

/* Struktur: {
    tag: 'input',
    innerHtml: 'Du stinkst',
    attribute: [{name: 'type', value: 'button'}, {name: 'class', value: 'unsichtbar'}],
    children: [{
      tag: '...',
      attribute: [{...}],
      children: [{...}]
    }]
  }
*/

function elementErstellen(json) {
  if(json == null) {
    console.log('Json war null bei elementErstellen()'); 
    return null;
  }

  let element = document.createElement(json.tag);
  if(typeof json.innerHtml !== undefined){
    element.innerHtml = json.innerHtml;
  }
  json.attribute.forEach(attribut => element.setAttribute(attribut.name, attribut.value));
  json.children.forEach(json => element.appendChild(elementErstellen(json)));

  return element;
}
