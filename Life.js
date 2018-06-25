var interval;
var points = [];
var field = document.getElementById("field");
var isLife = false;
var cursor = [];
var fieldColor = "#1f3438"

var defaultCur = [{ x: 0, y: 0 }];
cursor = defaultCur;

var width = 100, height = 40;

function toScale() {
    width = parseInt(document.getElementById('width').value);
    height = parseInt(document.getElementById('height').value);
    field.width = width * 10;
    field.height = height * 10;
    initField();
}

function initField() {
    var ctx = field.getContext('2d');
    ctx.fillStyle = fieldColor;
    ctx.fillRect(0, 0, field.width, field.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (var i = 10; i < (width * 10); i += 10) {
        ctx.moveTo(i + 0.5, 0 + 0.5);
        ctx.lineTo(i + 0.5, height * 10 + 0.5);
    }
    for (var i = 10; i < (height * 10); i += 10) {
        ctx.moveTo(0 + 0.5, i + 0.5);
        ctx.lineTo(width * 10 + 0.5, i + 0.5);
    }
    ctx.lineWidth = 0.5;
    ctx.stroke();
    for (var i = 0; i < (width + 20); ++i) {
        points[i] = [];
        for (var j = 0; j < (height + 20); ++j) {
            points[i][j] = false;
        }
    }
}

var ctx = field.getContext('2d');
ctx.fillStyle = fieldColor;
ctx.fillRect(0, 0, field.width, field.height);

for (var i = 0; i < (width + 20); ++i) {
    points[i] = [];
    for (var j = 0; j < (height + 20); ++j) {
        points[i][j] = false;
    }
}

ctx.fillStyle = "white";
ctx.beginPath();
for (var i = 10; i < (width * 10); i += 10) {
    ctx.moveTo(i + 0.5, 0 + 0.5);
    ctx.lineTo(i + 0.5, height * 10 + 0.5);
}
for (var i = 10; i < (height * 10); i += 10) {
    ctx.moveTo(0 + 0.5, i + 0.5);
    ctx.lineTo(width * 10 + 0.5, i + 0.5);
}
ctx.lineWidth = 0.5;
ctx.stroke();

var tempPoints = [];
field.onmouseover = function (e) {
    var context = field.getContext('2d');
    function drawPoint(e) {
        var n = document.getElementById("cursor").options.selectedIndex;
        switch (n) {
            case 0: cursor = defaultCur; break;
            case 1: switchToWall(); break;
            case 2: switchToSnowflake(); break;
            case 3: switchToPingPong(); break;
            case 4: switchToGun(); break;
        }

        var mouseX = e.pageX - field.offsetLeft;
        var mouseY = e.pageY - field.offsetTop;

        for (var i = 0; i < cursor.length; i++) {
            context.fillStyle = "rgba(255,255,255,0.5)";
            var x = Math.floor(mouseX / 10) * 10 + 1 + cursor[i].x * 10;
            var y = Math.floor(mouseY / 10) * 10 + 1 + cursor[i].y * 10;
            context.fillRect(x, y, 9, 9);

            tempPoints.push({ x: x, y: y, live: points[Math.floor(mouseX / 10) + 10 + cursor[i].x][Math.floor(mouseY / 10) + 10 + cursor[i].y] });
        }
    }
    field.onmousemove = function (e) {
        for (var i = 0; i < tempPoints.length; i++) {
            if (!tempPoints[i].live) context.fillStyle = fieldColor;
            else context.fillStyle = "white";
            context.fillRect(tempPoints[i].x, tempPoints[i].y, 9, 9);
            console.log(tempPoints[i].x + ' ' + tempPoints[i].y);
        }
        tempPoints = [];
        drawPoint(e);
    }

    field.onmouseout = function (e) {
        for (var i = 0; i < tempPoints.length; i++) {
            if (!tempPoints[i].live) context.fillStyle = fieldColor;
            else context.fillStyle = "white";
            context.fillRect(tempPoints[i].x, tempPoints[i].y, 9, 9);
            console.log(tempPoints[i].x + ' ' + tempPoints[i].y);
        }
        tempPoints = [];
    }
}

field.onmousedown = function (e) {
    var n = document.getElementById("cursor").options.selectedIndex;
    switch (n) {
        case 0: cursor = defaultCur; break;
        case 1: switchToWall(); break;
        case 2: switchToSnowflake(); break;
        case 3: switchToPingPong(); break;
        case 4: switchToGun(); break;
    }
    drawPoint(e);

    function drawPoint(e) {
        var mouseX = e.pageX - field.offsetLeft;
        var mouseY = e.pageY - field.offsetTop;

        var context = field.getContext('2d');

        for (var i = 0; i < cursor.length; i++)
            if (!points[Math.floor(mouseX / 10) + 10 + cursor[i].x][Math.floor(mouseY / 10) + 10 + cursor[i].y]) {
                context.fillStyle = "white";
                context.fillRect(Math.floor(mouseX / 10) * 10 + 1 + cursor[i].x * 10, Math.floor(mouseY / 10) * 10 + 1 + cursor[i].y * 10, 9, 9);
                points[Math.floor(mouseX / 10) + 10 + cursor[i].x][Math.floor(mouseY / 10) + 10 + cursor[i].y] = true;
            }
            else {
                context.fillStyle = fieldColor;
                context.fillRect(Math.floor(mouseX / 10) * 10 + 1 + cursor[i].x * 10, Math.floor(mouseY / 10) * 10 + 1 + cursor[i].y * 10, 9, 9);
                points[Math.floor(mouseX / 10) + 10 + cursor[i].x][Math.floor(mouseY / 10) + 10 + cursor[i].y] = false;
            }
    }

    document.onmouseup = function () {
        field.onmouseup = null;
    }
}

function draw() {
    var field = document.getElementById("field");
    var context = field.getContext('2d');
    for (var i = 0; i < width; ++i) {
        for (var j = 0; j < height; ++j) {
            if (points[i + 10][j + 10]) {
                context.fillStyle = "white";
            }
            else {
                context.fillStyle = fieldColor;
            }
            context.fillRect(i * 10 + 1, j * 10 + 1, 9, 9);
        }
    }
}

function countOfLiveNeighbors(i, j) {
    var prevX = i - 1;
    var nextX = i + 1;
    var prevY = j - 1;
    var nextY = j + 1;
    var countLiveNeighbors = 0;

    for (var x = prevX; x <= nextX; ++x) {
        for (var y = prevY; y <= nextY; ++y) {
            if (x > -1 && y > -1 && x < (width + 20) && y < (height + 20)) {
                if (points[x][y]) {
                    if (!(x == i && y == j))
                        countLiveNeighbors++;
                }
            }
        }
    }
    return countLiveNeighbors;
}

function step() {
    var newPoints = [];
    for (var i = 0; i < points.length; ++i) {
        newPoints[i] = [];
        for (var j = 0; j < points[i].length; ++j) {
            newPoints[i][j] = false;
        }
    }
    if (isLife) {
        for (var i = 0; i < points.length; ++i) {
            for (var j = 0; j < points[i].length; ++j) {
                newPoints[i][j] = points[i][j];
            }
        }

        for (var i = 0; i < points.length; ++i) {
            for (var j = 0; j < points[i].length; ++j) {

                var countLiveNeighbors = countOfLiveNeighbors(i, j);

                if (!points[i][j] && countLiveNeighbors == 3) {
                    newPoints[i][j] = true;
                }
                else if (points[i][j] && countLiveNeighbors >= 2 && countLiveNeighbors <= 3) {
                    newPoints[i][j] = true;
                }
                else {
                    newPoints[i][j] = false;
                }
            }
        }

        for (var i = 0; i < points.length; ++i) {
            for (var j = 0; j < points[i].length; ++j) {
                points[i][j] = newPoints[i][j];
            }
        }
        draw();
    }
    else
        clearInterval(interval);
}

function death() {
    isLife = false;
}

var speed = 0;
window.onload = function () {
    speed = 200 - document.getElementById('speed').value;
}

function live() {
    isLife = true;
    clearInterval(interval);
    interval = setInterval('step()', speed);
}

function changeSpeed() {
    var newSpeed = 200 - document.getElementById('speed').value;
    speed = newSpeed;
    live();
}

function startOrStop() {
    if (isLife) {
        document.getElementById('startStop').innerText = 'ЗАПУСТИТЬ';
        death();
    }
    else {
        document.getElementById('startStop').innerText = 'ОСТАНОВИТЬ';
        live();
    }
}

function clearField() {
    for (var i = 0; i < (width + 20); ++i) {
        points[i] = [];
        for (var j = 0; j < (height + 20); ++j) {
            points[i][j] = false;
        }
    }
    draw();
}

function save() {
    for (var i = 0; i < points.length; ++i) {
        for (var j = 0; j < points[i].length; ++j) {
            localStorage[i + ';' + j] = points[i][j];
        }
    }
}

function load() {
    for (var i = 0; i < points.length; ++i) {
        for (var j = 0; j < points[i].length; ++j) {
            if (localStorage[i + ';' + j] == "true")
                points[i][j] = true;
            else
                points[i][j] = false;
        }
    }
    draw();
}

function switchToSnowflake() {
    cursor = snowflake;
}

function switchToGun() {
    cursor = gun;
}

function switchToPingPong() {
    cursor = pingPong;
}

function switchToDefault() {
    cursor = defaultCur;
}

function switchToWall() {
    cursor = wall;
}