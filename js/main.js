function backtotop(){
  window.scroll(0,0);
}

function comingsoon(){
  window.alert("Coming soon");
}

function toggleNavbar() {
  var nav = document.getElementById('nav');
  var yOff = nav.getBoundingClientRect();
  console.log(yOff.top);
  if(window.pageYOffset > 265) {
      document.getElementById('nav').classList.add('stickynav');
      nav.style.position = "fixed";
      nav.style.top = "0";
      nav.style.marginTop = "0px";

    } else {
      nav.style.position = "relative";
      nav.style.top = 265;
    }
}

window.onload = function() {
  window.addEventListener('scroll', toggleNavbar);
  document.querySelectorAll(".accountButton").forEach( x => x.addEventListener("click",comingsoon));
  document.querySelector(".backtotopdiv").addEventListener("click",backtotop);

}
