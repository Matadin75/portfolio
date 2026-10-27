export type Category = "web" | "mobile" | "backend" | "payments";

/** How the pieces of a product talk to each other, drawn as a diagram on its case study. Only list what's known. */
export type Architecture = {
  clients: string[];
  api: string;
  data: string[];
  services: string[];
};

export type Project = {
  slug: string;
  name: string;
  /** The live product. Leave it out once the product stops running. */
  url?: string;
  status: "live" | "offline";
  role: string;
  period: string;
  /** One line for cards. */
  summary: string;
  /** The opening paragraph of the case study. */
  overview: string;
  highlights: string[];
  /** What I built, grouped, for the case study. */
  features: { title: string; body: string }[];
  architecture: Architecture;
  stack: string[];
  categories: Category[];
  /*
   * Case-study sections that need your own words. Each is hidden until filled in, rather than guessed:
   *   challenge: the product or technical problem, in a sentence or two.
   *   decisions: important technical choices and why they were made.
   *   outcomes:  verified results only (launches, usage, performance), no estimates.
   *   repo:      a public repository URL, if there is one.
   */
  challenge?: string;
  decisions?: string[];
  outcomes?: string[];
  repo?: string;
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
  country: "South Africa",
  email: "saien.matadin@gmail.com",
  // Fill these in to show the links; empty values are hidden.
  github: "",
  linkedin: "https://www.linkedin.com/in/saien-matadin-b5b186180",
  headline: { lead: "Building digital products that solve", highlight: "real problems" },
  summary:
    "I build web platforms, mobile applications, payment flows, and real-time experiences end to end — from the first screen to the database and production deployment.",
  message: "I don't just write code. I build, integrate, and ship complete digital products.",
  about: [
    "I'm a full-stack developer in Johannesburg. Since 2022 I've built, deployed and supported web and mobile products at The Rich Rewards Group, owning features from the interface through the API and database to production.",
    "Across five products that has meant App Store and Google Play subscriptions, card payments and payouts, real-time chat and video calls, push notifications, bookings, background workers, admin tools and an AI game generator, in TypeScript, JavaScript, React Native and .NET. Before that I built enterprise apps for contracts, procurement and logistics in C# and Xamarin.Forms, following Clean Architecture.",
  ],
};

/** What I bring, shown in the About section. */
export const principles: { title: string; body: string }[] = [
  { title: "End-to-end ownership", body: "Features go from the first screen through the API and database to the deploy." },
  { title: "Practical problem-solving", body: "Start from what the product needs, then build the simplest thing that holds up in production." },
  { title: "Maintainable architecture", body: "Layered services, typed clients and tests, so the next change stays cheap." },
  { title: "Cross-platform", body: "One API behind web, iOS and Android, with apps shipped in .NET MAUI and React Native." },
  { title: "Production experience", body: "Live systems with real payments, push notifications and background workers." },
  { title: "Always learning", body: "From Xamarin.Forms to .NET MAUI and React Native, from .NET to Preact and Vite, and lately to AI game generation with Claude." },
];

export const techStrip = ["TypeScript", "JavaScript", "React", "Next.js", "React Native", ".NET", "ASP.NET Core", "SignalR", "MySQL", "Docker", "AWS"];

export const projects: Project[] = [
  {
    slug: "ice-games",
    name: "ICE Games",
    url: "https://icegames.co.za",
    status: "live",
    role: "Core developer",
    period: "2026",
    summary: "A subscription web arcade with iOS and Android apps, cosmetics and AI-generated games.",
    overview:
      "ICE Games is a subscription gaming platform: a web arcade with its own game engine, iOS and Android apps, and the .NET API, billing and AI game generator behind them. As a core developer I built most of the payments, sign-in, push notifications and native app work, and the parts pipeline behind AI-generated games. The engine and most of the games are a colleague's work.",
    highlights: [
      "Built App Store and Google Play billing end to end: StoreKit 2 and Play purchases in the app, server-side receipt verification, and Standard and Premium plans kept in step with each store.",
      "Google, Apple and Facebook sign-in through Firebase on web and in the app, with account linking, email confirmation, reCAPTCHA and account deletion that checks billing first.",
      "Designed the AI game generator's parts pipeline, which assembles games from a tested parts library, plus templates, cost tracking and the move from OpenAI to Claude Sonnet.",
      "OneSignal push across web, iOS and Android with notification categories, leaderboard alerts and deep links, and a cosmetics store with animated themes and avatar sets.",
    ],
    features: [
      { title: "Store billing", body: "StoreKit 2 and Google Play purchases through react-native-iap, verified on the server with Apple's App Store Server API and the Google Play Developer API, with Standard and Premium plans, upgrades and downgrades, and renewals checked by polling each store." },
      { title: "Card billing", body: "A Stitch card gateway with signed webhooks, built and ready to switch on, and account deletion that won't close an account while any billing provider is still charging it." },
      { title: "Accounts and sign-in", body: "Firebase-verified Google, Apple and Facebook sign-in on web and in the app, account linking, email confirmation, password reset, reCAPTCHA v3, and friends and referrals." },
      { title: "Cosmetics store", body: "Custom themes with animated backgrounds, avatar and frame sets, coin packs, safe SVG handling, an AI cosmetic designer on Claude, and admin tools for managing sets." },
      { title: "Push and deep links", body: "OneSignal on web, iOS and Android with per-category settings, leaderboard alerts, a scheduled digest, admin announcements, and app links that open the right page." },
      { title: "Mobile apps", body: "The native side of the React Native apps: an animated splash, sign-in, payment and push bridges to the site, and auto-reload when a new site version ships." },
      { title: "AI game generation", body: "Designed and built the parts pipeline that assembles games from a tested parts library, with templates, per-machine job queues, retry budgets, cost tracking, and model choices compared on cost and quality." },
      { title: "Production platform", body: "The production Docker and nginx setup, S3 storage for covers and themes, adaptive render quality in the engine, weekly game-build audits, and email templates with unsubscribe." },
    ],
    architecture: {
      clients: ["Web arcade (PWA)", "Admin console", "iOS app", "Android app"],
      api: ".NET 10 API · Docker",
      data: ["MySQL · EF Core", "S3 storage"],
      services: ["App Store / Google Play", "Stitch", "Firebase Auth", "OneSignal", "Claude / OpenAI", "reCAPTCHA", "SMTP email"],
    },
    stack: ["TypeScript", "Preact", "Vite", "Vitest", "React Native", ".NET 10", "EF Core", "MySQL", "xUnit", "Docker", "Firebase", "OneSignal", "Identity / JWT", "Claude API"],
    categories: ["web", "mobile", "backend", "payments"],
  },
  {
    slug: "secondspace",
    name: "SecondSpace",
    url: "https://www.secondspace.co.za",
    status: "live",
    role: "Main developer",
    period: "2022 – 2025",
    summary: "A student-living platform for university residences: student app, management portal and API.",
    overview:
      "SecondSpace is a student-living platform for university residences. Students use the mobile app, residence staff use the management portal, and both run on one API. As main developer from 2022 to 2025 I wrote most of the API and portal and built the .NET MAUI student app on my own, extending features colleagues had started, such as textbooks, tutors and events.",
    highlights: [
      "Built most of the ASP.NET Core API and management portal: residence applications and approvals, staff and student management with CSV bulk upload, and maintenance tickets.",
      "Real-time residence group chat and maintenance-ticket chat over SignalR on the web portal and the mobile app, with push through OneSignal, later moved to AWS SNS.",
      "Built the .NET MAUI student app on my own: residence info, tickets, chat, specials, events, textbooks, tutors, incident reports, accommodation search and move-in inspections.",
      "An accommodation marketplace with Google Maps listings, agencies, enquiries and view analytics, and Google Charts wellness and maintenance dashboards for residence managers.",
    ],
    features: [
      { title: "Residence management", body: "Applications and approvals with notification emails, residence changes, and staff and student management with roles, search and CSV bulk upload of students, staff and rooms." },
      { title: "Maintenance tickets", body: "Logging, editing, closing and reopening tickets with maintenance coordinators and feedback, and real-time chat on each ticket over SignalR, on web and mobile." },
      { title: "Residence chat and announcements", body: "Group chat with messages and pictures, staff moderation of reported messages, and announcements with images and push notifications." },
      { title: "Push notifications", body: "OneSignal from 2023, then an AWS SNS service with platform endpoints and topics, delivering through Firebase Cloud Messaging and APNs." },
      { title: "Dashboards and wellness", body: "Mood check-ins in the app, and Google Charts wellness reports and maintenance dashboards by category, floor and over time in the portal." },
      { title: "Accommodation marketplace", body: "Residence and apartment listings with agencies and agents, enquiries, view analytics, Google Maps and Places, distance ordering and drag-to-reorder images on S3, plus move-in inspection contracts." },
      { title: "Student life", body: "Drink specials, favourites and restaurant events, and textbooks, tutors and events extended from a colleague's start, plus incident and crime reporting with location and media." },
      { title: "Student app and platform", body: "The .NET MAUI app for Android and iOS on my own, the upgrade from .NET 7 to .NET 9, the move from SQL Server back to MySQL, and a portal redesign." },
    ],
    architecture: {
      clients: ["Student app (.NET MAUI)", "Management portal (web)"],
      api: "ASP.NET Core API · Docker",
      data: ["MySQL · EF Core", "Amazon S3"],
      services: ["SignalR chat", "AWS SNS · FCM / APNs", "OneSignal", "Google Maps · Places", "SMTP email"],
    },
    stack: ["C#", ".NET MAUI", "ASP.NET Core", "JavaScript", "jQuery", "SignalR", "EF Core", "MySQL", "SQL Server", "AWS", "Firebase", "OneSignal", "Docker", "Identity / JWT"],
    categories: ["web", "mobile", "backend"],
  },
  {
    slug: "youtoo",
    name: "YouToo",
    status: "offline",
    role: "Main developer",
    period: "2022 – 2026",
    summary: "A community and events platform: mobile apps, an organiser dashboard and a vendor marketplace.",
    overview:
      "YouToo was a community and events platform: people found and joined events in the mobile apps, organisers ran them from a web dashboard, and vendors applied for work at events. I built almost all of it from 2022 to 2026: the ASP.NET Core API, the organiser dashboard, the data layer and background worker, and three generations of mobile app, from an Expo prototype to the .NET MAUI app that shipped to the App Store and Google Play, then a React Native rewrite. The product is no longer running.",
    highlights: [
      "Built the back end almost single-handedly: the ASP.NET Core REST API, the Razor organiser dashboard, a MySQL and EF Core data layer, and a Quartz worker for reminders and renewals.",
      "Shipped the .NET MAUI app to the App Store and Google Play, with SignalR event chat, location check-in and native subscriptions, then rewrote it in React Native.",
      "Three-tier App Store and Google Play subscriptions with in-store upgrades and downgrades, server-side purchase checks against Apple's and Google's APIs, and plan-based access.",
      "A vendor marketplace where organisers post opportunities and vendors apply, alongside ranged and recurring events, QR check-in, notice boards, ratings and push notifications.",
    ],
    features: [
      { title: "Events", body: "Creation and discovery with personalised categories, saved events, a calendar and history, ranged and recurring events, and media galleries." },
      { title: "Organiser dashboard", body: "Razor views with hand-written JavaScript and jQuery: event forms with Google Places autocomplete, drag-and-drop image ordering and repeat rules, and a live inbox on the SignalR JavaScript client." },
      { title: "Check-in and analytics", body: "Location check-in in the MAUI app, then QR-code check-in, with organiser analytics charted in Chart.js and Google Charts, configurable widgets and activity tracking." },
      { title: "Messaging and community", body: "Event group chat over SignalR with unread counts, direct messages with attachments, notice boards with organiser Q&A, and post-event ratings." },
      { title: "Vendor marketplace", body: "Organisers post opportunities with a budget and deadline and vendors apply, with vendor and business profiles, a role switcher and business account transfer." },
      { title: "Subscriptions", body: "Vendor and organiser tiers on the App Store and Google Play, upgrades and downgrades inside the store, server-side checks with Apple's and Google's APIs, plan-based access and an admin whitelist." },
      { title: "Mobile apps", body: "An Expo prototype in 2023, the .NET MAUI app that shipped to both stores with native Google Places and store billing, and a React Native rewrite tested with Jest." },
      { title: "Sign-in, push and background jobs", body: "ASP.NET Identity with JWT, Google and Apple sign-in through Firebase, push through AWS SNS and later OneSignal, and Quartz jobs for reminders, rating prompts and renewal checks." },
      { title: "Infrastructure", body: "Moved the database from SQL Server to MySQL, ran the API, web app and worker in Docker, and stored media in S3-compatible storage." },
    ],
    architecture: {
      clients: [".NET MAUI app", "React Native app", "Organiser dashboard (web)"],
      api: "ASP.NET Core API · Docker",
      data: ["MySQL · EF Core", "S3 storage"],
      services: ["SignalR chat", "App Store / Google Play", "Firebase Auth", "AWS SNS", "OneSignal", "Google Places", "Quartz worker"],
    },
    stack: ["C#", ".NET MAUI", "React Native", "TypeScript", "JavaScript", "jQuery", "ASP.NET Core", "SignalR", "EF Core", "MySQL", "Quartz", "OneSignal", "Firebase", "AWS", "Docker", "Identity / JWT", "Jest"],
    categories: ["web", "mobile", "backend", "payments"],
  },
  {
    slug: "uptooyoo",
    name: "Uptooyoo",
    status: "offline",
    role: "Main web developer",
    period: "2024 – 2026",
    summary: "A service marketplace where providers list services and take bookings.",
    overview:
      "Uptooyoo was a service marketplace: providers listed their services and took bookings, and onboarding gave each provider their own website. I started on an earlier version of the product in 2024, and when it was rebuilt as a services marketplace in 2025 I built nearly all of the web app, its PayM8 payments and subscriptions, and the background worker. A colleague built the API and the mobile app. The product is no longer running.",
    highlights: [
      "Built nearly all of the ASP.NET Core web app: service listings, the booking flow and history, and a JavaScript calendar that works out open time slots.",
      "Integrated PayM8 for card payments, add-ons, subscriptions and provider payouts, with payments held in escrow and released by a Quartz worker after 14 days.",
      "Built the eight-step provider onboarding and the template system that gave each provider their own website on a subdomain.",
      "Wrote the web chat with media, location sharing and meeting scheduling, plus WebRTC video calls over a TURN server and a WebSocket relay.",
    ],
    features: [
      { title: "Marketplace web app", body: "The ASP.NET Core Razor web app: home, search, service pages, saved services, the booking flow and booking history, designed to work on mobile." },
      { title: "Booking calendar", body: "Written in JavaScript: open time slots built from each provider's operating hours, existing bookings and service length, with overlap checks." },
      { title: "Chat and video calls", body: "Web chat over a WebSocket relay with media, PDFs, Mapbox location sharing and meeting scheduling, and WebRTC video calls through a TURN server." },
      { title: "Onboarding and provider websites", body: "An eight-step setup wizard with Unsplash image search and drag-and-drop image ordering, which generated each provider a templated website on their own subdomain." },
      { title: "Payments and escrow", body: "PayM8 card capture, booking payments held in escrow and released after 14 days with dispute refunds, add-ons, subscription billing, and provider payouts to verified bank accounts." },
      { title: "Worker service", body: "A Quartz worker that reconciles subscriptions, releases held payments after 14 days with dispute refunds, handles payouts and deemed acceptance, sends reminder emails and cleans up media." },
      { title: "Trust and sign-in", body: "Disputes and reviews, Google and Apple sign-in through Firebase on ASP.NET Identity, reCAPTCHA, OneSignal web push and transactional email." },
      { title: "Product marketplace", body: "A buy-and-sell marketplace with listings, offers negotiated in chat, escrow-protected orders with handover, seller payouts, reviews and notifications." },
    ],
    architecture: {
      clients: ["Marketplace web app", "Provider websites", "Mobile app"],
      api: "ASP.NET Core · Docker",
      data: ["MySQL · EF Core", "Amazon S3"],
      services: ["PayM8", "WebSocket chat relay", "WebRTC video (TURN)", "Firebase Auth", "OneSignal", "Mapbox", "SMTP email", "Quartz worker"],
    },
    stack: ["C#", "ASP.NET Core", "JavaScript", "jQuery", "WebRTC", "WebSockets", "EF Core", "MySQL", "Quartz", "PayM8", "OneSignal", "Firebase", "AWS", "Docker", "Identity / JWT"],
    categories: ["web", "backend", "payments"],
  },
  {
    slug: "forfishsake",
    name: "ForFishSake",
    url: "https://forfishsake.com",
    status: "live",
    role: "Developer",
    period: "2026",
    summary: "A React Native app for anglers: catch logging, maps and a social feed.",
    overview:
      "ForFishSake is a React Native app for anglers, with catch logging, maps and a social feed, backed by an ASP.NET Core API. I built the sign-up and Google and Apple sign-in, the subscription flow and its server-side purchase checks, the account emails and push service, and the whole admin hub. The rest of the app is a colleague's work.",
    highlights: [
      "Built Google and Apple sign-in through Firebase in the React Native app, with matching registration, login and session-renewal endpoints on the ASP.NET Core API.",
      "Built the subscription flow: a react-native-iap paywall with plan cards and free-trial eligibility, and server-side purchase checks with Apple's App Store Server API and Google Play.",
      "Built the ASP.NET Core MVC admin hub on my own: moderation of reported posts and user strikes, content, species and waypoint management, S3 uploads and Excel/CSV import.",
      "Backend services for OneSignal push, SMTP account emails, account deletion, and a public web page for each shared catch.",
    ],
    features: [
      { title: "Sign-up and social login", body: "Google and Apple sign-in through Firebase in the app, with register, login and session-renewal endpoints on the API, and onboarding and location-permission screens." },
      { title: "Subscriptions", body: "Monthly and yearly plans on a react-native-iap paywall with free-trial eligibility checks, verified on the server with the App Store Server API and the Google Play Developer API." },
      { title: "Admin hub", body: "An ASP.NET Core MVC dashboard with Identity login for news, fish species, waypoints, organisations and charities, moderation of reported posts and user strikes, and S3 image uploads." },
      { title: "Data import", body: "Bulk waypoint import from Excel and CSV files in the admin hub." },
      { title: "Account emails and sessions", body: "Email confirmation and password reset over SMTP, email and name changes, account deletion, and 30-day sessions that renew." },
      { title: "Push notifications", body: "The OneSignal push service on the API that the app's notifications run through." },
      { title: "Shareable catches", body: "A public web page for each shared catch, built by the API from feed data." },
      { title: "Releases", body: "iOS and Android release builds, shipped under the existing store listings, and the admin hub's Docker setup." },
    ],
    architecture: {
      clients: ["Mobile app", "Admin hub (web)"],
      api: "ASP.NET Core API · Docker",
      data: ["MySQL · EF Core", "Amazon S3"],
      services: ["Firebase Auth", "App Store / Google Play", "OneSignal", "SMTP email"],
    },
    stack: ["React Native", "TypeScript", "ASP.NET Core", "EF Core", "MySQL", "OneSignal", "Firebase", "AWS", "Docker", "Identity / JWT"],
    categories: ["mobile", "backend", "payments"],
  },
];

export const experience: Role[] = [
  {
    title: "Full-Stack Developer",
    company: "The Rich Rewards Group",
    period: "2022 – present",
    points: [
      "Build, deploy and support web and mobile products, owning features from UI through API and database to production.",
      "Main developer on SecondSpace and YouToo and on the Uptooyoo web platform; core developer on ICE Games; built the sign-up, subscriptions and admin hub for ForFishSake.",
      "Built App Store and Google Play subscriptions with server-side purchase checks for ICE Games, YouToo and ForFishSake, and PayM8 payments, escrow and payouts for Uptooyoo.",
    ],
  },
  {
    title: "Software Developer",
    company: "Enterprise Outsourcing",
    period: "2020 – March 2022",
    points: [
      "Enterprise apps for contracts, procurement, stock, orders, invoices and logistics in C# and Xamarin.Forms.",
      "Custom PDF builder and viewer; code-first databases and WebAPI services following Clean Architecture.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "C#", "SQL", "Java"] },
  { group: "Frontend and web", items: ["React", "Next.js", "Preact", "Vite", "jQuery", "WebSockets", "WebRTC"] },
  { group: "Mobile", items: ["React Native", ".NET MAUI", "Xamarin.Forms"] },
  { group: "Backend and architecture", items: ["ASP.NET Core", "REST APIs", "SignalR", "Identity / JWT", "Quartz", "Clean Architecture"] },
  { group: "Databases", items: ["MySQL", "SQL Server", "EF Core"] },
  { group: "Testing and delivery", items: ["Jest", "React Testing Library", "Vitest", "xUnit", "GitHub Actions", "Docker"] },
  { group: "Integrations and cloud", items: ["AWS", "Stitch", "PayM8", "App Store / Google Play billing", "OneSignal", "Firebase", "Google Maps", "Claude API"] },
];

export const education = {
  degree: "Bachelor's degree in Information Technology",
  school: "Pearson Institute of Higher Education",
  period: "2017 – 2020",
};
