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
				case 'fstPage':
					index = 1;
					break;
				case 'lstPage':
					index = maxPage;
					break;
				default:
					index = t.attr("id").substr(7);
			}
			var over = index < 1 ? "less" : index > maxPage ? "more" : "none"
			index = Middle(1, index, maxPage);
			if(typeof option.callback == "function") {
				option.callback(index, over);
			}
			setPage();
			setPageNav();
		});
		function setPage() {
			if(typeof option.content != "undefined" && typeof showNum != "undefined") {
				// console.log(showNum, option.content);
				option.content.addClass("invisible");
				// console.log("show:" + (showNum * (index - 1)) + " to " + (showNum * index));
				for(var i = showNum * (index - 1); i < showNum * index; i++) {
					option.content.eq(i).removeClass("invisible");
				}
			}
		}
		function setPageNav() {
			var html = [];
			html.push("<nav><ul class='pagination'>",
					"<li class='pageNav' id='fstPage'>",
					"<a>",
					"<span class='glyphicon glyphicon-step-backward'></span></a></li>",
					"<li class='pageNav' id='prePage'>",
					"<a aria-label='Previous'>",
					"<span aria-hidden='true'>&laquo;</span></a></li>"
					);

			var cn = 0;
			var icon = "<li class='disabled'><span class='glyphicon glyphicon-option-horizontal'></span></li>";
			var i = 1;
			var startTime = Date.now();
			var leftIcon = false;
			// console.log("index:" + index);
			while (i < maxPage + 1 && Date.now() - startTime < 1000) {
				// console.log("i:" + i , (i < index - Math.ceil(visPage / 2) + 1) , !leftIcon, visPage != maxPage);
				if(i < index - Math.ceil(visPage / 2) + 1 && !leftIcon && visPage != maxPage) {
					leftIcon = true;
					html.push(icon);
					i = Math.min(index - Math.ceil(visPage / 2) + 1, maxPage - visPage + 1);
				}else if(cn >= visPage && visPage + 1 < maxPage) {
					html.push(icon);
					break;
				}else {
					html.push(pn(i));
					cn++;
					i++;
				}
			}
			html.push("<li class='pageNav' id='nextPage'>",
					"<a aria-label='Next'>",
					"<span aria-hidden='true'>&raquo;</span>",
					"</a></li>",
					"<li class='pageNav' id='lstPage'>",
					"<a>",
					"<span class='glyphicon glyphicon-step-forward'></span>",
					"</a></li></ul></nav>");
			if($.trim(target.html()) != "") {
				if(target.is("nav")) {
					target.html(html.join(""));
				}else {
					target.append(html.join(""));
					target = target.children("nav");
				}
			}else {
				target.html(html.join(""));
				target = target.children("nav");
			}
			// console.log("index:" + index);
			target.find(".active").removeClass("active");
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
		function Middle(min, v, max) {
			return v < min ? min : v > max ? max : v;
		}
		function pn(i) {
			return "<li id='pageNav" + i + "' class='pageNav'><a>" + i + "</a></li>";
		}
	},
	FullHtml:function() {
		return this.clone().wrap("<p>").parent().html();
	},
});
