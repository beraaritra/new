"use client"; // This is a client component 👈🏽
import { useSearchParams } from "next/navigation";
import "aos/dist/aos.css"; // Import AOS CSS
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import HeroBanner from "@/components/heroBanner/HeroBanner";
import SatisfiedClientSlider from "@/components/satisfiedClientSlider/SatisfiedClientSlider";
// import Service from "@/components/services/Service";
import Client from "@/components/clientComponent/Client";
import Agency from "@/components/agencyComponent/Agency";
import Business from "@/components/businessComponent/Business";
import Freecall from "@/components/freecallComponent/Freecall";
import Accountingsystem from "@/components/accountingsystemComponent/Accountingsystem";
import { Whychoose } from "@/components/whychooseComponent/Whychoose";

export default function Page() {
  const serviceSectionRef = useRef(null);
  const testimonialsSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Adjust the duration as needed
      once: true, // Ensure animations can happen multiple times
    });

    const handleRouteChange = () => {
      AOS.refresh();
    };

    window.addEventListener("scroll", handleRouteChange);

    // Check for hash in URL and scroll to the corresponding section
    if (
      window.location.hash === "#services_section" &&
      serviceSectionRef.current
    ) {
      serviceSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (
      window.location.hash === "#testimonials_section" &&
      testimonialsSectionRef.current
    ) {
      testimonialsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }

    return () => {
      window.removeEventListener("scroll", handleRouteChange);
    };
  }, []);

  const searchParams = useSearchParams();

  const source = searchParams.get("p_source");
  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");

  console.log(
    "source",
    source,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content
  );

  return (
    <>
      <HeroBanner />
      {/* Attach the ref to the Service section */}
      {/* <div ref={serviceSectionRef}>
        <Service />
      </div> */}

      <div>
        <Client />
      </div>
      <div>
        <Agency />
      </div>
      <div>
        <Business />
      </div>
      <div>
        <SatisfiedClientSlider />
      </div>
      <div>
        <Freecall />
      </div>
      <div>
        <Whychoose />
      </div>
      <div>
        <Accountingsystem />
      </div>

      {/* Attach the ref to the SatisfiedClientSlider (Testimonials) section */}

      {/* <FloatingButton /> */}
    </>
  );
}
