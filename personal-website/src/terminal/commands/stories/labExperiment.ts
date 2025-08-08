import { Story } from './index';

export const labExperimentStory: Story = {
  id: "dr-eeek-lab-experiment",
  title: "🧪 The Experiment Lab of Dr. Eeek",
  description: "You and your friend Sam embark on a chilling adventure inside Dr. Eeek's mysterious lab in a skyscraper. Strange experiments, dangerous creatures, and unexpected twists await you.",
  theme: "Goosebumps-style choose your own adventure with suspense, humor, and scary thrills",
  startNode: "intro_waiting_room",
  nodes: {
    "intro_waiting_room": {
      title: "🏢 Waiting in the Lab Lobby",
      text: `<span class="text-green-400">You and your friend Sam</span> sit nervously in the glossy waiting room at the top of the skyscraper. Outside the big glass windows, you see the city stretching far below, but your eyes keep drifting to the steel door marked <span class="text-red-400">"Dr. Eeek's Lab."</span>

The secretary, a pale woman with sharp eyes, stands up and leaves suddenly, muttering about an urgent call. Your mother, who works here, hasn't come back yet. The silence is thick with anticipation.

Seafoam-green lights flicker slowly from panels in the ceiling, casting eerie shadows. Sam shivers, <span class="text-yellow-400">"Maybe we should look for Mom,"</span> they whisper. You nod, heart pounding.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Wait patiently for Mom", next: "accept_offer" },
        b: { text: "Look for Mom around the lab", next: "find_mom_lab" },
      }
    },

    "find_mom_lab": {
      title: "🔍 Searching for Mom",
      text: `You and Sam venture deeper into the lab complex, following sterile white corridors lined with mysterious doors. The air smells of chemicals and something else... something alive.

As you turn a corner, you hear your mother's voice coming from behind a door marked <span class="text-purple-400">"Observation Deck."</span> But there's also the sound of Dr. Eeek's maniacal laughter echoing from the main lab.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Go to the Observation Deck", next: "find_mom_safe" },
        b: { text: "Investigate Dr. Eeek's laughter", next: "accept_offer" },
      }
    },

    "find_mom_safe": {
      title: "👩 Reunion with Mom",
      text: `You find your mother safe in the observation deck, monitoring some experiments through thick glass windows. She's relieved to see you but warns that Dr. Eeek has been acting strangely today.

<span class="text-green-400">"We need to leave immediately,"</span> she whispers urgently. <span class="text-red-400">"His experiments are getting out of control."</span>

Just then, alarms start blaring throughout the facility. Red lights flash as an automated voice announces: <span class="text-red-400">"CONTAINMENT BREACH. ALL PERSONNEL EVACUATE."</span>

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Evacuate immediately with Mom", next: "safe_escape" },
        b: { text: "Help rescue other people first", next: "heroic_rescue" },
      }
    },

    // STORY A branch begins here
    "accept_offer": {
      title: "🥽 Dr. Eeek's Proposition",
      text: `The door to the lab swings open suddenly, revealing a hunched figure with wild hair and thick goggles. <span class="text-purple-400">"I'm Dr. Eeek,"</span> he chuckles nervously. <span class="text-gray-400">"Or Herbert Wimplemeyer... but Eeek sounds cooler."</span>

He offers you money to help with some experiments in the lab. <span class="text-red-400">"Not too dangerous... or so I like to say,"</span> he grins. Sam seems curious, but you feel a knot in your stomach.

After some hesitation, you agree to join. But just before stepping into the lab, doubt creeps in. You wonder if you should actually do this... or back out and wait with Sam.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Bravely join the experiment", next: "sam_finishes_experiment" },
        b: { text: "Chicken out and wait with Sam", next: "reunite_with_sam" },
      }
    },

    "reunite_with_sam": {
      title: "🤝 Reuniting with Sam",
      text: `You decide not to go through with the experiment. A few minutes later, <span class="text-green-400">Sam returns, looking shaken but excited.</span> <span class="text-yellow-400">"It was insane! Dr. Eeek's lab is full of surprises."</span>

Suddenly, a door labeled <span class="text-red-400">"Canine Maze"</span> clangs open with a howl echoing from within. Dr. Eeek warns, <span class="text-purple-400">"Only the brave enter the maze. Filled with German Shepherds trained to protect... or attack."</span>

You grab Sam's hand. Together, you must decide if you'll face the maze or something else.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Enter the Canine Maze", next: "canine_maze_entrance" },
        b: { text: "Look for another way out", next: "hidden_lab_exit" },
      }
    },

    "sam_finishes_experiment": {
      title: "🧪 Sam's Experiment Completed",
      text: `While you chickened out, <span class="text-green-400">Sam bravely faced the Blob Experiment.</span> <span class="text-yellow-400">"It was a gooey nightmare,"</span> Sam shivers, <span class="text-yellow-400">"The blob kept growing and chasing me!"</span>

Just then, Dr. Eeek appears, smiling oddly. <span class="text-purple-400">"Ready for the next challenge?"</span> he asks, leading to the ominous <span class="text-red-400">"Canine Maze,"</span> where deadly German Shepherds await. You both stand before heavy metal gates, your heart pounding.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Face the maze together", next: "canine_maze_entrance" },
        b: { text: "Refuse and try to escape", next: "lab_escape_attempt" },
      }
    },

    "canine_maze_entrance": {
      title: "🐕 Entrance to the Canine Maze",
      text: `Lieutenant-sized German Shepherds growl fiercely behind metal fences. The maze ahead twists unpredictably. You and Sam grip your flashlights tightly.

Fog swirls on the tiled floor, and distant howls echo. One wrong step could mean becoming a dog's dinner. Yet, something glints faintly in the darkness—might be a key or an exit.

<span class="text-green-400">Choose carefully which path to take: left or right</span>.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Take the left path", next: "maze_left_path" },
        b: { text: "Take the right path", next: "maze_right_path" },
      }
    },

    "maze_left_path": {
      title: "⬅️ The Left Path in the Maze",
      text: `The left path leads you through narrow corridors where the barking intensifies. You see shadows flickering — German Shepherds prowling silently. Suddenly, you step on a hidden pressure tile, and metal gates begin to close behind you.

Panic sets in as the dogs close in. You and Sam sprint forward, trying to find a way out—but the maze twists endlessly. Your flashlight flickers dangerously.

<span class="text-red-400">Will you try to climb over the wall or hide in a narrow alcove?</span>

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Climb the wall", next: "climb_wall_end" },
        b: { text: "Hide in the alcove", next: "hide_alcove_end" },
      }
    },

    "maze_right_path": {
      title: "➡️ The Right Path in the Maze",
      text: `You take the right path, which is dark but seems quieter. After a few minutes, you find a glowing switch on the wall. Could it open an exit?

Suddenly, the half-human half-dog hybrid from the lab blocks your way, snarling. It looks conflicted but powerful. You might try to calm it with soothing words or quickly run past.

<span class="text-green-400">What do you do?</span>

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Calm the hybrid", next: "calm_hybrid_success" },
        b: { text: "Run past quickly", next: "run_past_hybrid_fail" },
      }
    },

    "calm_hybrid_success": {
      title: "🕊️ You Calm the Hybrid",
      text: `Amid the eerie quiet, you reach out gently, speaking softly. The hybrid's snarls slow and soften to whimpers. It steps aside, allowing you and Sam to pass.

You find an exit door behind it, leading out of the maze and into the lab's serene rooftop. Victory is sweet — you survived the Canine Maze!

<span class="text-green-400">You step into the sunlight, heart pounding but safe.</span>

<span class="text-green-400">🎉 ENDING ACHIEVED: The Maze Master</span>
<span class="text-yellow-400">You and Sam escaped the Canine Maze by calming the hybrid. A brave and clever victory.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "run_past_hybrid_fail": {
      title: "💨 Running Past the Hybrid",
      text: `You dash forward, heart pounding, but the hybrid is quick. It lunges, knocking you to the floor. You feel claws dig into your arm.

Lost in the maze forever, chased by something neither dog nor human... Your adventure ends here.

<span class="text-red-400">Trapped forever in Dr. Eeek's labyrinth.</span>

<span class="text-red-400">💀 FATE SEALED: Lost and Caught</span>
<span class="text-yellow-400">The hybrid caught you as you tried to run. Forever trapped in the maze's dark corridors.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "climb_wall_end": {
      title: "🧗 Climbing Trap Ends Badly",
      text: `You scramble up the slick wall, but the surface crumbles beneath your fingers. You fall hard and the dogs close in, barking ferociously.

Darkness swallows you as you lose consciousness. Your adventure ends in the dark, with only a faint howl to mark your fate.

<span class="text-red-400">Game Over: Caught by the dogs</span>

<span class="text-red-400">💀 FATE SEALED: Dog's Dinner</span>
<span class="text-yellow-400">You tried to escape but got caught by the dogs. Better luck next time!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "hide_alcove_end": {
      title: "🫥 Hiding in the Alcove",
      text: `You squeeze into the narrow alcove, holding your breath as dogs sprint past. Minutes stretch into eternity.

Eventually, the dogs leave and you manage to sneak out of the maze through a forgotten side door. You emerge bruised but alive, greeted by Sam's relieved face.

Sometimes, patience and caution win the day.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Survivor</span>
<span class="text-yellow-400">You survived the maze by hiding. Not glamorous, but it worked!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "hidden_lab_exit": {
      title: "🔍 Searching for Another Exit",
      text: `You decide the maze is too dangerous and look for secret ways out. Exploring darker hallways, you find a strange door guarded by a massive rat with unusually sharp eyes.

Behind it lies an experimental virtual reality machine humming softly. The rat eyes you suspiciously.

Do you attempt to befriend the rat or trigger the machine and escape into virtual reality?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Befriend the rat", next: "befriend_rat" },
        b: { text: "Trigger VR machine", next: "enter_vr" },
      }
    },

    "befriend_rat": {
      title: "🐀 Befriending the Rat",
      text: `You slowly extend a hand, speaking softly to the massive rat. To your surprise, it calms and even leads you to a hidden staircase.

You and Sam slink down to the subway-level basement, finding the emergency exit out of the skyscraper. Freedom!

You are safe, but with so many mysteries left behind.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Rat Whisperer</span>
<span class="text-yellow-400">You escaped thanks to befriending the giant rat. True courage and compassion.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "enter_vr": {
      title: "🥽 Virtual Reality Escape",
      text: `You trigger the machine, and suddenly your body feels weightless, dissolving in a swirl of pixels. The skyscraper fades, replaced by a digital universe of endless skies and impossible architecture.

But VR isn't safe either. Dr. Eeek's voice whispers, <span class="text-purple-400">"You can't leave until you win..."</span> Do you explore the pleasant landscape or look for glitches to hack out?

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Explore the landscape", next: "vr_peaceful" },
        b: { text: "Search for glitches", next: "vr_glitch_hack" },
      }
    },

    "vr_peaceful": {
      title: "🌸 Peaceful VR Path",
      text: `You float through virtual gardens and tranquil lakes, feeling an almost meditative peace. However, the world starts glitching—trees distort, and the sky cracks.

Suddenly, the pleasant VR shifts into a nightmare realm where you are trapped forever, a digital ghost lost.

<span class="text-red-400">Trapped in VR eternity.</span>

<span class="text-red-400">💀 FATE SEALED: Digital Prisoner</span>
<span class="text-yellow-400">You got lost in the virtual reality forever. The glitch swallowed you whole.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "vr_glitch_hack": {
      title: "💻 Hacking the VR Glitch",
      text: `You notice glitches in the floor that seem suspiciously like a weak spot. Using quick thinking, you manipulate the glitch, causing an emergency "escape portal" to open.

You and Sam rush through and find yourselves back in the lab lobby, just as the secretary returns. Freedom and a wild story in your pockets!

<span class="text-green-400">🎉 ENDING ACHIEVED: The Glitch Breaker</span>
<span class="text-yellow-400">You outsmarted the virtual trap and escaped the lab safely.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "lab_escape_attempt": {
      title: "🏃 Attempted Escape",
      text: `Heart pounding, you dash toward an emergency exit. Alarms blare, and the lab seals begin to drop. Sam joins you, shouting a warning about dogs loose in the maze.

You can attempt to outrun security or hide and plan a smarter escape.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Outrun security", next: "caught_by_security" },
        b: { text: "Hide and plan", next: "hide_and_plan" },
      }
    },

    "caught_by_security": {
      title: "👮 Caught by Security",
      text: `Running full speed, you slam into armed guards who quickly restrain you. Dr. Eeek appears, disappointed. <span class="text-purple-400">"You're not going anywhere,"</span> he says coldly.

You are locked in a dark cell, plotting your next move but trapped for now.

<span class="text-red-400">Capture ending.</span>

<span class="text-red-400">💀 FATE SEALED: Caught and Locked</span>
<span class="text-yellow-400">You tried to escape but got caught by security. Try again?</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "hide_and_plan": {
      title: "🫥 Hiding and Planning",
      text: `You duck behind lab machinery, heart beating wildly. Sam taps codes into a nearby keypad, unlocking a side exit.

You slip out quietly and find yourself in the basement where strange glowing experiments hum in tanks. Freedom might be close... or more danger lies ahead.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Explore the basement", next: "basement_exploration" },
        b: { text: "Try the side exit immediately", next: "side_exit" },
      }
    },

    "basement_exploration": {
      title: "🧬 Basement Experiments",
      text: `In the dim light, you see strange creatures in tanks: a chimpanzee with human-like eyes, a mysterious half-dog hybrid, and bubbling green substances that seem to move on their own.

The creatures seem to be watching you, their eyes following your every move. One tank has a crack in it, and whatever's inside is trying to break free.

<span class="text-cyan-400">What do you choose?</span>`,
      choices: {
        a: { text: "Try to free the creatures", next: "free_creatures" },
        b: { text: "Run before something breaks out", next: "side_exit" },
      }
    },

    "free_creatures": {
      title: "🔓 Freeing the Creatures",
      text: `You decide to help the trapped creatures. As you release the locks, they emerge grateful but confused. The chimpanzee nods intelligently and leads you to a secret elevator.

Together with your new allies, you escape the lab and expose Dr. Eeek's cruel experiments to the world. You become heroes!

<span class="text-green-400">🎉 ENDING ACHIEVED: The Liberator</span>
<span class="text-yellow-400">You freed the creatures and became a hero. Justice prevails!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "side_exit": {
      title: "🚪 The Side Exit",
      text: `You rush to the side exit, but it leads to a narrow fire escape on the outside of the skyscraper. The wind is fierce, and you're dozens of stories up.

Sam grabs your hand as you carefully make your way down the metal stairs. After what feels like hours, you reach the ground safely.

You're free, but you'll never forget the horrors you witnessed in Dr. Eeek's lab.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Escapist</span>
<span class="text-yellow-400">You escaped through the fire exit. Sometimes the simple way is best!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "safe_escape": {
      title: "👨‍👩‍👧‍👦 Safe Escape",
      text: `You, Sam, and your mother quickly evacuate the building using the emergency protocols. As you watch from the street, you see strange lights and hear roars coming from the upper floors.

Your mother explains that Dr. Eeek's experiments had gone too far, and she's been gathering evidence to shut him down. You're safe, and justice will be served.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Wise Choice</span>
<span class="text-yellow-400">You chose safety first and escaped with your family intact.</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    },

    "heroic_rescue": {
      title: "🦸 Heroic Rescue",
      text: `Despite the danger, you insist on helping rescue other people trapped in the lab. You and Sam become heroes, saving several scientists and even some of Dr. Eeek's experimental creatures.

The building is evacuated safely, and Dr. Eeek is arrested. You're celebrated as heroes who put others before themselves.

<span class="text-green-400">🎉 ENDING ACHIEVED: The Hero</span>
<span class="text-yellow-400">You risked everything to save others. True heroism!</span>

<span class="text-gray-400">Type 'story reset' to try again, or 'story' to begin anew.</span>`,
      choices: {}
    }
  }
};