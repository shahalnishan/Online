var popbox = document.getElementById("popupbox")
var clicked = false;
var a = []


function popup() {
  // var min = 2,
  //   max = 5;
    var rand = 1;
  // var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
  console.log('Wait for ' + rand + ' minutes');
  alertbox()
  setTimeout(popup, rand * 60000);
}


function alertbox(){
	popbox.style.visibility = "visible"
	setTimeout(function(){
		popbox.style.visibility = "hidden"
	},3000)
  verifypop()

}

function toggleclick(){
  clicked = true;
}


function verifypop(){
  if(clicked){
    a.push(1)
    clicked = false;
  }
  else{
    a.push(0)
  }
}


popup()