import {
  Leaf,
  ShieldCheck,
  Scan,
  Sparkles,
  Apple,
  Carrot,
  Banana,
  Cookie,
  Bell,
} from "lucide-react";

const SlideShowData = [
  {
    slide: 1,
    heading: "Not sure what you're consuming?",
    info: [],
    icon: Leaf,
    accent: "from-emerald-400 to-green-500",
    decoration: [Apple, Carrot],
  },
  {
    slide: 2,
    heading: "Want to avoid harmful ingredients?",
    info: [],
    icon: ShieldCheck,
    accent: "from-violet-400 to-purple-500",
    decoration: [Cookie, Bell],
  },
  {
    slide: 3,
    heading: "Scan the ingredients using AI to get insights!",
    info: [],
    icon: Scan,
    accent: "from-blue-400 to-cyan-500",
    decoration: [Sparkles, Banana],
  },
];

export { SlideShowData };
