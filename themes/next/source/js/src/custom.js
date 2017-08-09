(function() {
        var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        length = 150,
        ball = [],
        mt = 75;
    
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    window.onresize = function() {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
    }


    for(var i = length - 1; i >= 0; i--) {
        ball[i] = new Ball({canvas: canvas});
        ball[i].draw(ctx);
    }

    function overFun(v) {
        if(v.x < v.radius) {
            v.x = v.radius;
            v.vx = -v.vx;
        } else if(v.x > canvas.width - v.radius) {
            v.x = canvas.width - v.radius;
            v.vx = -v.vx;
        }
        if(v.y < v.radius) {
            v.y = v.radius;
            v.vy = -v.vy;
        } else if(v.y > canvas.width - v.radius) {
            v.y = canvas.width - v.radius;
            v.vy = -v.vy;
        }
    }

    function pengFun(a,i,arr) {
        for(var j = i + 1; j < arr.length; j++) {
            var b = arr[j],
                dx = a.x - b.x,
                dy = a.y - b.y,
                distance = Math.sqrt(dx*dx + dy*dy),
                minDistance = a.radius + b.radius;
            
            if(distance <= minDistance) {
                a.vx *= -1;
                a.vy *= -1;
                b.vx *= -1;
                b.vy *= -1;
            }

            if(distance <= mt) {
                ctx.save();
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'rgba(29,188,251,.4)';
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    animate();

    function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        ball.forEach(function(v, i) {
            v.x += v.vx;
            v.y += v.vy;
            overFun(v);
            v.draw(ctx);
        });

        ball.forEach(pengFun)
    }
})();