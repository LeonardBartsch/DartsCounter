function switchMenue(name) {
  const names = ['Sicherheit', 'Account', 'ComingSoon'];
  const ausgewaehltClass = 'ausgewaehlt';
  names.forEach(function(x) {
    if(x === name){
      document.getElementById('button' + x).classList.add(ausgewaehltClass);
      document.getElementById('einstellungen' + x).style.display = 'grid';
    }else {
      document.getElementById('button' + x).classList.remove(ausgewaehltClass);
      document.getElementById('einstellungen' + x).style.display = 'none'; 
    }
  })
}