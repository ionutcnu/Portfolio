"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { BentoBox } from "./BentoGrid";

export default function IntroWidget() {
  return (
    <BentoBox span={2} className="sm:col-span-2 lg:col-span-2">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-accent-dynamic shadow-lg"
          >
            <Image
              src="https://avatars.githubusercontent.com/u/25122138?v=4"
              alt="Ionut"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold md:text-4xl">
              Hey! I&apos;m{" "}
              <span className="bg-gradient-to-r from-accent-dynamic to-blue-600 bg-clip-text text-transparent">
                Ionut
              </span>
            </h1>
            <div className="mt-2 inline-flex items-center rounded-full border border-accent-dynamic/20 bg-accent-dynamic/5 px-3 py-1">
              <span className="text-xs font-medium text-foreground">
                QA → Product Thinker | Available for PO/BA roles
              </span>
            </div>
          </div>
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground md:text-base">
          Think like a user. Plan like a product owner. Build like a team. I&apos;m the person who asks{" "}
          <span className="font-medium text-foreground">&apos;why&apos;</span> before{" "}
          <span className="font-medium text-foreground">&apos;how&apos;</span>.
          I see the complete picture: user needs, business goals, and technical constraints.
        </p>
      </div>
    </BentoBox>
  );
}
