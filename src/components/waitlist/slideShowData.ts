const SlideShowData = [
  {
      heading: "What is KenkoNav?",
      info: [
        "Live healthy",
        "Find whats in your food",
        "Find whats in your cosmetics"
      ],
  },
  {
      heading: "Discover what is in your food!",
      info: [
        "Healthy", 
        "Toxins", 
        "All research based"
      ],
  },
  {
      heading: "Discover what is in your cosmetics!",
      info: [
        "Healthy", 
        "Harmful Chemicals", 
        "All research based"
      ],
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

const PlansMonthly: Plans[] = [
    {
      title: "Students",
      price: "$5/month",
      features: [
        "A",
        "B",
        "C",
        "D",  
      ],
      buttonText: "Get started",
      buttonColor: "bg-gray-800 hover:bg-gray-900",
      iconBgColor: "bg-blue-gray-50",
      iconColor: "text-gray-600",
    },
    {
      title: "Regular",
      price: "$15/month",
      features: [
        "A",
        "B",
        "C",
        "D",  
      ],
      buttonText: "Get started",
      buttonColor: "bg-gray-800 hover:bg-gray-900",
      iconBgColor: "bg-blue-gray-50",
      iconColor: "text-gray-600",
    },
  ];
  





export { SlideShowData, PlansMonthly };