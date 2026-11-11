import type { ScenarioPresentation } from '@/types/presentation';
export type { ScenarioPresentation } from '@/types/presentation';

export const presentation: ScenarioPresentation = {
  "id": "03-travel-booking",
  "name": "Travel Booking Assistant",
  "purpose": "Trip planning and simulated hotel booking",
  "summary": "Plan a Bar Harbor or Acadia trip, compare fictional hotels and confirm a simulated stay.",
  "featuresHeading": "In this conversation",
  "features": [
    {
      "emoji": "💬",
      "title": "Airport & destination guidance"
    },
    {
      "emoji": "🎙️",
      "title": "Two fictional hotels to compare"
    },
    {
      "emoji": "📝",
      "title": "Simulated hotel booking"
    }
  ],
  "builtWith": [
    "Agora Conversational AI",
    "Agents SDK",
    "Next.js"
  ],
  "startLabel": "Review travel plans",
  "boundaryShort": "Simulation only. No real hotel or flight booking, payment, email or saved order.",
  "outcomes": [
    {
      "id": "helpful",
      "label": "The conversation helped"
    },
    {
      "id": "needs-guidance",
      "label": "I need more guidance"
    }
  ],
  "developer": {
    "sourceUrl": "https://github.com/AgoraIO-Community/agora-travel-booking-assistant-demo",
    "runCommand": "pnpm install --frozen-lockfile\npnpm run doctor\npnpm run dev",
    "skillsCommand": "npx skills add github:AgoraIO/skills",
    "assistantPrompt": "Work in this existing Travel Booking Assistant voice demo. Preserve RTC/RTM and the phase-one conversation-only boundary. Use configured fictional references and explicitly labeled current-conversation simulations where supported. Keep tools disabled, results unsaved and real business actions unavailable. Keep entry copy, FAQ and prompt behavior aligned.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://www.npmjs.com/package/agora-agents",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
    "skillsUrl": "https://github.com/AgoraIO/skills",
    "extensionPoints": [
      {
        "title": "Change the conversation",
        "path": "lib/agent-config.ts"
      },
      {
        "title": "Choose models and voice",
        "path": "lib/runtime-profile.ts"
      },
      {
        "title": "Adapt scenario UI copy",
        "path": "lib/presentation.ts"
      }
    ]
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
