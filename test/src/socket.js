var soc=cc.Node.extend({
	_wsiSendText:null,
	ctor:function(){
		this._super();
		this._wsiSendText = new WebSocket("ws://echo.websocket.org");
		this._wsiSendText.onopen=function(evt) {
			cc.log("Send Text WS was opened.");
		};
		this._wsiSendText.onmessage=function(evt) {
			//var textStr = "response text msg: "+evt.data+", "+this.sendTextTimes;
			cc.log("get");
		};
		this._wsiSendText.onerror =function(evt) {
			cc.log("sendText Error was fired");
		};
		this._wsiSendText.onclose =function(evt) {
			cc.log("_wsiSendText websocket instance closed.");
		};
		
	},
	clicksendmessage:function(){
		if (this._wsiSendText.readyState == WebSocket.OPEN)
		{
			this._sendTextStatus.setString("Send Text WS is waiting...");
			this._wsiSendText.send("Hello WebSocket中文, I'm a text message.");
		}
		else
		{
			var warningStr = "send text websocket instance wasn't ready...";
			cc.log(warningStr);

		}
	}

	


	
});
