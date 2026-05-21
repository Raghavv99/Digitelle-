export interface PolicyContent {
  id: string;
  title: string;
  subtitle?: string;
  heroColorFrom?: string;
  heroColorTo?: string;
  lastUpdated: string;
  sections: {
    id: string;
    title: string;
    content: string[];
  }[];
}

export const POLICIES: Record<string, PolicyContent> = {
  "terms-conditions": {
    id: "terms-conditions",
    title: "Terms & Conditions",
    subtitle: "The rules, regulations, and guidelines for using the Digitelle ecosystem.",
    heroColorFrom: "from-blue-500",
    heroColorTo: "to-indigo-500",
    lastUpdated: "May 21, 2026",
    sections: [
      {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        content: [
          "By accessing and using the Digitelle ecosystem, APIs, and plugins, you accept and agree to be bound by the terms and provision of this agreement. Every component of our infrastructure is provided under these robust terms to ensure high fidelity and secure usage."
        ]
      },
      {
        id: "platform-usage",
        title: "2. Platform Usage & Guidelines",
        content: [
          "Our enterprise-grade infrastructure is designed for performance and scale. You agree to use the Digitelle platform only for lawful purposes, and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the platform.",
          "Automated systems, bots, and crawlers must respect our robots.txt and strictly follow our API rate limits. Any actions affecting the uptime or performance of our cloud instances will result in immediate termination."
        ]
      },
      {
        id: "subscription",
        title: "3. Subscriptions & Activations",
        content: [
          "Access to our premium plugins and API infrastructure requires an active subscription or a valid license verification key.",
          "License activations are tracked securely across our edge networks to prevent unauthorized use. Active telemetry is required to validate genuine purchases."
        ]
      },
      {
        id: "prohibited",
        title: "4. Prohibited Usage",
        content: [
          "You are strictly prohibited from reverse-engineering, decompiling, or disassembling any of the Digitelle ecosystem components.",
          "Bypassing our activation layers or attempting to subvert our enterprise licensing checks is a violation of these terms."
        ]
      },
      {
        id: "limitations",
        title: "5. Liability Limitations",
        content: [
          "Digitelle provides its infrastructure \"as is.\" We do not warrant that the functions contained in the material will be uninterrupted or error-free.",
          "Under no circumstances will Digitelle be liable for any incidental, special, or consequential damages resulting from the use or inability to use our platform."
        ]
      }
    ]
  },
  "refund-policy": {
    id: "refund-policy",
    title: "Refund Policy",
    subtitle: "Understanding our exact, immediately accessible digital product delivery and activation systems.",
    heroColorFrom: "from-rose-500",
    heroColorTo: "to-orange-500",
    lastUpdated: "May 21, 2026",
    sections: [
        {
            id: "digital-product",
            title: "1. Nature of Digital Products",
            content: [
                "Digitelle builds state-of-the-art digital infrastructure, plugins, and API services. Due to the exact, immediately accessible nature of these digital assets and activation keys, standard physical return policies do not apply."
            ]
        },
        {
            id: "no-refunds",
            title: "2. No Refunds Provided",
            content: [
                "All sales are final. Once an activation key is issued or a subscription is enabled, the service is considered delivered and consumed.",
                "We do not offer refunds, partial or full, for our enterprise tools, API usage limits, or premium plugin licenses. We strongly recommend evaluating our free tiers and comprehensive documentation prior to making a commitment."
            ]
        },
        {
            id: "exceptions",
            title: "3. Exceptional Circumstances",
            content: [
                "In extremely rare cases, such as fraudulent unauthorized transactions flagged by our payment processors (e.g., Stripe) before any network activation took place, we may evaluate cases at our absolute discretion.",
                "If billing errors occur on our end resulting in overcharges, immediate retroactive adjustments will be made."
            ]
        }
    ]
  },
  "privacy-policy": {
    id: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "Your data, protected through secure modern infrastructure.",
    heroColorFrom: "from-emerald-500",
    heroColorTo: "to-teal-500",
    lastUpdated: "May 10, 2026",
    sections: [
        {
            id: "information-collection",
            title: "1. Information Collection",
            content: [
                "To deliver a premium, seamless experience across our global edge networks, Digitelle collects account information, telemetry data, and minimal diagnostic logs. We capture only what is strictly necessary to authenticate users, maintain secure architecture, and improve application velocity."
            ]
        },
        {
            id: "api-tracking",
            title: "2. API & Infrastructure Tracking",
            content: [
                "Every request traversing our API gateway is actively monitored for security and performance metrics.",
                "We record request origins, latency intervals, error rates, and payload topologies to ensure our services remain highly available and to prevent unauthorized distributed attacks."
            ]
        },
        {
            id: "firebase",
            title: "3. Service Providers & Third Parties",
            content: [
                "We utilize enterprise-grade service providers (such as Google Cloud, Firebase, and Edge computing networks) for database hosting, secure authentication, and real-time synchronization.",
                "Your data is completely encrypted at rest and in transit."
            ]
        }
    ]
  },
  "cookie-policy": {
      id: "cookie-policy",
      title: "Cookie Policy",
      subtitle: "How we utilize encrypted sessions and telemetry to accelerate your experience.",
      heroColorFrom: "from-cyan-500",
      heroColorTo: "to-blue-500",
      lastUpdated: "April 14, 2026",
      sections: [
          {
              id: "cookies",
              title: "1. How We Use Cookies",
              content: [
                  "Digitelle utilizes highly secure, encrypted session cookies critical for the operation of our platform. We use them for authentication state integrity, anti-CSRF measures, and delivering a consistent user session across dynamic serverless environments."
              ]
          },
          {
              id: "analytics",
              title: "2. Tracking and Analytics",
              content: [
                  "We deploy first-party analytics cookies to understand how developers traverse our documentation and interact with the dashboard, enabling us to optimize the user interface and platform latency."
              ]
          }
      ]
  },
  "license-agreement": {
      id: "license-agreement",
      title: "License Agreement",
      subtitle: "Enterprise distribution, usage restrictions, and commercial guidelines.",
      heroColorFrom: "from-purple-500",
      heroColorTo: "to-pink-500",
      lastUpdated: "February 22, 2026",
      sections: [
          {
              id: "grant",
              title: "1. Grant of License",
              content: [
                  "Digitelle grants you a non-exclusive, non-transferable, and highly restricted license to use our proprietary plugins and API integrations strictly in accordance with your chosen subscription tier."
              ]
          },
          {
              id: "redistribution",
              title: "2. Redistribution",
              content: [
                  "You may not redistribute, repackage, or resell any Digitelle-provided assets, code, or activated endpoints. White-labeling our enterprise solutions requires a dedicated Commercial Agreement.",
                  "Sharing activation keys across unverified networks will trigger automated cryptographic revocation."
              ]
          }
      ]
  },
  "acceptable-use": {
      id: "acceptable-use",
      title: "Acceptable Use Policy",
      subtitle: "Strict zero-tolerance guidelines upholding global platform ecosystem integrity.",
      heroColorFrom: "from-red-500",
      heroColorTo: "to-rose-500",
      lastUpdated: "May 21, 2026",
      sections: [
          {
              id: "general",
              title: "1. Ecosystem Integrity",
              content: [
                  "We maintain absolute standards for platform integrity. Any use of the platform that compromises our infrastructure, endpoints, or network is strictly forbidden."
              ]
          },
          {
              id: "prohibited",
              title: "2. Zero-Tolerance Actions",
              content: [
                  "Distributed Denial of Service (DDoS) simulations, load-testing our production endpoints without authorization, distributing malicious payloads, and scraping our private registries will result in an immediate global network ban."
              ]
          }
      ]
  },
  "disclaimer": {
      id: "disclaimer",
      title: "Disclaimer",
      subtitle: "Service stipulations and limits of warranty for the Digitelle platform.",
      heroColorFrom: "from-gray-400",
      heroColorTo: "to-gray-600",
      lastUpdated: "January 1, 2026",
      sections: [
          {
              id: "usage",
              title: "1. Disclaimer of Warranties",
              content: [
                  "The vast Digitelle ecosystem is provided \"as-is\" without warranties of any kind, whether expressed or implied. We do not guarantee continuous, uninterrupted, or perfectly error-free operation."
              ]
          }
      ]
  },
  "security-policy": {
      id: "security-policy",
      title: "Security Policy",
      subtitle: "Enterprise-grade encryption, threat mitigation, and infrastructure defense.",
      heroColorFrom: "from-green-400",
      heroColorTo: "to-emerald-600",
      lastUpdated: "May 21, 2026",
      sections: [
          {
              id: "encryption",
              title: "1. Enterprise Encryption",
              content: [
                  "Digitelle enforces strict AES-256-GCM encryption on all activation payloads, and strictly uses TLS 1.3 across all communication layers. Data at rest in our distributed cloud databases is fully encrypted."
              ]
          },
          {
              id: "infrastructure",
              title: "2. Cloud Protection",
              content: [
                  "We actively utilize WAF (Web Application Firewall) protocols, edge-level caching, and real-time autonomous threat mitigation to secure the platform against modern multi-vector attacks."
              ]
          }
      ]
  },
  "api-usage": {
      id: "api-usage",
      title: "API Usage Policy",
      subtitle: "Rate limits, strict anti-abuse systems, and automated telemetry rules.",
      heroColorFrom: "from-indigo-500",
      heroColorTo: "to-cyan-500",
      lastUpdated: "May 20, 2026",
      sections: [
          {
              id: "limits",
              title: "1. Rate Limits and Quotas",
              content: [
                  "Our API endpoints enforce dynamic algorithm-based rate limiting to ensure fair usage and maximum global availability. Exceeding threshold limits will transparently back-off your requests utilizing standard 429 HTTP responses."
              ]
          },
          {
              id: "abuse",
              title: "2. Abuse Detection",
              content: [
                  "Algorithmic abuse detection constantly monitors the API for unusual polling or brute-force signature attempts. Flagged API accounts will immediately enter a locked, sandboxed state."
              ]
          }
      ]
  },
  "dmca": {
      id: "dmca",
      title: "DMCA Policy",
      subtitle: "Reporting procedures for intellectual property protections.",
      heroColorFrom: "from-blue-400",
      heroColorTo: "to-blue-600",
      lastUpdated: "January 15, 2026",
      sections: [
          {
              id: "reporting",
              title: "1. Copyright Infringement",
              content: [
                  "Digitelle actively respects the intellectual property rights of creators. If you believe your copyrighted material is being infringed upon by content hosted within our ecosystem, please submit a formalized takedown request with verifiable cryptographic proof."
              ]
          }
      ]
  },
  "support": {
      id: "support",
      title: "Support Policy",
      subtitle: "SLAs, issue escalation channels, and premium engineering assistance.",
      heroColorFrom: "from-pink-500",
      heroColorTo: "to-rose-500",
      lastUpdated: "March 30, 2026",
      sections: [
          {
              id: "sla",
              title: "1. Response Times & SLA",
              content: [
                  "We pride ourselves on accelerated engineering support. Pro tier members receive guaranteed 24-hour response SLAs, while our enterprise infrastructure clients receive direct dedicated escalation channels."
              ]
          },
          {
              id: "channels",
              title: "2. Official Channels",
              content: [
                  "Technical issues must be channeled through our dashboard ticket system or our verified secure WhatsApp communication line for rapid resolution. Social media is not monitored for critical system faults."
              ]
          }
      ]
  }
};
