

function start() {

    $("#inicio").hide();

    $("#fundogame").append("<div id='jogador' class='anima1' ></div> ");
    $("#fundogame").append("<div id='enimigo1' class='anima2' ></div> ");
    $("#fundogame").append("<div id='enimigo2' class='anima3'  ></div> ");
    $("#fundogame").append("<div id='amigo'  class='anima4'></div> ");



    var jogo = {}

    //movimento dos pessonagems 
    var tecla = {
        left: 37,
        right: 39,
        up: 38,
        down: 40,
        space: 32
    }
    var velocidade = 5;
    var velocidade2 = 2;
    var positionY = parseInt(Math.random() * 550);
    var amigopositionY = parseInt(Math.random() * 550);
    var vidas = 3;
    var podeAtirar=true;
    jogo.timer = setInterval(loop, 30);
    jogo.pressionou = [];


    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
        
    })
    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    })



  

  






    function loop() {
        moveFundo();
        movejogador();
        moveInimigo();
        moveAmigo();
        colisao();
       
    }
    
   
    function disparo() {
        if(podeAtirar == true){
            podeAtirar=false
           

            topo = parseInt($("#jogador").css("top"))
            positionX = parseInt($("#jogador").css("left"))
            tiroX = positionX + 50;
            topoTiro= topo +10;
            $("#fundogame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 30);
            
        }
        function executaDisparo(){
            positionX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", positionX + 15)
            if(positionX>900){
                window.clearInterval(tempoDisparo)
                tempoDisparo= null;
                $("#disparo").remove();
                podeAtirar=true
    
    
            }
        }
        
    }


    function moveFundo() {

        esquerda = parseInt($("#fundogame").css("background-position"));
        $("#fundogame").css("background-position", esquerda - 1);
    }

    function movejogador() {
        if (jogo.pressionou[tecla.up]) {
            var top0 = parseInt($("#jogador").css("top"));
            if (top0 > 20)
                $("#jogador").css("top", top0 - 4)
        }
        if (jogo.pressionou[tecla.down]) {
            var down0 = parseInt($("#jogador").css("top"));
            if (down0 < 550)
                $("#jogador").css("top", down0 + 4)
        }
        if (jogo.pressionou[tecla.left]) {
            var left0 = parseInt($("#jogador").css("left"));
            if (left0 > 10)
                $("#jogador").css("left", left0 - 4)
        }
        if (jogo.pressionou[tecla.right]) {
            var right0 = parseInt($("#jogador").css("left"));
            if (right0 < 850)
                $("#jogador").css("left", right0 + 4)
        }
        if(jogo.pressionou[tecla.space]){
            console.log(jogo.pressionou[tecla.space])
            disparo();
        }
    }
    function moveInimigo() {
        positionX = parseInt($("#enimigo1").css("left"));
        $("#enimigo1").css("left", positionX - velocidade);
        $("#enimigo1").css("top", positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334)
            $("#enimigo1").css("left", 764);
            $("#enimigo1").css("top", positionY);
        }
        positionX = parseInt($("#enimigo2").css("left"));
        $("#enimigo2").css("left", positionX + velocidade2);
        $("#enimigo2").css("top", amigopositionY);

        if (vidas == 0) {

            $("#fundogame").append("<div id='lost' class='animalost' > </div> ");
            $("#fundogame").append("<H1 id='die' >YOU Friend DIE, BRO!!</H1>");
            $("#jogador").remove();
            $("#enimigo1").remove();
            $("#enimigo2").remove();
            $("#amigo").remove();
            clearInterval(jogo.timer)
            setTimeout(() => {
                $("#lost").remove();
                $("#die").remove();
                $("#inicio").show();
                clearInterval()
            }, 5000);

        }

        if (vidas > 2) {
           
                   
            $("#jogador").css("border-style", "solid");
            $("#amigo").css("border-style", "solid");

           
            

        }
        if (vidas === 2) {
           
                   
            $("#jogador").css("border-style", "dashed");
            $("#amigo").css("border-style", "dashed");

            $("#fundogame").append("<div id=morre2 > Vai Morrer!! 2/3</div> ");
            setTimeout(() => {
                $("#morre2").remove();
                
                clearInterval()
            }, 10);
            

        }

        if (vidas === 1) {
            $("#jogador").css("border-style", "none");
            $("#amigo").css("border-style", "none");
            $("#fundogame").append("<div id=morre2 > Vai Morrer!! 1/3</div> ");
            setTimeout(() => {
                $("#morre2").remove();
                
                clearInterval()
            }, 10);
        }

        if (positionX >= 850) {
            amigopositionY = parseInt(Math.random() * 334)
            $("#enimigo2").css("left", 0);
            $("#enimigo2").css("top", amigopositionY);
            vidas = vidas - 1

        }
    }


    function moveAmigo() {
        amigopositionX = parseInt($("#amigo").css("left"));
        $("#amigo").css("top", amigopositionY + velocidade);
        $("#amigo").css("left", amigopositionX);

        if (positionX <= 0) {
            amigopositionY = parseInt(Math.random() * 550)
            $("#amigo").css("top", 764);
            $("#amigo").css("left", amigopositionX);
        }
    }


   
   
    function colisao(){
        var colisao1= ($("#jogador").collision($("#enimigo1")))
        var colisao2= ($("#jogador").collision($("#enimigo2")))
        var amigo= ($("#jogador").collision($("#amigo")))
      
        if(colisao1.length>0){
            enemigo1X = parseInt($("#enemigo1").css("left"))
            enemigo1Y = parseInt($("#enemigo1").css("top"))
            
          
            positionY = parseInt(Math.random()*600);
            $("#enemigo1").css("left",694);
            $("#enemigo1").css("top",positionY);
            $("#jogador").css("left",30);
            $("#jogador").css("top", 50);
            vidas= vidas  -1
           
        }
        if(colisao2.length>0){
            enemigo1X = parseInt($("#enemigo2").css("left"))
            enemigo1Y = parseInt($("#enemigo2").css("top"))
            $("#jogador").css("left",30);
            $("#jogador").css("top", 50);
            
          if(vidas > 6){
              positionY = parseInt(Math.random()*600);
              $("#enimigo2").css("left", 10);
              $("#enimigo2").css("top",positionY );
             

          }
        }
        if(amigo.length>0){
            enemigo1X = parseInt($("#amigo").css("left"))
            enemigo1Y = parseInt($("#amigo").css("top"))
            
          
            positionY = parseInt(Math.random()*600);
            $("#jogador").css("left",30);
            $("#jogador").css("top", positionY);
            
            $("#enimigo2").css("left", 10);
            $("#enimigo2").css("top",positionY );
            vidas= vidas  + 1
            if(vidas > 10){
                velocidade = 10;
               velocidade2 = 6;

    $("#jogador").css("top", top0 - 8)
    $("#jogador").css("top", down0 + 8)
    $("#jogador").css("left", left0 - 8)
    $("#jogador").css("left", right0 + 8)
           }
            console.log(vidas)
        }
}



}

        
        
    