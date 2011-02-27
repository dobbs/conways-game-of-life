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
    describe("sprout(cell) knows if a cell will sprout life in the next generation", function () {
	function sprout(cell) {
	    return cell.livingNeighbors == 3 ||
		(cell.livingNeighbors == 2 && cell.isAlive);
	}
	it("should be true if the number of living neighbors is three", function () {
	    var cell = {livingNeighbors: 3};
	    expect(sprout(cell)).toBeTruthy();
	});
	it("should be false if the number of living neighbors is not three", function () {
	    var cell = {livingNeighbors: 4};
	    expect(sprout(cell)).toBeFalsy();
	});
	it("should be true if I and two neighbors are alive", function () {
	    var cell = {livingNeighbors: 2, isAlive: true};
	    expect(sprout(cell)).toBeTruthy();
	});
	it("should be false if two neighbors are alive but I am not", function () {
	    var cell = {livingNeighbors: 2};
	    expect(sprout(cell)).toBeFalsy();
	});
    });
    describe("fertileCellsFrom(generation) knows where to look for sprouts", function () {
	function fertileCellsFrom(generation) {
	    return generation;
	}
	it("should return an empty set if this generation has no living cells", function () {
	    var generation = [];
	    expect(fertileCellsFrom(generation)).toEqual([]);
	});
	it("should include coordinates of the living cells in this generation", function () {
	    var generation = [[0, 0]];
	    var actualCells = fertileCellsFrom(generation);
	    for (var i in generation) {
		expect(actualCells).toContain(generation[i]);
	    }
	    expect(fertileCellsFrom(generation)).toEqual(generation);
	});
	it("should include coordinates of the immediate neighbors of a living cell", function () {
	    var generation = [[1,1]];
	    var expectedCells = [[0,0], [0,1], [0,2], [1,0], [1,2], [2,0], [2,1], [2,2]];
	    var actualCells = fertileCellsFrom(generation);
	    for (var i in expectedCells) {
		expect(actualCells).toContain(expectedCells[i]);
	    }
	});
    });
    describe("neighbors(cell) knows the coordinates of the neighbors of a cell", function () {
    });
});
