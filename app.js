const canvas=document.querySelector("canvas");
var c=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var colorArray=["#2C3E50","#E74C3C","#ECF0F1","#3498DB","#2980B9"];
var mouse={
    x:window.innerWidth/2,
    y:window.innerHeight/2
}
window.addEventListener("mousemove",function(event){
    mouse.x=event.x;
    mouse.y=event.y;
})
window.addEventListener("resize",function(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    mouse.x=innerWidth/2;
    mouse.y=innerHeight/2;
    init();
})
function particle(radius,color){
    this.radius=radius;
    this.radians=Math.random()*Math.PI*2;
    this.dist=Math.floor(Math.random()*71) + 50;
    this.x = mouse.x + this.dist * Math.cos(this.radians);
    this.y = mouse.y + this.dist * Math.sin(this.radians);
    this.velocity=0.05;
    this.color=color;
    
    this.lastMouse={
        x:mouse.x, y:mouse.y
    }
    this.lastPoint={
        x:this.x,
        y:this.y
    }
    this.draw=function()
    {
        //console.log(this.lastMouse);
        c.beginPath();
        c.lineWidth=this.radius;
        c.moveTo(this.lastPoint.x, this.lastPoint.y);
        c.lineTo(this.x,this.y);
        c.strokeStyle=this.color;
        c.stroke();
        c.closePath();
    }
    this.update=function(){
        this.lastPoint.x=this.x;
        this.lastPoint.y=this.y;
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
        this.x= this.lastMouse.x + Math.cos(this.radians)*this.dist;
        this.y= this.lastMouse.y + Math.sin(this.radians)*this.dist;
        this.radians += this.velocity;
        this.draw();
    }
}
var particles=[];
function init()
{
    particles=[];
    for(let i=0;i<100;i++)
    {
        var radius=Math.random()*2 + 1;
        var color=colorArray[Math.floor(Math.random()*colorArray.length)];
        particles.push(new particle(radius,color));
    }
    //console.log(particles);
}
function animate()
{
    c.fillStyle="rgba(255,255,255,0.05)";
    c.fillRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(animate);
    for(let i=0;i<particles.length;i++)
        {
            particles[i].update();
        }
}

init();
animate();