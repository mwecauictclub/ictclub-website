Here is the **complete, executable plan** — everything decided, nothing left vague.

---

## 🏆 MWECAU ICT Club Website — Full Project Plan

---

### 🎯 Project Identity

| Field | Value |
|-------|-------|
| **Project name** | MWECAU ICT Club Official Website |
| **Tagline** | *Inspire · Innovate · Integrate* |
| **Est.** | 2023 — Moshi, Kilimanjaro, Tanzania |
| **Goal** | Best website at Mwenge Catholic University |
| **Deployment** | Netlify + custom domain |
| **Repo** | `github.com/mwecauictclub` |

---

### 🔧 Tech Stack (100% CDN, zero downloads)

| Layer | Choice | CDN URL |
|-------|--------|---------|
| **CSS Framework** | Tailwind CSS v4 | `cdn.tailwindcss.com` |
| **Icons** | Lucide Icons | `unpkg.com/lucide@latest` |
| **Animations** | GSAP + ScrollTrigger | `cdnjs.cloudflare.com/ajax/libs/gsap` |
| **Carousel** | Splide.js v4 | `cdn.jsdelivr.net/npm/@splidejs/splide` |
| **Map** | Leaflet.js | `unpkg.com/leaflet` |
| **Fonts** | Google Fonts | `fonts.googleapis.com` |
| **Forms** | Netlify Forms | Native — no JS |

---

### 🎨 Design System

#### Colors
```css
--blue-deep:   #0e2566;   /* hero backgrounds */
--blue-main:   #1a3c8f;   /* primary brand */
--blue-light:  #2d5be3;   /* hover, links */
--orange:      #f5841e;   /* ALL CTAs, highlights */
--orange-warm: #ff9a3c;   /* orange hover */
--white:       #ffffff;
--surface:     #f4f7ff;   /* alternating sections */
--text:        #0d1b3e;
--text-muted:  #5b6f9a;
--border:      rgba(26,60,143,0.1);
```

#### Typography
```
Playfair Display  → hero titles, section headings (serif, prestigious)
Inter             → all body text, UI labels (clean, readable)
JetBrains Mono    → stats, badges, code blocks, labels
```

#### Spacing System
```
Section padding:   py-24 (96px top/bottom)
Container:         max-w-6xl mx-auto px-6
Card padding:      p-8
Gap between cards: gap-6
Border radius:     rounded-2xl (cards), rounded-full (pills/badges)
```

#### Component Rules
- **Cards** — white bg, subtle border, shadow-sm, lift + shadow-lg on hover
- **Buttons** — orange filled (primary) / blue outlined (secondary) / ghost (tertiary)
- **Nav** — sticky, blur backdrop, blue logo, orange CTA pill
- **Sections** — alternate white and `--surface` backgrounds
- **Hero** — always dark navy (`--blue-deep`) with subtle dot-grid pattern
- **Section labels** — `JetBrains Mono`, uppercase, orange, small — above every heading

---

### 📁 File Structure

```
mwecau-ict-club/
│
├── index.html          ← Home
├── about.html          ← About Us (all people + location + partners)
├── projects.html       ← GitHub Repos
├── quotes.html         ← Community Quotes Wall
├── contact.html        ← Contact + Map + Attendance
│
├── css/
│   └── style.css       ← custom styles (Tailwind does the rest)
│
├── js/
│   ├── main.js         ← nav, mobile menu, GSAP animations, shared utils
│   ├── api.js          ← all GitHub API calls (repos, contributors, users)
│   ├── quotes.js       ← QUOTES.json fetcher + parser + renderer
│   └── map.js          ← Leaflet map init for contact page
│
└── assets/
    └── img/
        ├── logo.jpg        ← club logo
        ├── logo.png
        ├── mwecau.png      ← partner logo
        └── UGA.png         ← partner logo
```

---

### 📄 All Pages — Section by Section

---

#### PAGE 1 — `index.html` (Home)

| # | Section | Details |
|---|---------|---------|
| 1 | **Nav** | Logo left · Home About Projects Quotes Contact · orange "Mark Attendance →" pill right · sticky · blur backdrop · mobile hamburger |
| 2 | **Hero** | Dark navy bg · dot-grid CSS pattern · club logo with glowing ring animation · mono label "MWECAU ICT CLUB · EST. 2023" · Playfair Display headline *"Build. Secure. Design. Deploy."* · subtitle · two buttons · stats strip at bottom (6 Departments · Moshi Tanzania · Founded 2023) |
| 3 | **About snapshot** | White bg · 3 columns with Lucide icons · Mission / Vision / Values · link to About page |
| 4 | **YouTube** | Surface bg · centered embed · `youtube.com/watch?v=Dm-5LJc03rM` · rounded-2xl · shadow · caption *"See what we do"* |
| 5 | **Departments** | White bg · 3×2 grid of cards · each: Lucide icon (blue) · dept name · one-liner desc · Programming · Cybersecurity · Networking · Maintenance · Graphics Design · AI & ML |
| 6 | **Featured Projects** | Surface bg · 3 live repo cards from GitHub API · name · desc · language pill · ★ stars · "View →" link |
| 7 | **Quotes Teaser** | Dark navy bg · Splide carousel · 3 quotes cycling · quote text + name + role · "See All Quotes →" orange button |
| 8 | **Attendance Banner** | Full-width orange bg · *"Sessions every Friday · 13:30 – 16:00"* · white "Mark Your Attendance →" button → `ab3fb7fa.pythonanywhere.com` |
| 9 | **Partners** | White bg · MWECAU logo + UGA logo · greyscale default → full colour on hover |
| 10 | **Footer** | Dark navy · logo + tagline · nav links · email · GitHub link · © 2025 MWECAU ICT Club |

---

#### PAGE 2 — `about.html` (About Us)

| # | Section | Details |
|---|---------|---------|
| 1 | **Nav** | Same across all pages |
| 2 | **Hero** | Dark navy · *"The people behind the code."* · subtitle |
| 3 | **Club Story** | White bg · horizontal timeline strip · 2023 Founded → First Sessions → Grew Departments → Now · each milestone: icon + year + one-liner |
| 4 | **Guardian** | Surface bg · full-width featured card · GitHub API avatar (`carmel26`) · **Carmel Nkeshimana** · *Instructor & Club Guardian* · MSc Embedded & Mobile Systems · Software Developer 2018–2022 @ ibiafrica · icon links: Website · Twitter · LinkedIn · YouTube |
| 5 | **Leading Team** | White bg · 3-card row · GitHub avatars from API (`cleven12` + 2 others TBD) · name · "Project Manager" badge |
| 6 | **Leadership Timeline** | Surface bg · vertical timeline · left line · right cards · ● 2023–? Edward Mangu — *Founder & Chairperson* · ● [Leader 2 — you provide] · ● [Leader 3 — placeholder] · current leader highlighted with orange border |
| 7 | **GitHub Contributors** | White bg · auto-fetched grid · all contributors across all org repos deduped · each: avatar · username · total contributions · "View GitHub →" link |
| 8 | **Alumni** | Surface bg · *"They graduated. Their legacy remains."* · placeholder cards with ghost styling · you fill names |
| 9 | **Membership Tiers** | White bg · 4-card row · Honorary · Associate · Expert · Contributor · each: icon + title + description + who qualifies |
| 10 | **Location** | Surface bg · 2 columns · left: address + GPS coords + info · right: Leaflet map centred on MWECAU Moshi |
| 11 | **Partners** | White bg · MWECAU + UGA logos · with links |

---

#### PAGE 3 — `projects.html` (Projects)

| # | Section | Details |
|---|---------|---------|
| 1 | **Hero** | Dark navy · *"What we build, we ship."* |
| 2 | **Filter Pills** | White bg · All · HTML · Python · JavaScript · PHP · Other · client-side filter, no reload |
| 3 | **Repo Grid** | Surface bg · auto-fetched from `api.github.com/users/mwecauictclub/repos` · each card: repo name · description · language colour dot + label · ★ stars · fork count · last updated · "View on GitHub →" |
| 4 | **Contribute CTA** | Dark navy · *"Fork. Code. PR. Ship."* · "View GitHub Org →" orange button |

---

#### PAGE 4 — `quotes.html` (Quotes Wall)

| # | Section | Details |
|---|---------|---------|
| 1 | **Hero** | Dark navy · *"Words from those who built this."* |
| 2 | **Quote Cards** | White bg · masonry-style grid (CSS columns) · each card: large `"` mark in blue · quote text · name bold · year + role muted · alumni badge (orange) or current (blue) |
| 3 | **How to Contribute** | Surface bg · 3-step visual: 1. Open QUOTES.json on GitHub → 2. Add your quote block → 3. Save / PR · format shown in styled code block · "Edit QUOTES.json →" orange button |

---

#### PAGE 5 — `contact.html` (Contact)

| # | Section | Details |
|---|---------|---------|
| 1 | **Hero** | Dark navy · *"Let's connect."* |
| 2 | **2-Column** | White bg · **Left**: 📧 `mwecauictclub@gmail.com` · 📍 MWECAU, Moshi, Kilimanjaro, Tanzania · 💬 WhatsApp Group link · 🐙 `github.com/mwecauictclub` · 📋 Attendance System (linked) · **Right**: Netlify contact form (Name + Email + Message + Send button) |
| 3 | **Leaflet Map** | Full-width · MWECAU campus pin · Moshi, Kilimanjaro · OpenStreetMap tiles · zoom controls · popup with club name |

---

### ⚙️ GitHub API — All Calls

```
/* api.js — all functions */

getRepos()
  → GET /users/mwecauictclub/repos
  → used by: home.js (3 featured), projects.js (all)

getContributors()
  → GET /repos/mwecauictclub/{repo}/contributors  (loop all repos)
  → merge + deduplicate by login, sort by total contributions
  → used by: about.html

getUser(username)
  → GET /users/{username}
  → used by: about.html for carmel26, cleven12, other PMs

/* quotes.js */
getQuotes()
  → GET raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.json
  → parse --- blocks → render cards
  → used by: quotes.html (all), index.html (3 random)
```

---

### 📝 QUOTES.json — Format Members Use

```json
[
  {
    "quote": "Technology is the language of the future.",
    "name": "Edward Mangu",
    "year": 2023,
    "role": "Founder & Chairperson",
    "type": "alumni"
  },
  {
    "quote": "Contribute once and you are part of this story forever.",
    "name": "Your Name Here",
    "year": 2025,
    "role": "Programming Department",
    "type": "current"
  },
  {
    "quote": "You don't need everything to start — you just need what's in your hands.",
    "name": "MWECAU ICT Club",
    "year": 2026,
    "role": "Mwenge Catholic University — Moshi, Tanzania",
    "type": "current"
  }
]
```

**`type: alumni`** = orange badge · **`type: current`** = blue badge

---

### 🧩 Shared Components (in `main.js` + `style.css`)

| Component | Used on |
|-----------|---------|
| Sticky nav + mobile hamburger | All pages |
| Page hero block | All pages |
| Footer | All pages |
| GSAP fade-in on scroll | All sections |
| Loading spinner | Projects, About (while API fetches) |
| Error state card | Projects, About (if API fails) |
| Section label (mono, orange) | All sections |

---

### 🌐 GSAP Animation Plan

| Element | Animation |
|---------|-----------|
| Hero logo | Scale from 0.8 → 1.0, fade in, glowing ring pulse |
| Hero headline | Words slide up staggered, 0.1s delay each |
| Stat numbers | Count up from 0 → real value on scroll enter |
| Cards | Fade up staggered as they enter viewport (ScrollTrigger) |
| Nav | Slide down on load, 0.3s |
| Section labels | Fade in left |
| Partners logos | Fade in staggered |

---

### 📋 Build Order (when we code)

```
Phase 1 — Foundation
  1. style.css      (CSS variables, base styles, shared components)
  2. main.js        (nav, mobile menu, GSAP base animations)

Phase 2 — Home
  3. index.html     (all 10 sections)
  4. api.js         (getRepos function)

Phase 3 — About
  5. about.html     (all 11 sections)
  6. api.js         (getContributors, getUser functions added)

Phase 4 — Projects
  7. projects.html
  8. Filter logic in projects section of api.js

Phase 5 — Quotes
  9. quotes.html
  10. quotes.js

Phase 6 — Contact
  11. contact.html
  12. map.js

Phase 7 — Polish
  13. Cross-browser test
  14. Mobile responsiveness check
  15. All API error states working
  16. Netlify deploy config (_redirects file)
```

---

### [ x ] Confirmed Details

| Item | Value | Status |
|------|-------|--------|
| GitHub org | `mwecauictclub` | [ x ] |
| Your GitHub | `cleven12` | [ x ] |
| Guardian GitHub | `carmel26` | [ x ] |
| Email | `mwecauictclub@gmail.com` | [ x ] |
| YouTube | `watch?v=Dm-5LJc03rM` | [ x ] |
| Attendance URL | `ab3fb7fa.pythonanywhere.com` | [ x ] |
| Colors | Blue `#1a3c8f` + Orange `#f5841e` | [ x ] |
| Logo | `logo.jpg` uploaded | [ x ] |
| WhatsApp link | ⏳ You provide | [ - ] |
| Other 2 PM usernames | ⏳ You provide | [ - ] |
| Leaders list | ⏳ You provide | [ - ] |

---

### 🚦 Decision — Ready to Build?

The **only 3 things** still missing:

```
1. WhatsApp group link
2. GitHub usernames for the other 2 Project Managers
3. Leaders list — name + title + year range for each
```

**You can provide those now and I build everything, OR I can start coding with placeholders and you fill those in later. Your call.**