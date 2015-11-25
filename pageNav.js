$.fn.extend({ 
	pageNav:function(option) {
		var target = this;
		var visPage = option.visPage || 5;
		var index = option.start || 1;
		var maxPage;
		if((typeof option.maxPage == "undefined" || typeof option.callback == "undefined") && (typeof option.content == "undefined" || typeof option.showNum == "undefined")) {
			console.error("You need to set maxPage and callback both or set content and showNum both to run");
			return false;
		}else if(typeof option.content == "undefined" || typeof option.showNum == "undefined") {
			maxPage = option.maxPage;
		}else {
			var showNum = option.showNum;
			if(option.content.length < showNum) {
				console.log("content number less than shown number");
				maxPage = 1;
				showNum = option.content.length;
			}
			maxPage = Math.ceil(option.content.length / showNum);
		}
		visPage = visPage > maxPage ? maxPage : visPage;

		setPage();
		setPageNav();

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
			if(typeof option.callback == "function") {
				option.callback(index);
			}
			setPage();
			setPageNav();
		});
		function setPage() {
			if(typeof option.content != "undefined" && typeof showNum != "undefined") {
				// console.log(showNum, option.content);
				option.content.addClass("invisible");
				console.log("show:" + (showNum * (index - 1)) + " to " + (showNum * index));
				for(var i = showNum * (index - 1); i < showNum * index; i++) {
					option.content.eq(i).removeClass("invisible");
				}
			}
		}
		function setPageNav() {
			var html = [];
			html.push("<ul class='pagination'>",
					"<li class='pageNav' id='prePage'>",
					"<a href='#' aria-label='Previous'>",
					"<span aria-hidden='true'>&laquo;</span></a></li>");

			var cn = 0;
			var icon = "<li class='disabled'><span class='glyphicon glyphicon-option-horizontal'></span></li>";
			var i = 1;
			var startTime = Date.now();
			while (i < maxPage + 1 && Date.now() - startTime < 1000) {
				if(i < index - Math.ceil(visPage / 2) + 1 && html.join("").indexOf("glyphicon") < 0) {
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
			if($.trim(target.html()) != "") {
				if(target.is("nav")) {
					target.html(html.join(""));
				}else {
					target.append("<nav>" + html.join("") + "</nav>");
					target = target.children("nav");
				}
			}else {
				target.html(html.join(""));
			}
			console.log("index:" + index);
			switch (index) {
				case '1':
					$("#prePage").addClass("disabled");
					break;
				case maxPage:
					$("#nextPage").addClass("disabled");
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
