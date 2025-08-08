import { Story } from './index';

export const woodsWorldStory: Story = {
  id: "woods-world-werewolf-chase",
  title: "WoodsWorld: The Werewolf Chase",
  description: `You arrive at WoodsWorld, a summer resort deep in the woods. Your friend Todd Morris's precious pewter figurines have been stolen by the Murphy brothers, notorious bullies. As you try to retrieve them, you get tangled in a chilling mystery of werewolves, trolls, lake monsters, and magic. Choose your path wisely to survive the Night at WoodsWorld.`,
  theme: "Goosebumps Horror Adventure",
  startNode: "intro",
  nodes: {
    // Intro node with background story
    intro: {
      title: "Arrival at WoodsWorld",
      text: `It's your first day at WoodsWorld—a sprawling resort surrounded by thick, dark woods. Your friend Todd Morris, a goofy but kind kid, just found out his cherished box of pewter figurines has been snatched by a trio of bullies called the Murphy Brothers. At the kids-only campfire, Sharky Murphy tells an old legend: WoodsWorld is haunted by werewolves who only come out at night. You promise Todd to get his box back before dawn, but the woods hide many dangers.<br><br><span class="text-purple-400">You feel a cold breeze brush your neck as the campfire flickers</span>. The night is just beginning.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Head to the Murphy brothers' cabin to confront them", next: "murphyCabin" },
        b: { text: "Visit the kids-only campfire and listen to more stories", next: "campfire" },
        c: { text: "Explore the woods cautiously to find clues", next: "woodsExplore" },
      }
    },
    // Murphy brothers cabin node
    murphyCabin: {
      title: "Murphy Brothers' Cabin",
      text: `You creep closer to a small, shabby cabin where the laughter of the Murphy brothers echoes. The door creaks slightly ajar, and you spot the glint of something shiny inside. Suddenly, a howl pierces the night, freezing you in place. You realize it's not just bullies you're dealing with — there's something much worse lurking.<br><br><span class="text-red-400">Shadows flicker across the trees, and eyes glare at you from the darkness.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Burst inside to demand the box back", next: "insideCabin" },
        b: { text: "Hide and wait to see what happens", next: "hideBehindTree" },
        c: { text: "Retreat to the campfire to regroup", next: "campfire" },
      }
    },
    // Inside cabin
    insideCabin: {
      title: "Inside the Murphy Cabin",
      text: `You push the door open with a creak. Inside, you find the Murphy brothers arguing with a snarling, werewolf-like creature. Todd is nowhere in sight. Suddenly, the creature's eyes lock on you, and it snarls loudly, its teeth glinting in the firelight.<br><br>Your heart pounds.<br><br><span class="text-purple-400">Do you try to calm the creature or run?</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to calm the werewolf", next: "calmWerewolf" },
        b: { text: "Run out of the cabin", next: "runForest" },
      }
    },
    // Calm the werewolf
    calmWerewolf: {
      title: "Calming the Beast",
      text: `You speak softly, trying to reach whatever humanity is left inside the beast. The werewolf's snarls soften, and cautiously, it transforms back into Todd — your friend! He's scared and confused.<br><br>Suddenly, a magical glow surrounds the box of pewter figurines on the table. You realize the box holds some power, and the real danger isn't the werewolves themselves.<br><br><span class="text-green-400">You have a moment to act.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Grab the box and run", next: "grabBoxRun" },
        b: { text: "Ask Todd to explain", next: "toddExplain" },
      }
    },
    // Run into forest
    runForest: {
      title: "Running Into the Forest",
      text: `You dash out the door as fast as you can. The woods are dark, and strange noises echo all around. Suddenly, a shadowy figure blocks your path — a huge troll with glowing eyes!<br><br>You can't tell if it wants to help or harm.<br><br><span class="text-red-400">The air smells of moss and danger.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to talk to the troll", next: "talkTroll" },
        b: { text: "Run past the troll", next: "runPastTroll" },
      }
    },
    // Talk to troll
    talkTroll: {
      title: "Negotiating with a Troll",
      text: `The troll narrows his eyes suspiciously but listens. You explain your quest and Todd's stolen box. Surprisingly, the troll offers you a deal: "Help me get rid of those pesky fire ants who invaded my cave, and I'll help you find your friend."<br><br>You realize this alliance could be powerful but risky.<br><br><span class="text-green-400">An uneasy truce is formed.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Accept and help with fire ants", next: "fireAntsChallenge" },
        b: { text: "Decline and continue alone", next: "aloneForest" },
      }
    },
    // Fire ants challenge
    fireAntsChallenge: {
      title: "Battle with the Fire Ants",
      text: `You follow the troll to the edge of a dark cave, where an angry swarm of fire ants buzz menacingly. Their tiny bodies glow an eerie red, and their bites burn like fire.<br><br>You need a clever plan to survive this encounter.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Use water from your bottle to flood the cave", next: "floodCave" },
        b: { text: "Distract them with candy and escape", next: "sweetEscape" },
      }
    },
    // Flood cave ending
    floodCave: {
      title: "Flooding the Fire Ants",
      text: `You pour water into the cave entrance. The fire ants screech and scatter, but the troll steps back nervously. Suddenly, the ground beneath you shifts — the cave collapses!<br><br>You barely escape but lose the troll's help and any hope of finding Todd tonight.<br><br><span class="text-red-400">Trapped outside with nowhere to turn...</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to find another path", next: "lostForest" },
        b: { text: "Go back to campfire and rethink plan", next: "campfire" },
      }
    },
    // Sweet escape ending
    sweetEscape: {
      title: "Sweet Escape",
      text: `You throw candy at the fire ants. The swarm follows the sugary trail, allowing you and the troll to slip away. Grateful, the troll leads you to a hidden path towards Todd's last known hiding spot.<br><br>Hope flares in your chest.<br><br><span class="text-green-400">You get closer to your goal.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Follow the path deeper", next: "hiddenPath" },
        b: { text: "Take a rest and prepare", next: "restSpot" },
      }
    },
    // Hidden path node
    hiddenPath: {
      title: "Hidden Path",
      text: `You follow the narrow trail through twisted trees. The air grows colder, and you hear distant howling. Suddenly, a pack of glowing-eyed werewolves blocks your way — but Todd rides at their side!<br><br>Todd looks torn between the pack and you.<br><br><span class="text-red-400">A critical choice looms.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Call Todd to join you", next: "rescueTodd" },
        b: { text: "Try to sneak past the pack", next: "sneakPast" },
      }
    },
    // Rescue Todd ending
    rescueTodd: {
      title: "Rescue Todd",
      text: `You shout Todd's name, and after a tense moment, he breaks away from the pack and runs to you. The werewolves growl but hesitate. Suddenly, Todd's box of pewters glows and the pack backs off.<br><br>You have saved your friend and the day.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Werewolf Whisperer</span><br>You rescued Todd and uncovered the secret power of the pewter box!<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Sneak past pack - negative ending
    sneakPast: {
      title: "Caught by the Pack",
      text: `You try to sneak past quietly but a twig snaps, alerting the werewolves. They surround you, snarling and baring sharp teeth. The last thing you see is Todd watching with sad eyes before blackness takes over.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Lost Hunter</span><br>You were caught by the werewolf pack. Some friends don't survive.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Hide behind tree node
    hideBehindTree: {
      title: "Behind the Tree",
      text: `You press yourself against a tree, heart hammering. From your hiding spot, you watch as the Murphy brothers argue with the wolf-like creature turning back and forth between Todd and beast.<br><br>You notice a small box on a shelf glowing faintly — it must be Todd's figurines.<br><br><span class="text-purple-400">A sneaky plan may work here.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Sneak in and grab the box quietly", next: "grabBoxQuietly" },
        b: { text: "Create a distraction and grab the box", next: "createDistraction" },
      }
    },
    // Grab box quietly
    grabBoxQuietly: {
      title: "Silent Grab",
      text: `You tiptoe inside and manage to grab the glowing box. Just as you turn to leave, the werewolf's eyes snap open and it lunges! You barely escape, heart racing.<br><br>You have the box but the chase is on!<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Run to campfire", next: "campfire" },
        b: { text: "Hide in the woods", next: "woodsHide" },
      }
    },
    // Create distraction
    createDistraction: {
      title: "Dangerous Diversion",
      text: `You hurl a rock to distract the Murphy brothers and the werewolf. As they turn, you dash in and snatch the box. But you trip on a root, causing a loud snap. Now they're after you!<br><br><span class="text-red-400">You must escape fast.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Climb a tree and wait", next: "treeEscape" },
        b: { text: "Run towards the lake", next: "lakeEscape" },
      }
    },
    // Lake escape node
    lakeEscape: {
      title: "Escape to the Lake",
      text: `You sprint to the lake's edge, hearing footsteps close behind. The water is icy cold, but the moonlight reflects off a small boat nearby.<br><br>The werewolves pause at the water's edge, unable or unwilling to follow.<br><br><span class="text-green-400">A chance to escape or confront awaits.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Take the boat and row away", next: "boatEscape" },
        b: { text: "Face the werewolves at the shore", next: "shoreShowdown" },
      }
    },
    // Boat escape ending - ambiguous
    boatEscape: {
      title: "Boat Escape",
      text: `You row quickly, the shore disappearing behind you. The water calms your racing heart and the night sky is peaceful. But you don't know if Todd or the box are safe back on land.<br><br><span class="text-yellow-400">🤔 ENDING ACHIEVED: The Lonely Escape</span><br>You escaped the danger, but your quest remains unfinished.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Shore showdown ending - bad
    shoreShowdown: {
      title: "Shore Showdown",
      text: `You stand firm as the werewolves growl, their eyes glowing fiercely. With no weapon but your courage, you face your fears. Suddenly, Todd steps forward — part man, part beast.<br><br>The pack closes in.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Werewolf's Victim</span><br>Your bravery wasn't enough. Sometimes, the woods win.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Campfire node revisited
    campfire: {
      title: "At the Campfire",
      text: `You return to the kids-only campfire where Lauren, another camper, awaits. She tells you strange rumors of trolls living in the forest and the lake monster that prowls at night. Together, you plan your next move.<br><br><span class="text-purple-400">The night grows darker, and time is short.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Ask Lauren to join your quest", next: "teamUpLauren" },
        b: { text: "Go explore the troll caves", next: "trollCaves" },
        c: { text: "Search the lake shore with Lauren", next: "lakeSearch" },
      }
    },
    // Team up with Lauren
    teamUpLauren: {
      title: "Teaming Up with Lauren",
      text: `Lauren and you form a pact to find Todd's missing box and uncover WoodsWorld's secrets. Her knowledge of local myths could give you the edge.<br><br>You set off together, feeling stronger.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Go to troll caves", next: "trollCaves" },
        b: { text: "Search lakeside", next: "lakeSearch" },
      }
    },
    // Troll caves
    trollCaves: {
      title: "Troll Caves",
      text: `The caves are damp with a faint glow from bioluminescent moss. You hear grunts and muttering nearby and soon find an angry troll guarding a pile of shiny objects — Todd's box seems to be among them.<br><br>The troll doesn't seem friendly.<br><br><span class="text-red-400">You must decide quickly.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Offer to exchange something for the box", next: "exchangeOffer" },
        b: { text: "Try to steal the box quietly", next: "stealBox" },
      }
    },
    // Exchange offer
    exchangeOffer: {
      title: "The Troll's Offer",
      text: `You offer the troll some candy and promise to help him with the fire ant problem in exchange for Todd's box. The troll grunts and nods slowly.<br><br>Loyalty might be your greatest weapon.<br><br><span class="text-green-400">You have earned an ally.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Help with fire ants", next: "fireAntsChallenge" },
        b: { text: "Change your mind and leave", next: "campfire" },
      }
    },
    // Steal box attempt
    stealBox: {
      title: "Stealing from the Troll",
      text: `You creep toward the pile to grab the box, but the troll's hand shoots out and grabs your wrist! His grip feels unbreakable.<br><br>The troll's eyes glow bright red as he mutters a spell, and suddenly your voice can only say one word: "Gyzacck!"<br><br><span class="text-red-400">😵 ENDING ACHIEVED: The Troll's Curse</span><br>Cursed to only speak nonsense, your quest ends here.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Woods explore node
    woodsExplore: {
      title: "Exploring the Woods",
      text: `You step deeper into the shadowy woods. Branches crack and the moon peeks through the leaves. The hairs on your neck stand on end as you hear something large splashing in the nearby lake.<br><br>Dark shapes move just out of sight.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Investigate the lake", next: "lakeMonster" },
        b: { text: "Return to campfire", next: "campfire" },
      }
    },
    // Lake monster node
    lakeMonster: {
      title: "The Deep Woods Lake Monster",
      text: `You approach the lake and the water ripples violently. Suddenly, a giant scaly creature with glowing eyes breaches the surface! It lunges toward you with jaws wide open.<br><br>You barely jump back to the shore.<br><br><span class="text-red-400">A battle for survival begins.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Fight with sticks and rocks", next: "fightMonster" },
        b: { text: "Run back into the woods", next: "woodsEscape" },
      }
    },
    // Fight monster - bad ending
    fightMonster: {
      title: "Fighting the Lake Monster",
      text: `You gather sticks and rocks and throw them at the lake monster. It roars and lunges, knocking you into the freezing water. In the darkness beneath, you sense the jaws closing around you...<br><br><span class="text-red-400">😱 ENDING ACHIEVED: Swallowed by the Lake</span><br>The Deep Woods claim another.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Woods escape node
    woodsEscape: {
      title: "Escape into the Woods",
      text: `You turn and dash away, the sounds of the monster echoing behind you. You burst through the trees and back toward the campfire.<br><br>You're exhausted but alive.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Return to campfire", next: "campfire" },
        b: { text: "Rest and plan next move", next: "restSpot" },
      }
    },
    // Woods hide node
    woodsHide: {
      title: "Hiding in the Woods",
      text: `You slip into the shadows of the trees, clutching the box tightly. The werewolf's snarls fade into the distance. You have the prize, but the danger is far from over.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Make a break for the campfire", next: "campfire" },
        b: { text: "Look for a safe place to rest", next: "restSpot" },
      }
    },
    // Rest spot node
    restSpot: {
      title: "Resting Spot",
      text: `You find a quiet clearing where you catch your breath. The moonlight shines softly, and for a moment, the terror of WoodsWorld feels far away. But you know midnight approaches — when the werewolves grow strongest.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Prepare for battle", next: "finalBattle" },
        b: { text: "Try to find Todd's whereabouts", next: "hiddenPath" },
      }
    },
    // Final battle node
    finalBattle: {
      title: "The Final Battle",
      text: `Armed with courage and Todd's glowing pewter box, you face the werewolf pack as dawn approaches. You stand side by side with Todd, who fights to resist the beast inside.<br><br>The night will decide your fate.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Use the pewter box's magic to banish the pack", next: "banishPack" },
        b: { text: "Howl with the pack to calm them down", next: "howlPack" },
      }
    },
    // Banish pack - Good ending
    banishPack: {
      title: "Banish the Pack",
      text: `You raise the pewter box high. A brilliant light shines forth, and the werewolves yelp and scatter, disappearing as dawn breaks. Todd smiles, free from the curse.<br><br>Your bravery saved WoodsWorld.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Hero of WoodsWorld</span><br>You defeated the werewolves and restored peace.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Howl with the pack - ambiguous ending
    howlPack: {
      title: "Howling with the Pack",
      text: `You let out a howl that echoes through the woods. The pack quiets, joining you in a mournful song. Todd howls with you, but the sunrise feels distant. Are you trapped in the woods forever?<br><br><span class="text-yellow-400">🤔 ENDING ACHIEVED: The Howling Prison</span><br>You live with the pack but lose your freedom.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Lost forest node (from flood cave)
    lostForest: {
      title: "Lost in the Forest",
      text: `You wander through the thick woods, unsure of which direction to turn. The shadows seem to swallow you whole. Suddenly, you hear footsteps behind you and a pack of werewolves close in.<br><br><span class="text-red-400">Your adventure ends here.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to fight", next: "finalFightLost" },
        b: { text: "Run blindly", next: "finalRunLost" },
      }
    },
    // Final fight lost (bad)
    finalFightLost: {
      title: "Final Fight",
      text: `You bravely fight but the pack is too strong. The last thing you see is the glowing eyes of the leader.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Werewolves' Prey</span><br>Your courage was not enough.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Final run lost (bad)
    finalRunLost: {
      title: "Running Until Darkness",
      text: `You sprint blindly through the woods, branches tearing at your clothes and face. Eventually, your legs give out and the pack overtakes you.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Endless Chase</span><br>You never escape the forest.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    // Missing nodes that are referenced but not defined
    grabBoxRun: {
      title: "Grabbing the Box and Running",
      text: `You snatch the glowing pewter box and bolt for the door. Todd follows, still partially transformed. The Murphy brothers shout behind you as you dash into the night.<br><br>The box pulses with mysterious energy in your hands.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Head to the campfire for safety", next: "campfire" },
        b: { text: "Find a hiding spot in the woods", next: "woodsHide" },
      }
    },
    toddExplain: {
      title: "Todd's Explanation",
      text: `Todd, still shaking from his transformation, explains that the pewter figurines are cursed. They turn anyone who touches them into werewolves at night. The Murphy brothers didn't know what they were stealing.<br><br>"We need to break the curse before dawn," Todd whispers urgently.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to destroy the box", next: "destroyBox" },
        b: { text: "Find a way to reverse the curse", next: "reverseCurse" },
      }
    },
    runPastTroll: {
      title: "Running Past the Troll",
      text: `You sprint past the surprised troll, but he swipes at you with a massive arm. You dodge and keep running, but now you're lost deeper in the woods with an angry troll behind you.<br><br><span class="text-red-400">The chase is on!</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Climb a tree to escape", next: "treeEscape" },
        b: { text: "Keep running toward the lake", next: "lakeEscape" },
      }
    },
    aloneForest: {
      title: "Alone in the Forest",
      text: `You decline the troll's help and venture deeper into the woods alone. The shadows seem to close in around you, and every sound makes you jump. You're truly on your own now.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Search for Todd methodically", next: "hiddenPath" },
        b: { text: "Return to the campfire", next: "campfire" },
      }
    },
    treeEscape: {
      title: "Tree Escape",
      text: `You scramble up a tall oak tree just as the werewolves reach the base. They circle below, howling in frustration. From your perch, you can see the entire camp and spot Todd near the lake.<br><br><span class="text-green-400">You have a bird's eye view of the situation.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Wait until dawn in the tree", next: "waitDawn" },
        b: { text: "Try to signal Todd from the tree", next: "signalTodd" },
      }
    },
    lakeSearch: {
      title: "Lake Shore Search",
      text: `You and Lauren search along the misty lake shore. The water is eerily calm, but you notice strange ripples and what looks like a cave entrance partially submerged near the far shore.<br><br><span class="text-purple-400">Something lurks beneath the surface.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Investigate the underwater cave", next: "underwaterCave" },
        b: { text: "Stay on shore and call for Todd", next: "callTodd" },
      }
    },
    destroyBox: {
      title: "Destroying the Box",
      text: `You raise the pewter box high and smash it against a rock. It shatters with a brilliant flash of light, and you feel the curse lifting. Todd transforms back to human form permanently.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Curse Breaker</span><br>You destroyed the cursed box and saved everyone.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    reverseCurse: {
      title: "Reversing the Curse",
      text: `You and Todd work together to find a way to reverse the curse. Through trial and error, you discover that speaking the names of each figurine while holding them breaks their individual curses.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Curse Reverser</span><br>You found a way to control the curse's power.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    waitDawn: {
      title: "Waiting for Dawn",
      text: `You wait in the tree as the night slowly passes. As the first rays of sunlight break through the trees, the werewolves transform back into confused campers and wander away. You climb down safely.<br><br><span class="text-yellow-400">🤔 ENDING ACHIEVED: The Patient Survivor</span><br>You survived by waiting, but the mystery remains unsolved.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    signalTodd: {
      title: "Signaling Todd",
      text: `You wave and shout from the tree. Todd sees you and runs toward your location, but the werewolves follow. In the chaos, Todd manages to throw you the pewter box before being surrounded.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Use the box to help Todd", next: "helpToddWithBox" },
        b: { text: "Keep the box safe and escape", next: "escapeWithBox" },
      }
    },
    underwaterCave: {
      title: "Underwater Cave",
      text: `You dive into the cold lake water and swim toward the cave. Inside, you find an ancient chamber filled with more pewter figurines and realize this is the source of the curse.<br><br><span class="text-red-400">The lake monster guards this place.</span><br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to destroy all the figurines", next: "destroyAllFigurines" },
        b: { text: "Escape before the monster finds you", next: "escapeMonster" },
      }
    },
    callTodd: {
      title: "Calling for Todd",
      text: `You and Lauren call Todd's name across the lake. His voice echoes back from somewhere in the mist, but it sounds different - more like a howl than human speech.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Follow the sound into the mist", next: "followSound" },
        b: { text: "Wait for Todd to come to you", next: "waitForTodd" },
      }
    },
    helpToddWithBox: {
      title: "Helping Todd with the Box",
      text: `You hold up the pewter box and it glows brightly, causing the werewolves to back away from Todd. Together, you manage to escape to safety.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Loyal Friend</span><br>Your friendship with Todd saved the day.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    escapeWithBox: {
      title: "Escaping with the Box",
      text: `You climb down from the tree and run away with the box, leaving Todd behind. You escape WoodsWorld, but the guilt of abandoning your friend haunts you forever.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Selfish Survivor</span><br>You survived, but at what cost?<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    destroyAllFigurines: {
      title: "Destroying All Figurines",
      text: `You smash all the pewter figurines in the underwater cave. The lake monster roars in fury, but as the last figurine breaks, a brilliant light fills the cave and the monster dissolves. The curse is broken forever.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Ultimate Hero</span><br>You destroyed the source of all curses at WoodsWorld.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    escapeMonster: {
      title: "Escaping the Monster",
      text: `You swim frantically toward the surface as the lake monster pursues you. You barely make it to shore, gasping and exhausted, but alive.<br><br><span class="text-yellow-400">🤔 ENDING ACHIEVED: The Narrow Escape</span><br>You escaped the monster but the curse remains.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    followSound: {
      title: "Following the Sound",
      text: `You and Lauren venture into the mist following Todd's howls. You find him partially transformed, struggling to maintain his humanity. The mist seems to be making the curse stronger.<br><br><span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to lead Todd out of the mist", next: "leadToddOut" },
        b: { text: "Stay with Todd and fight the curse together", next: "fightCurseTogether" },
      }
    },
    waitForTodd: {
      title: "Waiting for Todd",
      text: `You and Lauren wait by the lake shore, but Todd never comes. As dawn approaches, you realize he may be lost to the curse forever.<br><br><span class="text-red-400">😱 ENDING ACHIEVED: The Lost Friend</span><br>Sometimes waiting isn't enough.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    leadToddOut: {
      title: "Leading Todd Out",
      text: `You grab Todd's hand and pull him away from the mist. As you reach clearer air, his transformation begins to reverse. Your quick thinking saved him.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Guiding Light</span><br>You led your friend to safety.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    },
    fightCurseTogether: {
      title: "Fighting the Curse Together",
      text: `You and Lauren stay with Todd, holding his hands as he fights the transformation. Your combined willpower helps him resist the curse, and together you all make it through the night.<br><br><span class="text-green-400">🎉 ENDING ACHIEVED: The Power of Friendship</span><br>Together, you overcame the darkness.<br>Type 'story reset' to try again, or 'story' to begin anew.`,
      choices: {}
    }
  }
};