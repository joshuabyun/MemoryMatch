/**
 * Created by Gina on 7/11/2016.
 */
/**
 * Created by Gina on 7/7/2016.
 */
var app = angular.module('myApp',[]);
app.controller('cardController',function(){
    this.imgArr = [];
    this.cardObj = [];
    this.first_card_clicked = null;
    this.two_cards_clicked = false;
    this.randomSort = function(){ //to display different cards
        var oldArr =
            ['images/active_eva00_00.png','images/active_eva00_01.png','images/active_eva01_00.png',
             'images/active_eva01_01.png','images/active_eva02_00.png','images/active_eva02_01.png',
             'images/active_eva06_00.png','images/eva_series_00.png','images/active_eva02_02.png'];
        var newArr = oldArr.concat(oldArr);
        for(var i = newArr.length; i > 0; i--){
            var randomNum = Math.floor(Math.random()*i);
            this.imgArr.push(newArr[randomNum]);
            newArr.splice(randomNum,1);
        }
        console.log(this.imgArr.length);
        return this.imgArr;
    };

    this.randomSort();

    for(var i =0 ; i < this.imgArr.length; i++){
        var obj = {};
        obj.frontImg = this.imgArr[i];
        obj.backImg = 'images/nerv.png';
        obj.showFrontCard = false;
        obj.hideFrontCard = false;
        this.cardObj.push(obj);
    }
    console.log('cardObj : ',this.cardObj);
    //     $('.card').on('click',card_clicked);
    
    this.card_clicked = function(element){
        element.item['showFrontCard'] = true;
        console.log('clicked element', element.item['showCard'], this.cardObj  );
        if(this.two_cards_clicked){
            console.log('two cards already have been clicked');
            return;
         }
         if(this.first_card_clicked == null){
    //         $(this).find('.back').hide();
    //         first_card_clicked = $(this);
    //         first_card_clicked.off('click');
    //            console.log("first_card event handler off");
             //console.log(element);
               return;
         }
    //     else{
    //         second_card_clicked = $(this);
    //         $(this).find('.back').hide();
    //         two_cards_clicked = true;
    //         attempts +=1;
    //         //console.log("attempts: "+ attempts);
    //         if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')){
    //             first_card_clicked.addClass("matched");
    //             second_card_clicked.addClass('matched');
    //             //console.log("class 'matched' added to first and second card");
    //             match_counter += 1;
    //             //console.log('match_counter ' + match_counter);
    //             second_card_clicked.off('click');
    //             //console.log("second_card event handler off");
    //             matches += 1;
    //             //console.log('matches: ' + matches);
    //             first_card_clicked = null;
    //             second_card_clicked = null;
    //             two_cards_clicked = false;
    //             if(match_counter == total_possible_matched){
    //                 var you_won = $('<div>').addClass("you_won").html("YOU WON!!! WOOHOO!!!");
    //                 $('#game-area').append(you_won);
    //             }
    //             else{
    //                 return;
    //             }
    //         }
    //         else{
    //             $('.card').off('click');
    //             //console.log("all event handler off");
    //             setTimeout(var_reset,2000);
    //             return;
    //         }
    //     }
    }




});



// var second_card_clicked = null;
// var total_possible_matched = 9;
// var match_counter = 0;

// var matches = 0;
// var attempts = 0;
// var accurarcy = 0;
// var games_played;
//
// $(document).ready(function(){

//     $('.reset').on('click',display_stats);
//     games_played = 0;
// });

// function var_reset(){
//     $('#game-area > :not(".matched")').on('click',card_clicked);
//     //console.log('all event handler is on');
//     first_card_clicked.find('.back').show();
//     second_card_clicked.find('.back').show();
//     first_card_clicked = null;
//     second_card_clicked = null;
//     two_cards_clicked = false;
// }
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
// function reset_stats(){
//     accurarcy = 0;
//     matches = 0;
//     attempts = 0;
//     match_counter = 0;
//     first_card_clicked = null;
//     second_card_clicked = null;
//     two_cards_clicked = false;
// }
// function reset_cards(){
//     $('.you_won').remove();
//     $('.card').find('.back').show();
//     $('.card').removeClass('matched');
//     //console.log('all cards are flipped');
//     $('.card').off('click').on('click',card_clicked);
//     //console.log('all event handlers back on');
// }
