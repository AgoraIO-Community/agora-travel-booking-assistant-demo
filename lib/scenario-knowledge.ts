import { getDemoDates } from './prompt-context';

// Configured fictional demo reference; never a live inventory or durable booking store.
export const SCENARIO_KNOWLEDGE = {
  "source": {
    "kind": "Static public airport reference",
    "checkedOn": "2026-11-05",
    "scope": "The cited airport material covers names, codes and locations only. The separate demoHotels, prices and counts are new fictional examples; no live route, fare or hotel search is performed."
  },
  "timeZone": "America/New_York",
  "destination": "Bar Harbor and Acadia National Park, Maine, United States",
  "airports": [
    {
      "code": "BHB",
      "name": "Hancock County–Bar Harbor Airport",
      "location": "Between Ellsworth and Bar Harbor, Maine",
      "timeZone": "America/New_York",
      "comparison": "Local airport to compare for a shorter onward trip to Bar Harbor; whether a convenient flight operates on the travel date must be checked separately.",
      "source": "https://www.bhbairport.com/"
    },
    {
      "code": "BGR",
      "name": "Bangor International Airport",
      "location": "Bangor, Maine",
      "timeZone": "America/New_York",
      "comparison": "Regional alternative in Bangor. Compare the actual flight itinerary and onward ground transportation against BHB.",
      "source": "https://flybangor.com/"
    },
    {
      "code": "PWM",
      "name": "Portland International Jetport",
      "location": "Portland, Maine",
      "timeZone": "America/New_York",
      "comparison": "An alternative for a trip that also includes Portland or southern Maine; reaching Bar Harbor requires a longer onward journey than the local airport.",
      "source": "https://portlandjetport.org/"
    }
  ],
  "comparisonChecklist": [
    "Actual origin and final destination",
    "Flight itinerary and connection count from a live travel source",
    "Ground transportation and whether a car is needed",
    "Total flight plus ground cost and travel time",
    "Baggage, child and accessibility needs",
    "Exact fare rules supplied by the provider"
  ],
  "demoHotels": [
    {
      "id": "harbor-demo",
      "name": "Agora Harbor Lodge",
      "destination": "Bar Harbor / Acadia, Maine",
      "address": "10 Example Harbor Walk, Bar Harbor, ME 04609, United States (fictional demo address; do not use for navigation)",
      "timeZone": "America/New_York",
      "setting": "In-town base for a Bar Harbor stay; exact travel times are not configured.",
      "rooms": [
        {
          "id": "harbor-king",
          "name": "Harbor king",
          "maxGuests": 2,
          "bedding": "One king bed",
          "floor": 2,
          "elevatorPosition": "Near the elevator",
          "smokingAllowed": false,
          "nightlyRateUsd": 189,
          "initialDemoRoomsPerNight": 3
        },
        {
          "id": "harbor-family",
          "name": "Harbor family suite",
          "maxGuests": 4,
          "bedding": "One king bed and one double sofa bed",
          "floor": 4,
          "elevatorPosition": "Away from the elevator",
          "smokingAllowed": false,
          "nightlyRateUsd": 269,
          "initialDemoRoomsPerNight": 2
        }
      ]
    },
    {
      "id": "woodland-demo",
      "name": "Agora Woodland Inn",
      "destination": "Bar Harbor / Acadia, Maine",
      "address": "25 Example Woodland Court, Bar Harbor, ME 04609, United States (fictional demo address; do not use for navigation)",
      "timeZone": "America/New_York",
      "setting": "A lower-priced woodland setting for travelers who plan ground transport; no shuttle or driving time is guaranteed.",
      "rooms": [
        {
          "id": "woodland-twin",
          "name": "Woodland twin",
          "maxGuests": 2,
          "bedding": "Two single beds",
          "floor": 1,
          "elevatorPosition": "Away from the elevator",
          "smokingAllowed": false,
          "nightlyRateUsd": 149,
          "initialDemoRoomsPerNight": 4
        },
        {
          "id": "woodland-family",
          "name": "Woodland family room",
          "maxGuests": 4,
          "bedding": "Two queen beds",
          "floor": 2,
          "elevatorPosition": "Near the elevator",
          "smokingAllowed": false,
          "nightlyRateUsd": 219,
          "initialDemoRoomsPerNight": 2
        }
      ]
    }
  ],
  "demoPolicies": {
    "checkIn": "From 3:00 PM hotel local time",
    "checkOut": "By 12:00 PM noon hotel local time",
    "breakfast": "Not included; no breakfast price is configured.",
    "smoking": "All rooms and indoor areas are non-smoking.",
    "occupancy": "All adults, children and infants count toward capacity. Each room needs an accompanying adult. No rollaway beds or guaranteed cribs are configured."
  },
  "demoPricing": {
    "currency": "USD",
    "taxPercent": 10,
    "additionalFeesUsd": 0,
    "calculation": "Nightly room rate x nights x rooms, plus 10% tax; round tax to cents. No payment is taken.",
    "cancellation": "In this conversation, a simulated cancellation releases only the counts tracked in the conversation; no real refund or cancellation is performed."
  },
  "demoInventory": "The initial count for each hotel room type applies to every night in demoStayWindow. It is a fixed demo snapshot, not a lookup. Every occupied night must be inside the window; checkout may equal checkOutThrough. Decrement counts for overlapping nights only after explicit simulated confirmation within this conversation; no hold before confirmation. Do not double-count a repeated confirmation. Restore counts only after an explicitly confirmed simulated cancellation. If earlier selections are no longer in context, say availability is uncertain instead of inventing a ledger."
} as const;

export function getScenarioKnowledge(now = new Date()) {
  const dates = getDemoDates(SCENARIO_KNOWLEDGE.timeZone, now);
  return {
    ...SCENARIO_KNOWLEDGE,
    demoStayWindow: {
      checkInFrom: dates[0], checkOutThrough: dates[28],
      minimumNights: 1, maximumNights: 14,
      description: 'Only stays fully inside this rolling demo window can be simulated. Outside it, discuss plans without inventing inventory.',
    },
  };
}
