function switchMenue(name) {
  const names = ['Sicherheit', 'Account', 'ComingSoon'];
  names.forEach(function(x) {
    if(x === name){
      document.getElementById('button' + x).classList.add('ausgewaehlt');
      document.getElementById('einstellungen' + x).style.display = 'grid';
    }else {
      document.getElementById('button' + x).classList.remove('ausgewaehlt');
      document.getElementById('einstellungen' + x).style.display = 'none';
    }
  })
}