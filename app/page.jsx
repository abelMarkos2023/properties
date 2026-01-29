import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import connectDB from "@/config/connectDB";
import Image from "next/image";

export default async function Home() {

  await connectDB();
  return (
    <div className="">
    <Hero />
    <InfoBoxes />
    <FeaturedProperties />
    <HomeProperties />
    </div>
  );
}
