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
    describe("sprout", function () {
	var cell = {};
	function sprout(cell) {
	    return true;
	}
	it("should be true if the number of living neighbors is three", function () {
	    expect(sprout(cell)).toBeTruthy();
	});
	it("should be false if the number of living neighbors is not three", function () {
	    expect(sprout(cell)).toBeFalsy();
	});
	it("should be true if I and two neighbors are alive");
    });
    describe("fertile", function () {
	it("should test all living cells and all of their neighbors");
    });    
});
