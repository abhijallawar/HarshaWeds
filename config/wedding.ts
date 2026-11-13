/** All invitation details are edited here. 2026 is provisional. */
export const wedding = {
  year: 2026,
  timezone: "Asia/Kolkata",
  names: ["Harsha", "Abhilash"],
  monogram: "H & A",
  music: { src: "/music/wedding-soundtrack-trimmed.mp3" },
  copy: {
    welcome: "Together with our families",
    invitation: "With joyful hearts, we invite you to join us for Haldi and our wedding as we begin this new chapter together.",
    farewell: "We look forward to celebrating with you and sharing the memories we’ll carry into our life together.",
    started: "Our wedding celebration begins",
  },
  optional: {
    blessing: null as string | null,
    familyCopy: null as string | null,
    portraits: null as { src: string; alt: string }[] | null,
  },
  venues: {
    haldi: {
      title: "Haldi",
      emblem: "haldi",
      name: "Myakalwar House",
      address: null as string | null,
      locality: null,
      directions: "https://maps.app.goo.gl/5rFR7adpDf3xCteD9",
    },
    wedding: {
      title: "Wedding",
      emblem: "wedding",
      name: "Jijau Lawn · Datala Rd, Chandrapur MH.",
      address: "Jijau Lawn · Datala Rd, Chandrapur MH.",
      locality: null,
      directions: "https://maps.app.goo.gl/uqsHPUvWJAgitZ7t5",
    },
  },
  events: [
    { id: "haldi", name: "Haldi", month: 12, day: 11, time: "12:00", venue: "haldi" },
    { id: "wedding", name: "Wedding", month: 12, day: 12, time: "12:07", venue: "wedding", line: "Join us as we take our vows and begin our married life." },
  ],
  ceremonyId: "wedding",
} as const;
