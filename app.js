const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB6uKNGlGwRKIE5NIpeU5xqv5M8YfL8QTI");

const holyBooks = {
  bible: {
    name: "Bible",
    figure: "Jesus Christ",
    promptPrefix: "You are Jesus Christ and I want you to give solution to my problem which is that "
  },
  bhagavadGita: {
    name: "Bhagavad Gita",
    figure: "Lord Krishna",
    promptPrefix: "You are Lord Krishna and I want you to give solution to my problem which is that "
  },
  guruGranthSahib: {
    name: "Guru Granth Sahib",
    figure: "Guru Nanak",
    promptPrefix: "You are Guru Nanak and I want you to give solution to my problem which is that "
  },
  tripitaka: {
    name: "The Tripitaka",
    figure: "Buddha",
    promptPrefix: "You are Buddha and I want you to give solution to my problem which is that "
  }
};

async function run(book, problem) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const holyBook = holyBooks[book];
  const prompt = `${holyBook.promptPrefix}'${problem}', give the solution from ${holyBook.name} book including phrases and also make sure that the form of output of ${holyBook.figure}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

module.exports = { run };