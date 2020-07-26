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
        PLAY: "La Play",
        PASS: "La Pass",
        DECK_PILE: "La Deck Pile",
        PLAYING_PILE: "La Playing Pile",
    }
};

function TextResources() {
    const languageCode = (navigator.language || "").slice(0, 2);
    const language = languagesCodes[languageCode] || "English";

    return Text[language] || {};
  }
  
export default TextResources;
