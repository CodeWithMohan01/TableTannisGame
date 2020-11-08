
var canvas;
var canasContext;
var ballx = 50;
var bally = 50;
var ballSpeedx = 10;
var ballSpeedy = 4;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1y = 250;
var paddle2y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
		var rect = canvas.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x:mouseX,
			y:mouseY
		};
}

function handleMouseClick(evt) {
		if(showingWinScreen) {
			player1Score = 0;
			player2Score = 0;
			showingWinScreen = false
			}
		}

window.onload = function() {
		console.log("HELLO MOHAN!");
		canvas = document.getElementById('gameCanvas');
		canvasContext = canvas.getContext('2d');
		
		var framesPerSecond = 30;
		setInterval(callBoth, 1000/framesPerSecond);
		
		canvas.addEventListener('mousedown',handleMouseClick);
		
			canvas.addEventListener('mousemove',
			function(evt) {
				var mousePos = calculateMousePos(evt);
				paddle1y = mousePos.y-(PADDLE_HEIGHT/2);
				});
}

function callBoth() {
		drawEverything();
		moveEverything();
}

function ballReset() {
		if(player1Score >= WINNING_SCORE ||
		   player2Score >= WINNING_SCORE) {
		   showingWinScreen = true;
		   }
		
		ballx = canvas.width/2;
		bally = canvas.height/2;
	    ballSpeedx = -ballSpeedx;
	}

function computerMovement() {
		var paddle2yCenter = paddle2y + (PADDLE_HEIGHT/2);
		if(paddle2yCenter < bally-35) {
			paddle2y += 6;
			} else if(paddle2yCenter > bally+35) {
					paddle2y -= 6;
					}
}
	
function moveEverything() {
		if(showingWinScreen) {
		return;
		}

		computerMovement();
		
		ballx += ballSpeedx;
		bally += ballSpeedy;
		
		if(ballx < 0) {
			if(bally > paddle1y &&
			   bally < paddle1y + PADDLE_HEIGHT){
			    ballSpeedx = -ballSpeedx;
			} else {
					player2Score++;
					ballReset();
					}
		}
		if(ballx > canvas.width) {
			if(bally > paddle2y && 
				bally < paddle2y+PADDLE_HEIGHT) {
				ballSpeedx = -ballSpeedx;
				} else {
						player1Score++;
						ballReset();
						}
		}
		if(bally < 0) {
		ballSpeedy = -ballSpeedy;
		}
		if(bally > canvas.height) {
		ballSpeedy = -ballSpeedy;
		}
}
		
	//Graph code;
function drawEverything() {
		canvasContext.fillStyle = '#17b978';
		canvasContext.fillRect(0,0,canvas.width,canvas.height);
		
		
		//Winning massage;
		if(showingWinScreen) {
		canvasContext.fillStyle = '#f4f9f4';
		if(player1Score >= WINNING_SCORE) {
			canvasContext.fillStyle = '#f4f9f4';
			canvasContext.fillText("lEFT Player Won!", 350, 200);
		}
		if(player2Score >= WINNING_SCORE) {
			canvasContext.fillStyle = '#f4f9f4';
			canvasContext.fillText("Right Player Won!", 350, 200);
		}
		canvasContext.fillText("click to continue", 350, 300);
		return;
		} 
		//Center Net code;
		for(var i=0; i<canvas.height; i+=40){
		canvasContext.fillStyle = '#f4f9f4';
		canvasContext.fillRect(canvas.width/2-1,i,2,20);
		}
		
		//left side paddle;
		canvasContext.fillStyle = '#f4f9f4';
		canvasContext.fillRect(0,paddle1y,PADDLE_THICKNESS,PADDLE_HEIGHT);
		
		//Right side paddle;
		canvasContext.fillStyle = '#f4f9f4';
		canvasContext.fillRect(canvas.width-PADDLE_THICKNESS,paddle2y,PADDLE_THICKNESS,PADDLE_HEIGHT);
		
		//its ball;
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(ballx,bally,10,0, Math.PI*2, true);
		canvasContext.fill();
		
		//Score board;
		canvasContext.fillText(player1Score, 100,100);
		canvasContext.fillText(player2Score, canvas.width-100,100);
}