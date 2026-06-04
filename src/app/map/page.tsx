import { Suspense } from "react";
import { MapHero } from "@/features/map-search/components/map-hero";

const page = () => {
  return (
    <Suspense fallback={<div>Loading map...</div>}>
      <MapHero />
    </Suspense>
  );
};

export default page;
