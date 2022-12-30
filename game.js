var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;


//Used for initiating the game
//We have used started variable for the purpose that if the user type key for the first time and after that pressing key
//shouldn't restart the game.
var started=false;
$(document).keypress(function(){
    if(started===false){
        started=true;
        nextSequence();
    }
});


//User will make pattern by clicking i.e. adding new colour to the userClickedPattern array
$(".btn").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    //After every click it will check its respective position colour in gamePattern array by invoking checkAnswer()
    checkAnswer(userClickedPattern.length-1);
});


//The following function will trigger in the following cases:-
//i.Initiating the game
//ii.User have made all the correct levels in that levels
//iii.User made any wrong click and the user will have to start over the game by pressing any key
function nextSequence(){
    $("h1").text("Level "+level);
    userClickedPattern=[];
    //Generating the random colour from the buttonColours array
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    //Creating the game pattern i.e. order of colours in which they generated
    gamePattern.push(randomChosenColour);
    //box-selector is a class which makes opacity of clicked button to half i.e 0.5 and removing after 0.1s(or 100ms).
    $("#"+randomChosenColour).addClass("box-selector");
    playSound(randomChosenColour);
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass("box-selector");
    },100);
    //Increasing the value of level for the upcoming level
    level++;
}


//Actually we are checking for each click that if the colour matches then ok if not then game over.
//The currentLevel variable helps in achieving this.
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        //If the user has successfully choosen all the colours in the right order then following condition will satisfy
        //and we will reach to the next level i.e. the addition of new random colour to the gamePattern array.
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


//Function created for playing the different sound with the given name passed as a parameter such as wrong,red,etc.
function playSound(name){
    var audio_name=name+".mp3";
    var audio=new Audio("sounds/"+audio_name);
    audio.play();
}


//This will create animation which is box shadow when the user clicks a particular button
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}


//This will restart the game from level 0 therby re-initialising all the values of the game.
function startOver(){
    level=0;
    userClickedPattern=[];
    gamePattern=[];
    started=false;
}

