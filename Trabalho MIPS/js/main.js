
var botao1 = document.getElementById("botao1");
var botao2 = document.getElementById("botao2");
var botao3 = document.getElementById("botao3");
var botao4 = document.getElementById("botao4");

var spans = document.querySelectorAll("span");

botao1.addEventListener("click",processador.runStep);
botao2.addEventListener("click",processador.runTotal);
botao3.addEventListener("click",resetarPC);
botao4.addEventListener("click",limpar);

document.getElementById("bt1").click();
for(let i = 0; i < spans.length;i++)
{
    spans[i].addEventListener("blur",setRegistradorManual);
}

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }


