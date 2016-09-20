$(document).ready(function(){
    var game1 = new gameTemplate('game1',cardRuleSet,backgroundPics.player1);
    var game2 = new gameTemplate('game2',cardRuleSet,backgroundPics.player2, game1);
    game1.opponentObj = game2;

    game1.gameTemplateInit();
    game2.gameTemplateInit();
    game1.createCards();
    game2.createCards();

    game1.appendToDom(game1.domElement);

    //applyResetBtn(game);
});
var game;
var backgroundPics = {
    player1 : {
        img : '../memory_match/images/evangelion-backgrounds-00.png',
        animationClass :"player1Background"
    },
    // background2 : '../memory_match/images/evangelion-backgrounds-01.jpg',
    // background3 : '../memory_match/images/evangelion-backgrounds-02.jpg',
    player2 : {
        img : '../memory_match/images/evangelion-backgrounds-03.jpg',
        animationClass : "player2Background"
    }


};
var cardRuleSet = {
    eva01 : {
        name: 'eva01',
        cardCount: 2,
        image: '../memory_match/images/active_eva00_00.png',
        hideTime: 3000,
        back: '../memory_match/images/nerv.png'
    },
    eva02 : {
        name: 'eva02',
        cardCount: 2,
        image: '../memory_match/images/active_eva00_01.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva03 : {
        name: 'eva03',
        cardCount: 2,
        image: '../memory_match/images/active_eva01_00.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva04 : {
        name: 'eva04',
        cardCount: 2,
        image: '../memory_match/images/active_eva01_01.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva05 : {
        name: 'eva05',
        cardCount: 2,
        image: '../memory_match/images/active_eva02_00.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva06 : {
        name: 'eva06',
        cardCount: 2,
        image: '../memory_match/images/active_eva02_01.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva07 : {
        name: 'eva07',
        cardCount: 2,
        image: '../memory_match/images/active_eva02_02.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva08 : {
        name: 'eva08',
        cardCount: 2,
        image: '../memory_match/images/active_eva06_00.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    },
    eva09 : {
        name: 'eva09',
        cardCount: 2,
        image: '../memory_match/images/eva_series_00.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    }
};
function applyResetBtn(gameTemplateName){
    var self = gameTemplateName;
    $('#resetBtn').click(
        function(){
            self.reset();
        }
    )
}

function gameTemplate(name,cardRuleSet,backgroundImg,opponentObj){
    this.domElement;
    this.firstCard ;
    this.secondCard;
    this.ruleset = cardRuleSet;
    this.children = [];//
    this.childrenDomElementList =[];//would like to consolidate with this.children
    this.matchedCardCount = 0;
    this.gamesPlayed = 0;
    this.opponentObj = opponentObj;
    this.backgroundImgObj = backgroundImg;
    this.firstFlipedEventTimeStamp;
    this.secondFlipedEventTimeStamp;

    this.gameTemplateInit = function(){
        this.createDomElement();
    };
    this.createDomElement = function(){
        var gameBoard = $('<section>').attr({'id' : 'game-area','name': name});
        this.domElement = gameBoard;
    };
    this.appendToDom = function(domElement){
        this.applyBodyBackgroundAnimation();
        this.applyBodyBackground();
        var self = this;
        console.log(domElement);
        $('body').append(domElement);
        $(domElement).css({
            "opacity":0
        }).animate({
              opacity:1
              },2000,"linear",function(){
              self.applyClickToCardTemplates();
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
    this.applyBodyBackground = function(){
      $('body').css({
          "background-image": "url("+ this.backgroundImgObj.img +")"
      });
    };
    this.applyBodyBackgroundAnimation = function(){
        $('body').css({
            "animation-name" : this.backgroundImgObj.animationClass
        })
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
        // console.log('first card', this.firstCard);
        // console.log('second card', this.secondCard);
        if(clickedCard.matched){
            console.log('cannot select what\'s already matched');
            return;
        }
        if(this.firstCard == undefined){
            this.firstCard = clickedCard;
            console.log("first card",this.firstCard);
            this.firstCard.handleFirstCard();
        }
        else if(this.secondCard == undefined){
            if(clickedCard != this.firstCard){
                this.secondCard = clickedCard;
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
        if(this.firstCard.getCard() == this.secondCard.getCard()){
            console.log('cards matched');
            this.firstCard.handleMatchedCondition(this.secondCard);
            this.secondCard.handleMatchedCondition(this.firstCard);
            this.matchedCardCount+=2;
            if(this.matchedCardCount == this.children.length){
                console.log('you won');
                this.gameWinHandler();
                return;
            }
            this.firstCard = null;
            this.secondCard = null;
        }else{
            var self = this;
            console.log('card not matched');
            setTimeout(function(){
                self.firstCard.handleMismatchCondition(self.secondCard);
                self.secondCard.handleMismatchCondition(self.firstCard);
                self.firstCard = null;
                self.secondCard = null;

                //self.removeDom();
                //self.callOpponentObj();
            },1000)
        }

        this.waitForFlipEvent = function(timeStamp){


            if(this.firstFlipedEventTimeStamp == undefined){
                this.firstFlipedEventTimeStamp = timeStamp;
                console.log('first flip ends at ',this.firstFlipedEventTimeStamp);
            }else if(this.secondFlipedEventTimeStamp == undefined){
                this.secondFlipedEventTimeStamp = timeStamp;
                console.log('second flip ends at ',this.secondFlipedEventTimeStamp);
                //this.removeDom();
                //this.callOpponentObj();
                this.firstFlipedEventTimeStamp = null;
                this.secondFlipedEventTimeStamp = null;
            }
        }
    };
    this.gameWinHandler = function(){
        this.reset();
        this.opponentObj.reset();
        console.log('you won');
    };
    this.reset = function(){
        this.gamesPlayed +=1;
        this.clearBoard();
        this.children = [];
        this.childrenDomElementList =[];
        this.firstCard = null;
        this.secondCard = null;
        this.matchedCardCount = 0;
        this.createCards();
        console.log('gamesPlayed : ',this.gamesPlayed );
    }

}

function cardTemplate(parent){
    this.parent = parent;
    this.domElement;
    this.ruleset;
    this.matched;
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
        //  this.addClickHandler();
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
