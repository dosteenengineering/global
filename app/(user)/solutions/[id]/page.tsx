import ResidentialPage from "@/app/components/client/Services/ResidentialBuildings/Index";
import DefaultServicePageIndex from "@/app/components/client/Services/CommercialBuildings/Index";

export default async function ServicePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  if (id === "residential-developments") {
    return <ResidentialPage />;
  }

  return <DefaultServicePageIndex />;
}
