function getRTime(user) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var rtime = this.responseText;
			console.log(rtime);
			var rtime = rtime * 1000;
			var timer = document.getElementById("timer");
			timer.style.display = "block";
			var countdown = setInterval(function() {
				rtime = rtime - 1000;

				var days = Math.floor(rtime / (1000 * 60 * 60 * 24));
				var hours = Math.floor((rtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((rtime % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((rtime % (1000 * 60)) / 1000);


				if (seconds < 10){
					seconds = "0" + seconds;
				}
				if (minutes < 10){
					minutes = "0" + minutes;
				}
				if (hours < 10){
					hours = "0" + hours;
				}
				if (rtime > 0){
					timer.innerHTML = hours + ":" + minutes + ":" + seconds;
				}

				if (hours == 0 && minutes == 0){
					timer.style.color = "red";
				}

				if (rtime < 0) {
					clearInterval(countdown);
					timer.style.color = "red";
					timer.innerHTML = "00:00:00";
					setTimeout(function(){window.location = "logout.php";},2000)
				}
			}, 1000);


    		}
	};
	xhttp.open("GET", "timing.php?user=" + user, true);
	xhttp.send();
}
