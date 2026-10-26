export type Station = {
  id: string;
  n: number;
  part: number;
  title: string;
  desc: string;
  reflect: string; // a question to sit with at the end of the step
  recap: string; // the step in a sentence or two, shown at the end
  lead?: string; // why the next step follows from this one
};

export const PARTS = [
  { title: "Start here", desc: "Read this before anything else." },
  { title: "The two stories", desc: "What each text is, and where it comes from." },
  { title: "The questions", desc: "The shape of time, then four honest questions, and how the Gita and the Bible each answer." },
  { title: "The Hindu texts in depth", desc: "Each group of Hindu texts, and whether it fits inside the Mahabharata." },
  { title: "Can the texts be trusted?", desc: "How each was passed down, who can understand it, and the hard passages in both." },
  { title: "The cross", desc: "The Bible's one thread, and the heart of the difference: how sin is forgiven." },
  { title: "Hope and mission", desc: "The hope of Christ, and the joy of sharing it." },
  { title: "The glory to come", desc: "Where the whole story ends: Christ on the throne, and every nation worshipping." },
];

// Order matters: this is the journey sequence.
// Each id matches a file in content/stations/<id>.html
export const STATIONS: Station[] = [
  { id: "made", n: 1, part: 0, title: "Made to know and be known", desc: "What we are here for, and the joy in it",
    reflect: "When have you most sensed that you were loved, or known, or made for something? What did that feel like?",
    recap: "We were made to know God and to be loved by Him. Something has broken that relationship, and God's answer is a person, Jesus.",
    lead: "Before comparing anything, here is how to walk through hard questions fairly." },
  { id: "method", n: 2, part: 0, title: "How to walk this journey", desc: "Five steps for every conversation",
    reflect: "Think of someone you could have an unhurried conversation with about these questions. What would you most like to ask them, or them you?",
    recap: "Understand your friend first, find the verse, test the reasoning, expect their best reply, and point to Christ. You do not need to master the Gita.",
    lead: "Ideas only make sense inside their story, so next comes the plot of each text." },
  { id: "story", n: 3, part: 1, title: "Two big stories", desc: "The Mahabharata and the Bible's one storyline",
    reflect: "If you had to say what each story is about in one sentence, what would you say? Which story do you find yourself in?",
    recap: "The Mahabharata is a family war with no clean victory, and the Gita is one conversation inside it. The Bible is one story of rescue from the first page to the last, and Jesus is its center: the only one who never falls short.",
    lead: "The Gita is only one of many Hindu texts. Next, a map of all of them." },
  { id: "hindutexts", n: 4, part: 1, title: "The Hindu texts, and where they fit", desc: "Are the Vedas and Upanishads inside the Mahabharata?",
    reflect: "Which Hindu texts or stories do you or your friend know best? How do they shape the way you each picture God?",
    recap: "The Hindu sacred texts are many, layered over about 3,000 years: the Vedas and Upanishads first, then the epics, the Puranas and later traditions. Only the Gita and a few sections sit inside the Mahabharata.",
    lead: "Next, how the texts were made: who wrote them, when, and whether they are tied to real events." },
  { id: "structure", n: 5, part: 1, title: "How the texts are built", desc: "Where the Gita, the Mahabharata and the Bible come from",
    reflect: "How does it change your reading to know where a text came from, who wrote it and when? What do you usually expect from a sacred text?",
    recap: "The Hindu texts have no single author, date or closed list, and their authority rests on teaching. The Bible names its authors, is one closed text, and rests on events that can be checked.",
    lead: "Before the four questions, one big difference shapes them all: the shape of time." },
  { id: "worldview", n: 6, part: 2, title: "Two shapes of reality", desc: "Cyclic and linear time",
    reflect: "Does life feel to you more like a circle or a road? What would it mean if history really were going somewhere?",
    recap: "Hindu thought sees time as a cycle of ages that repeats. The Bible sees one line from creation to new creation, with the cross at the center, happening once for all.",
    lead: "With that frame in place, the first question: is love at the very center of reality?" },
  { id: "c1", n: 7, part: 2, title: "Monism and the personal God", desc: "Can love be ultimate?",
    reflect: "Do you long to be loved by someone, or to be absorbed into something? What does your heart say love needs?",
    recap: "If the highest reality has no qualities, then love is not ultimate. The Bible says God is love in Himself, Father, Son and Spirit, and showed it in Jesus.",
    lead: "Karma explains today by yesterday. Next: what explains the very first act?" },
  { id: "c2", n: 8, part: 2, title: "Karma and the endless chain", desc: "The problem of infinite regress",
    reflect: "Where do you notice the weight of what came before you, in your family, your culture, your choices? What would it take to be free of it?",
    recap: "A chain of past lives with no beginning postpones the explanation forever. The Bible names a starting point, a good creation and a real fall, and a God who steps in to deal with sin.",
    lead: "Next: if I cannot remember a past life, can it be fair that I pay for it?" },
  { id: "c3", n: 9, part: 2, title: "Punished for a life you cannot remember", desc: "Rebirth and moral responsibility",
    reflect: "What would you want justice to look like if you were wronged? What would you hope for if you were the one who did wrong?",
    recap: "Paying for a life you cannot remember breaks the link between the person and the deed. The Bible says each of us answers for our own life, and Christ offers to carry the debt.",
    lead: "Next: if every religion says something different, can they all be true?" },
  { id: "c4", n: 10, part: 2, title: "Can every path be true?", desc: "Pluralism and non-contradiction",
    reflect: "Can you hold deep respect for a person and still honestly disagree about what is true? What would that look like?",
    recap: "Opposite claims cannot both be true, and even the Gita ends with an exclusive call. The question is which call is true, and the Bible rests its answer on the resurrection.",
    lead: "The questions drew on the Vedas and Upanishads. The next four steps look closer at each group of Hindu texts, starting there." },
  { id: "vedas", n: 11, part: 3, title: "The Vedas and the Upanishads", desc: "The oldest texts, and four questions to ask of them",
    reflect: "Which idea from the Vedas or Upanishads do you find most beautiful? What question would you most like to ask a Hindu friend about it?",
    recap: "The Vedas are hymns and rituals, and the Upanishads are philosophy about the self and Brahman. Their authority cannot be checked from outside, unlike the Bible's public events.",
    lead: "Next, the Ramayana, the most loved Hindu story." },
  { id: "ramayana", n: 12, part: 3, title: "The Ramayana", desc: "The story of Rama, Sita and Ravana",
    reflect: "What is it about Rama that people love? Where have you seen that kind of faithfulness in someone, and where have you longed for it?",
    recap: "The Ramayana is a separate epic about Rama, held up as the model of goodness. It voices a longing for a good king who comes to rescue, which the Bible says came true in Jesus.",
    lead: "Next, the Puranas, where most of the gods and the worship known today take shape." },
  { id: "puranas", n: 13, part: 3, title: "The Puranas and the gods", desc: "Who the gods are, and how the stories are read",
    reflect: "How do you decide which parts of a story to take and which to leave? What makes a God worth trusting?",
    recap: "The Puranas are later stories of the gods, and each tradition names its own god as supreme. The gods are morally mixed. The God of the Bible is good all the way through.",
    lead: "Next, the rest of the map: law books, philosophy schools and devotional poems." },
  { id: "othertexts", n: 14, part: 3, title: "Law books, philosophy and devotional poems", desc: "The rest of the map",
    reflect: "Which voice speaks most to you: the thinker, the worker or the one who sings to God? What do you think each one is missing?",
    recap: "Law books, philosophy schools, temple manuals and poet-saints all stand outside the Mahabharata. They show a deep longing for God, and they disagree about who God is.",
    lead: "We have seen what the texts say. Next: how were they passed down, and can we check them?" },
  { id: "transmission", n: 15, part: 4, title: "How the texts were passed down", desc: "Oral performance and manuscripts",
    reflect: "How much does it matter to you that a text has been carefully preserved? What would give you confidence in a sacred text?",
    recap: "The Vedas were memorized, the Mahabharata was performed and reshaped, and the Bible was written, copied and compared. Copies that can be laid side by side let us check what was first written.",
    lead: "A text can be kept perfectly and still be out of reach. Next: who was each text meant for?" },
  { id: "access", n: 16, part: 4, title: "Preserved, but who can understand?", desc: "The shape of each text and who it is for",
    reflect: "How did you first meet the sacred texts you know best: through a teacher, a story, a book or a family? What helped you understand them?",
    recap: "Much Hindu teaching was kept by specialists in Sanskrit, though the Gita and the poet-saints opened it wider. The Bible was written in common languages for everyone, and its Word became a person.",
    lead: "Every long text has hard passages. Next, an honest look at the ones in both." },
  { id: "tensions", n: 17, part: 4, title: "Hard passages in both texts", desc: "Difficulties in the Gita, the Mahabharata and the Bible",
    reflect: "What is a hard passage in a text you love, and how have you learned to live with it? How might your friend feel about theirs?",
    recap: "Both traditions have hard passages. The Bible's are details around one event, the resurrection, while the Hindu texts differ on who God is. Name your own text's difficulties first.",
    lead: "Next, the one thread that runs through the whole Bible." },
  { id: "thread", n: 18, part: 5, title: "One thread through the whole Bible", desc: "How the Bible's hope runs from Genesis to Revelation",
    reflect: "What do you hope for most when you think about the end of the story, for the world and for you? What would it take for that hope to be well-founded?",
    recap: "From Genesis to Revelation the Bible follows one promise: God will rescue a broken world. The rescuer is Jesus, and the story ends with God living with His people.",
    lead: "At the heart of that rescue is one question: how can sin be forgiven?" },
  { id: "sin", n: 19, part: 5, title: "Sin, forgiveness and the Lamb", desc: "Who pays for sin?",
    reflect: "What would it mean for a debt to be paid by someone else for you? How does that land: as relief, as discomfort, or as both?",
    recap: "Karma gives justice without mercy, and grace without a cost leaves justice unexplained. At the cross God is both just and merciful, because He pays the debt Himself.",
    lead: "Next, how every question in this guide points to a longing the gospel meets." },
  { id: "bridge", n: 20, part: 5, title: "From argument to gospel", desc: "Longings the Gita reaches for",
    reflect: "Which longing here do you recognize in yourself: to be loved, to be free, to see justice, to know God close at hand?",
    recap: "Each question in this guide points to a real longing: to be loved, to be free, to see justice and to have God near. Each one finds its Yes in Jesus.",
    lead: "Next, the hope Jesus promised: a place prepared, and His return." },
  { id: "hope", n: 21, part: 6, title: "I go to prepare a place for you", desc: "Cross, empty tomb, return",
    reflect: "What do you hope for when you think about the end of your life, or of the world? What does the hope of Jesus say to that?",
    recap: "Christian hope is not release from existence but resurrection into a home with God. Jesus rose, so death does not have the last word.",
    lead: "That hope comes with a loving warning: there is one life, and it matters." },
  { id: "destinies", n: 22, part: 6, title: "One life, two destinies", desc: "A loving warning",
    reflect: "How should we speak about serious things with great gentleness? What is the difference between warning and caring?",
    recap: "Scripture teaches one life, then judgment, and two destinies. The warning must be spoken with tears, and always with the invitation attached.",
    lead: "Next, what it looks like to walk with a friend toward Jesus." },
  { id: "disciples", n: 23, part: 6, title: "Go and make disciples", desc: "The Great Commission in practice",
    reflect: "Who has helped you know God better? Who could you walk alongside, simply by being a friend and listening?",
    recap: "Making disciples means friendship, reading Scripture together, meeting Jesus, baptism and a new life, with care for family, culture and the law.",
    lead: "Last, where the whole story ends." },
  { id: "glory", n: 24, part: 7, title: "Worthy is the Lamb", desc: "The glory of eternity with Christ",
    reflect: "Which part of this scene moves you most? Who do you most long to see in that crowd, and who could you invite to come?",
    recap: "The Bible ends in worship. The Lamb who was slain is worthy, and a crowd from every nation lives with God forever. This is what we were made for, and the invitation is open to you." },
];

// Shown instead of a label word: "Start here" or "8 of 12" within the journey.
export const NUMBERED = STATIONS.length;

export const progressLabel = (s: Station) => `${s.n} of ${NUMBERED}`;

export const findStation = (id: string) => STATIONS.find((s) => s.id === id);

export const neighbors = (id: string) => {
  const i = STATIONS.findIndex((s) => s.id === id);
  return { prev: i > 0 ? STATIONS[i - 1] : undefined, next: i >= 0 ? STATIONS[i + 1] : undefined };
};
