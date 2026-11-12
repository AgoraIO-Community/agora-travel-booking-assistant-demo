'use client';

import { ChevronDown } from 'lucide-react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const questions = [
  {
    question: 'How long does a session last?',
    answer: 'Each session ends automatically after 10 minutes; choose Start again to continue.',
  },
  {
    "question": "How do I start a conversation?",
    "answer": "Choose Review travel plans and allow microphone access when your browser asks. Speak in English and describe what you need. You can mute the microphone or end the conversation with the voice controls."
  },
  {
    "question": "What should I say?",
    "answer": "Try: “We are two adults traveling to Acadia for two nights starting tomorrow. Compare a convenient hotel and a lower-priced option, then help us make a simulated booking.” You can also ask which airports to compare."
  },
  {
    "question": "Which hotels can I book in the demo?",
    "answer": "The configured fictional options are Agora Harbor Lodge and Agora Woodland Inn in Bar Harbor, Maine. Each has specific room capacities, beds, USD prices and demonstration availability. Other destinations can be discussed, but the assistant will not invent hotels or inventory there."
  },
  {
    "question": "Can it book, change or cancel my trip?",
    "answer": "It can guide a simulated hotel selection and confirm the complete stay and total after your agreement. Changes and cancellations affect only this conversation’s simulation. No real hotel or flight is booked, no payment or refund occurs, and no confirmation code or saved order is created."
  },
  {
    "question": "Does it search live flights or fares?",
    "answer": "No. Cited airport information is static geographic reference material. Hotel addresses, rates and counts are fictional demo configuration. Hotel simulations cover 1–14 nights within the next 28 days; live airline schedules, seats and fares are unavailable."
  },
  {
    "question": "Can I change what I said?",
    "answer": "Yes. Tell the assistant which detail to correct, ask it to repeat or clarify an answer, or request a verbal recap. Details are used within the current conversation; this demo does not save business results or remember them across sessions."
  },
  {
    "question": "What if my microphone does not work?",
    "answer": "Check that microphone access is allowed for this page and that the correct input device is selected in your browser or system settings. Make sure the microphone is not muted, then try Review travel plans again."
  }
];

export function ScenarioFaq() {
  return (
    <DialogContent className="demo-inspector demo-faq-drawer">
      <DialogHeader className="demo-faq-heading">
        <DialogTitle>Frequently asked questions</DialogTitle>
        <DialogDescription>How to get started, what to ask, and what to expect.</DialogDescription>
      </DialogHeader>
      <div className="demo-faq-list">
        {questions.map(({ question, answer }) => (
          <details className="demo-faq-item" key={question}>
            <summary>
              <span>{question}</span>
              <ChevronDown className="demo-faq-chevron" size={16} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </DialogContent>
  );
}
