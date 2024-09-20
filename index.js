import express from "express";
import bodyParser from "body-parser"
import { dirname} from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
var fullUrl;
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");

})

app.get("/catIpsum", (req, res) => {
  res.render("catIpsum.ejs");
  fullUrl = req.originalUrl;

})

app.get("/codeIpsum", (req, res) => {
  fullUrl = req.originalUrl;
  res.render("codeIpsum.ejs");
  
})

app.get("/cakeIpsum", (req, res) => {
  fullUrl = req.originalUrl;
  res.render("bakeIpsum.ejs");
})





app.post('/generate', (req, res) => {
  var title = '';
  var paragraph = '';
  const txtInput =req.body["phrase"];
  var phraseList = txtInput.split(/\W+/);
  var n = parseInt(req.body["numOfSentence"]);

  // console.log("hi");
  // console.log(req.body["phrase"]);
 
  // generate paragraph
  for (let i = 0; i < n; i++) {
    var sentence = '';
    var numWords = Math.floor(Math.random() * (20 - 10) + 10);
    var randomIndex = Math.floor(Math.random()*phraseList.length);
    sentence += phraseList[randomIndex].charAt(0).toUpperCase() +  phraseList[randomIndex].slice(1) + " "
    // console.log(numWords);
    for (let i = 0; i < numWords-1; i++) {
      var randomIndex = Math.floor(Math.random()*phraseList.length);
      if (i+1 === numWords-1) {
        sentence += phraseList[randomIndex];
        
      } else {
        sentence += phraseList[randomIndex] + " ";
      }
      
    }
    sentence += ". ";
    paragraph+=sentence;
  }

  // generate title
  var titleLength = Math.floor(Math.random() * (6 - 2) + 2);
  for (let i = 0; i < titleLength; i++) {
    var randomIndex = Math.floor(Math.random()*phraseList.length);
    title += phraseList[randomIndex].charAt(0).toUpperCase() +  phraseList[randomIndex].slice(1) + " "
  }

  // display text
  res.render("index.ejs", {
    title: title,
    paragraph: paragraph,
    textInput: txtInput,

  })

});

app.post('/:article', (req, res) => {
  const article = req.body["articleId"];
  res.render(__dirname+"/views/"+article+".ejs")
  console.log("hi a");

});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})