$(document).ready(function(){
  window.addEventListener('scroll', toggleNavbar);
  document.querySelectorAll("#comingsoon").forEach( x => x.addEventListener("click",comingsoon));
  $(".backtotopdiv").click(backtotop);
  $(".logo").click(imageclick);
  setNavbarReferences();
});

function backtotop(){
  window.scroll(0,0);
}

function comingsoon(){
  window.alert("Coming soon");
}

function toggleNavbar() {
  var nav = document.getElementById('navvvv');
  if(window.pageYOffset > 265) {
      document.getElementById('navvvv').classList.add('stickynavvvv');
      nav.style.position = "fixed";
      nav.style.top = "0";
      nav.style.marginTop = "0px";

    } else {
      nav.style.position = "relative";
      nav.style.top = 265;
    }
}

function imageclick(){
  window.location.href = "../html/index.php";
}

function setNavbarReferences() {
  let dictionary = {
    homeNav: '../html/index.php',
    auswahlNav: '../html/spielauswahl.php',
    accountNav: '../html/account.php'
  };

  $.each(dictionary, function(key, value){
    $("[name='" + key + "']").each(function(){
      $(this).attr("href", value);
    });
  });
}

function showHideBackdrop(){
  const divId = 'backdrop';

  if(document.getElementById(divId) !== null){
    document.getElementById(divId).remove();
  }else{
    let div = document.createElement('div');
    div.id = 'backdrop';
    document.body.appendChild(div);
  }
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

function computedStyle(el,style) {
  var cs;
  if (typeof el.currentStyle != 'undefined'){
      cs = el.currentStyle;
  }
  else {
      cs = document.defaultView.getComputedStyle(el,null);
  }
  return  cs[style];
}

function getParameterStringGeneral(einstellungen) {
  let result = '';
    
  for (let property in einstellungen){
      if(einstellungen.hasOwnProperty(property)){
          if(einstellungen[property] === 0){
              return '';
          }
          result += property + '=' + einstellungen[property] + ';'; 
      }
  }

  result.slice(0, result.length - 1);

  return result;
}
