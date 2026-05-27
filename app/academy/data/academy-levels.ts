import type { AcademyLevel } from "../types/academy";

export const ACADEMY_LEVELS: AcademyLevel[] = [
  {
    id: "academy-level-1",
    star: {
      level: 1,
      title: "LVL 1",
      subtitle: "Welcome to WEB3",
      className: "md:relative md:-left-10",
      wrapperClassName: "mb-8 md:mb-0 flex justify-center w-full md:w-auto",
    },
    layout: {
      sectionClassName: "relative mb-32",
      contentClassName:
        "flex flex-col items-center md:flex-row md:items-center md:justify-center md:gap-10",
      stepsClassName:
        "flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16",
    },
    steps: [
      {
        id: "step1",
        title: "Setup wallet",
        badgeNumber: 1,
        containerClassName: "py-4 md:py-0",
        relations: [
          {
            targetId: "step2",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step2",
        title: "Buy crypto",
        badgeNumber: 2,
        containerClassName: "pt-6 pb-3 md:p-0",
        relations: [
          {
            targetId: "step3",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step3",
        title: "Buy CELESTIUM",
        badgeNumber: 3,
        containerClassName: "pt-6 md:pt-0",
        relations: [
          {
            targetId: "step4",
            desktop: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
            mobile: null,
          },
        ],
      },
    ],
  },
  {
    id: "academy-level-2",
    star: {
      level: 2,
      title: "LVL 2",
      subtitle: "Welcome to Celestium",
      className: "md:relative md:-left-10",
      wrapperClassName: "mb-8 md:mb-0 flex justify-center w-full md:w-auto",
    },
    layout: {
      sectionClassName: "relative mb-28",
      contentClassName:
        "flex flex-col items-center md:flex-row md:items-center md:justify-center md:gap-10",
      stepsClassName:
        "flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16",
    },
    steps: [
      {
        id: "step4",
        title: "Get PASS",
        badgeNumber: 4,
        containerClassName: "py-6",
        relations: [
          {
            targetId: "step5",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step5",
        title: "How to first stake",
        buttonText: "Live tutorial",
        badgeNumber: 5,
        containerClassName: "pt-6 pb-3 md:p-0",
        relations: [
          {
            targetId: "step6",
            desktop: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
            mobile: null,
          },
        ],
      },
    ],
  },
  {
    id: "academy-level-3",
    star: {
      level: 3,
      title: "LVL 3",
      subtitle: "Let's duplicate",
      className: "md:relative md:-left-10",
      wrapperClassName: "mb-8 md:mb-0 flex justify-center w-full md:w-auto",
    },
    layout: {
      sectionClassName: "relative mb-24",
      contentClassName:
        "flex flex-col items-center md:flex-row md:items-center md:justify-center md:gap-10",
      stepsClassName:
        "flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16",
    },
    steps: [
      {
        id: "step6",
        title: "Buy crypto",
        badgeNumber: 6,
        containerClassName: "pt-6 md:pt-6",
        relations: [
          {
            targetId: "step7",
            desktop: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
    ],
  },
  {
    id: "academy-level-4",
    layout: {
      sectionClassName: "relative md:flex md:justify-center",
      contentClassName: "max-w-6xl mx-auto",
      stepsClassName:
        "flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-3",
    },
    steps: [
      {
        id: "step7",
        title: "Setup wallet",
        badgeNumber: 7,
        containerClassName: "pt-6",
        relations: [
          {
            targetId: "step8",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
              style: {
                lineStyle: "straight",
                endMarker: true,
                startMarker: false,
              },
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step8",
        title: "Buy crypto",
        badgeNumber: 8,
        containerClassName: "pt-6",
        relations: [
          {
            targetId: "step9",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
              style: {
                lineStyle: "straight",
                endMarker: true,
                startMarker: false,
              },
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step9",
        title: "Buy CELESTIUM",
        badgeNumber: 9,
        containerClassName: "pt-6",
        relations: [
          {
            targetId: "step10",
            desktop: {
              sourceAnchor: "right",
              targetAnchor: "left",
              style: {
                lineStyle: "straight",
                endMarker: true,
                startMarker: false,
              },
            },
            mobile: {
              sourceAnchor: "bottom",
              targetAnchor: "top",
            },
          },
        ],
      },
      {
        id: "step10",
        title: "Buy CELESTIUM",
        badgeNumber: 10,
        containerClassName: "pt-6",
      },
    ],
  },
];
