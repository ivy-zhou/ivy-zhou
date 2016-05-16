/*
 * Version - 0.0.0 - Dec 28, 2015
 * Ivy Zhou
 * Conway's Game of Life Background
 */

 var CELL_SIZE = 64; // need code to adjust this for differently sized screens so I don't run out of memory
 var DEAD = false;  // false - dead, true - alive for cells
 var ALIVE = true;
 var ALIVE_COLOUR = "#282C34"; //75ABBC
 var DEAD_COLOUR = "#2F343D";
 var GRID_COLOUR = "#ddd";
 var DISABLED_COLOUR = "#ABB2BF";
 var STARTING_POPULATION = 0.75;

 var grid = [];
 var width, height, canvas, ctx, noOfRows, noOfCols, isPlaying = false, interval;
 var overlayPresent = false;

function isInBounds (row, col) {
  return col >= 0 && col < noOfCols && row >= 0 && row < noOfRows;
}

// Cell class constructor
var Cell = function(row, col) {
  this.row = row;
  this.col = col;
  this.curState = DEAD;
  this.nextState = false;

  this.draw = function () {
    if(this.curState) // if I'm alive, draw me
      ctx.fillStyle = ALIVE_COLOUR; // alive colour
    else
      ctx.fillStyle = DEAD_COLOUR;
    ctx.fillRect(this.col * CELL_SIZE, this.row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  };

  this.setNextState = function() {
    // look for my neighbours
    var aliveNeighbours = 0;

    for(var rowPos = this.row - 1; rowPos <= this.row + 1; rowPos++)
    {
      for(var colPos = this.col - 1; colPos <= this.col + 1; colPos++)
      {
        //console.log("rowPos: " + rowPos + " colPos: " + colPos);
        if(!(rowPos == this.row && colPos == this.col) &&
          isInBounds(rowPos, colPos) && grid[rowPos][colPos].curState)
          {
            grid[rowPos][colPos].draw();
            //console.log("found a live neighbour at rowPos: " + rowPos + " colPos: " + colPos);
            aliveNeighbours++;
          }

      }
    }

    if(this.curState == ALIVE && (aliveNeighbours < 2 || aliveNeighbours > 3)) // under/over population
      this.nextState = DEAD;
    if(this.curState == ALIVE && (aliveNeighbours >= 2 && aliveNeighbours <= 3)) // if we have 2-3 neighbours, we're alive still!
      this.nextState = ALIVE;
    if(this.curState == DEAD && aliveNeighbours == 3) // reproduction
      this.nextState = ALIVE;
  };

  this.updateState = function() {
    this.curState = this.nextState;
    this.nextState = false;
  };
};

// generate a random grid space
function randomGridPos (noOfRows, noOfCols) {
  var pos = [];
  pos[0] = Math.floor(Math.random() * noOfRows); // generate random row
  pos[1] = Math.floor(Math.random() * noOfCols); // generate random col
  return pos;
}

// draws gridlines, may be not used
function drawGrid () {
  ctx.strokeStyle = GRID_COLOUR;
  ctx.beginPath();
  for(var i = 0; i < noOfRows; i++)
  {
    ctx.moveTo(0, i * CELL_SIZE);
    ctx.lineTo(canvas.width, i * CELL_SIZE);
    ctx.stroke(); // draw each row line
    for(var j = 0; j < noOfCols; j++)
    {
      ctx.moveTo(j * CELL_SIZE, 0);
      ctx.lineTo(j * CELL_SIZE, canvas.height);
      ctx.stroke(); // draw each col line
    }
  }
}

function animateBackground () {
  // main
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  initAnimation();
  addListeners();
  //setInterval(animate, 1000);

  function initAnimation ()
  {
    // model the canvas as a grid containing life cells
    noOfCols = window.innerWidth % CELL_SIZE === 0 ?
        Math.floor(window.innerWidth / CELL_SIZE) : Math.floor(window.innerWidth / CELL_SIZE) + 1;
    noOfRows = window.innerHeight % CELL_SIZE === 0 ?
        Math.floor(window.innerHeight / CELL_SIZE) : Math.floor(window.innerHeight / CELL_SIZE) + 1;
    canvas.width = noOfCols * CELL_SIZE; // resive canvas to be an exact fit
    canvas.height = noOfRows * CELL_SIZE;
    grid = new Array(noOfRows);
    for(var k = 0; k < noOfRows; k++)
    {
      grid[k] = new Array(noOfCols);
      for(var n = 0; n < noOfCols; n++)
        grid[k][n] = new Cell(k, n);
    }

    // generate a number of random cells to be alive already
    var numAlive = Math.floor(STARTING_POPULATION * noOfCols * noOfRows);
    while(numAlive > 0)
    {
      var nextPos = randomGridPos(noOfRows, noOfCols);
      grid[nextPos[0]][nextPos[1]].curState = ALIVE;
      numAlive--;
    }

    draw();
  }

    // Event handling, make these jQuery later for cross-browser compatibility
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
        window.addEventListener('click', onClick);
    }

    // create an overlay over the canvas once, and don't allow clicks anymore!
    function drawOverlay() {
      if(!overlayPresent)
      {
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = DISABLED_COLOUR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        overlayPresent = true;
      }
    }

    function clearOverlay() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      overlayPresent = false;
    }

    // don't animate if we're not being looked at, and don't click either
    function scrollCheck() {
        if(document.body.scrollTop > height)
          isPlaying = false;
        else
          isPlaying = true;
    }

    // makes animation responsive
    function resize() {
        isPlaying = false;
        clearInterval(interval);
        initAnimation();
    }

    function onClick(event) {
      isPlaying = false;
      clearInterval(interval);

      // check if the page has scrolled!
      if(document.body.scrollTop > height)
        return;
      offsetY = document.body.scrollTop;

      // check if the nav-tab is pushed out or if the Conway button was clicked
      if(!$("#nav-tab").hasClass("closed"))
      {
        drawOverlay();
        return;
      }
      else
        clearOverlay();

      // don't let them click cells under the nav-tab, or the question mark
      var ntabPos = $("#nav-tab").position();
      if((event.clientX >= ntabPos.left && event.clientX <= ntabPos.left + CELL_SIZE &&
          event.clientY >= ntabPos.top && event.clientY <= ntabPos.top + CELL_SIZE))
      {
        draw();
        return;
      }

      var col = Math.floor(event.clientX / CELL_SIZE);
      var row = Math.floor((event.clientY + offsetY) / CELL_SIZE);

      if(isInBounds(row, col))
      {
        if(grid[row][col].curState == ALIVE)
          grid[row][col].curState = DEAD;
        else
          grid[row][col].curState = ALIVE;
      }

      draw();
    }

    function printGrid() {
      var output = "";
      for(var i = 0; i < noOfRows; i++) {
        for(var j = 0; j < noOfCols; j++) {
          if(grid[i][j].curState == ALIVE)
            output += "1 ";
          else
            output += "0 ";
        }
        output += "\n";
      }
      console.log(output);
    }

    function draw () {
        //ctx.clearRect(0,0, canvas.width, canvas.height);
        for(var i = 0; i < noOfRows; i++)
        {
          for(var j = 0; j < noOfCols; j++)
          {
            grid[i][j].draw();
          }
        }

        // draw in gridlines
        //drawGrid();
    }

    function animate() {
        if(isPlaying) {
          for(var i = 0; i < noOfRows; i++)
          {
            for(var j = 0; j < noOfCols; j++)
            {
              //console.log(grid[i][j]);
              grid[i][j].draw();
              grid[i][j].setNextState();
            }
          }
          // now update each cell
          for(var i = 0; i < noOfRows; i++)  // jshint ignore:line
            for(var j = 0; j < noOfCols; j++) // jshint ignore:line
              grid[i][j].updateState();
        }
    }


    // pause/play the simulation when the p button is hit
    $(document).on("keypress", function (e) {
      if(e.keyCode == 112)
      {
        if(isPlaying)
        {
          isPlaying = false;
          clearInterval(interval);
        }
        else
        {
          isPlaying = true;
          interval = setInterval(animate, 1000);
        }
      }
    });
}

// animate background when document is ready
$(document).ready(animateBackground);
