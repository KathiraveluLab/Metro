// KathiraveluLab Metro Map - Data Model
// Mapping public repositories and research publication trajectories across KathiraveluLab

const METRO_DATA = {
  lab: {
    name: "KathiraveluLab",
    institution: "University of Alaska Anchorage & Global Collaborators",
    lead: "Pradeeban Kathiravelu, Ph.D.",
    githubUrl: "https://github.com/KathiraveluLab",
    websiteUrl: "https://kathiravelulab.github.io/",
    description: "Distributed Systems, Network Optimization, Healthcare Informatics, Autonomous AI Guardrails, and Community Science."
  },
  lines: [
    {
      id: "line-soa",
      name: "Line 1: Service-Oriented & Distributed Middleware",
      shortName: "SOA & Middleware",
      color: "#0284c7", // Sky/Cyan Blue
      accentColor: "#38bdf8",
      bgClass: "bg-cyan",
      description: "Foundational service composition, closed-loop neuromodulation control, and distributed interoperability middleware."
    },
    {
      id: "line-net",
      name: "Line 2: Network Transport & Edge Infrastructure",
      shortName: "Network & Edge",
      color: "#d97706", // Amber Gold
      accentColor: "#fbbf24",
      bgClass: "bg-amber",
      description: "Software-defined networking, bandwidth orchestration, low-latency transport, and edge simulation."
    },
    {
      id: "line-health",
      name: "Line 3: Healthcare & Biomedical Informatics",
      shortName: "Healthcare Informatics",
      color: "#059669", // Emerald Green
      accentColor: "#34d399",
      bgClass: "bg-emerald",
      description: "DICOM machine learning pipelines, behavioral health data federation, clinical telemetry, and remote telehealth."
    },
    {
      id: "line-trust",
      name: "Line 4: Autonomous Systems & Decentralized Trust",
      shortName: "Autonomous Trust & AI",
      color: "#7c3aed", // Royal Purple
      accentColor: "#a78bfa",
      bgClass: "bg-purple",
      description: "Zero-knowledge proofs, off-chain state channels, neural guardrails, and intent-based multi-agent architecture."
    },
    {
      id: "line-community",
      name: "Line 5: Community Informatics & Indigenous Computing",
      shortName: "Community & Indigenous",
      color: "#e11d48", // Crimson / Coral
      accentColor: "#fb7185",
      bgClass: "bg-rose",
      description: "Alaska Native epidemic history mapping, Indigenous heritage preservation, and mining for societal well-being."
    },
    {
      id: "line-shuttle",
      name: "Runtime Shuttle: High-Performance Workflow Engines",
      shortName: "Workflow & Runtimes",
      color: "#475569", // Slate
      accentColor: "#94a3b8",
      bgClass: "bg-slate",
      dashed: true,
      description: "Next-gen execution runtimes, task graph composers, and near-duplicate big data detection in Mojo, Rust, and Go."
    }
  ],
  stations: [
    // --- Line 1: SOA & Middleware (Blue) ---
    {
      id: "control-core",
      number: 1,
      name: "CONTROL-CORE",
      subtitle: "Peripheral Neuromodulation",
      lines: ["line-soa"],
      x: 160,
      y: 160,
      isMajorHub: true,
      repos: ["concore", "concore-editor", "concore-Mediator"],
      primaryRepo: "concore",
      tech: ["SWIG", "Python", "C++", "JavaScript"],
      venues: [
        { name: "IEEE Access 2021", tier: "Q1", note: "Closed-loop neuromodulation framework" },
        { name: "IEEE Access 2022", tier: "Q1", note: "Peripheral nerve stimulation control" },
        { name: "Springer Cluster Computing 2025", tier: "Q1", note: "Distributed neuromodulation simulation" }
      ],
      description: "Framework for closed-loop peripheral neuromodulation control systems. Integrates simulated neuro-stimulators with real-time feedback loops and modular editors."
    },
    {
      id: "evora",
      number: 2,
      name: "Évora",
      subtitle: "Edge Service Chains",
      lines: ["line-soa"],
      x: 300,
      y: 160,
      isMajorHub: false,
      repos: ["Evora"],
      primaryRepo: "Evora",
      tech: ["Java", "SDN"],
      venues: [
        { name: "ETT 2018", tier: "Q2", note: "Trans. Emerging Tel. Tech." }
      ],
      description: "Composing resilient, adaptive network service chains at the edge using software-defined networking concepts."
    },
    {
      id: "sd-cps",
      number: 3,
      name: "SD-CPS",
      subtitle: "Software-Defined CPS",
      lines: ["line-soa"],
      x: 430,
      y: 160,
      isMajorHub: false,
      repos: ["SD-CPS"],
      primaryRepo: "SD-CPS",
      tech: ["Java", "Cyber-Physical"],
      venues: [
        { name: "IEEE CLUSTER 2018", tier: "Q2", note: "CPS Architecture" }
      ],
      description: "Software-Defined Cyber-Physical Systems middleware extending SDN principles to sensor and actuator control planes."
    },
    {
      id: "sofia",
      number: 4,
      name: "SOFIA",
      subtitle: "Federated Interop",
      lines: ["line-soa"],
      x: 560,
      y: 160,
      isMajorHub: false,
      repos: ["SOFIA"],
      primaryRepo: "SOFIA",
      tech: ["Erlang", "Distributed Systems"],
      venues: [
        { name: "Systems Lab Track 2026", tier: "Lab Flagship", note: "Erlang Service Mesh" }
      ],
      description: "Service-Oriented Federated Interoperability Architecture written in Erlang for fault-tolerant microservice synchronization across heterogeneous clusters."
    },
    {
      id: "guarda",
      number: 5,
      name: "GUARDA",
      subtitle: "Uniform Data Gateway",
      lines: ["line-soa", "line-shuttle"],
      x: 690,
      y: 160,
      isMajorHub: true,
      repos: ["GUARDA"],
      primaryRepo: "GUARDA",
      tech: ["Elixir", "REST / GraphQL"],
      venues: [
        { name: "Edge API Track 2026", tier: "Lab Flagship", note: "Fault-Tolerant Gateways" }
      ],
      description: "Gateway for Uniform Access to Remote Data and Analytics built with Elixir/OTP, serving high-throughput concurrent telemetry streams."
    },
    {
      id: "viseu",
      number: 6,
      name: "Viseu",
      subtitle: "Edge Services Hub",
      lines: ["line-soa", "line-net"],
      x: 800,
      y: 380,
      isMajorHub: true,
      isInterchange: true,
      repos: ["Viseu"],
      primaryRepo: "Viseu",
      tech: ["Java", "Edge Middleware"],
      venues: [
        { name: "Computer Networks (COMNET) 2022", tier: "Q1", note: "Virtual Internet Services at the Edge" }
      ],
      description: "Major transfer hub bridging Service-Oriented Architecture with Network Optimization. Orchestrates virtual Internet services on resource-constrained edge gateways."
    },

    // --- Line 2: Network Transport & Edge Infrastructure (Amber) ---
    {
      id: "sendim",
      number: 7,
      name: "SENDIM",
      subtitle: "Cloud Simulation & Emulation",
      lines: ["line-net"],
      x: 160,
      y: 380,
      isMajorHub: false,
      repos: ["SENDIM"],
      primaryRepo: "SENDIM",
      tech: ["Java", "Cloud Simulation"],
      venues: [
        { name: "CoopIS 2016", tier: "A", note: "Cloud Network Simulation Middleware" }
      ],
      description: "Simulation, Emulation, and Deployment Integration Middleware for scalable cloud networks and multi-datacenter topologies."
    },
    {
      id: "netuber",
      number: 8,
      name: "NetUber",
      subtitle: "Software-Defined Internet",
      lines: ["line-net"],
      x: 350,
      y: 380,
      isMajorHub: false,
      repos: ["NetUber"],
      primaryRepo: "NetUber",
      tech: ["Java", "SDN"],
      venues: [
        { name: "Networking 2018", tier: "A", note: "Software-Defined Internet Routing" },
        { name: "CCPE 2019", tier: "Q2", note: "Concurrency & Computation" }
      ],
      description: "Dynamic software-defined routing infrastructure optimizing end-to-end transport across autonomous system boundaries."
    },
    {
      id: "l4sboa",
      number: 9,
      name: "L4SBOA",
      subtitle: "Bandwidth Orchestration",
      lines: ["line-net"],
      x: 970,
      y: 380,
      isMajorHub: false,
      repos: ["L4SBOA"],
      primaryRepo: "L4SBOA",
      tech: ["Python", "L4S", "eBPF / TC"],
      venues: [
        { name: "IEEE CCECE 2025", tier: "C", note: "Low-Latency Low-Loss Scalable Throughput" },
        { name: "Google Summer of Code 2024", tier: "GSoC", note: "Bandwidth Management in Alaska" }
      ],
      description: "L4S Bandwidth Orchestration Architecture designed to eradicate bufferbloat and guarantee ultra-low latency for interactive remote services."
    },
    {
      id: "can",
      number: 10,
      name: "CAN",
      subtitle: "Content-Aware Networking",
      lines: ["line-net", "line-shuttle"],
      x: 1120,
      y: 380,
      isMajorHub: false,
      repos: ["CAN"],
      primaryRepo: "CAN",
      tech: ["Rust", "Zero-Copy"],
      venues: [
        { name: "Edge Systems Track 2026", tier: "High-Performance", note: "Rust Packet Pipeline" }
      ],
      description: "Content-Aware Networking engine written in Rust for zero-copy payload inspection, selective edge caching, and semantic flow steering."
    },
    {
      id: "faultsim",
      number: 11,
      name: "faultsim",
      subtitle: "Cluster Failure Detector",
      lines: ["line-net"],
      x: 1260,
      y: 380,
      isMajorHub: false,
      repos: ["faultsim"],
      primaryRepo: "faultsim",
      tech: ["Rust", "Distributed Consensus"],
      venues: [
        { name: "Distributed Systems Track 2026", tier: "Lab Flagship", note: "Failure Detection Under Instability" }
      ],
      description: "A Rust simulator benchmark for failure detection algorithms in distributed clusters subject to extreme packet loss and jitter."
    },
    {
      id: "sintra",
      number: 12,
      name: "Sintra",
      subtitle: "Self-Adaptive Transport",
      lines: ["line-net", "line-health"],
      x: 1460,
      y: 500,
      isMajorHub: true,
      isInterchange: true,
      repos: ["Sintra", "sintra-plot"],
      primaryRepo: "Sintra",
      tech: ["Python", "Internet Measurements"],
      venues: [
        { name: "Springer Cluster Computing 2025", tier: "Q1", note: "Telehealth Network Measurements" },
        { name: "IEEE SDS 2023", tier: "Best Paper Track", note: "Remote Internet Optimization" },
        { name: "CCGrid QUICK 2024", tier: "Workshop", note: "Polar Science Distributed Computing" }
      ],
      description: "Grand Terminus and interchange bridging Network Transport with Clinical Telehealth. Continuously maps global latency paths and optimizes edge tunnels for underserved polar regions."
    },

    // --- Line 3: Healthcare & Biomedical Informatics (Emerald) ---
    {
      id: "obidos",
      number: 13,
      name: "Óbidos",
      subtitle: "Big Data Integration",
      lines: ["line-health"],
      x: 160,
      y: 620,
      isMajorHub: false,
      repos: ["Obidos", "MEDIator"],
      primaryRepo: "Obidos",
      tech: ["Java", "ETL", "Data Federation"],
      venues: [
        { name: "CoopIS 2015", tier: "A", note: "On-Demand Big Data ETL" },
        { name: "DAPD 2019", tier: "Q2", note: "Distributed & Parallel Databases" }
      ],
      description: "Pioneering hybrid ETL framework for reproducible biomedical science, federating large-scale research repositories across institutional borders."
    },
    {
      id: "niffler",
      number: 14,
      name: "Niffler",
      subtitle: "DICOM ML Pipelines",
      lines: ["line-health"],
      x: 360,
      y: 620,
      isMajorHub: true,
      repos: ["Niffler", "Diomede", "DWiM", "MRIQC"],
      primaryRepo: "Niffler",
      tech: ["Python", "DICOM", "PyTorch / TensorFlow"],
      venues: [
        { name: "J. Digital Imaging (JDI) 2021", tier: "Q1", note: "Real-Time DICOM Stream Processing" },
        { name: "IEEE Access 2021", tier: "Q1", note: "High-Throughput Clinical ML Extraction" },
        { name: "IEEE Computer 2023", tier: "Q1", note: "Cold-Start Edge Telehealth" }
      ],
      description: "Comprehensive medical imaging pipeline engine. Ingests PACS/DICOM streams at line speed, extracts clinical metadata, and feeds neural network inference pipelines."
    },
    {
      id: "beehive",
      number: 15,
      name: "Beehive",
      subtitle: "Behavioral Health Federation",
      lines: ["line-health", "line-community"],
      x: 660,
      y: 620,
      isMajorHub: true,
      isInterchange: true,
      repos: ["Beehive"],
      primaryRepo: "Beehive",
      tech: ["TypeScript", "React", "Health Metrics"],
      venues: [
        { name: "IEEE SysCon 2025", tier: "SysCon", note: "Federated Behavioral Health" },
        { name: "Google Summer of Code 2025", tier: "GSoC", note: "Community Health Dashboards" }
      ],
      description: "Major Junction connecting Clinical Healthcare with Community Science. Federates behavioral health data and community health indicators across Alaskan tribal communities."
    },
    {
      id: "bhv",
      number: 16,
      name: "BHV",
      subtitle: "Behavioral Health Vault",
      lines: ["line-health"],
      x: 840,
      y: 620,
      isMajorHub: false,
      repos: ["BHV"],
      primaryRepo: "BHV",
      tech: ["Zero-Knowledge Storage", "Privacy"],
      venues: [
        { name: "Health Privacy Track 2025", tier: "Confidentiality", note: "Encrypted Clinical Storage" }
      ],
      description: "Behavioral Health Vault providing cryptographically partitioned, patient-controlled storage for sensitive mental health and addiction recovery metrics."
    },
    {
      id: "tenet",
      number: 17,
      name: "TENeT",
      subtitle: "Telehealth Effectiveness",
      lines: ["line-health"],
      x: 1020,
      y: 620,
      isMajorHub: false,
      repos: ["TENeT"],
      primaryRepo: "TENeT",
      tech: ["Python", "Telemetry Analytics"],
      venues: [
        { name: "Telehealth Informatics 2025", tier: "Clinical Telehealth", note: "Necessity & Outcome Modeling" }
      ],
      description: "Telehealth Effectiveness and Necessity Tracker measuring clinical outcome retention, connectivity drop rates, and cost-benefit trade-offs in remote rural consultations."
    },
    {
      id: "awanta",
      number: 18,
      name: "AWANTA",
      subtitle: "SD-WAN Telehealth Hub",
      lines: ["line-health", "line-net"],
      x: 1220,
      y: 620,
      isMajorHub: true,
      isInterchange: true,
      repos: ["AWANTA"],
      primaryRepo: "AWANTA",
      tech: ["Python", "SD-WAN", "OpenFlow"],
      venues: [
        { name: "IEEE Computer 2023", tier: "Q1", note: "SD-WAN Telehealth Architecture" },
        { name: "Springer Cluster Computing 2025", tier: "Q1", note: "Adaptive Multi-Path Optimization" },
        { name: "Google Summer of Code 2024-2025", tier: "GSoC", note: "Remote Alaska Edge Deployments" }
      ],
      description: "An SD-WAN framework engineered specifically for telehealth connectivity across satellite (LEO/GEO), cellular, and terrestrial links in extreme rural climates."
    },

    // --- Line 4: Autonomous Systems & Decentralized Trust (Purple) ---
    {
      id: "porto",
      number: 19,
      name: "PORTO",
      subtitle: "Off-Chain Resource Tracking",
      lines: ["line-trust"],
      x: 940,
      y: 160,
      isMajorHub: false,
      repos: ["PORTO"],
      primaryRepo: "PORTO",
      tech: ["Erlang", "State Channels", "Ledger"],
      venues: [
        { name: "Decentralized Systems Track 2026", tier: "Blockchain / Off-Chain", note: "Private Distributed Verification" }
      ],
      description: "Private Off-Chain Resource Tracking and Orchestration built in Erlang, enabling high-frequency verifiable resource accounting without on-chain congestion."
    },
    {
      id: "epicue",
      number: 20,
      name: "Epicue",
      subtitle: "Cairo ZK Verification",
      lines: ["line-trust"],
      x: 1080,
      y: 160,
      isMajorHub: false,
      repos: ["Epicue"],
      primaryRepo: "Epicue",
      tech: ["Cairo", "STARKs", "Provable Computing"],
      venues: [
        { name: "ZK Systems Track 2026", tier: "Zero-Knowledge", note: "Verifiable Computation in Untrusted Cloud" }
      ],
      description: "Equity, Privacy, and Integrity with Cairo in Untrusted Environments. Generates cryptographic STARK proofs of computational integrity for remote edge executions."
    },
    {
      id: "lagos",
      number: 21,
      name: "LAGOS",
      subtitle: "Latency-Aware Governance",
      lines: ["line-trust"],
      x: 1220,
      y: 160,
      isMajorHub: false,
      repos: ["LAGOS"],
      primaryRepo: "LAGOS",
      tech: ["Gleam", "Type-Safe Overlays"],
      venues: [
        { name: "Overlay Systems Track 2026", tier: "Type-Safe Systems", note: "Latency-Bounded Voting" }
      ],
      description: "Latency-Aware Accountable Governance for Overlay Scaling implemented in Gleam. Guarantees quorum consensus bounds across variable-delay overlay links."
    },
    {
      id: "iguana",
      number: 22,
      name: "IGUANA",
      subtitle: "Neural Guardrails",
      lines: ["line-trust"],
      x: 1360,
      y: 240,
      isMajorHub: true,
      repos: ["IGUANA"],
      primaryRepo: "IGUANA",
      tech: ["Erlang", "Symbolic Guardrails", "Python"],
      venues: [
        { name: "AI Safety Track 2026", tier: "Verifiable AI", note: "Adaptive Guardrail Concurrency" }
      ],
      description: "Integrated Guardrails for Unbiased and Adaptive Neural Network Architectures. Employs actor-based concurrent monitors in Erlang to enforce formal safety invariants on LLMs and neural policies."
    },
    {
      id: "impact",
      number: 23,
      name: "IMPACT",
      subtitle: "Multi-Agent Platform",
      lines: ["line-trust"],
      x: 1470,
      y: 320,
      isMajorHub: true,
      repos: ["IMPACT"],
      primaryRepo: "IMPACT",
      tech: ["Python", "Multi-Agent Architectures"],
      venues: [
        { name: "Agentic Systems Track 2026", tier: "Collaborative AI", note: "Intent-Based Architectural Drift" }
      ],
      description: "Intent-Based Multi-Agent Platform for Architectural Change Tracking. Dispatches collaborative specialist agents to detect architectural drift and enforce compliance."
    },
    {
      id: "trace",
      number: 24,
      name: "TRACE",
      subtitle: "Repo Context Alignment",
      lines: ["line-trust"],
      x: 1530,
      y: 400,
      isMajorHub: false,
      repos: ["TRACE"],
      primaryRepo: "TRACE",
      tech: ["Python", "Static Analysis"],
      venues: [
        { name: "Software Evolution Track 2026", tier: "Tooling", note: "Continuous Repository Alignment" }
      ],
      description: "Tracking Repository Alignment and Context Evaluation. Connects with IMPACT to continuously score repo implementation fidelity against codified specifications."
    },

    // --- Line 5: Community Informatics & Indigenous Computing (Coral) ---
    // Repositioned to Y=820 with zone title at Y=750 for clear spacing
    {
      id: "denaina-place-names",
      number: 25,
      name: "Dena'ina Place Names",
      subtitle: "Indigenous Toponymy",
      lines: ["line-community"],
      x: 160,
      y: 820,
      isMajorHub: false,
      repos: ["denaina-place-names"],
      primaryRepo: "denaina-place-names",
      tech: ["Web GIS", "Indigenous Audio / Maps"],
      venues: [
        { name: "Alaska Native Knowledge Initiative", tier: "Heritage Impact", note: "Interactive Place Names Web App" }
      ],
      description: "Interactive geospatial digital atlas honoring and preserving Dena'ina Athabascan geographical names, audio pronunciations, and oral histories across Southcentral Alaska."
    },
    {
      id: "dnigi",
      number: 26,
      name: "Dnigi",
      subtitle: "Indigenous Heritage Game",
      lines: ["line-community"],
      x: 320,
      y: 820,
      isMajorHub: true,
      repos: ["Dnigi"],
      primaryRepo: "Dnigi",
      tech: ["JavaScript", "Phaser / Canvas"],
      venues: [
        { name: "IEEE Computer Magazine 2025", tier: "Q1", note: "Serious Game for Indigenous Heritage" }
      ],
      description: "A Serious Game approach to knowledge sharing and intergenerational transmission of Indigenous cultural heritage, published as featured research in IEEE Computer."
    },
    {
      id: "ak-history-webmap",
      number: 27,
      name: "AK History Webmap",
      subtitle: "Epidemic Diseases Web Map",
      lines: ["line-community"],
      x: 480,
      y: 820,
      isMajorHub: true,
      repos: ["ak-history-webmap"],
      primaryRepo: "ak-history-webmap",
      tech: ["JavaScript", "Leaflet / D3"],
      venues: [
        { name: "IEEE Computer Magazine 2025", tier: "Q1", note: "Epidemic Disease Mapping in Alaska" }
      ],
      description: "Interactive Native history web map visualizing historical epidemic disease outbreaks, transmission paths, and demographic impacts on Alaska Native populations."
    },
    {
      id: "dreams",
      number: 28,
      name: "DREAMS",
      subtitle: "Recovery & Arts Mining",
      lines: ["line-community"],
      x: 640,
      y: 820,
      isMajorHub: false,
      repos: ["DREAMS"],
      primaryRepo: "DREAMS",
      tech: ["Python", "NLP / Mining"],
      venues: [
        { name: "Google Summer of Code 2025", tier: "GSoC", note: "Societal Well-Being Mining" },
        { name: "Alaskan Season of Code", tier: "ASoC", note: "Art Therapy Analytics" }
      ],
      description: "Digitization for Recovery: Exploring Arts with Mining for Societal Well-Being. Mines expressive art therapy data to provide qualitative indicators for addiction recovery, feeding directly into Beehive."
    },

    // --- Shuttle Line: High-Performance Workflow & Runtimes (Slate Dashed) ---
    {
      id: "dhgworkflow",
      number: 29,
      name: "DHGWorkflow",
      subtitle: "Task Graph Composer",
      lines: ["line-shuttle"],
      x: 740,
      y: 260,
      isMajorHub: false,
      repos: ["DHGWorkflow"],
      primaryRepo: "DHGWorkflow",
      tech: ["JavaScript", "DAGs"],
      venues: [
        { name: "Workflow Computing 2022-2024", tier: "Tooling", note: "Visual Directed Hypergraph Composition" }
      ],
      description: "Interactive visual composer for Directed Hypergraph Workflows, structuring scientific computing stages and dependency graphs."
    },
    {
      id: "ararat",
      number: 30,
      name: "Ararat",
      subtitle: "Mojo Workflow Executor",
      lines: ["line-shuttle"],
      x: 850,
      y: 260,
      isMajorHub: false,
      repos: ["Ararat"],
      primaryRepo: "Ararat",
      tech: ["Mojo", "Parallel Execution"],
      venues: [
        { name: "Next-Gen Runtimes 2026", tier: "Mojo Systems", note: "High-Performance DHG Engine" }
      ],
      description: "High-performance workflow execution engine written in Mojo, delivering hardware-accelerated SIMD parallel execution of DHGWorkflow graphs."
    },
    {
      id: "mojito",
      number: 31,
      name: "Mojito",
      subtitle: "Task Orchestrator",
      lines: ["line-shuttle"],
      x: 960,
      y: 260,
      isMajorHub: false,
      repos: ["Mojito"],
      primaryRepo: "Mojito",
      tech: ["Mojo", "Async Tasks"],
      venues: [
        { name: "Next-Gen Runtimes 2026", tier: "Mojo Systems", note: "Mojo-Based Task Orchestrator" }
      ],
      description: "Mojo-based integrated task orchestrator delivering lightweight async scheduling, lock-free queues, and microsecond latency dispatching."
    },
    {
      id: "firm",
      number: 32,
      name: "FIRM",
      subtitle: "Find, Invoke, Return, Manage",
      lines: ["line-shuttle"],
      x: 1070,
      y: 260,
      isMajorHub: false,
      repos: ["FIRM"],
      primaryRepo: "FIRM",
      tech: ["Mojo", "FaaS Orchestration"],
      venues: [
        { name: "Serverless Systems 2026", tier: "Mojo Systems", note: "Low-Overhead Function Invocation" }
      ],
      description: "Find, Invoke, Return, and Manage: a low-latency serverless function invocation framework written in Mojo for edge intelligence."
    },
    {
      id: "faro",
      number: 33,
      name: "Faro",
      subtitle: "Near-Duplicate Detection",
      lines: ["line-shuttle"],
      x: 1180,
      y: 260,
      isMajorHub: false,
      repos: ["Faro", "dudu"],
      primaryRepo: "Faro",
      tech: ["Go", "MinHash", "LSH"],
      venues: [
        { name: "Big Data Track 2026", tier: "Go High-Throughput", note: "Evolved from Java dudu" }
      ],
      description: "High-throughput near-duplicate detection in Go using MinHash and Locality-Sensitive Hashing (LSH), modernizing the lab's earlier Java dudu engine."
    }
  ],
  tracks: [
    // Line 1: Blue (SOA)
    {
      id: "track-soa-main",
      lineId: "line-soa",
      path: "M 120,160 L 690,160 Q 750,160 780,220 L 795,320 Q 800,350 800,380"
    },
    // Line 2: Amber (Network)
    {
      id: "track-net-main",
      lineId: "line-net",
      path: "M 120,380 L 1260,380 Q 1360,380 1410,430 L 1460,500"
    },
    // Line 3: Green (Healthcare)
    {
      id: "track-health-main",
      lineId: "line-health",
      path: "M 120,620 L 1240,620 Q 1340,620 1410,560 L 1460,500"
    },
    // Line 4: Purple (Trust & Autonomous)
    {
      id: "track-trust-main",
      lineId: "line-trust",
      path: "M 920,160 L 1240,160 Q 1300,160 1330,190 L 1370,240 Q 1420,290 1470,320 L 1530,400"
    },
    // Line 5: Coral (Community Informatics) - updated to Y=820 and smooth curve up to Beehive
    {
      id: "track-community-main",
      lineId: "line-community",
      path: "M 120,820 L 640,820 Q 660,820 660,780 L 660,620"
    },
    // Shuttle Loop: Slate Dashed
    {
      id: "track-shuttle",
      lineId: "line-shuttle",
      path: "M 690,160 Q 715,210 740,260 L 1180,260 Q 1200,260 1200,300 L 1200,340 Q 1200,380 1120,380"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = METRO_DATA;
}
