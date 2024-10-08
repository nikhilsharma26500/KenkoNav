const SlideShowData = [
  {
      heading: "KenkoNav",
      info: ["text 1", "text 2", "text 3"],
  },
  {
      heading: "Discover what is in your food!",
      info: ["text 1", "text 2", "text 3"],
  },
  {
      heading: "Discover what is in your cosmetics!",
      info: ["text 1", "text 2", "text 3"],
  },
];

const PriceDataMonthly = [
    {
        heading: "Students",
        info: ["text 1", "text 2", "text 3"],
    },
    {
        heading: "slide 2",
        info: ["text 1", "text 2", "text 3"],
    },
    {
        heading: "slide 3",
        info: ["text 1", "text 2", "text 3"],
    },
];

const PriceDataAnnually = [
    {
        heading: "Students",
        info: ["text 1", "text 2", "text 3"],
    },
    {
        heading: "slide 2",
        info: ["text 1", "text 2", "text 3"],
    },
    {
        heading: "slide 3",
        info: ["text 1", "text 2", "text 3"],
    },
];


interface Plans {
  title: string,
  price: string,
  features: string[],
  buttonText: string,
  buttonColor: string,
  iconBgColor: string,
  iconColor: string
}

const Plans: Plans[] = [
    {
      title: "Students",
      price: "$5/month",
      features: [
        "10 deploys per day",
        "10 GB of storage",
        "Unlimited domains",
        "SSL Certificates",
      ],
      buttonText: "Start for free",
      buttonColor: "bg-gray-800 hover:bg-gray-900",
      iconBgColor: "bg-blue-gray-50",
      iconColor: "text-gray-600",
    },
    {
      title: "For your team",
      price: "$39",
      features: [
        "Unlimited deploys",
        "Up to 10 Team Members",
        "100 GB of storage",
        "24/7 support",
        "Global CDN",
      ],
      buttonText: "Get started",
      buttonColor: "bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700",
      iconBgColor: "bg-indigo-50",
      iconColor: "text-deep-purple-accent-400",
    },
  ];
  





export { SlideShowData, PriceDataMonthly, PriceDataAnnually, Plans };