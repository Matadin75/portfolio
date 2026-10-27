export type Category = "web" | "mobile" | "backend" | "payments";

/** Colour tokens defined in globals.css as --c-<name>. */
export type Accent = "aqua" | "violet" | "coral" | "amber" | "lime";

export type Project = {
  slug: string;
  name: string;
  url?: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  categories: Category[];
  accent: Accent;
};

export type Role = {
  title: string;
  company: string;
  period: string;
  points: string[];
};

export const categoryLabels: Record<Category, string> = {
  web: "Web",
  mobile: "Mobile",
  backend: "Backend",
  payments: "Payments",
};

export const profile = {
  name: "Saien Matadin",
  title: "Full-Stack Developer",
  location: "Johannesburg, South Africa",
  email: "saien.matadin@gmail.com",
  // Fill these in to show the links; empty values are hidden.
  github: "https://github.com/Matadin75",
  linkedin: "",
  summary:
    "From the first screen to the database and the deploy. Five products shipped with real-time chat, push notifications and payments, across TypeScript, React Native and .NET.",
  // Cycled in the hero: "I build <word> end to end."
  builds: ["web platforms", "mobile apps", "payment flows", "real-time chat"],
};

export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 5, label: "products shipped" },
  { value: 4, label: "payment rails integrated" },
  { value: 4, suffix: "+", label: "years full-stack" },
];

export const techStrip = [
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  ".NET",
  "ASP.NET Core",
  "SignalR",
  "MySQL",
  "Docker",
  "AWS",
  "OneSignal",
  "Stitch",
  "PayM8",
  "Jest",
  "Vitest",
];

export const projects: Project[] = [
  {
    slug: "ice-games",
    name: "ICE Games",
    url: "https://icegames.co.za",
    role: "Core developer",
    period: "2026",
    summary: "A subscription web arcade with companion iOS and Android apps.",
    highlights: [
      "Card billing on the web (Stitch) and App Store / Google Play subscriptions, plus an in-app store for cosmetic sets and themes.",
      "Google, Apple and Facebook sign-in, OneSignal push with deep links, referrals and account deletion.",
      "Dockerised the API for production and worked on the AI game-generation pipeline.",
    ],
    stack: ["TypeScript", "Preact", "Vite", "Vitest", ".NET 10", "MySQL", "React Native", "Docker"],
    categories: ["web", "mobile", "backend", "payments"],
    accent: "aqua",
  },
  {
    slug: "secondspace",
    name: "SecondSpace",
    url: "https://www.secondspace.co.za",
    role: "Main developer",
    period: "2022 – 2025",
    summary: "A student-living platform for university residences: student app, management portal and API.",
    highlights: [
      "Residence management: rooms, applications and approvals, staff, announcements and maintenance tickets with live chat.",
      "Student services: accommodation listings with geocoding, a textbook marketplace, tutors, events and a wellness dashboard.",
      "Real-time chat (SignalR), push (AWS SNS), S3 media, Identity/JWT auth, deployed with Docker.",
    ],
    stack: [".NET MAUI", "ASP.NET Core", "SignalR", "EF Core", "MySQL", "AWS"],
    categories: ["web", "mobile", "backend"],
    accent: "violet",
  },
  {
    slug: "youtoo",
    name: "YouToo",
    url: "https://youtoo.co.za",
    role: "Main developer",
    period: "2022 – present",
    summary: "A community and events platform with an organiser dashboard and mobile apps.",
    highlights: [
      "Event creation and discovery with ranged and recurring events, QR-code check-in and organiser analytics.",
      "Real-time event chat and direct messaging, notice boards, ratings and push notifications.",
      "App Store / Google Play subscriptions, Google and Apple sign-in, and a background worker for reminders and renewals.",
    ],
    stack: ["React Native", "TypeScript", ".NET MAUI", "ASP.NET Core", "Quartz", "OneSignal"],
    categories: ["web", "mobile", "backend", "payments"],
    accent: "coral",
  },
  {
    slug: "uptooyoo",
    name: "Uptooyoo",
    url: "https://uptooyoo.com",
    role: "Main web developer",
    period: "2024 – 2026",
    summary: "A service marketplace where providers list services and take bookings.",
    highlights: [
      "Service listings, booking flow and history, and onboarding that generates each provider's own website.",
      "PayM8 card payments with instalments and subscriptions, plus disputes, reviews and transactional email.",
      "Google and Apple sign-in, and a worker service for subscription checks, emails and media clean-up.",
    ],
    stack: ["ASP.NET Core", "C#", "EF Core", "MySQL", "Quartz", "PayM8"],
    categories: ["web", "backend", "payments"],
    accent: "amber",
  },
  {
    slug: "forfishsake",
    name: "Forfishsake",
    url: "https://forfishsake.com",
    role: "Developer",
    period: "2026",
    summary: "A React Native app for anglers: catch logging, maps and a social feed.",
    highlights: [
      "Sign-up with Google and Apple, and the subscription flow with free trials and store receipt verification.",
      "Admin hub web dashboard, OneSignal push service, password reset and Excel/CSV data import.",
    ],
    stack: ["React Native", "TypeScript", "ASP.NET Core", "MySQL", "OneSignal"],
    categories: ["mobile", "backend", "payments"],
    accent: "lime",
  },
];

export const experience: Role[] = [
  {
    title: "Full-Stack Developer",
    company: "The Rich Rewards Group",
    period: "2022 – present",
    points: [
      "Build, deploy and support web and mobile products, owning features from UI through API and database to production.",
      "Main developer on SecondSpace, YouToo and the Uptooyoo web platform; core developer on ICE Games.",
    ],
  },
  {
    title: "Software Developer",
    company: "Enterprise Outsourcing",
    period: "",
    points: [
      "Enterprise apps for contracts, procurement, stock, orders, invoices and logistics in C# and Xamarin.Forms.",
      "Custom PDF builder and viewer; code-first databases and WebAPI services following Clean Architecture.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "C#", "SQL", "Java"] },
  { group: "Frontend & mobile", items: ["React", "Next.js", "React Native", "Preact", "Vite", ".NET MAUI", "Xamarin.Forms"] },
  { group: "Backend", items: ["ASP.NET Core", "REST APIs", "SignalR", "Identity / JWT", "Quartz", "Clean Architecture"] },
  { group: "Data", items: ["MySQL", "SQL Server", "EF Core"] },
  { group: "Testing & delivery", items: ["Jest", "React Testing Library", "Vitest", "xUnit", "GitHub Actions", "Docker", "AWS"] },
  { group: "Integrations", items: ["Stitch", "PayM8", "App Store / Google Play billing", "OneSignal", "Firebase"] },
];

export const education = {
  degree: "Bachelor's degree in Information Technology",
  school: "Pearson Institute of Higher Education",
  period: "2017 – 2020",
};
