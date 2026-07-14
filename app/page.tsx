import { Hero } from "@/components/Hero";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { VehicleCategories } from "@/components/VehicleCategories";
import { FourSteps } from "@/components/FourSteps";
import { BookNow } from "@/components/BookNow";
import { AboutUs } from "@/components/AboutUs";
import { Customers } from "@/components/Customers";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <VehicleCategories />
      <FourSteps />
      <BookNow />
      <AboutUs />
      <Customers />
      <FAQ />
    </>
  );
}
