const languagesCodes = {
    en: "English", fr: "French", es: "Spanish"
};

//TODO: Move into a TypeScript file, to allow for text completion

const Text = { 
    English : {
        PLAYER: "Player",
        PLAY: "Play Selected",
        PASS: "Pass / Pick Up",
        DECK_PILE: "Deck Pile",
        PLAYING_PILE: "Playing Pile",
        START_GAME: "Start New Game",
        SHOW_RULES: "Show Rules",
        DEAL_CARDS: "Deal Cards",
        WINNER: "Winner: ",
    },
    French : {
        PLAYER: "LePlayer",
        PLAY: "Le Play",
        PASS: "Le Pass",
        DECK_PILE: "Le Deck Pile",
        PLAYING_PILE: "Le Playing Pile",
        START_GAME: "Le Start a Game",
        SHOW_RULES: "Le Show un Rules",
        DEAL_CARDS: "Le Deal un Cards",
        WINNER: "Le Winner: ",
    }
};

function TextResources() {
    const languageCode = (navigator.language || "").slice(0, 2);
    const language = languagesCodes[languageCode] || "English";

    return Text[language] || {};
  }
  
export default TextResources;
