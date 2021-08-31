img="";
status="";
object=[];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function preload() {

}

function modelLoaded() {
    console.log("Model is initialized");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status!="") {
        document.getElementById("status").innerHTML="Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML="No. of Objects Detected : "+objects.length;
        for(i=0; i<objects.length;i++) {
            r=random(255);
            g=random(255);
            b=random(255);
        fill(r, g, b);
        percentage=floor(objects[i].confidence*100)
        text(objects[i].label+" "+percentage, objects[i].x+15, objects[i].y+15);
        noFill();
        stroke(r, g, b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        }
}

}