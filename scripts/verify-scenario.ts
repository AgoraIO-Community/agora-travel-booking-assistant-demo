import { getScenarioKnowledge } from '../lib/scenario-knowledge';
import { getConversationContext, getDemoDates } from '../lib/prompt-context';
import assert from 'node:assert/strict';
import { getScenarioConfig, getScenarioPrompt } from '../lib/agent-config';
import { getScenarioPresentation } from '../lib/presentation';
const config = getScenarioConfig();
assert.equal(config.id, "03-travel-booking");
assert.equal(getScenarioPresentation().id, config.id);
for (const key of ['role', 'workflow', 'guardrails', 'greeting'] as const) assert.ok(config[key]);
assert.match(getScenarioPrompt(), /# Goal and conversation flow/);
assert.match(getScenarioPrompt(), /# First-version boundary/);
assert.match(getScenarioPrompt(), /No business data lookup/);
assert.doesNotMatch(getScenarioPrompt(), /AG-100[123]|patient-alex|AST-R3001|travelerKey|participantId/);
console.log('Scenario conversation contract passed: ' + config.id);

// Calendar regressions: U.S. dates can differ from UTC and offsets change with DST.
const localNight = getConversationContext('America/New_York', new Date('2026-11-05T02:30:00Z'));
assert.match(localNight, /Current local date: 2026-11-04/);
assert.match(localNight, /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T06:30:00Z')), /UTC-05:00/);
assert.match(getConversationContext('America/New_York', new Date('2026-03-08T07:30:00Z')), /UTC-04:00/);
assert.match(getConversationContext('America/Chicago', new Date('2026-07-01T03:30:00Z')), /Current local date: 2026-06-30/);
assert.match(getConversationContext('America/New_York', new Date('2026-12-31T17:00:00Z')), /2027-01-01 Friday/);
assert.match(getConversationContext('America/New_York', new Date('2028-02-28T17:00:00Z')), /2028-02-29 Tuesday; 2028-03-01 Wednesday/);
console.log('Prompt local-date, DST and calendar regressions passed.');

// Public demo windows must follow business-local dates through leap days and year boundaries.
assert.equal(getDemoDates('America/New_York', new Date('2026-11-05T02:30:00Z'))[0], '2026-11-04');
const leapDemoDates = getDemoDates('America/New_York', new Date('2028-02-28T17:00:00Z'));
assert.equal(leapDemoDates[1], '2028-02-29');
assert.equal(leapDemoDates[2], '2028-03-01');
assert.equal(new Set(leapDemoDates).size, 29);
assert.equal(getDemoDates('America/Chicago', new Date('2026-12-31T18:00:00Z'))[28], '2027-01-28');
const demoStay = getScenarioKnowledge(new Date('2026-12-31T02:30:00Z'));
assert.equal(demoStay.demoStayWindow.checkInFrom, '2026-12-30');
assert.equal(demoStay.demoStayWindow.checkOutThrough, '2027-01-27');
assert.equal(demoStay.demoStayWindow.maximumNights, 14);
const demoRooms = demoStay.demoHotels.flatMap((hotel) => [...hotel.rooms]);
assert.equal(new Set(demoRooms.map((room) => room.id)).size, demoRooms.length);
for (const room of demoRooms) {
  assert.ok(room.maxGuests >= 2 && room.floor > 0);
  assert.ok(Number.isInteger(room.nightlyRateUsd) && room.nightlyRateUsd > 0);
  assert.ok(Number.isInteger(room.initialDemoRoomsPerNight) && room.initialDemoRoomsPerNight > 0);
  assert.equal(room.smokingAllowed, false);
}
console.log('Phase-one generated reference regressions passed.');
