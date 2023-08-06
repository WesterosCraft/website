import Sunspear from "@assets/icons/sunspear96.png";
import Nightswatch from "@assets/icons/nightswatch96.png";
import Winterfell from "@assets/icons/winterfell96.png";
import Eyrie from "@assets/icons/eyrie96.png";
import Pyke from "@assets/icons/pyke96.png";
import Highgarden from "@assets/icons/highgarden96.png";
import CasterlyRock from "@assets/icons/casterlyrock96.png";
import SummerHall from "@assets/icons/summerhall96.png";
import TheTwins from "@assets/icons/thetwins96.png";
import Dragonstone from "@assets/icons/dragonstone96.png";
import RedKeep from "@assets/icons/redkeep96.png";

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

export const regions = [
  {
    name: "Dorne",
    description: "Southernmost area of Westeros",
    icon: {
      src: Sunspear.src,
      width: 32,
      height: 32,
      alt: "Sunspear icon",
    },
  },
  {
    name: "The Wall",
    description:
      "A huge structure of stone, ice, and magic on the northern border of Westeros",
    icon: {
      src: Nightswatch.src,
      width: 32,
      height: 32,
      alt: "Nights watch icon",
    },
  },
  {
    name: "North",
    description: "The northern kingdom, nearly as big as the other 6 combined",
    icon: {
      src: Winterfell.src,
      width: 32,
      height: 32,
      alt: "Winterfell icon",
    },
  },
  {
    name: "Vale",
    description:
      "An area in the east almost completely surrounded by mountains",
    icon: {
      src: Eyrie.src,
      width: 32,
      height: 32,
      alt: "Eyrie icon",
    },
  },
  {
    name: "Iron Islands",
    description: "Group of isolated and rugged islands west of Westeros",
    icon: {
      src: Pyke.src,
      width: 32,
      height: 32,
      alt: "Pyke icon",
    },
  },
  {
    name: "Westerlands",
    description: "A rich kingdom west of the Riverlands",
    icon: {
      src: CasterlyRock.src,
      width: 32,
      height: 32,
      alt: "Casterly Rock icon",
    },
  },
  {
    name: "Crownlands",
    description: "Lands surrounding the capital of Kings Landing",
    icon: {
      src: RedKeep.src,
      width: 32,
      height: 32,
      alt: "Red Keep icon",
    },
  },
  {
    name: "Riverlands",
    description: "Centrally located, surrounded by several kingdoms",
    icon: {
      src: TheTwins.src,
      width: 32,
      height: 32,
      alt: "The Twins icon",
    },
  },
  {
    name: "Stormlands",
    description: "Lies between Kings Landing and the Sea of Dorne",
    icon: {
      src: Dragonstone.src,
      width: 32,
      height: 32,
      alt: "Dragonstone icon",
    },
  },
  {
    name: "Reach",
    description: "Covers the lower western half of Westeros",
    icon: {
      src: Highgarden.src,
      width: 32,
      height: 32,
      alt: "Highgarden icon",
    },
  },
  {
    name: "Beyond The Wall",
    description:
      "A mountainous, desolate and frozen terrain with lots of forests and populated with nomadic clans.",
    icon: {
      src: SummerHall.src,
      width: 32,
      height: 32,
      alt: "SummerHall icon",
    },
  },
];

export const wikiNavigation = [
  {
    title: "Getting Started",
    links: [
      { title: "Installing the modpack", href: "/docs/installation" },
      { title: "Server rules", href: "/docs/installation" },
      { title: "Applying to build", href: "/docs/installation" },
    ],
  },
  {
    title: "Locations By Region",
    links: [
      { title: "Beyond The Wall", href: "/wiki/locations/beyond-the-wall" },
      {
        title: "Crownlands",
        href: "/wiki/locations/crownlands",
      },
      { title: "Reach", href: "/wiki/locations/reach" },
      {
        title: "Stormlands",
        href: "/wiki/locations/stormlands",
      },
      { title: "Riverlands", href: "/wiki/locations/riverlands" },
      { title: "Dorne", href: "/wiki/locations/dorne" },
      { title: "The Wall", href: "/wiki/locations/the-wall" },
      { title: "North", href: "/wiki/locations/north" },
      { title: "Vale", href: "/wiki/locations/vale" },
      { title: "Iron Islands", href: "/wiki/locations/iron-islands" },
      { title: "Westerlands", href: "/wiki/locations/westerlands" },
    ],
  },
  {
    title: "Guides By Category",
    links: [
      { title: "Writing plugins", href: "/docs/writing-plugins" },
      { title: "Neuralink integration", href: "/docs/neuralink-integration" },
      { title: "Temporal paradoxes", href: "/docs/temporal-paradoxes" },
      { title: "Testing", href: "/docs/testing" },
      { title: "Compile-time caching", href: "/docs/compile-time-caching" },
      {
        title: "Predictive data generation",
        href: "/docs/predictive-data-generation",
      },
    ],
  },
];
