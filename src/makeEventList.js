const segmentStartDates = [
  '2023-01-02 00:00:00',
  '2023-01-19 00:00:00',
  '2023-02-08 00:00:00',
  '2023-02-27 00:00:00',
  '2023-03-24 00:00:00',
  '2023-04-14 00:00:00',
];

const segmentEndDates = [
  '2023-01-18 11:59:59',
  '2023-02-07 11:59:59',
  '2023-02-24 11:59:59',
  '2023-03-23 11:59:59',
  '2023-04-13 11:59:59',
  '2023-05-02 11:59:59',
];

const slotInfo = {
  A: [
    {
      day: 1,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 10,
      minute: 0,
      duration: 55,
    },
  ],
  B: [
    {
      day: 1,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 11,
      minute: 0,
      duration: 55,
    },
  ],
  C: [
    {
      day: 1,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 9,
      minute: 0,
      duration: 55,
    },
  ],
  D: [
    {
      day: 1,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 2,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 11,
      minute: 0,
      duration: 55,
    },
  ],
  E: [
    {
      day: 2,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 9,
      minute: 0,
      duration: 55,
    },
  ],
  F: [
    {
      day: 2,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 14,
      minute: 30,
      duration: 55,
    },
    {
      day: 5,
      hour: 10,
      minute: 0,
      duration: 55,
    },
  ],
  G: [
    {
      day: 2,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 12,
      minute: 0,
      duration: 55,
    },
  ],
  P: [
    {
      day: 1,
      hour: 14,
      minute: 30,
      duration: 85,
    },
    {
      day: 4,
      hour: 16,
      minute: 0,
      duration: 85,
    },
  ],
  Q: [
    {
      day: 1,
      hour: 16,
      minute: 0,
      duration: 85,
    },
    {
      day: 4,
      hour: 14,
      minute: 30,
      duration: 85,
    },
  ],
  R: [
    {
      day: 2,
      hour: 14,
      minute: 30,
      duration: 85,
    },
    {
      day: 5,
      hour: 16,
      minute: 0,
      duration: 85,
    },
  ],
  S: [
    {
      day: 2,
      hour: 16,
      minute: 0,
      duration: 85,
    },
    {
      day: 5,
      hour: 14,
      minute: 30,
      duration: 85,
    },
  ],
};

function makeEventList(aimsTimeTable, customEventList) {
  const courseEvents = [];

  if (aimsTimeTable) {
    aimsTimeTable.identifiedCourses.forEach((courseCode, index) => {
      const startSegment = Number(aimsTimeTable.identifiedSegments[index][0]);
      const endSegment = Number(
        aimsTimeTable.identifiedSegments[index].slice(-1),
      );

      const slot = aimsTimeTable.identifiedSlots[index];
      const segmentStartDate = new Date(segmentStartDates[startSegment - 1]);
      const segmentEndDate = new Date(segmentEndDates[endSegment - 1]);

      // adding 1 more day because FC endRecur is exclusive
      const fcEndDate = new Date(segmentEndDate.getTime() + 3600 * 24 * 1000);
      let courseDisplayName = courseCode;

      if (aimsTimeTable.identifiedCourseNames?.[index]) {
        courseDisplayName = `${aimsTimeTable.identifiedCourseNames[index]} (${courseCode})`;
      }

      slotInfo[slot].forEach((currSlot) => {
        const startTime = segmentStartDate;
        startTime.setHours(currSlot.hour, currSlot.minute, 0);

        const endTime = new Date(
          startTime.getTime() + currSlot.duration * 60000,
        );

        courseEvents.push({
          title: courseDisplayName,
          startRecur: segmentStartDate,
          endRecur: fcEndDate,
          startTime: startTime.toTimeString().split(' ')[0],
          endTime: endTime.toTimeString().split(' ')[0],
          daysOfWeek: [currSlot.day],
        });
      });
    });
  }

  return [...courseEvents, ...customEventList];
}

export default makeEventList;
