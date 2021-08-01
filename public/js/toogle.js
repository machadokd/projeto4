function newFace(e) {
    var a = !1;
    "devicePixelRatio" in window && (a = window.devicePixelRatio > 1);
    var t = new Image;
    return t.src = "imagens/" + e + (a ? "@2x" : "") + ".png", t
  }
  
  window.onload = function exampleFunction() {
    var imgs = $("#faces").empty()
  
    for (aux = 0; aux < 100; aux++) {
      imgs.prepend(newFace("green"));
    }
    setFormulaById("calcu")
  }
  
  function genero(e) {
    return e && $(e).addClass("active").siblings().removeClass("active"), $("#male").hasClass("active") ? 1 : 0
  }
  
  function masc(){
    $("#gen").attr('value','M')
  }
  
  function fem(){
    $("#gen").attr('value','F')
  }
  
  function fuma(){
    $("#fumador").attr('value','SIM')
  }
  
  function nfuma(){
    $("#fumador").attr('value','NAO')
  }
  
  function diab(e) {
    return (e && $(e).addClass("active").siblings().removeClass("active"), $("#diabetes_yes").hasClass("active") ? 1 : 0)
  }
  
  function smoker(e) {
    return e && $(e).addClass("active").siblings().removeClass("active"), $("#smoker_yes").hasClass("active") ? 1 : 0
  }
  
  function bptreatment(e) {
    return e && !$(e).parent().hasClass("disabled") && $(e).addClass("active").siblings().removeClass("active"), $("#bptreatment_yes").hasClass("active") ? 1 : 0
  }
  
  function fibrilhacao(e) {
    return e && !$(e).parent().hasClass("disabled") && $(e).addClass("active").siblings().removeClass("active"), $("#fibrilhacao_yes").hasClass("active") ? 1 : 0
  }
  
  function hivertrofia(e) {
    return e && !$(e).parent().hasClass("disabled") && $(e).addClass("active").siblings().removeClass("active"), $("#fibrilhacao_yes").hasClass("active") ? 1 : 0
  }
  
  function caludicacao(e) {
    return e && !$(e).parent().hasClass("disabled") && $(e).addClass("active").siblings().removeClass("active"), $("#caludicacao_yes").hasClass("active") ? 1 : 0
  }
  
  function cardio(e) {
    return e && !$(e).parent().hasClass("disabled") && $(e).addClass("active").siblings().removeClass("active"), $("#cardio_yes").hasClass("active") ? 1 : 0
  }
  
  function yo() {
    var gen = document.formulario.pressaoArterialSistolicaRange.value
    console.log(gen)
  }
  
  function setFormula(e) {
      setFormulaById($(e).data("calc"))
  }
  
  function setFormulaById(e) {
      e && (_formula_id = e, $("#formula_selector").find("li").removeClass("active").filter(function(e) {
          return $(this).data("calc") == _formula_id
      }).addClass("active"), 
      "calcu" == e && ($("#calculadora").show()) && ($("#resultados").show()) && ($("#div_recomendacoes").show()) && ($("#login_form").hide() && ($("#registo_form").hide()) && ($("#recuperacao_form").hide())), 
      "login"== e && ($("#calculadora").hide()) && ($("#resultados").hide()) && ($("#div_recomendacoes").hide()) && ($("#login_form").show()) && ($("#registo_form").hide()) && ($("#recuperacao_form").hide()))
  }
  
  function mostraRegisto(){
    if($("#registo_form").is(":hidden")){
      $("#registo_form").show() && $("#login_form").hide() && $("#recuperacao_form").hide()
    }
  }
  
  function mostraLogin(){
    if($("#registo_form").is(":visible") || $("#recuperacao_form").is(":visible")){
      $("#registo_form").hide() && $("#login_form").show() && $("#recuperacao_form").hide()
    }
  }
  
  function mostraRecuperacao(){
    if($("#login_form").is(":visible")){
      $("#recuperacao_form").show() && $("#registo_form").hide() && $("#login_form").hide() 
    }
  }
  
  function adjustSlider(slider, textbox){
      var slid = document.getElementById(slider)
    var text = document.getElementById(textbox)
    
    slid.value = text.value
  }
  
  function adjustBox(slider, textbox){
    var slid = document.getElementById(slider)
    var text = document.getElementById(textbox)
  
    text.value = slid.value
  }
  
  
  function calc2() {
    var gen = genero()
    var idade = document.formulario.idadeRange.value
    var fumador = smoker()
    var sexo = "M"
    var pas = document.formulario.pressaoArterialSistolicaRange.value
    var colesterol_total = document.formulario.colestrolTotalValue.value
    var ldl = document.formulario.colestroLDLValue.value
    console.log("LDL "+ ldl)
  
  
    var altura = document.formulario.alturaValue.value
    var peso = document.formulario.pesoValue.value
    peso.replace(",", ".");
  
    var imc = Math.round(peso / ((altura / 100) * (altura / 100)) * 100) / 100
  
  
    if (gen == 0) {
      sexo = 'F'
    }
  
    if(idade < 40 || idade > 65){
      document.getElementById("resultado").innerHTML = "Idade têm que ser entre 40 e 65"
      var matrizScore= $("#matriz_score").empty()
      matrizScore.prepend('<img id="imagem_matriz" src="imagens/m40.png" />')
      $("#matriz_score").css('opacity' , '0.25')
    }else if(colesterol_total == ""){
      document.getElementById("resultado").innerHTML = "Colestrol Vazio"
    }else if(pas == ""){
      document.getElementById("resultado").innerHTML = "Pressão Arterial Vazia"
    }
    else{
      document.getElementById("resultado").innerHTML = ""
      if (sexo !== "" && idade !== "" && fumador !== "" && pas !== "" && colesterol_total !== "") {
        if (sexo == "M") {//Homens
          alfa_cor = -22.1;
          alfa_ncor = -26.7;
          p_cor = 4.71;
          p_ncor = 5.64;
        } else {//Mulheres
          alfa_cor = -29.8;
          alfa_ncor = -31.0;
          p_cor = 6.36;
          p_ncor = 6.62;
        }
  
        
    
        B_fumador_cor = 0.71;
        B_fumador_ncor = 0.63;
        B_colesterol_cor = 0.24;
        B_colesterol_ncor = 0.02;
        
        colesterol_mmol = colesterol_total / 38.67;
  
        B_ta_cor = 0.018;
        B_ta_ncor = 0.022;
    
        st1_1_cor = Math.exp(-(Math.exp(alfa_cor) * Math.pow((idade - 20), p_cor)));
        st1_1_ncor = Math.exp(-(Math.exp(alfa_ncor) * Math.pow((idade - 20), p_ncor)));
        st1_2_cor = Math.exp(-(Math.exp(alfa_cor) * Math.pow((idade - 10), p_cor)));
        st1_2_ncor = Math.exp(-(Math.exp(alfa_ncor) * Math.pow((idade - 10), p_ncor)));
    
        w_cor = B_colesterol_cor * (colesterol_mmol - 6) + B_ta_cor * (pas - 120) + B_fumador_cor * fumador;
        w_ncor = B_colesterol_ncor * (colesterol_mmol - 6) + B_ta_ncor * (pas - 120) + B_fumador_ncor * fumador;
    
        st3_1_cor = Math.pow(st1_1_cor, Math.exp(w_cor));
        st3_1_ncor = Math.pow(st1_1_ncor, Math.exp(w_ncor));
        st3_2_cor = Math.pow(st1_2_cor, Math.exp(w_cor));
        st3_2_ncor = Math.pow(st1_2_ncor, Math.exp(w_ncor));
    
        st4_cor = st3_2_cor / st3_1_cor;
        st4_ncor = st3_2_ncor / st3_1_ncor;
    
        st5_cor = 1 - st4_cor;
        st5_ncor = 1 - st4_ncor;
    
        st6 = Math.round((st5_cor + st5_ncor) * 100 * 10) / 10;
  
  
  
        console.log("st1_1_cor", st1_1_cor);
        console.log("st1_1_ncor",st1_1_ncor);
        console.log("st1_2_cor",st1_2_cor);
        console.log("st1_2_ncor",st1_2_ncor);
       
  
        console.log("w_cor", w_cor); 
        console.log("w_ncor",);
  
        console.log("st3_1_cor",st3_1_cor);
        console.log("st3_1_ncor",st3_1_ncor);
        console.log("st3_2_cor",st3_2_cor);
        console.log("st3_2_ncor",st3_2_ncor);
  
        console.log("st4_cor",st4_cor);
        console.log("st4_ncor",st4_ncor);
  
        console.log("st5_cor",st5_cor);
        console.log("st5_ncor",st5_ncor);
  
        console.log("ST6 ", st6);
    
        document.getElementById("resultado").innerHTML = st6
  
        var matrizScore= $("#matriz_score").empty()
        $("#matriz_score").css('opacity' , '1')
        if(sexo=="F"){
          if(fumador==1){
            if(idade >= 40 && idade<50){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m40s.png" />')
            }
            if(idade >= 50 && idade<55){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m50s.png" />')
            }
            if(idade >= 55 && idade<60){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m55s.png" />')
            }
            if(idade >= 60 && idade<65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m60s.png" />')
            }
            if(idade == 65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m65s.png" />')
            }
          }else{
            if(idade >= 40 && idade<50){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m40.png" />')
            }
            if(idade >= 50 && idade<55){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m50.png" />')
            }
            if(idade >= 55 && idade<60){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m55.png" />')
            }
            if(idade >= 60 && idade<65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m60.png" />')
            }
            if(idade == 65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/m65.png" />')
            }
          }
        }else{
          if(fumador==1){
            if(idade >= 40 && idade<50){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h40s.png" />')
            }
            if(idade >= 50 && idade<55){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h50s.png" />')        
            }
            if(idade >= 55 && idade<60){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h55s.png" />')         
            }
            if(idade >= 60 && idade<65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h60s.png" />')
            }
            if(idade == 65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h65s.png" />')
            }
          }else{
            if(idade >= 40 && idade<50){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h40.png" />')           
            }
            if(idade >= 50 && idade<55){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h50.png" />')     
            }
            if(idade >= 55 && idade<60){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h55.png" />')
            }
            if(idade >= 60 && idade<65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h60.png" />')
            }
            if(idade == 65){
              matrizScore.prepend('<img id="imagem_matriz" src="imagens/h65.png" />')
            }
          }
        }
      } else {
        
      }
    }  
        $("#resultado_final").attr('value', st6)
  
        if(sexo == "F"){
          regressao = Math.round(st6 * 4);
        }else{
          regressao = Math.round(st6 * 3);
        }
  
        $('#recomendacoes').empty()
        $('#titulo-recomendacoes').empty()
  
        if(st6 < 1){
          if(ldl < 55){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 55 && ldl < 70){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')          
          }else if(ldl >= 70 && ldl <100){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 100 && ldl <116){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 116 && ldl <190){
            $('#recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
          }else if(ldl >= 190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }
        }else if(st6>=1 && st6<5){
          if(ldl < 55){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 55 && ldl < 70){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')          
          }else if(ldl >= 70 && ldl <100){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 100 && ldl <116){
            $('#recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
          }else if(ldl >= 116 && ldl <190){
            $('#recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
          }else if(ldl >= 190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          } 
        }else if(st6>=5 && st6<10){
          if(ldl < 55){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 55 && ldl < 70){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')          
          }else if(ldl >= 70 && ldl <100){
            $('#recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
          }else if(ldl >= 100 && ldl <116){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }else if(ldl >= 116 && ldl <190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }else if(ldl >= 190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          } 
        }else if(st6>=10){
          if(ldl < 55){
            $('#recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(0, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Está num bom caminho! </h5>')
            $('#recomendacoes').append('<p>Comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares. Deve continuar a otimizar, sempre que possível, esses fatores de estilo de vida! </p>')
          }else if(ldl >= 55 && ldl < 70){
            $('#recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 255, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
          }else if(ldl >= 70 && ldl <100){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }else if(ldl >= 100 && ldl <116){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }else if(ldl >= 116 && ldl <190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          }else if(ldl >= 190){
            $('#recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').css('background-color', 'rgba(255, 0, 0, 0.63)')
            $('#titulo-recomendacoes').append('<h5># Deve ter em atenção que os comportamentos saudáveis, como uma dieta saudável, não fumar, praticar atividade física regular e controlar adequadamente o peso, estão fortemente recomendados para a prevenção de doenças cardiovasculares.  </h5>')
            $('#recomendacoes').append('<p>De acordo com a avaliação desta calculadora, haverá alguns aspetos do seu estilo de vida que tem que otimizar:</p>')
            $('#recomendacoes').append('<p>a)	Dieta saudável é pobre em gorduras saturadas, sem gorduras trans,  rica em legumes e vegetais, moderada em frutas frescas, moderada em consumo de álcool e com baixo consumo de sal (<5,8g/dia).</p>')
            $('#recomendacoes').append('<p>b)	Se fuma, deve pensar seriamente em deixar de fumar. Deixar de fumar é um dos maiores benefícios, para a sua saúde. O seu médico pode dar uma ajuda nesse processo!</p>')
            $('#recomendacoes').append('<p>c)	Atividade física regular considera-se quando se pratica: pelo menos 150 minutos por semana, de atividade moderada; ou, pelo menos 75 minutos por semana, de atividade vigorosa; ou, uma combinação equivalente das mesmas. Qualquer atividade é melhor do que nenhuma! </p>')
            $('#recomendacoes').append('<p>d)	Controlo adequado de peso pode avaliar-se pelo índice de massa coprporal (IMC). O IMC normal corresponde a um valor entre 18,5 e 24,9. O seu imc corresponde a: '+ imc +' Um aspeto importante, relacionado com o peso é também o seu perímetro da cintura. Deve ser inferior a 94 cm no homem e inferior a 80 cm na mulher. Caso a melhoria das medidas de estilo de vida não seja suficiente, poderá precisar de medicação. O seu médico, saberá quando (e qual) medicação está recomendada para si!</p>')
            $('#recomendacoes').append('<br><p>A melhoria das medidas de estilo de vida pode já não ser, de momento, suficiente. Deve consultar o seu médico, para ser avaliada a necessidade de medicação. </p>')
          } 
        }  
  
        $('#resultadoFramingham').text("Risco de Doença Cardivascular Total (Fatal e Não Fatal): " + regressao + "%")
        var round = Math.round(regressao);
  
        $("#faces").css('opacity' , '1')
        var imgs = $("#faces").empty()
        for (aux = 0; aux < round && aux < 100; aux++) {
          imgs.prepend(newFace("bad"))
        }
        for (aux = 0; aux < 100 - round; aux++) {
          imgs.prepend(newFace("green"))
        }
      
        
  
        if($("#botao_guardar").css('opacity') != 1){
          $("#botao_guardar").css('opacity', '1') 
          $("#botao_guardar").attr('disabled', false)
        }
    
  }
  
  function setId(id_calculo){
    document.getElementById("id").innerHTML = id_calculo;
  }
  
  function getId(){
    return document.getElementById("id").innerHTML;
  }

  