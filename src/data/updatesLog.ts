export interface UpdateLog {
  id: string;
  version: string;
  deploymentDate: string;
  author: string;
  environment: 'production' | 'staging' | 'hotfix';
  summary: string;
  modifications: {
    type: 'feature' | 'patch' | 'security' | 'deprecate';
    scope: string;
    description: string;
  }[];
}

export const updatesRegistry: UpdateLog[] = [
  {
    id: "v-1-1-2",
    version: "v1.1.2",
    deploymentDate: "2026-06-08 11:15 AM",
    author: "LEAD_DEV",
    environment: "production",
    summary: "Optimized workspace components for dense mobile device contexts and touch ergonomics.",
    modifications: [
      {
        type: "patch",
        scope: "Category Creation Interface",
        description: "Re-engineered the admin folder creation sub-toolbar with a responsive vertical-to-horizontal flex arrangement, preventing UI crunching and text overflow on narrow viewports."
      },
      {
        type: "patch",
        scope: "Mobile Form Action Targets",
        description: "Expanded Save and Cancel CTA triggers to scale symmetrically to full screen-width containers on micro-viewports, optimizing tactile tap targets."
      }
    ]
  },
  {
    id: "v-1-1-1",
    version: "v1.1.1",
    deploymentDate: "2026-06-08 10:45 AM",
    author: "LEAD_DEV",
    environment: "production",
    summary: "Refined repository action pipelines with enhanced modal safety flows and structural runtime code sanitization.",
    modifications: [
      {
        type: "feature",
        scope: "Isolated Asset Retrieval",
        description: "Introduced a dedicated single-file intercept tracking state mapping individual download streams to interactive confirmation confirmation modals."
      },
      {
        type: "patch",
        scope: "User Management Lifecycle Hook",
        description: "Purged redundant diagnostic monitoring loops, runtime loop console expressions, and fixed typos across state-handling block definitions."
      },
      {
        type: "security",
        scope: "Production Compilation Audit",
        description: "Stripped verbal standard output string logs from client hooks to secure state transaction telemetry fields across administrative directory layouts."
      }
    ]
  },
  {
    id: "v-1-1-0",
    version: "v1.1.0",
    deploymentDate: "2026-06-08 10:30 AM",
    author: "LEAD_DEV",
    environment: "production",
    summary: "Implemented the centralized system tracking ledger alongside structural optimization adaptations for mobile user experiences.",
    modifications: [
      { 
        type: "feature", 
        scope: "System Ledger", 
        description: "Introduced dedicated app routing for tracking product history, platform optimizations, and versioning sequences." 
      },
      { 
        type: "feature", 
        scope: "Bulk Retrieve Confirmation", 
        description: "Integrated an analytical interception modal window verifying structural metrics, weight parameters, and individual asset metadata lists before initializing multi-file ZIP compilations." 
      },
      { 
        type: "patch", 
        scope: "FileBank Viewport Layout", 
        description: "Resolved critical layout grid squeezing on miniature glass screens by introducing independent layout sliding tracking coordinates." 
      }
    ]
  }
];