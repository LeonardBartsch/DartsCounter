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
  window.addEventListener('scroll', toggleNavbar);
  document.querySelectorAll("#comingsoon").forEach( x => x.addEventListener("click",comingsoon));
  document.querySelector(".backtotopdiv").addEventListener("click",backtotop);
  document.querySelector(".logo").addEventListener("click",imageclick);
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
  window.location.href = "../html/index.html";
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
