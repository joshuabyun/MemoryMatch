$(document).ready(function(){
    initInitialPageDom();
    applyBackgroundTimer();
    $('audio').trigger("pause");
    applyClicktoPauseMusic();
    applyClicktoPlayMusic();
});
var game1;
var game2;
var backgroundPics;
var cardRuleSet


//--------------------------background & music------------------------------
var backgroundPics =
    ['images/evangelion-backgrounds-00.png',
    'images/evangelion-backgrounds-01.jpg',
    'images/evangelion-backgrounds-02.jpg',
    'images/evangelion-backgrounds-03.jpg',
    'images/evangelion-backgrounds-04.jpg',
    'images/evangelion-backgrounds-05.jpg'];
function randomNumGen(){
    return Math.floor(Math.random()*backgroundPics.length);
}
function applyBackground(randomNum){
    $('body').css({
        "background-image": "url("+ backgroundPics[randomNum] +")"
    });
}
function applyBackgroundTimer(){
    setInterval(function(){
        applyBackground(randomNumGen());
    }, 10000);
}
function applyClicktoPlayMusic(){
    $('#playMusic').click(function(){
        $('audio').trigger("play");
        $("#playMusic").css({
            "visibility": "hidden"
        });
        $("#pauseMusic").css({
            "visibility": "visible"
        });
    })
}
function applyClicktoPauseMusic(){
    $('#pauseMusic').click(function(){
        $('audio').trigger("pause");
        $("#pauseMusic").css({
            "visibility": "hidden"
        });
        $("#playMusic").css({
            "visibility": "visible"
        });
    })
}

//------------------------should be the first line-----------------------------

var cardRuleSet = {
    eva01 : {
        name: 'eva01',
        cardCount: 2,
        image: 'images/active_eva00_00.png',
        hideTime: 3000,
        back: 'images/nerv.png'
    },
    eva02 : {
        name: 'eva02',
        cardCount: 2,
        image: 'images/active_eva00_01.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva03 : {
        name: 'eva03',
        cardCount: 2,
        image: 'images/active_eva01_00.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva04 : {
        name: 'eva04',
        cardCount: 2,
        image: 'images/active_eva01_01.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva05 : {
        name: 'eva05',
        cardCount: 2,
        image: 'images/active_eva02_00.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva06 : {
        name: 'eva06',
        cardCount: 2,
        image: 'images/active_eva02_01.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva07 : {
        name: 'eva07',
        cardCount: 2,
        image: 'images/active_eva02_02.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva08 : {
        name: 'eva08',
        cardCount: 2,
        image: 'images/active_eva06_00.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    },
    eva09 : {
        name: 'eva09',
        cardCount: 2,
        image: 'images/eva_series_00.png',
        hideTime: 1000,
        back: 'images/nerv.png'
    }
};
function disable2pName() {
    document.getElementById("player2Name").disabled = true;
    $('#player2Name').attr({"placeholder" : "FOR MULTIPLAY MODE"});
    // $('#player2Name').disabled = true;
}
function enable2pName() {
    document.getElementById("player2Name").disabled = false;
    $('#player2Name').attr({"placeholder" : "PLAYER 2 NAME"});
    // $('#player2Name').disabled = false;
}
//initial page related
function initInitialPageDom(){
    //Upper Text
    var playerMode = $("<div>").attr({"id" : "optionTitle"}).text("PLAY MODE");
    //Play mode selection
    var player1 = $('<input>').attr({
        "class" : "playSelector",
        "type" : "radio",
        "name" : "playerMode",
        "value" : "1p",
        "checked" : "checked",
        "id" : "1p"
    });
    var player1Label = $("<label>").attr({
        "for" : "1p"
        // "class" : "playSelector"
    }).text("SINGLE").click(function(){
        disable2pName();
    });
    var player2 = $('<input>').attr({
        "class" : "playSelector",
        "type" : "radio",
        "name" : "playerMode",
        "value" : "2p",
        "id" : "2p",
    });
    var player2Label = $("<label>").attr({
        "for" : "2p"
        // "class" : "playSelector"
    }).text("MULTI").click(function(){
        enable2pName();
    });
    var choosePlayers = $('<form>').attr({"id":"player"}).append(player1,player1Label,player2,player2Label);
    //Player Names
    var player1Name = $('<input>').attr({
        "class" : "playerName",
        "id" : "player1Name",
        "type" : "text",
        "placeholder" : "PLAYER 1 NAME"
    });
    var player2Name = $('<input disabled>').attr({
        "class" : "playerName",
        "id" : "player2Name",
        "type" : "text",
        "placeholder" : "FOR MULTIPLAY MODE"
    });
    var playerNameForm = $('<form>').attr({"id" : "playerNameForm"}).append(player1Name, player2Name);
    //Start Button
    var start = $("<div>").attr({"id" : "start"}).text("START").click(
        function(){
        var gamePlayMode = $("input:radio:checked").val()
        var name1 = $("#player1Name").val();
        var name2 = $("#player2Name").val();
        console.log("name1 : ",name1);
        console.log("name2 : ",name2);
        if(gamePlayMode == "2p"){
            if(name1 == "" || name2 == ""){
                alert("please input your name");
                return;
            }
            else{
                init2pGame(gamePlayMode,name1,name2);
            }
        }else{
            if(name1 == ""){
                alert("please input your name");
                return;
            }
            else{
                $("#player2Stat").animate({
                    opacity:0
                },500,"linear");
                init1pGame(gamePlayMode,name1);
            }
        }
        $("#player1Name").val("");
        $("#player2Name").val("");
    });
    //append and fade in
    var optionContainer = $("<div>").attr({"id" : "optionContainer"}).append(playerMode,choosePlayers, playerNameForm,start);
    var gameOptionPage = $('<section>').css({
       "opacity" : 0
    }).attr({'id' : 'gameOption'}).animate({
        opacity : 1
    },1000,"swing").append(optionContainer);
    $('body').append(gameOptionPage);
}
function resetStat(){
    $('.gamesPlayed > .value, .attempts > .value').text("0");
    $('.accuracy > .value').text("0.00%");
    $('#player1StatsHeader').text("Player1");
    $('#player2StatsHeader').text("Player2");
}
function removeGameOptionDom(){
    $("#gameOption").remove();
}
function init2pGame(playerMode,player1name,player2name){
    $('#gameOption').animate({
        opacity : 0
    },1000,"linear",function(){
        removeGameOptionDom();
        init2pMode(playerMode,player1name,player2name)
    });
}
function init1pGame(playerMode,player1name){
    $('#gameOption').animate({
        opacity : 0
    },1000,"linear",function(){
        removeGameOptionDom();
        init1pMode(playerMode,player1name);
    });
}
function init2pMode(playerMode,player1Name,player2Name){
    var game1 = new gameTemplate('player1',player1Name,cardRuleSet,playerMode);
    var game2 = new gameTemplate('player2',player2Name,cardRuleSet,playerMode, game1);
    game1.opponentObj = game2;
    game1.gameTemplateInit();
    game2.gameTemplateInit();
    game1.createCards();
    game2.createCards();
    game1.displayNameOnStat();
    game2.displayNameOnStat();
    game1.appendToDom(game1.domElement);
    console.log(game1);
    console.log(game2);
}
function init1pMode(playerMode,player1Name){
    var game1 = new gameTemplate('player1',player1Name,cardRuleSet,playerMode);
    game1.gameTemplateInit();
    game1.createCards();
    game1.displayNameOnStat();
    game1.appendToDom(game1.domElement);
}

//OOP Objects
function gameTemplate(templateName,playerName,cardRuleSet,totalPlayers,opponentObj){
    this.name = templateName;
    this.playerName = playerName;
    this.domElement;
    this.firstCard ;
    this.secondCard;
    this.firstFlipedEventTimeStamp;
    this.secondFlipedEventTimeStamp;
    this.totalPlayerMode = totalPlayers; // 1p for single player 2p for 2player mode
    this.ruleset = cardRuleSet;
    this.children = [];//
    this.childrenDomElementList =[];//would like to consolidate with this.children
    this.gamesPlayed = 0;
    this.matchedCardCount = 0;
    this.attempts = 0;
    this.accurarcy;
    this.opponentObj = opponentObj;
    this.gameTemplateInit = function(){
        this.createDomElement();
    };
    this.createDomElement = function(){
        var gameBoard = $('<section>').attr({'id' : 'game-area','name': this.name});
        this.domElement = gameBoard;
    };
    this.appendToDom = function(domElement){
        var self = this;
        console.log(domElement);
        $('body').append(domElement);
        $(domElement).css({
            "opacity":0
        }).animate({
              opacity:1
              },2000,"linear",function(){
              self.applyClickToCardTemplates();
              $("#"+self.name+"Stat").css({
                  "background-color" : "red"
              });
        });
    };
    this.removeDom = function(){
        this.domElement.remove(); //in case of using two boards
    };
    this.clearBoard = function(){
        for(var index in this.children){
            this.children[index].removeCardDom();
        }
    };
    this.callOpponentObj = function(){
        this.opponentObj.appendToDom(this.opponentObj.domElement);
    };
    this.applyClickToCardTemplates = function(){
        for(var eachCardTemplate in this.children){
            this.children[eachCardTemplate].addClickHandler();
        }
    };
    this.createCards = function(){
        for(var item in this.ruleset){
            for(var i = 0; i < this.ruleset[item].cardCount; i++){
                //console.log('cardTemplate',cardTemplate);
                var card = new cardTemplate(this);
                var domElement = card.cardTemplateInit(this.ruleset[item]);
                this.children.push(card);
                this.childrenDomElementList.push(domElement);
            }
        }
        this.randomizeCardOrder(this.childrenDomElementList);
    };
    this.randomizeCardOrder = function(childrenDomElementList){
        var cardDom =  childrenDomElementList; //this.domElement.find('.card');//array of card dom elements in order based on dom
        var randomizedList = [];
        while(cardDom.length > 0){
            var randomNum = Math.floor(Math.random()*cardDom.length);
            var splicedDom = cardDom.splice(randomNum,1);
            randomizedList.push(splicedDom[0]);
        }
        this.domElement.html('');
        this.domElement.append(randomizedList);
        this.childrenDomElementList = randomizedList;
    };
    this.handleClick = function(clickedCard){
        if(clickedCard.clicked){
            console.log('cannot click what\'s been clicked already');
        }
        if(clickedCard.matched){
            console.log('cannot select what\'s already matched');
            return;
        }
        if(this.firstCard == undefined){
            this.firstCard = clickedCard;
            this.firstCard.clicked = true;
            console.log("first card",this.firstCard);
            this.firstCard.handleFirstCard();
        }
        else if(this.secondCard == undefined){
            if(clickedCard != this.firstCard){
                this.secondCard = clickedCard;
                this.secondCard.clicked = true;
                console.log('second card',this.secondCard);
                this.secondCard.handleSecondCard();
                this.checkCardsMatched();
            }
            else{
                console.log('cannot choose the same card as the first one');
            }
        }
        else{
            console.log('cannot accept more cards');
        }
    };
    this.checkCardsMatched = function(){
        this.attempts++;
        if(this.firstCard.getCard() == this.secondCard.getCard()){
            console.log('cards matched');
            this.firstCard.handleMatchedCondition(this.secondCard);
            this.secondCard.handleMatchedCondition(this.firstCard);
            this.matchedCardCount+=2;
            if(this.matchedCardCount == this.children.length){
                this.calculateStats();
                this.displayStats();
                console.log('you won');
                this.gameWinHandler();
                return;
            }
            this.calculateStats();
            this.displayStats();
            this.firstCard = null;
            this.secondCard = null;
        }else{
            this.calculateStats();
            this.displayStats();
            var self = this;
            console.log('card not matched');
            setTimeout(function(){
                self.firstCard.handleMismatchCondition(self.secondCard);
                self.secondCard.handleMismatchCondition(self.firstCard);
                },1000)
        }
    };
    this.waitForFlipEvent = function(timeStamp){
        if(this.firstFlipedEventTimeStamp == undefined){
            this.firstFlipedEventTimeStamp = timeStamp;
            console.log('first flip ends at ',this.firstFlipedEventTimeStamp);
        }else if(this.secondFlipedEventTimeStamp == undefined){
            this.secondFlipedEventTimeStamp = timeStamp;
            console.log('second flip ends at ',this.secondFlipedEventTimeStamp);
            if(this.totalPlayerMode == "2p"){
                $("#"+this.name+"Stat").css({
                    "background-color" : "black"
                });
                this.removeDom();
                this.callOpponentObj();
            }
            this.firstCard.clicked = null;
            this.secondCard.clicked = null;
            this.firstCard = null;
            this.secondCard = null;
            this.firstFlipedEventTimeStamp = null;
            this.secondFlipedEventTimeStamp = null;
        }
    };
    this.gameWinHandler = function(){
        this.createWinnerPage();
    };
    this.createWinnerPage = function(){
        var self = this;
        var winnerDisplay = $("<section>").attr({
            "id":"winnerDisplay"
        }).fadeIn();
        var winnerInfoContainer = $("<div>").attr({
            "id":"winnerContainer"
        });
        var winnerText = $("<div>").attr({
            "id" : 'winnerText'
        }).text("WINNER");
        var winnerName = $("<div>").attr({
            "id" : 'winnerName'
        }).text(this.playerName );
        var playAgain = $("<div>").attr({
            "id":"playAgain"
        }).text("PLAY AGAIN").click(function(){
            self.reset();
            self.removeWinnerDisplay();
            if(self.totalPlayerMode == "2p"){
                 self.opponentObj.reset();
            }
        });
        var home = $("<div>").attr({
            "id":"home"
        }).text("HOME").click(function(){
            $("#player2Stat").animate({
                opacity:1
            },500,'linear');
            $(".statBox").css({"background-color":"black"});
            self.removeWinnerDisplay();
            self.clearBoard();
            initInitialPageDom();
            resetStat();
        });
        $("body").append(winnerDisplay.append(winnerInfoContainer.append(winnerText,winnerName,playAgain,home)));
    };
    this.removeWinnerDisplay = function(){
        $('#winnerDisplay').animate({
            opacity:0
        },1000,"linear",function(){
            $('#winnerDisplay').remove();
        })
    };
    this.reset = function(){
        this.gamesPlayed +=1;
        this.clearBoard();
        this.children = [];
        this.childrenDomElementList =[];
        this.firstCard = null;
        this.secondCard = null;
        this.attempts = 0;
        this.matchedCardCount = 0;
        this.createCards();
        this.applyClickToCardTemplates();///////////////////////////////////////////////click handler
        console.log('gamesPlayed : ',this.gamesPlayed );
    };
    this.calculateStats = function(){
        console.log('calculation running');
        var matches = this.matchedCardCount/2;
        var attempts = this.attempts;
        var decimal_accuracy = matches/attempts*100;
        this.accurarcy = decimal_accuracy.toFixed(2) + "%";
    };
    this.displayStats = function(){
        console.log('stats display running');
        var statsDomId = this.name+"Stat";
        $("#"+statsDomId+" > .gamesPlayed .value").text(this.gamesPlayed);
        $("#"+statsDomId+" > .attempts .value").text(this.attempts);
        $("#"+statsDomId+" > .accuracy .value").text(this.accurarcy);
    };
    this.displayNameOnStat = function(){
        var statsDomId = this.name+"Stat";
        $("#"+statsDomId+" > .statsHeader").text(this.playerName);
    }
}


function cardTemplate(parent){
    this.parent = parent;
    this.domElement;
    this.ruleset;
    this.matched;
    this.clicked;
    this.cardTemplateInit = function(ruleset){
        this.ruleset =ruleset;
        var cardDomElement  = this.createDomElement(this.ruleset);
        return cardDomElement;
    };
    this.createDomElement = function(ruleset){
        var back =$('<div>').addClass('back').append($('<img>').attr({'src' : ruleset.back}));
        var front = $('<div>').addClass('front').append($('<img>').attr({'src' : ruleset.image}));
        var card = $('<div>').addClass('card').attr({'name' : this.ruleset.name});
        this.domElement = card.append(front,back);
        return this.domElement;
    };
    this.removeCardDom = function(){
      this.domElement.remove();
    };
    this.addClickHandler = function(){
        this.domElement.click(this.handleClick.bind(this));//before bind(), this refers to the dom element
    };
    this.handleClick = function(){
        this.parent.handleClick(this);
    };
    this.handleFirstCard = function(){
        this.showCard();
    };
    this.handleSecondCard = function(){
        this.showCard();
    };
    this.showCard = function(){
        this.domElement.find('.back').removeClass('flipBack2');
        this.domElement.find('.front').removeClass('flipFront2');
        this.domElement.find('.back').addClass('flipBack');
        this.domElement.find('.front').addClass('flipFront');
    };
    function whichTransitionEvent(){    //not my code : listens for the event
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }
    this.listenEvent = function(){
        var self = this;
        var transitionEvent = whichTransitionEvent();
        transitionEvent && this.domElement.one(transitionEvent, function(e) {
            self.parent.waitForFlipEvent(e.timeStamp);
        });
    };
    this.hideCard = function(){
        this.domElement.find('.back').removeClass('flipBack');
        this.domElement.find('.front').removeClass('flipFront');
        this.domElement.find('.back').addClass('flipBack2');
        this.domElement.find('.front').addClass('flipFront2');
    };
    this.handleMatchedCondition = function(matchedPair){
        this.matched = true;
        console.log('i ',this.domElement, 'am matched with ', matchedPair.domElement);
    };
    this.handleMismatchCondition = function(){
        this.listenEvent();
        this.hideCard();
    };
    this.getCard = function(){
        return this.ruleset.name;
    };
}
