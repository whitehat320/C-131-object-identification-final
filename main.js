img = '';
status = '';
object1_confidence = 0;
object1_name = "";
object2_confidence = 0;
object2_name = "";
objects=[];

function preload(){
    img = loadImage('dog_cat.jpg');
}

function modelLoaded(){
    console.log('Model Loaded !');
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    
   
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    console.log("Confidence = " + object1_confidence + " name = " + object1_name)
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw(){
    image(img , 0 , 0 , 640 , 420);

    textSize(30);
    if (status != ""){
        for (i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y , objects[i].width, objects[i].height);
        }
    }

}