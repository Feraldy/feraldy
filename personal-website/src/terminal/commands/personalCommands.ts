import { Command, CommandResult } from '../types';

export const personalCommands: Command[] = [
  {
    name: 'coffee-order',
    description: 'Order your favorite coffee',
    category: 'fun',
    usage: 'coffee-order [type]',
    examples: ['coffee-order', 'coffee-order espresso', 'coffee-order latte'],
    execute: (args: string[]): CommandResult => {
      const coffeeTypes = {
        'espresso': { price: '$2.50', description: 'Strong and bold, perfect for debugging sessions' },
        'latte': { price: '$4.25', description: 'Smooth and creamy, ideal for long coding marathons' },
        'americano': { price: '$3.00', description: 'Clean and simple, like well-written code' },
        'cappuccino': { price: '$3.75', description: 'Balanced and frothy, great for morning standups' },
        'macchiato': { price: '$4.50', description: 'Sweet with a kick, perfect for afternoon energy' },
        'cold-brew': { price: '$3.50', description: 'Smooth and refreshing, ideal for hot coding days' }
      };

      const orderType = args[0]?.toLowerCase() || 'surprise';
      
      if (orderType === 'surprise' || !coffeeTypes[orderType as keyof typeof coffeeTypes]) {
        const randomCoffee = Object.keys(coffeeTypes)[Math.floor(Math.random() * Object.keys(coffeeTypes).length)];
        const coffee = coffeeTypes[randomCoffee as keyof typeof coffeeTypes];
        
        return {
          output: `☕ <span class="text-yellow-400">Feraldy's Coffee Corner</span>

<span class="text-green-400">Barista's Choice: ${randomCoffee.charAt(0).toUpperCase() + randomCoffee.slice(1)}</span>
${coffee.description}
Price: <span class="text-yellow-400">${coffee.price}</span>

<span class="text-cyan-400">☕ Brewing your ${randomCoffee}...</span>
<span class="text-gray-400">████████████</span> 100%

<span class="text-green-400">✅ Order ready!</span>

<span class="text-purple-400">Fun Fact:</span> I consume ~4.7 cups per day while coding!
<span class="text-gray-400">Try: coffee-order [espresso|latte|americano|cappuccino|macchiato|cold-brew]</span>`
        };
      } else {
        const coffee = coffeeTypes[orderType as keyof typeof coffeeTypes];
        return {
          output: `☕ <span class="text-yellow-400">Feraldy's Coffee Corner</span>

<span class="text-green-400">Order: ${orderType.charAt(0).toUpperCase() + orderType.slice(1)}</span>
${coffee.description}
Price: <span class="text-yellow-400">${coffee.price}</span>

<span class="text-cyan-400">☕ Brewing your ${orderType}...</span>
<span class="text-gray-400">████████████</span> 100%

<span class="text-green-400">✅ Perfect ${orderType} ready!</span>

<span class="text-blue-400">Brewing Tips:</span>
• Water temperature: 195-205°F
• Grind: ${orderType === 'espresso' ? 'Fine' : orderType === 'cold-brew' ? 'Coarse' : 'Medium'}
• Extraction time: ${orderType === 'espresso' ? '25-30s' : orderType === 'cold-brew' ? '12-24h' : '4-6min'}`
        };
      }
    }
  },
  {
    name: 'playlist',
    description: 'Show coding playlist',
    category: 'fun',
    usage: 'playlist [mood]',
    examples: ['playlist', 'playlist focus', 'playlist chill'],
    execute: (args: string[]): CommandResult => {
      const mood = args[0]?.toLowerCase() || 'focus';
      
      const playlists = {
        focus: [
          "🎵 Lofi Hip Hop Radio - beats to relax/study to",
          "🎵 Synthwave - Neon Nights Programming",
          "🎵 Ambient Coding - Deep Focus",
          "🎵 Chillstep Mix - Productive Vibes",
          "🎵 Post-Rock Instrumental - Epic Coding"
        ],
        chill: [
          "🎵 Indie Folk - Acoustic Coding Sessions",
          "🎵 Jazz Café - Smooth Development",
          "🎵 Bossa Nova - Relaxed Programming",
          "🎵 Downtempo Electronic - Chill Vibes",
          "🎵 Neo-Soul - Creative Flow"
        ],
        energy: [
          "🎵 Drum & Bass - High Energy Coding",
          "🎵 Progressive House - Motivation Mix",
          "🎵 Synthwave - Cyberpunk Programming",
          "🎵 Electronic Rock - Power Coding",
          "🎵 Upbeat Indie - Morning Energy"
        ],
        debug: [
          "🎵 Dark Ambient - Deep Debugging",
          "🎵 Minimal Techno - Problem Solving",
          "🎵 Classical Piano - Calm Analysis",
          "🎵 Drone Music - Focused Investigation",
          "🎵 Meditation Sounds - Bug Hunt Zen"
        ]
      };

      const currentPlaylist = playlists[mood as keyof typeof playlists] || playlists.focus;
      const nowPlaying = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];

      return {
        output: `🎧 <span class="text-purple-400">Feraldy's Coding Playlist - ${mood.toUpperCase()} Mode</span>

<span class="text-green-400">♪ Now Playing:</span>
${nowPlaying}

<span class="text-yellow-400">📀 ${mood.charAt(0).toUpperCase() + mood.slice(1)} Playlist:</span>
${currentPlaylist.map((song, i) => `${i + 1}. ${song}`).join('\n')}

<span class="text-cyan-400">🎼 Music Stats:</span>
• Total playlists: 4 moods
• Favorite genre: Lo-fi Hip Hop
• Coding hours with music: ~8 hours/day
• Preferred volume: 60-70%

<span class="text-blue-400">💡 Pro Tip:</span> Instrumental music helps maintain focus while coding!
<span class="text-gray-400">Try: playlist [focus|chill|energy|debug]</span>`
      };
    }
  },
  {
    name: 'bucket-list',
    description: 'Show personal and professional goals',
    category: 'info',
    usage: 'bucket-list [category]',
    examples: ['bucket-list', 'bucket-list tech', 'bucket-list personal'],
    execute: (args: string[]): CommandResult => {
      const category = args[0]?.toLowerCase() || 'all';
      
      const goals = {
        tech: [
          { item: "Contribute to a major open-source project", status: "🔄 In Progress", priority: "High" },
          { item: "Build a SaaS product from scratch", status: "📋 Planned", priority: "High" },
          { item: "Master Kubernetes and DevOps", status: "📚 Learning", priority: "Medium" },
          { item: "Speak at a tech conference", status: "🎯 Goal", priority: "Medium" },
          { item: "Create a popular npm package", status: "💡 Idea", priority: "Low" },
          { item: "Learn Rust programming language", status: "📚 Learning", priority: "Medium" }
        ],
        personal: [
          { item: "Travel to Japan for tech culture", status: "💰 Saving", priority: "High" },
          { item: "Learn photography professionally", status: "📸 Practicing", priority: "Medium" },
          { item: "Run a half marathon", status: "🏃 Training", priority: "Medium" },
          { item: "Learn to play guitar", status: "🎸 Beginner", priority: "Low" },
          { item: "Write a technical blog series", status: "✍️ Writing", priority: "High" },
          { item: "Build a home coffee roasting setup", status: "☕ Researching", priority: "Low" }
        ],
        career: [
          { item: "Lead a QA team of 10+ engineers", status: "👥 Growing", priority: "High" },
          { item: "Implement AI-powered testing tools", status: "🤖 Exploring", priority: "High" },
          { item: "Get AWS Solutions Architect cert", status: "📖 Studying", priority: "Medium" },
          { item: "Mentor junior developers", status: "✅ Doing", priority: "High" },
          { item: "Start a tech consultancy", status: "💼 Planning", priority: "Medium" },
          { item: "Write a book on QA automation", status: "📝 Outlining", priority: "Low" }
        ]
      };

      if (category === 'all') {
        const allGoals = [...goals.tech, ...goals.personal, ...goals.career];
        const completed = allGoals.filter(g => g.status.includes('✅')).length;
        const inProgress = allGoals.filter(g => g.status.includes('🔄') || g.status.includes('📚') || g.status.includes('🏃')).length;
        
        return {
          output: `🎯 <span class="text-yellow-400">Feraldy's Bucket List</span>

<span class="text-green-400">📊 Progress Overview:</span>
• Total goals: ${allGoals.length}
• Completed: ${completed}
• In progress: ${inProgress}
• Completion rate: ${Math.round((completed / allGoals.length) * 100)}%

<span class="text-cyan-400">🚀 High Priority Goals:</span>
${allGoals.filter(g => g.priority === "High").slice(0, 5).map(g => `• ${g.item} ${g.status}`).join('\n')}

<span class="text-blue-400">💡 Recent Updates:</span>
• Started learning Kubernetes fundamentals
• Began writing technical blog series
• Actively mentoring 2 junior developers

<span class="text-purple-400">🎨 Life Philosophy:</span>
"Continuous learning, meaningful impact, and balanced growth"

<span class="text-gray-400">Try: bucket-list [tech|personal|career] for specific categories</span>`
        };
      } else {
        const categoryGoals = goals[category as keyof typeof goals];
        if (!categoryGoals) {
          return { output: 'Invalid category. Try: tech, personal, or career' };
        }

        return {
          output: `🎯 <span class="text-yellow-400">${category.toUpperCase()} Bucket List</span>

${categoryGoals.map((goal, i) => 
  `<span class="text-cyan-400">${i + 1}. ${goal.item}</span>
   Status: ${goal.status} | Priority: <span class="text-${goal.priority === 'High' ? 'red' : goal.priority === 'Medium' ? 'yellow' : 'green'}-400">${goal.priority}</span>`
).join('\n\n')}`
        };
      }
    }
  }
];