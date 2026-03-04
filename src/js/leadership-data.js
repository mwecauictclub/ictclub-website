// Leadership data structure for MWECAU ICT Club

const leadershipStructure = {
    // Executive Committee
    executive: {
        chairperson: {
            name: "Edward Mangu",
            role: "Chairperson",
            year: "2023-Present",
            github: null // Add if available
        },
        viceChairperson: {
            name: "To Be Announced",
            role: "Vice Chairperson",
            year: "2025-2026",
            github: null
        },
        secretary: {
            name: "To Be Announced",
            role: "Secretary",
            year: "2025-2026",
            github: null
        },
        assistantSecretary: {
            name: "To Be Announced",
            role: "Assistant Secretary",
            year: "2025-2026",
            github: null
        }
    },
    
    // Project Managers (Max 3)
    projectManagers: [
        {
            name: "Cleven",
            github: "cleven12",
            year: "2024-2026"
        },
        // {
        //         name: "Faustine Emanuel",
        //         github: "FaustineEmmanuel",
        //         year: "2025-2026"
        // }
        // Add third PM
    ],
    
    // Department Leaders (2 per department)
    departmentLeaders: {
        programming: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ],
        cybersecurity: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ],
        networking: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ],
        maintenance: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ],
        graphics: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ],
        aiml: [
            { name: "Leader 1", year: "2025-2026" },
            { name: "Leader 2", year: "2025-2026" }
        ]
    },
    
    // Honorable Positions - ICT members in student organizations
    honorablePositions: {
        mwecauso: [
            // MWECAUSO leadership positions
            { name: "Member Name", position: "Parliament/Minister", year: "2025-2026" }
        ]
    },
    
    // Historical Leadership Timeline
    timeline: [
        {
            year: "2023-2024",
            chairperson: "Edward Mangu",
            secretary: "To Be Added",
            highlights: "Club founded, first sessions"
        },
        {
            year: "2024-2025",
            chairperson: "Edward Mangu",
            secretary: "To Be Added",
            highlights: "Expanded to 6 departments"
        },
        {
            year: "2025-2026",
            chairperson: "Edward Mangu",
            secretary: "To Be Added",
            highlights: "Current academic year"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = leadershipStructure;
}
