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
    "assistantPrompt": "Help me create and run the Travel Booking Assistant using Agora CLI.\n\nCheck that Agora CLI is installed and ready. If installation or an upgrade is needed, ask before proceeding. Guide me through browser login when required.\n\nGet the recipe details:\nagora recipes show agora-travel-booking-assistant-demo --json\n\nRead its implementation guide:\nhttps://raw.githubusercontent.com/AgoraIO-Community/agora-travel-booking-assistant-demo/main/RECIPE.md\n\nReference source:\nhttps://github.com/AgoraIO-Community/agora-travel-booking-assistant-demo\n\nBefore initialization, confirm which Agora project to use. Ask before creating a new Agora project.\n\nInitialize the app in a new or empty directory. Replace <confirmed-project-id> with the actual ID of the project confirmed above before running:\nagora init my-travel-app --recipe agora-travel-booking-assistant-demo --project <confirmed-project-id> --json\n\nLet the CLI configure the credentials. Never print the App Certificate in chat or expose it in browser code.\n\nFollow the returned nextSteps to install dependencies and start the app. Help diagnose and resolve any errors.\n\nProvide the local URL and guide me through microphone access. Help me test this request:\n\"Help me discuss a ride to the airport tomorrow morning.\"\n\nReport what was verified and what still needs testing. Follow the capabilities and limits in the implementation guide; do not claim external actions were completed without verification.",
    "docsUrl": "https://docs.agora.io/en/ai/build/build-server-client",
    "sdkUrl": "https://github.com/AgoraIO/agora-agents-ts",
    "consoleUrl": "https://console.agora.io/",
    "cliUrl": "https://github.com/AgoraIO/cli",
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
    ],
    "createCommand": "npx agora-travel-booking-assistant-demo@latest my-travel-app\ncd my-travel-app",
    "testRequest": "Help me discuss a ride to the airport tomorrow morning."
  }
};

export function getScenarioPresentation(): ScenarioPresentation { return presentation; }
