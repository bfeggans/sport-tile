var express  = require('express');
var request  = require('request');
var cheerio  = require('cheerio');
var mongoose = require('mongoose');
//require game model from the models folder;  will need to use fs query if multiple models are created
var Game     = require('./models/games.js');
var fs       = require('fs');
var app      = express();


app.get('/scrape', function(req, res) {
  mongoose.connect('mongodb://localhost:27017/currentScores');
  //truncate table of all current games
  Game.find().remove().exec();

  var today = new Date();
  var year = today.getFullYear();
  var month = (today.getMonth() + 1);
  var date = today.getDate();
  //url to scrape from
  url = 'http://content.usatoday.com/sportsdata/scores/' + year + '/' + month + '/' + date;

  request(url, function(error, response, html){
    //check to make sure there are no errors
      if(!error){
        //setup jquery with cheerio
        var $ = cheerio.load(html);
        var liveGames = $('.game').children('.live-sport');
        var games = [];

        $(liveGames).each(function(idx) {
          var sportRows = $(liveGames[idx]).children().children('div');
          //loop through each row of games
          $(sportRows).each(function(i){
            var teamRow = $(sportRows).eq(i).find('.match');
            //loop through the games on each row and write them to the json var
            $(teamRow).each(function(j){
              var sport,team1,team2,team1Score,team2Score,timeRem,
                teams   = $(teamRow).eq(j).find('.team'),
                scores  = $(teamRow).eq(j).find('.score');

                sport       = $(liveGames[idx]).prev().children('dt').children('a').eq(1).text();
                team1       = $(teams[0]).find('a').text();
                team2       = $(teams[1]).find('a').text();
                team1Score  = $(scores[0]).text();
                team2Score  = $(scores[1]).text();
                timeRem     = $(teams[0]).siblings('.status').text();

              if(sport){
              var currentGame = new Game({    sport: sport,
                                              team1 : team1,
                                              team2 : team2,
                                              team1Pts : team1Score,
                                              team2Pts : team2Score,
                                              timeRem : timeRem });

              currentGame.save(function (err, currentGame) {
                if (err) console.log(err);
              });
            }
            })
          })
        })
      }
    });
    res.send('Console, please!');
    mongoose.connection.close();
  });

app.get('/api', function(req, res) {
  mongoose.connect('mongodb://localhost:27017/currentScores');
  Game.find(function(err, games) {
    res.send(games);
    mongoose.connection.close();
    });
  });

app.listen('3000', function (err) {
    if (err) console.log(err);
    else console.log('G up on 3000');
  });


module.exports = app;
