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

export const cursedForestStory: Story = {
  id: 'cursed-forest',
  title: '🌲 The Whispering Woods',
  description: 'Lost in an ancient forest where fairy tales come to life, but with dark twists. Navigate through enchanted creatures and magical trials to find your way home.',
  theme: 'dark-fairy-tale',
  startNode: 'start',
  nodes: {
    start: {
      title: "🌲 The Whispering Woods",
      text: `You were hiking alone when a sudden fog rolled in, and now you're completely lost. The forest around you seems different - older, wilder, and filled with an otherworldly presence. Ancient trees tower overhead, their branches forming a canopy so thick that only scattered beams of moonlight reach the forest floor.

As the fog clears, you notice three paths diverging before you, each marked by strange signs:
🍄 The <span class="text-red-400">Mushroom Circle Path</span> where glowing toadstools form perfect rings and you can hear tiny voices singing
🏠 The <span class="text-yellow-400">Gingerbread Trail</span> where candy wrappers and cake crumbs lead deeper into the woods, despite no one being around to drop them
🐺 The <span class="text-blue-400">Howling Path</span> where wolf tracks in the mud seem too large to be from any normal animal, and distant howls echo through the trees

Each path pulses with its own magical energy, and you sense that your choice will determine not just your route, but your fate...

<span class="text-cyan-400">Which enchanted path do you take?</span>`,
      choices: {
        'a': { text: 'Follow the glowing mushroom circles', next: 'fairy_realm' },
        'b': { text: 'Take the gingerbread trail', next: 'witch_cottage' },
        'c': { text: 'Brave the howling wolf path', next: 'werewolf_territory' },
        'mushroom': { text: 'Follow the glowing mushroom circles', next: 'fairy_realm' },
        'gingerbread': { text: 'Take the gingerbread trail', next: 'witch_cottage' },
        'wolf': { text: 'Brave the howling wolf path', next: 'werewolf_territory' }
      }
    },

    fairy_realm: {
      title: "🧚 The Court of Whispers",
      text: `Following the mushroom circles leads you to a clearing where the air shimmers with magic. Tiny lights dance between the trees - fairies, but not the gentle kind from children's stories. These fae have sharp teeth and mischievous eyes that gleam with ancient cunning.

The Fairy Queen materializes before you, beautiful but terrifying, her dress made of spider silk and moonbeams. "A mortal has entered our realm," she says with a voice like silver bells. "You must play our games to earn passage, but beware - we play for keeps."

Three fairy courts step forward, each offering a different challenge:
🌸 The <span class="text-pink-400">Spring Court</span> offers a riddle contest where wrong answers cost you memories
🍂 The <span class="text-orange-400">Autumn Court</span> challenges you to a dance where missteps trap you in eternal revelry
❄️ The <span class="text-blue-400">Winter Court</span> proposes a game of truth where lies freeze your heart

The fairies circle around you, their laughter like wind chimes in a storm...

<span class="text-cyan-400">Which court's challenge do you accept?</span>`,
      choices: {
        'a': { text: 'Accept the Spring Court\'s riddles', next: 'riddle_challenge' },
        'b': { text: 'Dance with the Autumn Court', next: 'dance_challenge' },
        'c': { text: 'Play truth with the Winter Court', next: 'truth_challenge' },
        'spring': { text: 'Accept the Spring Court\'s riddles', next: 'riddle_challenge' },
        'autumn': { text: 'Dance with the Autumn Court', next: 'dance_challenge' },
        'winter': { text: 'Play truth with the Winter Court', next: 'truth_challenge' }
      }
    },

    witch_cottage: {
      title: "🏠 The Candy House",
      text: `The gingerbread trail leads you to a cottage that looks like it's made entirely of sweets - gingerbread walls, candy cane pillars, and a roof of chocolate shingles. But something feels wrong. The candy is too perfect, too fresh, and you notice bones scattered in the garden among the sugar flowers.

An old woman emerges from the cottage, but her appearance keeps shifting. Sometimes she looks like a kindly grandmother, other times like a withered hag with iron teeth. "Welcome, dearie," she cackles. "I've been so lonely. Won't you stay for dinner?"

You realize this is the witch from the old fairy tales, but she offers you three choices instead of simply trying to eat you:
🍯 Accept her hospitality and risk being fattened up for her oven
🔮 Challenge her to a magical duel for your freedom
📚 Offer to trade stories - your modern knowledge for safe passage

The witch's eyes gleam with hunger, but also with curiosity about what you might choose...

<span class="text-cyan-400">How do you deal with the candy witch?</span>`,
      choices: {
        'a': { text: 'Accept her dangerous hospitality', next: 'witch_guest' },
        'b': { text: 'Challenge her to magical combat', next: 'witch_duel' },
        'c': { text: 'Offer to trade stories', next: 'story_trade' },
        'hospitality': { text: 'Accept her dangerous hospitality', next: 'witch_guest' },
        'duel': { text: 'Challenge her to magical combat', next: 'witch_duel' },
        'stories': { text: 'Offer to trade stories', next: 'story_trade' }
      }
    },

    werewolf_territory: {
      title: "🐺 The Pack's Domain",
      text: `The howling path leads you deeper into the forest where the trees grow so close together that you have to squeeze between them. The wolf tracks become more frequent, and you realize you're being followed. Yellow eyes gleam from the shadows, and low growls echo from all directions.

A massive wolf steps into your path - but this is no ordinary animal. It's a werewolf, standing on its hind legs, with intelligence burning in its eyes. "You trespass in our hunting grounds," it growls in a voice that's half-human, half-beast.

The werewolf pack surrounds you, but their leader offers you three options instead of simply attacking:
🌙 Join their pack and become a werewolf yourself, gaining their strength but losing your humanity
🏃 Prove your worth by surviving their hunt until dawn - if you can evade them, you earn safe passage
🤝 Offer to help them with a problem that's been plaguing their pack in exchange for guidance out of the forest

The pack circles closer, their eyes reflecting the moonlight like stars...

<span class="text-cyan-400">How do you respond to the werewolf pack?</span>`,
      choices: {
        'a': { text: 'Accept transformation into their pack', next: 'werewolf_transformation' },
        'b': { text: 'Accept the challenge of the hunt', next: 'survival_hunt' },
        'c': { text: 'Offer to help with their problem', next: 'pack_alliance' },
        'join': { text: 'Accept transformation into their pack', next: 'werewolf_transformation' },
        'hunt': { text: 'Accept the challenge of the hunt', next: 'survival_hunt' },
        'help': { text: 'Offer to help with their problem', next: 'pack_alliance' }
      }
    },

    riddle_challenge: {
      title: "🌸 The Memory Wager",
      text: `The Spring Court fairies gather around you in a circle of blooming flowers. Their leader, a fairy with butterfly wings and rose-petal skin, speaks: "We shall ask you three riddles. Answer correctly, and we grant you passage. Answer wrong, and we take a precious memory as payment."

The first riddle comes: "I am born in darkness, live in light, and die in shadow. I can be captured but never held, reflected but never touched. What am I?"

As you think, you feel the weight of your memories - childhood summers, first love, family gatherings. The fairies watch with hungry eyes, ready to feast on your recollections if you fail.

You realize you have three approaches:
🧠 Trust your logic and answer with confidence
🎭 Try to trick the fairies with a clever non-answer
💝 Offer a memory willingly in exchange for a hint

<span class="text-cyan-400">How do you handle the riddle challenge?</span>`,
      choices: {
        'a': { text: 'Answer with pure logic', next: 'riddle_master_ending' },
        'b': { text: 'Try to outsmart the fairies', next: 'trickster_ending' },
        'c': { text: 'Trade a memory for help', next: 'memory_sacrifice_ending' },
        'logic': { text: 'Answer with pure logic', next: 'riddle_master_ending' },
        'trick': { text: 'Try to outsmart the fairies', next: 'trickster_ending' },
        'trade': { text: 'Trade a memory for help', next: 'memory_sacrifice_ending' }
      }
    },

    dance_challenge: {
      title: "🍂 The Eternal Waltz",
      text: `The Autumn Court fairies begin playing music on instruments made of leaves and twigs. The melody is hauntingly beautiful, and you feel your feet beginning to move against your will. The lead fairy, crowned with autumn leaves that shift from gold to red to brown, extends her hand.

"Dance with us until the music stops," she says with a smile that doesn't reach her eyes. "But know that our music has been playing for a thousand years, and many mortals have joined our eternal waltz."

As you begin to dance, you see other humans among the fairies - people who got lost in the dance and never found their way out. But you notice three possible ways to break free:
💃 Dance so perfectly that you impress the fairies into releasing you
🎵 Try to change the rhythm and take control of the music
⏰ Wait for a moment when the music naturally pauses and break free then

The dance grows faster and more frenzied with each passing moment...

<span class="text-cyan-400">How do you escape the eternal dance?</span>`,
      choices: {
        'a': { text: 'Dance with perfect grace', next: 'dance_master_ending' },
        'b': { text: 'Take control of the music', next: 'music_controller_ending' },
        'c': { text: 'Wait for the perfect moment', next: 'patient_escape_ending' },
        'perfect': { text: 'Dance with perfect grace', next: 'dance_master_ending' },
        'control': { text: 'Take control of the music', next: 'music_controller_ending' },
        'wait': { text: 'Wait for the perfect moment', next: 'patient_escape_ending' }
      }
    },

    truth_challenge: {
      title: "❄️ The Game of Hearts",
      text: `The Winter Court fairies create a circle of ice around you, their breath visible in the suddenly frigid air. Their queen, beautiful as fresh snow but cold as a glacier, speaks: "We shall ask you three questions, and you must answer with absolute truth. Lie, and your heart will freeze. Answer honestly, and we shall grant you passage."

The first question comes like a winter wind: "What is your greatest fear?"

You feel the magical compulsion to tell the truth, but you also sense that your answers will reveal your deepest vulnerabilities to these ancient, amoral beings. You have three strategies:
🗣️ Answer with complete honesty and trust in the fairy's honor
🛡️ Tell technical truths that reveal nothing important
💔 Refuse to answer and accept the consequences

The ice circle grows smaller, and frost begins forming on your clothes...

<span class="text-cyan-400">How do you play the game of truth?</span>`,
      choices: {
        'a': { text: 'Answer with complete honesty', next: 'honest_soul_ending' },
        'b': { text: 'Give technical but meaningless truths', next: 'clever_truth_ending' },
        'c': { text: 'Refuse to play their game', next: 'frozen_heart_ending' },
        'honest': { text: 'Answer with complete honesty', next: 'honest_soul_ending' },
        'technical': { text: 'Give technical but meaningless truths', next: 'clever_truth_ending' },
        'refuse': { text: 'Refuse to play their game', next: 'frozen_heart_ending' }
      }
    },

    witch_guest: {
      title: "🍯 The Fattening Feast",
      text: `You accept the witch's invitation and enter her candy cottage. Inside, everything is even more elaborate - furniture made of cake, curtains of spun sugar, and a fireplace that burns with flames that smell like cinnamon.

The witch serves you a feast of impossible delicacies, each bite more delicious than the last. But as you eat, you notice you're growing drowsy and your clothes are getting tighter. The witch watches with growing excitement as her plan unfolds.

However, you discover three potential escapes:
🔥 Pretend to fall asleep, then push the witch into her own oven when she approaches
🪄 Use a magic word you overheard her muttering to turn her own spell against her
🤝 Reveal that you know her true name and bargain for your freedom

The witch sharpens her carving knife as she prepares for her feast...

<span class="text-cyan-400">How do you escape the witch's oven?</span>`,
      choices: {
        'a': { text: 'Turn the tables and use her oven', next: 'witch_defeat_ending' },
        'b': { text: 'Use her own magic against her', next: 'spell_reversal_ending' },
        'c': { text: 'Bargain with her true name', next: 'name_power_ending' },
        'oven': { text: 'Turn the tables and use her oven', next: 'witch_defeat_ending' },
        'magic': { text: 'Use her own magic against her', next: 'spell_reversal_ending' },
        'name': { text: 'Bargain with her true name', next: 'name_power_ending' }
      }
    },

    witch_duel: {
      title: "🔮 The Magical Confrontation",
      text: `You challenge the witch to a duel of magic, and she cackles with delight. "A mortal thinks they can match my centuries of power? Very well, let's see what you're made of!"

The witch begins hurling spells at you - bolts of green fire, swarms of candy-colored wasps, and vines that try to entangle your feet. You realize you have no actual magic, but you notice three ways to fight back:
🪞 Use the witch's own mirrors to reflect her spells back at her
🧂 Throw salt from her kitchen, which seems to disrupt her magic
📱 Use your modern technology in ways she doesn't understand

The cottage shakes as magical energies clash around you...

<span class="text-cyan-400">How do you fight the magical witch?</span>`,
      choices: {
        'a': { text: 'Reflect her spells with mirrors', next: 'mirror_warrior_ending' },
        'b': { text: 'Disrupt her magic with salt', next: 'salt_defender_ending' },
        'c': { text: 'Confuse her with technology', next: 'tech_wizard_ending' },
        'mirrors': { text: 'Reflect her spells with mirrors', next: 'mirror_warrior_ending' },
        'salt': { text: 'Disrupt her magic with salt', next: 'salt_defender_ending' },
        'tech': { text: 'Confuse her with technology', next: 'tech_wizard_ending' }
      }
    },

    story_trade: {
      title: "📚 The Tale Exchange",
      text: `The witch's eyes light up with curiosity. "Stories? Oh, I do love a good tale. I've been collecting them for centuries, but I've never heard any from your time."

You begin telling her about the modern world - smartphones, the internet, space travel, and social media. The witch listens with growing fascination, occasionally asking questions that reveal how isolated she's been in her forest cottage.

As you talk, you realize you have three ways to conclude this exchange:
🌍 Offer to bring her into the modern world as your guide out of the forest
📖 Trade her your most precious personal story for guaranteed safe passage
🎭 Teach her to use modern technology in exchange for magical knowledge

The witch leans forward, completely absorbed in your tales of the future...

<span class="text-cyan-400">How do you conclude your story trade?</span>`,
      choices: {
        'a': { text: 'Invite her to join the modern world', next: 'witch_companion_ending' },
        'b': { text: 'Trade your most precious memory', next: 'memory_gift_ending' },
        'c': { text: 'Teach her technology for magic', next: 'knowledge_exchange_ending' },
        'invite': { text: 'Invite her to join the modern world', next: 'witch_companion_ending' },
        'memory': { text: 'Trade your most precious memory', next: 'memory_gift_ending' },
        'exchange': { text: 'Teach her technology for magic', next: 'knowledge_exchange_ending' }
      }
    },

    werewolf_transformation: {
      title: "🌙 The Pack's Embrace",
      text: `You accept the werewolf's offer, and the pack leader nods approvingly. "The transformation will hurt, but you will gain strength beyond human limits and a family that will never abandon you."

The pack surrounds you as the full moon rises overhead. You feel your bones beginning to stretch and change, your senses becoming sharper, your instincts more primal. But in this moment of transformation, you realize you have three choices about what kind of werewolf you'll become:
🐺 Embrace your wild nature completely and become a true beast
⚖️ Try to maintain your human consciousness and moral compass
🌙 Seek to become a bridge between the human and wolf worlds

The transformation accelerates, and you feel your humanity slipping away...

<span class="text-cyan-400">What kind of werewolf do you choose to become?</span>`,
      choices: {
        'a': { text: 'Embrace your wild beast nature', next: 'wild_wolf_ending' },
        'b': { text: 'Maintain your human morality', next: 'noble_wolf_ending' },
        'c': { text: 'Bridge both worlds', next: 'guardian_wolf_ending' },
        'wild': { text: 'Embrace your wild beast nature', next: 'wild_wolf_ending' },
        'moral': { text: 'Maintain your human morality', next: 'noble_wolf_ending' },
        'bridge': { text: 'Bridge both worlds', next: 'guardian_wolf_ending' }
      }
    },

    survival_hunt: {
      title: "🏃 The Midnight Chase",
      text: `The werewolf pack gives you a head start as the hunt begins. You run through the dark forest, using every survival skill you know. The wolves are faster and stronger, but you're smaller and more agile, able to squeeze through spaces they can't follow.

As dawn approaches, you realize you have three strategies to survive until sunrise:
🌳 Climb the tallest tree and wait it out, hoping they can't reach you
🏞️ Find running water, which folklore says werewolves can't cross
🔥 Build a fire and use it to keep them at bay until morning

You can hear the pack getting closer, their howls echoing through the forest...

<span class="text-cyan-400">How do you survive the werewolf hunt?</span>`,
      choices: {
        'a': { text: 'Climb high and wait for dawn', next: 'tree_survivor_ending' },
        'b': { text: 'Find a river to cross', next: 'water_escape_ending' },
        'c': { text: 'Make a protective fire', next: 'fire_guardian_ending' },
        'climb': { text: 'Climb high and wait for dawn', next: 'tree_survivor_ending' },
        'water': { text: 'Find a river to cross', next: 'water_escape_ending' },
        'fire': { text: 'Make a protective fire', next: 'fire_guardian_ending' }
      }
    },

    pack_alliance: {
      title: "🤝 The Pack's Burden",
      text: `The werewolf leader's expression softens slightly. "You would help us? Few humans have ever offered aid to our kind." He explains that a dark sorcerer has been capturing members of their pack and using them in twisted experiments.

The pack needs your help because the sorcerer's tower is protected by magic that only affects supernatural creatures - a human could walk right through his defenses. But the mission is dangerous, and you have three approaches:
⚔️ Launch a direct assault on the sorcerer's tower to free the captured wolves
🕵️ Infiltrate the tower secretly and sabotage the sorcerer's work from within
🤝 Try to negotiate with the sorcerer and find a peaceful solution

The pack watches you with hope in their eyes, perhaps seeing humans in a new light...

<span class="text-cyan-400">How do you help the werewolf pack?</span>`,
      choices: {
        'a': { text: 'Launch a direct assault', next: 'wolf_liberator_ending' },
        'b': { text: 'Infiltrate and sabotage', next: 'shadow_agent_ending' },
        'c': { text: 'Negotiate for peace', next: 'peacemaker_ending' },
        'assault': { text: 'Launch a direct assault', next: 'wolf_liberator_ending' },
        'infiltrate': { text: 'Infiltrate and sabotage', next: 'shadow_agent_ending' },
        'negotiate': { text: 'Negotiate for peace', next: 'peacemaker_ending' }
      }
    },

    // Endings
    riddle_master_ending: {
      title: "🧠 The Wisdom Keeper",
      text: `You answer all three riddles correctly through pure logic and reasoning. The Spring Court fairies are impressed despite themselves. "A mortal mind that can match our ancient wisdom," their leader muses. "Perhaps humans are more interesting than we thought."

They grant you not just passage, but a gift - the ability to see through illusions and understand the true nature of magical beings. You leave the fairy realm with enhanced perception, able to spot supernatural creatures and magical deceptions in the human world.

You find your way out of the forest, but you carry with you the knowledge that magic is real and everywhere, hidden just beneath the surface of the ordinary world.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Riddle Master</span>
<span class="text-yellow-400">You earned the fairies' respect through wisdom!</span>

<span class="text-gray-400">Type 'story reset' to test new challenges, or 'story' to begin again.</span>`,
      choices: {}
    },

    trickster_ending: {
      title: "🎭 The Clever Fool",
      text: `You try to outsmart the fairies with wordplay and clever non-answers, but they see through your tricks. However, instead of being angry, they burst into delighted laughter. "Oh, this one has the spirit of a trickster!" they exclaim.

The fairies are so amused by your audacity that they invite you to join their court as their official jester. You become part of the fairy realm, entertaining them with human humor and modern jokes they've never heard before.

You gain immortality and magical powers, but you can never return to the human world. Sometimes you wonder if you made the right choice, but the fairies' laughter echoes through eternity.

<span class="text-purple-400">🎭 FATE SEALED: The Eternal Jester</span>
<span class="text-yellow-400">You became the fairies' favorite entertainer!</span>

<span class="text-gray-400">Type 'story reset' to try a different approach, or 'story' to begin anew.</span>`,
      choices: {}
    },

    memory_sacrifice_ending: {
      title: "💝 The Willing Gift",
      text: `You offer a cherished memory - your first day of school - in exchange for help with the riddles. The fairies are touched by your willing sacrifice and decide to be merciful. They help you answer the remaining riddles correctly.

But the memory you gave up creates an unexpected bond. The fairy who received it experiences human childhood for the first time and is moved by the innocence and wonder of that memory. She becomes your guide and protector, helping you navigate the magical world.

You leave the forest with a fairy companion who helps you bridge the gap between the human and magical worlds, though you'll always feel the absence of that lost memory.

<span class="text-blue-400">💝 ENDING ACHIEVED: The Memory Giver</span>
<span class="text-yellow-400">Your sacrifice created an unlikely friendship!</span>

<span class="text-gray-400">Type 'story reset' to keep all your memories, or 'story' to begin again.</span>`,
      choices: {}
    },

    dance_master_ending: {
      title: "💃 The Perfect Dancer",
      text: `You dance with such grace and skill that even the ancient Autumn Court fairies are amazed. Your movements tell a story of human emotion and experience that moves them to tears. They stop the music voluntarily, something that hasn't happened in centuries.

"You have shown us beauty we had forgotten," their leader says. "Take this gift." They grant you the ability to communicate through dance, able to convey complex emotions and ideas through movement alone.

You return to the human world as a master dancer, able to touch people's hearts and souls through your art. Your performances become legendary, though few know the magical source of your skill.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Dance Master</span>
<span class="text-yellow-400">You moved immortal hearts with mortal grace!</span>

<span class="text-gray-400">Type 'story reset' to try new steps, or 'story' to begin again.</span>`,
      choices: {}
    },

    music_controller_ending: {
      title: "🎵 The Rhythm Breaker",
      text: `You manage to change the rhythm of the fairy music, taking control of the dance. The Autumn Court fairies are shocked - no mortal has ever been able to influence their ancient melodies. You use this power to gradually slow the music until it stops completely.

The fairies are impressed by your musical intuition and offer you a place as their conductor. You decline, but they give you a magical instrument - a flute that can influence emotions and even control some magical creatures through music.

You escape the forest with the power to create magic through music, becoming a wandering minstrel whose songs can heal hearts and calm savage beasts.

<span class="text-purple-400">🎵 ENDING ACHIEVED: The Music Master</span>
<span class="text-yellow-400">You learned to control magic through melody!</span>

<span class="text-gray-400">Type 'story reset' to compose new songs, or 'story' to begin again.</span>`,
      choices: {}
    },

    patient_escape_ending: {
      title: "⏰ The Perfect Timing",
      text: `You wait patiently through hours of dancing, watching for the perfect moment. Finally, you notice a brief pause in the music - just a heartbeat's silence between songs. In that instant, you break free from the dance circle and run.

The fairies are impressed by your patience and observation skills. "Few mortals have the wisdom to wait and watch," they call after you. As a reward for your patience, they grant you the gift of perfect timing - you'll always know the right moment to act.

You return to the human world with an uncanny ability to be in the right place at the right time, leading to a life full of fortunate coincidences and perfect opportunities.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Perfect Timer</span>
<span class="text-yellow-400">You learned that patience is the greatest magic!</span>

<span class="text-gray-400">Type 'story reset' to try different timing, or 'story' to begin again.</span>`,
      choices: {}
    },

    honest_soul_ending: {
      title: "🗣️ The Truthful Heart",
      text: `You answer all the Winter Court's questions with complete honesty, revealing your deepest fears, greatest shames, and most cherished dreams. The fairy queen is moved by your courage and vulnerability.

"In all our centuries, few mortals have shown such bravery," she says. "To speak truth in the face of danger requires a pure heart." She grants you the gift of always knowing when others are lying, and the ability to inspire honesty in those around you.

You return to the human world as a seeker of truth, able to cut through deception and help others find the courage to be honest with themselves and others.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Truth Speaker</span>
<span class="text-yellow-400">Your honesty earned the respect of immortals!</span>

<span class="text-gray-400">Type 'story reset' to explore new truths, or 'story' to begin again.</span>`,
      choices: {}
    },

    clever_truth_ending: {
      title: "🛡️ The Technical Victor",
      text: `You answer the Winter Court's questions with technically true but meaningless responses. When asked about your greatest fear, you say "the absence of light" (darkness). When asked about your deepest desire, you say "the continuation of biological functions" (staying alive).

The fairy queen is frustrated but impressed by your cleverness. "You have honored the letter of our agreement while protecting your spirit," she admits. "Such cunning deserves recognition." She grants you the ability to see through others' deceptions and word-tricks.

You return to the human world as a master of language and logic, able to navigate complex negotiations and legal matters with supernatural skill.

<span class="text-blue-400">🛡️ ENDING ACHIEVED: The Word Warrior</span>
<span class="text-yellow-400">You protected your secrets through clever language!</span>

<span class="text-gray-400">Type 'story reset' to speak more plainly, or 'story' to begin again.</span>`,
      choices: {}
    },

    frozen_heart_ending: {
      title: "❄️ The Ice Soul",
      text: `You refuse to play the Winter Court's game, accepting the consequences. Your heart begins to freeze, but instead of dying, you become something new - a being of ice and determination, immune to emotional manipulation but also unable to feel warmth or love.

The fairy queen is surprised by your transformation. "You have become like us - beautiful but cold, powerful but distant." You gain immortality and ice magic, but lose your human emotions.

You become a guardian of the winter realm, protecting it from those who would exploit its power, but forever wondering what warmth felt like.

<span class="text-blue-400">❄️ FATE SEALED: The Ice Guardian</span>
<span class="text-yellow-400">You chose strength over vulnerability!</span>

<span class="text-gray-400">Type 'story reset' to feel warmth again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    witch_defeat_ending: {
      title: "🔥 The Tables Turned",
      text: `You pretend to fall asleep from the witch's feast, then spring into action when she approaches with her carving knife. In a dramatic reversal, you manage to push the surprised witch into her own oven, just like in the old fairy tale.

As the witch burns, her cottage begins to crumble, revealing it was all an illusion. You find yourself in a normal forest clearing with a pile of bones - the remains of the witch's previous victims. But among the bones, you find a magical cookbook that contains real spells.

You escape the forest with the power to create magical effects through cooking, becoming a chef whose meals can heal, inspire, or even grant temporary magical abilities.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Witch Slayer</span>
<span class="text-yellow-400">You turned the classic tale on its head!</span>

<span class="text-gray-400">Type 'story reset' to try a different recipe, or 'story' to begin again.</span>`,
      choices: {}
    },

    spell_reversal_ending: {
      title: "🪄 The Magic Mirror",
      text: `You use the witch's own magic words against her, reversing her fattening spell. Instead of making you larger, the magic makes the witch shrink until she's no bigger than a doll. She's still alive but powerless, trapped in her own miniaturized cottage.

You keep the tiny witch as a reluctant advisor, learning magic from her in exchange for not stepping on her. She teaches you the basics of potion-making and spell-casting, though she grumbles about it constantly.

You return to the human world as a beginning practitioner of magic, with a tiny, irritable mentor who lives in a dollhouse and helps you navigate the supernatural world.

<span class="text-purple-400">🪄 ENDING ACHIEVED: The Spell Reverser</span>
<span class="text-yellow-400">You turned the witch's magic against herself!</span>

<span class="text-gray-400">Type 'story reset' to try different magic, or 'story' to begin again.</span>`,
      choices: {}
    },

    name_power_ending: {
      title: "📜 The Name Holder",
      text: `You reveal that you know the witch's true name - Grizelda the Sweet-Toothed - which you overheard her muttering while cooking. Knowing a magical being's true name gives you power over them, and the witch is forced to negotiate.

She agrees to let you go in exchange for keeping her name secret. But she also offers to teach you the power of names - how to discover the true names of magical creatures and use that knowledge to protect yourself.

You leave the forest with the ability to learn the true names of supernatural beings, giving you power over them but also the responsibility to use that power wisely.

<span class="text-gold-400">📜 ENDING ACHIEVED: The Name Keeper</span>
<span class="text-yellow-400">You learned the power of true names!</span>

<span class="text-gray-400">Type 'story reset' to forget the names, or 'story' to begin again.</span>`,
      choices: {}
    },

    wild_wolf_ending: {
      title: "🐺 The Feral Beast",
      text: `You embrace your wild nature completely, becoming a true creature of the forest. Your human memories fade as your wolf instincts take over. You become the pack's most fierce hunter, living entirely by animal law and natural instinct.

You lose your human identity but gain incredible strength, speed, and the deep satisfaction of living in harmony with nature. The pack becomes your family, and the forest becomes your kingdom.

Sometimes, in quiet moments, you have flashes of human memory, but they feel like dreams from another life.

<span class="text-red-400">🐺 FATE SEALED: The Wild Beast</span>
<span class="text-yellow-400">You chose nature over civilization!</span>

<span class="text-gray-400">Type 'story reset' to reclaim your humanity, or 'story' to begin anew.</span>`,
      choices: {}
    },

    noble_wolf_ending: {
      title: "⚖️ The Honorable Wolf",
      text: `You maintain your human morality even as a werewolf, becoming a protector of both humans and wolves. You use your supernatural strength to defend the innocent and hunt down true monsters - both human and supernatural.

The pack respects your moral code, and you become their conscience, helping them coexist peacefully with human settlements. You bridge the gap between civilization and wilderness.

You live a double life - human by day, noble wolf by night - always fighting for justice and protection of the innocent.

<span class="text-blue-400">⚖️ ENDING ACHIEVED: The Noble Beast</span>
<span class="text-yellow-400">You kept your humanity while gaining wolf strength!</span>

<span class="text-gray-400">Type 'story reset' to try a different path, or 'story' to begin again.</span>`,
      choices: {}
    },

    guardian_wolf_ending: {
      title: "🌙 The Bridge Walker",
      text: `You become a bridge between the human and wolf worlds, able to communicate with both and understand the needs of each. You help establish treaties between werewolf packs and human communities, preventing conflicts before they start.

Your unique position makes you a mediator and protector, ensuring that both worlds can coexist peacefully. You gain the respect of both humans and supernatural creatures as a fair and wise leader.

You become a legend in both worlds - the werewolf who brought peace between species.

<span class="text-purple-400">🌙 ENDING ACHIEVED: The Peace Bringer</span>
<span class="text-yellow-400">You united two worlds in harmony!</span>

<span class="text-gray-400">Type 'story reset' to explore new alliances, or 'story' to begin again.</span>`,
      choices: {}
    }
  }
};