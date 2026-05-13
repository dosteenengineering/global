"use client";
import Image from "next/image";
import SectionTitle from "@/app/components/common/animations/SectionTitle";
import { useEffect, useRef, useState } from "react";
type SystemRow = {
  id: number;
  division: string;
  category: string;
  sectionNumber: string;
  sectionTitle: string;
  system: string;
};

type Props = {
  data: {
    title: string;
    tableData: SystemRow[];
  };
};

const Systems = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rightSpace, setRightSpace] = useState(0);

  useEffect(() => {
    const updateSpacing = () => {
      if (containerRef.current) {
        const leftGap =
          containerRef.current.getBoundingClientRect().left;

        setRightSpace(leftGap);
      }
    };

    updateSpacing();


    window.addEventListener("resize", updateSpacing);

    return () => {
      window.removeEventListener("resize", updateSpacing);
    };
  }, []);

  return (
    <section className="bg-white w-full relative select-none overflow-hidden pb-140 3xl:pb-200 pt-100">
      {/* Normal Tailwind container */}
      <div ref={containerRef} className="container px-[16px] mx-auto" />
      <div className="absolute top-2 xl:-top-8 -left-1 pointer-events-none">
        <Image src="/assets/icons/bg-svg/top-left-animated.svg"
          alt="decorative lines" width={600} height={500} className="object-contain 2xl:w-[500px] 3xl:w-[600px]" />
      </div>

      <div className="max-w-[1252px] ml-auto px-[16px] 2xl:px-0" style={{ marginRight: `${rightSpace+16}px` }}>
        <SectionTitle text={data.title} className="section-heading text-secondary uppercase mb-50" />
        {/* <div className="text-paragraph text-description mb-100" dangerouslySetInnerHTML={{ __html: data.description }} /> */}

        <div>
          <div>
            <table className="w-full border-collapse border border-[#D9D9D9]">
              <thead>
                <tr className="bg-[#F3F5FB]">
                  <th className="w-[33.33%] border-r border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-30 font-light text-primary leading-[1.333333333333333]">
                    Division
                  </th>

                  <th className="w-[33.33%] border-r border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-30 font-light text-primary leading-[1.333333333333333]">
                    Section Number & Title
                  </th>

                  <th className="w-[33.33%] border-b border-[#D9D9D9] px-2 md:px-30 py-[16px] xl:py-[26px] text-left text-30 font-light text-primary leading-[1.333333333333333]">
                    Dosteen System
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.tableData.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b border-[#D9D9D9] last:border-b-0"
                  >
                    {/* Division */}
                    <td className="border-r border-[#D9D9D9] px-2 md:p-30 align-top">
                      <h3 className="text-[14px] md:text-30 leading-[1.333333333333333] font-light text-[#202020]">
                        {item.division}
                      </h3>

                      <p className="mt-[10px] text-19 leading-[1.526315789473684] font-light text-[#7B7B7B]">
                        {item.category}
                      </p>
                    </td>

                    {/* Section */}
                    <td className="border-r border-[#D9D9D9] px-2 md:p-30 align-top">
                      <h3 className="text-[18px] md:text-30 leading-[1.333333333333333] font-light text-[#202020]">
                        {item.sectionNumber}
                      </h3>

                      <p className="mt-[10px] text-19 leading-[1.526315789473684] font-light text-[#7B7B7B]">
                        {item.sectionTitle}
                      </p>
                    </td>

                    {/* System */}
                    <td className="px-2 md:p-30 align-top">
                      <p className="text-19 leading-[1.526315789473684] font-light text-[#7B7B7B]">
                        {item.system}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Systems;