/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(960, 640, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    count=0;
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
    	init();
    	
    }, this);
};
function init(){
	USERID=null;
	USERNAME="李明";
	NAME_GAMEOFTODAY=[];
	//NAME_GAMEOFTODAY[0]="Game1";
	//NAME_GAMEOFTODAY[1]="Game2";
	ID_GAMEOFTODAY=[];
	ID_GAMEOFTODAY[0]="1";
	ID_GAMEOFTODAY[1]="2";
	ID_CURRENTGAME=ID_GAMEOFTODAY[0];
	GAMESTARTTIME=new Date(2016,6,1);//测试用
	CURRENTROUND=1;
	PUNISGMENTS=[];
	PUNISGMENTS[0]="扣分项1";
	PUNISGMENTS[1]="扣分项2";
	PUNISGMENTS[2]="扣分项3";
	PUNISGMENTS[3]="扣分项4";
	/*PUNISGMENTSCONFER=[{itemname:"扣分项1",score:1},{itemname:"扣分项2",score:2},{itemname:"扣分项3",score:3},{itemname:"扣分项4",score:4}
	];
	PUNISGMENTS=[];
	for (var i=0;i<PUNISGMENTSCONFER.length;i++) {
		PUNISGMENTS.push(PUNISGMENTSCONFER[i].itemname);
	}*/
	asocket=new socket();
	asocket.init();
}
function getPlayerByID(id){
	var p=new Player();
	p.id=id;
	p.name="小王";
	p.groupNumber=1;
	p.seatNumber=3;
	return p;
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
cc.game.run();
