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
    function neighbors(cellCoordinates) {
	var x = cellCoordinates[0], y = cellCoordinates[1];
	return [x-1,x,x+1].map(function(m) {
	    var row = [y-1,y,y+1].map(function(n) {return [m,n];});
	    return m == x ? row.filter(function(q) {return q[1] != y}) : row;
	}).reduce(function (a, b) {return a.concat(b)}, []);
    }
    function tick(generation) {
	var seen = {}, alive = {};
	return generation.map(function include_neighbors(address) {
	    alive[address.join()] = 1;
	    return neighbors(address);
	}).reduce(
	    function flatten (hood, the_neighbors) {return hood.concat(the_neighbors);},
	    generation
	).filter(function still_alive (address) {
	    var k = address.join();
	    if (seen[k]) {return false;}
	    seen[k] = 1;
	    var count = neighbors(address).reduce(function (a, b) {
		return a + (alive[b.join()] || 0);
	    }, 0);
	    return count == 3 || (count == 2 && alive[address.join()]);
	});
    }
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
});
