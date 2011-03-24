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
function createCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    
    return canvas;
}
function renderGenerations(generation, context, options) {
    if (typeof options === "undefined") {options = {}}
    var cellsize = options["cellsize"] || 50;
    var limit = (typeof options["limit"] === "undefined") ? 20 : options["limit"];
    var timeout = options["timeout"] || 200;
    function cell(x,y) {
        context.beginPath();
        context.arc(cellsize/2+x*cellsize,cellsize/2+y*cellsize,cellsize/2.2,0,Math.PI*2);
        context.closePath();
        context.fill();
    }
    (function render() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        generation.map(function (address) {cell(address[0], address[1]);});
        generation = tick(generation);
        if (limit--) {setTimeout(render, timeout)};
    })();
}
var patterns = {
    glider: [[0,2], [1,2], [2,2], [2,1], [1,0]],
    block: [[0,0], [0,1], [1,0], [1,1]],
    vertical_blinker: [[1,0], [1,1], [1,2]],
    horizontal_blinker: [[0,1], [1,1], [2, 1]],
};
function demo() {
    var canvas = createCanvas(400, 400);
    document.body.appendChild(canvas);
    renderGenerations(patterns.glider, canvas.getContext('2d'));
}