import { lazy, Suspense } from "react";
import IndianFlagLoader from "./components/Loader/IndianFlagLoader";
import SocialIcons from "./components/SocialIcons/SocialIcons";

const BannerSection = lazy(() => import("./components/BannerSection/BannerSection"));
const FeaturesSection = lazy(() => import("./components/FeaturesSection/FeaturesSection"));
const OfficeBearersSection = lazy(() => import("./components/OfficeBearersSection/OfficeBearersSection"));
const NbaSection = lazy(() => import("./components/NbaSection/NbaSection"));
const AppointmentSection = lazy(() => import("./components/AppoinmentSection/AppointmentSection"));
const RememberSection = lazy(() => import("./components/RememberSection/RememberSection"));
const UnifierSection = lazy(() => import("./components/UnifierSection/UnifierSection"));
const EkBhartiSection = lazy(() => import("./components/EkBharatSection/EkBharatSection"));
const VisionMissionSection = lazy(() => import("./components/VisionMissionSection/VisionMissionSection"));

export default function Home() {
  return (
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
      <SocialIcons />
    </Suspense>
  );
}
