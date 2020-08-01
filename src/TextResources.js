import Api from "./Api";

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
  const textStoreUrl = "./Resources/Text.xml";

  //TODO: Find out why the response is always the Index.html page
  Api.getResourceFromUrl(textStoreUrl).then(response => {
    console.log(response);
  });

  // api.getResourceFromUrl("./Resources/Text.xml").then(response =>{ 
  //   console.log(response);
  // }, (status, request) => {
  //   console.log("Get Failed: " + status);
  //   console.log(request);
  // });

  // $.ajax({
  //     url: textStoreUrl,
  //     dataType: ($.browser.msie) ? "text" : "xml",
  //     success: data => {
  //       var xml;
  //       if (typeof data == "string") {
  //         xml = new ActiveXObject("Microsoft.XMLDOM");
  //         xml.async = false;
  //         xml.loadXML(data);
  //       } else {
  //         xml = data;
  //       }
  //     }
  //   }); 

  // fetch(textStoreUrl).then(response => {
  //     response.text().then(data => {
  //         parseString(data, function(err, result){
  //             console.log(result);
  //             console.log(err);
  //         });
  //     });
  // });

  return Text[language] || {};
}
  
export default TextResources;
