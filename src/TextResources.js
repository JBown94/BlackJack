const languagesCodes = {
    en: "English", fr: "French", es: "Spanish"
};

const Text = { 
    English : {
        PLAY: "Play",
        PASS: "Pass",
        DECK_PILE: "Deck Pile",
        PLAYING_PILE: "Playing Pile",
    },
    French : {
        PLAY: "Le Play",
        PASS: "Le Pass",
        DECK_PILE: "Le Deck Pile",
        PLAYING_PILE: "Le Playing Pile",
    }
};

function TextResources() {
    const languageCode = (navigator.language || "").slice(0, 2);
    const language = languagesCodes[languageCode] || "English";

    return Text[language] || {};
  }
  
export default TextResources;
