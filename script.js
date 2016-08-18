var app = angular.module('myApp',[]);
app.controller('cardController',function($timeout){
    this.cardObjArr = [];
    this.clickedElements =[];
    this.matchCount = 0;
    this.gamesPlayed = 0;
    this.attempts = 0;
    this.randomSort = function(){
        this.cardObjArr = [];
        var oldArr =
            ['images/active_eva00_00.png','images/active_eva00_01.png','images/active_eva01_00.png',
             'images/active_eva01_01.png','images/active_eva02_00.png','images/active_eva02_01.png',
             'images/active_eva06_00.png','images/eva_series_00.png','images/active_eva02_02.png'];
        oldArr = oldArr.concat(oldArr);
        for(var i = oldArr.length; i > 0; i--){
            var obj = {};
            var randomNum = Math.floor(Math.random()*i);
            obj.frontImg = oldArr[randomNum];
            obj.backImg = 'images/nerv.png';
            obj.showFrontCard = false;
            obj.hideFrontCard = false;
            obj.matched = false;
            this.cardObjArr.push(obj);
            oldArr.splice(randomNum,1);
        };
        console.log('cardObjArr',this.cardObjArr);
    };
    this.randomSort();
    this.card_clicked = function(element){
        var clickedElementCount = this.clickedElements.length;
        if(element.matched){
            console.log('matched element');
            return;
        }
        if(clickedElementCount > 1){
            console.log('no more than 2 items can be clicked');
            return;
        }
        else{
            element.showFrontCard = true;
            this.clickedElements.push(element);
            console.log('clicked elements', this.clickedElements);
            if(this.clickedElements.length == 2){
                if(this.clickedElements[0] == this.clickedElements[1]){
                    this.clickedElements.splice(1,1);
                    console.log('cannot click same element',this.clickedElements);
                    return;
                }
                else{
                    this.attempts++;
                    console.log("attempts",this.attempts);
                    if(this.clickedElements[0].frontImg == this.clickedElements[1].frontImg ){
                        console.log('cards matched');
                        this.clickedElements[0].matched = true;
                        this.clickedElements[1].matched = true;
                        this.clickedElements = [];
                        this.matchCount++;
                        console.log('matchCount : ',this.matchCount);
                        if(this.matchCount == this.cardObjArr.length/2){
                            this.winningCondition();
                        }
                    }
                    else{
                        var self = this;
                        $timeout(function(){
                            self.clickedElements[0].showFrontCard = false;
                            self.clickedElements[1].showFrontCard = false;
                            self.clickedElements = [];

                        },1000);
                    }
                }
            }
        }
    }
    this.winningCondition = function(){
        this.randomSort();
        this.gamesPlayed++;
        this.attempts = 0;
        this.matchCount = 0;
    }

    this.calculateAccuracy = function(){
        if(this.attempts == 0){
            return '0.00%';
        }
        var decimalPercent =  (this.matchCount / this.attempts)*100;
        return decimalPercent.toFixed(2)+'%';


    };
});




// function display_stats(e){
//     games_played+= 1;
//     $('.games-played > .value').html(games_played);
//     $('.attempts > .value').html(attempts);
//     var decimal_accuracy = matches/attempts*100;
//     accurarcy = decimal_accuracy.toFixed(2) + "%";
//         if(matches == 0 && attempts == 0){
//         accurarcy = 0;
//         }
//     $('.accuracy > .value').html(accurarcy);
//     //console.log('reset button pressed');
//     reset_stats();
//     reset_cards();
// }


