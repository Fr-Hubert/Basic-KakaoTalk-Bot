const scriptName = "KakaoTalkBot";

/*Hubert가 관리자*/
var admin = 'Hubert';
/*베터리 % 정보 취득*/
var battery = Device.getBatteryLevel();
/*봇 전원 on/off 기능(default value = false)*/
var on = false;

/*카카오톡 봇 메인 함수*/
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {

	/*메시지 문자열 좌우 공백 제거*/
	msg = msg.trim();

	/*봇의 전원을 켜줌*/
	if(msg == "/on") {
		on = true;
		replier.reply("[Power On]\nBot Operational!!");
	}

	/*봇의 전원을 끔*/
	if(msg == "/off") {
		on = false;
		replier.reply("[Power Off] Time to sleep!!");
	/*베터리가 1% 남았을 때 봇의 전원을 종료*/
	}else if(battery = 1) {
		on = false;
	    replier.reply("[Power Off] Time to sleep!!");
	}

	/*/봇 이라고 메시지를 보낼 경우*/
	if(msg == "/봇") {
		/*개발자, 버전, 베터리 잔량 정보를 출력*/
		replier.reply(
			"개발자 : " + admin "\n" +
			"버전 : ver.1.0.0\n" +
			"베터리 잔량 : " + battery + "%"
		);
	}

	/*베터리가 10%가 남으면 봇의 전원이 곧 종료된다는 경고 메시지를 출력*/
	if(battery = 10) {
		replier.reply("베터리 잔량이 10%입니다.\n봇이 곧 종료됩니다.");
	}

	/*현재 시간을 출력*/
	if(msg == "/시간") {
		/*디바이스 위치 기준 현재시간*/
		const now = new Date();
		/*도쿄시간(한국과 시간 동일)*/
		const toKyoOffset = 0;
		/*바티칸 시간(도쿄와 시차 7시간)*/
		const vaticanOffset = -7;
		/*각 도시에 맞는 현재 시간대*/
		const tokyoTime = new Date(now.getTime() + (tokyoOffset * 3600000));
	    const vaticanTime = new Date(now.getTime() + (vaticanOffset * 3600000));

	    /*시간 출력 함수*/
	    function formatTime(city, time) {
	    	/*x월 x일 xx시 xx분*/	
	    	return city + ": " + (time.getMonth() + 1) + "월 " + time.getDate() + "일 " + ("0" + time.getHours()).slice(-2) + "시 " + ("0" + time.getMinutes()).slice(-2) + "분";
	    }
	    /*각 도시의 현재시간 출력*/
	    const vaticanFormattedTime = formatTime("바티칸", vaticanTime);
	    const tokyoFormattedTime = formatTime("도쿄, 일본", tokyoTime);

	    replier.reply(vaticanFormattedTime + "\n" + tokyoFormattedTime);
	}

	/*전자시계 기능*/
	if(msg == "시계") {
        var hour = Date().slice (16,18);
        var minute = Date ().slice (19,21);
        var smsg = "[현재시간]\n";

        var num = [["111","101","101","101","111"],
        ["001","001","001","001","001"],
        ["111","001","111","100","111"],
        ["111","001","111","001","111"],
        ["101","101","111","001","001"],
        ["111","100","111","001","111"],
        ["111","100","111","101","111"],
        ["111","101","101","001","001"],
        ["111","101","111","101","111"],
        ["111","101","111","001","001"]];

        var middle = "01010";
        for(var i = 0; i < 5; i++) {
            smsg += num[hour[0]][i]+ "  " +num[hour[1]][i]+ "  " +middle[i]+ "  " +num[minute[0]][i]+ "  " +num[minute[1]][i]+"\n";
        }
        replier.reply(smsg.replace(/0/gi,"□").replace(/1/gi,"■").slice(0,-1));
    }

	/*Bot의 전원이 꺼져있는 상태에서는 봇이 작동하지 않게함*/
	/*function response 비활성화*/
	if(on == false) return;

}
