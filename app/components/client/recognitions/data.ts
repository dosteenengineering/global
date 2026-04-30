export type Category = "certifications" | "awards";

export interface AwardItem {
  id: number;
  category: Category;
  image: string;
  title: string;
}

export const items: AwardItem[] = [
  // Certifications
  {
    id: 1,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 2,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 3,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 4,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 5,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 6,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 7,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 8,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 9,
    category: "certifications",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },

  // Awards
  {
    id: 10,
    category: "awards",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 11,
    category: "awards",
    image: "/assets/images/recognitions/awards/2.png",
    title: "Transforming Efficiency",
  },
  {
    id: 12,
    category: "awards",
    image: "/assets/images/recognitions/awards/3.png",
    title: "Transforming Efficiency",
  },
  {
    id: 13,
    category: "awards",
    image: "/assets/images/recognitions/awards/2.png",
    title: "Transforming Efficiency",
  },
  {
    id: 14,
    category: "awards",
    image: "/assets/images/recognitions/awards/1.png",
    title: "Transforming Efficiency",
  },
  {
    id: 15,
    category: "awards",
    image: "/assets/images/recognitions/awards/4.png",
    title: "Transforming Efficiency",
  },
  {
    id: 16,
    category: "awards",
    image: "/assets/images/recognitions/awards/4.png",
    title: "Transforming Efficiency",
  },
  {
    id: 17,
    category: "awards",
    image: "/assets/images/recognitions/awards/3.png",
    title: "Transforming Efficiency",
  },
  {
    id: 18,
    category: "awards",
    image: "/assets/images/recognitions/awards/5.png",
    title: "Transforming Efficiency",
  },
];

  export const faqs = [
    {
      id: 1,
      question: "What BIM software does Dosteen's engineering team use?",
      answer:
        "Our engineering team works primarily with Autodesk Revit for MEP coordination, Navisworks for clash detection, and AutoCAD for 2D documentation. We also support IFC-based workflows for interoperability with structural and architectural consultants.",
    },
    {
      id: 2,
      question: "What LOD can Dosteen deliver for building systems models?",
      answer:
        "Dosteen delivers models from LOD 200 (spatial coordination) through to LOD 400 (installation-ready fabrication detail), depending on the project stage and BIM Execution Plan requirements. As-built models are delivered at LOD 400 or as agreed with the project team. Confirm your LOD requirements with our engineering team at appointment.",
    },
    {
      id: 3,
      question: "Can Dosteen integrate with our project's existing BIM model?",
      answer:
        "Yes. We routinely federate our MEP models into existing architectural and structural BIM environments. Our team will review your current model setup during the project kick-off and align with your BIM Execution Plan to ensure seamless coordination.",
    },
    {
      id: 4,
      question: "How does Dosteen handle clash detection?",
      answer:
        "We run regular Navisworks clash detection cycles throughout the design and coordination phases. Issues are tracked, assigned, and resolved collaboratively with all discipline leads. Our process follows ISO 19650 standards for information management and issue resolution.",
    },
  ];