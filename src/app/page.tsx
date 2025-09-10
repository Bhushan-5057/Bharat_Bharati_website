import { lazy, Suspense } from "react";
import IndianFlagLoader from "./components/Loader/IndianFlagLoader";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import OfficeBearersSection from "./components/OfficeBearersSection/OfficeBearersSection";
import NbaSection from "./components/NbaSection/NbaSection";
import AppointmentSection from "./components/AppoinmentSection/AppointmentSection";
import RememberSection from "./components/RememberSection/RememberSection";
import UnifierSection from "./components/UnifierSection/UnifierSection";
import EkBhartiSection from "./components/EkBharatSection/EkBharatSection";
import VisionMissionSection from "./components/VisionMissionSection/VisionMissionSection";
const BannerSection = lazy(() => import("./components/BannerSection/BannerSection"));

export default function Home() {

  return (
    <>
      <Suspense fallback={<IndianFlagLoader />}>
        <BannerSection />
        <RememberSection />
        <UnifierSection />
        <EkBhartiSection />
        <VisionMissionSection />
        <NbaSection />
        <OfficeBearersSection />
        <FeaturesSection />
        <AppointmentSection />
      </Suspense>
    </>

  );
}
