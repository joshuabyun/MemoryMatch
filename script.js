$(document).ready(function(){
    var game = new gameTemplate('game1');
    game.gameTemplateInit();
    game.appendToDom(game.domElement);
    game.createCards(cardRuleSet);
    //console.log(game);
});
var game;
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
    },
};

function gameTemplate(name){
    this.domElement;
    this.children = [];
    this.firstCard ;
    this.secondCard;
    this.matchedCardCount = 0;

    this.gameTemplateInit = function(){
        this.createDomElement();
    }
    this.createDomElement = function(){
        var gameBoard = $('<section>').attr({'id' : 'game-area','name': name});
        this.domElement = gameBoard;
    }
    this.appendToDom = function(domElement){
        $('body').append(domElement);
    }
    this.removeDom = function(){
        this.domElement.remove();
    }
    this.createCards = function(ruleset){//object contains card info
        var domElementList = [];
        for(item in ruleset){
            //console.log('card ruleset',ruleset[item]);
            for(var i = 0; i < ruleset[item].cardCount; i++){
                var card = new cardTemplate(this);
                var domElement = card.cardTemplateInit(ruleset[item]);
                this.children.push(card); //need to check if this template includes dom element
                domElementList.push(domElement);
            }
        }
        this.randomizeCardOrder(domElementList);
    };
    this.randomizeCardOrder = function(domElementList){
        var cardDom =  domElementList; //this.domElement.find('.card');//array of card dom elements in order based on dom
        var randomizedList = [];
        while(cardDom.length > 0){
            var randomNum = Math.floor(Math.random()*cardDom.length);
            var splicedDom = cardDom.splice(randomNum,1);
            randomizedList.push(splicedDom[0]);
        }
        this.domElement.html('');
        this.domElement.append(randomizedList);

    
    };
    // this.countAllcards = function(ruleset){
    //     var totalCount = 0;
    //     var orderList = [];
    //     var cardObj = [];
    //     var returnOutput = [];
    //     for( item in ruleset){
    //         for(var i = 0; i < ruleset[item].cardCount; i++){
    //             orderList.push(totalCount+i);
    //             cardObj.push(ruleset[item]);
    //         }
    //         totalCount+=ruleset[item].cardCount;
    //     }
    //     returnOutput.push(orderList);
    //     returnOutput.push(cardObj);
    //     return returnOutput;
    // };
    this.handleClick = function(clickedCard){
        if(this.firstCard == undefined){
            this.firstCard = clickedCard;
            this.firstCard.handleFirstCard();
        }
        else if(this.secondCard == undefined){
            if(clickedCard != this.firstCard){
                this.secondCard = clickedCard;
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
            },3000)
        }
    };
    this.gameWinHandler = function(){
       console.log('you won');
    }
}

function cardTemplate(parent){
    this.parent = parent;
    this.domElement;
    this.ruleset;
    this.cardTemplateInit = function(ruleset){
        this.ruleset =ruleset;
        var cardDomElement  = this.createDomElement(this.ruleset);
        return cardDomElement;
    };
    this.createDomElement = function(ruleset){
        var back =$('<div>').addClass('back').append($('<img>').attr({'src' : ruleset.back}));
        var front = $('<div>').addClass('front').append($('<img>').attr({'src' : ruleset.image}));
        var card = $('<div>').addClass('card').attr({'name' : this.ruleset.name});
        this.domElement = card.append(back,front);
        this.domElement.click(this.handleClick.bind(this));//before bind(), this refers to the dom element
        //this.parent.domElement.append(this.domElement);
        return this.domElement;
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
        this.domElement.find('.back').hide();
    };
    this.hideCard = function(){
        this.domElement.find('.back').show();
    };
    this.handleMatchedCondition = function(matchedPair){
        console.log('i ',this.domElement, 'am matched with ', matchedPair.domElement);
    };
    this.handleMismatchCondition = function(){
        this.hideCard();
    };
    this.getCard = function(){
        return this.ruleset.name;
    };
}
