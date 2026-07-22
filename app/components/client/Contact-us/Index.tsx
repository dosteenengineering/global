import { IndividualSystemData } from "../GarageDoors/data";
import { ContactData } from "./data";
import ContactBanner from "./Sections/ContactBanner";
import ContactForm from "./Sections/ContactForm";
import LocationSection from "./Sections/LocationSection";

const Index = ({ data, systemData }: { data: ContactData, systemData: IndividualSystemData[] }) => {
  console.log('systemData', systemData)
  return (
    <>
      <ContactBanner {...data.firstSection} titleMaxWidth="max-w-[22ch]" descriptionMaxWidth="max-w-[62ch]" />
      <LocationSection data={data.secondSection}/>
      <ContactForm systemData={systemData.map((item)=>item.firstSection.title)} title={data.thirdSection.title}/>
    </>
  );
};

export default Index;
