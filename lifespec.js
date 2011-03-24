// http://en.wikipedia.org/wiki/Conway's_game_of_life 
// The universe of the Game of Life is an infinite two-dimensional
// orthogonal grid of square cells, each of which is in one of two
// possible states, live or dead. Every cell interacts with its
// eight neighbours, which are the cells that are horizontally,
// vertically, or diagonally adjacent. At each step in time, the
// following transitions occur:
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
describe("Conway's Game of Life", function () {
    describe("tick()", function () {
        it("should return a block when given a block", function () {
            var BLOCK = [[0,0], [0,1], [1,0], [1,1]];
            expect(tick(BLOCK).sort()).toEqual(BLOCK.sort());
        });
        it("should return a VERTICAL_BLINKER when given a HORIZONTAL_BLINKER", function () {
            var VERTICAL_BLINKER = [[1,0], [1,1], [1,2]];
            var HORIZONTAL_BLINKER = [[0,1], [1,1], [2, 1]];
            expect(tick(VERTICAL_BLINKER).sort()).toEqual(HORIZONTAL_BLINKER.sort());
        });
    });
    describe("neighbors(cellCoordinates)", function () {
        it("knows the coordinates of cell's neighbors", function () {
            expect(neighbors([1, 1]).sort()).toEqual(
                [[0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]]);
        });
    });
    describe("createCanvas(width, height)", function () {
	it("should return a new canvas element", function () {
	    var canvas = createCanvas(500, 400);
	    expect(canvas.tagName).toEqual("CANVAS");
	    expect(canvas.getAttribute("width")).toEqual("500");
	    expect(canvas.getAttribute("height")).toEqual("400");
	});
	
    });
    describe("renderGenerations(generation, context, options)", function () {
	it("should draw the given generation on the given context when limit=0", function () {
	    var context = jasmine.createSpyObj('context', [
		'beginPath',
		'closePath',
		'arc',
		'fill',
		'clearRect',
	    ]);
	    context.canvas = { width: 300, height: 400};

	    renderGenerations([[0,0],[0,1]], context);

	    expect(context.beginPath).toHaveBeenCalled();
	    expect(context.arc).toHaveBeenCalled();
	    expect(context.closePath).toHaveBeenCalled();
	    expect(context.fill).toHaveBeenCalled();
	    expect(context.clearRect).toHaveBeenCalledWith(0,0,300,400);
	});
    });
});
