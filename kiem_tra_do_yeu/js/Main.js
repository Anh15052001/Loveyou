var progress = 1;

function rand (min, max) {
  // http://www.facebook.com/chautamchautam
  // +   original by: Rip by Châu Minh Tâm
  // +   number by: 0908765420
  // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
  // *     example 1: rand(1, 1);
  // *     returns 1: 1
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(values) {
	numValues = values.filter(function(value) { return value !== undefined }).length;
	if(numValues > 1) {
		random = rand(1, numValues);
	} else {
		random = 1;
	}
	arrayValue = random - 1;
	picked = values[arrayValue];
	
	if(picked > 0) {
		return picked;
	} else {
		return false;
	}
}

function getResult(name1, name2) {
	name1 = name1.toUpperCase();
	name2 = name2.toUpperCase();

	name1Length = name1.length;
	name2Length = name2.length;

	var loveIndex = 0;

	console.log(name1 +' vs. '+name2);

	for (Count=0; Count < name1Length; Count++) {
		name1Char=name1.substring(Count,Count+1);

		if (name1Char == 'E') loveIndex += 3; 
		if (name1Char == 'A') loveIndex += 3; 
		if (name1Char == 'O') loveIndex += 2;
		if (name1Char == 'U') loveIndex += 2; 
		if (name1Char == 'I') loveIndex += 2; 
		if (name1Char == 'R') loveIndex += 1;
		if (name1Char == 'L') loveIndex += 1;
		if (name1Char == 'S') loveIndex += 1;
	}

	for (Count=0; Count < name2Length; Count++) {
		name2Char=name2.substring(Count,Count+1);
		
		if (name2Char == 'E') loveIndex += 3; 
		if (name2Char == 'A') loveIndex += 3; 
		if (name2Char == 'O') loveIndex += 2;
		if (name2Char == 'U') loveIndex += 2; 
		if (name2Char == 'I') loveIndex += 2; 
		if (name2Char == 'R') loveIndex += 1;
		if (name2Char == 'L') loveIndex += 1;
		if (name2Char ==' S') loveIndex += 1;
	}

	if(name1Length <= 4) loveIndex += 4;
	if(name2Length <= 4) loveIndex += 4;

	result = 0;

	if (loveIndex >  0) result =   5-((name1Length+name2Length)/2)
	if (loveIndex >  2) result =  10-((name1Length+name2Length)/2)
	if (loveIndex >  4) result =  20-((name1Length+name2Length)/2)
	if (loveIndex >  6) result =  30-((name1Length+name2Length)/2)
	if (loveIndex >  8) result =  40-((name1Length+name2Length)/2)
	if (loveIndex > 10) result =  50-((name1Length+name2Length)/2)
	if (loveIndex > 12) result =  60-((name1Length+name2Length)/2)
	if (loveIndex > 14) result =  70-((name1Length+name2Length)/2)
	if (loveIndex > 16) result =  80-((name1Length+name2Length)/2)
	if (loveIndex > 18) result =  90-((name1Length+name2Length)/2)
	if (loveIndex > 20) result = 100-((name1Length+name2Length)/2)
	if (loveIndex > 22) result = 110-((name1Length+name2Length)/2)
	if (name1Length == 0 || name2Length == 0) {
		result = 'error';
	} else {
		if((name1 == 'KIBA' || name2 == 'KIBA') && (name1 == 'KUMBA' || name2 == 'KUMBA')) result = 100;
		if((name1 == 'ROMEO' || name2 == 'ROMEO') && (name1 == 'JULIA' || name2 == 'JULIA')) result = 100;

		if (result <   0) result =   0;
		if (result > 100) result = 100;
	}

	return result;
}

function start() {
	$('#enterNames').removeClass('hide');
	$('#start').addClass('hide');
}

function loveTest(name1, name2) {
	if(!name1) name1 = $('input[name="name1"]').val();
	if(!name2) name2 = $('input[name="name2"]').val();

	result = getResult(name1, name2);

	if(result != 'error') {
		clearHeart();
		fillHeart(result);

		$('#enterNames').addClass('hide');
		$('#game').removeClass('hide');
		$('.names').html(name1+' &amp; '+name2);
		$('input[name="reset"]').removeClass('hide');
		$('.startText').fadeOut();
		
		if(typeof kg_ga == 'function') {
			kg_ga('send', 'event', 'Love-Tester', 'Search', name1+'+'+name2);
		}

		window.location.hash = '#'+name1+'+'+name2;
	} else {
		$('#enterNames p').addClass('error');
		$('#enterNames p').html('Điền Tên Họ của 2 bạn nhé!.Bạn sẽ thấy điều kỳ diệu!');
		$('#game').addClass('hide');
		$('#enterNames').removeClass('hide');
	}
}

function fillHeart(value) {
	progressClass = 'bad';
	if(progress >= 30) progressClass = 'okay';
	if(progress >= 80) progressClass = 'good';

	$('.progress .fill').removeClass('bad okay good');
	$('.progress .fill').addClass(progressClass);
	$('body').removeClass('bad okay good');
	$('body').addClass(progressClass);

	$('.progress .fill').height(progress+'%');
	$('.progress .percent').html(progress+'%');

	if(progress < value) {
		setTimeout(function() {
			fillHeart(value);
		} , 50);
	} else {
		$('.result').html(resultText(value));
		if(value == 100) $('.progress .fill').css('border', '0');
		if(value >= 71) {
			$('#game .happyGuy').removeClass('hide');
			$('.hearts').fadeIn();
		} else if(value >= 41) {
			$('#game .okayGuy').removeClass('hide');
		} else {
			$('#game .sadGuy').removeClass('hide');
		}
		$('.result').fadeIn();
	}

	progress = progress + 1;
}

function clearHeart() {
	$('#game .progress .fill').height('0%');
	$('#game .progress .percent').html('');
	$('#game .progress .names').html('');
	$('#game .result').fadeOut();
	$('#game .hearts').fadeOut();
	$('#game .happyGuy').addClass('hide');
	$('#game .okayGuy').addClass('hide');
	$('#game .sadGuy').addClass('hide');
	$('#start').addClass('hide');
	$('#game').addClass('hide');
	$('#enterNames').removeClass('hide');
	$('#enterNames p').removeClass('error');
	$('#game .progress .fill').removeClass('bad okay good');
	$('body').removeClass('bad okay good');
	window.location.hash = '';

	progress = 0;
}

function resultText(value) {
	if(value <= 100) {
		text = new Array(
			'Chúc mừng bạn .Bạn và cô ấy rất yêu nhau chân thành!',
			'Tình yêu của bạn rất là lãng mạn và chân thành.Hãy đem đến HP cho người ấy nhé!',
			'Đừng bao giờ rời xa người ấy nhé .Bạn không trốn người ấy được đâu!',
			'Đừng bao giờ rời xa người ấy nhé .Bạn không trốn người ấy được đâu!',
			'Bạn hãy tận hưởng hạnh phúc của mình đế răng rung đầu bạc nhé !',
			'Bạn sẽ nói rằng: Tôi rất yêu em!'
		);
	}

	if(value <= 90) {
		text = new Array(
			'Có một chút nhớ nhau trong dòng đời rất vội/ Và những ngày dài lắm để quên nhau!…',
			'Trông xa cứ tưởng là “già”.Tới gần mới thấy chỉ là “chú” thôi.Cầm tay đích thực “anh” rồi.Ngả lưng hai đứa là đôi chúng mình!',
			'Bạn đã tìm thấy công chúa của mình rồi đó!',
			'Hãy tiến lên can đảm nói rằng Anh Yêu Em!',
			'Ôi công chúa của bạn đã đến rồi!',
			'Nàng rất yêu và chiều chuộng bạn.Bạn hãy giữ gìn nhé!!'
		);
	}

	if(value <= 70) {
		text = new Array(
			'Hãy tặng cho nàng 1 cây bông hồng .Nàng sẽ tặng bạn 1 điều ước!!',
			'Bạn và cô ấy có thể là tình bạn cũng có thể là người yêu',
			'Hãy nói cho cô ấy biết rằng cô ấy rất là đẹp ...',
			'Đừng bao giờ từ bỏ hay nản lòng vì yêu người đó nhé.Cố tý xíu sẽ thành công !',
			'Cho cô ấy biết bạn giỏi như thế nào nhé?',
			'Đừng bao giờ giấu giếm điều gì với người ấy nhé.Hãy thật lòng bởi người ấy đang thử bạn đó!'
		);
	}

	if(value <= 40) {
		text = new Array(
			'Rất tiếc!Kết quả của bạn không được như ý đừng nghĩ đến!.',
			'Điều này có lẽ không có gì.Sẽ chẳng được bền lâu!',
			'Tình yêu của bạn cũng giống như giọt nước - sẽ khô cạn khi hết tình nghĩa!',
			'Bạn đừng trả lời người ấy vì người ấy chẳng để ý đến bạn đâu!',
			'Oh chia buồn cùng bạn nhé.Bạn bị người ấy chơi xỏ rồi…',
			'Bạn nên kiên nhẫn khi người ấy không quan tâm bạn nhé!.'
		);
	}

	arrayValue = new Array('1', '2', '3', '4', '5', '6');
	randomArrayValue = getRandom(arrayValue) - 1;

	return text[randomArrayValue];
}

/*
function checkPortrait() {
	isApple = navigator.userAgent.match(/(iPhone|iPod|iPad)/);

	if(isApple) {
		setTimeout(function() {
			windowWidth = $(window).width();
			windowHeight = $(window).height();

			isPortrait = false;
			if(windowHeight > windowWidth) {
				isPortrait = true;
			}

			if(isPortrait && !$('.rotateHint').hasClass('hide')) {
				$('.rotateHint').addClass('hide');
				$('.rotateBg').addClass('hide');
			}
			if(!isPortrait && $('.rotateHint').hasClass('hide')) {
				$('.rotateHint').removeClass('hide');
				$('.rotateBg').removeClass('hide');
			}
			
			checkPortrait();
		} , 500);
	}
}
*/

function test() {
	console.log(getResult('Dominic', 'Verena'));
	console.log(getResult('Elias', 'Julia'));
	console.log(getResult('Alexander', 'Laura'));
	console.log(getResult('Daniel', 'Anna'));
	console.log(getResult('Michael', 'Sarah'));
	console.log(getResult('Luca', 'Emma'));
	console.log(getResult('Julian', 'Lea'));
	console.log(getResult('David', 'Lina'));
	console.log(getResult('Jonas', 'Lena'));
	console.log(getResult('Thomas', 'Lisa'));
	console.log(getResult('Noah', 'Selina'));
	console.log(getResult('Linus', 'Elena'));
	console.log(getResult('Andreas', 'Sophie'));
	console.log(getResult('Christian', 'Emilia'));
	console.log(getResult('Simon', 'Vanessa'));
	console.log(getResult('Lukas', 'Hannah'));
	console.log(getResult('Jan', 'Nina'));
	console.log(getResult('Markus', 'Alina'));
	console.log(getResult('Florian', 'Jana'));
	console.log(getResult('Liam', 'Mia'));
	console.log(getResult('Paul', 'Sandra'));
	console.log(getResult('Emil', 'Leonie'));
	console.log(getResult('Tobias', 'Johanna'));
	console.log(getResult('Samuel', 'Lara'));
	console.log(getResult('Tim', 'Luisa'));
	console.log(getResult('Felix', 'Marie'));
	console.log(getResult('Stefan', 'Melanie'));
	console.log(getResult('Levi', 'Jessica'));
	console.log(getResult('Benjamin', 'Sophia'));
	console.log(getResult('Marcel', 'Melina'));
	console.log(getResult('Sebastian', 'Nele'));
	console.log(getResult('Peter', 'Claudia'));
	console.log(getResult('Fabian', 'Elisabeth'));
	console.log(getResult('Martin', 'Sabrina'));
	console.log(getResult('Patrick', 'Katharina'));
	console.log(getResult('Philipp', 'Franziska'));
	console.log(getResult('Anton', 'Nicole'));
	console.log(getResult('Dominik', 'Michelle'));
	console.log(getResult('Maximilian', 'Emily'));
	console.log(getResult('Max', 'Mila'));
	console.log(getResult('Levin', 'Jennifer'));
	console.log(getResult('Adrian', 'Isabella'));
	console.log(getResult('Finn', 'Pia'));
	console.log(getResult('Matthias', 'Marlene'));
	console.log(getResult('Johannes', 'Annika'));
	console.log(getResult('Moritz', 'Theresa'));
	console.log(getResult('Robin', 'Nadine'));
	console.log(getResult('Andrea', 'Sina'));
	console.log(getResult('Manuel', 'Jasmin'));
	console.log(getResult('Damian', 'Zoe'));
	console.log(getResult('Marco', 'Monika'));
}
