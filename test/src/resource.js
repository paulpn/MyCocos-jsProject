var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json : "res/MainScene.json",
    Menu_json:"res/menu.json",
    Shuaka_json:"res/shuaka.json",
    PersonalInfo_json:"res/personal_info.json",
    Judge_json:"res/judgement.json",
    Score_json:"res/score.json",
    Login_json:"res/login.json"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
