//A simple html5 draw board



var prepareCanvas = function () {
  var canDiv = document.getElementById("canvasDiv");
  var canvasWidth="400";
  var canvasHeight = "400";
  canvas     = document.createElement("canvas");
  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);
  canvas.setAttribute("id", 'canvas');
  canDiv.appendChild(canvas);

  context = canvas.getContext("2d");

  var clickX = new Array();
  var clickY = new Array();
  var clickDrag = new Array();

  var paint;

  function addClick(x,y,draggin){
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(draggin);
  }

  function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.strokeStyle = "#df4b26";
    context.lineJoin    = "round";
    context.lineWidth   = 5;

    for(i = 0; i < clickX.length;i ++){
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
      }else{
        context.moveTo(clickX[i]-1, clickY[i]);
      }

     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();


    }
  }


  $("#canvas").mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    redraw();
  });

  $("#canvas").mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }

  });

  $('#canvas').mouseup(function(e){
    paint = false;
  });

  $('#canvas').mouseleave(function(e){
    paint = false;
  });



}
