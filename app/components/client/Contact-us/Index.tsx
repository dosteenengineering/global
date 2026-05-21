import { banner } from "./data";
import ContactBanner from "./Sections/ContactBanner";
import ContactForm from "./Sections/ContactForm";
import LocationSection from "./Sections/LocationSection";

const Index = () => {
  return (
    <>
      <ContactBanner {...banner} titleMaxWidth="max-w-[22ch]" descriptionMaxWidth="max-w-[62ch]" />
      <LocationSection />
      <ContactForm />
    </>
  );
};

export default Index;
