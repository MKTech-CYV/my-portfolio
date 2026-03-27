const person = {
  firstName: "Tran",
  lastName: "Minh Khoi",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Mobile & Web Developer",
  avatar: "/images/gallery/avatar-2.jpeg",
  email: "contact@tranminhkhoi.dev",
  timezone: "Asia/Ho_Chi_Minh",
  location: "Ho Chi Minh City, Vietnam",
  languages: ["English", "Vietnamese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Let's work together</>,
  description: (
    <>
      Interested in collaborating? Drop your email and I'll get back to you within 1-2 business days 
      to discuss potential opportunities.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/win070802",
  },
  {
    name: "Phone",
    icon: "phone",
    link: "tel:+84988204060",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/tranminhkhoi-it-dev/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Paypal",
    icon: "paypal",
    link: "https://www.paypal.com/paypalme/win070802",
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Khoi Portfolio</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">PHATDAT eCITIZEN</strong>
      </>
    ),
    href: "/projects/phat-dat-ecitizen",
  },
  subline: (
    <>
      I'm Tran Minh Khoi, a {person.role} based in Ho Chi Minh City, Vietnam.
      <br /> 
    </>
  ),
};

const about = {
  path: "/",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.timezone}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://tranminhkhoi.dev/contact",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Mobile & Web Developer based in Vietnam, focused on building high-performance, user-centric applications. I bridge design and technology to deliver seamless experiences across platforms.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "PHAT DAT HOLDINGS",
        companyLink: "https://phatdatholdings.com.vn",
        timeframe: "8/2024 - Present",
        role: "Mobile & Web Developer",
        achievements: [
          <>
            Developed and maintained internal mobile applications and websites,
            enhancing productivity and cross-department communication.
          </>,
          <>
            Supported IT infrastructure and device management, including
            helpdesk operations and Microsoft 365 administration.
          </>,
        ],
        images: [
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Information Technology - Software Engineering",
        degree: "Bachelor's Degree",
        timeframe: "2020 - 2024",
        university: "Duy Tan University",
        location: "Da Nang, Vietnam",
        status: "Graduated",
        highlights: [
          "Class leader of cohort K26TPM2",
          "Led university-level scientific research project, awarded Consolation Prize",
        ],
        relevantCourses: [
          "Web Development",
          "Database Systems",
          "Software Architecture",
          "Data Structures & Algorithms",
          "Object-Oriented Programming"
        ],
        projects: [
          {
            name: "C2C E-Commerce Platform",
            description: "Customer-to-customer marketplace built with Laravel and Vue.js",
            tech: ["PHP", "Laravel", "Vue.js", "phpMyAdmin"]
          },
          {
            name: "Electronics E-Commerce Website",
            description: "Online store for electronic devices built with Windows Forms",
            tech: ["C#", ".NET Framework", "SQL Server"]
          }
        ]
      }
    ]
  },
  certificationAndDiploma: {
    display: true, // set to false to hide this section
    title: "Certification & Diploma",
    institutions: [
      {
        name: "Search Engine Optimization",
        timeframe: "2024",
        address: "Online Course - Udemy",
        achievements: [
          <>Completed Udemy SEO course</>,
        ],
      },
      {
        name: "PHP Laravel Development",
        timeframe: "2023-2023",
        address: "DZFullStack - Da Nang, Vietnam",
        achievements: [
          <>Completed Full Stack Development course</>,
          <>Learned how to build web applications using PHP Laravel</>,
          <>
            Developed a strong understanding of web development best practices
          </>,
        ],
      },
      {
        name: "Graphic Design",
        timeframe: "2021-2022",
        address: "iDesign - Da Nang, Vietnam",
        achievements: [
          <>Mastered Adobe Creative Suite design tools</>,
          <>
            Learned how to create visual content for social media and marketing
            campaigns
          </>,
          <>Developed a strong understanding of branding and visual identity</>,
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend & Mobile Development",
        description: (
          <>
            Proficient in React.js and React Native. Skilled in building responsive web apps and cross-platform mobile apps using modern React patterns like hooks, context API, and Redux.
          </>
        ),
        images: [],
      },
      {
        title: "Backend Development",
        description: (
          <>
            Experienced with Node.js and Express.js. Focused on building clean, scalable APIs and integrating with relational databases.
          </>
        ),
        images: [],
      },
      {
        title: "Database",
        description: (
          <>
            Proficient in MySQL. Able to design schemas, write efficient queries, and ensure data performance and integrity.
          </>
        ),
        images: [],
      },
      {
        title: "UI/UX Design",
        description: (
          <>
            Skilled in Figma. Capable of designing clean, user-friendly interfaces and responsive layouts.
          </>
        ),
        images: [],
      },
      {
        title: "Graphic Design",
        description: (
          <>
            Proficient in Illustrator, Photoshop, and After Effects. Able to create visuals, branding assets, and motion graphics.
          </>
        ),
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "About Tran Minh Khoi",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/projects",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Professional workspace setup with modern design elements - Tran Minh Khoi portfolio",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "Creative development environment showcasing modern web technologies",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "Mobile app development workspace with multiple devices and coding setup",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "UI/UX design process with Figma mockups and design system components",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Professional portrait of Tran Minh Khoi - Mobile & Web Developer",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "Close-up of coding session with React Native development",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "Office setup featuring dual monitors and modern development tools",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "Creative brainstorming session with design sketches and wireframes",
      orientation: "vertical",
    },
  ],
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: `Contact – ${person.name}`,
  description: `Get in touch with ${person.name}`,
  intro: {
    display: true,
    title: "Get in Touch",
    description: (
      <>
        I'm always open to discussing new opportunities, collaborations, and interesting projects. 
        Whether you have a specific project in mind or just want to connect, feel free to reach out!
      </>
    ),
  },
  availability: {
    display: true,
    title: "Availability",
    description: (
      <>
        I'm currently available for freelance projects and full-time opportunities. 
        I typically respond within 1-2 business days.
      </>
    ),
  },
  location: {
    display: true,
    title: "Location",
    description: (
      <>
        Based in Ho Chi Minh City, Vietnam (GMT+7). 
        Open to remote work and international collaborations.
      </>
    ),
  },
  services: {
    display: true,
    title: "Services I Offer",
    items: [
      "Mobile App Development (React Native)",
      "Web Development (React.js, Next.js, Vuejs)",
      "Backend Development (Node.js, Laravel)",
      "UI/UX Design (Figma)",
      "Database Design & Optimization (MySQL, PostgreSQL)",
      "SEO Optimization",
      "Office 365 Administration",
      "Graphic Design (Photoshop, Illustrator, After Effects, Canva)"
    ],
  },
};

const eCard = {
  path: "/e-card",
  label: "E-Card",
  title: `E-Card – ${person.name}`,
  description: `Digital business card for ${person.name}`,
  intro: {
    display: true,
    title: "Digital Business Card",
    description: (
      <>
        Scan the QR code below or save my contact information directly to your device.
      </>
    ),
  },
  contact: {
    name: person.name,
    email: person.email,
    phone: "+84 988 204 060",
    location: "Ho Chi Minh City, Vietnam",
  },
};

export { person, social, newsletter, home, about, blog, work, gallery, contact, eCard };
