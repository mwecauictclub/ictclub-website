# MWECAU ICT Club Website - Premium Version v3.0.0

> **Premium HTML-only foundation with Tailwind CSS, Vanilla JS, GSAP, AOS, and GitHub API integration**

## 🎯 What's New in Premium v3.0.0

This is a complete rebuild featuring:

### ✨ Premium Features
- **Tailwind CSS v4** - Modern utility-first CSS framework (CDN)
- **Lucide Icons** - Beautiful, consistent icon system
- **GSAP + ScrollTrigger** - Smooth, professional animations
- **AOS (Animate On Scroll)** - Elegant scroll animations
- **Splide.js** - Touch-friendly carousel for quotes
- **GitHub API Integration** - Live project data from organization repos
- **Dynamic Quotes System** - Fetches from QUOTES.md in GitHub repo
- **Vanilla JavaScript** - No jQuery, pure modern JS

### 📁 Structure

```
src/
├── index.html           # Homepage with all premium features
├── css/
│   └── style.css       # Custom styles (minimal, Tailwind does heavy lifting)
├── js/
│   ├── main.js         # Core functionality, mobile menu, utilities
│   ├── api.js          # GitHub API calls (repos, contributors, users)
│   └── quotes.js       # Fetch and render quotes from QUOTES.md
└── assets/
    └── img/
        ├── logo.png    # Club logo (replace with actual)
        ├── mwecau.png  # MWECAU partner logo (replace with actual)
        └── UGA.png     # UGA partner logo (replace with actual)
```

### 🚀 Features Implemented

#### Home Page (index.html)
1. [ x ] **Sticky Navigation** - Blur backdrop, responsive mobile menu
2. [ x ] **Hero Section** - Dark navy with dot-grid pattern, glowing logo, stats
3. [ x ] **About Snapshot** - Mission, Vision, Values cards
4. [ x ] **YouTube Embed** - Responsive video player
5. [ x ] **Departments Grid** - 6 department cards with icons and descriptions
6. [ x ] **Featured Projects** - Live data from GitHub API (3 latest repos)
7. [ x ] **Quotes Carousel** - Auto-rotating testimonials from members
8. [ x ] **Attendance Banner** - Full-width CTA with link to attendance system
9. [ x ] **Partners Section** - Logo display with hover effects
10. [ x ] **Footer** - Links, contact info, copyright

### 🎨 Design System

#### Colors (Tailwind Extended)
```
Blue Deep:   #0e2566  (hero backgrounds)
Blue Main:   #1a3c8f  (primary brand)
Blue Light:  #2d5be3  (hover, links)
Orange:      #f5841e  (CTAs, highlights)
Orange Warm: #ff9a3c  (orange hover state)
Surface:     #f4f7ff  (alternating sections)
Text:        #0d1b3e  (body text)
Text Muted:  #5b6f9a  (secondary text)
```

#### Typography
```
Playfair Display → Hero titles, section headings (serif, prestigious)
Inter            → All body text, UI labels (clean, readable)
JetBrains Mono   → Stats, badges, labels (monospace)
```

### 📝 TODOs

#### Pages to Build
- [ ] `about.html` - Full team, guardian, contributors, location map
- [ ] `projects.html` - All repos with language filter
- [ ] `quotes.html` - Full quotes wall with masonry layout
- [ ] `contact.html` - Contact form + Leaflet map

#### Additional Files Needed
- [ ] `js/map.js` - Leaflet.js initialization for contact page
- [ ] Replace placeholder images with actual logos

#### Content to Add (via design.md)
- [ ] WhatsApp group link
- [ ] Other 2 Project Manager GitHub usernames
- [ ] Leadership list with years and roles

### 🔧 How to Use

1. **Local Development**
   ```bash
   # Simply open index.html in a browser
   # Or use a local server:
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

2. **Deployment**
   - Works on **Netlify**, **Vercel**, **GitHub Pages**, or any static host
   - No build process needed
   - All dependencies loaded via CDN

3. **GitHub API**
   - Fetches data from `mwecauictclub` organization
   - No API key needed (uses public data)
   - Rate limit: 60 requests/hour per IP

4. **Quotes System**
   - Reads from: `https://raw.githubusercontent.com/mwecauictclub/mwecauictclub/main/QUOTES.md`
   - Format:
     ```markdown
     ---
     quote: "Your quote here"
     name: Full Name
     year: 2025
     role: Department or Title
     type: alumni or current
     ---
     ```

### 📦 CDN Libraries Used

| Library | Purpose | CDN |
|---------|---------|-----|
| Tailwind CSS | Styling framework | `cdn.tailwindcss.com` |
| Lucide Icons | Icon system | `unpkg.com/lucide` |
| GSAP | Animations | `cdnjs.cloudflare.com/ajax/libs/gsap` |
| AOS | Scroll animations | `unpkg.com/aos` |
| Splide | Carousel | `cdn.jsdelivr.net/npm/@splidejs/splide` |
| Google Fonts | Typography | `fonts.googleapis.com` |

### 🎯 Next Steps

1. Add actual logo images to `assets/img/`
2. Complete remaining pages (about, projects, quotes, contact)
3. Test GitHub API integration
4. Add QUOTES.md to main repository
5. Deploy to production

### 📄 License

MIT License - See LICENSE file

---

**Built with ❤️ by MWECAU ICT Club**  
*Inspire · Innovate · Integrate*
