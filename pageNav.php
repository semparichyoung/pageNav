<?php

	function pageNav($n, $v = 5) {
		echo "<style>nav li .glyphicon {top: 0;}</style>";

		echo "<nav class='invisible' data-vis='$v'><ul class='pagination'>
			<li class='disabled' id='prePage'>
			<a href='#' aria-label='Previous'>
				<span aria-hidden='true'>&laquo;</span></a></li>";
			for ($i = 1; $i <= $n; $i++) {
				echo "<li id='pageNav$i'";
				if($i == 1) echo " class='active'";
				echo "><a href='#'>$i</a></li>";
			}
			echo "<li id='nextPage'>
			<a href='#' aria-label='Next'>
				<span aria-hidden='true'>&raquo;</span>
			</a></li>
		</ul></nav>";

		echo "<script src='js/pageNav.js'></script>";
	}

?>
