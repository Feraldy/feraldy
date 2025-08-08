import { Story } from './index';

export const forgottenMemoriesStory: Story = {
  id: "forgotten-memories-house",
  title: "🏚️ The House of Forgotten Memories",
  description: "You wake up with no memory in a creepy old house alongside Max. Strange nightmares haunt you, and mysterious forces lurk in every corner. Will you uncover the truth or be lost forever?",
  theme: "Mystery, Horror, Sci-fi",
  startNode: "wakeup",
  nodes: {
    wakeup: {
      title: "🌙 Awakening in Darkness",
      text: `You slowly open your eyes, your head throbbing with a dull ache. A dim, flickering light casts eerie shadows across dusty wallpaper and broken furniture. You cannot remember your name, or how you ended up in this decrepit house.

Suddenly, a boy your age appears from the shadows. His eyes reveal confusion much like your own. <span class="text-green-400">"I'm Max,"</span> he whispers. Together, you try to make sense of your surroundings.

Suddenly, a sharp knocking echoes from downstairs, snapping you from your thoughts. Do you dare open the door? Or stay hidden and observe?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Open the door", next: "door_open" },
        b: { text: "Stay hidden", next: "stay_hidden" },
        c: { text: "Sneak out the window", next: "window_escape" },
      },
    },

    // Branch A - Secret Agents
    door_open: {
      title: "👤 The Men in Black",
      text: `You open the front door slowly. Two hulking men in dark suits storm inside! With quick reflexes, you and Max knock them out cold. Searching the rooms, you discover a secret lab with strange equipment and papers revealing your identities: secret agents working on a teleportation device called the <span class="text-green-400">Matter Slammer</span>.

But danger lurks still: an enemy agent is hunting you. You can search for weapons, hide, or explore the lab.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Search for weapons", next: "search_weapons" },
        b: { text: "Hide in the shadows", next: "hide_shadows" },
        c: { text: "Explore the Matter Slammer room", next: "explore_lab" },
      },
    },

    search_weapons: {
      title: "🔫 Armed for Survival",
      text: `You sneak to the weapons cabinet, heart pounding. Inside you find stun guns and tranquilizer darts. Suddenly, the enemy agent appears in the hallway!

You prepare for a fight. Using a stun gun, you catch him off guard and flee to the Matter Slammer room. The machine hums ominously.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Use the Matter Slammer to teleport away", next: "teleport_escape" },
        b: { text: "Confront the agent with tranquilizers", next: "confront_agent" },
      },
    },

    hide_shadows: {
      title: "🫥 Stealth and Secrets",
      text: `You melt into the dark corners as the enemy agent searches the rooms. Max hands you a strange key found on the man's belt. He whispers about a hidden exit.

But the agent grows suspicious. Your only chance may be the teleportation device nearby.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Activate the Matter Slammer", next: "matter_slammer" },
        b: { text: "Try the hidden exit with the key", next: "hidden_exit" },
      },
    },

    explore_lab: {
      title: "🧪 The Matter Slammer Room",
      text: `The lab glows with humming machines; an eerie pulse vibrates in the air. The Matter Slammer stands center stage, lights flickering. On a table, papers detail experiments on teleportation between dimensions.

You feel drawn to press the big red button—but what consequences could follow?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Press the red button", next: "slam_activate" },
        b: { text: "Step away and look for another way", next: "search_rooms" },
      },
    },

    slam_activate: {
      title: "🌀 Dimensional Chaos",
      text: `As you slam your palm onto the button, the machine roars to life. Bright lights swirl, sending you and Max tumbling through space and time. Suddenly, reality shudders, and you find yourselves in an unfamiliar place—a realm between worlds.

You feel your bodies shifting.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to control your transformations", next: "dimensional_control" },
        b: { text: "Search for an escape portal", next: "dimensional_escape" },
      },
    },

    dimensional_control: {
      title: "⚡ Mastering the Shift",
      text: `Straining your mind, you attempt to harness the chaotic energy morphing your bodies. Slowly, you regain control, turning your transformations into weapons. Max looks with newfound strength and joins you in preparing for a fight ahead.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Launch an attack against the shadow beasts", next: "attack_beasts" },
        b: { text: "Search for an exit before it's too late", next: "dimensional_escape" },
      },
    },

    dimensional_escape: {
      title: "🏃 Race to Freedom",
      text: `You stumble through shifting corridors hunting for a portal home. Suddenly, a swirling gateway appears, but before you step through, shadowy figures block your path! Fighting or fleeing will be your last choice.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Fight the shadows", next: "final_battle" },
        b: { text: "Leap into the portal blindly", next: "portal_jump" },
      },
    },

    final_battle: {
      title: "⚔️ Clash of Realities",
      text: `You and Max battle the encroaching shadow figures fiercely. Using your new powers and sharp wits, you overcome the attackers. A portal opens and you jump through, shattered memories returning as you collapse into your own bed.

<span class="text-green-400">🎉 ENDING ACHIEVED: Agents Reunited</span>
<span class="text-yellow-400">You survive the nightmare, recover your memories, and bring peace to your fractured lives.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    portal_jump: {
      title: "🌀 Unknown Fate",
      text: `You leap into the portal without hesitation. The world twists, and you awaken... but this time, something is terribly wrong. You're trapped in a looping cycle of nightmares, unable to escape the house's grasp.

<span class="text-red-400">💀 FATE SEALED: Eternal Prisoner</span>
<span class="text-yellow-400">Your soul is locked forever in the house of forgotten memories.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    teleport_escape: {
      title: "✨ Matter Slammer Escape",
      text: `You activate the Matter Slammer and teleport to safety, leaving the enemy agent behind. Your memories slowly return as you find yourself in a secure facility.

<span class="text-green-400">🎉 ENDING ACHIEVED: Teleport Master</span>
<span class="text-yellow-400">You used advanced technology to escape and reclaim your identity.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    confront_agent: {
      title: "💉 Agent Showdown",
      text: `You confront the enemy agent with tranquilizer darts. After a tense battle, you manage to subdue him and discover he was trying to steal your research. Victory is yours!

<span class="text-green-400">🎉 ENDING ACHIEVED: Agent Victor</span>
<span class="text-yellow-400">You defeated the enemy and protected your secret mission.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    matter_slammer: {
      title: "🌀 Dimensional Jump",
      text: `You activate the Matter Slammer and find yourself transported to a parallel dimension where you and Max are celebrated heroes.

<span class="text-green-400">🎉 ENDING ACHIEVED: Dimensional Heroes</span>
<span class="text-yellow-400">You found a better reality where you belong.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    hidden_exit: {
      title: "🗝️ Secret Passage",
      text: `Using the key, you unlock a hidden passage that leads to freedom. You and Max escape the house and start new lives with your recovered memories.

<span class="text-green-400">🎉 ENDING ACHIEVED: Key to Freedom</span>
<span class="text-yellow-400">The right key opened the door to a new beginning.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    search_rooms: {
      title: "🔍 Deeper Investigation",
      text: `You search other rooms and find evidence of your past life as secret agents. Armed with this knowledge, you successfully evade capture and escape.

<span class="text-green-400">🎉 ENDING ACHIEVED: Knowledge is Power</span>
<span class="text-yellow-400">Understanding your past gave you the tools to secure your future.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    attack_beasts: {
      title: "👹 Beast Battle",
      text: `You launch a fierce attack against the shadow beasts, using your newfound powers to defeat them and clear a path to freedom.

<span class="text-green-400">🎉 ENDING ACHIEVED: Shadow Slayer</span>
<span class="text-yellow-400">You conquered the darkness with courage and power.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Branch B - Werewolf Storyline
    stay_hidden: {
      title: "🕵️ Lurking Danger",
      text: `You stay hidden but steal a glance upstairs. Suddenly, a foreboding figure appears—a hunter commanding armies of silver-armed dolls. The hunter's gaze cuts through the gloom as you feel a strange sensation sweeping over your body. Your hands itch with fur; your senses sharpen.

You realize... you are transforming into a werewolf.

Do you fight the hunter, try to run, or embrace the change?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Fight alongside the werewolves", next: "werewolf_ally" },
        b: { text: "Join the hunters seeking cure", next: "hunter_path" },
        c: { text: "Run deeper into the house", next: "werewolf_run" },
      },
    },

    werewolf_ally: {
      title: "🐺 Pack Loyalty",
      text: `You howl with the pack, embracing your new powers and the primal rage. Together, you launch a fierce attack on the hunters. But victory comes at a cost—your humanity fades.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Accept your new werewolf life", next: "werewolf_ending_good" },
        b: { text: "Fight to regain humanity", next: "werewolf_ending_bad" },
      },
    },

    werewolf_ending_good: {
      title: "🌙 Embracing the Moon",
      text: `You become a leader among the werewolves, strong and free. The house fades behind you as you run wild beneath the moon. The nightmare has ended, but a new life begins.

<span class="text-green-400">🎉 ENDING ACHIEVED: Lunar Leader</span>
<span class="text-yellow-400">You choose power and freedom over your past life.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    werewolf_ending_bad: {
      title: "🐺 Lost to the Beast",
      text: `Your struggle fails; the beast inside overpowers you. You lose yourself in primal fury, becoming a danger to everyone, including Max. The house consumes your soul forever.

<span class="text-red-400">💀 FATE SEALED: Beast Unbound</span>
<span class="text-yellow-400">Trapped in a cursed, savage fate.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    hunter_path: {
      title: "🏹 The Hunter's Cure",
      text: `You join the hunters in their quest to wolf-proof the world. They offer a serum claiming to reverse the curse. But the serum's effects are unpredictable...

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Take the serum", next: "serum_effect" },
        b: { text: "Refuse and run away", next: "werewolf_run" },
      },
    },

    serum_effect: {
      title: "💉 Unexpected Transformation",
      text: `The serum burns through your veins. Instead of curing, it mutates you into a bizarre were-skunk hybrid, rejected by all. You are trapped in exile.

<span class="text-red-400">💀 FATE SEALED: The Cursed Hybrid</span>
<span class="text-yellow-400">A tragic fate from trying to escape your doom.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    werewolf_run: {
      title: "🏃 Flight through Shadows",
      text: `You sprint deeper into the ancient house, heart pounding. Hallways twist in impossible ways, dragging you into a labyrinth inhabited by monstrous German Shepherds snarling at your heels.

Your chase will end in death or ingenious escape.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Fight the dogs with teeth and claws", next: "fight_dogs" },
        b: { text: "Hide in an old closet", next: "hide_closet" },
        c: { text: "Look for a secret exit", next: "secret_exit" },
      },
    },

    fight_dogs: {
      title: "⚔️ Fatal Encounter",
      text: `You battle fiercely but the dogs overwhelm you. Darkness takes you as your screams echo through the house.

<span class="text-red-400">💀 FATE SEALED: Devoured by Shadows</span>
<span class="text-yellow-400">The beast within failed to save you.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    hide_closet: {
      title: "🫥 Narrow Escape",
      text: `You cram yourself inside a dusty closet, barely breathing as snarling dogs rush past. The threat fades, but the house still holds secrets to discover.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Wait for dogs to leave and sneak out", next: "hidden_corridor" },
        b: { text: "Call out to Max for help", next: "call_max" },
      },
    },

    secret_exit: {
      title: "🚪 Unexpected Freedom",
      text: `You find a disguised crawlspace leading outside. Fresh air fills your lungs as you escape the nightmare labyrinth.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Survivor</span>
<span class="text-yellow-400">You escaped the house and the curse behind it.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    hidden_corridor: {
      title: "📖 Secrets in the Shadows",
      text: `You slink through the hidden corridor and find an old diary revealing the origins of the curse and hints on how to end it. Your next steps might change everything.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Use the diary's knowledge to craft a cure", next: "cure_attempt" },
        b: { text: "Burn the diary and reject the past", next: "burn_diary" },
      },
    },

    call_max: {
      title: "🤝 Lost but United",
      text: `Max finds you and together you plan your escape. But the house shifts eerily, trapping you in a room that bends reality.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Search for hidden mechanisms", next: "mechanism_room" },
        b: { text: "Try to break a window and shout for help", next: "break_window" },
      },
    },

    cure_attempt: {
      title: "💊 Hope Restored",
      text: `Using the diary's formulas, you and Max brew a potion. Drinking it reverses the curse's darkest effects. Dawn breaks outside as you regain your human forms.

<span class="text-green-400">🎉 ENDING ACHIEVED: Curse Broken</span>
<span class="text-yellow-400">You saved yourselves and ended the nightmare.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    burn_diary: {
      title: "🔥 Denial's Price",
      text: `You burn the diary, but in doing so you doom yourselves to repetition of the curse. Madness overtakes you both as the house tightens its grip.

<span class="text-red-400">💀 FATE SEALED: Cursed Forever</span>
<span class="text-yellow-400">Ignorance sealed your fate.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    mechanism_room: {
      title: "⚙️ Hidden Passageway",
      text: `You discover a hidden lever that opens a secret passageway. You and Max slip through, finding a strange device pulsing with energy.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Activate the device", next: "device_activation" },
        b: { text: "Leave it alone and explore further", next: "explore_further" },
      },
    },

    break_window: {
      title: "💥 Shattered Hope",
      text: `The glass shatters, but instead of freedom, you find yourself falling into a pit trap. Darkness consumes you.

<span class="text-red-400">💀 FATE SEALED: Trapped and Forgotten</span>
<span class="text-yellow-400">The house claimed you utterly.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    device_activation: {
      title: "⚡ Escape Through Technology",
      text: `The device hums and opens a portal outside the house. You and Max leap through, escaping the nightmare world.

<span class="text-green-400">🎉 ENDING ACHIEVED: Technological Salvation</span>
<span class="text-yellow-400">Science saves the day.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    explore_further: {
      title: "🌀 Endless Hallways",
      text: `You ignore the device and wander deeper. The house stretches endlessly, trapping you in a maze with no exit.

<span class="text-red-400">💀 FATE SEALED: Lost Forever</span>
<span class="text-yellow-400">Endless wandering seals your fate.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    // Branch C - Alien Ambush
    window_escape: {
      title: "🪟 Escape Attempt",
      text: `You climb out the window only to be grabbed by shining beams of light from above. Alien figures silently examine you before dragging you into a sterile ship.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Cooperate and explore the ship", next: "alien_cooperate" },
        b: { text: "Attempt to sabotage the ship's controls", next: "alien_sabotage" },
      },
    },

    alien_cooperate: {
      title: "👽 Alien Experiment",
      text: `You follow the aliens' instructions, exploring the ship's strange chambers. They reveal they erased your memories to protect you from a cosmic threat.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Join their mission to save Earth", next: "alien_mission_good" },
        b: { text: "Try to escape and warn humanity", next: "alien_escape" },
      },
    },

    alien_sabotage: {
      title: "💥 Rebellion and Retribution",
      text: `You try to sabotage the ship, but alarms blare. Aliens restrain you, erasing your memory forever.

<span class="text-red-400">💀 FATE SEALED: Alien Pawn</span>
<span class="text-yellow-400">A captive of the stars.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    alien_mission_good: {
      title: "🌟 Cosmic Guardian",
      text: `You embrace your role, gaining cosmic knowledge and power. You return to Earth as a secret protector, sworn to keep it safe.

<span class="text-green-400">🎉 ENDING ACHIEVED: Earth's Secret Guardian</span>
<span class="text-yellow-400">You become a legend hidden in plain sight.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },

    alien_escape: {
      title: "⚠️ Dangerous Warning",
      text: `You escape the ship and warn humanity, but few believe your story. You live in fear of alien retribution, always watching the skies.

<span class="text-yellow-400">🎉 ENDING ACHIEVED: Harbinger of Truth</span>
<span class="text-yellow-400">Isolated but determined to prepare Earth for what's coming.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {},
    },
  },
};