// Real control domains per framework, sourced from the actual published
// standards. Replaces the placeholder A.1-A.8 generic control set that
// was previously shown identically on every framework regardless of
// which one was selected.

export interface TrmControl {
  id: string;
  name: string;
  description: string;
}

export const TRM_CONTROLS: Record<string, TrmControl[]> = {
  cobit: [
    { id: 'EDM', name: 'Evaluate, Direct and Monitor', description: 'Governance objectives — board-level oversight of IT value, risk and resource optimisation.' },
    { id: 'APO', name: 'Align, Plan and Organize', description: 'Strategy, architecture, and organisational structure for IT.' },
    { id: 'BAI', name: 'Build, Acquire and Implement', description: 'Solution delivery, change management, and project governance.' },
    { id: 'DSS', name: 'Deliver, Service and Support', description: 'Operations, service requests, security, and business continuity.' },
    { id: 'MEA', name: 'Monitor, Evaluate and Assess', description: 'Performance, internal control, and regulatory compliance monitoring.' },
  ],
  iso27001: [
    { id: 'A.5', name: 'Organizational Controls', description: 'Policies, roles, and responsibilities for information security.' },
    { id: 'A.6', name: 'People Controls', description: 'Screening, training, and terms of employment relevant to security.' },
    { id: 'A.7', name: 'Physical Controls', description: 'Physical entry, equipment, and secure disposal.' },
    { id: 'A.8', name: 'Technological Controls', description: 'Access control, cryptography, logging, and secure development.' },
  ],
  nistcsf: [
    { id: 'ID', name: 'Identify', description: 'Understand the organisation\'s assets, risks, and cybersecurity posture.' },
    { id: 'PR', name: 'Protect', description: 'Safeguards to limit or contain the impact of a security event.' },
    { id: 'DE', name: 'Detect', description: 'Activities to identify the occurrence of a security event.' },
    { id: 'RS', name: 'Respond', description: 'Actions taken once an incident is detected.' },
    { id: 'RC', name: 'Recover', description: 'Restore capabilities impaired by a security incident.' },
  ],
  cis: [
    { id: '1-2', name: 'Asset & Software Inventory', description: 'Know what hardware and software is on the network.' },
    { id: '3-4', name: 'Data Protection & Secure Configuration', description: 'Classify data and harden system configurations.' },
    { id: '5-6', name: 'Account & Access Control Management', description: 'Manage credentials and enforce least privilege.' },
    { id: '7-8', name: 'Vulnerability Management & Audit Logging', description: 'Continuously assess weaknesses and retain audit trails.' },
    { id: '9-11', name: 'Email/Browser, Malware & Recovery', description: 'Protect endpoints and maintain tested data recovery.' },
    { id: '12-14', name: 'Network Management & Awareness Training', description: 'Secure network infrastructure and train staff.' },
    { id: '15-18', name: 'Service Providers, App Security & Incident Response', description: 'Vendor risk, secure development, and tested incident response.' },
  ],
  soc2: [
    { id: 'SEC', name: 'Security', description: 'The system is protected against unauthorised access, the common criteria required for every SOC 2 report.' },
    { id: 'AVL', name: 'Availability', description: 'The system is available for operation and use as committed or agreed.' },
    { id: 'PI', name: 'Processing Integrity', description: 'System processing is complete, valid, accurate, timely, and authorised.' },
    { id: 'CON', name: 'Confidentiality', description: 'Information designated as confidential is protected as committed or agreed.' },
    { id: 'PRIV', name: 'Privacy', description: 'Personal information is collected, used, retained, and disposed of appropriately.' },
  ],
  pdpa: [
    { id: '1', name: 'Consent Obligation', description: 'Obtain valid consent before collecting, using, or disclosing personal data.' },
    { id: '2', name: 'Purpose Limitation', description: 'Only collect data for purposes a reasonable person would consider appropriate.' },
    { id: '3', name: 'Notification Obligation', description: 'Notify individuals of the purpose for data collection.' },
    { id: '4', name: 'Access & Correction', description: 'Provide individuals access to, and the ability to correct, their data.' },
    { id: '5', name: 'Protection Obligation', description: 'Reasonable security arrangements to protect personal data.' },
    { id: '6', name: 'Retention Limitation', description: 'Cease retention when no longer necessary for the purpose collected.' },
    { id: '7', name: 'Data Breach Notification', description: 'Notify PDPC and affected individuals of notifiable breaches.' },
  ],
  gdpr: [
    { id: 'A5', name: 'Lawfulness, Fairness & Transparency', description: 'Process personal data lawfully, fairly, and transparently (Art. 5).' },
    { id: 'A5.1', name: 'Purpose & Storage Limitation', description: 'Collect for specified purposes; retain no longer than necessary.' },
    { id: 'A5.2', name: 'Data Minimisation & Accuracy', description: 'Process only what\'s adequate and relevant; keep data accurate.' },
    { id: 'A32', name: 'Security of Processing', description: 'Appropriate technical and organisational measures (Art. 32).' },
    { id: 'A15-22', name: 'Data Subject Rights', description: 'Access, rectification, erasure, portability, and objection rights.' },
  ],
};

export function generateRealControls(frameworkId: string, coverage: number) {
  const list = TRM_CONTROLS[frameworkId];
  if (!list) return [];
  return list.map((c, i) => {
    const threshold = 40 + ((i * 37) % 45);
    const status: 'met' | 'partial' | 'missing' =
      coverage >= threshold + 15 ? 'met' : coverage >= threshold - 10 ? 'partial' : 'missing';
    return { id: c.id, name: c.name, description: c.description, status };
  });
}
