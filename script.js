/**
 * Created by Gina on 7/11/2016.
 */
/**
 * Created by Gina on 7/7/2016.
 */

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matched = 9;
var match_counter = 0;
var two_cards_clicked = false;
var matches = 0; //when 2 cards match increment by 1
var attempts = 0; //whenever 2nd card is clicked increment by 1
var accurarcy = 0; //matches/attempts
var games_played;

$(document).ready(function(){
    $('.card').on('click',card_clicked);
    $('.reset').on('click',display_stats);
    games_played = 0; //when page is loaded, the variable gets defined. when the game is reset by clicking the reset button, increment by 1
});
function card_clicked(e){
    if(two_cards_clicked){
        return;
    }
    if(first_card_clicked == null){
        $(this).find('.back').hide();
        first_card_clicked = $(this);
        first_card_clicked.off('click');
        console.log("first_card event handler off");
        return;
    }
    else{
        second_card_clicked = $(this);
        $(this).find('.back').hide();
        two_cards_clicked = true;
        attempts +=1;
        console.log("attempts: "+ attempts);
        if(first_card_clicked.find('.front img').attr('src') == second_card_clicked.find('.front img').attr('src')){
            //add class matched
            first_card_clicked.addClass("matched");
            console.log("class 'matched' added to first card");
            second_card_clicked.addClass('matched');
            console.log("class 'matched' added to second card");
            match_counter += 1;
            console.log(match_counter);
            second_card_clicked.off('click');
            console.log("second_card event handler off");
            matches +=1;
            console.log('matches: '+matches);
            first_card_clicked = null;
            second_card_clicked = null;
            two_cards_clicked = false;
            if(match_counter == total_possible_matched){
                //$('#game-area').addClass("you_won").html('YOU WON WOOHOO!!');
                var you_won = $('<div>').addClass("you_won").html("YOU WON!!! WOOHOO!!!");
                $('#game-area').append(you_won);
            }
            else{
                return;
            }
        }
        else{
            $('.card').off('click');
            console.log("all event handler off");
            setTimeout(var_reset,2000);
            return;
        }
    }
}
function var_reset(){
    $('#game-area > :not(".matched")').on('click',card_clicked);
    console.log('all event handler is on');
    first_card_clicked.find('.back').show();
    second_card_clicked.find('.back').show();
    first_card_clicked = null;
    second_card_clicked = null;
    two_cards_clicked = false;
}
function display_stats(e){
    games_played+= 1;
    $('.games-played > .value').html(games_played);
    $('.attempts > .value').html(attempts);
    var decimal_accuracy = matches/attempts*100;
    accurarcy = decimal_accuracy.toFixed(2) + "%";
        if(matches == 0 && attempts ==0){
        accurarcy = 0;
        }
    $('.accuracy > .value').html(accurarcy);
    console.log('reset button pressed');
    reset_stats();
    reset_cards();
}
function reset_stats(){
    accurarcy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
}
function reset_cards(){
    $('.you_won').remove();
    $('.card').find('.back').show();
    console.log('all cards are flipped');
    $('.card').off('click').on('click',card_clicked);
    console.log('all event handlers back on');
}
