function CardGame(targetId)
{
  // private variables
  var letters = []
  var bankLetters = []
  var card_value_a = ["1_img","2_img","3_img","4_img","5_img","6_img","7_img","8_img"];
  var card_value_b = ["1_txt","2_txt","3_txt","4_txt","5_txt","6_txt","7_txt","8_txt"];

  var started = false;
  var bankStarted = false;
  var matches_found = 0;
  var card1 = false, card2 = false;
  var card1val=' ', card2val=' ';
  var prev_card_type = ' ';
  
  var timer_count = 60;
  var timer_interval;
  
  var headline = "הצעדים הראשונים על הירח";
  var alphabeth = "אבגדהוזחטיכלמנסעפצקרשת";
  var chars_to_del = [];

  function hideCard(id) // turn card face down
  {
    with(letters[id].style) {
      //WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.0) rotateY(180deg)";
	  //background = "url(images/memory_bg_red.png) no-repeat";
	  	WebkitTransformStyle = MozTransformStyle = OTransformStyle = msTransformStyle = "preserve-3d";
		WebkitTransform = MozTransform = OTransform = msTransform = "rotate(180deg)";
		WebkitTransition = MozTransition = OTransition = msTransition = "all 0.25s";
		if (letters[id].id[4] == 'a') //red card
		{
			background = "url(images/memory_bg_red.png) no-repeat";
		}
		else //blue card
		{
			background = "url(images/memory_bg_blue.png) no-repeat";
		}
    }
  }
  
    function hideBankCard(id) // turn card face down
  {
	bankLetters[id].innerHTML = " "
    with(bankLetters[id].style) {
      //WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.0) rotateY(180deg)";
	  //background = "url(images/memory_bg_red.png) no-repeat";
	  	WebkitTransformStyle = MozTransformStyle = OTransformStyle = msTransformStyle = "preserve-3d";
		//WebkitTransform = MozTransform = OTransform = msTransform = "rotate(180deg)";
		WebkitTransition = MozTransition = OTransition = msTransition = "all 0.25s";
		//	background = "url(images/memory_bg_red.png) no-repeat";
		
    }
  }

  function moveToPack(id) // move card to pack
  {
    hideCard(id);
    letters[id].matched = true;
    with(letters[id].style) {
      zIndex = "1000";
      top = "100px";
      left = "-340px";//-240
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(0deg)";
      zIndex = "0";
    }
  }

  function moveToPlace(id) // deal card
  {
    //letters[id].firstChild.id = false;
    with(letters[id].style) {
      zIndex = "1000";
      top = letters[id].fromtop + "px";
      left = letters[id].fromleft + "px";
      //WebkitTransform = MozTransform = OTransform = msTransform = "rotate(180deg)";
      zIndex = "0";
    }
  }

  function moveBankToPlace(id) // deal card
  {
    with(bankLetters[id].style) {
      zIndex = "1000";
      top = bankLetters[id].fromtop + "px";
      left = bankLetters[id].fromleft + "px";
      //WebkitTransform = MozTransform = OTransform = msTransform = "rotate(180deg)";
      zIndex = "0";
    }
  }
  function showCard(id) // turn card face up, check for match
  {
	letters[id].innerHTML = letters[id].id;
    with(letters[id].style) {
		WebkitTransformStyle = MozTransformStyle = OTransformStyle = msTransformStyle = "preserve-3d";
		//WebkitTransform = MozTransform = OTransform = msTransform = "rotateX(180deg)";
		WebkitTransition = MozTransition = OTransition = msTransition = "all 0.25s";
		//	background = "url(images/memory_" +  card_value_a[index] + ".png) no-repeat";
    }
  }

  function cardClick(id)
  {
    if(started) {
      //showCard(id);
    } else {
      for(i=0; i < alphabeth.length; i++) {
        (function(idx) {
          setTimeout(function() { moveToPlace(idx); }, idx * 1 /*Math.random()*/);
        })(i);
      }
      started = true;
    }
  }

  function letterInHeadline(letter_to_check)
  {
	chars_to_del = [];
 //ch
	if (letter_to_check == 'כ')
	{
		if (headline.indexOf('ך') > -1)
		{
			chars_to_del.push('ך');
			chars_to_del.push('כ');
			return true;
		}
	}
//m
	if (letter_to_check == 'מ')
	{
		if (headline.indexOf('ם') > -1)
		{
			chars_to_del.push('ם');
			chars_to_del.push('מ');
			return true;
		}
	}
	//n
		if (letter_to_check == 'נ')
	{
		if (headline.indexOf('ן') > -1)
		{
			chars_to_del.push('ן');
			chars_to_del.push('נ');
			return true;
		}
	}
	//p
		if (letter_to_check == 'פ')
	{
		if (headline.indexOf('ף') > -1)
		{
			chars_to_del.push('ף');
			chars_to_del.push('פ');
			return true;
		}
	}
	//tz
		if (letter_to_check == 'צ')
	{
		if (headline.indexOf('ץ') > -1)
		{
			chars_to_del.push('ץ');
			chars_to_del.push('צ');
			return true;
		}
	}
	//no sofit char
	if (headline.indexOf(letter_to_check) > -1)
	{
		chars_to_del.push(letter_to_check);
		return true;
	}
	else
	{
		return false;
	}
  }
  
  function bankClick(id)
  {
    if(bankStarted) {
      if (letterInHeadline(alphabeth[id]))
	  {
		//window.alert(id + " , " + alphabeth[id] + " , " );
		for (var i = 0 ; i < letters.length ; i++)
		{
			for (var j = 0 ; j < chars_to_del.length ; j++)
			{
				//window.alert(letters[i].id[0] + "," + chars_to_del[j]);
				if (letters[i].id[0] == chars_to_del[j])
				{
					//turn card on
					showCard(i);
					
					//turn bank off
					hideBankCard(id);
				}
			}
		}
	  }
    }  else {
      // shuffle and deal letters
      //card_value_a.sort(function() { return Math.round(Math.random()) - 0.5; });
	  //card_value_b.sort(function() { return Math.round(Math.random()) - 0.5; });
      for(i=0; i < alphabeth.length; i++) {
        (function(idx) {
          setTimeout(function() { moveBankToPlace(idx); }, idx * 1 /*Math.random()*/);
        })(i);
      }
      bankStarted = true;
    }
  }
  
  function startTimer()
  {
	timer_interval=setInterval(function(){myTimer()},1000);
		function myTimer() {
		if (timer_count > 0)
		{
			timer.innerHTML = timer_count;
			/*
			if (timer_count < 58)
			{
				if (timer_count % 2 == 0)
				{
					timer.style.background = "url(images/counter_zugi.png) no-repeat";
				}
				else
				{
					timer.style.background = "url(images/counter_Ezugi.png) no-repeat";
				}
			}
			else
			{
				timer.style.background = "url(images/counter_" + timer_count +".png) no-repeat";
			}
			*/
			timer_count--;
		}
		else //time is up
		{
			window.clearInterval(timer_interval);
			showEndPopup();
		}
	}
  }
  
  function stopTimer()
  {
	// stop timer
	window.clearTimeout(timer_interval);
  }
  
  function showPopup(image){
	stopTimer();
    var div = document.createElement('div');
    div.className += 'popup';
    div.innerHTML = "<img src=\"images/" + image + ".png\">";
	div.onclick = function () {
		//resume timer
		document.body.removeChild(div);
		startTimer();
	}
    document.body.appendChild(div); // append to main body
  }

  function showEndPopup(image){
	stopTimer();
    var div = document.createElement('div');
    div.className += 'popup';
    div.innerHTML = "<img src=\"images/final_" + matches_found + ".png\">";
	div.onclick = function () {
		//resume timer
		location = "splash.html";
	}
    document.body.appendChild(div); // append to main body
  }  
  
  function showMatchAndEndPopup(image){
  stopTimer();
    var div = document.createElement('div');
    div.className += 'popup';
    div.innerHTML = "<img src=\"images/" + image + ".png\">";
	div.onclick = function () {
		//resume timer
		document.body.removeChild(div);
		showEndPopup();
	}
    document.body.appendChild(div); // append to main body
  }

  // initialise

  var stage = document.getElementById(targetId);
  var felt = document.createElement("div");
  felt.id = "felt";
  stage.appendChild(felt);
  //var results_counter = document.createElement("results_counter");
  //results_counter.id = "results_counter";
  //felt.appendChild(results_counter);
  var timer = document.createElement("timer");
  timer.id = "timer";
  //timer.innerHTML = timer_count;
  felt.appendChild(timer);

  // template for card
  var letter = document.createElement("letter");
  var bankLetter = document.createElement("bank_letter");
  
  //var card_b = document.createElement("div_b");
  //card_a.innerHTML = "<img src=\"images/memory_bg_red.png\">";
  //card_b.innerHTML = "<img src=\"images/memory_bg_blue.png\">";
  letter.innerHTML = " ";
  //card_b.innerHTML = " ";
  //var dilled_a = 0;
  //var dilled_b = 0;
  bankLetter.innerHTML = " ";

  //find line break
	var breakline = headline.substring(0, 17).lastIndexOf(" ") + 1;
	if (breakline < 0)
	{
		breakline = headline.length - 1;
	}
	//create headline letters
  	for(var i=0; i < headline.length; i++) 
	  {
	    if (headline[i] != ' ')
		{
			var newLetter = letter.cloneNode(true);
			newLetter.id = headline[i] ;
			//newLetter.innerHTML = headline[i]; //"letter_" + dilled_a + "_" + i + newCard.innerHTML;					
			newLetter.fromtop = 560 + 150 * Math.floor(i/breakline);
			newLetter.fromleft = 1920 - 192 - 192 - (96 * (i%breakline));
			(function(idx) {
				newLetter.addEventListener("click", function() { cardClick(idx); }, false);
			})(i);
			felt.appendChild(newLetter);
			letters.push(newLetter);
		}
	  }

	  //click letters
	  //for(var i = 0; i < headline.length; i++) {
		cardClick(0);
	  //}
	  
	  //create alphabeth
  	for(var i=0; i < alphabeth.length; i++) 
	  {
		var newBankLetter = bankLetter.cloneNode(true);
		newBankLetter.id = "bankLetter_" + alphabeth[i];
		newBankLetter.innerHTML = alphabeth[i];
		newBankLetter.fromtop = 960;
		newBankLetter.fromleft = 1920 - 160 - (77 * i);
		(function(idx) {
			newBankLetter.addEventListener("click", function() { bankClick(idx); }, false);
		})(i);
		felt.appendChild(newBankLetter);
		bankLetters.push(newBankLetter);
	  }

	  //click letters
	  //for(var i = 0; i < headline.length; i++) {
	  bankClick(0);
	  	  
	  //start timer
	  startTimer();

}

/*
margin 10% from each side
letters in a line 16
letter width 90 px
space = 130 px
1920*80% = 1536

bank
length 65, space 5
*/