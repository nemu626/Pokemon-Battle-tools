/**
 * @author Twitter @NarugaL_ove
 */

function set_val(setval,domid) {
	$("#"+domid).val(setval);
}

function plusrank(rank,domid) {
	var r = parseInt($("#"+domid).children(':selected').val());
	if ((r < 6 && rank === 1) || (r > -6 && rank === -1))
		$("#"+domid).val((r + rank).toString());
}

function oneclick_set(iv,ev,nature,iv_dom,ev_dom,nature_dom){
	set_val(iv,iv_dom);
	set_val(ev,ev_dom);
	$("#"+nature_dom).val(nature);
}
function total_calc(bs,iv,ev,nature,rank,item,ability,mahi,oikaze){
	return hosei_calc(status_calc(bs,iv,ev,nature),rank,item,ability,mahi,oikaze);
}
function status_calc(bs,iv,ev,nature){
	return Math.floor((Math.floor((bs*2 + iv + ev/4)*0.5 + 5))* nature);
}
function hosei_calc(speed,rank,item,ability,mahi,oikaze){
    var result = speed;
    if(rank>0)
        result = Math.floor(result * (rank+2)/2);
    else if(rank<0)
        result = Math.floor(result * 2/(-rank+2));
	result =  Math.floor(result * item);
	result =  Math.floor(result * ability);
	result =  Math.floor(result * mahi);
	result =  Math.floor(result * oikaze);
	return result;
}

$(function() {
	var errstr = "추월 불가능";
	var jsonurl = "pokebsko.json";
	if ($('HTML').attr("lang") === "ja"){
		jsonurl = "pokebs.json";
		errstr = "抜けません";
		}

	$.getJSON(jsonurl, function(data) {
		var narray = new Array();
		for (var i in data) {
			narray.push(data[i].NAME);
		}
		$("#adp_name").autocomplete({
			source : narray,
			select : function(ev, ui) {
				$("#adp_name").val(ui.item.value);
				var inpname = ui.item.value;
				for (var i in data) {
					if (inpname === data[i].NAME) {
						$("#adp_bs").val(data[i].S);
					}
				}
			}
		});
		$("#adp_name").change(function() {
			var inpname = $("#adp_name").val();
			for (var i in data) {
				if (inpname === data[i].NAME) {
					$("#adp_bs").val(data[i].S);
				}
			}
		});
		$("#tgp_name").autocomplete({
			source : narray,
			select : function(ev, ui) {
				$("#tgp_name").val(ui.item.value);
				var inpname = ui.item.value;
				for (var i in data) {
					if (inpname === data[i].NAME) {
						$("#tgp_bs").val(data[i].S);
					}
				}
			}
		});
		$("#tgp_name").change(function() {
			var inpname = $("#tgp_name").val();
			for (var i in data) {
				if (inpname === data[i].NAME) {
					$("#tgp_bs").val(data[i].S);
				}
			}
		});		
	});

	$("#result_div").hide();
	
	$("#calc_button").click(function(){
		var a_bs = parseInt($("#adp_bs").val());
		var a_iv = parseInt($("#adp_iv").val());
		var a_rank = parseInt($("#adp_rank").val());
		var a_item = parseFloat($("#adp_item").val());
		var a_ability = parseFloat($("#adp_ability").val());
		var a_mahi =1.0; var a_oikaze = 1.0;
		if($("#adp_mahi:checked").val() === "on") a_mahi = 0.25;
		if($("#adp_oikaze:checked").val() === "on") a_oikaze = 2.0;
		
		var t_bs = parseInt($("#tgp_bs").val());
		var t_iv = parseInt($("#tgp_iv").val());
		var t_ev = parseInt($("#tgp_ev").val());
		var t_rank = parseInt($("#tgp_rank").val());
		var t_nature = parseFloat($("#tgp_nature").val());
		var t_item = parseFloat($("#tgp_item").val());
		var t_ability = parseFloat($("#tgp_ability").val());
		var t_mahi =1.0; var t_oikaze = 1.0;
		if($("#tgp_mahi:checked").val() === "on") t_mahi = 0.25;
		if($("#tgp_oikaze:checked").val() === "on") t_oikaze = 2.0;	
		
		
		var t_speed = total_calc(t_bs,t_iv,t_ev,t_nature,t_rank,t_item,t_ability,t_mahi,t_oikaze);
		$("#target_speed").val(t_speed);
		var result_arr = new Array();
		for(var j = 0; j<3;j++){
			for(var i = 0; i<=252; i=i+4){
				var n = 1.1-j*0.1;
				var a_speed = total_calc(a_bs,a_iv,i,n,a_rank,a_item,a_ability,a_mahi,a_oikaze);
				if(a_speed >= t_speed + 1){
					result_arr.push([i,a_speed]);
					break;
				}else if(i === 252){
					result_arr.push([errstr,a_speed]);
				}
			}
		}
		$("#result_div").show();
		$("#plus_ev").text(result_arr[0][0]);
		$("#plus_stat").text(result_arr[0][1]);
		$("#zero_ev").text(result_arr[1][0]);
		$("#zero_stat").text(result_arr[1][1]);
		$("#minus_ev").text(result_arr[2][0]);
		$("#minus_stat").text(result_arr[2][1]);
		
		
		
		
		
	});

}); 

