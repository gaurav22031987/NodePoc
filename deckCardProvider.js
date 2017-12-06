DeckCardProvider = function () {
};


let deck = new Array();
function getData() {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const suits = ['Heart', 'Diamond', 'Club', 'Spade'];
    for (suit in suits) {
        for (card in cards) {
            deck.push({ suit: suits[suit], card: cards[card] });
        }
    }
}
DeckCardProvider.prototype.getCollection = function (callback) {
    if (!deck.length) {
        getData();
    }
    callback(deck);
};

DeckCardProvider.prototype.removeCard = function (cardInfo, callback) {
    deck = deck.filter(function (obj) {
        return ((obj.suit.toString() != cardInfo.suit.toString()) || (Number(obj.card) != Number(cardInfo.card)));
    });
    callback(deck);
};

exports.DeckCardProvider = DeckCardProvider;