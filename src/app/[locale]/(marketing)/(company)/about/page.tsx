import { UsersIcon } from "lucide-react";

import { constructMetadata } from "@/lib/utils";
import CustomButton from "@/components/shared/custom-button";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Section } from "@/components/shared/section";

export const metadata = constructMetadata({
  title: "About us",
  description:
    "Learn about our mission to create meaningful digital experiences through minimalist design principles.",
  image: "/api/og?heading=About us",
});

const principles = [
  {
    number: "01",
    title: "Good design is innovative",
    description:
      "We push boundaries while maintaining focus on solving real problems.",
  },
  {
    number: "02",
    title: "Good design makes a product useful",
    description:
      "We prioritize functionality and user experience in every project.",
  },
  {
    number: "03",
    title: "Good design is aesthetic",
    description:
      "We create beautiful solutions that enhance the user experience.",
  },
  {
    number: "04",
    title: "Good design makes a product understandable",
    description: "We design intuitive interfaces that explain themselves.",
  },
  {
    number: "05",
    title: "Good design is unobtrusive",
    description:
      "Our designs serve their purpose without unnecessary decoration.",
  },
  {
    number: "06",
    title: "Good design is honest",
    description: "We create transparent solutions that never mislead users.",
  },
  {
    number: "07",
    title: "Good design is long-lasting",
    description: "We avoid trendy gimmicks in favor of timeless solutions.",
  },
  {
    number: "08",
    title: "Good design is thorough down to the last detail",
    description: "We pay attention to every aspect of the user experience.",
  },
  {
    number: "09",
    title: "Good design is environmentally friendly",
    description:
      "We create sustainable digital solutions that minimize resource usage.",
  },
  {
    number: "10",
    title: "Good design is as little design as possible",
    description:
      "We focus on the essential aspects, removing the non-essential.",
  },
];

export default function About() {
  return (
    <MaxWidthWrapper page>
      <Section
        title="About Us"
        tag="h1"
        text="We are a design agency guided by Dieter Rams' principles of good design. 
              Our mission is to create digital experiences that are innovative, useful, 
              and environmentally friendly."
        link="/contact"
        linkText="Work with us"
      />

      {/* Mission Section */}
      <Section grid="2">
        <Section
          title="Our Mission"
          tag="h2"
          text="To create digital experiences that embody the principles of good design: clarity, honesty, and sustainability. We believe that less is more, and that the best design solutions are those that solve problems without creating new ones."
        />
        <Section
          title="Our Vision"
          tag="h2"
          text="A digital world where every interface is intuitive, every interaction is meaningful, and every design decision serves a purpose. We envision technology that enhances human life without complicating it."
        />
      </Section>

      {/* Principles Section */}
      <Section title="Our Design Principles" tag="h2" grid="2">
        {principles.map((principle) => (
          <div key={principle.number} className="space-y-4">
            <div className="text-dark-500 text-sm dark:text-gray-400">
              {principle.number}
            </div>
            <Section
              title={principle.title}
              tag="h3"
              text={principle.description}
            />
          </div>
        ))}
      </Section>

      {/* Values Section */}
      <Section title="Our Values" tag="h2" grid="3">
        <Section
          title="Simplicity"
          tag="h3"
          text="We believe in the power of reduction. Every element must serve a purpose."
        />
        <Section
          title="Sustainability"
          tag="h3"
          text="Our designs consider their environmental impact and long-term viability."
        />
        <Section
          title="Innovation"
          tag="h3"
          text="We push boundaries while staying true to fundamental design principles."
        />
      </Section>

      {/* Others Section */}
      <Section title="More about us" tag="h2" grid="2">
        <Section
          title="Meet the team"
          tag="h3"
          text="Meet the team behind our design agency. We're a small team of designers and developers who are passionate about creating beautiful and functional digital experiences."
          link="/team"
          linkText="Our Team"
          border
          button
        />
        <Section
          title="Work Together"
          tag="h3"
          text="Share your ideas during a focused 30-minute consultation where we'll explore your requirements and outline potential solutions for your project."
          link="/discovery"
          linkText="Book a free discovery call"
          border
          button
        />
      </Section>
    </MaxWidthWrapper>
  );
}
