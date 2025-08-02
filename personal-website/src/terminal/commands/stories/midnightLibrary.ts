// Story System Types
interface StoryChoice {
  text: string;
  next: string;
}

interface StoryNode {
  title: string;
  text: string;
  choices: Record<string, StoryChoice>;
}

interface Story {
  id: string;
  title: string;
  description: string;
  theme: string;
  nodes: Record<string, StoryNode>;
  startNode: string;
}

export const midnightLibraryStory: Story = {
  id: 'midnight-library',
  title: '📚 The Midnight Library',
  description: 'Trapped in a supernatural library after hours, you must navigate through ancient books, ghostly encounters, and mystical artifacts to escape.',
  theme: 'supernatural-academic',
  startNode: 'start',
  nodes: {
    start: {
      title: "📚 The Midnight Library",
      text: `You're working late at the university library when the lights suddenly flicker and go out. The emergency lighting casts eerie shadows between the towering bookshelves. You hear the main doors slam shut with a loud BANG that echoes through the silence.

Your phone has no signal. The exit doors won't budge no matter how hard you push. You're trapped.

As your eyes adjust to the dim red glow of the emergency lights, you notice three areas of the library that seem... different. The <span class="text-yellow-400">ancient history section</span> where you swear you can hear whispers coming from between the books.
The <span class="text-red-400">basement archives</span> where a strange blue light flickers from beneath the door.
The <span class="text-blue-400">librarian's office</span> where you can see a shadowy figure moving behind the frosted glass.

<span class="text-cyan-400">Where do you decide to investigate first?</span>`,
      choices: {
        'a': { text: 'Investigate the whispering history section', next: 'history_path' },
        'b': { text: 'Descend to the basement archives', next: 'basement_path' },
        'c': { text: 'Check the librarian\'s office', next: 'office_path' },
        'history': { text: 'Investigate the whispering history section', next: 'history_path' },
        'basement': { text: 'Descend to the basement archives', next: 'basement_path' },
        'office': { text: 'Check the librarian\'s office', next: 'office_path' }
      }
    },
    
    history_path: {
      title: "📜 The Whispering Tomes",
      text: `You cautiously approach the ancient history section. The whispers grow louder as you get closer - they sound like dozens of voices speaking in languages you don't recognize. The old leather-bound books seem to pulse with a faint, otherworldly glow.

As you reach for one of the glowing books, you notice three that stand out from the rest:
📖 A blood-red tome titled "Forbidden Rituals" - it feels warm to the touch and you swear you can hear a heartbeat coming from within
🗿 An obsidian-black book called "Ancient Curses" - frost forms on the shelf around it and your breath becomes visible in the sudden cold
⚰️ A bone-white volume labeled "Spirits of the Past" - it seems to float slightly above the shelf and whispers your name

Each book radiates a different kind of supernatural energy...

<span class="text-cyan-400">Which cursed tome do you dare to open?</span>`,
      choices: {
        'a': { text: 'Open the warm, pulsing red book', next: 'ritual_encounter' },
        'b': { text: 'Touch the freezing black tome', next: 'curse_encounter' },
        'c': { text: 'Reach for the floating white book', next: 'spirit_encounter' },
        'ritual': { text: 'Open the warm, pulsing red book', next: 'ritual_encounter' },
        'curse': { text: 'Touch the freezing black tome', next: 'curse_encounter' },
        'spirit': { text: 'Reach for the floating white book', next: 'spirit_encounter' }
      }
    },

    basement_path: {
      title: "🔦 The Glowing Archives",
      text: `You push open the heavy basement door and descend the creaking wooden stairs. The strange blue light grows brighter as you go deeper. The air becomes thick and humid, and you can smell something musty and ancient.

At the bottom, you find yourself in a vast underground chamber filled with towering shelves of old documents and artifacts. The blue light is coming from three different sources:
💎 A glowing crystal sitting atop a pedestal, surrounded by strange symbols carved into the floor
📺 An old computer terminal that shouldn't be working, displaying scrolling text in an unknown language
🕳️ A dark pit in the corner where the blue light seems to be seeping up from the depths below

You can hear something moving in the shadows between the shelves...

<span class="text-cyan-400">What draws your attention first?</span>`,
      choices: {
        'a': { text: 'Examine the mysterious glowing crystal', next: 'crystal_encounter' },
        'b': { text: 'Investigate the impossible computer', next: 'computer_encounter' },
        'c': { text: 'Peer into the glowing pit', next: 'pit_encounter' },
        'crystal': { text: 'Examine the mysterious glowing crystal', next: 'crystal_encounter' },
        'computer': { text: 'Investigate the impossible computer', next: 'computer_encounter' },
        'pit': { text: 'Peer into the glowing pit', next: 'pit_encounter' }
      }
    },

    office_path: {
      title: "👻 The Librarian's Secret",
      text: `You approach the librarian's office, your footsteps echoing in the empty library. The shadowy figure behind the frosted glass seems to notice your approach and becomes perfectly still. You can see the outline of someone sitting at the desk, but something feels... wrong.

You try the door handle - it's unlocked. As you slowly push the door open, you're faced with three unsettling discoveries:
🪑 The chair is spinning slowly by itself, and there's no one there - but you can see the impression of someone sitting in the worn leather
📞 An old rotary phone is ringing with a shrill, piercing sound that seems to come from another era
🖼️ A portrait on the wall shows the previous head librarian, but her eyes seem to follow you, and her expression changes when you're not looking directly at it

The temperature in the room drops noticeably, and you can see your breath...

<span class="text-cyan-400">What do you investigate first?</span>`,
      choices: {
        'a': { text: 'Sit in the spinning chair', next: 'chair_encounter' },
        'b': { text: 'Answer the ringing phone', next: 'phone_encounter' },
        'c': { text: 'Examine the moving portrait', next: 'portrait_encounter' },
        'chair': { text: 'Sit in the spinning chair', next: 'chair_encounter' },
        'phone': { text: 'Answer the ringing phone', next: 'phone_encounter' },
        'portrait': { text: 'Examine the moving portrait', next: 'portrait_encounter' }
      }
    },

    // Horror encounters and endings
    ritual_encounter: {
      title: "🔥 The Forbidden Ritual",
      text: `As you open the red book, it immediately begins to bleed actual blood onto your hands! The pages flip by themselves, revealing ancient symbols that seem to burn into your vision. You try to close it, but your hands won't obey.

Suddenly, the book speaks in a voice that sounds like crackling flames: "You have awakened the ritual of binding. Choose your fate, mortal..."

The room fills with an otherworldly red glow, and you realize you must complete the ritual or be trapped forever. But you have a choice in how it ends...

<span class="text-red-400">The book offers you three paths to complete the ritual:</span>
🔥 Embrace the power and become the new guardian of forbidden knowledge
🚪 Use the ritual to break the library's curse and escape
💀 Refuse to complete it and face the consequences

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        'a': { text: 'Embrace the dark power', next: 'guardian_ending' },
        'b': { text: 'Use it to escape', next: 'escape_ending' },
        'c': { text: 'Refuse the ritual', next: 'trapped_ending' },
        'power': { text: 'Embrace the dark power', next: 'guardian_ending' },
        'escape': { text: 'Use it to escape', next: 'escape_ending' },
        'refuse': { text: 'Refuse the ritual', next: 'trapped_ending' }
      }
    },

    curse_encounter: {
      title: "❄️ The Ancient Curse",
      text: `The moment you touch the black book, ice crystals begin forming on your fingers and spreading up your arms! The book opens by itself, revealing pages covered in frost that show moving images of people trapped in ice.

A voice like winter wind whispers: "You have triggered the Curse of Eternal Winter. But even curses can be... negotiated."

The cold is spreading through your body, but you notice three different incantations glowing on the page before you. Each one offers a different way to deal with the curse...

<span class="text-blue-400">The curse gives you three options:</span>
❄️ Accept the curse and become the Winter Guardian of the library
🔥 Fight the curse with the fire of determination
🤝 Try to bargain with the curse for a different fate

<span class="text-cyan-400">How do you respond to the curse?</span>`,
      choices: {
        'a': { text: 'Accept your icy fate', next: 'winter_ending' },
        'b': { text: 'Fight with inner fire', next: 'hero_ending' },
        'c': { text: 'Bargain with the curse', next: 'bargain_ending' },
        'accept': { text: 'Accept your icy fate', next: 'winter_ending' },
        'fight': { text: 'Fight with inner fire', next: 'hero_ending' },
        'bargain': { text: 'Bargain with the curse', next: 'bargain_ending' }
      }
    },

    spirit_encounter: {
      title: "👻 The Calling Spirits",
      text: `As you reach for the floating book, ghostly hands emerge from its pages and gently pull you into a swirling vortex of memories and spirits! You find yourself in a realm between the living and the dead, surrounded by the ghosts of everyone who ever worked in this library.

The spirits speak in unison: "We have been waiting for someone brave enough to hear our story. We can show you the truth about this place, but first you must choose how you wish to help us..."

Three ghostly figures step forward, each offering a different path:
👻 The Head Librarian who wants you to help free all the trapped spirits
📚 A young student who wants you to preserve their stories for the living world
⚖️ An ancient scholar who wants you to judge whether the library should remain haunted or be cleansed

<span class="text-cyan-400">Which spirit do you choose to help?</span>`,
      choices: {
        'a': { text: 'Help free all the spirits', next: 'liberation_ending' },
        'b': { text: 'Preserve their stories', next: 'chronicler_ending' },
        'c': { text: 'Judge the library\'s fate', next: 'judge_ending' },
        'free': { text: 'Help free all the spirits', next: 'liberation_ending' },
        'preserve': { text: 'Preserve their stories', next: 'chronicler_ending' },
        'judge': { text: 'Judge the library\'s fate', next: 'judge_ending' }
      }
    },

    crystal_encounter: {
      title: "💎 The Crystal of Knowledge",
      text: `As you approach the glowing crystal, it pulses brighter and suddenly projects holographic images all around you! You see the history of the library - how it was built on an ancient burial ground, how the first librarian made a deal with supernatural forces to preserve knowledge forever.

The crystal speaks directly into your mind: "I am the Heart of Eternal Learning. Those who seek knowledge must pay a price. Choose wisely..."

Three visions appear before you:
🧠 Touch the crystal and gain infinite knowledge, but lose your humanity
🔮 Use the crystal's power to see the future, but be cursed to never change it
🌟 Shatter the crystal to free everyone, but lose all the ancient knowledge forever

<span class="text-cyan-400">What do you decide?</span>`,
      choices: {
        'a': { text: 'Gain infinite knowledge', next: 'knowledge_ending' },
        'b': { text: 'See the unchangeable future', next: 'prophet_ending' },
        'c': { text: 'Shatter the crystal', next: 'sacrifice_ending' },
        'knowledge': { text: 'Gain infinite knowledge', next: 'knowledge_ending' },
        'future': { text: 'See the unchangeable future', next: 'prophet_ending' },
        'shatter': { text: 'Shatter the crystal', next: 'sacrifice_ending' }
      }
    },

    computer_encounter: {
      title: "💻 The Impossible Machine",
      text: `You approach the ancient computer terminal. The screen flickers with text in languages that shouldn't exist, and you realize it's showing conversations between people from different time periods - all trapped in this library throughout history!

Suddenly, the screen clears and displays a message: "TEMPORAL LIBRARY SYSTEM ACTIVATED. USER DETECTED. CHOOSE YOUR TIMELINE..."

Three options appear on the screen:
⏰ Access the past and warn previous victims about the library's dangers
🔄 Create a time loop to escape by reliving this night until you find the solution
⚡ Overload the system to break the temporal barriers and free everyone at once

<span class="text-cyan-400">Which temporal option do you select?</span>`,
      choices: {
        'a': { text: 'Warn the past victims', next: 'timekeeper_ending' },
        'b': { text: 'Create a time loop', next: 'loop_ending' },
        'c': { text: 'Overload the system', next: 'temporal_ending' },
        'past': { text: 'Warn the past victims', next: 'timekeeper_ending' },
        'loop': { text: 'Create a time loop', next: 'loop_ending' },
        'overload': { text: 'Overload the system', next: 'temporal_ending' }
      }
    },

    pit_encounter: {
      title: "🕳️ The Abyss Calls",
      text: `You peer into the glowing pit and see that it descends far deeper than should be possible. The blue light comes from strange symbols carved into the walls that spiral down into darkness. As you watch, you realize the symbols are moving, rearranging themselves into messages.

A voice echoes from the depths: "Welcome, seeker. I am the Guardian of the Deep Archives. The surface library is merely a facade. The real knowledge lies below..."

Three paths down into the abyss become visible:
🪜 A ladder of bones that leads to the Archive of Lost Souls
🌊 A river of liquid starlight that flows to the Vault of Cosmic Secrets
🔥 A bridge of crystallized screams that spans to the Chamber of Forbidden Truths

<span class="text-cyan-400">Which path into the abyss do you take?</span>`,
      choices: {
        'a': { text: 'Climb the bone ladder', next: 'souls_ending' },
        'b': { text: 'Follow the starlight river', next: 'cosmic_ending' },
        'c': { text: 'Cross the scream bridge', next: 'forbidden_ending' },
        'bones': { text: 'Climb the bone ladder', next: 'souls_ending' },
        'starlight': { text: 'Follow the starlight river', next: 'cosmic_ending' },
        'screams': { text: 'Cross the scream bridge', next: 'forbidden_ending' }
      }
    },

    chair_encounter: {
      title: "🪑 The Librarian's Chair",
      text: `You sit in the spinning chair and immediately feel a presence settle over you like a heavy blanket. The chair stops spinning, and you find yourself unable to move. In the reflection of the dark computer screen, you see not your own face, but that of the previous head librarian!

Her voice speaks through your lips: "Finally, someone has come to take my place. I have been waiting so long to rest..."

You realize you're becoming the new ghostly librarian, but you have one last choice to make:
👻 Accept your fate and become the eternal guardian of the library
📖 Fight to maintain your identity while sharing the role
🚪 Use your new ghostly powers to help others escape

<span class="text-cyan-400">How do you handle your transformation?</span>`,
      choices: {
        'a': { text: 'Accept the guardian role', next: 'librarian_ending' },
        'b': { text: 'Share the role', next: 'partnership_ending' },
        'c': { text: 'Help others escape', next: 'savior_ending' },
        'accept': { text: 'Accept the guardian role', next: 'librarian_ending' },
        'share': { text: 'Share the role', next: 'partnership_ending' },
        'help': { text: 'Help others escape', next: 'savior_ending' }
      }
    },

    phone_encounter: {
      title: "📞 The Call from Beyond",
      text: `You pick up the ringing phone. The voice on the other end is crackling with static, but you can make out words: "Help... us... trapped... in the... books..."

As you listen, you realize it's not just one voice, but dozens of people calling from inside the books themselves! They've been absorbed into the stories and need someone to read them out.

The voice becomes clearer: "You can save us, but you must choose which stories to read first. We don't have much time before the library claims you too..."

Three urgent voices stand out:
📚 A child trapped in a fairy tale who needs someone to read their story backwards
📖 A scholar stuck in a history book who knows the library's weakness
📝 A group of students trapped in a textbook who have found a way to rewrite reality

<span class="text-cyan-400">Whose story do you choose to read first?</span>`,
      choices: {
        'a': { text: 'Read the fairy tale backwards', next: 'fairy_ending' },
        'b': { text: 'Free the knowledgeable scholar', next: 'scholar_ending' },
        'c': { text: 'Help the reality-writers', next: 'rewrite_ending' },
        'fairy': { text: 'Read the fairy tale backwards', next: 'fairy_ending' },
        'scholar': { text: 'Free the knowledgeable scholar', next: 'scholar_ending' },
        'rewrite': { text: 'Help the reality-writers', next: 'rewrite_ending' }
      }
    },

    portrait_encounter: {
      title: "🖼️ The Living Portrait",
      text: `You approach the portrait and watch as the painted librarian's eyes follow your movement. Suddenly, she steps out of the frame! She's translucent but clearly present, wearing clothes from decades past.

"I've been waiting for someone brave enough to look me in the eye," she says with a sad smile. "This library has been my prison for 50 years. I made a bargain to preserve knowledge forever, but the cost was higher than I imagined."

She extends her ghostly hand toward you: "I can teach you the truth about this place, but first you must decide what you're willing to sacrifice for knowledge..."

Three ghostly contracts appear in the air:
📜 Trade one year of your life for each person you save from the library
🕰️ Give up your memories of the outside world but gain power over the supernatural
💫 Sacrifice your ability to leave, but become the new protector of future visitors

<span class="text-cyan-400">Which contract do you sign?</span>`,
      choices: {
        'a': { text: 'Trade years for lives saved', next: 'sacrifice_years_ending' },
        'b': { text: 'Trade memories for power', next: 'memory_ending' },
        'c': { text: 'Become the new protector', next: 'protector_ending' },
        'years': { text: 'Trade years for lives saved', next: 'sacrifice_years_ending' },
        'memories': { text: 'Trade memories for power', next: 'memory_ending' },
        'protector': { text: 'Become the new protector', next: 'protector_ending' }
      }
    },

    // Final endings
    guardian_ending: {
      title: "🔥 The Dark Guardian",
      text: `You embrace the ritual's power and feel ancient knowledge flooding your mind. Your eyes glow with supernatural fire as you become the new Guardian of Forbidden Knowledge. The library transforms around you, becoming a nexus between worlds.

You now possess incredible power over dark magic and forbidden secrets, but you can never leave. Students and researchers who enter seeking dangerous knowledge will find you waiting, testing their worthiness.

<span class="text-red-400">💀 FATE SEALED: Guardian of Forbidden Knowledge</span>
<span class="text-yellow-400">You have become the keeper of secrets too dangerous for the world!</span>

<span class="text-gray-400">Type 'story reset' to escape this fate, or 'story' to begin a new nightmare.</span>`,
      choices: {}
    },

    escape_ending: {
      title: "🚪 The Narrow Escape",
      text: `You channel the ritual's power into breaking the library's supernatural hold. The building shakes as reality reasserts itself. Books fly off shelves, the lights flicker back on, and you hear the blessed sound of the doors unlocking!

You run toward the exit as the library tries to pull you back. Just as you reach the door, you turn to see the building fading like a mirage. By morning, there's just an empty lot where the library stood.

You escaped, but you'll never forget what you saw. Sometimes, late at night, you still hear whispers calling your name...

<span class="text-green-400">🎉 ENDING ACHIEVED: The Lucky Escape</span>
<span class="text-yellow-400">You survived the midnight library and lived to tell the tale!</span>

<span class="text-gray-400">Type 'story reset' to face new horrors, or 'story' to begin again.</span>`,
      choices: {}
    },

    trapped_ending: {
      title: "💀 Forever Bound",
      text: `You refuse to complete the ritual, and the book's pages begin wrapping around you like chains! The blood-red tome pulls you inside its pages, and you become part of the forbidden knowledge it contains.

Now you exist as words on a page, aware but unable to act. Future visitors to the library might read your story, but they'll think it's just fiction. You can only watch and hope that someday, someone will be brave enough to complete the ritual you refused.

Your consciousness drifts between the lines of text, forever warning others about the dangers that lurk in the midnight library...

<span class="text-red-400">💀 FATE SEALED: Trapped in the Pages</span>
<span class="text-yellow-400">You became part of the very story you tried to escape!</span>

<span class="text-gray-400">Type 'story reset' to break free from this literary prison, or 'story' to try again.</span>`,
      choices: {}
    },

    winter_ending: {
      title: "❄️ The Eternal Winter",
      text: `You accept the curse and feel the ice spreading through your veins, but instead of pain, you feel a strange peace. You become the Winter Guardian, your body transforming into living ice and snow. The library becomes your frozen domain.

Your new purpose is to preserve knowledge by freezing it in time. Visitors who show respect for learning are welcomed and protected, but those who would misuse knowledge find themselves trapped in ice until they learn wisdom.

You can feel every book, every page, every word in the library. They are all under your protection now, frozen in perfect preservation for eternity.

<span class="text-blue-400">❄️ FATE SEALED: The Winter Guardian</span>
<span class="text-yellow-400">You have become the eternal protector of frozen knowledge!</span>

<span class="text-gray-400">Type 'story reset' to thaw this fate, or 'story' to begin anew.</span>`,
      choices: {}
    },

    hero_ending: {
      title: "🔥 The Inner Fire",
      text: `You fight the curse with every ounce of determination you have! Your inner fire burns so bright that it melts the ice and shatters the curse entirely. The black book crumbles to ash, and you feel the supernatural cold leaving the library.

As the curse breaks, you hear the grateful whispers of everyone who was ever trapped by the winter magic. The library returns to normal, and the doors unlock. You've not only saved yourself, but freed all the previous victims of the curse.

You walk out into the dawn, forever changed by your experience but proud that you chose courage over surrender.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Curse Breaker</span>
<span class="text-yellow-400">Your inner fire conquered the eternal winter!</span>

<span class="text-gray-400">Type 'story reset' to face new challenges, or 'story' to begin again.</span>`,
      choices: {}
    },

    bargain_ending: {
      title: "🤝 The Devil's Bargain",
      text: `You negotiate with the curse, offering to take on part of its burden in exchange for the freedom of all its previous victims. The curse considers your offer and accepts, but with a twist.

You become a guardian against supernatural threats, able to sense and fight dark magic wherever you encounter it. The price is that you can never stay in one place too long - you must wander, helping others who face supernatural dangers.

It's not the life you planned, but as you help your first family escape from a haunted house, you realize it's a life with purpose.

<span class="text-purple-400">🌟 ENDING ACHIEVED: The Wandering Guardian</span>
<span class="text-yellow-400">You traded a normal life for the power to help others!</span>

<span class="text-gray-400">Type 'story reset' to choose a different path, or 'story' to begin again.</span>`,
      choices: {}
    },

    liberation_ending: {
      title: "👻 The Great Liberation",
      text: `You help the spirits perform a massive ritual of liberation. One by one, the ghosts of librarians, students, and researchers from decades past begin to glow with peaceful light. They thank you as they finally move on to whatever comes next.

As the last spirit fades away, the library transforms. The supernatural elements disappear, leaving behind just a normal building. You've freed everyone who was ever trapped here, and the library can finally serve its true purpose again.

You become something of a local legend - the person who cleansed the haunted library and made it safe for future generations of learners.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Spirit Liberator</span>
<span class="text-yellow-400">You freed countless souls and restored peace to the library!</span>

<span class="text-gray-400">Type 'story reset' to face new mysteries, or 'story' to begin again.</span>`,
      choices: {}
    },

    chronicler_ending: {
      title: "📚 The Eternal Chronicler",
      text: `You choose to preserve the spirits' stories, becoming a bridge between the living and the dead. The ghosts share their memories with you, and you gain the ability to see and record the hidden histories of any place you visit.

You leave the library with a supernatural gift - you can see the stories that places and objects hold. You become a writer of ghost stories, but your readers don't know that every tale you tell is absolutely true.

The spirits remain in the library, but they're no longer trapped. They're at peace, knowing their stories live on through your words.

<span class="text-purple-400">📖 ENDING ACHIEVED: The Ghost Story Writer</span>
<span class="text-yellow-400">You became the voice for those who can no longer speak!</span>

<span class="text-gray-400">Type 'story reset' to write a new story, or 'story' to begin again.</span>`,
      choices: {}
    },

    judge_ending: {
      title: "⚖️ The Final Judgment",
      text: `You accept the role of judge and carefully weigh the evidence. After hearing all the spirits' stories, you make a balanced decision: the library will remain a place where spirits can rest, but only those who choose to stay.

You establish new rules for the supernatural library. Spirits who wish to move on are free to do so, while those who want to continue helping researchers can remain as friendly guides. The library becomes a unique place where the living and dead work together in pursuit of knowledge.

You become the mediator between worlds, ensuring that the library serves both the living and the dead fairly.

<span class="text-gold-400">⚖️ ENDING ACHIEVED: The Supernatural Mediator</span>
<span class="text-yellow-400">You brought balance between the world of the living and the dead!</span>

<span class="text-gray-400">Type 'story reset' to judge new cases, or 'story' to begin again.</span>`,
      choices: {}
    },

    // Additional endings for all paths
    knowledge_ending: {
      title: "🧠 The Infinite Mind",
      text: `You touch the crystal and feel all knowledge of the universe flooding into your mind! You understand everything - the secrets of life, death, time, and space. But with infinite knowledge comes infinite sorrow, as you now know all the pain and suffering that has ever existed.

You become a living library, able to answer any question but unable to feel joy or surprise ever again. Visitors seek you out for wisdom, but you can only watch them with ancient, tired eyes.

<span class="text-blue-400">🧠 FATE SEALED: The All-Knowing Oracle</span>
<span class="text-yellow-400">You gained infinite knowledge but lost your humanity!</span>

<span class="text-gray-400">Type 'story reset' to forget everything, or 'story' to begin again.</span>`,
      choices: {}
    },

    prophet_ending: {
      title: "🔮 The Cursed Prophet",
      text: `You gain the ability to see the future, but the curse ensures you can never change what you see. You watch helplessly as you foresee accidents, tragedies, and disasters, unable to warn anyone or alter the timeline.

You escape the library but carry this terrible burden forever. You become a hermit, unable to bear seeing the futures of people you care about.

<span class="text-purple-400">🔮 FATE SEALED: The Helpless Prophet</span>
<span class="text-yellow-400">You can see tomorrow but can never change it!</span>

<span class="text-gray-400">Type 'story reset' to blind yourself to the future, or 'story' to begin again.</span>`,
      choices: {}
    },

    sacrifice_ending: {
      title: "🌟 The Noble Sacrifice",
      text: `You shatter the crystal, and with it, all the supernatural knowledge stored in the library is lost forever. But as it breaks, you feel the spirits of everyone trapped here being freed. The library returns to normal, and you've saved countless future victims.

You walk out into the dawn, knowing you've made the world a little safer. Sometimes the greatest victory requires the greatest sacrifice.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Knowledge Destroyer</span>
<span class="text-yellow-400">You sacrificed infinite wisdom to save infinite lives!</span>

<span class="text-gray-400">Type 'story reset' to seek new adventures, or 'story' to begin again.</span>`,
      choices: {}
    },

    timekeeper_ending: {
      title: "⏰ The Time Guardian",
      text: `You use the computer to send warnings back through time, creating a temporal loop that saves dozens of previous victims. But the effort traps you in the role of Time Guardian - you must remain in the library to maintain the temporal warnings.

You become unstuck in time, experiencing all moments simultaneously. You watch over the timeline, ensuring that your warnings reach those who need them most.

<span class="text-blue-400">⏰ FATE SEALED: The Temporal Guardian</span>
<span class="text-yellow-400">You saved the past but lost your present!</span>

<span class="text-gray-400">Type 'story reset' to escape time, or 'story' to begin again.</span>`,
      choices: {}
    },

    loop_ending: {
      title: "🔄 The Endless Loop",
      text: `You create a time loop, reliving this night over and over until you find the perfect solution. After 847 loops, you finally discover the exact sequence of actions needed to save everyone and escape.

But when you break the loop, you retain memories of all 847 attempts. You're free, but forever changed by experiencing the same night hundreds of times.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Loop Master</span>
<span class="text-yellow-400">You mastered time through repetition and determination!</span>

<span class="text-gray-400">Type 'story reset' to break free from all loops, or 'story' to begin again.</span>`,
      choices: {}
    },

    temporal_ending: {
      title: "⚡ The Time Shatterer",
      text: `You overload the temporal system, causing a massive explosion that shatters the barriers between past, present, and future! Everyone who was ever trapped in the library across all time periods is freed simultaneously.

The library becomes a temporal nexus where people from different eras can meet and share knowledge safely. You become the guardian of this unique space between times.

<span class="text-gold-400">⚡ ENDING ACHIEVED: The Temporal Liberator</span>
<span class="text-yellow-400">You freed everyone across all of time itself!</span>

<span class="text-gray-400">Type 'story reset' to return to linear time, or 'story' to begin again.</span>`,
      choices: {}
    },

    souls_ending: {
      title: "💀 The Soul Keeper",
      text: `You climb down the bone ladder into the Archive of Lost Souls. Here, you find the essence of everyone who ever died in the library. They offer you a choice: become their keeper and guide lost souls to peace, or take their collective power and become something beyond human.

You choose to become the Soul Keeper, helping lost spirits find their way to whatever comes after death. It's a lonely but meaningful existence.

<span class="text-purple-400">💀 FATE SEALED: The Soul Guide</span>
<span class="text-yellow-400">You became the shepherd of lost souls!</span>

<span class="text-gray-400">Type 'story reset' to release the souls, or 'story' to begin again.</span>`,
      choices: {}
    },

    cosmic_ending: {
      title: "🌌 The Cosmic Wanderer",
      text: `You follow the starlight river and find yourself floating through the cosmos, gaining knowledge of alien civilizations and cosmic mysteries. You become a bridge between Earth and the greater universe.

You return to Earth with the ability to travel between worlds, but you can never truly belong to any one place again. You become a wanderer between the stars.

<span class="text-blue-400">🌌 ENDING ACHIEVED: The Star Walker</span>
<span class="text-yellow-400">You gained the cosmos but lost your home world!</span>

<span class="text-gray-400">Type 'story reset' to return to Earth, or 'story' to begin again.</span>`,
      choices: {}
    },

    forbidden_ending: {
      title: "🔥 The Forbidden Scholar",
      text: `You cross the bridge of crystallized screams and enter the Chamber of Forbidden Truths. Here you learn secrets that were never meant for mortal minds - the true names of cosmic entities, the location of reality's source code, the password to existence itself.

You emerge with power over reality itself, but the knowledge burns in your mind like acid. You can reshape the world, but every use of this power causes you incredible pain.

<span class="text-red-400">🔥 FATE SEALED: The Reality Hacker</span>
<span class="text-yellow-400">You learned to edit reality but at a terrible cost!</span>

<span class="text-gray-400">Type 'story reset' to forget the forbidden truths, or 'story' to begin again.</span>`,
      choices: {}
    },

    librarian_ending: {
      title: "👻 The New Librarian",
      text: `You accept your transformation and become the new ghostly head librarian. You gain the ability to help future visitors navigate the supernatural dangers, guiding them toward safety or knowledge as they choose.

You find peace in your new role, helping others while maintaining the library's mystical balance. It's not the life you planned, but it's a life with purpose.

<span class="text-blue-400">👻 FATE SEALED: The Helpful Ghost</span>
<span class="text-yellow-400">You became the guardian angel of future visitors!</span>

<span class="text-gray-400">Type 'story reset' to pass on the role, or 'story' to begin again.</span>`,
      choices: {}
    },

    partnership_ending: {
      title: "🤝 The Shared Burden",
      text: `You and the previous librarian share the role, creating a unique partnership between the living and the dead. Together, you transform the library into a place where supernatural and normal research can coexist safely.

You live a double life - normal student by day, ghostly librarian by night. It's challenging but rewarding to bridge both worlds.

<span class="text-purple-400">🤝 ENDING ACHIEVED: The Bridge Between Worlds</span>
<span class="text-yellow-400">You found balance between life and death!</span>

<span class="text-gray-400">Type 'story reset' to choose a single world, or 'story' to begin again.</span>`,
      choices: {}
    },

    savior_ending: {
      title: "🚪 The Ghostly Savior",
      text: `You use your new ghostly powers to help others escape the library's supernatural traps. You become a guardian spirit, appearing to future visitors in their moment of greatest need to guide them to safety.

You can never leave the library, but you find joy in saving others from the fate you couldn't escape. Every person you help makes your sacrifice worthwhile.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Guardian Spirit</span>
<span class="text-yellow-400">You turned your curse into others' salvation!</span>

<span class="text-gray-400">Type 'story reset' to find your own escape, or 'story' to begin again.</span>`,
      choices: {}
    },

    fairy_ending: {
      title: "📚 The Fairy Tale Reversal",
      text: `You read the fairy tale backwards, which reverses the magic that trapped the child. As you do, you discover that reading stories backwards can undo supernatural curses! You use this knowledge to free everyone trapped in the books.

You become known as the Story Reverser, someone who can undo narrative magic by reading tales in reverse. It's a unique and powerful gift.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Reverse Reader</span>
<span class="text-yellow-400">You learned to undo magic through backwards storytelling!</span>

<span class="text-gray-400">Type 'story reset' to write new stories, or 'story' to begin again.</span>`,
      choices: {}
    },

    scholar_ending: {
      title: "📖 The Scholar's Wisdom",
      text: `You free the scholar, who reveals that the library's power comes from people's belief in stories. By convincing everyone that the supernatural events are just elaborate fiction, you can weaken the library's hold on reality.

Together, you spread the "truth" that it was all just a very convincing haunted house attraction. The library's power fades as people stop believing in its magic.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Myth Buster</span>
<span class="text-yellow-400">You defeated supernatural forces with skepticism and logic!</span>

<span class="text-gray-400">Type 'story reset' to believe in magic again, or 'story' to begin again.</span>`,
      choices: {}
    },

    rewrite_ending: {
      title: "📝 The Reality Writers",
      text: `You help the students rewrite the fundamental rules of the library's reality. Together, you edit the supernatural laws that govern the building, changing it from a trap into a sanctuary for learning.

You gain the ability to edit reality through writing, but you must be careful - every word you write becomes literally true.

<span class="text-gold-400">📝 ENDING ACHIEVED: The Reality Editor</span>
<span class="text-yellow-400">You learned to rewrite the world with words!</span>

<span class="text-gray-400">Type 'story reset' to edit this story, or 'story' to begin again.</span>`,
      choices: {}
    },

    sacrifice_years_ending: {
      title: "⏳ The Time Trader",
      text: `You sign the contract and immediately feel years of your life flowing away as you save person after person from the library's supernatural traps. Each rescue costs you time, but you gladly pay the price.

You age rapidly but save dozens of people. When you finally escape, you're much older but filled with the satisfaction of knowing your sacrifice saved many lives.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Life Giver</span>
<span class="text-yellow-400">You traded your years for others' freedom!</span>

<span class="text-gray-400">Type 'story reset' to reclaim your time, or 'story' to begin again.</span>`,
      choices: {}
    },

    memory_ending: {
      title: "🕰️ The Forgotten Hero",
      text: `You trade your memories of the outside world for supernatural power. You become incredibly powerful but can no longer remember your life before the library. You use your abilities to protect others, but you can never return to the world you've forgotten.

You become a mysterious figure of legend - the powerful guardian who protects people from supernatural threats but remembers nothing of normal life.

<span class="text-purple-400">🕰️ FATE SEALED: The Amnesiac Guardian</span>
<span class="text-yellow-400">You gained great power but lost yourself!</span>

<span class="text-gray-400">Type 'story reset' to remember who you were, or 'story' to begin again.</span>`,
      choices: {}
    },

    protector_ending: {
      title: "💫 The Eternal Protector",
      text: `You sacrifice your freedom to become the library's protector. You gain the power to shield future visitors from supernatural dangers, creating safe paths through the mystical maze.

You can never leave, but you find purpose in your role. The library becomes a place where people can safely explore the supernatural under your watchful protection.

<span class="text-blue-400">💫 FATE SEALED: The Protective Guardian</span>
<span class="text-yellow-400">You became the shield between visitors and danger!</span>

<span class="text-gray-400">Type 'story reset' to pass on your protection, or 'story' to begin again.</span>`,
      choices: {}
    }
  }
};