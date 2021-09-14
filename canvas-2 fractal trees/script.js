const canvas = document.querySelector('.canvas');
const generateButton = document.querySelector('.generate-tree-button');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve = 10
let grow = 0.75
let i = 1
function drawTree(startX, startY, len, angle, branchWidth, color1, color2){
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255,255, 0.5)'
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0,0);
    // ctx.lineTo(0, -len);
    if(angle > 0){
        ctx.bezierCurveTo(20, -len/2, 50, -len/2, 0, -len);
    } else{
        ctx.bezierCurveTo(50, -len/2, -20, -len/2, 0, -len);
    }

    // ctx.bezierCurveTo(20, -len/2, 10, -len/2, 0,-len);
    ctx.stroke();

    if (len < 5){
        // leafs
        ctx.beginPath();
        ctx.arc(0, -len, 10,0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }

    
    drawTree(0, -len, len * grow, angle + curve, branchWidth * 0.5);
    drawTree(0, -len, len * grow, angle - curve, branchWidth * 0.5);
    // drawTree(0, -len, len * grow, angle + (curve*2), branchWidth * 0.5);
    // drawTree(0, -len, len * grow, angle - (curve*2), branchWidth * 0.5);

    ctx.restore();
}

function removeTree(){

}
// function generateGrowTree(){
//     i += 1
//     if(i < 800){
//         grow += 0.001
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         drawTree(canvas.width/2, canvas.height - 80, 120, 0,20, 'brown', 'green');
//         drawTree(canvas.width/2, canvas.height - 80, 120, 0,20, 'brown', 'green');
//     } else{
//         clearTimeout(timerID);
//         grow = 1;
//         i = 1;
//     }
// }
// let timerID = setTimeout( generateGrowTree, 2); 

// for(let i =1; i < 100; i++){
//     grow += 0.01
// }
drawTree(canvas.width/2, canvas.height - 80, 120, 0,20, 'brown', 'green');


function generateRandomTree(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let centerPointX = canvas.width/2;
    let len = Math.floor((Math.random() * 20) + 100);
    let angle = 0;
    let branchWidth = (Math.random() * 70) + 1;
    let color1= 'rgb(' + Math.random() *255 +',' + Math.random() *255 + ',' + Math.random() *255 + ')';
    let color2= 'rgb(' + Math.random() *255 +',' + Math.random() *255 + ',' + Math.random() *255 + ')';
    
    generateButton.style.background = color1;
    curve = (Math.random() *20) +2;

    drawTree(centerPointX, canvas.height - 80, len, angle, branchWidth, color1, color2);

}



generateButton.addEventListener('click', generateRandomTree);

