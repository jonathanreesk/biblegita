export type Station = {
  id: string;
  n: number;
  part: number;
  title: string;
  desc: string;
  reflect: string; // a question to sit with at the end of the step
  reflectSeeker?: string; // the same, for a Hindu reader or seeker, where it needs to differ
  recap: string; // the step in a sentence or two, shown at the end
  lead?: string; // why the next step follows from this one
};

export const PARTS = [
  { title: "Start here", desc: "Read this before anything else." },
  { title: "Many texts", desc: "The Hindu library: many books from many schools, each put to the same fair test." },
  { title: "One story", desc: "The Bible: one book, one story of redemption (mukti), and one thread that leads to Jesus." },
  { title: "The questions", desc: "The shape of time, then four honest questions, and how the Gita and the Bible each answer." },
  { title: "Can the texts be trusted?", desc: "Who wrote each text, how it reached us, who can understand it, and the hard passages in both." },
  { title: "The cross", desc: "The heart of the difference: how sin is forgiven, and every longing answered in Jesus." },
  { title: "Hope and mission", desc: "The hope of Christ, and the joy of sharing it." },
  { title: "The glory to come", desc: "Where the whole story ends: Christ on the throne, and every nation worshipping." },
];

// Order matters: this is the journey sequence.
// Each id matches a file in content/stations/<id>.html
export const STATIONS: Station[] = [
  { id: "made", n: 1, part: 0, title: "Before you begin", desc: "How this guide works, and what we were made for",
    reflect: "When have you most sensed that you were loved, or known, or made for something? What did that feel like?",
    recap: "We all ask the same questions, and beneath them is a longing to belong, to be known and loved by someone greater than ourselves. The Upanishads and the Psalms both voice it. Jesus says He is the answer, and the Hindu texts give answers of their own. The next chapters put both to the same two tests.",
    lead: "Ideas only make sense inside their story. First, a map of all the Hindu texts, set against the one Bible." },
  { id: "hindutexts", n: 2, part: 1, title: "All the Hindu texts, and how they fit", desc: "The map of the Hindu texts, and a fair test",
    reflect: "A God who speaks would not contradict Himself. Where have you seen the Bible's one story stay consistent where other texts contradict each other, and who could you show that to?",
    reflectSeeker: "Which of these texts did you grow up with? Have you ever noticed them disagreeing about who God is?",
    recap: "The Hindu texts are many, written over about 3,000 years, with no single story and no closed list. Only the Gita and a few sections sit inside the Mahabharata.",
    lead: "Next, each group in turn, starting with the oldest: the Vedas and the Upanishads." },
  { id: "vedas", n: 3, part: 1, title: "The Vedas and the Upanishads", desc: "Ritual and philosophy, put to the test",
    reflect: "The Upanishads say your deepest problem is ignorance. The Bible says it is sin. Why does that difference matter, and how would you explain it to a Hindu friend?",
    reflectSeeker: "The Upanishads say your deepest problem is ignorance. The Bible says it is sin. Which do you think is true of you?",
    recap: "The Vedas offer ritual and the Upanishads offer knowledge. No one vouches for them, they contradict themselves, and they never deal with sin. The Bible announces a God who came to save.",
    lead: "Next, the Mahabharata, the epic that holds the Gita." },
  { id: "mahabharata", n: 4, part: 1, title: "The Mahabharata and the Bhagavad Gita", desc: "The family war, and whether anyone in it is good",
    reflect: "The Mahabharata ends in grief, with no one fully good. Where do you see that same brokenness in your own heart, and why do you need someone who never fell short?",
    recap: "The Gita is one conversation inside the Mahabharata, a family war with no clean victory. Its heroes win by deceit and no one in it is good. The Bible names one who never fell short: Jesus.",
    lead: "Next, the Ramayana, and why Rama is not like Jesus." },
  { id: "ramayana", n: 5, part: 1, title: "The Ramayana", desc: "Why Rama is not like Jesus",
    reflect: "Rama defeats his enemies, but Jesus died for His. What does it mean to you that Christ died for you while you were still His enemy (Romans 5:10)?",
    recap: "There is no evidence Rama lived, he falls short himself, and as an avatar he comes to protect the good and destroy the wicked. Jesus is real, sinless, and came once to die for the wicked and rise again.",
    lead: "Next, the Puranas, where the gods compete for the top place." },
  { id: "puranas", n: 6, part: 1, title: "The Puranas and the gods", desc: "Rival gods, and sins washed away",
    reflect: "The gods of the Puranas are like us. The God of the Bible is holy, and yet He came near. How does Jesus show you both God's holiness and His love?",
    recap: "Each Purana crowns a different god, the gods sin like people, and sin is washed away without justice. The Bible's one God is holy, and He pays for sin Himself.",
    lead: "Next, the rest of the map: law books, philosophy and devotional poems." },
  { id: "othertexts", n: 7, part: 1, title: "Law books, philosophy and devotional poems", desc: "The rest of the map, put to the test",
    reflect: "Every one of these texts gives you something to do. The gospel tells you what Christ has done. Where are you still tempted to earn what God gives freely?",
    reflectSeeker: "Have you ever tried to earn God's favor by duty, ritual or devotion? What would it mean to receive it as a gift?",
    recap: "The law books rank people by birth, the philosophers contradict each other, the temple manuals house gods in images, and the poets long for a God they cannot reach. Only Christ makes a person new.",
    lead: "We have walked through the Hindu texts. Now the Bible: one story from beginning to end, and the two side by side." },
  { id: "bible", n: 8, part: 2, title: "The Bible: one story of redemption (Mukti)", desc: "From the first page to the last, and the two side by side",
    reflect: "Where do you see yourself in the Bible's story: rebelling, longing, or redeemed? What does it mean to you that God never stopped reaching for His people?",
    recap: "The Bible is one finished book with one story: man's rebellion and God's redemption (mukti), joined by Jesus. Side by side, the Hindu texts disagree and never deal with sin, while the Bible's one God pays for sin Himself.",
    lead: "Next, the one thread that runs through the whole Bible, and where it leads." },
  { id: "thread", n: 9, part: 2, title: "One thread through the whole Bible", desc: "How the Bible's hope runs from Genesis to Revelation",
    reflect: "What do you hope for most when you think about the end of the story, for the world and for you? What would it take for that hope to be well-founded?",
    recap: "From Genesis to Revelation the Bible follows one promise: God will redeem a broken world. The Redeemer is Jesus, and the story ends with God living with His people.",
    lead: "With both laid out, the questions begin. First, one big difference shapes them all: the shape of time." },
  { id: "worldview", n: 10, part: 3, title: "Two shapes of reality", desc: "Cyclic and linear time",
    reflect: "Does life feel to you more like a circle or a road? What would it mean if history really were going somewhere?",
    recap: "Hindu thought sees time as a cycle of ages that repeats. The Bible sees one line from creation to new creation, with the cross at the center, happening once for all.",
    lead: "With that frame in place, the first question: is love at the very center of reality?" },
  { id: "c1", n: 11, part: 3, title: "Monism and the personal God", desc: "Can love be ultimate?",
    reflect: "Do you long to be loved by someone, or to be absorbed into something? What does your heart say love needs?",
    recap: "If the highest reality has no qualities, then love is not ultimate. The Bible says God is love in Himself, Father, Son and Spirit, and showed it in Jesus.",
    lead: "Karma explains today by yesterday. Next: what explains the very first act?" },
  { id: "c2", n: 12, part: 3, title: "Karma and the endless chain", desc: "The problem of infinite regress",
    reflect: "Where do you notice the weight of what came before you, in your family, your culture, your choices? What would it take to be free of it?",
    recap: "A chain of past lives with no beginning postpones the explanation forever. The Bible names a starting point, a good creation and a real fall, and a God who steps in to deal with sin.",
    lead: "Next: if I cannot remember a past life, can it be fair that I pay for it?" },
  { id: "c3", n: 13, part: 3, title: "Punished for a life you cannot remember", desc: "Rebirth and moral responsibility",
    reflect: "What would you want justice to look like if you were wronged? What would you hope for if you were the one who did wrong?",
    recap: "Paying for a life you cannot remember breaks the link between the person and the deed. The Bible says each of us answers for our own life, and Christ offers to carry the debt.",
    lead: "Next: if every religion says something different, can they all be true?" },
  { id: "c4", n: 14, part: 3, title: "Can every path be true?", desc: "Pluralism and non-contradiction",
    reflect: "Why is it more loving to tell a friend the truth about Jesus than to say every path leads to God? How could you say it with both truth and gentleness?",
    reflectSeeker: "Can every path be true if the paths say opposite things? What would it mean for you if Jesus really is the way?",
    recap: "Opposite claims cannot both be true, and even the Gita ends with an exclusive call. The question is which call is true, and the Bible rests its answer on the resurrection.",
    lead: "The four questions are asked. Now the question underneath them all: can the texts be trusted? Start with who wrote them, and when." },
  { id: "structure", n: 15, part: 4, title: "How the texts are built", desc: "Who wrote each text, when, and whether it rests on real events",
    reflect: "Why does it matter that the Bible names its witnesses and rests on real events? How would you explain that to a friend who trusts a text no one can check?",
    reflectSeeker: "Does it matter to you whether a sacred text can be checked? What would you expect from a text that really came from God?",
    recap: "The Hindu texts have no single author, date or closed list, and their authority rests on teaching. The Bible names its authors, is one closed text, and rests on events that can be checked.",
    lead: "Knowing who wrote a text is half the answer. Next: how did each text reach us, and can we check it?" },
  { id: "transmission", n: 16, part: 4, title: "How the texts were passed down", desc: "Oral performance and manuscripts",
    reflect: "How does knowing the Bible was carefully kept, and can be checked, give you confidence to share it?",
    reflectSeeker: "How much does it matter to you that the Bible can be checked against its oldest copies? Would you be willing to read it for yourself?",
    recap: "The Vedas were memorized, the Mahabharata was performed and reshaped, and the Bible was written, copied and compared. Copies that can be laid side by side let us check what was first written.",
    lead: "A text can be kept perfectly and still be out of reach. Next: who was each text meant for?" },
  { id: "access", n: 17, part: 4, title: "Preserved, but who can understand?", desc: "The shape of each text and who it is for",
    reflect: "God spoke in ordinary language so that everyone could understand. Who in your life needs to hear His word plainly, and how could you open it with them?",
    reflectSeeker: "God spoke in ordinary language so that anyone could understand. Have you ever read one of the Gospels for yourself?",
    recap: "Much Hindu teaching was kept by specialists in Sanskrit, though the Gita and the poet-saints opened it wider. The Bible was written in common languages for everyone, and its Word became a person.",
    lead: "Every long text has hard passages. Next, an honest look at the ones in both." },
  { id: "tensions", n: 18, part: 4, title: "Hard passages in both texts", desc: "Difficulties in the Gita, the Mahabharata and the Bible",
    reflect: "Which hard passage in the Bible do you need to understand better, so you can answer a friend with confidence? Where will you go for help?",
    reflectSeeker: "Which hard question about the Bible would you most like answered? Who could you ask?",
    recap: "Both have hard passages. The Bible's are details around one event, the resurrection, and they have answers. The Hindu texts disagree about who God is.",
    lead: "Now the heart of the difference: how can sin be forgiven?" },
  { id: "sin", n: 19, part: 5, title: "Sin, forgiveness and the Lamb", desc: "Who pays for sin?",
    reflect: "What would it mean for a debt to be paid by someone else for you? How does that land: as relief, as discomfort, or as both?",
    recap: "Karma gives justice without mercy, and grace without a cost leaves justice unexplained. At the cross God is both just and merciful, because He pays the debt Himself.",
    lead: "Next, how every question in this guide points to a longing the gospel meets." },
  { id: "bridge", n: 20, part: 5, title: "From argument to gospel", desc: "Every longing answered in Jesus",
    reflect: "Which of these longings do you see in your Hindu friend? How does Jesus answer it, and how could you tell them?",
    reflectSeeker: "Which of these longings do you feel most: to be loved, to be free, to see justice, or to have God near? What if Jesus is the answer to it?",
    recap: "Each question in this guide points to a real longing: to be loved, to be free, to see justice and to have God near. Each one finds its Yes in Jesus.",
    lead: "Next, the hope Jesus promised: a place prepared, and His return." },
  { id: "hope", n: 21, part: 6, title: "I go to prepare a place for you", desc: "Cross, empty tomb, return",
    reflect: "What do you hope for when you think about the end of your life, or of the world? What does the hope of Jesus say to that?",
    recap: "Christian hope is not release from existence but resurrection into a home with God. Jesus rose, so death is not the end.",
    lead: "That hope comes with a loving warning: there is one life, and it matters." },
  { id: "destinies", n: 22, part: 6, title: "One life, two destinies", desc: "A loving warning",
    reflect: "How should we speak about serious things with great gentleness? What is the difference between warning and caring?",
    reflectSeeker: "If there is one life and then judgment, what would you want to be true of your life when it ends?",
    recap: "Scripture teaches one life, then judgment, and two destinies. The warning must be spoken with tears, and always with the invitation attached.",
    lead: "Next, what it looks like to walk with a friend toward Jesus." },
  { id: "disciples", n: 23, part: 6, title: "Go and make disciples", desc: "The Great Commission in practice",
    reflect: "Who has helped you know God better? Who could you walk alongside, simply by being a friend and listening?",
    reflectSeeker: "Has anyone ever invited you to follow Jesus? What holds you back, or what draws you?",
    recap: "Making disciples means friendship, reading Scripture together, meeting Jesus, baptism and a new life, with care for family, culture and the law.",
    lead: "Last, where the whole story ends." },
  { id: "glory", n: 24, part: 7, title: "Worthy is the Lamb", desc: "The glory of eternity with Christ",
    reflect: "Which part of this scene moves you most? Who do you most long to see in that crowd, and who could you invite to come?",
    reflectSeeker: "Which part of this scene moves you most? Would you want to be in that crowd?",
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
