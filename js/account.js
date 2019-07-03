function switch1() {
  colorswitch1();
  toggleMenu2();
}



function colorswitch1() {
  if (document.getElementById('button1').style.background = "white") {
    document.getElementById('button1').style.background = "white"
    document.getElementById('button2').style.background = "#ee9e09"
    document.getElementById('button3').style.background = "#ee9e09"
  }
}

function colorswitch2() {
  if (document.getElementById('button2').style.background != "white") {
    document.getElementById('button2').style.background = "white"
    document.getElementById('button1').style.background = "#ee9e09"
    document.getElementById('button3').style.background = "#ee9e09"
  }
}

function colorswitch3() {
  if (document.getElementById('button3').style.background != "white") {
    document.getElementById('button3').style.background = "white"
    document.getElementById('button1').style.background = "#ee9e09"
    document.getElementById('button2').style.background = "#ee9e09"
  }
}

function colorswitch(number) {
  for(let i = 1; i<= 3; i++) {
    if(number === i){
      document.getElementById('button' + i).classList.add('ausgewaehlt');
    }else {
      document.getElementById('button' + i).classList.remove('ausgewaehlt');
    }
  }
}


function toggleMenu1() {
  var infoBox = document.getElementById('accountinfoUm');
  var sichBox = document.getElementById('sicherheitUm');
  var comiBox = document.getElementById('comingsoonUm');
  if(infoBox.style.display == "none") {
    infoBox.style.display = "grid";
    sichBox.style.display = "none";
    comiBox.style.display = "none";
  } if (infoBox.style.display = "grid") {
    infoBox.style.display = "grid";
    sichBox.style.display = "none";
    comiBox.style.display = "none";
  } else {
    infoBox.style.display = "none";
  }
}

function toggleMenu2() {
  var infoBox = document.getElementById('accountinfoUm');
  var sichBox = document.getElementById('sicherheitUm');
  var comiBox = document.getElementById('comingsoonUm');
  if(sichBox.style.display == "none") {
    sichBox.style.display = "grid";
    infoBox.style.display = "none";
    comiBox.style.display = "none";
  } if (sichBox.style.display = "grid") {
    sichBox.style.display = "grid";
    infoBox.style.display = "none";
    comiBox.style.display = "none";
  } else {
    sichBox.style.display = "none";
  }
}

function toggleMenu3() {
  var infoBox = document.getElementById('accountinfoUm');
  var sichBox = document.getElementById('sicherheitUm');
  var comiBox = document.getElementById('comingsoonUm');
  if(comiBox.style.display == "none") {
    comiBox.style.display = "grid";
    infoBox.style.display = "none";
    sichBox.style.display = "none";
  } if (comiBox.style.display = "grid") {
    comiBox.style.display = "grid";
    sichBox.style.display = "none";
    infoBox.style.display = "none";
  } else {
    comiBox.style.display = "none";
  }
}
