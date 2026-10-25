export type Station = {
  id: string;
  n: number;
  part: number;
  title: string;
  desc: string;
  reflect: string; // a question to sit with at the end of the step
};

export const PARTS = [
  { title: "Start here", desc: "Read this before anything else." },
  { title: "Foundations", desc: "How each scripture is built and how it sees the world." },
  { title: "The questions", desc: "Four honest questions, and how each book answers." },
  { title: "The cross", desc: "The heart of the difference: how sin is dealt with." },
  { title: "Hope and mission", desc: "The hope of Christ, and the joy of sharing it." },
];

// Order matters: this is the journey sequence.
// Each id matches a file in content/stations/<id>.html
export const STATIONS: Station[] = [
  { id: "made", n: 0, part: 0, title: "Made to know and be known", desc: "What we are here for, and the joy in it",
    reflect: "When have you most sensed that you were loved, or known, or made for something? What did that feel like?" },
  { id: "method", n: 0, part: 0, title: "How to walk this journey", desc: "Five steps for every conversation",
    reflect: "Think of someone you could have an unhurried conversation with about these questions. What would you most like to ask them, or them you?" },
  { id: "story", n: 1, part: 1, title: "Two big stories", desc: "The Mahabharata and the Bible's one storyline",
    reflect: "If you had to say what each story is about in one sentence, what would you say? Which story do you find yourself in?" },
  { id: "thread", n: 2, part: 1, title: "One thread through 66 books", desc: "How the Bible's hope runs from Genesis to Revelation",
    reflect: "What do you hope for most when you think about the end of the story, for the world and for you? What would it take for that hope to be well-founded?" },
  { id: "structure", n: 3, part: 1, title: "How the texts are built", desc: "Epic, dialogue and library",
    reflect: "How does it change your reading to know a book is an epic, a dialogue or a library? What do you usually expect from a sacred text?" },
  { id: "transmission", n: 4, part: 1, title: "How the texts were passed down", desc: "Oral performance and manuscripts",
    reflect: "How much does it matter to you that a text has been carefully preserved? What would give you confidence in a scripture?" },
  { id: "access", n: 5, part: 1, title: "Preserved, but who can understand?", desc: "The shape of each library and who it is for",
    reflect: "How did you first meet the scriptures you know best: through a teacher, a story, a book or a family? What helped you understand them?" },
  { id: "tensions", n: 6, part: 1, title: "Hard passages in both books", desc: "Difficulties in the Gita, the epic and the Bible",
    reflect: "What is a hard passage in a book you love, and how have you learned to live with it? How might your friend feel about theirs?" },
  { id: "worldview", n: 7, part: 1, title: "Two shapes of reality", desc: "Cyclic and linear time",
    reflect: "Does life feel to you more like a circle or a road? What would it mean if history really were going somewhere?" },
  { id: "c1", n: 8, part: 2, title: "Monism and the personal God", desc: "Can love be ultimate?",
    reflect: "Do you long to be loved by someone, or to be absorbed into something? What does your heart say love needs?" },
  { id: "c2", n: 9, part: 2, title: "Karma and the endless chain", desc: "The problem of infinite regress",
    reflect: "Where do you notice the weight of what came before you, in your family, your culture, your choices? What would it take to be free of it?" },
  { id: "c3", n: 10, part: 2, title: "Punished for a life you cannot remember", desc: "Rebirth and moral responsibility",
    reflect: "What would you want justice to look like if you were wronged? What would you hope for if you were the one who did wrong?" },
  { id: "c4", n: 11, part: 2, title: "Can every path be true?", desc: "Pluralism and non-contradiction",
    reflect: "Can you hold deep respect for a person and still honestly disagree about what is true? What would that look like?" },
  { id: "sin", n: 12, part: 3, title: "Sin, forgiveness and the Lamb", desc: "Who pays for sin?",
    reflect: "What would it mean for a debt to be paid by someone else for you? How does that land: as relief, as discomfort, or as both?" },
  { id: "bridge", n: 13, part: 3, title: "From argument to gospel", desc: "Longings the Gita reaches for",
    reflect: "Which longing here do you recognize in yourself: to be loved, to be free, to see justice, to know God close at hand?" },
  { id: "hope", n: 14, part: 4, title: "I go to prepare a place for you", desc: "Cross, empty tomb, return",
    reflect: "What do you hope for when you think about the end of your life, or of the world? What does the hope of Jesus say to that?" },
  { id: "destinies", n: 15, part: 4, title: "One life, two destinies", desc: "A loving warning",
    reflect: "How should we speak about serious things with great gentleness? What is the difference between warning and caring?" },
  { id: "disciples", n: 16, part: 4, title: "Go and make disciples", desc: "The Great Commission in practice",
    reflect: "Who has helped you know God better? Who could you walk alongside, simply by being a friend and listening?" },
];

// Shown instead of a label word: "Start here" or "8 of 12" within the journey.
export const NUMBERED = STATIONS.filter((s) => s.n > 0).length;

export const progressLabel = (s: Station) => (s.n === 0 ? "Start here" : `${s.n} of ${NUMBERED}`);

export const findStation = (id: string) => STATIONS.find((s) => s.id === id);

export const neighbors = (id: string) => {
  const i = STATIONS.findIndex((s) => s.id === id);
  return { prev: i > 0 ? STATIONS[i - 1] : undefined, next: i >= 0 ? STATIONS[i + 1] : undefined };
};
