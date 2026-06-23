import { banner, ContactData } from "./data";
import ContactBanner from "./Sections/ContactBanner";
import ContactForm from "./Sections/ContactForm";
import LocationSection from "./Sections/LocationSection";

const Index = ({data}:{data:ContactData}) => {
  return (
    <>
      <ContactBanner {...data.firstSection} titleMaxWidth="max-w-[22ch]" descriptionMaxWidth="max-w-[62ch]" />
      <LocationSection data={data.secondSection}/>
      <ContactForm />
    </>
  );
};

export default Index;
