
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var lineWidth = 5;
/**canvans全屏操作**/
autoSetCanvasSize(canvas);
/**监听鼠标操作**/
listenToUsing(canvas);
/**点击事件**/
var usingEraser = false;
eraser.onclick = function () {
    usingEraser = true;
    eraser.classList.add('active');
    brush.classList.remove('active');
    shanchu.classList.remove('active');
    save.classList.remove('active');
    sizes.className  ='sizes.close';
}

brush.onclick = function () {
    usingEraser = false;
    brush.classList.add('active');
    eraser.classList.remove('active');
    shanchu.classList.remove('active');
    save.classList.remove('active');
    sizes.className = 'sizes';
}

shanchu.onclick = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

save.onclick = function(){
    var url = canvas.toDataURL("image/png");
    var a =document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "我的画";
    a.click();
}

black.onclick = function () {
    context.strokeStyle = 'black';
    black.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    red.classList.remove('active');
}

red.onclick = function(){
    context.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}

green.onclick = function () {
    context.strokeStyle = 'green';
    green.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}

blue.onclick = function () {
    context.strokeStyle = 'blue';
    blue.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    black.classList.remove('active');
}

think.onclick =function(){
    lineWidth = 7;
}

thick.onclick = function(){
    lineWidth = 10;
}


function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function listenToUsing(canvas) {
        var using = false;
        var lastPoint = {
            "x": undefined,
            "y": undefined
        }

        if(document.body.ontouchstart !== undefined){

            canvas.ontouchstart = function (aaa) {
                var x = aaa.touches[0].clientX;
                var y = aaa.touches[0].clientY;
                using = true;
                if (usingEraser) {
                    context.clearRect(x - 5, y - 5, 10, 10);
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }
            }

            canvas.ontouchmove = function (aaa) {
                var x = aaa.touches[0].clientX;
                var y = aaa.touches[0].clientY;
                if (!using) {
                    return;
                }
                if (usingEraser == true) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint;
                }
            }
            canvas.ontouchdown = function () {
                using = false;
            }
        }else{
            canvas.onmousedown = function (aaa) {
                var x = aaa.clientX;
                var y = aaa.clientY;
                using = true;
                if (usingEraser) {
                    context.clearRect(x - 5, y - 5, 10, 10);
                } else {
                    lastPoint = {
                        "x": x,
                        "y": y
                    }
                }
            }

            canvas.onmousemove = function (aaa) {
                var x = aaa.clientX;
                var y = aaa.clientY;
                if (!using) {
                    return;
                }
                if (usingEraser == true) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    var newPoint = {
                        "x": x,
                        "y": y
                    }
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint;
                }
            }

            canvas.onmouseup = function (aaa) {
                using = false;
            }
        }

        }

function autoSetCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    window.onresize = function () {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

