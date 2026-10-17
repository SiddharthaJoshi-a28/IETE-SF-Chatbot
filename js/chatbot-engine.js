// IETE-SF Chatbot Query Processing Engine
// Handles natural language understanding, keyword matching, intent classification, and formatted response generation.

(function () {
  const isNode = typeof module !== 'undefined' && module.exports;
  const IETE_DATA = isNode ? require('../data/iete-data.js') : window.IETE_DATA;

  // Flattened member lookup index
  const memberIndex = [];
  const keywordIndex = [];
  const songIndex = [];

  function buildIndices() {
    // Supercore
    IETE_DATA.supercore.forEach(member => {
      memberIndex.push({
        name: member.name,
        nameLower: member.name.toLowerCase(),
        position: member.position,
        department: "SuperCore",
        role: member.role,
        isSupercore: true
      });
    });

    // Departments
    IETE_DATA.departments.forEach(dept => {
      // Heads
      dept.heads.forEach(head => {
        const item = {
          name: head.name,
          nameLower: head.name.toLowerCase(),
          position: "Head",
          department: dept.name,
          deptId: dept.id,
          adjectives: head.adjectives || [],
          keywords: head.keywords || "",
          song: head.song || null
        };
        memberIndex.push(item);

        if (head.keywords) {
          keywordIndex.push({
            name: head.name,
            position: "Head",
            department: dept.name,
            keywords: head.keywords.toLowerCase()
          });
        }
        if (head.song) {
          songIndex.push({
            name: head.name,
            position: "Head",
            department: dept.name,
            song: head.song
          });
        }
      });

      // Subheads
      dept.subheads.forEach(sub => {
        const item = {
          name: sub.name,
          nameLower: sub.name.toLowerCase(),
          position: "Sub-Head",
          department: dept.name,
          deptId: dept.id,
          adjectives: sub.adjectives || [],
          keywords: sub.keywords || "",
          song: sub.song || null
        };
        memberIndex.push(item);

        if (sub.keywords) {
          keywordIndex.push({
            name: sub.name,
            position: "Sub-Head",
            department: dept.name,
            keywords: sub.keywords.toLowerCase()
          });
        }
        if (sub.song) {
          songIndex.push({
            name: sub.name,
            position: "Sub-Head",
            department: dept.name,
            song: sub.song
          });
        }
      });

      // Executives
      dept.executives.forEach(exec => {
        memberIndex.push({
          name: exec,
          nameLower: exec.toLowerCase(),
          position: "Executive",
          department: dept.name,
          deptId: dept.id
        });
      });
    });
  }

  buildIndices();

  // Helper to match department from query string
  function findDepartment(queryLower) {
    for (const dept of IETE_DATA.departments) {
      for (const alias of dept.aliases) {
        // Regex word boundary or exact match
        const regex = new RegExp(`(^|\\b|\\s)${escapeRegex(alias)}(\\b|\\s|$)`, 'i');
        if (regex.test(queryLower)) {
          return dept;
        }
      }
    }
    return null;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // NLP Query Processor
  function processQuery(rawQuery) {
    if (!rawQuery || typeof rawQuery !== 'string') {
      return "Please enter a question about IETE-SF, our departments, heads, or events!";
    }

    const q = rawQuery.trim();
    const qLower = q.toLowerCase().replace(/['"?!,.]/g, ' ').replace(/\s+/g, ' ').trim();

    // 1. Greetings & Meta
    if (/^(hi|hello|hey|yo|namaste|good morning|good afternoon|good evening|sup|howdy)\b/i.test(qLower) && qLower.split(' ').length <= 3) {
      return `Hey there! 👋 Welcome to **IETE-SF (2026–27)**!\n\nI can help you with:\n• **Department Heads & Sub-Heads** (e.g. *"who is the head of r and d?"*)\n• **Team Members & Executives** (e.g. *"who is Siddhartha Joshi?"*)\n• **Vibes & Traits** (e.g. *"who is the rcb fan?"* or *"who has rebel heart?"*)\n• **Department Post Songs** (e.g. *"who chose Don Toliver?"*)\n• **Events & Recruitment** (e.g. *"when is the next hackathon?"* or *"how do I join?"*)\n\nWhat would you like to know?`;
    }

    if (/^(help|commands|what can you do|features|options)\b/i.test(qLower)) {
      return `Here are some things you can ask me:\n\n1. **Department Info**: *"Who is the head of R&D?"*, *"List subheads of Projects"*, *"Who are the executives in Admin?"*\n2. **People Lookup**: *"Who is Shivam Gogri?"*, *"Tell me about Mahek Busa"*, *"Who is the President?"*\n3. **Keywords & Vibes**: *"Who is the RCB fan?"*, *"Who is clutch when it counts?"*, *"Who has Punjabi flair?"*\n4. **Song Choices**: *"Who picked Drake?"*, *"What song did Renee choose?"*\n5. **Committee & Events**: *"How do I join?"*, *"When is DigiHunt?"*, *"What is your Instagram handle?"*`;
    }

    // 2. SuperCore query (President, VP, Treasurer, Secretary, Joint Secretary)
    if (/\b(president|vice president|treasurer|secretary|joint secretary|supercore|super core)\b/i.test(qLower)) {
      if (/\bpresident\b/i.test(qLower) && !/vice/i.test(qLower)) {
        const pres = IETE_DATA.supercore.find(m => m.position === "President");
        return `👑 **President of IETE-SF (2026–27)**:\n**${pres.name}**\n\n*${pres.role}*`;
      }
      if (/\b(vice president|vp)\b/i.test(qLower)) {
        const vp = IETE_DATA.supercore.find(m => m.position === "Vice President");
        return `🌟 **Vice President of IETE-SF (2026–27)**:\n**${vp.name}**\n\n*${vp.role}*`;
      }
      if (/\btreasurer\b/i.test(qLower)) {
        const tr = IETE_DATA.supercore.find(m => m.position === "Treasurer");
        return `💼 **Treasurer of IETE-SF (2026–27)**:\n**${tr.name}**\n\n*${tr.role}*`;
      }
      if (/\bjoint secretary\b/i.test(qLower)) {
        const js = IETE_DATA.supercore.find(m => m.position === "Joint Secretary");
        return `📝 **Joint Secretary of IETE-SF (2026–27)**:\n**${js.name}**\n\n*${js.role}*`;
      }
      if (/\bsecretary\b/i.test(qLower)) {
        const sec = IETE_DATA.supercore.find(m => m.position === "Secretary");
        return `📋 **Secretary of IETE-SF (2026–27)**:\n**${sec.name}**\n\n*${sec.role}*`;
      }
      if (/\b(supercore|super core)\b/i.test(qLower)) {
        let res = `🏛️ **IETE-SF SuperCore (2026–27)**:\n\n`;
        IETE_DATA.supercore.forEach(m => {
          res += `• **${m.position}**: ${m.name}\n`;
        });
        return res;
      }
    }

    // 3. Specific Person Name Search
    // Check if user is asking about an individual
    const personMatch = searchPerson(qLower);
    if (personMatch) {
      return formatPersonResponse(personMatch);
    }

    // 4. Department Queries
    const dept = findDepartment(qLower);
    if (dept) {
      // Check if asking specifically for HEADS
      if (/\b(head|heads|lead|leads|leader|leaders|chair|heading)\b/i.test(qLower) && !/\bsub\b/i.test(qLower)) {
        let res = `🎖️ **Heads of ${dept.name}**:\n\n`;
        dept.heads.forEach((h, idx) => {
          res += `${idx + 1}. **${h.name}**\n`;
          if (h.keywords) res += `   *Keywords / Vibe*: ${h.keywords}\n`;
          if (h.song) res += `   *Dept Post Song*: 🎵 ${h.song}\n`;
        });
        return res;
      }

      // Check if asking specifically for SUB-HEADS
      if (/\b(subhead|subheads|sub head|sub heads|sub-head|sub-heads|co-head|co-heads|junior head)\b/i.test(qLower)) {
        let res = `⭐ **Sub-Heads of ${dept.name}**:\n\n`;
        dept.subheads.forEach((s, idx) => {
          res += `${idx + 1}. **${s.name}**\n`;
          if (s.keywords) res += `   *Keywords / Vibe*: ${s.keywords}\n`;
          if (s.song) res += `   *Dept Post Song*: 🎵 ${s.song}\n`;
        });
        return res;
      }

      // Check if asking specifically for EXECUTIVES
      if (/\b(executive|executives|exec|execs|members|juniors|freshers)\b/i.test(qLower)) {
        let res = `👥 **Executives of ${dept.name}** (${dept.executives.length} members):\n\n`;
        dept.executives.forEach((e, idx) => {
          res += `${idx + 1}. ${e}\n`;
        });
        return res;
      }

      // General department summary
      let res = `🏢 **${dept.name}** (${dept.fullName})\n\n`;
      res += `${dept.overview}\n\n`;
      res += `**Heads**:\n` + dept.heads.map(h => `• **${h.name}** (${h.keywords || 'Leading the department'})`).join('\n') + `\n\n`;
      res += `**Sub-Heads**:\n` + dept.subheads.map(s => `• **${s.name}**`).join('\n') + `\n\n`;
      res += `**Executives**: ${dept.executives.length} team members. *(Ask "executives in ${dept.aliases[0]}" to list all)*`;
      return res;
    }

    // 5. Trait / Adjective / Keyword Search
    const traitResult = searchByKeyword(qLower);
    if (traitResult) {
      return traitResult;
    }

    // 6. Song Choice Search
    const songResult = searchBySong(qLower);
    if (songResult) {
      return songResult;
    }

    // 7. General FAQs (Joining, Events, Hackathon, Instagram, Fees, Office)
    for (const faq of IETE_DATA.faqs) {
      for (const kw of faq.keywords) {
        if (qLower.includes(kw)) {
          return faq.answer;
        }
      }
    }

    // 8. General Events query
    if (/\b(events|flagship events|hackathons|ulectro|adappt|digihunt)\b/i.test(qLower)) {
      let res = `🚀 **Flagship Events of IETE-SF**:\n\n`;
      IETE_DATA.events.forEach(e => {
        res += `• **${e.name}**: ${e.tagline}\n  ${e.description}\n`;
        if (e.date) res += `  🗓️ *Date*: ${e.date} (${e.venue || 'MPSTME'})\n`;
        res += `\n`;
      });
      return res;
    }

    // 9. Department list query
    if (/\b(departments|all departments|list departments|how many departments)\b/i.test(qLower)) {
      let res = `🏛️ **IETE-SF has 13 Active Departments**:\n\n`;
      IETE_DATA.departments.forEach((d, idx) => {
        res += `${idx + 1}. **${d.name}** — ${d.heads.map(h => h.name).join(', ')} (Heads)\n`;
      });
      res += `\nFeel free to ask for heads, subheads, or executives of any department!`;
      return res;
    }

    // 10. Fallback with intelligent suggestions
    return `I couldn't quite find an exact match for that! 🤔\n\nHere are some things you can ask me:\n• *"Who is the head of R&D?"*\n• *"Who are the heads of Projects?"*\n• *"List executives in Marketing"*\n• *"Who is the RCB fan?"*\n• *"Who chose Drake?"*\n• *"When is the next hackathon?"*\n\nOr DM us on Instagram at **[@iete_mpstme](https://www.instagram.com/iete_mpstme/)**!`;
  }

  // Search for person by name
  function searchPerson(qLower) {
    // Try matching full name first
    for (const m of memberIndex) {
      if (qLower.includes(m.nameLower)) {
        return m;
      }
    }

    // Try tokens / first name or last name if query is looking for a person
    if (/\b(who is|tell me about|profile of|info on|who s)\b/i.test(qLower)) {
      const cleanQ = qLower.replace(/\b(who is|tell me about|profile of|info on|who s|the)\b/gi, '').trim();
      if (cleanQ.length >= 3) {
        // Direct match against member names
        for (const m of memberIndex) {
          const parts = m.nameLower.split(' ');
          if (parts.some(p => p.length >= 3 && cleanQ.includes(p))) {
            return m;
          }
        }
      }
    }
    return null;
  }

  function formatPersonResponse(person) {
    let res = `👤 **${person.name}**\n\n`;
    res += `• **Position**: ${person.position}\n`;
    res += `• **Department**: ${person.department}\n`;

    if (person.role) {
      res += `• **Role**: ${person.role}\n`;
    }
    if (person.keywords) {
      res += `• **Keywords / Vibe**: ${person.keywords}\n`;
    }
    if (person.song) {
      res += `• **Dept Post Song**: 🎵 ${person.song}\n`;
    }
    return res;
  }

  // Search by personality trait / keyword
  function searchByKeyword(qLower) {
    const traitQueries = [
      { key: "rcb", label: "RCB Fan" },
      { key: "rebel heart", label: "Rebel Heart" },
      { key: "threesix", label: "threesix" },
      { key: "punjabi flair", label: "Punjabi flair & vibe" },
      { key: "unhinged", label: "unhinged" },
      { key: "clutch when it counts", label: "clutch when it counts" },
      { key: "calm to the chaos", label: "calm to the chaos" },
      { key: "somehow gets it done", label: "somehow gets it done" },
      { key: "perfectionist", label: "perfectionist" },
      { key: "film buff", label: "film buff" },
      { key: "celebrity outreach", label: "celebrity outreach" },
      { key: "feminist", label: "feminist" },
      { key: "natural leader", label: "natural leader" },
      { key: "delilah", label: "Delilah" },
      { key: "keen eye", label: "keen eye" },
      { key: "sunshine", label: "sunshine" },
      { key: "chaotic", label: "chaotic" }
    ];

    for (const t of traitQueries) {
      if (qLower.includes(t.key)) {
        const matches = keywordIndex.filter(k => k.keywords.includes(t.key));
        if (matches.length > 0) {
          let res = `✨ **Members associated with "${t.label}"**:\n\n`;
          matches.forEach(m => {
            res += `• **${m.name}** — ${m.position}, ${m.department}\n  *Traits*: "${m.keywords}"\n`;
          });
          return res;
        }
      }
    }
    return null;
  }

  // Search by song or artist
  function searchBySong(qLower) {
    const artists = [
      { artist: "don toliver", songName: "ATM" },
      { artist: "arctic monkeys", songName: "Do I Wanna Know" },
      { artist: "drake", songName: "2 Hard 4 the Radio / Never Recover" },
      { artist: "gunna", songName: "made for this shit" },
      { artist: "karan aujla", songName: "Winning speech" },
      { artist: "lil uzi vert", songName: "watch this" },
      { artist: "tame impala", songName: "The less i know the better" },
      { artist: "delilah", songName: "Delilah (pull me out of this)" },
      { artist: "paisa", songName: "paisa (de dana dan)" },
      { artist: "b's on the table", songName: "B's on the table" }
    ];

    for (const a of artists) {
      if (qLower.includes(a.artist) || qLower.includes(a.songName.toLowerCase())) {
        const matches = songIndex.filter(s =>
          s.song.toLowerCase().includes(a.artist) ||
          s.song.toLowerCase().includes(a.songName.toLowerCase()) ||
          (a.artist === "tame impala" && s.song.toLowerCase().includes("less i know"))
        );
        if (matches.length > 0) {
          let res = `🎵 **Dept Post Song choice matching "${a.artist}"**:\n\n`;
          matches.forEach(m => {
            res += `• **${m.name}** (${m.position}, ${m.department})\n  Track: *${m.song}*\n`;
          });
          return res;
        }
      }
    }
    return null;
  }

  const ChatbotEngine = {
    processQuery,
    IETE_DATA,
    memberIndex
  };

  if (isNode) {
    module.exports = ChatbotEngine;
  }
  if (typeof window !== 'undefined') {
    window.ChatbotEngine = ChatbotEngine;
  }
})();
