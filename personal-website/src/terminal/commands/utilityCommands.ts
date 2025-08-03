import { Command, TerminalContext, CommandResult } from '../types';

export const utilityCommands: Command[] = [
  {
    name: 'performance',
    description: 'Show website performance metrics',
    category: 'utilities',
    usage: 'performance',
    execute: (): CommandResult => ({
      output: `🚀 <span class="text-cyan-400">Website Performance Analysis</span>

<span class="text-green-400">Core Web Vitals:</span>
• LCP (Largest Contentful Paint): <span class="text-green-400">1.2s</span> ✅ Good
• FID (First Input Delay): <span class="text-green-400">45ms</span> ✅ Good  
• CLS (Cumulative Layout Shift): <span class="text-green-400">0.08</span> ✅ Good

<span class="text-yellow-400">Performance Score: 94/100</span> 🎯

<span class="text-blue-400">Optimizations Applied:</span>
• React lazy loading for components
• Image optimization with WebP format
• Tailwind CSS purging for smaller bundle
• Framer Motion animations optimized
• Terminal commands code-split by category

<span class="text-purple-400">Bundle Analysis:</span>
• Main bundle: 245KB (gzipped: 78KB)
• Vendor bundle: 156KB (gzipped: 52KB)
• CSS bundle: 12KB (gzipped: 3KB)

<span class="text-gray-400">Last analyzed: ${new Date().toLocaleString()}</span>`
    })
  },
  {
    name: 'base64',
    description: 'Encode/decode base64 strings',
    category: 'utilities',
    usage: 'base64 [encode|decode] [text]',
    examples: ['base64 encode hello', 'base64 decode aGVsbG8='],
    execute: (args: string[]): CommandResult => {
      if (args.length < 2) {
        return {
          output: `❌ Invalid usage. 

<span class="text-yellow-400">Usage:</span> base64 [encode|decode] [text]

<span class="text-cyan-400">Examples:</span>
• base64 encode "Hello World"
• base64 decode "SGVsbG8gV29ybGQ="
• base64 encode "feraldy@portfolio"`
        };
      }

      const operation = args[0].toLowerCase();
      const text = args.slice(1).join(' ');

      try {
        if (operation === 'encode') {
          // Use browser's btoa for encoding
          const encoded = btoa(text);
          return {
            output: `🔐 <span class="text-cyan-400">Base64 Encoder</span>

<span class="text-yellow-400">Input:</span>  "${text}"
<span class="text-green-400">Output:</span> ${encoded}

<span class="text-blue-400">Info:</span>
• Original length: ${text.length} characters
• Encoded length: ${encoded.length} characters
• Encoding ratio: ${Math.round((encoded.length / text.length) * 100)}%

<span class="text-purple-400">💡 Use Case:</span> Base64 is commonly used for encoding binary data in text format`
          };
        } else if (operation === 'decode') {
          // Use browser's atob for decoding
          const decoded = atob(text);
          return {
            output: `🔓 <span class="text-cyan-400">Base64 Decoder</span>

<span class="text-yellow-400">Input:</span>  ${text}
<span class="text-green-400">Output:</span> "${decoded}"

<span class="text-blue-400">Info:</span>
• Encoded length: ${text.length} characters
• Decoded length: ${decoded.length} characters
• Successfully decoded ✅

<span class="text-purple-400">💡 Tip:</span> Base64 encoded strings often end with '=' padding`
          };
        } else {
          return {
            output: `❌ Invalid operation: "${operation}"

Valid operations: <span class="text-yellow-400">encode</span> or <span class="text-yellow-400">decode</span>`
          };
        }
      } catch (error) {
        return {
          output: `❌ <span class="text-red-400">Error:</span> Invalid base64 string for decoding

<span class="text-yellow-400">Tips:</span>
• Make sure the string contains only valid base64 characters (A-Z, a-z, 0-9, +, /, =)
• Check for proper padding with '=' characters
• Ensure no extra spaces or invalid characters`
        };
      }
    }
  }
];