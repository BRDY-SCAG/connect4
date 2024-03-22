//Brady Scaggari Connect4 game February 26,2024 



var redPlayer = "R";
var yellowPlayer = "Y";
var currentPlayer = "R";
var gameOver = false;
var board;
var currentColumns;
var rows = 6;
var columns = 7;


window.onload = function() {
	createGame();
}

function createGame(){
	board = [];
	currentColumns = [5, 5, 5, 5, 5, 5, 5];
	for(let r=0; r < rows; r++){
		let row = [];
		for(let c=0; c < columns; c++){
			row.push(' '); //js to push string


			let tile = document.createElement("div"); //creates tile div
			tile.id = r.toString() + "-" + c.toString();// gives each unique tile on board an id
			tile.classList.add("tile");// add tile to tile class for styling. 
			tile.addEventListener("click", setPiece);// event on click calls setPiece function.. 
			document.getElementById("board").append(tile); //insert the tile object into board. 
		}
		board.push(row);
	}
}

function setPiece(){
	if(gameOver){
		return;
	}
	let coords = this.id.split("-"); //split each tile with unique id coords =  [row,column]
	let r = parseInt(coords[0]);
	let c = parseInt(coords[1]);

	r = currentColumns[c]; // setting the row to the number of available columns. initial set piece will be 5, 5 from top of the baord. 

	if(r < 0){
		return;
	}

	board[r][c] = currentPlayer; // the first move is always red player. 
	let tile = document.getElementById(r.toString() + "-" + c.toString()); //get the id of the tile to place
	if(currentPlayer == redPlayer){
		tile.classList.add("red-piece"); //set red piece give id to red piece. 
		currentPlayer = yellowPlayer; // yellow players turn
	}
	else{
		tile.classList.add("yellow-piece"); // set yellow piece give id to yellow piece. 
		currentPlayer = redPlayer; //red players turn
	}
	r-=1; // updates the row height for each column 5 to 4 to 3 to 2 to 1 to 0 . board filled up
	currentColumns[c] = r; // update height of our column. 

	const refreshBtn = document.getElementById("Refresh");
	function handleClick() {
  		window.location.reload();
	}
	refreshBtn.addEventListener("click", handleClick);
	checkforWinner();
}

function checkforWinner(){
	for(let r = 0; r < rows; r++){ //checks horizontally
		for(let c = 0; c < 4; c++){ // subtract columns by three to check 4 in a row. 
			if(checkLine(board[r][c], board[r][c+1],board[r][c+2],board[r][c+3])){//if the tile is not empty check next 4 tiles for horizontal. 
					setWinner(r,c); 
					return;
			}
		}
	}

	for(let c = 0; c < columns; c++){ //start at first column 
		for(let r = 0; r < rows-3; r++){ //start at first row.
			if(board[r][c] != ' '){//
				if(checkLine(board[r][c],board[r+1][c],board[r+2][c],board[r+3][c])) {
					setWinner(r,c);
					return;
				}
			}
		}
	}

	for(let r = 0; r < rows -3; r++){ //checks opposite of diagonal
		for(let c = 0; c < columns-3; c++){
			if(board[r][c] != ' '){
				if(checkLine(board[r][c],board[r+1][c+1],board[r+2][c+2],board[r+3][c+3])) {
					setWinner(r,c);
					return;
				}
			}
		}
	}

	for(let r = 3; r < rows ; r++){ //checks diagonally
		for(let c = 0; c < columns -3; c++){
			if(board[r][c] != ' '){
				if(checkLine(board[r][c],board[r-1][c+1],board[r-2][c+2],board[r-3][c+3])) {
					setWinner(r,c);
					return;
				}
			}
		}
	}
}

function checkLine(a,b,c,d){
	return((a != 0) && (a ==b) && (a == c) && (a == d));
}

	

function setWinner(r,c){
	let winner = document.getElementById("winner");
	if(board[r][c] == redPlayer){
		winner.innerText = "Red WINS!";
	}
	else{
		winner.innerText = "Yellow WINS!";
	}

	refreshBtn = document.getElementById("Refresh");
	function handleClick() {
  		window.location.reload();
	}

	refreshBtn.addEventListener("click", handleClick);	

	gameOver = true;

	document.getElementsByTagName("body")[0].classList.toggle("winner-body");
	console.log(document.getElementsByTagName("body")[0].classList.contains("winner-body"));
}

