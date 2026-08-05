// ============================================================
// PROJECTS DATA — jswinney.com
// The "add a project" skill appends new entries to the END of
// this array (newest last). The site renders newest-first.
// Schema:
//   id:        unique lowercase slug
//   title:     display title
//   category:  "ai" | "security" | "work" | "cert"
//   date:      display date string (e.g. "Mar 2026")
//   summary:   1-2 sentence description
//   tags:      array of tech/topic tags
//   links:     optional { repo: url, demo: url, verify: url }
// ============================================================
const PROJECTS = [
  {
    id: "splunk-bots-top50",
    title: "Splunk Boss of the SOC — Top 50",
    category: "security",
    date: "2019",
    summary: "Finished in the Top 50 of 1000+ participants in Splunk's premier detection and analysis competition.",
    tags: ["Splunk SPL", "Detection Logic", "Analysis"],
    links: {}
  },
  {
    id: "incident-notification",
    title: "Incident Notification & Response",
    category: "work",
    date: "2023",
    summary: "Led impact assessment and customer coordination for compromised-credential incidents at Criterion Systems — notified 10 customers and prevented credential recycling.",
    tags: ["Incident Response", "Impact Assessment", "Remediation"],
    links: {}
  },
  {
    id: "proactive-threat-hunting",
    title: "Proactive Threat Hunting",
    category: "security",
    date: "2024",
    summary: "MITRE ATT&CK-driven hunting with OSINT and threat intel feeds — identified 12+ adversary TTPs and improved enterprise threat visibility.",
    tags: ["MITRE ATT&CK", "Threat Intel", "OSINT"],
    links: {}
  },
  {
    id: "splunk-rule-tuning",
    title: "Splunk SIEM Rule Tuning",
    category: "security",
    date: "2024",
    summary: "Tuned 5 critical detection rules and built custom dashboards, cutting false positives 60% and improving analyst response time 40%.",
    tags: ["Splunk SPL", "Custom Dashboards", "Alert Tuning"],
    links: {}
  },
  {
    id: "enterprise-threat-detection",
    title: "Enterprise Threat Detection",
    category: "work",
    date: "Current",
    summary: "Monitoring 50+ daily security events across enterprise cloud and on-prem environments at Caterpillar. Real-time event correlation with Splunk, CrowdStrike, and AWS CloudTrail/GuardDuty.",
    tags: ["Splunk", "CrowdStrike", "AWS", "MITRE ATT&CK"],
    links: {}
  },
  {
    id: "cysa-cs0-004",
    title: "CompTIA CySA+ (CS0-004)",
    category: "cert",
    date: "Mar 2026",
    summary: "Passed the CompTIA Cybersecurity Analyst exam — security analytics, threat detection, and incident response across the full attack chain. First entry shipped through my AI intake pipeline.",
    tags: ["Security Analytics", "Threat Detection", "Incident Response"],
    links: {}
  }
];
