$(document).ready(function(){
    var game = new gameTemplate('game1');
    game.gameTemplateInit();
    game.appendToDom(game.domElement);
    game.createCards(cardRuleSet);
    console.log(game);
});
var game;
var cardRuleSet = {
    eva01 : {
        name: 'eva01',
        cardCount: 9,
        image: '../memory_match/images/active_eva01_00.png',
        hideTime: 3000,
        back: '../memory_match/images/nerv.png'
        
    },
    eva02 : {
        name: 'eva02',
        cardCount: 9,
        image: '../memory_match/images/active_eva02_00.png',
        hideTime: 1000,
        back: '../memory_match/images/nerv.png'
    }
};

function gameTemplate(name){
    this.domElement;
    this.children = [];
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
        var childrenDom = [];
        for(item in ruleset){
            console.log('card ruleset',ruleset[item]);
            for(var i = 0; i < ruleset[item].cardCount; i++){
                var card = new cardTemplate(this);
                this.children.push(card);
                childrenDom.push(card.cardTemplateInit(ruleset[item]));
            }
        }

    };
    this.clickHandler = function(){
        
    }
}

function cardTemplate(parent){
    this.parent = parent;
    this.domElement;
    this.cardTemplateInit = function(ruleset){
        var cardDomElement  = this.createDomElement(ruleset);
        return cardDomElement;

    }
    this.createDomElement = function(ruleset){
        var back =$('<div>').addClass('back').css({
            'background-image' : 'url('+ruleset.image+')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'contain'
        });
        var front = $('<div>').addClass('front').css({
            'background-image' : 'url('+ruleset.back+')',
            'background-repeat' : 'no-repeat',
            'background-size' : 'contain'
        });
        var card = $('<div>').addClass('card');
        this.domElement = card.append(back,front);
        this.domElement.click(this.handleClick);
        console.log('card dom element created',this.domElement);
        parent.domElement.append(this.domElement);
        return this.domElement;
    };
    this.handleClick = function(){
        console.log(this);
    }
}
