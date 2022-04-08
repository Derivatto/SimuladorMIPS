
var processador = {
    "registrador": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "memoria": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    "Nregist":["zero","at","v0","v1","a0","a1","a2","a3","t0","t1","t2","t3","t4","t5","t6","t7","s0","s1","s2","s3","s4","s5","s6","s7","t8","t9","k0","k1","gp","sp","fp","ra"],

    registradorNomes: {
        "zero":0,
        "at":1,
        "v0":2,
        "v1":3,
        "a0":4,
        "a1":5,
        "a2":6,
        "a3":7,
        "t0":8,
        "t1":9,
        "t2":10,
        "t3":11,
        "t4":12,
        "t5":13,
        "t6":14,
        "t7":15,
        "s0":16,
        "s1":17,
        "s2":18,
        "s3":19,
        "s4":20,
        "s5":21,
        "s6":22,
        "s7":23,
        "t8":24,
        "t9":25,
        "k0":26,
        "k1":27,
        "gp":28,
        "sp":29,
        "fp":30,
        "ra":31,
    },

    programCounter:0,

    texto:"",
    linhas:[],


    controle: 
    {
        "jump":0,
        "branch":0,
        "memRead":0,
        "memToReg":0,
        "ALUOp":0,
        "memWrite":0,
        "ALUSrc":0,
        "RegWrite":0
    }
};



processador.verificarNREG = function(nReg){
    if(processador.registradorNomes.hasOwnProperty(nReg)){
        return true;
    }
    return false;
}

processador.getRegistrador = function(nReg){
    
    nReg = nReg.substring(1);

    if(processador.verificarNREG(nReg))
    {
        return processador.registrador[processador.registradorNomes[nReg]];
    }

        return null;

}

processador.setRegistrador = function(nReg,num)
{
    nReg = nReg.substring(1);

    if(processador.verificarNREG(nReg))
    {
        processador.registrador[processador.registradorNomes[nReg]] = num;
        return;
    }
    else
    {
        return;
    }

}

processador.op = {


    // operações aritméticas
    add: function(dest,scr1,scr2){
        let sum = processador.getRegistrador(scr1) + processador.getRegistrador(scr2);

        processador.setRegistrador(dest,sum);
        processador.programCounter++;
        printComando("add");
    },

    sub: function(dest,scr1,scr2){
        let sub = processador.getRegistrador(scr1) - processador.getRegistrador(scr2);

        processador.setRegistrador(dest,sub);
        processador.programCounter++;
        printComando("sub");
    },

    addi: function(dest,scr,num){
        let sum = processador.getRegistrador(scr) + parseInt(num);

        processador.setRegistrador(dest,sum);
        processador.programCounter++;
        printComando("addi");
    },

    //operações logicas

    and: function(dest,scr1,scr2){
        let ande = processador.getRegistrador(scr1) & processador.getRegistrador(scr2);
        processador.setRegistrador(dest,ande);
        processador.programCounter++;
        printComando("and");
    },

    or: function(dest,scr1,scr2){
        let ore = processador.getRegistrador(scr1) | processador.getRegistrador(scr2);
        processador.setRegistrador(dest,ore);
        processador.programCounter++;
        printComando("or");
    },

    sll: function(dest,scr,num){
        let ssle = processador.getRegistrador(scr) << parseInt(num);
        processador.setRegistrador(dest,ssle);
        processador.programCounter++;
        printComando("sll");
    },

    
    srl: function(dest,scr,num){
        let srle = processador.getRegistrador(scr) >> parseInt(num);
        processador.setRegistrador(dest,srle);
        processador.programCounter++;
        printComando("srl");

    },
    //operações load e store

    lw: function(dest,num,base){
        base = base.substring(1);
        let ender = processador.registrador[processador.registradorNomes[base]] + parseInt(num);
        let aux = processador.getMemoria(ender);

        processador.setRegistrador(dest,aux);
        processador.programCounter++;
        
        printComando("lw");

    },

    sw: function(scr,num,base){
        base = base.substring(1); 
        let ender = processador.registrador[processador.registradorNomes[base]] + parseInt(num);
        let aux = processador.getRegistrador(scr);

        processador.setMemoria(ender,aux);
        processador.programCounter++;
        printComando("sw");

    },

    //Operações de desvio considcional

    beq: function(scr1,scr2,num){
        if(processador.getRegistrador(scr1) == processador.getRegistrador(scr2))
        {
            processador.programCounter += parseInt(num) + 1; 
        }
        else
        {
            processador.programCounter++;
        }
        printComando("beq");

    },

    bne: function(scr1,scr2,num){

        if(processador.getRegistrador(scr1) != processador.getRegistrador(scr2))
        {
            processador.programCounter += parseInt(num) + 1;
        }
        else
        {
            processador.programCounter++;
        }
        printComando("bne");

    },

    slt: function(dest, scr1, scr2){

        if(processador.getRegistrador(scr1) < processador.getRegistrador(scr2))
        {
            processador.setRegistrador(dest,1);
        }

        else
        {
            processador.setRegistrador(dest,0);
        }

        processador.programCounter++;
        printComando("slt");

    },

    //Jumps

    j: function(num){
        processador.programCounter = num;
        printComando("j");

    },

    jr: function(scr){
        let j = processador.getRegistrador(scr);
        processador.programCounter = j;
        printComando("jr");

    },

    jal: function(num){
        let aux = processador.programCounter;
        processador.op.j(num);
        processador.setRegistrador("$ra",aux);
        printComando("jal");

    }
};

processador.setMemoria = function(endereco,num){

    if( endereco >= 128)
    {
        return;
    }
    processador.memoria[endereco] = num;
}

processador.getMemoria = function(endereco)
{
    if( endereco >= 128)
    {
        return;
    }

    return processador.memoria[endereco];
}



processador.runStep = function()
{
    processador.zerarControle();
    processador.texto = document.getElementById("textoDoUsuario").value;
    processador.texto = processador.texto.toLowerCase();
    linhas = processador.texto.split('\n');
    var linhaAtual = linhas[processador.programCounter];
    var tipoInst = interpretador.getTokens(linhaAtual);
    processador.execInst(linhaAtual,tipoInst);

    atualizarPC();
    updateRegister();
    updateMEM();
}

processador.execInst = function(str,tipo)
{

    var vetor = [];

    str = str.replace(" ",",");
    vetor = str.split(",");

    for(let i = 0; i <vetor.length; i++)
    {
        vetor[i] = vetor[i].trim();
    }
    
    if(tipo === "op3A")
    {
        processador.op[vetor[0]](vetor[1],vetor[2],vetor[3]);
    }
    
    else if(tipo === "op1A")
    {
        processador.op[vetor[0]](vetor[1]);
    }
}

processador.runTotal = function()
{

    resetarPC();
    processador.texto = document.getElementById("textoDoUsuario").value;
    processador.texto = processador.texto.toLowerCase();
    processador.linhas = processador.texto.split('\n');
    

    for(let i = 0; i < processador.linhas.length; i++)
    {
        if(processador.linhas[i] == "")
        {
            processador.linhas.splice(processador.linhas.indexOf(i), 1);
        }
    }

    while(processador.programCounter < processador.linhas.length)
    {
        processador.runStep();
    }
    fim();
}

processador.setControle = function(str,valor)
{
    if(processador.controle.hasOwnProperty(str))
    {
        processador.controle[str] = valor;
    }
}

processador.zerarControle = function()
{
    for(const prop in processador.controle)
    {
        processador.controle[prop] = 0;
    }
}