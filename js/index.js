
var $detailsContainer = $('#match-details-container');
var $detailsCurtain = $('#match-details-curtain');

$('#trigger').on('click', function(e) {
    e.preventDefault();
    showDetailedMatchStatistics();
});

$('#close-details').on('click', function(e) {
    e.preventDefault();
    closeDetailedMatchStatistics();
});

var fillDetailedMatchStatistics = function(homeCommingName, homeCommingLogo, homeCommingScore, awayName, awayLogo, awayScore, date, time) {
    $('.homecomming-team.logo').css('background-image', 'url("' + homeCommingLogo + '")');

    $('.homecomming-team.name').text(homeCommingName);

    $('.homecomming-team.score').text(homeCommingScore);

    $('.away-team.logo').css('background-image', 'url("' + awayLogo + '")');

    $('.away-team.name').text(awayName);

    $('.away-team.score').text(awayScore);

    $('#date-of-match').text(date);
    $('#time-of-match').text(time);
    
    var $awayTeamScoreEl = $('.away-team.score');
    var $homeCommingTeamScoreEl = $('.homecomming-team.score');
    var $awayTeamScore = +$awayTeamScoreEl.text();
    var $homeCommingTeamScore = +$homeCommingTeamScoreEl.text();
    
    if($awayTeamScore == $homeCommingTeamScore) {
        $($awayTeamScoreEl, $homeCommingTeamScoreEl).addClass('winner');
    } else if($awayTeamScore > $homeCommingTeamScore) {
        $awayTeamScoreEl.addClass('winner');
        $homeCommingTeamScoreEl.removeClass('winner');
    } else {
        $awayTeamScoreEl.removeClass('winner');
        $homeCommingTeamScoreEl.addClass('winner');
    }
};

var showDetailedMatchStatistics = function() {
    $detailsCurtain.css('display', 'flex').animate({'opacity': 1}, 300, function() {
        $detailsContainer.animate({'opacity': 1}, 700);
    });
}

var closeDetailedMatchStatistics = function() {
    $detailsContainer.animate({'opacity': 0}, 500, function() {
        $detailsCurtain.animate({'opacity': 0}, 300, function() {
            $(this).css('display', 'none');
        }); 
    });
}
var arg = ['Anderlecht', 'https://bit.ly/2gKJrFY', 0, 'AA Gent', 'https://www.kaagent.be/images/community/kaagent_foundation_transp.png', 0, 'Semi'];
fillDetailedMatchStatistics.apply(this, arg);

function away_score_update(a_score){
    arg[2]=a_score;
    fillDetailedMatchStatistics.apply(this, arg);
  
}

function home_score_update(h_score){
    arg[5]=h_score;
    fillDetailedMatchStatistics.apply(this, arg);
  
}

class Stopwatch {
  constructor(display, results) {
    this.running = false;
    this.display = display;
    this.results = results;
    this.laps = [];
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = [0, 0, 0];
  }

  start() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  }

  lap() {
    let times = this.times;
    let li = document.createElement('li');
    li.innerText = this.format(times);
    this.results.appendChild(li);  
  }

  stop() {
    this.running = false;
    this.time = null;
  }

  restart() {
    if (!this.time) this.time = performance.now();
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
    this.reset();
  }

  clear() {
    clearChildren(this.results);
  }

  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    var diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }

  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }}


function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
  result = '0' + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild)
  node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
document.querySelector('#time-of-match'),
document.querySelector('.results'));