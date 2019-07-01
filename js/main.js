function backtotop(){
  window.scroll(0,0);
}

function comingsoon(){
  window.alert("Coming soon");
}


document.querySelectorAll(".accountButton").forEach( x => x.addEventListener("click",comingsoon));
document.querySelector(".backtotopdiv").addEventListener("click",backtotop);
