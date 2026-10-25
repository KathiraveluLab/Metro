// Node.js script to generate a crisp, standalone SVG metro map with a clean white background
const fs = require('fs');
const path = require('path');
const METRO_DATA = require('./metro-data.js');

function escapeXml(unsafe) {
  if (unsafe === undefined || unsafe === null) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getStationLayout(station) {
  let labelX = station.x;
  let textAnchor = "middle";
  let labelY, subY, venueY;

  if (station.id === "sintra") {
    // Sintra labels above the purple line, to the left of node
    labelX = station.x - 28;
    textAnchor = "end";
    labelY = station.y - 32;
    subY = station.y - 18;
    venueY = station.y - 5;
  } else if (station.id === "chief") {
    // CHIEF is at (185, 290): Labels Below Node, centered under interchange station
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "cloud2sim") {
    // Cloud2Sim is at (70, 290): Standard starting station on Line 2
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "bindaas") {
    // Bindaas is at (70, 630): Standard station before CONTROL-CORE on Line 3.
    // Labels Below Node, aligned under node
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "control-core") {
    // CONTROL-CORE is at (185, 630): Western transfer hub bridging Line 3 and Line 1
    // Labels Below Node, aligned directly under the interchange station
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "viseu") {
    // Viseu is at (780, 290): Labels Below Node, perfectly centered under node
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "lagos") {
    // LAGOS is at (1560, 450): Labels Below Node, centered under node within Zone 4 box
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "dudu") {
    // dudu at (650, 75): Starting terminal of Line 6, appears vertically from the top
    // Labels to the right of vertical track, safely inside Zone 6 and well clear of DHGWorkflow
    labelX = station.x + 18;
    textAnchor = "start";
    labelY = station.y - 4;
    subY = station.y + 10;
    venueY = station.y + 24;
  } else if (station.id === "guarda") {
    // GUARDA at (650, 150): Interchange between Line 1 and Line 6
    // Labels to the right of node below track, avoiding overlap with SOFIA
    labelX = station.x + 18;
    textAnchor = "start";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "sofia") {
    // SOFIA at (565, 150): Labels Below Node
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.id === "can") {
    // CAN at (1330, 290): Transfer Hub bridging Line 2 and Line 6
    // Labels in Top-Left quadrant, comfortably above Yellow track
    labelX = station.x - 24;
    textAnchor = "end";
    labelY = station.y - 42;
    subY = station.y - 28;
    venueY = station.y - 14;
  } else if (station.id === "mojito") {
    // Mojito at (1330, 360): Terminal station of Line 6 turned 90 degrees down after CAN
    // Labels Below Node
    labelX = station.x;
    textAnchor = "middle";
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  } else if (station.lines.includes("line-shuttle")) {
    // Line 6 stations on the flat horizontal line (dhgworkflow, ararat, firm, faro at y=150): Labels Above Node
    labelY = station.y - 44;
    subY = station.y - 31;
    venueY = station.y - 18;
  } else if (station.y === 150) {
    // Tier 1 (Line 1 SOA): Labels Above Node
    labelY = station.isMajorHub ? station.y - 48 : station.y - 44;
    subY = station.isMajorHub ? station.y - 34 : station.y - 31;
    venueY = station.isMajorHub ? station.y - 21 : station.y - 18;
  } else {
    // Tiers 2, 3, 4 (Line 2 Network, Line 5 Community, Line 4 Trust, Line 3 Healthcare): Labels Below Node
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
  }

  return { labelX, labelY, subY, venueY, textAnchor };
}

function generateSvg() {
  const width = 1680;
  const height = 830;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;family=Inter:wght@400;500;600;700&amp;display=swap');
      
      .bg { fill: #ffffff; }
      .grid-line { stroke: #f1f5f9; stroke-width: 0.8; stroke-dasharray: 4,4; }
      
      .zone-bg-1 { fill: #f0f9ff; }
      .zone-bg-2 { fill: #fffbeb; }
      .zone-bg-3 { fill: #f0fdf4; }
      .zone-bg-4 { fill: #faf5ff; }
      .zone-bg-5 { fill: #f8fafc; }
      .zone-bg-6 { fill: #fff1f2; }
      
      .zone-border-1 { stroke: #bae6fd; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-2 { stroke: #fde68a; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-3 { stroke: #bbf7d0; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-4 { stroke: #e9d5ff; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-5 { stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-6 { stroke: #fecdd3; stroke-width: 1.5; stroke-dasharray: 6,6; }
      
      .zone-title { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
      
      .track-underglow { fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0.18; }
      .track-main { fill: none; stroke-linecap: round; stroke-linejoin: round; }
      
      .station-node { cursor: pointer; }
      .station-label { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 13px; fill: #0f172a; }
      .station-sub { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10.5px; fill: #475569; }
      .station-venue { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700; }
      
      .hub-outer { fill: #ffffff; stroke-width: 4; }
      .hub-inner { fill: #ffffff; }
      
      .title-main { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; fill: #0f172a; letter-spacing: -0.5px; }
      .title-sub { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; fill: #64748b; }
      .title-badge { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; fill: #0284c7; }
      
      .legend-title { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; fill: #334155; text-transform: uppercase; letter-spacing: 1px; }
      .legend-text { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; fill: #1e293b; }
    </style>
    
    <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.08"/>
    </filter>
    <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Clean Solid White Background Base -->
  <rect width="${width}" height="${height}" fill="#ffffff" class="bg"/>

  <!-- Subtle Coordinate Grid -->
  <g opacity="0.6">
`;

  for (let x = 60; x < width; x += 60) {
    svg += `    <line x1="${x}" y1="0" x2="${x}" y2="${height}" class="grid-line"/>\n`;
  }
  for (let y = 60; y < height; y += 60) {
    svg += `    <line x1="0" y1="${y}" x2="${width}" y2="${y}" class="grid-line"/>\n`;
  }

  svg += `  </g>

  <!-- Research Domain Background Zones (Light Pastel Tints) -->
  <!-- Zone 1: SOA and Middleware (Tier 1 West) -->
  <rect x="50" y="60" width="550" height="120" rx="16" class="zone-bg-1 zone-border-1"/>
  <text x="70" y="84" class="zone-title" fill="#0284c7">Service-Oriented Architecture &amp; Distributed Control</text>

  <!-- Zone 6: High-Performance Workflow and Systems Runtimes (Tier 1 East) -->
  <rect x="620" y="60" width="760" height="120" rx="16" class="zone-bg-6 zone-border-6"/>
  <text x="880" y="84" class="zone-title" fill="#be123c">High-Performance Workflow &amp; Systems Runtimes</text>

  <!-- Zone 2: Network Optimizations and Edge (Tier 2 Full Width) -->
  <rect x="15" y="205" width="1625" height="145" rx="16" class="zone-bg-2 zone-border-2"/>
  <text x="35" y="228" class="zone-title" fill="#b45309">Network Optimizations, Edge Infrastructure &amp; Transport</text>

  <!-- Zone 5: Community and Indigenous (Tier 3 West) -->
  <rect x="215" y="370" width="595" height="145" rx="16" class="zone-bg-5 zone-border-5"/>
  <text x="235" y="394" class="zone-title" fill="#64748b">Community Informatics &amp; Indigenous Computing</text>

  <!-- Zone 4: Autonomous Systems and Trust (Tier 3 East) -->
  <rect x="830" y="370" width="800" height="145" rx="16" class="zone-bg-4 zone-border-4"/>
  <text x="850" y="394" class="zone-title" fill="#7c3aed">Autonomous Systems &amp; Decentralized Trust</text>

  <!-- Zone 3: Healthcare and Biomedical (Tier 4 Bottom-Most Full Width) -->
  <rect x="15" y="540" width="1625" height="155" rx="16" class="zone-bg-3 zone-border-3"/>
  <text x="35" y="564" class="zone-title" fill="#047857">Healthcare, Biomedical Imaging &amp; Telehealth Integration</text>

  <!-- Title Card Header -->
  <g transform="translate(60, 40)">
    <text class="title-main" x="0" y="0">KathiraveluLab Research Metro Map</text>
    <rect x="1100" y="-20" width="180" height="26" rx="6" fill="#e0f2fe" stroke="#38bdf8" stroke-width="1.2"/>
    <text class="title-badge" x="1112" y="-3">UNIVERSITY OF ALASKA</text>
    <rect x="1295" y="-20" width="130" height="26" rx="6" fill="#f3e8ff" stroke="#a855f7" stroke-width="1.2"/>
    <text class="title-badge" x="1307" y="-3" fill="#7c3aed">2026 EDITION</text>
  </g>

  <!-- Metro Line Tracks (Layer 1: Under-tracks for anti-aliasing depth) -->
  <g id="tracks-glow">
`;

  METRO_DATA.tracks.forEach(track => {
    const line = METRO_DATA.lines.find(l => l.id === track.lineId);
    const strokeWidth = line.dashed ? 6 : 10;
    const dashArray = line.dashed ? 'stroke-dasharray="10,8"' : '';
    svg += `    <path d="${track.path}" stroke="${line.color}" stroke-width="${strokeWidth + 6}" class="track-underglow" ${dashArray}/>\n`;
  });

  svg += `  </g>

  <!-- Metro Line Tracks (Layer 2: Core Solid Tracks) -->
  <g id="tracks-core">
`;

  METRO_DATA.tracks.forEach(track => {
    const line = METRO_DATA.lines.find(l => l.id === track.lineId);
    const strokeWidth = line.dashed ? 5 : 8;
    const dashArray = line.dashed ? 'stroke-dasharray="10,6"' : '';
    svg += `    <path id="${track.id}" d="${track.path}" stroke="${line.color}" stroke-width="${strokeWidth}" class="track-main" ${dashArray}/>\n`;
  });

  svg += `  </g>

  <!-- Transfer Connections / Interchange Markers -->
  <g id="interchange-connectors" pointer-events="none">
    <!-- Viseu interchange (Line 1 to Line 2 & Line 4) -->
    <line x1="780" y1="275" x2="780" y2="305" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
    
    <!-- Beehive interchange (Line 3 to Line 5) -->
    <line x1="750" y1="615" x2="750" y2="645" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>
  </g>

  <!-- Stations Rendering -->
  <g id="stations">
`;

  METRO_DATA.stations.forEach(station => {
    const primaryLine = METRO_DATA.lines.find(l => l.id === station.lines[0]);
    const color = primaryLine ? primaryLine.color : '#0284c7';
    
    // Station layout and label positioning logic
    const { labelX, labelY, subY, venueY, numX, numY, textAnchor } = getStationLayout(station);

    const badgeText = station.mapBadge || (station.venues && station.venues.length > 0 ? station.venues[0].name : "");

    svg += `    <!-- Station: ${escapeXml(station.name)} -->\n`;
    svg += `    <g id="station-${escapeXml(station.id)}" class="station-node" transform="translate(0, 0)">\n`;

    if (station.isMajorHub) {
      if (station.id === "viseu") {
        // Triple Interchange Hub: Line 2 (Amber) outer ring on mainline, Line 1 (Blue) middle ring, Line 4 (Purple) core
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="21" class="hub-outer" stroke="#d97706" stroke-width="4.5" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="14" fill="#ffffff" stroke="#0284c7" stroke-width="3.5"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="8" fill="#7c3aed"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="3.5" class="hub-inner"/>\n`;
      } else if (station.id === "sintra") {
        // Triple Interchange Hub: Line 4 (Purple) outer ring, Line 2 (Amber) middle ring, Line 3 (Emerald) core
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="21" class="hub-outer" stroke="#7c3aed" stroke-width="4.5" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="14" fill="#ffffff" stroke="#d97706" stroke-width="3.5"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="8" fill="#059669"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="3.5" class="hub-inner"/>\n`;
      } else if (station.id === "control-core" || station.id === "beehive" || station.id === "guarda" || station.id === "can" || station.id === "chief") {
        // Dual Interchange Hub (CONTROL-CORE, Beehive, GUARDA, CAN, CHIEF)
        const secondaryLine = METRO_DATA.lines.find(l => l.id === station.lines[1]);
        const innerColor = secondaryLine ? secondaryLine.color : color;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="17" class="hub-outer" stroke="${color}" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="11" fill="${innerColor}"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="6" class="hub-inner"/>\n`;
      } else {
        // Major Interchange / Hub Node: double concentric rings with white fill
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="17" class="hub-outer" stroke="${color}" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="11" fill="${color}"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="6" class="hub-inner"/>\n`;
      }
    } else {
      // Standard Station: white disc with colored stroke
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="10" fill="#ffffff" stroke="${color}" stroke-width="4.5" filter="url(#hub-shadow)"/>\n`;
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="4" fill="#0f172a"/>\n`;
    }

    // Text labels
    svg += `      <text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" class="station-label">${escapeXml(station.name)}</text>\n`;
    svg += `      <text x="${labelX}" y="${subY}" text-anchor="${textAnchor}" class="station-sub">${escapeXml(station.subtitle)}</text>\n`;
    if (badgeText) {
      const badgeColor = station.id === 'viseu' ? '#d97706' : (station.id === 'sintra' ? '#7c3aed' : color);
      svg += `      <text x="${labelX}" y="${venueY}" text-anchor="${textAnchor}" class="station-venue" fill="${badgeColor}">${escapeXml(badgeText)}</text>\n`;
    }

    svg += `    </g>\n\n`;
  });

  svg += `  </g>

  <!-- Map Legend (Bottom Panel on White Card) -->
  <g transform="translate(60, 720)">
    <!-- Legend Card Background -->
    <rect x="-10" y="-15" width="1560" height="85" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" filter="url(#card-shadow)"/>
    
    <text x="15" y="10" class="legend-title">TRANSIT LINES</text>
    
    <!-- Line 1 -->
    <line x1="140" y1="6" x2="180" y2="6" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
    <circle cx="160" cy="6" r="4" fill="#ffffff" stroke="#0284c7" stroke-width="1.5"/>
    <text x="195" y="10" class="legend-text">Line 1: Service-Oriented Middleware</text>

    <!-- Line 2 -->
    <line x1="480" y1="6" x2="520" y2="6" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
    <circle cx="500" cy="6" r="4" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
    <text x="535" y="10" class="legend-text">Line 2: Network Transport &amp; Edge</text>

    <!-- Line 3 -->
    <line x1="800" y1="6" x2="840" y2="6" stroke="#059669" stroke-width="6" stroke-linecap="round"/>
    <circle cx="820" cy="6" r="4" fill="#ffffff" stroke="#059669" stroke-width="1.5"/>
    <text x="855" y="10" class="legend-text">Line 3: Healthcare &amp; Biomedical Informatics</text>

    <!-- Line 4 -->
    <line x1="140" y1="42" x2="180" y2="42" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/>
    <circle cx="160" cy="42" r="4" fill="#ffffff" stroke="#7c3aed" stroke-width="1.5"/>
    <text x="195" y="46" class="legend-text">Line 4: Autonomous Systems &amp; Decentralized Trust</text>

    <!-- Line 5 -->
    <line x1="560" y1="42" x2="600" y2="42" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
    <circle cx="580" cy="42" r="4" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
    <text x="615" y="46" class="legend-text">Line 5: Community &amp; Indigenous Computing</text>

    <!-- Line 6 -->
    <line x1="930" y1="42" x2="970" y2="42" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
    <circle cx="950" cy="42" r="4" fill="#ffffff" stroke="#e11d48" stroke-width="1.5"/>
    <text x="985" y="46" class="legend-text">Line 6: High-Performance Workflow &amp; Systems Runtimes</text>

    <!-- Legend Divider -->
    <line x1="1310" y1="-2" x2="1310" y2="58" stroke="#e2e8f0" stroke-width="1.2"/>

    <!-- Hub Symbols -->
    <!-- Major Station (Blue inside Blue) -->
    <g transform="translate(1335, 6)">
      <circle cx="0" cy="0" r="10" class="hub-outer" stroke="#0284c7" fill="#ffffff"/>
      <circle cx="0" cy="0" r="6" fill="#0284c7"/>
      <circle cx="0" cy="0" r="3" class="hub-inner"/>
      <text x="18" y="4" class="legend-text" font-size="10.5">Major Station</text>
    </g>

    <!-- Major Interchange (3 Different Layers: Amber, Blue, Purple) -->
    <g transform="translate(1335, 42)">
      <circle cx="0" cy="0" r="11" fill="#ffffff" stroke="#d97706" stroke-width="2.8"/>
      <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#0284c7" stroke-width="2.2"/>
      <circle cx="0" cy="0" r="4" fill="#7c3aed"/>
      <circle cx="0" cy="0" r="1.8" fill="#ffffff" class="hub-inner"/>
      <text x="18" y="4" class="legend-text" font-size="10.5">Major Interchange</text>
    </g>
  </g>
</svg>`;

  const outputPath = path.join(__dirname, 'assets', 'kathiravelulab-metro-map.svg');
  fs.writeFileSync(outputPath, svg, 'utf8');
  console.log(`Generated white-background SVG successfully at ${outputPath} (${svg.length} bytes)`);
}

generateSvg();
