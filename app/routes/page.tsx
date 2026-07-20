import { OurRoutesPage } from "@/components/OurRoutesPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transfer Routes | Transfer Website",
  description: "View available transfer routes and pricing.",
};

export default function RoutesPage() {
  return (
    <main>
      <OurRoutesPage />
    </main>
  );
}
