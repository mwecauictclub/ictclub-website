// Projects data - Add/edit projects here
const clubProjects = [
    {
        id: 1,
        title: "Robotics Project",
        category: "Robotics",
        shortDesc: "Build bots, program controllers, and test in real scenarios.",
        techStack: ["C", "C++", "Arduino", "Raspberry Pi"],
        fullDesc: "A comprehensive robotics initiative where members design, build, and program autonomous robots. Projects include line-following bots, obstacle-avoidance systems, and remote-controlled vehicles. Members learn embedded systems, sensor integration, and real-time programming.",
        image: "assets/img/projects/robotics.jpg",
        status: "Active",
        year: "2024-2026",
        githubUrl: null, // Add GitHub URL if available
        liveUrl: null // Add live demo URL if available
    },
    {
        id: 2,
        title: "Home Appliance IoT",
        category: "IoT",
        shortDesc: "Explore cybersecurity and automation for smart, safer homes.",
        techStack: ["Python", "IoT", "MQTT", "Node.js", "Security"],
        fullDesc: "Smart home automation system focusing on security and convenience. Features include remote monitoring, automated lighting, temperature control, and intrusion detection. Emphasizes cybersecurity best practices for IoT devices and encrypted communications.",
        image: "assets/img/projects/iot.jpg",
        status: "Active",
        year: "2025-2026",
        githubUrl: null,
        liveUrl: null
    },
    {
        id: 3,
        title: "Club Website",
        category: "Web Development",
        shortDesc: "Official MWECAU ICT Club website with modern design.",
        techStack: ["HTML", "Tailwind CSS", "JavaScript", "GitHub API"],
        fullDesc: "The official club website featuring dynamic content loading from GitHub, interactive maps, member quotes system, and comprehensive information about club activities. Built with modern web technologies and hosted on Netlify.",
        image: "assets/img/projects/website.jpg",
        status: "Active",
        year: "2024-2026",
        githubUrl: "https://github.com/mwecauictclub/ictclub-website",
        liveUrl: "https://mwecauictclub.netlify.app" // Update with actual URL
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = clubProjects;
}
