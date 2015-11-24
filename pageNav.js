$(function(e) {
	
	var index = 1;
	var visPage = $("nav").data("vis");
	var maxPage = $(".pageNav").length;
	setPages();

	$("nav").on("click touch", ".pageNav", function(e) {
		var t = $(this);
		if(t.is(".disabled, .active")) return false;

		switch (t.attr("id")) {
			case 'prePage':
				index--;
				break;
			case 'nextPage':
				index++;
				break;
			default:
				index = t.find("a").text();
		}
		$(".pageNav").removeClass("active")
		$("#pageNav" + index).addClass("active");
		if(index != 1 && index != maxPage) {
			$("nav li").removeClass("disabled");
		}
		if(index == 1) {
			$("#prePage").addClass("disabled");
		}else if(index == maxPage) {
			$("#nextPage").addClass("disabled")
		}
		setPages();
	});

	function setPages() {
		var html = $("nav li").eq(0).FullHtml();
		var cn = 0;
		var icon = "<li class='disabled'><span class='glyphicon glyphicon-option-horizontal'></span></li>";
		var i = 1;
		while (i < maxPage + 1) {
			if(i < index - Math.ceil(visPage / 2) + 1 && html.indexOf("glyphicon") < 0) {
				html += icon;
				i = Math.min(index - Math.ceil(visPage / 2) + 1, maxPage - visPage + 1);
				console.log("i:" + i);
			}else if(cn >= visPage) {
				html += icon 
				break;
			}else if(i != index){
				html += "<li id='pageNav" + i + "' class='pageNav'><a href='#'>" + i + "</a></li>";
				cn++;
				i++;
			}else {
				html += "<li id='pageNav" + i + "' class='pageNav active'><a href='#'>" + i + "</a></li>";
				cn++;
				i++;
			}
		}
		html += $("nav li").last().FullHtml();
		$("nav ul").html(html);
		$("nav").removeClass("invisible");
	}
});

$.fn.extend({ 
	FullHtml:function() {
		return this.clone().wrap("<p>").parent().html();
	}
});
