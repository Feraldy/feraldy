import { Story } from './index';

export const blackwoodManorStory: Story = {
  id: "blackwood-manor-haunting",
  title: "🏚️ The Haunting of Blackwood Manor",
  description: `You are Alex, a curious teenager who has just inherited an old manor in the countryside from a mysterious relative. Rumors say the manor holds dark secrets, haunted by the shadows of the past. Your curiosity pushes you to uncover the truth... but beware, not everything is as it seems. This is a Goosebumps-style chilling adventure where every choice shapes your fate.`,
  theme: "Goosebumps - spooky, mysterious, suspenseful",
  startNode: "intro1",
  nodes: {
    // Introduction / Setup Nodes
    "intro1": {
      title: "📜 A Strange Invitation",
      text: `The letter arrived without warning, a thick envelope sealed with dark wax bearing an ominous crest. As you break the seal, a chill runs down your spine. It's from your eccentric great-uncle, inviting you to spend one week at Blackwood Manor—a place shrouded in shadow and whispered tales.

The sun begins to set as the train pulls into the foggy Blackwood station. You clutch the letter tightly, wondering what awaits.

<span class="text-purple-400">Will you uncover secrets or become one of the manor's lost whispers?</span>

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Head straight to the manor.", next: "manorEntrance" },
        b: { text: "Visit the town to learn more first.", next: "townVisit" },
      },
    },

    "townVisit": {
      title: "👥 Whispers in the Town",
      text: `The town of Blackwood is small, cloaked in shadows and wary glances. The locals speak in hushed tones about the manor — tales of disappearances, strange noises, and eerie lights.

An old woman with piercing eyes warns you, <span class="text-red-400">"Stay away from the west wing after dark, or the shadows might claim you."</span> Your heart hammers.

The line between caution and curiosity blurs.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Heed her warning and avoid the west wing.", next: "manorSafeEntrance" },
        b: { text: "Ignore the warning and prepare to explore the west wing.", next: "manorWestWing" },
      },
    },

    "manorEntrance": {
      title: "🚪 Across the Threshold",
      text: `The manor looms before you, the iron gates creaking open like wide jaws ready to swallow you whole. The air smells of damp wood and forgotten memories. You step inside, the floorboards creaking beneath your feet.

The grand foyer stretches before you, dimly lit by flickering candle sconces. Somewhere deep within, a clock ticks backwards. Suddenly, the door slams shut behind you.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Explore the grand staircase.", next: "grandStaircase" },
        b: { text: "Check the library to the right.", next: "libraryRoom" },
      },
    },

    // Paths from Town Visit (manor safe or west wing)
    "manorSafeEntrance": {
      title: "🛡️ The Cautious Path",
      text: `You decide to keep to the known parts of the manor, determined to find clues without risking shadows and curses. The east wing holds portraits whose eyes seem to follow you, and a fireplace where cold embers glow faintly.

You hear soft footsteps but see no one. There's a door slightly ajar at the hallway's end.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Enter the ajar door.", next: "secretRoom" },
        b: { text: "Call out to see if anyone's there.", next: "emptyHallway" },
      },
    },

    "manorWestWing": {
      title: "⚠️ The Forbidden Wing",
      text: `The west wing creaks open to a cold darkness that seems alive. Dust motes dance in the faint moonlight filtering through cracked windows. A chilling breeze brushes your skin like invisible fingers.

Suddenly, a portrait's eyes gleam red, warning you too late. The floor gives way beneath you, and you fall through into the manor's secret basement.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Explore the basement passage to the left.", next: "basementLeft" },
        b: { text: "Try to climb back through the hole.", next: "trappedBasement" },
      },
    },

    // Grand staircase and library rooms
    "grandStaircase": {
      title: "🪜 Echoes Upstairs",
      text: `The grand staircase spirals upward, its gothic railings curling like claws. Every creak echoes through the still manor. As you ascend, a portrait falls off the wall revealing a hidden corridor.

Your heartbeat quickens. Mystery or trap? You can either enter the corridor or continue to the top floor.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Enter the hidden corridor.", next: "hiddenCorridor" },
        b: { text: "Head to the top floor.", next: "topFloor" },
      },
    },

    "libraryRoom": {
      title: "📚 Whispers Among the Books",
      text: `The library smells of aged paper and secrets. Rows of towering shelves barely contain the ancient tomes. A book lies open on a dusty table, its pages glowing faintly with strange symbols.

As you reach out, a whisper urges you to read aloud or close the book and search the room.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Read the glowing book.", next: "magicBook" },
        b: { text: "Ignore it and search for other clues.", next: "librarySearch" },
      },
    },

    // Secret room and empty hallway
    "secretRoom": {
      title: "🔍 The Hidden Chamber",
      text: `Beyond the door lies a chamber cluttered with ancient artifacts and dusty journals. One journal catches your eye, mentioning a curse linked to your bloodline.

Suddenly, a ghostly apparition appears, asking if you seek the truth or want to leave this place forever.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Ask the ghost for the truth.", next: "ghostTruth" },
        b: { text: "Flee the chamber immediately.", next: "fleeChamber" },
      },
    },

    "emptyHallway": {
      title: "🔇 Silent Halls",
      text: `Your voice echoes with no response. The hallway remains empty, cold drafts pushing at your back. Suddenly you feel the floor vibrate — the manor itself seems alive.

The walls start to close in. You must act fast.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Run back towards the foyer.", next: "manorEntrance" },
        b: { text: "Dash forward into the darkness.", next: "trapRoom" },
      },
    },

    // Basement branches
    "basementLeft": {
      title: "🌀 The Labyrinth Below",
      text: `The basement passage twists and turns like a serpent's lair. You hear whispers in an unknown tongue and see glowing runes etched on the walls.

Ahead, two paths appear: one bathed in blue light, the other pitch black.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Take the blue lit path.", next: "bluePath" },
        b: { text: "Venture into the dark path.", next: "darkPath" },
      },
    },

    "trappedBasement": {
      title: "🪤 No Escape",
      text: `Your hands claw at the crumbling wall but it's too slick. The hole closes above you, sealing your fate below.

The cellar walls begin to pulse with a strange energy, and whispers turn to laughter as the darkness takes hold.

You feel yourself slipping away, trapped forever in the manor's bowels.

<span class="text-red-400">💀 FATE SEALED: The Trapped Soul</span>
<span class="text-yellow-400">You became another victim of the manor's hunger!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Hidden corridor and top floor
    "hiddenCorridor": {
      title: "🖼️ Secrets Unveiled",
      text: `The hidden corridor is lined with portraits of your ancestors. Their eyes seem to glow, and the air thickens with power.

At the end, a door leads to a room filled with mirrors—each one showing a different future. One mirror cracks revealing your reflection twisted in shadow.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Touch the cracked mirror.", next: "mirrorTrap" },
        b: { text: "Step through another mirror.", next: "mirrorEscape" },
      },
    },

    "topFloor": {
      title: "🏠 The Attic's Secret",
      text: `On the top floor, the dusty attic holds trunks and broken toys. Among the clutter, you find a locket that pulses with warmth.

Suddenly, the floorboards creak as a spectral figure approaches, offering a chance to lift the curse if you give up your soul for a day.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Accept the spectral figure's deal.", next: "dealAccepted" },
        b: { text: "Refuse and search for another way.", next: "searchAttic" },
      },
    },

    // Magic book and library search
    "magicBook": {
      title: "📖 Awakening the Curse",
      text: `The moment you speak the words, the symbols burn bright. The room distorts around you as your vision blurs.

You hear voices chanting your name, and shadows twist to form tendrils creeping toward you. You must act quickly.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to close the book.", next: "closeBook" },
        b: { text: "Follow the voices deeper into the manor.", next: "voicesPath" },
      },
    },

    "librarySearch": {
      title: "📝 Hidden Messages",
      text: `As you sift through the dusty shelves, you uncover an old diary belonging to your great-uncle.

The pages reveal not only the manor's dark history but also a way to break the curse—by finding the <span class="text-gold-400">'Heart of Blackwood'</span> hidden within the manor.

But time is running out.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Search for the Heart of Blackwood immediately.", next: "heartSearch" },
        b: { text: "Ignore the diary and explore elsewhere.", next: "manorEntrance" },
      },
    },

    // Ghost truth and flee chamber
    "ghostTruth": {
      title: "👻 Revelations",
      text: `The ghost's eyes glow sorrowfully as it reveals the tragic history: the manor was built on cursed ground, trapped souls seeking justice. Your bloodline is tied to breaking the curse—but at great cost.

It offers to guide you if you promise to carry the burden.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Accept the burden and guidance.", next: "curseBreaker" },
        b: { text: "Refuse and run from the manor.", next: "fleeChamber" },
      },
    },

    "fleeChamber": {
      title: "🏃 Escape... or Not",
      text: `You sprint away, heart pounding, but the manor isn't ready to let you go so easily. Doors slam shut, shadows close behind you.

You find yourself trapped in a room that slowly grows smaller, walls closing in tight—the manor's final trap.

<span class="text-red-400">💀 FATE SEALED: The Crushed Escape</span>
<span class="text-yellow-400">The manor claimed you before you could flee!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Trap room
    "trapRoom": {
      title: "🗜️ The Closing Walls",
      text: `The walls groan louder and inch closer. You try every door—locked or vanished. Your breathing grows shallow.

Suddenly a hidden panel slides open, beckoning you in. Do you risk it?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Enter the hidden panel.", next: "hiddenPassage" },
        b: { text: "Brace yourself and try to hold the walls.", next: "crushedEnding" },
      },
    },

    // Hidden passage and crushed ending
    "hiddenPassage": {
      title: "🚪 Narrow Escape",
      text: `You slip inside the narrow passage just as the walls slam shut behind you.

The passage leads outside to the manor's gardens bathed in moonlight. Freedom is close but strange whispers warn you that this freedom may be temporary.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Run into the night, leaving the manor behind.", next: "freedomEnding" },
        b: { text: "Go back inside, determined to end the curse.", next: "curseBreaker" },
      },
    },

    "crushedEnding": {
      title: "💥 Crushed by the Manor",
      text: `Your strength is no match for the closing walls. Darkness swallows you whole, and your screams echo through the manor forever.

The manor claims another lost soul.

<span class="text-red-400">💀 FATE SEALED: The Crushed Victim</span>
<span class="text-yellow-400">You were no match for the manor's deadly trap!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Blue path and dark path endings
    "bluePath": {
      title: "💎 The Heart of Light",
      text: `The blue lit path glows warmly. At its end, you find a crystal pulsating with pure light—the Heart of Blackwood.

As you grasp it, warmth floods the manor and the shadows retreat. The curse breaks, and dawn breaks over Blackwood Manor.

You have freed the trapped souls.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Light Bearer</span>
<span class="text-yellow-400">You found the Heart of Blackwood and broke the curse!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    "darkPath": {
      title: "🌑 Shadow's Embrace",
      text: `The pitch-black path swallows you whole. You feel your body dissolve into shadows, your essence trapped forever within the manor's dark heart.

You have become part of the curse.

<span class="text-red-400">💀 FATE SEALED: The Shadow Consumed</span>
<span class="text-yellow-400">You became one with the manor's darkness!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Mirror endings
    "mirrorTrap": {
      title: "🪞 Reflected Nightmare",
      text: `Touching the cracked mirror triggers a trap. Your reflection smiles wickedly before pulling you into the glass, trapping you in a twisted endless nightmare realm.

Escape is impossible.

<span class="text-red-400">💀 FATE SEALED: The Mirror Prisoner</span>
<span class="text-yellow-400">You're trapped forever in a reflection of horror!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    "mirrorEscape": {
      title: "✨ Through the Looking Glass",
      text: `Stepping through the other mirror, you find yourself back outside the manor, the curse broken by your bravery.

The morning sun warms your face—freedom and peace at last.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Mirror Walker</span>
<span class="text-yellow-400">You escaped through the mirrors and broke free!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Attic endings
    "dealAccepted": {
      title: "🤝 A Price Paid",
      text: `You accept the spectral figure's eerie deal. For one day, you lose control, a puppet to the manor's dark will. But by dawn, the curse is lifted.

You survive, but wonder what part of you remains trapped.

<span class="text-blue-400">🤝 ENDING ACHIEVED: The Soul Trader</span>
<span class="text-yellow-400">You paid a price but broke the curse!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    "searchAttic": {
      title: "💪 Hidden Strength",
      text: `You refuse the deal and search the attic further. In a trunk, you find holy relics that repel the manor's dark magic.

With newfound strength, you confront the curse, succeeding in breaking it forever.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Relic Hunter</span>
<span class="text-yellow-400">You found the strength to break the curse yourself!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Magic book path endings
    "closeBook": {
      title: "📕 Sealed Fate",
      text: `You close the book quickly, but the curse has already begun. The manor's shadows claim you, transforming you into a whispering ghost trapped forever.

Your story joins the manor's dark history.

<span class="text-red-400">💀 FATE SEALED: The Cursed Reader</span>
<span class="text-yellow-400">The book's curse claimed you as its own!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    "voicesPath": {
      title: "🗣️ The Whispered Journey",
      text: `Following the voices leads you to a secret ritual chamber where you can either perform a ritual to break the curse or risk unleashing the manor's full wrath.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Perform the ritual.", next: "curseBreaker" },
        b: { text: "Flee before it's too late.", next: "fleeChamber" },
      },
    },

    // Heart of Blackwood search
    "heartSearch": {
      title: "🔍 The Final Hunt",
      text: `The manor's secret heart pulses beneath the floorboards of the main hall. You can try to break the floor or search for the hidden key.

Every second counts.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Break the floorboards.", next: "curseBreaker" },
        b: { text: "Search for the key.", next: "trapRoom" },
      },
    },

    // Curse breaker ending
    "curseBreaker": {
      title: "⚡ Breaking the Curse",
      text: `With courage, knowledge, and resolve, you perform the ancient rites and claim the Heart of Blackwood. The manor shudders, shadows shriek, then vanish.

Light floods every corner as the curse shatters. You have won! The manor's secrets are yours to keep and share.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Curse Breaker</span>
<span class="text-yellow-400">You lifted the manor's ancient curse and freed countless souls!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Freedom ending
    "freedomEnding": {
      title: "🌅 Freedom's Dawn",
      text: `You burst into the cool night air, the manor's oppressive hold weakening behind you. Though the curse remains, you have escaped with your life and a story to tell.

Freedom is yours… for now.

<span class="text-blue-400">🏃 ENDING ACHIEVED: The Escapist</span>
<span class="text-yellow-400">You escaped the manor but left the curse unbroken!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },
  },
};