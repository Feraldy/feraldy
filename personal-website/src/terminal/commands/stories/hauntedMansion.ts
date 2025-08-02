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

export const hauntedMansionStory: Story = {
  id: 'haunted-mansion',
  title: '🏚️ The Blackwood Manor',
  description: 'Inherit a mysterious Victorian mansion with a dark family secret. Uncover the truth behind generations of tragedy and supernatural occurrences.',
  theme: 'gothic-family-horror',
  startNode: 'start',
  nodes: {
    start: {
      title: "🏚️ The Blackwood Manor",
      text: `You've just inherited Blackwood Manor from a great-aunt you never knew existed. The Victorian mansion sits on a hill overlooking a fog-shrouded valley, its Gothic architecture both beautiful and ominous against the stormy sky.

As you approach the front door with the ornate iron key, you notice three disturbing details:
The <span class="text-red-400">family portraits</span> in the windows seem to be watching you, their eyes following your movement
A <span class="text-blue-400">child's laughter</span> echoes from somewhere inside, though the house has been empty for decades
The <span class="text-yellow-400">garden maze</span> behind the house shifts and changes when you're not looking directly at it

Thunder rumbles overhead as you insert the key. The door creaks open by itself, revealing a grand foyer lit by flickering candles that shouldn't be burning.

<span class="text-cyan-400">Where do you investigate first?</span>`,
      choices: {
        'a': { text: 'Examine the watching portraits', next: 'portrait_hall' },
        'b': { text: 'Follow the child\'s laughter', next: 'nursery_path' },
        'c': { text: 'Explore the shifting garden maze', next: 'maze_entrance' },
        'portraits': { text: 'Examine the watching portraits', next: 'portrait_hall' },
        'laughter': { text: 'Follow the child\'s laughter', next: 'nursery_path' },
        'maze': { text: 'Explore the shifting garden maze', next: 'maze_entrance' }
      }
    },

    portrait_hall: {
      title: "🖼️ The Gallery of Ancestors",
      text: `You enter a long hallway lined with oil paintings of your Blackwood ancestors. Each portrait bears a brass nameplate and dates spanning over 200 years. As you walk down the hall, you notice something chilling - every person in these paintings died young, and they all share the same haunted expression.

Suddenly, the portraits begin to whisper your name. Three paintings glow with supernatural energy:
👑 <span class="text-gold-400">Lord Edmund Blackwood (1823-1847)</span> - The mansion's builder, who points toward a hidden door behind his frame
💀 <span class="text-red-400">Lady Catherine Blackwood (1901-1925)</span> - Your great-grandmother, whose lips move silently, trying to warn you of something
👶 <span class="text-blue-400">Little Thomas Blackwood (1978-1983)</span> - A child whose portrait shows him holding a key that seems to glow with its own light

The whispers grow louder, overlapping into an urgent chorus...

<span class="text-cyan-400">Which ancestor do you approach?</span>`,
      choices: {
        'a': { text: 'Follow Lord Edmund to the hidden door', next: 'secret_passage' },
        'b': { text: 'Try to understand Lady Catherine\'s warning', next: 'family_curse' },
        'c': { text: 'Reach for the glowing key in Thomas\'s portrait', next: 'child_spirit' },
        'edmund': { text: 'Follow Lord Edmund to the hidden door', next: 'secret_passage' },
        'catherine': { text: 'Try to understand Lady Catherine\'s warning', next: 'family_curse' },
        'thomas': { text: 'Reach for the glowing key in Thomas\'s portrait', next: 'child_spirit' }
      }
    },

    nursery_path: {
      title: "👶 The Abandoned Nursery",
      text: `Following the sound of laughter, you climb the grand staircase to the second floor. The laughter leads you to a nursery that hasn't been used in decades. Dust covers everything, but somehow a rocking horse moves gently back and forth, and a music box plays a haunting lullaby.

In the center of the room, you see three objects that seem untouched by time:
🧸 A teddy bear sitting in a small chair, its button eyes following your movement as if it's alive
📖 An open storybook on the floor, its pages turning by themselves, showing illustrations that move and change
🪞 An antique mirror that reflects not the dusty nursery, but a room full of playing children from different time periods

The child's laughter grows closer, and you realize you're not alone in this room...

<span class="text-cyan-400">What draws your attention?</span>`,
      choices: {
        'a': { text: 'Pick up the watching teddy bear', next: 'possessed_toy' },
        'b': { text: 'Read the moving storybook', next: 'living_story' },
        'c': { text: 'Look deeper into the time-mirror', next: 'temporal_nursery' },
        'bear': { text: 'Pick up the watching teddy bear', next: 'possessed_toy' },
        'book': { text: 'Read the moving storybook', next: 'living_story' },
        'mirror': { text: 'Look deeper into the time-mirror', next: 'temporal_nursery' }
      }
    },

    maze_entrance: {
      title: "🌿 The Living Labyrinth",
      text: `You step into the garden maze, and immediately the hedges grow taller, blocking your view of the mansion. The paths seem to rearrange themselves when you're not looking, and you can hear whispers coming from within the green walls.

As you venture deeper, you discover that this isn't an ordinary maze. Three supernatural phenomena become apparent:
🌹 Blood-red roses that bloom and wither in seconds, their thorns reaching out to grab at your clothes
👻 Ghostly figures of previous maze-walkers who got lost and never found their way out, now warning you of dangers ahead
🕳️ A deep well in the center of the maze, from which you can hear voices calling for help from far below

The maze seems to be testing you, offering three different challenges...

<span class="text-cyan-400">How do you proceed through the living maze?</span>`,
      choices: {
        'a': { text: 'Navigate past the grasping roses', next: 'rose_path' },
        'b': { text: 'Follow the ghostly guides', next: 'spirit_guides' },
        'c': { text: 'Investigate the voices in the well', next: 'cursed_well' },
        'roses': { text: 'Navigate past the grasping roses', next: 'rose_path' },
        'ghosts': { text: 'Follow the ghostly guides', next: 'spirit_guides' },
        'well': { text: 'Investigate the voices in the well', next: 'cursed_well' }
      }
    },

    secret_passage: {
      title: "🕯️ The Hidden Chamber",
      text: `Lord Edmund's portrait swings open like a door, revealing a narrow stone passage lit by torches that ignite themselves as you pass. The passage leads to a hidden chamber beneath the mansion, where you discover the dark heart of the Blackwood family secret.

The chamber contains three horrifying revelations:
📜 Ancient contracts written in blood, showing that each generation of Blackwoods made deals with supernatural entities for wealth and power
⚰️ A collection of ornate coffins, each containing a family member who died young - but their bodies show no signs of decay
🔮 A scrying crystal that shows you visions of the future, revealing that you're meant to be the next sacrifice to maintain the family's dark bargain

Lord Edmund's ghost materializes beside you: "The choice is yours, descendant. Continue the tradition, break the curse, or join us in eternal servitude..."

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        'a': { text: 'Accept the dark bargain for power', next: 'dark_heir_ending' },
        'b': { text: 'Attempt to break the family curse', next: 'curse_breaker_ending' },
        'c': { text: 'Refuse and try to escape', next: 'trapped_forever_ending' },
        'accept': { text: 'Accept the dark bargain for power', next: 'dark_heir_ending' },
        'break': { text: 'Attempt to break the family curse', next: 'curse_breaker_ending' },
        'escape': { text: 'Refuse and try to escape', next: 'trapped_forever_ending' }
      }
    },

    family_curse: {
      title: "💀 The Blackwood Curse",
      text: `Lady Catherine's portrait comes to life, stepping out of the frame in a flowing white dress stained with blood. Her ghostly form speaks with urgency: "Listen carefully, child. Our family is cursed to die young, but there's a way to break it..."

She reveals the truth: The Blackwood fortune was built on a deal with a demon who demands a young life from each generation. But she discovered three possible ways to end the curse:
💎 Find the demon's true name hidden somewhere in the mansion and use it to banish the entity forever
🔥 Burn down the mansion with all its supernatural artifacts, destroying the demon's anchor to this world
💝 Offer yourself willingly as the final sacrifice, but with pure intentions to save future generations

"Choose wisely," Catherine warns. "The demon grows stronger with each passing hour, and dawn approaches..."

<span class="text-cyan-400">How do you break the curse?</span>`,
      choices: {
        'a': { text: 'Search for the demon\'s true name', next: 'name_quest_ending' },
        'b': { text: 'Burn down the mansion', next: 'purification_ending' },
        'c': { text: 'Sacrifice yourself to save others', next: 'noble_sacrifice_ending' },
        'name': { text: 'Search for the demon\'s true name', next: 'name_quest_ending' },
        'burn': { text: 'Burn down the mansion', next: 'purification_ending' },
        'sacrifice': { text: 'Sacrifice yourself to save others', next: 'noble_sacrifice_ending' }
      }
    },

    child_spirit: {
      title: "👻 The Guardian Child",
      text: `As you reach toward the portrait, little Thomas steps out of the painting, still clutching the glowing key. He's translucent but smiling, no longer the sad child from the portrait.

"I've been waiting for someone from the family to come back," he says in a voice like wind chimes. "I found a way to protect the house from the bad things, but I need help from someone who's still alive."

Thomas explains that he discovered three magical protections hidden throughout the mansion:
🛡️ A protective ward in the attic that can shield the house from supernatural threats
🗝️ A master key that can lock away all the evil spirits and demons permanently
🌟 A ritual circle in the basement that can transform the mansion into a sanctuary for lost souls

"But I can't activate them alone," Thomas says. "Will you help me save our family home?"

<span class="text-cyan-400">Which protection do you help Thomas activate?</span>`,
      choices: {
        'a': { text: 'Activate the protective ward', next: 'guardian_mansion_ending' },
        'b': { text: 'Use the master key to lock away evil', next: 'sealed_evil_ending' },
        'c': { text: 'Create a sanctuary for lost souls', next: 'soul_sanctuary_ending' },
        'ward': { text: 'Activate the protective ward', next: 'guardian_mansion_ending' },
        'key': { text: 'Use the master key to lock away evil', next: 'sealed_evil_ending' },
        'sanctuary': { text: 'Create a sanctuary for lost souls', next: 'soul_sanctuary_ending' }
      }
    },

    possessed_toy: {
      title: "🧸 The Vessel of Innocence",
      text: `The moment you touch the teddy bear, you feel a rush of memories that aren't your own. The bear contains the spirit of every child who died in this house, their innocence preserved but twisted by years of supernatural influence.

The bear speaks in a chorus of children's voices: "We've been so lonely... will you play with us forever?"

You realize the bear is trying to trap your soul to add to its collection, but you also sense that these children's spirits are being held against their will. You have three options:
👼 Try to free the children's spirits and help them move on to the afterlife
🎭 Join them willingly and become part of their eternal playgroup
⚔️ Fight against the possession and try to destroy the cursed toy

The room grows cold as more toys begin to move, surrounding you with their glowing eyes...

<span class="text-cyan-400">How do you handle the possessed children?</span>`,
      choices: {
        'a': { text: 'Free the trapped children\'s spirits', next: 'children_liberation_ending' },
        'b': { text: 'Join their eternal playgroup', next: 'eternal_child_ending' },
        'c': { text: 'Destroy the cursed toy', next: 'toy_destroyer_ending' },
        'free': { text: 'Free the trapped children\'s spirits', next: 'children_liberation_ending' },
        'join': { text: 'Join their eternal playgroup', next: 'eternal_child_ending' },
        'destroy': { text: 'Destroy the cursed toy', next: 'toy_destroyer_ending' }
      }
    },

    living_story: {
      title: "📖 The Book of Fates",
      text: `You kneel down and read the moving storybook. The illustrations show the history of Blackwood Manor, but as you watch, you realize the book is writing itself, showing possible futures based on your choices.

The book reveals three potential destinies:
📚 Become the new author of the book, gaining the power to write reality but becoming trapped within its pages
🔮 Use the book to rewrite the mansion's history, erasing all the tragedies but potentially creating new problems
📝 Close the book forever, ending its power but also losing the chance to change the past or future

As you read, the illustrations begin to include you, showing different versions of your fate playing out across the pages...

<span class="text-cyan-400">What do you do with the Book of Fates?</span>`,
      choices: {
        'a': { text: 'Become the book\'s new author', next: 'reality_writer_ending' },
        'b': { text: 'Rewrite the mansion\'s tragic history', next: 'history_changer_ending' },
        'c': { text: 'Close the book forever', next: 'fate_sealer_ending' },
        'author': { text: 'Become the book\'s new author', next: 'reality_writer_ending' },
        'rewrite': { text: 'Rewrite the mansion\'s tragic history', next: 'history_changer_ending' },
        'close': { text: 'Close the book forever', next: 'fate_sealer_ending' }
      }
    },

    temporal_nursery: {
      title: "🪞 The Mirror of Time",
      text: `You step closer to the mirror and see children from different eras playing in the same nursery. Some wear Victorian clothes, others are from the 1920s, 1950s, and even more recent times. They all seem happy, but you notice they're all translucent - they're ghosts, trapped in an eternal moment of childhood joy.

One of the children notices you and approaches the mirror from the other side. "You can see us!" she exclaims. "No one has been able to see us for so long!"

The children explain that the mirror is a temporal prison, but also a sanctuary. They offer you three choices:
🚪 Step through the mirror and join them in their timeless playground
🔨 Break the mirror to free them, but risk releasing them into a world they no longer understand
⏰ Use the mirror's power to travel back in time and prevent the tragedies that created these ghost children

<span class="text-cyan-400">What do you decide about the temporal mirror?</span>`,
      choices: {
        'a': { text: 'Join the children in their timeless world', next: 'timeless_child_ending' },
        'b': { text: 'Break the mirror to free them', next: 'mirror_breaker_ending' },
        'c': { text: 'Travel back to prevent the tragedies', next: 'time_guardian_ending' },
        'join': { text: 'Join the children in their timeless world', next: 'timeless_child_ending' },
        'break': { text: 'Break the mirror to free them', next: 'mirror_breaker_ending' },
        'travel': { text: 'Travel back to prevent the tragedies', next: 'time_guardian_ending' }
      }
    },

    // Endings
    dark_heir_ending: {
      title: "👑 The Dark Inheritance",
      text: `You accept the family's dark legacy and feel supernatural power flowing through your veins. The contracts rewrite themselves with your name, and you become the new head of the Blackwood dynasty. Wealth and influence are yours, but so is the terrible responsibility of choosing the next generation's sacrifice.

You transform the mansion into a center of dark power, attracting others who seek forbidden knowledge and supernatural abilities. But every night, you hear the whispers of those who died for your power, and you know that someday, someone will come to claim what you've claimed.

<span class="text-red-400">👑 FATE SEALED: The Dark Heir</span>
<span class="text-yellow-400">You gained power through blood and sacrifice!</span>

<span class="text-gray-400">Type 'story reset' to reject this dark path, or 'story' to begin a new tale.</span>`,
      choices: {}
    },

    curse_breaker_ending: {
      title: "⚔️ The Curse Breaker",
      text: `You gather all your courage and begin destroying the supernatural artifacts one by one. The mansion shakes as centuries of dark magic unravel. Ghostly figures of your ancestors appear, some trying to stop you, others cheering you on.

As you shatter the final contract, a demonic roar echoes through the chamber. The demon materializes, furious at losing its hold on your family, but weakened by the destruction of its anchors. With the combined strength of your freed ancestors, you banish the entity forever.

The mansion transforms, becoming a normal house filled with warmth and light. You've broken a curse that plagued your family for generations, and future Blackwoods will live full, natural lives.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Family Liberator</span>
<span class="text-yellow-400">You freed your bloodline from centuries of darkness!</span>

<span class="text-gray-400">Type 'story reset' to face new challenges, or 'story' to begin again.</span>`,
      choices: {}
    },

    trapped_forever_ending: {
      title: "🔒 Forever Bound",
      text: `You try to run, but the chamber seals itself. Lord Edmund shakes his head sadly. "You cannot escape your heritage, child. The demon will have its due."

The contracts glow and your name appears on them in burning letters. You become another ghost in the mansion, doomed to lure future family members to the same fate. Your body joins the preserved corpses in their ornate coffins, while your spirit becomes part of the house's supernatural defenses.

You watch helplessly as years pass, hoping that someday another Blackwood will be brave enough to break the cycle you couldn't escape.

<span class="text-red-400">💀 FATE SEALED: The Eternal Guardian</span>
<span class="text-yellow-400">You became part of the very curse you tried to escape!</span>

<span class="text-gray-400">Type 'story reset' to try a different approach, or 'story' to begin anew.</span>`,
      choices: {}
    },

    name_quest_ending: {
      title: "📜 The True Name",
      text: `You search through the mansion's hidden rooms and secret passages, following Catherine's clues. In the mansion's foundation, carved into the original cornerstone, you find the demon's true name: "Malphas the Soul Binder."

Speaking the name aloud causes the entire mansion to convulse. The demon appears in its true form - a massive creature of shadow and flame - but naming it gives you power over it. You command it to release all the souls it has claimed and to never return to this realm.

The demon screams as it's banished, and suddenly the mansion fills with light. All the trapped spirits of your family appear one last time to thank you before moving on to their eternal rest. You inherit a normal house and a clean family legacy.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Name Speaker</span>
<span class="text-yellow-400">You banished evil with the power of its true name!</span>

<span class="text-gray-400">Type 'story reset' to face new mysteries, or 'story' to begin again.</span>`,
      choices: {}
    },

    purification_ending: {
      title: "🔥 The Purifying Flames",
      text: `You gather all the supernatural artifacts and pile them in the mansion's grand hall. Using an old oil lamp, you set the entire building ablaze. The fire burns with supernatural intensity, consuming not just the physical structure but the spiritual corruption within.

As the mansion burns, you see the trapped souls of your ancestors rising with the smoke, finally free to move on. The demon's screams echo from the flames as its earthly anchor is destroyed. You watch from a safe distance as generations of evil are purified by fire.

When dawn breaks, only ashes remain where Blackwood Manor once stood. You've lost the inheritance, but you've gained something more valuable - the knowledge that your family's curse is broken forever.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Purifier</span>
<span class="text-yellow-400">You cleansed evil with purifying fire!</span>

<span class="text-gray-400">Type 'story reset' to build anew, or 'story' to begin again.</span>`,
      choices: {}
    },

    noble_sacrifice_ending: {
      title: "💝 The Ultimate Sacrifice",
      text: `You offer yourself willingly as the final sacrifice, but with pure intentions to save all future generations. The demon appears, expecting to claim another soul for its collection, but your selfless act transforms the dark magic.

Instead of feeding the demon, your sacrifice creates a powerful ward that banishes it forever. Your pure intention breaks the cycle of selfish deals and blood contracts. As you fade away, you see all the trapped souls of your family being freed, and you know that no future Blackwood will ever face this curse.

Your spirit becomes the mansion's guardian angel, protecting it from any future supernatural threats. You've traded your life for the freedom of countless future generations.

<span class="text-gold-400">💝 ENDING ACHIEVED: The Selfless Guardian</span>
<span class="text-yellow-400">Your sacrifice saved all future generations!</span>

<span class="text-gray-400">Type 'story reset' to live again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    guardian_mansion_ending: {
      title: "🛡️ The Protected Haven",
      text: `You and Thomas work together to activate the protective ward in the attic. The entire mansion glows with a warm, golden light as the ward takes effect. All evil spirits and supernatural threats are repelled, but the friendly ghosts like Thomas can remain.

The mansion becomes a safe haven for supernatural beings who mean no harm. You become its caretaker, helping lost spirits find peace while protecting the living from malevolent entities. Thomas becomes your constant companion, finally having the family he always wanted.

You've turned a house of horrors into a sanctuary of hope, where the living and dead can coexist peacefully.

<span class="text-blue-400">🛡️ ENDING ACHIEVED: The Sanctuary Keeper</span>
<span class="text-yellow-400">You created a haven for both living and dead!</span>

<span class="text-gray-400">Type 'story reset' to try a different path, or 'story' to begin again.</span>`,
      choices: {}
    },

    sealed_evil_ending: {
      title: "🗝️ The Sealed Darkness",
      text: `Thomas hands you the master key, and together you lock away every evil presence in the mansion. The key glows as it seals supernatural doorways, traps malevolent spirits, and binds dark artifacts. The mansion becomes completely normal, with no supernatural activity whatsoever.

You inherit a beautiful Victorian home with an interesting history but no supernatural dangers. Thomas fades away peacefully, his mission complete. The mansion becomes a normal family home where you can live safely, though sometimes you miss the magic that once filled its halls.

You've chosen safety and normalcy over supernatural wonder, and sometimes that's the wisest choice.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Evil Sealer</span>
<span class="text-yellow-400">You locked away all supernatural threats forever!</span>

<span class="text-gray-400">Type 'story reset' to unlock new possibilities, or 'story' to begin again.</span>`,
      choices: {}
    },

    soul_sanctuary_ending: {
      title: "🌟 The Soul Sanctuary",
      text: `You help Thomas activate the ritual circle in the basement, transforming the mansion into a sanctuary for lost souls. The house becomes a waystation between life and death, where spirits can rest and find guidance before moving on to their final destination.

You become the mansion's spiritual guide, helping souls resolve their earthly attachments and find peace. The house fills with a constant gentle presence of spirits passing through, each one grateful for your help. Thomas stays as your assistant, finally finding the purpose he sought in death.

You've created something beautiful from something dark - a place of healing and transition for those caught between worlds.

<span class="text-purple-400">🌟 ENDING ACHIEVED: The Soul Guide</span>
<span class="text-yellow-400">You became a shepherd for lost souls!</span>

<span class="text-gray-400">Type 'story reset' to guide new souls, or 'story' to begin again.</span>`,
      choices: {}
    }
  }
};