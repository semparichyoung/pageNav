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
	pageNav:function(option) {
		var maxPage = option.maxPage || this.length;
		var visPage = option.visPage || 5;
		var index = option.start || 1;

		setPage();

		this.on("click touch", ".pageNav", function(e) {
			var t = $(this);
			switch (t.attr("id")) {
				case 'prePage':
					index--;
					break;
				case 'nextPage':
					index++;
					break;
				default:
					index = t.attr("id").substr(7);
			}
			setPage();
		});

		function setPage() {
			var html = [];
			html.push("<ul class='pagination'>",
					"<li class='pageNav' id='prePage'>",
					"<a href='#' aria-label='Previous'>",
					"<span aria-hidden='true'>&laquo;</span></a></li>");

			var cn = 0;
			var icon = "<li class='disabled'><span class='glyphicon glyphicon-option-horizontal'></span></li>";
			var i = 1;
			while (i < maxPage + 1) {
				if(i < index - Math.ceil(visPage / 2) + 1 && html.indexOf("glyphicon") < 0) {
					html.push(icon);
					i = Math.min(index - Math.ceil(visPage / 2) + 1, maxPage - visPage + 1);
				}else if(cn >= visPage) {
					html.push(icon);
					break;
				}else {
					html.push(pn(i));
					cn++;
					i++;
				}
			}
			html.push("<li class='pageNav' id='nextPage'>",
					"<a href='#' aria-label='Next'>",
					"<span aria-hidden='true'>&raquo;</span>",
					"</a></li></ul></nav>");
			this.html(html.join(""));
			switch (index) {
				case '1':
					$("#prePage").addClass("disabled");
					break;
				case maxPage:
					$("#nextPage").addClass("disabled");
					break;
				default:
					$("#pageNav" + index).addClass("active");
			}
		}
		function pn(i) {
			return "<li id='pageNav" + i + "' class='pageNav'><a href='#'>" + i + "</a></li>";
		}
	},
	FullHtml:function() {
		return this.clone().wrap("<p>").parent().html();
	}
});
