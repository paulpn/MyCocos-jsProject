Group=function(){
	this.groupID;
	this.member=[];
	this.numberOfMember;
	this.changdiNumber;
	this.side;
	this.scoreOfThisRound;
	this.totalScore;
}

function getGroupByNumber(number){
	var g=new Group();
	g.groupNumber=number;
	g.member=[];
	g.numberOfMember;
	g.changdiNumber=1;
	g.side="1边";
	g.scoreOfThisRound;
	g.totalScore;
	return g;
}
