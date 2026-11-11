# Agora Travel Booking Assistant Demo

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md)

A travel planning voice AI demo built with Agora and Next.js. Discuss a Bar Harbor or Acadia trip, compare fictional hotels, and walk through a simulated hotel booking.

**[Explore more voice AI demos on Agora Recipes →](https://recipes.agora.io/)**

[![Agora](https://img.shields.io/badge/Voice_AI-Agora-099DFD)](https://www.agora.io/en/products/conversational-ai-engine/)
[![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/docs)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Features](#features) · [Tech stack](#tech-stack) · [Run locally](#run-locally) · [Deploy to Vercel](#deploy-to-vercel) · [How it works](#how-it-works) · [Customize](#customize) · [FAQ](#faq) · [More](#more)

<!-- Recipes URL: add the published Agora Recipes page URL here. -->
<!-- Video placement: add a linked cover image here once the actual demo video is ready. Show a traveler discussing Bar Harbor airport options, comparing two fictional hotels, and reviewing a simulated stay. Use a descriptive alt and public video URL. Verify playback or fallback links on GitHub and Recipes. -->

<a id="what-you-can-do"></a>

## Features

- **Destination planning:** discuss dates, party needs, budget, and preferences for a Bar Harbor / Acadia trip.
- **Airport options:** compare BHB, BGR, and PWM for getting to Bar Harbor and Acadia.
- **Hotel comparisons:** explore configured fictional properties, room arrangements, locations, and example rates.
- **Simulated booking:** review a stay recap and example total, then confirm or revise the conversational plan.
- **Voice and transcript:** follow trip-planning questions and responses in audio and text.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript.
- **Voice AI:** Agora Conversational AI, Agents SDK, RTC and RTM.
- **Models:** Deepgram STT, OpenAI LLM, MiniMax TTS.

<a id="quick-start"></a>
<a id="run-it"></a>
<a id="try-it"></a>
<a id="conversation"></a>

## Getting Started

### Run Locally

You need Node.js 24, pnpm 9.15.9, and an [Agora project](https://console.agora.io/) with Conversational AI enabled.

**1. Install and configure**

Clone or download this repository, then open a terminal in its directory.

```bash
pnpm install --frozen-lockfile

if [ ! -f .env.local ]; then
  cp env.local.example .env.local
fi
```

Create or select a project in [Agora Console](https://console.agora.io/). Open **Manage credentials** and copy its **App ID** and **Primary certificate** into `.env.local` ([instructions](https://docs.agora.io/en/introduction/console-setup)):

```dotenv
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
NEXT_AGORA_APP_CERTIFICATE=your_agora_app_certificate
```

You don’t need separate API keys for the default speech and language models. Put the App Certificate in `.env.local` and never expose it in browser code.

See [env.local.example](env.local.example) for the configuration template.

**2. Start the app**

```bash
pnpm run doctor
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000), choose **Review travel plans**, and allow microphone access. Ask the assistant to summarize the conversation if needed, then click the hang-up button (**End session**).

<a id="deployment"></a>

### Deploy to Vercel

[![Import into Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAgoraIO-Community%2Fagora-travel-booking-assistant-demo&env=NEXT_PUBLIC_AGORA_APP_ID%2CNEXT_AGORA_APP_CERTIFICATE&envDescription=Agora%20App%20ID%20and%20App%20Certificate%20from%20Agora%20Console.%20Enable%20Conversational%20AI%20for%20the%20project.&envLink=https%3A%2F%2Fdocs.agora.io%2Fen%2Fintroduction%2Fconsole-setup&project-name=agora-travel-booking-assistant-demo&repository-name=agora-travel-booking-assistant-demo)

1. Click the button to clone this repository into your Git account and import it into Vercel.
2. Select **Next.js** and Node.js 24.
3. Add `NEXT_PUBLIC_AGORA_APP_ID` and `NEXT_AGORA_APP_CERTIFICATE` under **Environment Variables**, then deploy.

## How It Works

1. **Start a conversation:** Choose **Review travel plans** and allow microphone access.
2. **Describe your trip:** Share your dates, party, and preferences for Bar Harbor or Acadia.
3. **Compare options:** Discuss airports and the example hotels.
4. **Review the plan:** Confirm or revise a simulated hotel stay after reviewing its dates and price.

### Architecture

```mermaid
flowchart TB
  Browser[Browser voice workspace] <-->|Audio over RTC| Agent[Agora voice AI Agent]
  Agent -->|Transcript and events over RTM| Browser
  Browser -->|Start and stop requests| Server[Next.js server]
  Server -->|RTC and RTM tokens| Browser
  Server -->|Start and stop| Agent
  Reference[Bundled scenario reference] -->|Prompt context| Server
```

Next.js issues browser tokens and supplies the scenario instructions when starting the Agora Agent. Conversation behavior is prompt-driven; no live business system is connected. See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

<a id="faq-and-limitations"></a>

## FAQ

### Do I need flight or hotel APIs to run this demo?

No. The demo includes airport reference material and example hotels for simulated bookings.

### What can I ask the assistant?

Describe your destination, dates, party, and budget. Try “Help me plan a family trip to Bar Harbor and Acadia,” then ask it to compare airport options or the example hotels. You can revise the plan before confirming a simulated stay.

### Why does the booking example only cover Bar Harbor and Acadia?

Those are the destinations covered by the bundled hotel data. Other destinations receive general planning guidance. To demonstrate another destination, replace the hotel and airport reference material; real searches and reservations require a travel-provider integration.

### Why can’t I start a voice session?

Check browser microphone permission, the selected input device, and your Agora App ID, App Certificate, and Conversational AI access. Use localhost or HTTPS. Run `pnpm run doctor` for local configuration checks, then use the page’s error message to guide a retry.

### Can I save a copy of the conversation?

Yes. Open Inspector and select **Export session evidence** to download the current or latest call as JSON. Export it before starting another call or refreshing the page.

<a id="customize"></a>

### How do I make this demo more realistic?

Connect your own knowledge base and business services using [RAG](https://docs.agora.io/en/ai/build/custom-model-integration/custom-llm), [tool calling](https://docs.agora.io/en/ai/build/tools/custom-tools), or [MCP](https://docs.agora.io/en/ai/build/tools/mcp-tools). When adding tools, set `advancedFeatures.enable_tools` to `true` in [Agent setup](app/api/invite-agent/route.ts).

### How do I adapt this demo to my own use case?

Customize the agent’s prompt, business tools, and interface for your scenario.

## License and Attribution

Licensed under the [MIT License](LICENSE). Retain the [third-party notices](THIRD_PARTY_NOTICES.md).

## More

- **[Recipes](https://recipes.agora.io/):** Explore more Agora demos and integrations.
- **[Docs](https://docs.agora.io/en/ai):** Learn how to build and extend voice agents.
- **[Console](https://console.agora.io/):** Create projects and manage credentials and usage.
