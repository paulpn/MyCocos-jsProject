Player=function()
{
	this.id;
	this.name;
	this.groupNumber;
	this.seatNumber;
	this.changdiNumber;
	this.scoreOfThisRound;
	this.totalScore;
	this.scoreOfThisRound;
};
Player=function(name,id)
{
	this.id=id;
	this.name=name;
	this.totalScore;
	this.scoreOfThisRound;
};
Player.prototype.print=function(){
	cc.log("姓名%s"+",id%s",this.name,this.id);
};
Player.prototype.init=function(info){
	this.id=info.id;
	this.name=info.name;
	
};

