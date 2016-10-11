

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
function exception_skill(skill_name){
	var code = -1;
	for(var i in excep_skill){
		for(var j in excep_skill[i]){
			if(excep_skill[i][j] === skill_name)
				code = i;
		}
	}
	switch(code){
		case "0" : 
			$("#atk_excep_text").show();
			$("#atk_excep_box").show();
			$("#atk_excep_text").html("풀히트(*2) <input type='checkbox' id = 'atk_excep_box' value='2.0'>");
			set_dom();
			break;
		case "1" : 
			$("#atk_excep_text").show();
			$("#atk_excep_box").show();
			$("#atk_excep_text").html("풀히트(*5) <input type='checkbox' id = 'atk_excep_box' value='5.0'>");
			set_dom();
			break;
		case "2" : 
			$("#atk_excep_text").show();
			$("#atk_excep_box").show();
			$("#atk_excep_text").html("풀히트(10+20+30) <input type='checkbox' id = 'atk_excep_box' value='6.0'>");
			set_dom();
			break;		
		case "3" : 
			$("#atk_excep_text").show();
			$("#atk_excep_box").show();
			$("#atk_excep_text").html("상대가 아이템 보유(*2) <input type='checkbox' id = 'atk_excep_box' value='1.5'>");
			set_dom();
			break;
		default:
			$("#atk_excep_text").hide();
			$("#atk_excep_box").hide();	
			break;		
		
	}
}
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
function set_val(setval, domid) {
	$("#" + domid).val(setval);
}

function plusrank(rank, domid) {
	var r = parseInt($("#" + domid).children(':selected').val());
	if ((r < 6 && rank === 1) || (r > -6 && rank === -1))
		$("#" + domid).val((r + rank).toString());
}

function status_calc(bs, iv, ev, nature) {
	return Math.floor((Math.floor((bs * 2 + iv + ev / 4) * 0.5 + 5)) * nature);
}
function hp_calc(bs, iv, ev){
	return  Math.floor((bs * 2 + iv + ev / 4) * 50 / 100 + 10 + 50);
}


$(function() {
	$("#atk_excep_text").hide();
	$("#atk_excep_box").hide();	
	type.forEach(function(value, index, ar) {
		$('#skill_type').append($('<option value="' + value + '">' + value + '</option>'));
	});
	var d;
	var narray = new Array();
	var skillarray = new Array();
	var atk_type1; var atk_type2; var skill_type;
	var def_type1; var def_type2;
	var h;
	
	$.getJSON("pokebsko.json", function(data) {
		d = data;
		for (var i in data) {
			narray.push(data[i].NAME);
		}

		$("#pname").autocomplete({
			source : narray,
			select : function(ev, ui) {
				$("#pname").val(ui.item.value);
				var inpname = ui.item.value;
				for (var i in data) {
					if (inpname === data[i].NAME) {
						atk_type1 = data[i].TYPE1;
						atk_type2 = data[i].TYPE2;
						$("#bsa").val(data[i].A);
						$("#bsc").val(data[i].C);
						if(data[i].TYPE1 ===$("#skill_type").val() || data[i].TYPE2 ===$("#skill_type").val())
							$("#other1").attr("checked",true);
						else
							$("#other1").attr("checked",false);
					}
				}
			}
		});
		$("#pname").change(function() {
			var inpname = $("#pname").val();
			for (var i in data) {
				if (inpname === d[i].NAME) {
					atk_type1 = data[i].TYPE1;
					atk_type2 = data[i].TYPE2;
					$("#bsa").val(data[i].A);
					$("#bsc").val(data[i].C);
					if(data[i].TYPE1 ===$("#skill_type").val() || data[i].TYPE2 ===$("#skill_type").val())
						$("#other1").attr("checked",true);
						else
							$("#other1").attr("checked",false);
				}
			}
		});
		$("#def_pname").autocomplete({
			source : narray,
			select : function(ev, ui) {
				$("#def_pname").val(ui.item.value);
				var inpname = ui.item.value;
				for (var i in data) {
					if (inpname === data[i].NAME) {
						def_type1 = data[i].TYPE1;
						def_type2 = data[i].TYPE2;
						$("#def_bsh").val(data[i].H);
						$("#def_bsb").val(data[i].B);
						$("#def_bsd").val(data[i].D);
					}
				}
			}
		});
		$("#def_pname").change(function() {
			var inpname = $("#def_pname").val();
			for (var i in data) {
				if (inpname === d[i].NAME) {
					def_type1 = data[i].TYPE1;
					def_type2 = data[i].TYPE2;
					$("#def_bsh").val(data[i].H);
					$("#def_bsb").val(data[i].B);
					$("#def_bsd").val(data[i].D);
				}
			}
		});

	});



	$.getJSON("bsskill.json", function(data) {
		for (var i in data) {
			if (data[i].AC != "변화")
				skillarray.push(data[i].NAME);
		}
		$("#skill").autocomplete({
			source : skillarray,
			select : function(ev, ui) {
				$("#skill").val(ui.item.value);
				var inpname = ui.item.value;
				for (var i in data) {
					if (inpname === data[i].NAME) {
						$("#skill_power").val(data[i].POWER);
						$("#skill_ac").val(data[i].AC);
						$("#skill_type").val(data[i].TYPE);
						if(atk_type1 === data[i].TYPE || atk_type2 === data[i].TYPE)
							$("#other1").attr("checked",true);
						else
							$("#other1").attr("checked",false);
						exception_skill(data[i].NAME);
							
					}
				}
			}
		});
		$("#skill").change(function() {
			var inpname = $("#skill").val();
			for (var i in data) {
				if (inpname === data[i].NAME) {
					$("#skill_power").val(data[i].POWER);
					$("#skill_ac").val(data[i].AC);
					$("#skill_type").val(data[i].TYPE);
					if(atk_type1 === data[i].TYPE || atk_type2 === data[i].TYPE)
						$("#other1").attr("checked",true);					
					else
						$("#other1").attr("checked",false);
					exception_skill(data[i].NAME);
				}
			}
		});
		$("#skill_type").change(function(){
			if (atk_type1 === $("#skill_type").val() || atk_type2 === $("#skill_type").val())
				$("#other1").attr("checked", true);
			else
				$("#other1").attr("checked", false);

		});
	});

	$("#atk_calc").click(function() {
		var iv = parseInt($("#iv").val());
		var bs;
		if ($("#skill_ac").val() === "물리")
			bs = parseInt($("#bsa").val());
		else
			bs = parseInt($("#bsc").val());
		var ev = parseInt($("#ev").val());
		var rank = parseInt($("#rank").val());
		var nature = parseFloat($("#nature").val());
		
		var atk = status_calc(bs, iv, ev, nature);
		$("#atk_status").val(atk);
		
		var skill_power = parseFloat($("#skill_power").val());
		var item = parseFloat($("#atk_item").val());
		var ability = parseFloat($("#atk_ability").val());
		
		var result = atk;
		if (rank > 0)
			result = Math.floor(result * (rank + 2) / 2);
		else if (rank < 0)
			result = Math.floor(result * 2 / (-rank + 2));
		result = Math.floor(result * skill_power);
		result = Math.floor(result * item);
		result = Math.floor(result * ability);
		for(var i = 1; i<=6;i++){
			if($("#other"+i+":checked").val())
				result = Math.floor(result * parseFloat($("#other"+i).val()));
		}
		$("#atk_result").val(result);
		
	});
	$("#def_calc").click(function(){

		var bsb = parseInt($("#def_bsb").val());
		var ivb = parseInt($("#def_ivb").val());
		var bsd = parseInt($("#def_bsd").val());
		var ivd = parseInt($("#def_ivd").val());

		var ivh = parseInt($("#def_ivh").val());
		var bsh = parseInt($("#def_bsh").val());
		
		var evh = parseInt($("#def_evh").val());
		var evb = parseInt($("#def_evb").val());
		var evd = parseInt($("#def_evd").val());
		
		
		
		var rankb = parseInt($("#def_rankb").val());
		var natureb = parseFloat($("#def_natureb").val());
		var rankd = parseInt($("#def_rankd").val());
		var natured = parseFloat($("#def_natured").val());
		
		var hp_min = hp_calc(bsh,ivh,evh);
		h=hp_min;
		var hp_max = hp_calc(bsh,ivh,252);
		var def_minb = status_calc(bsb,ivb,evb,natureb);		
		var def_mind = status_calc(bsd,ivd,evd,natured);	
		var def_maxb = status_calc(bsb,ivb,252,natureb);		
		var def_maxd = status_calc(bsd,ivd,252,natured);
		
		$("#def_statush").val(hp_min);		
		$("#def_statusb").val(def_minb);		
		$("#def_statusd").val(def_mind);		
		
		var result_minb = Math.round(def_minb * hp_min / 0.411);
		var result_mind = Math.round(def_mind * hp_min / 0.411);
		var result_maxb = Math.round(def_maxb * hp_max / 0.411);
		var result_maxd = Math.round(def_maxd * hp_max / 0.411);
		if (rankb > 0){
			result_minb = Math.floor(result_minb * (rankb + 2) / 2);
			result_maxb = Math.floor(result_maxb * (rankb + 2) / 2);}
		else if (rankb < 0){
			result_minb = Math.floor(result_minb * 2 / (-rankb + 2));
			result_maxb = Math.floor(result_maxb * 2 / (-rankb + 2));}
		if (rankd > 0){
			result_mind = Math.floor(result_mind * (rankd + 2) / 2);
			result_maxd = Math.floor(result_maxd * (rankd + 2) / 2);}
		else if (rankd < 0){
			result_mind = Math.floor(result_mind * 2 / (-rankd + 2));
			result_maxd = Math.floor(result_maxd * 2 / (-rankd + 2));}
		

		for(var i = 1; i <=1;i++){
		if($("#def_other_bd"+i+":checked").val()){
			result_minb = Math.floor(result_minb * parseFloat($("#def_other_bd"+i).val()));
			result_mind = Math.floor(result_mind * parseFloat($("#def_other_bd"+i).val()));
			result_maxb = Math.floor(result_maxb * parseFloat($("#def_other_bd"+i).val()));
			result_maxd = Math.floor(result_maxd * parseFloat($("#def_other_bd"+i).val()));
			}}
		for(var i = 1; i <=3;i++){
		if($("#def_other_b"+i+":checked").val()){
			result_minb = Math.floor(result_minb * parseFloat($("#def_other_b"+i).val()));
			result_maxb = Math.floor(result_maxb * parseFloat($("#def_other_b"+i).val()));
			}}
		for(var i = 1; i <=2;i++){
		if($("#def_other_d"+i+":checked").val()){
			result_mind = Math.floor(result_mind * parseFloat($("#def_other_d"+i).val()));
			result_maxd = Math.floor(result_maxd * parseFloat($("#def_other_d"+i).val()));
			}}
		$("#def_minb").val(result_minb);			
		$("#def_mind").val(result_mind);			
	});
	
	
	$("#final_calc").click(function(){
			$("#atk_calc").click();
			$("#def_calc").click();
		var atk_ac = $("#skill_ac").val();
		var atk = parseInt($("#atk_result").val());
		var skltype = $("#skill_type").val();
		var typecalc = calc_type(skltype,def_type1,def_type2);
		var final_atk = atk*typecalc;
		$("#result_final_atk").val(atk+" * "+typecalc+"(상성)="+final_atk);
		var final_def;
		if(atk_ac ==="물리")
			final_def = $("#def_minb").val();
		else
			final_def = $("#def_mind").val();
			
		$("#result_final_def").val(final_def);
		
		var result = final_atk / final_def;
		
		$("#result_str").html("평균 남는 체력 비율 :"+(Math.round(100-result*100))+"%"); 
		
		if(result>1){
			$("#result_bar").html("<div class='progress-bar progress-bar-success' style='width: 0%'><span class='sr-only'>평균 데미지 (success)</span></div>");
		}
		else if(result > 0.75){
			$("#result_bar").html("<div class='progress-bar progress-bar-danger' style='width: "+(100-result*100)+"%'><span class='sr-only'>평균 데미지 (success)</span></div>");			
		}
		else if(result > 0.5){
			$("#result_bar").html("<div class='progress-bar progress-bar-warning' style='width: "+(100-result*100)+"%'><span class='sr-only'>평균 데미지 (success)</span></div>");			
		}
		else{
			$("#result_bar").html("<div class='progress-bar progress-bar-success' style='width: "+(100-result*100)+"%'><span class='sr-only'>평균 데미지 (success)</span></div>");			
		}
		var min_per = final_atk / (final_def * 0.935 / 0.85) + 1.7/h;
		var max_per = final_atk / (final_def * 0.935) + 2/h;
		$("#result_str2").html("데미지 범위 : <b>"+Math.round(min_per*100)+"%</b> ~ <b>"+Math.round(max_per*100)+"%</b>");
	});
	




});
function set_dom(){
	$("#atk_excep_box").click(function() {
		var va;
		if($(this).is(':checked')){
			va = parseFloat($("#atk_excep_box:checked").val());
			if (!isNaN(va))
				$("#skill_power").val($("#skill_power").val() * va);
		} else {
			va = parseFloat($("#atk_excep_box").val());
			$("#skill_power").val($("#skill_power").val() / va);
		}
	}); 	
}

