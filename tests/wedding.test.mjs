import assert from "node:assert/strict";
import { test } from "node:test";
import { wedding } from "../config/wedding.ts";
import { calendar, ceremony, ceremonyDate, countdown, dateLabel, eventDate, events, timeLabel } from "../lib/wedding.ts";

test("the Haldi and wedding start times match the supplied IST times and calendar downloads", () => {
  const expected = [
    ["haldi", "2026-12-11T06:00:00Z", "11:30 am"],
    ["wedding", "2026-12-12T06:37:00Z", "12:07 pm"],
  ];
  assert.deepEqual(events.map(({ id }) => id), expected.map(([id]) => id));
  for (const [index, [, iso, display]] of expected.entries()) {
    const event = events[index];
    assert.equal(eventDate(event), Date.parse(iso));
    assert.equal(timeLabel(event), display);
    const invite = calendar(event).replace(/\r\n /g, "");
    assert.ok(invite.includes(`DTSTART:${iso.replace(/[-:]/g, "")}\r\n`));
    assert.ok(invite.includes(`URL:${wedding.venues[event.venue].directions}\r\n`));
  }
});

test("changing the year propagates to the start timestamp, displayed date and calendar", () => {
  assert.equal(dateLabel(ceremony, true, 2027), "Sunday, 12 December 2027");
  assert.equal(eventDate(ceremony, 2027), Date.parse("2027-12-12T12:07:00+05:30"));
  assert.match(calendar(ceremony, 2027), /DTSTART:20271212T063700Z/);
  assert.match(calendar(ceremony, 2027), /UID:wedding-2027@/);
});

test("the countdown handles elapsed time, the exact instant and invalid dates", () => {
  assert.equal(ceremonyDate, Date.parse("2026-12-12T12:07:00+05:30"));
  assert.deepEqual(countdown(ceremonyDate, ceremonyDate - 90_061_000), { ended: false, units: [1, 1, 1, 1] });
  assert.deepEqual(countdown(ceremonyDate, ceremonyDate - 1), { ended: false, units: [0, 0, 0, 1] });
  for (const now of [ceremonyDate, ceremonyDate + 1000]) assert.deepEqual(countdown(ceremonyDate, now), { ended: true, units: [0, 0, 0, 0] });
  assert.equal(countdown(NaN, Date.now()), null);
  assert.equal(calendar({ ...ceremony, day: 32 }), null);
});

test("Haldi uses Myakalwar House and the wedding uses Jijau Lawn", () => {
  const haldi = events.find(({ id }) => id === "haldi");
  const invite = calendar(haldi).replace(/\r\n /g, "");
  assert.ok(invite.includes("LOCATION:Myakalwar House\\, Vishwakarma Chowk\\, Indira Nagar\\, Chandrapur\\, MH\r\n"));
  assert.ok(invite.includes("URL:https://maps.app.goo.gl/5rFR7adpDf3xCteD9\r\n"));
  assert.equal(wedding.venues.wedding.directions, "https://maps.app.goo.gl/uqsHPUvWJAgitZ7t5");
  assert.equal(wedding.venues.wedding.name, "Jijau Lawn · Datala Rd, Chandrapur MH.");
});
