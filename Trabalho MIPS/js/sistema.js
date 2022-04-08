
function erro(mensagem)
{
    var saida = document.getElementById("output");
    saida.innerText = mensagem;
}


function setRegistradorManual(e)
{
    var nReg = e.target.id;
    let num = parseInt(e.target.innerText);
    nReg = nReg.substring(4);
    processador.setRegistrador(nReg,num);
}

function limpar()
{
   document.getElementById("textoDoUsuario").value = "";
   document.getElementById("saidaLog").value = "";
   for(let i = 0; i < 32; i++)
   {
       processador.registrador[i] = 0;
   }

   updateRegister();
}

function updateRegister()
{
    var spans = document.getElementsByTagName("span");

    for(let i = 0; i < spans.length; i++)
    {
        spans[i].innerText = processador.registrador[i];
    }


}

function updateMEM()
{
    var tdsMEM = document.getElementsByClassName("tdMEM");

    for(let i = 0; i < tdsMEM.length; i++)
    {
        tdsMEM[i].innerHTML = 16777216*processador.memoria[4*i]+65536*processador.memoria[4*i+1]+256*processador.memoria[4*i+2]+processador.memoria[4*i+3];
    }
}


function resetarPC()
{
    processador.programCounter = 0;
    atualizarPC();
}

function atualizarPC()
{
    document.getElementById("numPC").innerHTML = 4*processador.programCounter;
}

function printComando(str)
{
    document.getElementById("saidaLog").value += "Comando " + str + " foi executado\n";
}

function fim()
{
    document.getElementById("saidaLog").value += "fim das instruções";
}