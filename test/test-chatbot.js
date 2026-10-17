// Automated test suite for IETE-SF Chatbot Query Engine
const ChatbotEngine = require('../js/chatbot-engine.js');

const testCases = [
  {
    query: "who is the head of r and d",
    expectedKeywords: ["Shlok Dharani", "Mahek Busa", "Heads of Research and Development"]
  },
  {
    query: "heads of admin",
    expectedKeywords: ["Shivam Gogri", "Ayush Gandhi"]
  },
  {
    query: "sub heads of projects",
    expectedKeywords: ["Sanika Mali", "Neil Nafrey", "Anshuman Semalty", "Vihaan Patole"]
  },
  {
    query: "executives in marketing",
    expectedKeywords: ["Nirvaan Ashar", "Darsh Vora", "Executives of Marketing"]
  },
  {
    query: "who is Siddhartha Joshi?",
    expectedKeywords: ["Siddhartha Joshi", "Executive", "Projects Department"]
  },
  {
    query: "tell me about Shivam Gogri",
    expectedKeywords: ["Shivam Gogri", "Head", "Admin Department", "rcb fan"]
  },
  {
    query: "who is the rcb fan?",
    expectedKeywords: ["Shivam Gogri", "rcb fan"]
  },
  {
    query: "who chose Don Toliver?",
    expectedKeywords: ["Mahek Busa", "ATM"]
  },
  {
    query: "who chose Drake?",
    expectedKeywords: ["Neil Nafrey", "Dev Joshi"]
  },
  {
    query: "who is the president?",
    expectedKeywords: ["Khushi Choudhary", "President"]
  },
  {
    query: "who is in supercore?",
    expectedKeywords: ["Khushi Choudhary", "Swara Shah", "Neil Shinde", "Arham Shaikh", "Akshay Sathaye"]
  },
  {
    query: "when is the next hackathon?",
    expectedKeywords: ["DigiHunt 2026", "October 18"]
  },
  {
    query: "how do I join?",
    expectedKeywords: ["recruitment form", "August"]
  },
  {
    query: "what is your instagram handle?",
    expectedKeywords: ["@iete_mpstme"]
  },
  {
    query: "who has rebel heart?",
    expectedKeywords: ["Brijraj Singh Bhati"]
  },
  {
    query: "who are the heads of dc?",
    expectedKeywords: ["Brijraj Singh Bhati", "Bhavya Vira"]
  },
  {
    query: "who is clutch when it counts?",
    expectedKeywords: ["Kathan Dodia", "Swastik Kar"]
  },
  {
    query: "rnd heads",
    expectedKeywords: ["Shlok Dharani", "Mahek Busa"]
  },
  {
    query: "mktg subheads",
    expectedKeywords: ["Parth Shah", "Sahil Chaudhari", "Heer Shethia", "Shweny Mamtora", "Aarush Rana"]
  },
  {
    query: "who is the secretary?",
    expectedKeywords: ["Arham Shaikh", "Secretary"]
  },
  {
    query: "is there a membership fee?",
    expectedKeywords: ["100% free"]
  },
  {
    query: "how to contact?",
    expectedKeywords: ["iete@mpstme.com", "EEE Lab 2"]
  },
  {
    query: "who has gunna as their song?",
    expectedKeywords: ["Chris Alex", "gunna"]
  },
  {
    query: "who chose Karan Aujla?",
    expectedKeywords: ["Aryan Mishra", "Winning speech"]
  },
  {
    query: "tell me about Tanush Khetan",
    expectedKeywords: ["Tanush Khetan", "Head", "AGM"]
  }
];

console.log("=== RUNNING IETE-SF CHATBOT ENGINE TESTS ===\n");
let passed = 0;
let failed = 0;

testCases.forEach((tc, i) => {
  const response = ChatbotEngine.processQuery(tc.query);
  const ok = tc.expectedKeywords.every(kw => response.toLowerCase().includes(kw.toLowerCase()));
  if (ok) {
    console.log(`[PASS] Test ${i + 1}: "${tc.query}"`);
    passed++;
  } else {
    console.log(`[FAIL] Test ${i + 1}: "${tc.query}"`);
    console.log(`   Response: ${response}`);
    console.log(`   Expected missing keyword(s) from:`, tc.expectedKeywords);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${testCases.length} tests.`);
if (failed > 0) process.exit(1);
