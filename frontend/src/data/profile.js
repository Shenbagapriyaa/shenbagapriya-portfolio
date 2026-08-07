// Static fallback data sourced from the resume — used until the backend/admin
// dashboard is populated. Every component reads from here first, then can be
// swapped to fetch from the API (see src/api/axios.js) once the backend is deployed.

export const profile = {
  name: 'Shenbagapriya N',
  roles: [
    'Software Developer',
    'Full Stack Developer',
    'React Developer',
    'MERN Stack Developer',
    
    'Python Developer'
  ],
  tagline: 'Building innovative software solutions with full-stack development, AI and modern technologies.',
  bio: [
    [
  "I am a final-year B.Tech Computer Science & Business Systems student at Dr. N.G.P Institute of Technology with an 8.82 CGPA, passionate about developing reliable and innovative software solutions with strong problem-solving skills and a focus on real-world impact.",

  "I have strong knowledge of programming and software development technologies including Python, Java, Django, HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB and MySQL. During my internship at Wipro 3D, Bengaluru, I developed Python-based desktop applications for additive manufacturing workflows.",

  "I have contributed to research through an IEEE publication on Smart Alumni Management System and presented my work at IISc Bangalore. I am seeking a Software Developer opportunity where I can apply my technical expertise, continuously enhance my skills and contribute to building meaningful software products."
]
  ],
  email: 'priyanarayanasamy2005@gmail.com',
  phone: '+91 6385350315',
  whatsappNumber: '916385350315',
  location: 'Tiruppur, Tamil Nadu, India',
  linkedin: 'https://www.linkedin.com/in/shenbagapriya-n-947b92289/',
  github: 'https://github.com/shenbagapriyaa',
  githubUsername: 'Shenbagapriyaa',
  leetcode: 'https://leetcode.com/shenbagapriya_12/',
  openToWork: true
};

export const education = [
  { date: '2021', title: 'SSLC — Eden Gardens Matric Higher Secondary School', detail: 'Passed' },
  { date: '2023', title: 'HSC — Jaivabai Model Girls Higher Secondary School', detail: '86%' },
  { date: '2023 – 2027', title: 'B.Tech CSBS — Dr. N.G.P Institute of Technology', detail: 'CGPA: 8.82 ' }
];

export const experience = [
  {
    company: 'Wipro 3D, Bengaluru',
    role: 'Python Developer Intern',
    startDate: 'Jun 2025',
    endDate: 'Jul 2025',
    responsibilities: [
      'Developed a Python-based 3D CAD File Analyzer desktop application to process STL, OBJ, and PLY files, calculating volume, surface area, and dimensional parameters.',
      'Built a Python-based URL Notifier desktop application to monitor website updates and deliver automated real-time notifications.',
      'Designed automation tools to improve workflow efficiency for additive manufacturing processes.'
    ],
    technologies: [
      'Python',
      'Tkinter',
      'SQLite',
      'NumPy',
      'Trimesh',
      'Open3D',
      'CadQuery',
      
      'Desktop Applications',
      'Automation'
    ]
  }
];

export const projects = [
  {
    title: 'Alumni Management System',
    description: 'Full-stack platform to manage alumni records, events and networking  with authentication, dynamic dashboards and communication features on the MERN stack.',
    techStack: ['React.js', 'CSS', 'Express.js', 'MongoDB'],
    githubUrl: 'https://github.com/Shenbagapriyaa/alumni-management-system',
    liveUrl: '#',
    emoji: '🎓',
    gradient: 'from-[#4C1D95] via-[#7C3AED] to-[#06B6D4]'
  },
  {
    title: 'Fruit Juice Website',
    description: 'Responsive landing page with reusable React components, smooth scrolling and modern animation work using Tailwind CSS, Framer Motion and GSAP.',
    techStack: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    githubUrl: 'https://github.com/Shenbagapriyaa/fruit-juice-ui-',
    liveUrl: '#',
    emoji: '🍹',
    gradient: 'from-[#EC4899] via-[#F472B6] to-[#A855F7]'
  },
  {
    title: 'URL Shortener',
    description: 'URL shortening website with custom aliases, QR code generation, click analytics and JWT-based authentication for secure link management.',
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/Shenbagapriyaa/url-shortener',
    liveUrl: '#',
    emoji: '🔗',
    gradient: 'from-[#38BDF8] via-[#60A5FA] to-[#A5F3FC]'
  }
];
export const skills = {
  Programming: [
    { name: 'C' },
    { name: 'Java' },
    { name: 'Python' },
    { name: 'JavaScript' }
  ],

  Frontend: [
    { name: 'HTML5 / CSS3' },
    { name: 'React.js' },
    { name: 'Tailwind CSS' },
    { name: 'Framer Motion / GSAP' }
  ],

  Backend: [
    { name: 'Node.js / Express.js' },
    { name: 'Django' },
    { name: 'REST APIs' }
  ],

  Database: [
    { name: 'MongoDB' },
    { name: 'MySQL' }
  ],

  'AI Technologies': [
    { name: 'Machine Learning Basics' },
    { name: 'Generative AI Concepts' }
  ],

  Tools: [
    { name: 'Git & GitHub' },
    { name: 'Figma / Canva' },
    { name: 'VS Code' }
  ]
};
export const achievements = [
  { 
    icon: '🏆', 
    title: 'Winner, TechBingo — Blaze25', 
    org: 'Government College of Technology, Coimbatore' 
  },
  { 
    icon: '🥈', 
    title: 'Finalist, TNWISE Hackathon 2025', 
    org: 'Kumaraguru College of Technology, Coimbatore' 
  },
  { 
    icon: '🤖', 
    title: 'Finalist, Agentathon 2025', 
    org: 'Google Developers Group, Mallareddy University, Hyderabad' 
  },
  { 
    icon: '📚', 
    title: 'Best Library User Award', 
    org: 'Dr. N.G.P Institute of Technology  2024–25' 
  },
  { 
    icon: '📄', 
    title: 'IEEE Publication — Smart Alumni Management System', 
    org: 'Vikrant University, Gwalior - 2026' 
  },
  { 
    icon: '🎤', 
    title: 'Conference Paper Presentation — ICIPRRDAC', 
    org: 'Community Reporting System for Road Safety , IISc Bangalore' 
  }
];

export const certifications = [
  { title: 'Diploma in C Programming', issuer: 'CSC', grade: 'First Class with Distinction', date: 'Nov 2024 – Jan 2025', icon: '🎓' },
  { title: 'Python Programming Certification', issuer: 'CSC', grade: 'Excellent Grade', date: 'Jan 2025 – Mar 2025', icon: '🐍' },
  { title: 'Elite Certificate in IoT', issuer: 'NPTEL, IIT Kharagpur', grade: '', date: 'Aug 2025 – Nov 2025', icon: '📡' }
];
