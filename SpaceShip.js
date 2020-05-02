function  SpaceShip(x,y){
    this.x=x;
    this.y=y;
    this.xdir=0;
 
 

     display=function() {
      imageMode(CENTER);
      image(spaceShipImg,this.x,this.y,150,150);
      console.log("ERROR");
  }

   changePosition=function(x,y){ 
    this.x = this.x + x; 
    this.y = this.y + y;
   }
}