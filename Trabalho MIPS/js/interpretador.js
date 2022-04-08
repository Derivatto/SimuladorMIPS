var interpretador = {
    text:[],
};

interpretador.modos = [{regex:/^[^j/][a-z]+[ ]+[$][a-z][a-z|0-9][,][ ]*[$]*[a-z]*[a-z|0-9]+[ ]*[,][ ]*[$]*[a-z]*[a-z|0-9]+/,
token: "op3A"},
{regex:/^[j][a-z]*[ ][$]*[a-z]*[a-z|0-9]+/, token:"op1A"}];

interpretador.getTokens = function(str)
{
    if(interpretador.modos[0].regex.test(str)) return interpretador.modos[0].token;
    
    else if(interpretador.modos[1].regex.test(str)) return interpretador.modos[1].token;

    else return null;
};




