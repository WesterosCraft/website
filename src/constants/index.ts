export const IS_BROWSER = typeof window !== "undefined";

export const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { delay: 0.1, staggerChildren: 0.3, delayChildren: 0.4 * i },
  }),
};

export const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 15,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};
