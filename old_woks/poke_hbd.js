/**
 * @author Twitter @NarugaL_ove
 */
function set_val(setval, domid) {
	$("#" + domid).val(setval);
}

function calc_hp(bs, ev, iv, lv) {
	var result = (bs * 2 + iv + ev / 4) * lv / 100 + 10 + lv;
	return Math.floor(result);
}

function calc_bd(bs, ev, iv, lv, isplusnature, hosei) {
	var result = ((bs * 2 + iv + ev / 4) * lv / 100 + 5);
	if (isplusnature)
		result = result * 1.1;
	return Math.floor(result * hosei);
}

$(function() {
	var jsonurl = "pokebsko.json";
	if ($('HTML').attr("lang") === "ja")
		jsonurl = "pokebs.json";

	$.getJSON(jsonurl, function(data) {
		var narray = new Array();
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
						$("#bsH").val(data[i].H);
						$("#bsB").val(data[i].B);
						$("#bsD").val(data[i].D);
					}
				}
			}
		});
		$("#pname").change(function() {
			var inpname = $("#pname").val();
			for (var i in data) {
				if (inpname === data[i].NAME) {
					$("#bsH").val(data[i].H);
					$("#bsB").val(data[i].B);
					$("#bsD").val(data[i].D);
				}
			}
		});
	});

	$("#resultdiv").hide();

	$("#calc").click(function() {
		var result_arr = new Array();
		var h = parseInt($("#bsH").val());
		var b = parseInt($("#bsB").val());
		var d = parseInt($("#bsD").val());
		var ih = parseInt($("#ivH").val());
		var ib = parseInt($("#ivB").val());
		var id = parseInt($("#ivD").val());
		var usable_ev = parseInt($("#ev").val());
		if (uev < 508)
			uev = 508;
		var n_b = false;
		var n_d = false;
		var nature = $("*[name=pnature]:checked").val();
		if (nature === "nb")
			n_b = true;
		if (nature === "nd")
			n_d = true;
		var iv = 31;
		var lv = 50;
		var rankB = 1.0;
		var rankD = 1.0;
		if ($("#chokki:checked").val() === "true") {
			rankD = rankD * 1.5;
		}
		if ($("#kiseki:checked").val() === "true") {
			rankB = rankB * 1.5;
			rankD = rankD * 1.5;
		}

		var eh = 0;
		var eb = 0;
		var ed = 0;
		var uev = usable_ev;
		var tb;
		var td;
		if (uev >= 504) {
			eh = 252;
			eb = 252;
			uev = uev - 504;
			ed = uev;
		} else if (uev >= 252) {
			eh = 252;
			uev = uev - 252;
			eb = uev;
		} else {
			eh = uev;
			uev = 0;
		}

		for (var i = eh; i >= 0; i = i - 4) {
			for (var j = Math.min(usable_ev - i, 252); j >= 0; j = j - 4) {
				var k = Math.min(usable_ev - i - j, 252);
				if (i + j + k != usable_ev)
					continue;
				var rh = calc_hp(h, i, ih, lv);
				var rb = calc_bd(b, j, ib, lv, n_b, rankB);
				var rd = calc_bd(d, k, id, lv, n_d, rankD);
				tb = Math.round(rh * rb / 0.411);
				td = Math.round(rh * rd / 0.411);
				result_arr.push([rh, rb, rd, tb, td, tb + td, i, j, k]);

			}
		}

		$("#result_table").dataTable({
			"aaData" : result_arr,
			"iDisplayLength" : 300,
			"aaSorting" : [[5,'desc']],
			"bDestroy" : true,
			"aoColums" : [{
				"sTitle" : "HP실능값"
			}, {
				"sTitle" : "B실능값"
			}, {
				"sTitle" : "D실능값"
			}, {
				"sTitle" : "물리내구"
			}, {
				"sTitle" : "특수내구"
			}, {
				"sTitle" : "물리내구+특수내구"
			}, {
				"sTitle" : "HP 노력치"
			}, {
				"sTitle" : "방어 노력치"
			}, {
				"sTitle" : "특방 노력치"
			}]
		});
		$("#resultdiv").show();

	});

});

function evset(setval) {
	$("#ev").val(setval);
}
