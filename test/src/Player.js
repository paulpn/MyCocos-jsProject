Player=function()
{
	this.id;
	this.name;
	this.groupNumber;
	this.seatNumber;
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

function getPlayerByID(id){
	var p=new Player();
	p.id=id;
	p.name="小王";
	p.groupNumber=1;
	p.seatNumber=3;
	return p;
}
function getPunishmentListByID(id){
	var list=[];
	list[0]=PUNISGMENTS[0];
	list[1]=PUNISGMENTS[1];
	list[2]=PUNISGMENTS[2];
	return list;
}
