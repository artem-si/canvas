
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const clear_btn =  document.querySelector('.canvas__button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
ctx.lineWidth = 2;
ctx.fillStyle = '#fff5de';
ctx.strokeStyle = '#3c5186';
ctx.shadowOffsetX = 0;
ctx.shadowOffsetY = 10;
ctx.shadowBlur = 10;
ctx.shadowColor = 'rgba(0,0,0,0.5)'
// ctx.globalCompositeOperation = 'lighten';

class Root{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.maxSize = Math.random() * 7 + 20;
        this.size = Math.random() * 1 + 2;
        this.vs = Math.random() * 0.2 + 0.5;
        this.angleX = Math.random() *6.2;
        this.vax = Math.random() * 0.6 - 0.3;
        this.angleY = Math.random() *6.2;
        this.vay = Math.random() * 0.6 - 0.3;
        this.angle = 0;
        this.va = Math.random() * 0.02 + 0.05;
        this.lightness = 10;
    }
    update(){
        this.x += this.speedX + Math.sin(this.angleX);
        this.y += this.speedY + Math.sin(this.angleY);
        this.size += this.vs;
        this.angleX += this.vax;
        this.angleY += this.vay;
        this.angle += this.va;
        if (this.lightness < 70) this.lightness += 0.3;
        if(this.size < this.maxSize){

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);

            ctx.fillRect(0 , 0, this.size, this.size);
            ctx.strokeRect(0, 0, this.size, this.size);
            requestAnimationFrame(this.update.bind(this));
            ctx.restore();
        } 
    }
}



window.addEventListener('mousemove', function(e){
    if(drawing){
        for(let i =0; i < 2; i++){
    
            const root = new Root(e.x, e.y);
            root.update(); 
        }
    }
});

window.addEventListener('mousedown', function(){
    drawing= true;
});
window.addEventListener('mouseup', function(){
    drawing = false;
});

clear_btn.addEventListener('click' ,function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})