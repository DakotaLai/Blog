import express from "express";
import bodyParser from "body-parser"
import { dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
var fullUrl;
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs");

})

app.get("/catIpsum", async(req, res) => {
  fullUrl = req.originalUrl;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  try {
    const result = await axios.get(`${baseUrl}/database/catIpsum/catSection.json`);
    res.render("section.ejs", {
      meme: result.data.meme,
      imageUrl: result.data.image });
  } catch (error) {
    console.log("error");
  }
})

app.get("/codeIpsum", async(req, res) => {
  fullUrl = req.originalUrl;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  try {
    const result = await axios.get(`${baseUrl}/database/codeIpsum/codeSection.json`);
    res.render("section.ejs", {
      meme: result.data.meme,
      imageUrl: result.data.image });
  } catch (error) {
    console.log("error");
  }
})

app.get("/cakeIpsum", async(req, res) => {
  fullUrl = req.originalUrl;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  try {
    const result = await axios.get(`${baseUrl}/database/cakeIpsum/cakeSection.json`);
    res.render("section.ejs", {
      meme: result.data.meme,
      imageUrl: result.data.image });
  } catch (error) {
    console.log("error");
  }
})

app.post('/generate', (req, res) => {
  var title = '';
  var paragraph = '';
  const txtInput =req.body["phrase"];
  var phraseList = txtInput.split(/\W+/);
  var n = parseInt(req.body["numOfSentence"]);
 
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

app.post('/:article', async(req, res) => {
  const article = req.body["articleId"];
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  var sectionFolder = "";
  const key = article.split("0")[0];
  switch (key) {
    case "code":
      sectionFolder = "codeIpsum"
      break;
    case "cake":
      sectionFolder = "cakeIpsum"
      break;
    case "cat":
      sectionFolder = "catIpsum"
      break;
    default:
      break;
  }

  try {
    const content = await axios.get(`${baseUrl}/database/${sectionFolder}/${article}.txt`);
    const result = await axios.get(`${baseUrl}/database/${sectionFolder}/${article}.json`);
    const header = result.data
    res.render("article.ejs", {
      article: content.data,
      date: header.date,
      author: header.author,
      title: header.title,
      comments: header.comments,
      image: header.image
    })
  } catch (error) {
    console.log(error);
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})