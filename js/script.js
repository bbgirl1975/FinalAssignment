//create an array called holidays then add properties
var holidays = [{
  name: 'Maui',
  price: 2220.00, //Amount in dollars
  discount: 0.25, //Percentage discount
  expiryCode: 'maui',
  description: 'Seven Days and Six Nights in 5 Star Accomodation',
  backgroundImage: 'images/1maui.jpg'
}, {
  name: 'Curacao',
  price: 20.00,
  discount: 0.25,
  expiryCode: 'curacao',
  description: 'A great holiday',
  backgroundImage: 'images/2curacao.jpg'
},
{
  name: 'Tahiti',
  price: 2220.00, //Amount in dollars
  discount: 0.25, //Percentage discount
  expiryCode: 'tahiti',
  description: 'Seven days and six nights in 5 star accomodation',
  backgroundImage: 'images/3tahiti.jpg'
},{
  name: 'Maldives',
  price: 2220.00, //Amount in dollars
  discount: 0.25, //Percentage discount
  expiryCode: 'maldives',
  description: 'Seven days and six nights in 5 star accomodation',
  backgroundImage: 'images/4maldives.jpg'
},];

var expiryDate = {
  maui: moment().add(7, 'days').endOf('day'),
  curacao: moment().add(2, 'days').endOf('day'),
  tahiti: moment().add(2, 'days').endOf('day'),
  maldives: moment().add(2, 'days').endOf('day')
};

$(document).ready(function() {
  buildSlides();
  buildCounters();
});
/*this function goes through each object in the holiday array and adds the html with one slide in active state*/
function buildSlides() {
  $(holidays).each(function(i, holiday) {
    var html = buildHtml(holiday, i);
    var slider = $('.carousel-inner');
    slider.append(html);
  });
}

function buildCounters() {
  $('.counter').each(function(i, counter) {
    var code = $(counter).html();
    var expiry = expiryDate[code];
    $(counter).html(timeUntilDate(expiry));
    window.setInterval(function(){
      $(counter).html(timeUntilDate(expiry));
    }, 1000);
  });
}

function timeUntilDate(date) {
  var now = moment();
  var dur = moment.utc(date.diff(now));
  var ms = dur._i;
  var s = ms / 1000;

  var days = Math.floor(s / 86400);
  s -= days * 86400;

  var hours = Math.floor(s / 3600) % 24;
  s -= hours * 3600;

  var minutes = Math.floor(s / 60) % 60;
  s -= minutes * 60;

  s = s % 60;
  s = s.toFixed(0);
  var secondString = ' seconds.';
  if(s == 1) {
    secondString = ' second.';
  }

  return days + " days, " + hours + " hours, " + minutes + " minutes, " + s + secondString;
}





/* One of the slides needs to be in the active state for the carousel to keep moving, this function called "buildHtml" was created to add the 'active' state in when the position of the slide equals zero (first position) */
function buildHtml(holiday, i) {
  var activeString = 'active'
  if(i != 0) {
    activeString = '';
  }
  return '<div class="carousel-item '+activeString+'" style="background-image: url('+holiday.backgroundImage+');">' +
              '<div class="container">' +
                '<div class="carousel-caption text-xs-left">' +
                  '<h1>'+holiday.name+'</h1>' +
                  '<p>'+holiday.description+'</p>' +
                  '<p><span class="counter">'+holiday.expiryCode+'</span></p>' +
                  '<p>' +
                    '<a class="btn btn-lg btn-primary" href="#" role="button">Book Now!</a>' +
                  '</p>' +
                '</div>' +
              '</div>' +
            '</div>';
}
