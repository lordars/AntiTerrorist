

function start(){

    $("#inicio").hide();

    $("#fundogame").append("<div id='jogador' class='anima1' ></div> ");
    $("#fundogame").append("<div id='enimigo1' class='anima2' ></div> ");
    $("#fundogame").append("<div id='enimigo2' class='anima3'  ></div> ");
    $("#fundogame").append("<div id='amigo'  class='anima4'></div> ");

    
    var jogo ={}

    //movimento dos pessonagems 
    var tecla={
        left:37,
        right:39,
        up:38,
        down:40,
        space:32
    }

    jogo.pressionou = [];

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    })
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    })
    





    jogo.timer = setInterval(loop,30);
    
    function loop(){
        moveFundo();
        movejogador();
    }

        
    function moveFundo(){
       
        esquerda= parseInt($("#fundogame").css("background-position"));
        $("#fundogame").css("background-position", esquerda-1);
    }

    function movejogador(){
        if(jogo.pressionou[tecla.up]){
            var top0= parseInt($("#jogador").css("top"));
            if(top0>20 )
            $("#jogador").css("top", top0-10)
        }
        if(jogo.pressionou[tecla.down]){            
            var down0= parseInt($("#jogador").css("top"));
            if(down0<550 )
            $("#jogador").css("top", down0 + 10)
        }
        if(jogo.pressionou[tecla.left]){
            var left0= parseInt($("#jogador").css("left"));
            if(left0>10 )
            $("#jogador").css("left", left0-10)
        }
        if(jogo.pressionou[tecla.right]){
            var right0= parseInt($("#jogador").css("left"));
            if(right0<850 )
            $("#jogador").css("left", right0 + 10)
        }
    }


    



}