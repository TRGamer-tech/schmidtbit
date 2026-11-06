/* IT Fact of the Day (it-fotd.html). Bis 2026-11-06 inline im HTML; als Datei erlaubt es die strikte CSP.
   Am Ende des <body> geladen, die Elemente existieren also schon. */
// --- THEME DETECTION PROTOCOL ---
(function detectTheme() {
  const root = document.documentElement;
  const referrer = document.referrer || "";
  const currentUrl = window.location.href;

  // Check for helpdesk (substring) or schmidtbit or URL param
  if (
    referrer.includes("schmidtbit.ch") ||
    referrer.includes("helpdesk") ||
    currentUrl.includes("theme=blue")
  ) {
    console.log(
      "Facts are being displayed in helpdesk: Blue Theme Protocol engaged.",
    );
    root.style.setProperty("--theme-color", "#1d77a3");
    root.style.setProperty("--theme-text", "#63b3ed");
    root.style.setProperty("--theme-dim", "rgba(29, 119, 163, 0.3)");
    root.style.setProperty(
      "--theme-glow",
      "0 0 20px rgba(29, 119, 163, 0.3)",
    );
    root.style.setProperty(
      "--theme-shadow-text",
      "2px 2px 0px rgba(29, 119, 163, 0.2)",
    );
  }
})();

// BROAD TECH KEYWORDS (whole-word match, plural "s"/"es" allowed)
const BROAD_KEYWORDS = [
  "computer",
  "internet",
  "world wide web",
  "software",
  "hardware",
  "microchip",
  "microprocessor",
  "algorithm",
  "cyber",
  "digital",
  "web server",
  "computer network",
  "user interface",
  "pixel",
  "artificial intelligence",
  "neural network",
  "machine learning",
  "apple inc",
  "macintosh",
  "microsoft",
  "ibm",
  "google",
  "amazon.com",
  "facebook",
  "linux",
  "unix",
  "ubuntu",
  "transistor",
  "silicon valley",
  "semiconductor",
  "telecom",
  "wireless",
  "bluetooth",
  "wi-fi",
  "wifi",
  "ethernet",
  "email",
  "e-mail",
  "smartphone",
  "iphone",
  "android",
  "browser",
  "operating system",
  "database",
  "programming language",
  "source code",
  "open source",
  "videogame",
  "video game",
  "nintendo",
  "sega",
  "atari",
  "playstation",
  "xbox",
  "cloud computing",
  "virtual reality",
  "supercomputer",
  "mainframe",
  "firewall",
  "encryption",
  "cryptography",
  "tcp/ip",
  "microcomputer",
  "motherboard",
  "peripheral",
  "modem",
  "router",
  "bandwidth",
];

// STRICT KEYWORDS (Must be whole words to avoid partial matches like 'Program' -> 'RAM')
const STRICT_KEYWORDS = [
  "CPU",
  "GPU",
  "RAM",
  "GUI",
  "API",
  "IP",
  "IOS",
  "BIOS",
  "USB",
  "SSD",
  "HDD",
];

// Exclude Space, Nature, History, Religion, and Politics
const EXCLUDED_KEYWORDS = [
  "river",
  "forest",
  "jungle", // Amazon
  "fruit",
  "beatles",
  "corps", // Apple
  "biological",
  "disease",
  "outbreak",
  "pandemic", // Virus/Bug
  "legal code",
  "da vinci", // Code
  "military intelligence",
  "cia",
  "fbi",
  "spy", // Intelligence
  "spider", // Web
  // Space Exclusions
  "space shuttle",
  "spacecraft",
  "astronaut",
  "cosmonaut",
  "rocket",
  "orbit",
  "mars",
  "moon",
  "solar system",
  "galaxy",
  "telescope",
  "space station",
  "apollo",
  "soyuz",
  "gemini",
  "skylab",
  "mir",
  "iss",
  "interstellar",
  // History/Depression/Politics Exclusions
  "great depression",
  "economic",
  "recession",
  "bank",
  "financial",
  "stock market",
  "radio",
  "television",
  "tv",
  "broadcast",
  "railway",
  "railroad",
  "treaty",
  "war",
  "battle",
  "nuclear",
  "atomic",
  "bomb",
  "president",
  "election",
  "fatwa",
  "islam",
  "christian",
  "religion",
  "church",
  "pope",
  "law",
  "court",
  "supreme",
];

// Backup facts database
const BACKUP_FACTS = [
  {
    text: "The first computer mouse was made of wood.",
    year: "1964",
    url: "https://en.wikipedia.org/wiki/Computer_mouse",
  },
  {
    text: "The first 1GB hard drive was announced by IBM. It weighed over 500 pounds and cost $40,000.",
    year: "1980",
    url: "https://en.wikipedia.org/wiki/IBM_3380",
  },
  {
    text: "Email actually existed before the World Wide Web.",
    year: "1971",
    url: "https://en.wikipedia.org/wiki/Email#Origin",
  },
  {
    text: "The Firefox logo is actually a red panda, not a fox.",
    year: "2004",
    url: "https://en.wikipedia.org/wiki/Firefox#Branding_and_visual_identity",
  },
  {
    text: "The first webcam was created at Cambridge University to check the status of a coffee pot.",
    year: "1991",
    url: "https://en.wikipedia.org/wiki/Trojan_Room_coffee_pot",
  },
  {
    text: "Nintendo was founded as a playing card company.",
    year: "1889",
    url: "https://en.wikipedia.org/wiki/History_of_Nintendo",
  },
  {
    text: "The first computer bug was an actual real-life moth stuck in a relay of the Harvard Mark II.",
    year: "1947",
    url: "https://en.wikipedia.org/wiki/Software_bug#Etymology",
  },
  {
    text: "The very first domain name ever registered was symbolics.com.",
    year: "1985",
    url: "https://en.wikipedia.org/wiki/Symbolics.com",
  },
  {
    text: "CAPTCHA stands for 'Completely Automated Public Turing test to tell Computers and Humans Apart'.",
    year: "2003",
    url: "https://en.wikipedia.org/wiki/CAPTCHA",
  },
  {
    text: "The QWERTY keyboard was originally designed to slow down typists so mechanical typewriter keys would not jam.",
    year: "1873",
    url: "https://en.wikipedia.org/wiki/QWERTY",
  },
  {
    text: "WiFi technology was partly invented by Hollywood actress Hedy Lamarr during WWII.",
    year: "1942",
    url: "https://en.wikipedia.org/wiki/Hedy_Lamarr#Invention",
  },
  {
    text: "The first text message ever sent simply said 'Merry Christmas'.",
    year: "1992",
    url: "https://en.wikipedia.org/wiki/SMS#History",
  },
  {
    text: "More than 90% of the world's currency exists only on computers.",
    year: "2023",
    url: "https://en.wikipedia.org/wiki/Digital_currency",
  },
  {
    text: "The programming language Python was named after 'Monty Python's Flying Circus', not the snake.",
    year: "1991",
    url: "https://en.wikipedia.org/wiki/Python_(programming_language)#History",
  },
  {
    text: "The first alarm clock could only ring at 4 a.m.",
    year: "1787",
    url: "https://en.wikipedia.org/wiki/Alarm_clock",
  },
  {
    text: "Samsung was 38 years old and selling dried fish and noodles before it started making electronics.",
    year: "1938",
    url: "https://en.wikipedia.org/wiki/Samsung#History",
  },
  {
    text: "The first banner ad ever clicked had a Click-Through Rate (CTR) of 44%.",
    year: "1994",
    url: "https://en.wikipedia.org/wiki/Web_banner#History",
  },
  {
    text: "Google's original name was 'Backrub' because it analyzed backlinks.",
    year: "1996",
    url: "https://en.wikipedia.org/wiki/Google#History",
  },
  {
    text: "The very first YouTube video was titled 'Me at the zoo' and is 18 seconds long.",
    year: "2005",
    url: "https://en.wikipedia.org/wiki/Me_at_the_zoo",
  },
  {
    text: "Bluetooth is named after King Harald Bluetooth who united dissident Danish tribes.",
    year: "1997",
    url: "https://en.wikipedia.org/wiki/Bluetooth#Etymology",
  },
  {
    text: "The first photo ever uploaded to the web was of a comedy band called Les Horribles Cernettes.",
    year: "1992",
    url: "https://en.wikipedia.org/wiki/Les_Horribles_Cernettes",
  },
  {
    text: "The first mobile phone call was made by Martin Cooper of Motorola to his rival at Bell Labs.",
    year: "1973",
    url: "https://en.wikipedia.org/wiki/Martin_Cooper_(inventor)",
  },
  {
    text: "The first hard drive, the IBM 305 RAMAC, held only 5MB of data and had to be moved by forklift.",
    year: "1956",
    url: "https://en.wikipedia.org/wiki/IBM_305_RAMAC",
  },
  {
    text: "There is a 3D-printed castle on a grain of sand created by researchers.",
    year: "2022",
    url: "https://en.wikipedia.org/wiki/3D_printing",
  },
  {
    text: "The original Xbox contained snippets of actual transmissions from the Apollo space missions.",
    year: "2001",
    url: "https://en.wikipedia.org/wiki/Xbox_(console)",
  },
  {
    text: "Spacewar!, widely considered the first computer video game, was written at MIT.",
    year: "1962",
    url: "https://en.wikipedia.org/wiki/Spacewar!",
  },
  {
    text: "The first computer virus, Creeper, simply displayed the message: 'I'm the creeper, catch me if you can!'",
    year: "1971",
    url: "https://en.wikipedia.org/wiki/Creeper_(program)",
  },
  {
    text: "Amazon's first name was 'Cadabra', but Jeff Bezos changed it because it sounded like 'cadaver'.",
    year: "1994",
    url: "https://en.wikipedia.org/wiki/Amazon_(company)#History",
  },
  {
    text: "The first Apple logo featured Isaac Newton sitting under an apple tree.",
    year: "1976",
    url: "https://en.wikipedia.org/wiki/Apple_Inc.#Logo",
  },
  {
    text: "The computing power inside a modern smartphone is millions of times greater than the Apollo guidance computer.",
    year: "1969",
    url: "https://en.wikipedia.org/wiki/Apollo_Guidance_Computer",
  },
  {
    text: "Google's first storage server was built with LEGO bricks.",
    year: "1996",
    url: "https://en.wikipedia.org/wiki/Google_platform#History",
  },
  {
    text: "The term 'spam' for junk email comes from a Monty Python sketch.",
    year: "1970",
    url: "https://en.wikipedia.org/wiki/Spam_(food)#Monty_Python_sketch",
  },
  {
    text: "eBay's first sold item was a broken laser pointer for $14.83.",
    year: "1995",
    url: "https://en.wikipedia.org/wiki/EBay#History",
  },
  {
    text: "The word 'robot' comes from the Czech word 'robota' meaning forced labor.",
    year: "1920",
    url: "https://en.wikipedia.org/wiki/Robot#Etymology",
  },
  {
    text: "The first website ever built by Tim Berners-Lee is still online at CERN.",
    year: "1991",
    url: "https://en.wikipedia.org/wiki/Info.cern.ch",
  },
  {
    text: "Ray Tomlinson chose the '@' symbol for email because it was rarely used.",
    year: "1971",
    url: "https://en.wikipedia.org/wiki/Ray_Tomlinson",
  },
  {
    text: "The Apple I computer was sold for $666.66.",
    year: "1976",
    url: "https://en.wikipedia.org/wiki/Apple_I",
  },
  {
    text: "Four bits (half a byte) is technically called a 'nibble'.",
    year: "1958",
    url: "https://en.wikipedia.org/wiki/Nibble",
  },
  {
    text: "The IBM Simon was the first commercially available smartphone.",
    year: "1994",
    url: "https://en.wikipedia.org/wiki/IBM_Simon",
  },
  {
    text: "Ada Lovelace is widely considered the first computer programmer.",
    year: "1843",
    url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
  },
  {
    text: "Twitter's bird logo was named 'Larry' after basketball legend Larry Bird.",
    year: "2011",
    url: "https://en.wikipedia.org/wiki/Twitter#Branding",
  },
  {
    text: "The PlayStation exists because Nintendo betrayed Sony on a CD-ROM deal.",
    year: "1994",
    url: "https://en.wikipedia.org/wiki/PlayStation_(console)#History",
  },
  {
    text: "YouTube was founded by three former PayPal employees.",
    year: "2005",
    url: "https://en.wikipedia.org/wiki/YouTube#History",
  },
  {
    text: "Android was originally designed for digital cameras, not phones.",
    year: "2004",
    url: "https://en.wikipedia.org/wiki/Android_(operating_system)#History",
  },
  {
    text: "The first wiki was named WikiWikiWeb after the Hawaiian word for 'fast'.",
    year: "1995",
    url: "https://en.wikipedia.org/wiki/WikiWikiWeb",
  },
  {
    text: "Steve Wozniak sold his HP scientific calculator to raise capital for Apple.",
    year: "1976",
    url: "https://en.wikipedia.org/wiki/Apple_Inc.#History",
  },
  {
    text: "Pong was the first commercially successful video game.",
    year: "1972",
    url: "https://en.wikipedia.org/wiki/Pong",
  },
  {
    text: "The Space Invaders game caused a temporary shortage of 100-yen coins in Japan.",
    year: "1978",
    url: "https://en.wikipedia.org/wiki/Space_Invaders#Impact",
  },
  {
    text: "The most viewed photo in history is likely the Windows XP 'Bliss' wallpaper.",
    year: "1996",
    url: "https://en.wikipedia.org/wiki/Bliss_(image)",
  },
  {
    text: "Computer scientist Grace Hopper popularized the term 'debugging'.",
    year: "1947",
    url: "https://en.wikipedia.org/wiki/Grace_Hopper",
  },
  {
    text: "The GNU Project was announced by Richard Stallman in 1983 with the goal of building a fully free operating system.",
    year: "1983",
    url: "https://en.wikipedia.org/wiki/GNU_Project",
  },
  {
    text: "The first public release of the Linux kernel, version 0.01, came out in September 1991.",
    year: "1991",
    url: "https://en.wikipedia.org/wiki/Linux_kernel",
  },
  {
    text: "Tux, the Linux penguin mascot, was created by Larry Ewing in 1996 using the GIMP image editor.",
    year: "1996",
    url: "https://en.wikipedia.org/wiki/Tux_(mascot)",
  },
  {
    text: "Mozilla was born in 1998 when Netscape released its browser source code as open source.",
    year: "1998",
    url: "https://en.wikipedia.org/wiki/Mozilla",
  },
  {
    text: "Unix was first developed at Bell Labs in 1969.",
    year: "1969",
    url: "https://en.wikipedia.org/wiki/Unix",
  },
  {
    text: "The Intel 4004, released in 1971, was the first commercially available single-chip microprocessor.",
    year: "1971",
    url: "https://en.wikipedia.org/wiki/Intel_4004",
  },
  {
    text: "Gary Thuerk sent what is widely considered the first spam email in 1978 to about 600 ARPANET users.",
    year: "1978",
    url: "https://en.wikipedia.org/wiki/Gary_Thuerk",
  },
  {
    text: "The Xerox Alto, released in 1973, was one of the first computers with a mouse-driven graphical user interface.",
    year: "1973",
    url: "https://en.wikipedia.org/wiki/Xerox_Alto",
  },
  {
    text: "Ethernet was first described in an internal memo at Xerox PARC in 1973.",
    year: "1973",
    url: "https://en.wikipedia.org/wiki/Ethernet",
  },
  {
    text: "The original IBM PC launched in 1981 with an Intel 8088 processor running at 4.77 MHz.",
    year: "1981",
    url: "https://en.wikipedia.org/wiki/IBM_Personal_Computer",
  },
  {
    text: "The Commodore 64 is considered the best-selling single personal computer model of all time.",
    year: "1982",
    url: "https://en.wikipedia.org/wiki/Commodore_64",
  },
  {
    text: "Windows 1.0 arrived in 1985 as a graphical shell running on top of MS-DOS.",
    year: "1985",
    url: "https://en.wikipedia.org/wiki/Windows_1.0",
  },
  {
    text: "The Nintendo Game Boy launched in 1989 and went on to sell well over 100 million units.",
    year: "1989",
    url: "https://en.wikipedia.org/wiki/Game_Boy",
  },
  {
    text: "Windows NT, first released in 1993, was led by David Cutler, who had previously worked on VMS at DEC.",
    year: "1993",
    url: "https://en.wikipedia.org/wiki/Windows_NT",
  },
  {
    text: "The first emoji set was designed by Shigetaka Kurita for Japanese carrier NTT DoCoMo in 1999.",
    year: "1999",
    url: "https://en.wikipedia.org/wiki/Emoji",
  },
  {
    text: "The first iPod could hold about 1,000 songs on a 5 GB hard drive.",
    year: "2001",
    url: "https://en.wikipedia.org/wiki/IPod",
  },
  {
    text: "Ubuntu 4.10 'Warty Warthog' was the first Ubuntu release, published in October 2004.",
    year: "2004",
    url: "https://en.wikipedia.org/wiki/Ubuntu_version_history",
  },
  {
    text: "Jack Dorsey sent the first tweet, which read 'just setting up my twttr'.",
    year: "2006",
    url: "https://en.wikipedia.org/wiki/Twitter",
  },
  {
    text: "The Raspberry Pi launched in 2012 as a computer intended to cost about 35 US dollars.",
    year: "2012",
    url: "https://en.wikipedia.org/wiki/Raspberry_Pi",
  },
];

function sanitizeText(text) {
  return text.replace(/ss/g, "ss"); // Yes, even this is suspicious. But rules are rules.
}

// Whole-word keyword match: Satzzeichen davor/danach sind ok, Plural (s/es) auch
function containsKeyword(content, keyword) {
  const escaped = keyword
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    "(^|[^a-z0-9])" + escaped + "(?:s|es)?(?![a-z0-9])",
    "i",
  );
  return regex.test(content);
}

// Stealth Copy Function
function copyToClipboard() {
  const fact = document.getElementById("fact-text").innerText;
  const year = document.getElementById("year-display").innerText;
  const isArchive =
    document.getElementById("status-display").innerText.trim() ===
    "ARCHIVE";

  const prefix = isArchive ? "Sometime" : "Today";
  const textToCopy = `${prefix} in ${year}: ${fact} - via schmidtbit.ch/it-fotd`;

  // Modern Clipboard API
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      const toast = document.getElementById("toast");
      toast.classList.remove("opacity-0");
      setTimeout(() => {
        toast.classList.add("opacity-0");
      }, 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

// API-Abruf mit Timeout und Retry
const FETCH_TIMEOUT_MS = 6000;
const FETCH_RETRIES = 1;

async function fetchOnThisDay(month, day) {
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  for (let attempt = 0; attempt <= FETCH_RETRIES; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      FETCH_TIMEOUT_MS,
    );
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error("HTTP " + response.status);
      return await response.json();
    } catch (err) {
      console.log(
        `Versuch ${attempt + 1} fehlgeschlagen: ${err.message}`,
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }
  throw new Error("API Failure");
}

async function loadFact() {
  const factText = document.getElementById("fact-text");
  const yearDisplay = document.getElementById("year-display");
  const timeDelta = document.getElementById("time-delta");
  const yearContainer = document.getElementById("year-container");
  const dateDisplay = document.getElementById("date-display");
  const statusDisplay = document.getElementById("status-display");
  const sourceLink = document.getElementById("source-link");

  // UI Reset
  factText.innerHTML =
    '<span class="animate-pulse">Accessing daily log...</span>';
  yearContainer.classList.add("opacity-0");
  sourceLink.classList.add("hidden");

  const today = new Date();
  const currentYear = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const displayDate = sanitizeText(
    today.toLocaleDateString("en-US", options),
  );

  dateDisplay.innerText = "Target Date: " + displayDate;

  try {
    const data = await fetchOnThisDay(month, day);

    const techEvents = data.events.filter((event) => {
      const content =
        event.text + " " + event.pages.map((p) => p.title).join(" ");

      if (EXCLUDED_KEYWORDS.some((k) => containsKeyword(content, k)))
        return false;

      return (
        BROAD_KEYWORDS.some((k) => containsKeyword(content, k)) ||
        STRICT_KEYWORDS.some((k) => containsKeyword(content, k))
      );
    });

    console.log(
      `Tech-Ereignisse heute: ${techEvents.length} von ${data.events.length}`,
    );

    if (techEvents.length > 0) {
      const event =
        techEvents[Math.floor(Math.random() * techEvents.length)];
      const cleanText = sanitizeText(event.text);
      const eventYear = parseInt(event.year);
      const yearsAgo = currentYear - eventYear;

      factText.innerText = cleanText;
      yearDisplay.innerText = event.year;

      // STATUS: ONLINE
      dateDisplay.innerText = displayDate;
      statusDisplay.innerText = "ONLINE";

      // Add "You Are Old" Metric
      if (!isNaN(yearsAgo) && yearsAgo > 0) {
        timeDelta.innerText = `[${yearsAgo} YRS AGO]`;
      } else {
        timeDelta.innerText = "";
      }
      yearContainer.classList.remove("opacity-0");
      if (event.pages && event.pages[0]) {
        sourceLink.href = event.pages[0].content_urls.desktop.page;
        sourceLink.classList.remove("hidden");
      }
    } else {
      throw new Error("No events found for today");
    }
  } catch (error) {
    console.log("Using backup fact due to: " + error.message);
    const backup =
      BACKUP_FACTS[Math.floor(Math.random() * BACKUP_FACTS.length)];
    const cleanText = sanitizeText(backup.text);
    const eventYear = parseInt(backup.year);
    const yearsAgo = currentYear - eventYear;

    // STATUS: ARCHIVE
    dateDisplay.innerText = displayDate;
    statusDisplay.innerText = "ARCHIVE";

    factText.innerText = cleanText;
    yearDisplay.innerText = backup.year;
    if (!isNaN(yearsAgo) && yearsAgo > 0) {
      timeDelta.innerText = `[${yearsAgo} YEARS AGO]`;
    } else {
      timeDelta.innerText = "";
    }
    yearContainer.classList.remove("opacity-0");
    if (backup.url) {
      sourceLink.href = backup.url;
      sourceLink.classList.remove("hidden");
    }
  }
}
document.getElementById("fact-box").addEventListener("click", copyToClipboard);
loadFact();
