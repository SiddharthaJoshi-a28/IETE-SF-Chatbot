<div align="center">

# ⚡ IETE-SF 2026–27 Intelligent Chatbot
### Official AI Assistant for the Institution of Electronics and Telecommunication Engineers — Students' Forum
**SVKM's NMIMS Mukesh Patel School of Technology Management & Engineering (MPSTME), Mumbai**

[![Build & Tests](https://img.shields.io/badge/tests-25%20passed%20%7C%20100%25-brightgreen?style=for-the-badge&logo=jest)](test/test-chatbot.js)
[![Architecture](https://img.shields.io/badge/Architecture-100%25%20Client--Side-blue?style=for-the-badge&logo=javascript)](js/chatbot-engine.js)
[![UI](https://img.shields.io/badge/Frontend-React%2018%20%2B%20CSS3-61DAFB?style=for-the-badge&logo=react)](chat.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Website](https://img.shields.io/badge/Website-ietempstme.com-1818FE?style=for-the-badge&logo=googlechrome)](https://ietempstme.com)
[![Instagram](https://img.shields.io/badge/Instagram-@iete__mpstme-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/iete_mpstme/)

<p align="center">
  <b>A zero-latency, privacy-friendly, intelligent conversational assistant designed as a seamless drop-in replacement for <code>ietempstme.com/chat.html</code>.</b>
</p>

</div>

---

## 📖 Overview

The hosted IETE-SF website features a **"chat w us"** section (`ietempstme.com/chat.html`). Previously, questions such as *"who is the head of r and d"* returned a static placeholder message (*"Good question! Drop us a message at the email in the footer..."*).

This repository contains a **production-ready, intelligent chatbot engine** that understands natural language queries about:
- **All 13 IETE-SF Departments**: Heads, Sub-Heads, and Executives.
- **SuperCore Leadership**: President, Vice President, Treasurer, Secretary, and Joint Secretary.
- **Department Post Traits & Keywords**: Personality descriptors (*e.g. "rcb fan", "rebel heart", "clutch when it counts", "punjabi flair", "unhinged", "visionary"*).
- **Post Song Selections**: Official tracks selected by members (*e.g. Don Toliver, Arctic Monkeys, Drake, Karan Aujla, Lil Uzi Vert, Gunna*).
- **Flagship Events & Hackathons**: **DigiHunt 2026** (Oct 18), **ADAPPT 5.0**, and **ULECTRO 26**.
- **Student Inquiries**: Membership fees, recruitment window, office hours at EEE Lab 2, and official contact links.

---

## ✨ Key Features

- **⚡ 100% Client-Side Engine**: Runs entirely within the user's browser. Zero backend servers, zero database setups, zero monthly API bills, and instantaneous response times.
- **🎨 Pixel-Perfect Frontend**: Matches the aesthetic and typographic hierarchy of `ietempstme.com` (Nohemi display font, Afacad body font, `#1818FE` signature swallow blue, floating pill navbar, interactive suggestion chips, and jumping typing indicator).
- **🧠 Fuzzy & Alias-Aware NLP**: Automatically maps acronyms, slang, and common abbreviations (e.g. `r and d` / `rnd` / `r&d` $\rightarrow$ Research & Development; `dc` $\rightarrow$ Digital Creatives; `ihc` $\rightarrow$ In House Creatives; `agm` $\rightarrow$ Artist & Guest Management; `mktg` $\rightarrow$ Marketing).
- **🎯 3 Integration Modes**:
  1. **All-in-One Standalone (`standalone-chat.html`)**: Single file containing all HTML, CSS, React components, datasets, and NLP logic inlined. Just double-click to run or upload directly to your web server.
  2. **Modular Asset Architecture (`chat.html`)**: Cleanly decoupled into data (`data/iete-data.js`), NLP logic (`js/chatbot-engine.js`), and React view layer (`chat.html`).
  3. **Embeddable Floating Widget (`widget/iete-chatbot-widget.js`)**: Add a floating chat bubble to any existing page (`index.html`, `events.html`, `team.html`) with a single `<script>` tag.

---

## 📸 Before vs. After

| Reference Screen (Placeholder on hosted site) | New Intelligent Chatbot Response |
| :--- | :--- |
| **User asks**: `who is the head of r and d`<br><br>🤖 **Old Bot**: *"Good question! Drop us a message at the email in the footer and someone from the committee will get back to you."* | **User asks**: `who is the head of r and d`<br><br>🤖 **New Bot**:<br>🎖️ **Heads of Research and Development (R&D)**:<br>1. **Shlok Dharani**<br>&nbsp;&nbsp;&nbsp;*Keywords / Vibe*: decisive, analytical, bold, visionary, driven<br>2. **Mahek Busa**<br>&nbsp;&nbsp;&nbsp;*Keywords / Vibe*: creative, passionate, perfectionist, ambitious, enthusiast<br>&nbsp;&nbsp;&nbsp;*Dept Post Song*: 🎵 ATM - Don Toliver (0:20 onwards) |

---

## 🏛️ Covered Departments (13 Total)

1. **Admin and Hospitality**
2. **Digital Creatives (DC)**
3. **Marketing Department (MKTG)**
4. **Projects Department (Project Team)**
5. **Photography Department (Photo)**
6. **Logistics Department**
7. **Informals Department**
8. **Event Management (EM) / External Management**
9. **Social Media & Content Writing (SMCW)**
10. **Publicity Department**
11. **Research and Development (R&D)**
12. **Artist and Guest Management (AGM)**
13. **In House Creatives (IHC)**

---

## 💬 Sample Queries You Can Try

| Category | Example Query | Expected Output |
| :--- | :--- | :--- |
| **Department Heads** | *"who is the head of r and d"* | Shlok Dharani & Mahek Busa with their keywords & post song |
| **Department Heads** | *"heads of admin"* | Shivam Gogri & Ayush Gandhi |
| **Sub-Heads** | *"sub heads of projects"* | Sanika Mali, Neil Nafrey, Anshuman Semalty, Vihaan Patole |
| **Sub-Heads** | *"subheads in marketing"* | Parth Shah, Sahil Chaudhari, Aarush Rana, Heer Shethia, Shweny Mamtora |
| **Executives** | *"executives in publicity"* | Complete list of all 13 Publicity Executives |
| **Member Lookup** | *"who is Siddhartha Joshi?"* | Position: Executive, Department: Projects Department |
| **Member Lookup** | *"tell me about Tanush Khetan"* | Head of AGM Department, traits: wise, charismatic, driven, etc. |
| **Traits / Vibe Search** | *"who is the rcb fan?"* | Shivam Gogri (Head of Admin) |
| **Traits / Vibe Search** | *"who has rebel heart?"* | Brijraj Singh Bhati (Head of Digital Creatives) |
| **Traits / Vibe Search** | *"who is clutch when it counts?"* | Kathan Dodia (R&D) & Swastik Kar (AGM) |
| **Song Choice Search** | *"who chose Don Toliver?"* | Mahek Busa (ATM - Don Toliver) |
| **Song Choice Search** | *"who chose Drake?"* | Neil Nafrey (Projects) & Dev Joshi (Informals) |
| **Song Choice Search** | *"who chose Arctic Monkeys?"* | Renee Punamiya (Do I Wanna Know) |
| **Song Choice Search** | *"who chose Karan Aujla?"* | Aryan Mishra (Winning Speech) |
| **SuperCore** | *"who is the president?"* | Khushi Choudhary |
| **SuperCore** | *"who is in supercore?"* | Full breakdown: President, VP, Treasurer, Secretary, Joint Secretary |
| **Hackathon & Events** | *"when is the next hackathon?"* | DigiHunt 2026 details (Oct 18, 9 AM, Main Auditorium) |
| **Recruitment** | *"how do I join?"* | Recruitment and induction guidelines for August window |
| **Contact & Socials** | *"what is your instagram handle?"* | [@iete_mpstme](https://www.instagram.com/iete_mpstme/) |

---

## 📁 Repository Structure

```
iete-sf-chatbot/
├── chat.html                     # Modular drop-in replacement for ietempstme.com/chat.html
├── standalone-chat.html          # All-in-one standalone file (no external folder dependencies)
├── package.json                  # NPM test and start scripts
├── .gitignore                    # Standard git exclusions
├── data/
│   └── iete-data.js              # Full committee roster, traits, songs, FAQs, and events
├── js/
│   └── chatbot-engine.js         # Core NLP query parsing, regex matching & response engine
├── widget/
│   └── iete-chatbot-widget.js    # Floating chat bubble embeddable on any webpage
├── test/
│   └── test-chatbot.js           # Automated test suite (25 test cases)
└── README.md                     # Documentation
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/iete-sf-chatbot.git
cd iete-sf-chatbot
```

### 2. Run Locally
You don't need any complex build tooling. You can either:

- **Directly open the file**: Double-click `standalone-chat.html` or `chat.html` in any web browser.
- **Run the local dev server**:
  ```bash
  npm start
  ```
  Then open [http://localhost:3000/chat.html](http://localhost:3000/chat.html).

### 3. Run Automated Tests
Execute the unit test suite to verify NLP intent matching across 25 different query styles:
```bash
npm test
```
Expected output:
```
=== RUNNING IETE-SF CHATBOT ENGINE TESTS ===
[PASS] Test 1: "who is the head of r and d"
[PASS] Test 2: "heads of admin"
...
Results: 25 passed, 0 failed out of 25 tests.
```

---

## 🌐 Deployment to `ietempstme.com`

### Method A: Single-File Drop-In (Recommended)
1. Rename `standalone-chat.html` to `chat.html`.
2. Upload and replace the existing `chat.html` on your web host (e.g. cPanel, Apache, Nginx, or GitHub Pages).
3. That's it! Everything works out of the box.

### Method B: Modular Deployment
1. Upload `chat.html` to your site root.
2. Upload the `data/` and `js/` folders alongside your site's existing folders (`fonts/`, `icons/`, etc.).
3. When the committee updates next year, you only need to edit `data/iete-data.js` without touching HTML or React components!

### Method C: Floating Chat Bubble on All Pages
Want the chatbot accessible from your homepage or events page? Simply add this snippet right before `</body>`:
```html
<script src="data/iete-data.js"></script>
<script src="js/chatbot-engine.js"></script>
<script src="widget/iete-chatbot-widget.js"></script>
```

---

## 🛠️ How to Update Data for Future Committees

All member records, traits, and events are cleanly decoupled in [`data/iete-data.js`](data/iete-data.js).

To add or update a member:
```javascript
{
  name: "Your Name",
  position: "Head", // or "Sub-Head"
  adjectives: ["visionary", "creative", "driven"],
  song: "Song Name - Artist (timestamp)",
  keywords: "visionary, creative, driven"
}
```

To update hackathons or events:
```javascript
{
  name: "DigiHunt 2027",
  tagline: "Annual Flagship Tech Hunt & Hackathon",
  date: "October 2027",
  venue: "Main Auditorium, MPSTME",
  description: "..."
}
```

---

## 🤝 Contributing

Contributions, bug reports, and enhancements are always welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <b>Built with 💙 for the IETE-SF Community at SVKM's NMIMS MPSTME, Mumbai</b><br>
  Follow us on Instagram: <a href="https://www.instagram.com/iete_mpstme/">@iete_mpstme</a> • Website: <a href="https://ietempstme.com">ietempstme.com</a>
</div>
