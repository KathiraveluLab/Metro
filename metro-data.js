// KathiraveluLab Research Ecosystem Metro Map Data
// 39 Key Projects & Research Stations across 5 Research Tracks + Runtime Shuttle

const METRO_DATA = {
  "lines": [
    {
      "id": "line-soa",
      "name": "Line 1: Service-Oriented & Distributed Middleware",
      "shortName": "SOA & Middleware",
      "color": "#0284c7",
      "accentColor": "#38bdf8",
      "bgClass": "bg-cyan",
      "description": "Foundational service composition, closed-loop neuromodulation control, context-aware smart buildings, and distributed interoperability middleware."
    },
    {
      "id": "line-net",
      "name": "Line 2: Network Transport & Edge Infrastructure",
      "shortName": "Network & Edge",
      "color": "#d97706",
      "accentColor": "#fbbf24",
      "bgClass": "bg-amber",
      "description": "Software-defined networking, community network controller farms, middlebox QoS, bandwidth orchestration, low-latency transport, and edge simulation."
    },
    {
      "id": "line-health",
      "name": "Line 3: Healthcare & Biomedical Informatics",
      "shortName": "Healthcare Informatics",
      "color": "#059669",
      "accentColor": "#34d399",
      "bgClass": "bg-emerald",
      "description": "DICOM machine learning pipelines, behavioral health data federation, clinical telemetry, and remote telehealth."
    },
    {
      "id": "line-trust",
      "name": "Line 4: Autonomous Systems & Decentralized Trust",
      "shortName": "Autonomous Trust & AI",
      "color": "#7c3aed",
      "accentColor": "#a78bfa",
      "bgClass": "bg-purple",
      "description": "Zero-knowledge proofs, off-chain state channels, neural guardrails, and intent-based multi-agent architecture."
    },
    {
      "id": "line-community",
      "name": "Line 5: Community Informatics & Circumpolar Computing",
      "shortName": "Community & Circumpolar",
      "color": "#e11d48",
      "accentColor": "#fb7185",
      "bgClass": "bg-rose",
      "description": "Alaska Native epidemic history mapping, Indigenous heritage preservation, Arctic sea ice forecasting, and mining for societal well-being."
    },
    {
      "id": "line-shuttle",
      "name": "Runtime Shuttle: High-Performance Workflow Engines",
      "shortName": "Workflow & Runtimes",
      "color": "#475569",
      "accentColor": "#94a3b8",
      "bgClass": "bg-slate",
      "dashed": true,
      "description": "Next-gen execution runtimes, task graph composers, and near-duplicate big data detection in Mojo, Rust, and Go."
    }
  ],
  "stations": [
    {
      "id": "control-core",
      "mapBadge": "IEEE Access'22",
      "number": 1,
      "name": "CONTROL-CORE",
      "subtitle": "Neuromodulation",
      "lines": [
        "line-soa"
      ],
      "x": 120,
      "y": 160,
      "isMajorHub": true,
      "repos": [
        "concore",
        "concore-editor",
        "concore-Mediator"
      ],
      "primaryRepo": "concore",
      "tech": [
        "SWIG",
        "Python",
        "C++",
        "JavaScript"
      ],
      "venues": [
        {
          "name": "Cluster Computing (CLUSTER) 2025",
          "tier": "Springer",
          "note": "Distributed Executions with CONTROL-CORE IDE"
        },
        {
          "name": "IEEE Access 2022",
          "tier": "IEEE",
          "note": "Simulation and Design of Closed-Loop Peripheral Neuromodulation"
        }
      ],
      "description": "Framework for closed-loop peripheral neuromodulation control systems. Integrates simulated neuro-stimulators with real-time feedback loops and modular editors."
    },
    {
      "id": "cassowary",
      "mapBadge": "ACM M4IOT'15",
      "number": 2,
      "name": "Cassowary",
      "subtitle": "Smart Buildings",
      "lines": [
        "line-soa"
      ],
      "x": 220,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "Cassowary"
      ],
      "primaryRepo": "Cassowary",
      "tech": [
        "Java",
        "OpenDaylight",
        "Infinispan",
        "ActiveMQ"
      ],
      "venues": [
        {
          "name": "ACM M4IOT 2015",
          "tier": "ACM",
          "note": "Middleware Platform for Context-Aware Smart Buildings with Software-Defined Sensor Networks"
        }
      ],
      "description": "Context-aware smart buildings middleware with software-defined sensor networks (SDSN), integrating Infinispan in-memory data grids, ActiveMQ, and OpenDaylight control loops."
    },
    {
      "id": "evora",
      "mapBadge": "ETT'18",
      "number": 3,
      "name": "Évora",
      "subtitle": "Edge Chains",
      "lines": [
        "line-soa"
      ],
      "x": 320,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "Evora"
      ],
      "primaryRepo": "Evora",
      "tech": [
        "Java",
        "SDN"
      ],
      "venues": [
        {
          "name": "Trans. Emerging Tel. Tech. (ETT) 2018",
          "tier": "Wiley",
          "note": "Composing Network Service Chains at the Edge"
        },
        {
          "name": "IEEE ICWS 2016",
          "tier": "IEEE",
          "note": "Building Blocks of Mayan: Software-Defined Service Composition"
        }
      ],
      "description": "Composing resilient, adaptive network service chains at the edge using software-defined networking concepts."
    },
    {
      "id": "sdds",
      "mapBadge": "IEEE SDS'18",
      "number": 4,
      "name": "SDDS",
      "subtitle": "Data Services",
      "lines": [
        "line-soa"
      ],
      "x": 420,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "SDDS",
        "messaging4transport"
      ],
      "primaryRepo": "SDDS",
      "tech": [
        "Java",
        "AMQP 1.0",
        "MD-SAL",
        "Mayan-DS"
      ],
      "venues": [
        {
          "name": "IEEE SDS 2018",
          "tier": "IEEE",
          "note": "Software-Defined Data Services: Interoperable Big Data Executions"
        }
      ],
      "description": "Software-Defined Data Services (Mayan-DS) middleware decoupling management logic from data service planes for interoperable, network-aware big data workflows."
    },
    {
      "id": "sd-cps",
      "mapBadge": "Cluster'19",
      "number": 5,
      "name": "SD-CPS",
      "subtitle": "Software-Defined CPS",
      "lines": [
        "line-soa"
      ],
      "x": 520,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "SD-CPS"
      ],
      "primaryRepo": "SD-CPS",
      "tech": [
        "Java",
        "Cyber-Physical"
      ],
      "venues": [
        {
          "name": "Cluster Computing 2019",
          "tier": "Springer",
          "note": "SD-CPS: Taming Challenges of CPS with Workflows at the Edge"
        },
        {
          "name": "IEEE SDS 2017",
          "tier": "IEEE",
          "note": "Software-Defined Approach to Cyber-Physical Systems"
        }
      ],
      "description": "Software-Defined Cyber-Physical Systems middleware extending SDN principles to sensor and actuator control planes."
    },
    {
      "id": "sofia",
      "number": 6,
      "name": "SOFIA",
      "subtitle": "Federated Interop",
      "lines": [
        "line-soa"
      ],
      "x": 620,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "SOFIA"
      ],
      "primaryRepo": "SOFIA",
      "tech": [
        "Erlang",
        "Distributed Systems"
      ],
      "venues": [],
      "description": "Service-Oriented Federated Interoperability Architecture written in Erlang for fault-tolerant microservice synchronization across heterogeneous clusters."
    },
    {
      "id": "guarda",
      "number": 7,
      "name": "GUARDA",
      "subtitle": "Data Gateway",
      "lines": [
        "line-soa",
        "line-shuttle"
      ],
      "x": 720,
      "y": 160,
      "isMajorHub": true,
      "repos": [
        "GUARDA"
      ],
      "primaryRepo": "GUARDA",
      "tech": [
        "Elixir",
        "REST / GraphQL"
      ],
      "venues": [],
      "description": "Gateway for Uniform Access to Remote Data and Analytics built with Elixir/OTP, serving high-throughput concurrent telemetry streams."
    },
    {
      "id": "viseu",
      "mapBadge": "COMNET'22",
      "number": 8,
      "name": "Viseu",
      "subtitle": "Edge Services Hub",
      "lines": [
        "line-soa",
        "line-net"
      ],
      "x": 800,
      "y": 380,
      "isMajorHub": true,
      "isInterchange": true,
      "repos": [
        "Viseu"
      ],
      "primaryRepo": "Viseu",
      "tech": [
        "Java",
        "Edge Middleware"
      ],
      "venues": [
        {
          "name": "Computer Networks (COMNET) 2022",
          "tier": "Elsevier",
          "note": "Towards an Internet-Scale Overlay Network for Latency-Aware Workflows at the Edge"
        }
      ],
      "description": "Major transfer hub bridging Service-Oriented Architecture with Network Optimization. Orchestrates virtual Internet services on resource-constrained edge gateways."
    },
    {
      "id": "sendim",
      "mapBadge": "IEEE IC2E'16",
      "number": 9,
      "name": "SENDIM",
      "subtitle": "Cloud Simulation",
      "lines": [
        "line-net"
      ],
      "x": 130,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "SENDIM"
      ],
      "primaryRepo": "SENDIM",
      "tech": [
        "Java",
        "Cloud Simulation"
      ],
      "venues": [
        {
          "name": "IEEE IC2E 2016",
          "tier": "IEEE",
          "note": "Simulation, Emulation, and Deployment Integration Middleware"
        },
        {
          "name": "Springer OTM 2016",
          "tier": "Springer",
          "note": "Software-Defined Simulations for Cloud and Data Center Networks"
        }
      ],
      "description": "Simulation, Emulation, and Deployment Integration Middleware for scalable cloud networks and multi-datacenter topologies."
    },
    {
      "id": "xsdn",
      "mapBadge": "IEEE IC2E'15",
      "number": 10,
      "name": "xSDN",
      "subtitle": "Flow Simulator",
      "lines": [
        "line-net"
      ],
      "x": 240,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "xSDN"
      ],
      "primaryRepo": "xSDN",
      "tech": [
        "Java",
        "Flow Simulation",
        "SDN"
      ],
      "venues": [
        {
          "name": "IEEE IC2E 2015",
          "tier": "IEEE",
          "note": "An Expressive Simulator for Dynamic Network Flows"
        }
      ],
      "description": "An Expressive Simulator for Dynamic Network Flows, enabling realistic evaluation of topology changes and flow routing algorithms."
    },
    {
      "id": "netuber",
      "mapBadge": "IFIP Networking'18",
      "number": 11,
      "name": "NetUber",
      "subtitle": "SD-Internet",
      "lines": [
        "line-net"
      ],
      "x": 360,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "NetUber"
      ],
      "primaryRepo": "NetUber",
      "tech": [
        "Java",
        "SDN"
      ],
      "venues": [
        {
          "name": "IFIP Networking 2018",
          "tier": "IFIP / IEEE",
          "note": "Moving Bits with a Fleet of Shared Virtual Routers"
        },
        {
          "name": "IEEE SDS 2020",
          "tier": "IEEE",
          "note": "Latency-Sensitive Web Service Workflows: Software-Defined Internet"
        }
      ],
      "description": "Dynamic software-defined routing infrastructure optimizing end-to-end transport across autonomous system boundaries."
    },
    {
      "id": "chief",
      "mapBadge": "IEEE IC2EW'16",
      "number": 12,
      "name": "CHIEF",
      "subtitle": "Controller Farm",
      "lines": [
        "line-net"
      ],
      "x": 490,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "CHIEF",
        "messaging4transport"
      ],
      "primaryRepo": "CHIEF",
      "tech": [
        "Java",
        "OpenDaylight",
        "AMQP",
        "Hadoop"
      ],
      "venues": [
        {
          "name": "IEEE IC2EW 2016",
          "tier": "IEEE",
          "note": "Controller Farm for Clouds of Software-Defined Community Networks"
        }
      ],
      "description": "Controller Farm for Clouds of Software-Defined Community Networks. Integrates OpenDaylight with AMQP message-oriented middleware and Hadoop metering."
    },
    {
      "id": "smart",
      "mapBadge": "IEEE IM'17",
      "number": 13,
      "name": "SMART",
      "subtitle": "Middlebox QoS",
      "lines": [
        "line-net"
      ],
      "x": 630,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "SMART",
        "messaging4transport"
      ],
      "primaryRepo": "SMART",
      "tech": [
        "Java",
        "SDN",
        "YANG / MD-SAL",
        "AMQP"
      ],
      "venues": [
        {
          "name": "IEEE IM 2017",
          "tier": "IEEE",
          "note": "SDN Middlebox Architecture for Resilient Transfers"
        },
        {
          "name": "Springer OTM 2016",
          "tier": "Springer",
          "note": "Selective Redundancy in Network-as-a-Service: Differentiated QoS"
        }
      ],
      "description": "SDN Middlebox Architecture for Resilient Transfers. Employs selective redundancy (CLONE, DIVERT, REPLICATE) and breakpoint detection for differentiated QoS in multi-tenant clouds."
    },
    {
      "id": "l4sboa",
      "mapBadge": "IEEE CCECE'25",
      "number": 14,
      "name": "L4SBOA",
      "subtitle": "Bandwidth Orchestration",
      "lines": [
        "line-net"
      ],
      "x": 960,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "L4SBOA"
      ],
      "primaryRepo": "L4SBOA",
      "tech": [
        "Python",
        "L4S",
        "eBPF / TC"
      ],
      "venues": [
        {
          "name": "IEEE CCECE 2025",
          "tier": "IEEE",
          "note": "L4S Bandwidth Orchestration Architecture for Healthcare"
        }
      ],
      "description": "L4S Bandwidth Orchestration Architecture designed to eradicate bufferbloat and guarantee ultra-low latency for interactive remote services."
    },
    {
      "id": "can",
      "number": 15,
      "name": "CAN",
      "subtitle": "Content-Aware Net",
      "lines": [
        "line-net",
        "line-shuttle"
      ],
      "x": 1100,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "CAN"
      ],
      "primaryRepo": "CAN",
      "tech": [
        "Rust",
        "Zero-Copy"
      ],
      "venues": [],
      "description": "Content-Aware Networking engine written in Rust for zero-copy payload inspection, selective edge caching, and semantic flow steering."
    },
    {
      "id": "faultsim",
      "number": 16,
      "name": "faultsim",
      "subtitle": "Failure Detector",
      "lines": [
        "line-net"
      ],
      "x": 1240,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "faultsim"
      ],
      "primaryRepo": "faultsim",
      "tech": [
        "Rust",
        "Distributed Consensus"
      ],
      "venues": [],
      "description": "A Rust simulator benchmark for failure detection algorithms in distributed clusters subject to extreme packet loss and jitter."
    },
    {
      "id": "sintra",
      "number": 17,
      "name": "Sintra",
      "subtitle": "Self-Adaptive Transport",
      "lines": [
        "line-net",
        "line-health"
      ],
      "x": 1460,
      "y": 500,
      "isMajorHub": true,
      "isInterchange": true,
      "repos": [
        "Sintra",
        "sintra-plot"
      ],
      "primaryRepo": "Sintra",
      "tech": [
        "Python",
        "Internet Measurements"
      ],
      "venues": [],
      "description": "Grand Terminus and interchange bridging Network Transport with Clinical Telehealth. Continuously maps global latency paths and optimizes edge tunnels for underserved polar regions."
    },
    {
      "id": "obidos",
      "mapBadge": "DAPD'19",
      "number": 18,
      "name": "Óbidos",
      "subtitle": "Big Data Integration",
      "lines": [
        "line-health"
      ],
      "x": 160,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "Obidos",
        "MEDIator"
      ],
      "primaryRepo": "Obidos",
      "tech": [
        "Java",
        "ETL",
        "Data Federation"
      ],
      "venues": [
        {
          "name": "Distributed and Parallel Databases (DAPD) 2019",
          "tier": "Springer",
          "note": "On-Demand Big Data Integration: A Hybrid ETL Approach"
        },
        {
          "name": "VLDB DMAH 2017",
          "tier": "Springer",
          "note": "On-Demand Service-Based Big Data Integration"
        },
        {
          "name": "ACM BigCHat (KDD) 2015",
          "tier": "ACM",
          "note": "MEDIator: Data Sharing Synchronization for Medical Image Archives"
        }
      ],
      "description": "Pioneering hybrid ETL framework for reproducible biomedical science, federating large-scale research repositories across institutional borders."
    },
    {
      "id": "niffler",
      "mapBadge": "JDI'21",
      "number": 19,
      "name": "Niffler",
      "subtitle": "DICOM ML Pipelines",
      "lines": [
        "line-health"
      ],
      "x": 360,
      "y": 620,
      "isMajorHub": true,
      "repos": [
        "Niffler",
        "Diomede",
        "DWiM",
        "MRIQC"
      ],
      "primaryRepo": "Niffler",
      "tech": [
        "Python",
        "DICOM",
        "PyTorch / TensorFlow"
      ],
      "venues": [
        {
          "name": "Journal of Digital Imaging (JDI) 2021",
          "tier": "Springer",
          "note": "A DICOM Framework for ML Pipelines against Real-Time Radiology Images"
        },
        {
          "name": "IEEE Access 2021",
          "tier": "IEEE",
          "note": "Understanding Scanner Utilization with Real-Time DICOM Extraction"
        },
        {
          "name": "IEEE Computer 2022",
          "tier": "IEEE",
          "note": "Visualizing Scanner Utilization from MRI Metadata and Clinical Data"
        }
      ],
      "description": "Comprehensive medical imaging pipeline engine. Ingests PACS/DICOM streams at line speed, extracts clinical metadata, and feeds neural network inference pipelines."
    },
    {
      "id": "beehive",
      "mapBadge": "IEEE SysCon'26",
      "number": 20,
      "name": "Beehive",
      "subtitle": "Behavioral Health Federation",
      "lines": [
        "line-health",
        "line-community"
      ],
      "x": 660,
      "y": 620,
      "isMajorHub": true,
      "isInterchange": true,
      "repos": [
        "Beehive"
      ],
      "primaryRepo": "Beehive",
      "tech": [
        "TypeScript",
        "React",
        "Health Metrics"
      ],
      "venues": [
        {
          "name": "IEEE SysCon 2026",
          "tier": "IEEE",
          "note": "A Data Framework for Behavioral Health with Digitized Drawings and Photographs"
        }
      ],
      "description": "Major Junction connecting Clinical Healthcare with Community Science. Federates behavioral health data and community health indicators across Alaskan tribal communities."
    },
    {
      "id": "bhv",
      "number": 21,
      "name": "BHV",
      "subtitle": "Behavioral Health Vault",
      "lines": [
        "line-health"
      ],
      "x": 840,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "BHV"
      ],
      "primaryRepo": "BHV",
      "tech": [
        "Zero-Knowledge Storage",
        "Privacy"
      ],
      "venues": [],
      "description": "Behavioral Health Vault providing cryptographically partitioned, patient-controlled storage for sensitive mental health and addiction recovery metrics."
    },
    {
      "id": "tenet",
      "number": 22,
      "name": "TENeT",
      "subtitle": "Telehealth Effectiveness",
      "lines": [
        "line-health"
      ],
      "x": 1020,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "TENeT"
      ],
      "primaryRepo": "TENeT",
      "tech": [
        "Python",
        "Telemetry Analytics"
      ],
      "venues": [],
      "description": "Telehealth Effectiveness and Necessity Tracker measuring clinical outcome retention, connectivity drop rates, and cost-benefit trade-offs in remote rural consultations."
    },
    {
      "id": "awanta",
      "mapBadge": "Cluster'25",
      "number": 23,
      "name": "AWANTA",
      "subtitle": "SD-WAN Telehealth Hub",
      "lines": [
        "line-health",
        "line-net"
      ],
      "x": 1220,
      "y": 620,
      "isMajorHub": true,
      "isInterchange": true,
      "repos": [
        "AWANTA"
      ],
      "primaryRepo": "AWANTA",
      "tech": [
        "Python",
        "SD-WAN",
        "OpenFlow"
      ],
      "venues": [
        {
          "name": "Cluster Computing (CLUSTER) 2025",
          "tier": "Springer",
          "note": "Network Measurements for Telehealth Optimizations in Remote Regions"
        },
        {
          "name": "IEEE SDS 2023",
          "tier": "IEEE",
          "note": "Network Measurements and Optimizations for Telehealth in Remote Regions"
        }
      ],
      "description": "An SD-WAN framework engineered specifically for telehealth connectivity across satellite (LEO/GEO), cellular, and terrestrial links in extreme rural climates."
    },
    {
      "id": "porto",
      "mapBadge": "IEEE ISSE'26",
      "number": 24,
      "name": "PORTO",
      "subtitle": "Off-Chain Resource Tracking",
      "lines": [
        "line-trust"
      ],
      "x": 940,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "PORTO"
      ],
      "primaryRepo": "PORTO",
      "tech": [
        "Erlang",
        "State Channels",
        "Ledger"
      ],
      "venues": [
        {
          "name": "IEEE ISSE 2026",
          "tier": "IEEE",
          "note": "Private Off-chain Resource Tracking and Orchestration"
        }
      ],
      "description": "Private Off-Chain Resource Tracking and Orchestration built in Erlang, enabling high-frequency verifiable resource accounting without on-chain congestion."
    },
    {
      "id": "epicue",
      "number": 25,
      "name": "Epicue",
      "subtitle": "Cairo ZK Verification",
      "lines": [
        "line-trust"
      ],
      "x": 1080,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "Epicue"
      ],
      "primaryRepo": "Epicue",
      "tech": [
        "Cairo",
        "STARKs",
        "Provable Computing"
      ],
      "venues": [],
      "description": "Equity, Privacy, and Integrity with Cairo in Untrusted Environments. Generates cryptographic STARK proofs of computational integrity for remote edge executions."
    },
    {
      "id": "lagos",
      "number": 26,
      "name": "LAGOS",
      "subtitle": "Latency-Aware Governance",
      "lines": [
        "line-trust"
      ],
      "x": 1220,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "LAGOS"
      ],
      "primaryRepo": "LAGOS",
      "tech": [
        "Gleam",
        "Type-Safe Overlays"
      ],
      "venues": [],
      "description": "Latency-Aware Accountable Governance for Overlay Scaling implemented in Gleam. Guarantees quorum consensus bounds across variable-delay overlay links."
    },
    {
      "id": "iguana",
      "mapBadge": "IEEE ISSE'26",
      "number": 27,
      "name": "IGUANA",
      "subtitle": "Neural Guardrails",
      "lines": [
        "line-trust"
      ],
      "x": 1360,
      "y": 240,
      "isMajorHub": true,
      "repos": [
        "IGUANA"
      ],
      "primaryRepo": "IGUANA",
      "tech": [
        "Erlang",
        "Symbolic Guardrails",
        "Python"
      ],
      "venues": [
        {
          "name": "IEEE ISSE 2026",
          "tier": "IEEE",
          "note": "Integrated Guardrails for Unbiased and Adaptive Neural Network Architectures"
        }
      ],
      "description": "Integrated Guardrails for Unbiased and Adaptive Neural Network Architectures. Employs actor-based concurrent monitors in Erlang to enforce formal safety invariants on neural policies."
    },
    {
      "id": "impact",
      "number": 28,
      "name": "IMPACT",
      "subtitle": "Multi-Agent Platform",
      "lines": [
        "line-trust"
      ],
      "x": 1470,
      "y": 320,
      "isMajorHub": true,
      "repos": [
        "IMPACT"
      ],
      "primaryRepo": "IMPACT",
      "tech": [
        "Python",
        "Multi-Agent Architectures"
      ],
      "venues": [],
      "description": "Intent-Based Multi-Agent Platform for Architectural Change Tracking. Dispatches collaborative specialist agents to detect architectural drift and enforce compliance."
    },
    {
      "id": "trace",
      "number": 29,
      "name": "TRACE",
      "subtitle": "Repo Context Alignment",
      "lines": [
        "line-trust"
      ],
      "x": 1530,
      "y": 400,
      "isMajorHub": false,
      "repos": [
        "TRACE"
      ],
      "primaryRepo": "TRACE",
      "tech": [
        "Python",
        "Static Analysis"
      ],
      "venues": [],
      "description": "Tracking Repository Alignment and Context Evaluation. Connects with IMPACT to continuously score repo implementation fidelity against codified specifications."
    },
    {
      "id": "denaina-place-names",
      "number": 30,
      "name": "Dena'ina Place Names",
      "subtitle": "Indigenous Toponymy",
      "lines": [
        "line-community"
      ],
      "x": 130,
      "y": 820,
      "isMajorHub": false,
      "repos": [
        "denaina-place-names"
      ],
      "primaryRepo": "denaina-place-names",
      "tech": [
        "Web GIS",
        "Indigenous Audio / Maps"
      ],
      "venues": [],
      "description": "Interactive geospatial digital atlas honoring and preserving Dena'ina Athabascan geographical names, audio pronunciations, and oral histories across Southcentral Alaska."
    },
    {
      "id": "dnigi",
      "mapBadge": "IEEE Computer'25",
      "number": 31,
      "name": "Dnigi",
      "subtitle": "Indigenous Heritage Game",
      "lines": [
        "line-community"
      ],
      "x": 260,
      "y": 820,
      "isMajorHub": true,
      "repos": [
        "Dnigi"
      ],
      "primaryRepo": "Dnigi",
      "tech": [
        "JavaScript",
        "Phaser / Canvas"
      ],
      "venues": [
        {
          "name": "IEEE Computer 2025",
          "tier": "IEEE",
          "note": "A Serious Game for Dena’ina Language and Heritage"
        }
      ],
      "description": "A Serious Game approach to knowledge sharing and intergenerational transmission of Indigenous cultural heritage, published as featured research in IEEE Computer."
    },
    {
      "id": "ak-history-webmap",
      "mapBadge": "IEEE Computer'25",
      "number": 32,
      "name": "AK History Webmap",
      "subtitle": "Epidemic Diseases Web Map",
      "lines": [
        "line-community"
      ],
      "x": 390,
      "y": 820,
      "isMajorHub": true,
      "repos": [
        "ak-history-webmap"
      ],
      "primaryRepo": "ak-history-webmap",
      "tech": [
        "JavaScript",
        "Leaflet / D3"
      ],
      "venues": [
        {
          "name": "IEEE Computer 2025",
          "tier": "IEEE",
          "note": "An Interactive Native History Web Map for Epidemic Diseases in Alaska"
        }
      ],
      "description": "Interactive Native history web map visualizing historical epidemic disease outbreaks, transmission paths, and demographic impacts on Alaska Native populations."
    },
    {
      "id": "dip-predicting-sie",
      "mapBadge": "Elsevier RSA'25",
      "number": 33,
      "name": "Arctic Sea Ice",
      "subtitle": "Arctic Sea Ice AI",
      "lines": [
        "line-community"
      ],
      "x": 520,
      "y": 820,
      "isMajorHub": true,
      "repos": [
        "DIP_Predicting_SIE"
      ],
      "primaryRepo": "DIP_Predicting_SIE",
      "tech": [
        "Python",
        "Transformer-GRU",
        "Remote Sensing"
      ],
      "venues": [
        {
          "name": "Remote Sensing Applications: Society and Environment (Elsevier) 2025",
          "tier": "Elsevier",
          "note": "Satellite image processing in the circumpolar north: Understanding climate crisis by predicting sea ice extent in the arctic"
        }
      ],
      "description": "Multimodal deep learning and satellite image processing framework predicting Arctic sea ice extent and retreat dynamics in the circumpolar north using Transformer-GRU architectures."
    },
    {
      "id": "dreams",
      "number": 34,
      "name": "DREAMS",
      "subtitle": "Recovery & Arts Mining",
      "lines": [
        "line-community"
      ],
      "x": 660,
      "y": 820,
      "isMajorHub": false,
      "repos": [
        "DREAMS"
      ],
      "primaryRepo": "DREAMS",
      "tech": [
        "Python",
        "NLP / Mining"
      ],
      "venues": [],
      "description": "Digitization for Recovery: Exploring Arts with Mining for Societal Well-Being. Mines expressive art therapy data to provide qualitative indicators for addiction recovery, feeding directly into Beehive."
    },
    {
      "id": "dhgworkflow",
      "number": 35,
      "name": "DHGWorkflow",
      "subtitle": "Task Graph Composer",
      "lines": [
        "line-shuttle"
      ],
      "x": 740,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "DHGWorkflow"
      ],
      "primaryRepo": "DHGWorkflow",
      "tech": [
        "JavaScript",
        "DAGs"
      ],
      "venues": [],
      "description": "Interactive visual composer for Directed Hypergraph Workflows, structuring scientific computing stages and dependency graphs."
    },
    {
      "id": "ararat",
      "number": 36,
      "name": "Ararat",
      "subtitle": "Workflow Engine",
      "lines": [
        "line-shuttle"
      ],
      "x": 840,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "Ararat"
      ],
      "primaryRepo": "Ararat",
      "tech": [
        "Mojo",
        "Parallel Execution"
      ],
      "venues": [],
      "description": "High-performance workflow execution engine written in Mojo, delivering hardware-accelerated SIMD parallel execution of DHGWorkflow graphs."
    },
    {
      "id": "mojito",
      "number": 37,
      "name": "Mojito",
      "subtitle": "Async Scheduler",
      "lines": [
        "line-shuttle"
      ],
      "x": 940,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "Mojito"
      ],
      "primaryRepo": "Mojito",
      "tech": [
        "Mojo",
        "Async Tasks"
      ],
      "venues": [],
      "description": "Mojo-based integrated task orchestrator delivering lightweight async scheduling, lock-free queues, and microsecond latency dispatching."
    },
    {
      "id": "firm",
      "mapBadge": "IEEE MIPRO'16",
      "number": 38,
      "name": "FIRM",
      "subtitle": "Serverless FaaS",
      "lines": [
        "line-shuttle"
      ],
      "x": 1040,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "FIRM"
      ],
      "primaryRepo": "FIRM",
      "tech": [
        "Mojo",
        "FaaS Orchestration"
      ],
      "venues": [
        {
          "name": "IEEE MIPRO 2016",
          "tier": "IEEE",
          "note": "A FIRM Approach for Software-Defined Service Composition"
        }
      ],
      "description": "Find, Invoke, Return, and Manage: a low-latency serverless function invocation framework written in Mojo for edge intelligence."
    },
    {
      "id": "faro",
      "mapBadge": "Springer OTM'15",
      "number": 39,
      "name": "Faro",
      "subtitle": "MinHash LSH",
      "lines": [
        "line-shuttle"
      ],
      "x": 1140,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "Faro",
        "dudu"
      ],
      "primaryRepo": "Faro",
      "tech": [
        "Go",
        "MinHash",
        "LSH"
      ],
      "venues": [
        {
          "name": "Springer OTM 2015",
          "tier": "Springer",
          "note": "Multi-Tenanted Framework: Distributed Near Duplicate Detection for Big Data"
        }
      ],
      "description": "High-throughput near-duplicate detection in Go using MinHash and Locality-Sensitive Hashing (LSH), modernizing the lab's earlier Java dudu engine."
    }
  ],
  "tracks": [
    {
      "id": "track-soa-main",
      "lineId": "line-soa",
      "path": "M 100,160 L 720,160 Q 760,160 780,220 L 795,320 Q 800,350 800,380"
    },
    {
      "id": "track-net-main",
      "lineId": "line-net",
      "path": "M 100,380 L 1240,380 Q 1360,380 1410,430 L 1460,500"
    },
    {
      "id": "track-health-main",
      "lineId": "line-health",
      "path": "M 120,620 L 1220,620 Q 1340,620 1410,560 L 1460,500"
    },
    {
      "id": "track-trust-main",
      "lineId": "line-trust",
      "path": "M 920,160 L 1240,160 Q 1300,160 1330,190 L 1370,240 Q 1420,290 1470,320 L 1530,400"
    },
    {
      "id": "track-community-main",
      "lineId": "line-community",
      "path": "M 100,820 L 660,820 L 660,620"
    },
    {
      "id": "track-shuttle",
      "lineId": "line-shuttle",
      "path": "M 720,160 Q 730,210 740,260 L 1180,260 Q 1210,260 1210,300 L 1210,340 Q 1210,380 1100,380"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = METRO_DATA;
}
