import { Command, CommandResult } from '../../types';

export const playlist: Command = {
  name: 'playlist',
  description: 'Show coding playlist',
  category: 'info',
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
};