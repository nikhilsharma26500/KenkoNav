const SlideShowData = [
  { 
      slide: 1,
      heading: "Not sure what you're consuming?",
      info: [
        // "A platform designed to empower healthier lifestyle choices",
        // "Upload or input ingredient details for your food and cosmetics",
        // "Get AI-driven, personalized insights based on your health needs"
      ],
      // heading: "What is KenkoNav?",
      // info: [
      //   "A platform designed to empower healthier lifestyle choices",
      //   "Upload or input ingredient details for your food and cosmetics",
      //   "Get AI-driven, personalized insights based on your health needs"
      // ],
  },
  {
      slide: 2,
      heading: "Want to avoid harmful ingredients?",
      info: [
        // "Upload a photo of the ingredients list or manually input the details",
        // "AI analyzes ingredients for their nutritional value and potential toxins",
        // "Receive personalized feedback based on your dietary restrictions, allergies, and medical conditions"
      ],
      // heading: "Analyze Your Food Ingredients",
      // info: [
      //   "Upload a photo of the ingredients list or manually input the details",
      //   "AI analyzes ingredients for their nutritional value and potential toxins",
      //   "Receive personalized feedback based on your dietary restrictions, allergies, and medical conditions"
      // ],
  },
  {
      slide: 3,
      heading: "Scan the ingredients using AI to get insights!",
      info: [
        // "Upload ingredient details of your cosmetic products",
        // "Identify harmful chemicals and assess the overall safety of your products",
        // "Receive science-backed recommendations tailored to your skin type and sensitivities"
      ],
      // heading: "Evaluate Your Cosmetics for Safety",
      // info: [
      //   "Upload ingredient details of your cosmetic products",
      //   "Identify harmful chemicals and assess the overall safety of your products",
      //   "Receive science-backed recommendations tailored to your skin type and sensitivities"
      // ],
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