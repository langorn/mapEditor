var mapZone = document.getElementById('mapZone');
var context = mapZone.getContext("2d");


var mapEditor = {
   plot:[],
   stage:null,
   layer:null,
   group:null,
   lineGroup:null,
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
        dashArray: [1,2]
      }); 

      lineGroup.add(greenLine)
      layer.add(lineGroup);
      stage.add(layer);
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





