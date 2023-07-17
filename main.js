song1="";
song2="";
rightWristx=0;
rightWristy=0;
leftWristx=0;
leftWristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
song1status="";
song2status="";

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function setup(){
canvas=createCanvas(600,500);  
canvas.center();  
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("Model is ready! :)");
}

function gotPoses(results){
if (results.length > 0){
    console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;

rightWristx=results[0].pose.rightWrist.x;
rightWristy=results[0].pose.rightWrist.y;

leftWristx=results[0].pose.leftWrist.x;
leftWristy=results[0].pose.leftWrist.y;

console.log("Right wrist - x is",rightWristx,"and y is",rightWristy);
console.log("Left wrist - x is",leftWristx,"and y is",leftWristy);
}
}
function draw(){
image(video, 0,0,600,500)
fill("purple");
stroke("purple");
song1status=song1.isPlaying();
song2status=song2.isPlaying();

if(scoreLeftWrist > 0.2)
{
    song2.stop();
    song1.play();
    circle(leftWristx, leftWristy, 20);
    document.getElementById("song_name").innerHTML="Playing Harry Potter";
}

if(scoreRightWrist > 0.2)
{
    song1.stop();
    song2.play();
    circle(rightWristx, rightWristy, 20);
    document.getElementById("song_name").innerHTML="Playing Peter Pan";
}
}

