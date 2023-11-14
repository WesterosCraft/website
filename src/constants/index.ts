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

export const DOC_CATEGORIES = [
  { label: "Getting Started", value: "gettingStarted" },
  { label: "Guides", value: "guides" },
  { label: "Rules & Guidelines", value: "rulesAndGuidelines" },
  { label: "Resources", value: "resources" },
  { label: "Miscellaneous", value: "miscellaneous" },
  { label: "Archived", value: "archived" },
];

export const REGIONS = [
  {
    label: "Beyond The Wall",
    value: "beyondTheWall",
  },
  {
    label: "Crownlands",
    value: "crownlands",
  },
  {
    label: "Dorne",
    value: "dorne",
  },
  {
    label: "Iron Islands",
    value: "ironIslands",
  },
  {
    label: "North",
    value: "north",
  },
  {
    label: "Reach",
    value: "reach",
  },
  {
    label: "Riverlands",
    value: "riverlands",
  },
  {
    label: "Stormlands",
    value: "stormlands",
  },
  {
    label: "The Wall",
    value: "theWall",
  },
  {
    label: "Westerlands",
    value: "westerlands",
  },
  {
    label: "Vale",
    value: "vale",
  },
];

export const PROJECT_STATUS = [
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "inProgress" },
  { label: "Not started", value: "notStarted" },
  { label: "Abandoned", value: "abandoned" },
  { label: "Redo in progress", value: "redoInProgress" },
];

export const PROJECT_TYPES = [
  { label: "Castle", value: "castle" },
  { label: "Town", value: "town" },
  { label: "Village", value: "village" },
  { label: "City", value: "city" },
  { label: "Holdfast", value: "holdfast" },
  { label: "Keep", value: "keep" },
  { label: "Landmark", value: "landmark" },
  { label: "Ruin", value: "ruin" },
  { label: "Tower", value: "tower" },
  { label: "Clan", value: "clan" },
  { label: "Crannog", value: "crannog" },
  { label: "Miscellaneous", value: "miscellaneous" },
];
