/*
 * Author : NarugaL_ove @ Twitter
 * This code uses Jquery.
 * Korean version.
 */
function Status(pbs,piv,pev){
	this.bs = pbs;
	this.iv = piv;
	this.ev = pev;
}
/*
 * stH ~ stS : Status Object
 * LV : integer (pokemon lv)
 * nature : string (ex : "무사태펑")
 */
function Pokemon(stH,stA,stB,stC,stD,stS,LV,nature){

}

var type = ["노멀", "불꽃", "물", "전기", "풀", "얼음", "격투", "독", "땅",
			 "비행", "에스퍼", "벌레", "바위", "고스트", "드래곤", "악", "강철", "페어리"];
			 
var excep_skill =
[
["더블니들","더블어택","더블촙","두번치기","뼈다귀부메랑","기어소서"],	//[0] : X2 Hit
["가시대포","고드름침","구슬던지기","기관총","락블레스트",
"마구찌르기","마구할퀴기","바늘미사일","본러쉬","손바닥치기",
"스위프뺨치기","연속뺨치기","연속펀치","물수리검"],						//[1] : X2~5 Hit
["트리플킥"],															//[2] : triple kick(10+20+30)
["탁쳐서떨구기"]];														//[3] : 탁떨(65*1.5)

var nature_table =
[
	["외로운","A","B"],["고집스런","A","C"],["개구쟁이","A","D"],["용감한","A","S"],
	["대담한","B","A"],["장난꾸러기","B","C"],["촐랑거리는","B","D"],["무사태평","B","S"],
	["조심스런","C","A"],["의젓한","C","B"],["덜렁거리는","C","D"],["냉정한","C","S"],
	["차분한","D","A"],["얌전한","D","B"],["신중한","D","C"],["건방진","D","S"],
	["겁쟁이","S","A"],["성급한","S","B"],["명랑","S","C"],["천진난만","S","D"],
	["수줍음","0","0"],["노력","0","0"],["온순한","0","0"],["변덕스러운","0","0"],["성실한","0","0"]
];
var type_table = //Type 상성 표.
//	노멀 불꽃  물  전기  풀  얼음 격투  독   땅   비행 에슾 벌레 바위 고슽 들곤 악  강철 페어리	
[	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 0.0, 1.0, 1.0, 0.5, 1.0], //노멀	[0]
	[1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0], //불꽃	[1]
	[1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0], //물	[2]
	[1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0], //전기	[3]
	[1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0], //풀	[4]
	[1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0], //얼음	[5]
	[2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0.0, 1.0, 2.0, 2.0, 0.5], //격투	[6]
	[1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0.0, 2.0], //독	[7]
	[1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.0, 1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0], //땅	[8]
	[1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0], //비행	[9]
	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0.0, 0.5, 1.0], //에스퍼[10]
	[1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5], //벌레	[11]
	[1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], //바위	[12]
	[0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0], //고스트[13]
	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0.0], //드래곤[14]
	[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5], //악	[15]
	[1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0], //강철	[16]
	[1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0] //페어리	[17]
	]; 
/*
 * atk  : String(공격 스킬 타입)
 * def1 : String(방어 포켓몬 타입1)
 * def2 : String(방어 포켓몬 타입2) : 두번째 타입이 없는 포켓몬의 경우 null이나 ""를 넣는다.
 * 사용 예시 
 * calc_type("불꽃","강철","벌레") = 4.0
 * calc_type("노말","고스트","") = 0.0
 */

function calc_type(atk,def1,def2){
	var atkcode; var defcode1; var defcode2;
	for(var i = 0; i<18; i++){
		if(type[i] === atk)
			atkcode = i;
		if(type[i] === def1)
			defcode1 = i;
		if(type[i] === def2)
			defcode2 = i;
	}
	if(isNaN(defcode2))
		return type_table[atkcode][defcode1];
	return type_table[atkcode][defcode1] * type_table[atkcode][defcode2];
}

/*HP를 제외한 스탯의 실능치를 구한다
 * 사용 예시 : 130족의 50렙 최속 스핏
 * status_calc(130,31,252,1.1,50) = 200
 */
function status_calc(bs, iv, ev, nature, lv) {
	return Math.floor((Math.floor((bs * 2 + iv + ev / 4) * lv /100 + 5)) * nature);
}

/*
 * HP의 스탯 실능치를 구한다.
 * 사용 예시 : 
 * hp_calc(100,31,252,50)
 */
function hp_calc(bs, iv, ev, lv){
	return  Math.floor((bs * 2 + iv + ev / 4) * lv / 100 + 10 + lv);
}

