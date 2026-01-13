"use client"

import { motion } from "framer-motion";
import { Mail, Github, MapPin } from "lucide-react";
import { BentoBox } from "./BentoGrid";

export default function ContactWidget() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      href: "mailto:contact@lonut.dev",
      display: "contact@lonut.dev",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/ionutcnu",
      display: "@ionutcnu",
      external: true,
    },
    {
      icon: MapPin,
      label: "Location",
      display: "Romania",
    },
  ];

  return (
    <BentoBox span={1}>
      <h3 className="mb-1.5 flex items-center gap-2 text-sm font-semibold">
        <Mail size={14} className="text-accent-dynamic" />
        Let&apos;s Connect
      </h3>
      <p className="mb-2 text-xs text-muted-foreground">
        Always open to interesting projects and conversations.
      </p>
      <div className="space-y-1">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-1.5 text-xs"
            >
              <Icon size={12} className="text-accent-dynamic/70" />
              {contact.href ? (
                <a
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className="text-foreground hover:text-accent-dynamic transition-colors duration-200"
                >
                  {contact.display}
                </a>
              ) : (
                <span className="text-muted-foreground">{contact.display}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </BentoBox>
  );
}
