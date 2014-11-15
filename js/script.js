// add event listener to buttons
function buttonActive(e) {

  var allButtons = document.getElementsByTagName('button');
  var clickedButton = e.target;
  var div = document.getElementById('buttons');

  if (clickedButton !== div){
    for (var i = 0; i < allButtons.length; i++){
      allButtons[i].className = 'btn btn-primary';
    }

  clickedButton.className += ' btn-success';

  }
}

var buttons = document.getElementById("buttons");
buttons.addEventListener("click", buttonActive);
