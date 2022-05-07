window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight;

    ctx.fillStyle= 'green';
    
    
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;


    // effect settings
    let size = canvas.width < canvas.height? canvas.width*0.4: canvas.height*0.2;
    
    const maxLevel = 6;
    const branches = 1;

    let spread = -0.2;
    let sides = 15;
    let scale = 0.6;
    let color = 'hsl('+Math.random() * 360+', 100%, 50%)';
    let lineWidth = 30;

    // controls

    const randomizeButton = document.getElementById('randomizeButton');
    const slider_spread = document.getElementById("spread");
    const label_spread = document.querySelector('[for="spread"]');

    const slider_sides = document.getElementById("sides");
    const label_sides = document.querySelector('[for="sides"]');

    const resetButton = document.getElementById('resetButton');

    slider_spread.addEventListener('change', function(e){
        
        spread = e.target.value;
        // console.log(spread);
        drawFractal();
        updateSliders();
        
    })

    slider_sides.addEventListener('change', function(e){
        sides = e.target.value;
        updateSliders();
        drawFractal();
        
    })
    
    
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    let pointX = 0;
    let pointY = size;

    function drawBranch(level){
        if(level >maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(pointX, pointY);
        ctx.lineTo(size, 0);
        ctx.bezierCurveTo(0, size*(-3), size* 5, size*10*spread, 0, 0);
        ctx.stroke();
       
        for(let i = 0; i< branches; i+=1)
        {
            ctx.save();
            ctx.translate(pointX, pointY);
            
            ctx.scale(scale, scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level + 1)
            ctx.restore();

           

            ctx.restore();
        }
        ctx.beginPath();
        ctx.arc(-size/2, 0, 40, 0, Math.PI * 2);
        ctx.fill();
        
    }
   

    function drawFractal(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        

        for (let i = 0; i < sides; i += 1) {
            ctx.scale(0.95, 0.95)
            ctx.rotate((Math.PI * 6) / sides);
            drawBranch(0);

            

        }

        ctx.restore();
        randomizeButton.style.backgroundColor = color;
        
    }

    drawFractal();

    function randomizedFractal(){
        spread = Math.random() * 0.6 + 0.3;
        sides = Math.floor( Math.random() * 18 + 4) ;
        
        color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
        lineWidth = Math.floor(Math.random() * 30 + 20);
        
        
    }

    randomizeButton.addEventListener('click', function(){
        randomizedFractal();
        updateSliders();
        drawFractal();

    });
    
    function resetFractal(){
        spread = 0.2;
        sides = 15;
        scale = 0.85;
        color = 'hsl(290, 100%, 50%)';
        lineWidth = 30;
    }

    resetButton.addEventListener('click', function(){
        resetFractal();
        updateSliders();
        drawFractal();
    });

    function updateSliders(){
        slider_spread.value = spread;
        slider_sides.value = sides;
        label_sides.innerText = 'Sides: ' + sides;
        label_spread.innerText = 'Spread: ' + Number(spread).toFixed(2);
        randomizeButton.style.backgroundColor = color;
    }

    

    updateSliders()
    
this.window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width * 0.4 : canvas.height * 0.4;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    drawFractal();
})



});