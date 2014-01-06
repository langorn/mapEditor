var mapZone = document.getElementById('mapZone');
var context = mapZone.getContext("2d");


var mapEditor = {
   plot:[],
   stage:null,
   layer:null,
   group:null,
   lineGroup:null,
   lastLinePoint:null,
   init:function(){
         // if(stage!=null){
         //    stage.clear();
         //  }
          //Create a new Stage.
          stage = new Kinetic.Stage({
            container:"container",
            width:500,
            height:500
          })
          console.log(stage);
          this.loadBackground(stage);
          //this.zoneName();
          //this.endZone();
          
   },
   loadBackground:function(stage){
         // Create a new layer
         var that = this;
         layer = new Kinetic.Layer();
         // Connect the stage to the layer
         group = new Kinetic.Group();
         lineGroup = new Kinetic.Group({
           draggable: true
          });


         var imageobj = new Image();

         imageobj.onload = function(){
            var img = new Kinetic.Image({
              x: 10,
              y: 10,
              image: imageobj,
            });
            
            group.add(img)
            layer.add(group);
            stage.add(layer);
            that.getPointXY(img);
          };
          imageobj.src = "img/map1.jpg";


   },
   getPointXY:function(img){

      var that = this;
      var container = document.getElementById('container');

        img.on('click', function(evt) {
          var mousePos = getMousePos(container, evt);
          var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;

          mapEditor.plot.push(mousePos.x);
          mapEditor.plot.push(mousePos.y);
          var plotCount=mapEditor.plot.length;
          mapEditor.drawTheLine(mapEditor.plot);
           
        }, false);
    
   },
   drawTheLine:function(plot){
      var that = this;
      var greenLine = new Kinetic.Line({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        points: plot,
        stroke: 'green',
        strokeWidth: 3,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: [1,2],
      }); 

      lastLinePoint = greenLine.getPoints();
      lineGroup.add(greenLine);
      layer.add(lineGroup);
      
      //var x = greenLine.intersects(greenLine);
      //console.log(x);
      stage.add(layer);
      that.drawDone();
   },
   redrawShape:function(things){
        console.log(things[0]);

      var triangle = new Kinetic.Shape({
      drawFunc: function(context) {
          context.beginPath();
          context.moveTo(things[0].x, things[0].y);
          for(var i=1;i<things.length;i++){
            context.lineTo(things[i].x,things[i].y)
          }
          context.closePath();
          // KineticJS specific context method
          context.fillStrokeShape(this);
        },
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 4,
        lineJoin:'round',
        opacity: 0.1
      });
      mapEditor.zoneName('Zone A');
      layer.add(triangle);
      
      stage.add(layer);


   },
   zoneName:function(tooltipDesc){
      // tooltip
      var lastX = lastLinePoint[0].x
      var lastY = lastLinePoint[0].y
      var tooltip = new Kinetic.Label({
        x: lastX,
        y: lastY,
        opacity: 0.75
      });

      tooltip.add(new Kinetic.Tag({
        fill: 'black',
        pointerDirection: 'down',
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: 'round',
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: 10,
        shadowOpacity: 0.5
      }));
      
      tooltip.add(new Kinetic.Text({
        text: tooltipDesc,
        fontFamily: 'Calibri',
        fontSize: 18,
        padding: 5,
        fill: 'white'
      }));
      group.add(tooltip)
      layer.add(group);
      stage.add(layer);

   },
   drawDone:function(){

      var drawDone = document.getElementById('drawDone');
      drawDone.addEventListener('click',function(){
          //alert('green line remove');
          //lineGroup.remove();
          
          layer.remove(lineGroup);
          //layer.draw();
          mapEditor.redrawShape(lastLinePoint);
      })
   },
   quickLoad:function(){


   }
}

  function getMousePos(canvas, evt) {
    //console.log(canvas);
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }





 mapEditor.init();





