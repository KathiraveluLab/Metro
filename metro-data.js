/**
 * KathiraveluLab Research Metro Map Data Specification
 * 40 Flagship Research Stations across 5 Transit Lines and 1 High-Performance Shuttle Loop.
 * 
 * Strict publication fidelity: verified peer-reviewed publications from official repository READMEs.
 * Archived foundational milestone Bindaas (Emory Sharma Lab, IEEE BigData 2019) included as Western Transfer Hub bridging Line 1 & Line 3.
 * Standalone stations added for DWiM (3D DICOM in MATLAB) and dudu (Distributed Near-Duplicate in Java, Springer OTM 2015).
 * Viseu connects Line 1, Line 2, and Line 4 (PORTO) as a Major Triple Interchange Hub.
 * Bindaas connects Line 1 and Line 3 as a Major Western Transfer Hub.
 */

const METRO_DATA = {
  "metadata": {
    "title": "KathiraveluLab Research Metro Map",
    "labName": "KathiraveluLab",
    "institution": "University of Alaska Anchorage",
    "website": "https://github.com/KathiraveluLab",
    "version": "2026.7",
    "totalStations": 40,
    "lastUpdated": "2026"
  },
  "lines": [
    {
      "id": "line-soa",
      "name": "Line 1: Service-Oriented & Distributed Middleware",
      "shortName": "SOA & Distributed",
      "color": "#0284c7",
      "accentColor": "#38bdf8",
      "bgClass": "bg-cyan",
      "description": "Closed-loop neuromodulation, context-aware smart buildings, edge service chaining, CPS middleware, and federated interoperability."
    },
    {
      "id": "line-net",
      "name": "Line 2: Network Transport & Edge Infrastructure",
      "shortName": "Network & Edge",
      "color": "#d97706",
      "accentColor": "#fbbf24",
      "bgClass": "bg-amber",
      "description": "Cloud and MapReduce simulation, dynamic flow simulation, community network controller farms, middlebox QoS, bandwidth orchestration, and transport measurements."
    },
    {
      "id": "line-health",
      "name": "Line 3: Healthcare & Biomedical Informatics",
      "shortName": "Healthcare Informatics",
      "color": "#059669",
      "accentColor": "#34d399",
      "bgClass": "bg-emerald",
      "description": "High-throughput DICOM ML pipelines, 3D volume reconstruction, dynamic telemedicine routing, behavioral health data federation, and rural SD-WAN telehealth."
    },
    {
      "id": "line-trust",
      "name": "Line 4: Autonomous Systems & Decentralized Trust",
      "shortName": "Autonomous Trust & AI",
      "color": "#7c3aed",
      "accentColor": "#a78bfa",
      "bgClass": "bg-purple",
      "description": "Blockchain-based edge frameworks, verifiable off-chain state channels, Cairo zero-knowledge proofs, latency-aware overlay governance, and neural guardrails."
    },
    {
      "id": "line-community",
      "name": "Line 5: Community Informatics & Circumpolar Computing",
      "shortName": "Community & Circumpolar",
      "color": "#e11d48",
      "accentColor": "#fb7185",
      "bgClass": "bg-rose",
      "description": "Alaska Native epidemic history mapping, Indigenous language preservation games, Arctic sea ice extent forecasting, and expressive recovery mining."
    },
    {
      "id": "line-shuttle",
      "name": "Runtime Shuttle: High-Performance Workflow Engines",
      "shortName": "Workflow & Runtimes",
      "color": "#475569",
      "accentColor": "#94a3b8",
      "bgClass": "bg-slate",
      "dashed": true,
      "description": "Hardware-accelerated workflow execution, lock-free async schedulers, FaaS service composition, and distributed near-duplicate detection in Java, Mojo, and Go."
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
      "x": 130,
      "y": 160,
      "isMajorHub": false,
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
      "x": 210,
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
      "x": 290,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "Evora"
      ],
      "primaryRepo": "Evora",
      "tech": [
        "Java",
        "Microservices",
        "Docker"
      ],
      "venues": [
        {
          "name": "Trans. Emerging Tel. Tech. (ETT) 2018",
          "tier": "Wiley",
          "note": "Adaptive Edge Service Chaining Architecture"
        },
        {
          "name": "IEEE ICWS 2016",
          "tier": "IEEE",
          "note": "Complex Service Composition at the Network Edge"
        }
      ],
      "description": "Adaptive and dynamic edge service chaining architecture optimizing microservice latency and resource placement across distributed gateways."
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
      "x": 375,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "SDDS",
        "messaging4transport"
      ],
      "primaryRepo": "SDDS",
      "tech": [
        "Java",
        "SDN",
        "Data Middleware"
      ],
      "venues": [
        {
          "name": "IEEE SDS 2018",
          "tier": "IEEE",
          "note": "Software-defined data services: Interoperable and network-aware big data executions"
        }
      ],
      "description": "Software-Defined Data Services framework orchestrating network-aware data transfers and execution pipelines for big data workloads."
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
      "x": 460,
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
      "x": 550,
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
      "x": 650,
      "y": 160,
      "isMajorHub": false,
      "repos": [
        "GUARDA"
      ],
      "primaryRepo": "GUARDA",
      "tech": [
        "Elixir",
        "REST / GraphQL"
      ],
      "venues": [],
      "description": "Gateway for Uniform Access to Remote Data and Analytics built with Elixir/OTP, serving high-throughput concurrent telemetry streams into the Runtime Shuttle."
    },
    {
      "id": "viseu",
      "mapBadge": "COMNET'22",
      "number": 8,
      "name": "Viseu",
      "subtitle": "Edge Services Hub",
      "lines": [
        "line-net",
        "line-soa",
        "line-trust"
      ],
      "x": 780,
      "y": 380,
      "isMajorHub": true,
      "isInterchange": true,
      "repos": [
        "Viseu"
      ],
      "primaryRepo": "Viseu",
      "tech": [
        "Java",
        "Ethereum",
        "P2P Overlay",
        "Edge Middleware"
      ],
      "venues": [
        {
          "name": "Computer Networks (COMNET) 2022",
          "tier": "Elsevier",
          "note": "Towards an Internet-Scale Overlay Network for Latency-Aware Workflows at the Edge"
        }
      ],
      "description": "Major triple-interchange hub bridging Service-Oriented Architecture (Line 1), Network Transport (Line 2), and Blockchain-Based Decentralized Trust (Line 4). Orchestrates virtual services at Internet-scale using P2P overlays, Ethereum trust modules, and private off-chain channels to PORTO."
    },
    {
      "id": "cloud2sim",
      "mapBadge": "UCC'14 / MASCOTS'14",
      "number": 9,
      "name": "Cloud2Sim",
      "subtitle": "Distributed Cloud Sim",
      "lines": [
        "line-net"
      ],
      "x": 145,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "Cloud2Sim"
      ],
      "primaryRepo": "Cloud2Sim",
      "tech": [
        "Java",
        "Hazelcast",
        "Infinispan",
        "MapReduce"
      ],
      "venues": [
        {
          "name": "IEEE/ACM UCC 2014",
          "tier": "IEEE",
          "note": "An Adaptive Distributed Simulator for Cloud and MapReduce Algorithms and Architectures"
        },
        {
          "name": "IEEE MASCOTS 2014",
          "tier": "IEEE",
          "note": "Concurrent and Distributed CloudSim Simulations"
        }
      ],
      "description": "Adaptive and distributed architecture for Cloud and MapReduce simulations, introducing concurrent multi-node simulation using Hazelcast and Infinispan."
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
        "Flow Modeling"
      ],
      "venues": [
        {
          "name": "IEEE IC2E 2015",
          "tier": "IEEE",
          "note": "An Expressive Simulator for Dynamic Network Flows"
        }
      ],
      "description": "Expressive simulator modeling dynamic network flows and SDN control plane behaviors under variable traffic loads."
    },
    {
      "id": "sendim",
      "mapBadge": "IEEE IC2E'16",
      "number": 11,
      "name": "SENDIM",
      "subtitle": "Cloud Simulation",
      "lines": [
        "line-net"
      ],
      "x": 335,
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
      "id": "netuber",
      "mapBadge": "IFIP Networking'18",
      "number": 12,
      "name": "NetUber",
      "subtitle": "SD-Internet",
      "lines": [
        "line-net"
      ],
      "x": 430,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "NetUber"
      ],
      "primaryRepo": "NetUber",
      "tech": [
        "Java",
        "BGP",
        "OpenFlow"
      ],
      "venues": [
        {
          "name": "IFIP Networking 2018",
          "tier": "IFIP",
          "note": "Software-Defined Internet Routing with Cooperative Transit"
        },
        {
          "name": "IEEE SDS 2020",
          "tier": "IEEE",
          "note": "Multipath SD-WAN Routing Framework"
        }
      ],
      "description": "Software-Defined Internet architecture coordinating multi-provider transit routing through cooperative peering exchanges."
    },
    {
      "id": "chief",
      "mapBadge": "IEEE IC2EW'16",
      "number": 13,
      "name": "CHIEF",
      "subtitle": "Controller Farm",
      "lines": [
        "line-net"
      ],
      "x": 525,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "CHIEF",
        "messaging4transport"
      ],
      "primaryRepo": "CHIEF",
      "tech": [
        "Java",
        "SDN Controller",
        "Community Networks"
      ],
      "venues": [
        {
          "name": "IEEE IC2EW 2016",
          "tier": "IEEE",
          "note": "CHIEF: Controller farm for clouds of software-defined community networks"
        }
      ],
      "description": "Controller farm architecture coordinating decentralized software-defined community network topologies across cloud boundaries."
    },
    {
      "id": "smart",
      "mapBadge": "IEEE IM'17",
      "number": 14,
      "name": "SMART",
      "subtitle": "Middlebox QoS",
      "lines": [
        "line-net"
      ],
      "x": 635,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "SMART",
        "messaging4transport"
      ],
      "primaryRepo": "SMART",
      "tech": [
        "Java",
        "SDN Middlebox",
        "Resilient Transfers"
      ],
      "venues": [
        {
          "name": "IEEE IM 2017",
          "tier": "IEEE",
          "note": "SDN middlebox architecture for resilient transfers"
        },
        {
          "name": "Springer OTM 2016",
          "tier": "Springer",
          "note": "Software-Defined Middlebox Architecture for Resilient Data Transfers"
        }
      ],
      "description": "SDN Middlebox architecture designed for resilient big data transfers and proactive failover under heavy network congestion."
    },
    {
      "id": "l4sboa",
      "mapBadge": "IEEE CCECE'25",
      "number": 15,
      "name": "L4SBOA",
      "subtitle": "Bandwidth Orchestration",
      "lines": [
        "line-net"
      ],
      "x": 930,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "L4SBOA"
      ],
      "primaryRepo": "L4SBOA",
      "tech": [
        "Python",
        "P4",
        "eBPF"
      ],
      "venues": [
        {
          "name": "IEEE CCECE 2025",
          "tier": "IEEE",
          "note": "L4S Bandwidth Orchestration Architecture for Ultra-Low Latency"
        }
      ],
      "description": "L4S (Low Latency, Low Loss, and Scalable Throughput) bandwidth orchestration architecture minimizing queueing delays in heterogeneous edge networks."
    },
    {
      "id": "can",
      "number": 16,
      "name": "CAN",
      "subtitle": "Content-Aware Net",
      "lines": [
        "line-net",
        "line-shuttle"
      ],
      "x": 1070,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "CAN"
      ],
      "primaryRepo": "CAN",
      "tech": [
        "Rust",
        "Async / Tokio"
      ],
      "venues": [],
      "description": "Content-Aware Networking engine written in Rust, inspecting payload streams at line-rate to dynamically steer traffic to the Runtime Shuttle."
    },
    {
      "id": "faultsim",
      "number": 17,
      "name": "faultsim",
      "subtitle": "Failure Detector",
      "lines": [
        "line-net"
      ],
      "x": 1210,
      "y": 380,
      "isMajorHub": false,
      "repos": [
        "faultsim"
      ],
      "primaryRepo": "faultsim",
      "tech": [
        "Rust",
        "Fault Injection"
      ],
      "venues": [],
      "description": "Distributed cluster failure detector written in Rust, maintaining high-precision heartbeat matrices under extreme network packet loss."
    },
    {
      "id": "sintra",
      "number": 18,
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
        "RIPE Atlas",
        "Time-Series"
      ],
      "venues": [],
      "description": "Major Terminus Junction connecting Network Optimization with Clinical Healthcare. Leverages RIPE Atlas to steer telehealth traffic along low-jitter routes."
    },
    {
      "id": "bindaas",
      "mapBadge": "IEEE BigData'19",
      "number": 19,
      "name": "Bindaas",
      "subtitle": "Data Federation Hub",
      "lines": [
        "line-health",
        "line-soa"
      ],
      "x": 80,
      "y": 620,
      "isMajorHub": true,
      "isInterchange": true,
      "isArchived": true,
      "repos": [
        "sharmalab/bindaas"
      ],
      "primaryRepo": "sharmalab/bindaas",
      "tech": [
        "Java",
        "OSGi",
        "RESTful APIs",
        "MySQL",
        "MongoDB",
        "Docker"
      ],
      "venues": [
        {
          "name": "IEEE BigData 2019",
          "tier": "IEEE",
          "note": "Data Services with Bindaas: RESTful Interfaces for Diverse Data Sources"
        }
      ],
      "description": "Major Western Transfer Hub uniting Service-Oriented Middleware (Line 1) with Healthcare Informatics (Line 3). An archived foundational data access federation middleware framework developed within the Sharma Lab at Emory University. Provides uniform RESTful APIs for diverse data stores with pluggable RBAC and query auditing, directly underpinning Óbidos and MEDIator while establishing the data services model that inspired SDDS and GUARDA."
    },
    {
      "id": "obidos",
      "mapBadge": "DAPD'19",
      "number": 20,
      "name": "Óbidos",
      "subtitle": "Big Data Integration and Federation",
      "lines": [
        "line-health"
      ],
      "x": 170,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "Obidos",
        "MEDIator",
        "sharmalab/datacafe"
      ],
      "primaryRepo": "Obidos",
      "tech": [
        "Java",
        "Spark",
        "Apache Drill",
        "Apache Hive",
        "ETL",
        "Data Lakes"
      ],
      "venues": [
        {
          "name": "Distributed and Parallel Databases (DAPD) 2019",
          "tier": "Springer",
          "note": "Distributed Data Integration for Biomedical Cohort Discovery (Óbidos)"
        },
        {
          "name": "VLDB DMAH 2017",
          "tier": "VLDB",
          "note": "MEDIator: A Pipeline for Heterogeneous Biomedical Data Integration"
        },
        {
          "name": "VLDB DMAH 2016",
          "tier": "VLDB / Springer",
          "note": "A Dynamic Data Warehousing Platform for Creating and Accessing Biomedical Data Lakes (Data Café)"
        },
        {
          "name": "AMIA Summits 2016",
          "tier": "AMIA",
          "note": "Data Café — A Platform For Creating Biomedical Data Lakes"
        },
        {
          "name": "ACM BigCHat (KDD) 2015",
          "tier": "ACM",
          "note": "Scalable ETL Pipelines for Multimodal Healthcare Records"
        }
      ],
      "description": "Comprehensive biomedical big data integration and federation, dynamic data warehousing, and data lake framework (uniting Óbidos, MEDIator, and Data Café). Harmonizes electronic health records, imaging registries, and genomic datasets for reproducible cohort studies using Apache Spark, Drill, and Hive."
    },
    {
      "id": "niffler",
      "mapBadge": "JDI'21",
      "number": 21,
      "name": "Niffler",
      "subtitle": "DICOM ML Pipelines",
      "lines": [
        "line-health"
      ],
      "x": 260,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "Niffler",
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
      "id": "dwim",
      "number": 22,
      "name": "DWiM",
      "subtitle": "DICOM MATLAB 3D",
      "lines": [
        "line-health"
      ],
      "x": 380,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "DWiM"
      ],
      "primaryRepo": "DWiM",
      "tech": [
        "MATLAB",
        "DICOM",
        "3D Reconstruction",
        "Volume Resampling"
      ],
      "venues": [],
      "description": "DICOM Workflows in MATLAB providing automated series discovery, ImagePositionPatient slice sorting, 3D volume assembly, orientation correction (RAS/LPS), and isotropic voxel resampling."
    },
    {
      "id": "diomede",
      "mapBadge": "GSoC'26",
      "number": 23,
      "name": "Diomede",
      "subtitle": "Dynamic DICOM Mesh",
      "lines": [
        "line-health"
      ],
      "x": 520,
      "y": 620,
      "isMajorHub": false,
      "repos": [
        "Diomede"
      ],
      "primaryRepo": "Diomede",
      "tech": [
        "Python",
        "FastAPI",
        "Redis",
        "Orthanc",
        "Docker"
      ],
      "venues": [],
      "description": "Dynamic DICOM endpoint routing mesh and telemedicine toolkit replacing static IP/port configurations with self-healing, lowest-cost cloud PACS orchestration across regional Orthanc nodes."
    },
    {
      "id": "beehive",
      "mapBadge": "IEEE SysCon'26",
      "number": 24,
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
      "id": "tenet",
      "number": 25,
      "name": "TENeT",
      "subtitle": "Telehealth Effectiveness",
      "lines": [
        "line-health"
      ],
      "x": 920,
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
      "number": 26,
      "name": "AWANTA",
      "subtitle": "SD-WAN Telehealth Hub",
      "lines": [
        "line-health"
      ],
      "x": 1200,
      "y": 620,
      "isMajorHub": true,
      "isInterchange": false,
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
          "note": "AWANTA: Network Measurement and Optimization for Telehealth"
        },
        {
          "name": "IEEE SDS 2023",
          "tier": "IEEE",
          "note": "Software-Defined WAN for Rural Clinical Networks"
        }
      ],
      "description": "An SD-WAN framework engineered specifically for telehealth connectivity across satellite (LEO/GEO), cellular, and terrestrial links in extreme rural climates."
    },
    {
      "id": "porto",
      "mapBadge": "IEEE ISSE'26",
      "number": 27,
      "name": "PORTO",
      "subtitle": "Off-Chain Resource Tracking",
      "lines": [
        "line-trust"
      ],
      "x": 960,
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
      "description": "Private Off-Chain Resource Tracking and Orchestration built in Erlang, enabling high-frequency verifiable resource accounting via state channels connected to Viseu's Ethereum gateway."
    },
    {
      "id": "epicue",
      "number": 28,
      "name": "Epicue",
      "subtitle": "Cairo ZK Verification",
      "lines": [
        "line-trust"
      ],
      "x": 1110,
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
      "number": 29,
      "name": "LAGOS",
      "subtitle": "Latency-Aware Governance",
      "lines": [
        "line-trust"
      ],
      "x": 1260,
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
      "number": 30,
      "name": "IGUANA",
      "subtitle": "Neural Guardrails",
      "lines": [
        "line-trust"
      ],
      "x": 1410,
      "y": 220,
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
      "description": "Terminus of Line 4. Employs actor-based concurrent monitors in Erlang to enforce formal safety invariants and eliminate bias in adaptive neural policies."
    },
    {
      "id": "ak-history-webmap",
      "mapBadge": "IEEE Computer'25",
      "number": 31,
      "name": "AK History Webmap",
      "subtitle": "Epidemic Diseases Web Map",
      "lines": [
        "line-community"
      ],
      "x": 150,
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
      "id": "dnigi",
      "mapBadge": "IEEE Computer'25",
      "number": 32,
      "name": "Dnigi",
      "subtitle": "Indigenous Heritage Game",
      "lines": [
        "line-community"
      ],
      "x": 320,
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
      "id": "dip-predicting-sie",
      "mapBadge": "Elsevier RSA'25",
      "number": 33,
      "name": "Arctic Sea Ice",
      "subtitle": "Arctic Sea Ice AI",
      "lines": [
        "line-community"
      ],
      "x": 490,
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
      "x": 700,
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
      "id": "dudu",
      "mapBadge": "Springer OTM'15",
      "number": 39,
      "name": "∂u∂u",
      "subtitle": "Java Near-Duplicate",
      "lines": [
        "line-shuttle"
      ],
      "x": 1140,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "dudu"
      ],
      "primaryRepo": "dudu",
      "tech": [
        "Java",
        "Multi-Tenancy",
        "Big Data Dedup"
      ],
      "venues": [
        {
          "name": "Springer OTM 2015",
          "tier": "Springer",
          "note": "∂u∂u Multi-Tenanted Framework: Distributed Near Duplicate Detection for Big Data"
        }
      ],
      "description": "Foundational multi-tenanted framework for distributed near-duplicate detection in big data written in Java, introducing tenant-aware hashing partitions."
    },
    {
      "id": "faro",
      "number": 40,
      "name": "Faro",
      "subtitle": "Go MinHash LSH",
      "lines": [
        "line-shuttle"
      ],
      "x": 1240,
      "y": 260,
      "isMajorHub": false,
      "repos": [
        "Faro"
      ],
      "primaryRepo": "Faro",
      "tech": [
        "Go",
        "MinHash",
        "LSH"
      ],
      "venues": [],
      "description": "High-throughput near-duplicate detection in Go using MinHash and Locality-Sensitive Hashing (LSH), modernizing the lab's earlier Java ∂u∂u engine."
    }
  ],
  "tracks": [
    {
      "id": "track-soa-main",
      "lineId": "line-soa",
      "path": "M 80,620 L 80,200 Q 80,160 120,160 L 670,160 Q 730,160 755,220 L 775,340 Q 780,365 780,380"
    },
    {
      "id": "track-net-main",
      "lineId": "line-net",
      "path": "M 115,380 L 1230,380 Q 1350,380 1410,430 L 1460,500"
    },
    {
      "id": "track-health-main",
      "lineId": "line-health",
      "path": "M 80,620 L 1220,620 Q 1340,620 1410,560 L 1460,500"
    },
    {
      "id": "track-trust-main",
      "lineId": "line-trust",
      "path": "M 780,380 Q 785,350 805,310 L 845,220 Q 880,160 960,160 L 1270,160 Q 1340,160 1375,185 L 1410,220"
    },
    {
      "id": "track-community-main",
      "lineId": "line-community",
      "path": "M 100,820 L 660,820 L 660,620"
    },
    {
      "id": "track-shuttle",
      "lineId": "line-shuttle",
      "path": "M 650,160 Q 675,160 685,200 L 700,260 L 1260,260 Q 1290,260 1290,300 L 1290,340 Q 1290,380 1070,380"
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = METRO_DATA;
}
