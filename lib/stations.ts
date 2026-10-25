export type Station = {
  id: string;
  n: number;
  part: number;
  title: string;
  desc: string;
};

export const PARTS = [
  { title: "Start here", desc: "Read this before anything else." },
  { title: "Foundations", desc: "How each scripture is built and how it sees the world." },
  { title: "The questions", desc: "Four philosophical challenges, with the replies to expect." },
  { title: "The cross", desc: "The heart of the difference: how sin is dealt with." },
  { title: "Hope and mission", desc: "The living hope of Christ and the call to make disciples." },
];

// Order matters: this is the journey sequence.
// Each id matches a file in content/stations/<id>.html
export const STATIONS: Station[] = [
  { id: "method", n: 0, part: 0, title: "How to walk this journey", desc: "Five steps for every conversation" },
  { id: "structure", n: 1, part: 1, title: "How the texts are built", desc: "Epic, dialogue and library" },
  { id: "transmission", n: 2, part: 1, title: "How the texts were passed down", desc: "Oral performance and manuscripts" },
  { id: "worldview", n: 3, part: 1, title: "Two shapes of reality", desc: "Cyclic and linear time" },
  { id: "c1", n: 4, part: 2, title: "Monism and the personal God", desc: "Can love be ultimate?" },
  { id: "c2", n: 5, part: 2, title: "Karma and the endless chain", desc: "The problem of infinite regress" },
  { id: "c3", n: 6, part: 2, title: "Punished for a life you cannot remember", desc: "Rebirth and moral responsibility" },
  { id: "c4", n: 7, part: 2, title: "Can every path be true?", desc: "Pluralism and non-contradiction" },
  { id: "sin", n: 8, part: 3, title: "Sin, forgiveness and the Lamb", desc: "Who pays for sin?" },
  { id: "bridge", n: 9, part: 3, title: "From argument to gospel", desc: "Longings the Gita reaches for" },
  { id: "hope", n: 10, part: 4, title: "I go to prepare a place for you", desc: "Cross, empty tomb, return" },
  { id: "destinies", n: 11, part: 4, title: "One life, two destinies", desc: "A loving warning" },
  { id: "disciples", n: 12, part: 4, title: "Go and make disciples", desc: "The Great Commission in practice" },
];

// Shown instead of a label word: "Start here" or "8 of 12" within the journey.
export const progressLabel = (s: Station) => (s.n === 0 ? "Start here" : `${s.n} of 12`);

export const findStation = (id: string) => STATIONS.find((s) => s.id === id);

export const neighbors = (id: string) => {
  const i = STATIONS.findIndex((s) => s.id === id);
  return { prev: i > 0 ? STATIONS[i - 1] : undefined, next: i >= 0 ? STATIONS[i + 1] : undefined };
};
