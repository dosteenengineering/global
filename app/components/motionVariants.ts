import type { Variants } from "framer-motion";
import { cubicBezier } from "framer-motion";

export const containerStagger = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
export const moveUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveDown = (delay: number = 0) => ({
  hidden: { opacity: 0, y: -50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveLeft = (delay: number = 0) => ({
  hidden: { opacity: 0, x: 50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const moveRight = (delay: number = 0) => ({
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
});

export const paragraphItem = {
  hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and slide up from 50px below
  show: {
    opacity: 1,
    y: 0, // Slide to its normal position
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
};

export const opacityMove = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const listUpMove = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Controls the stagger effect (delay for each item)
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export const letterContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05, // a little more time between letters
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export const letterItem = {
  hidden: { y: "100%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: {
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      duration: 0.5,
    },
  },
};


export const letterItemTop = {
  hidden: {
    y: -40, // Start from top
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // cubic-bezier for a soft easeOut
    },
  },
};

export const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: -12,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      ease: cubicBezier(0.4, 0, 0.2, 1),
      duration: 0.22,
    },
  }),
};


export const moveUpVariant = (duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: 64 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 1,
    y: -264,
    transition: { duration: 0.4, ease: "easeIn" },
  },
});

export const flipVariant: Variants = {
  hidden: { opacity: 0, rotateX: 90, transformOrigin: "top center" },
  show: {
    opacity: 1,
    rotateX: 0,
    transformOrigin: "top center",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    rotateX: -90,
    transformOrigin: "top center",
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

export const labelVariant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

// Direction-aware variant: +1 = forward (up), -1 = backward (down)
export const slideVariant = (duration: number = 0.5): Variants => ({
  enter: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? 64 : -64,
  }),
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 1,
    y: dir >= 0 ? -264 : 264,
    transition: { duration: 0.4, ease: "easeIn" },
  }),
});