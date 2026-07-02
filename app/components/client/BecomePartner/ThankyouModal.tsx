// import { Check } from "lucide-react";
import PrimaryNoise from "../../common/noise/PrimaryNoise";
import BorderButton from "../../common/BorderButton";

const ThankYouModal = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-hidden">
      <PrimaryNoise/>
      <div className="absolute top-[-20%] right-[-18%] z-10 w-[726px] h-[742px] scale-150 animate-rotate-swing">
        <img src="./assets/images/become-a-partner/thankyou-shape-1.svg" alt=""  />
      </div>
      <div className="absolute bottom-[-40%] left-[-18%] z-10 w-[726px] h-[742px] scale-150 animate-rotate-swing-oposit">
        <img src="./assets/images/become-a-partner/thankyou-shape-2.svg" alt=""  />
      </div>
      <div className="flex flex-col items-center text-center px-6 relative z-2 h-full mt-80">
        <img src={"./assets/logos/logo-white-full.png"}   className="h-[61px] w-auto mb-100 xl:mb-120 2xl:mb-150 3xl:mb-[261px]" />
        <h2 className="text-90 font-bold uppercase text-white leading-[1.111111111111111] text-secondary font-helvetica mb-20 translate-y-[-20px]">
        Thank You!
      </h2>
        <p className="text-paragraph text-30 leading-[1.333333333333333] max-w-[47.5ch] text-white font-light mb-50">
          Your application has been received. Our procurement <br/> team will review it within 5–7 working days and contact you.” 
      </p>
        <BorderButton text="GO TO HOME PAGE" href="/" iconColor="white" hoverBg="white" className="2xl:px-[35px] 2xl:!py-[17.5px] [&_img]:!h-[18px] [&_img]:!w-[18px]" />
      </div>
    </div>
  );
};

export default ThankYouModal;
