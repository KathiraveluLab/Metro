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
  let labelY, subY, venueY, numY;

  if (station.id === "sintra") {
    labelX = station.x + 28;
    textAnchor = "start";
    labelY = station.y - 6;
    subY = station.y + 10;
    venueY = station.y + 24;
    numY = station.y - 23;
  } else if (station.y === 150) {
    // Tier 1 (Line 1 SOA & Line 6 Workflows & Runtimes): Labels Above Node, Numbers Below
    labelY = station.isMajorHub ? station.y - 48 : station.y - 44;
    subY = station.isMajorHub ? station.y - 34 : station.y - 31;
    venueY = station.isMajorHub ? station.y - 21 : station.y - 18;
    numY = station.isMajorHub ? station.y + 24 : station.y + 19;
  } else {
    // Tiers 2, 3, 4 (Line 2 Network, Line 5 Community, Line 4 Trust, Line 3 Healthcare): Labels Below Node, Numbers Above
    labelY = station.y + 25;
    subY = station.y + 39;
    venueY = station.y + 52;
    numY = station.isMajorHub ? station.y - 23 : station.y - 17;
  }

  return { labelX, labelY, subY, venueY, numY, textAnchor };
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
      .zone-bg-5 { fill: #fff1f2; }
      .zone-bg-6 { fill: #f8fafc; }
      
      .zone-border-1 { stroke: #bae6fd; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-2 { stroke: #fde68a; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-3 { stroke: #bbf7d0; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-4 { stroke: #e9d5ff; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-5 { stroke: #fecdd3; stroke-width: 1.5; stroke-dasharray: 6,6; }
      .zone-border-6 { stroke: #cbd5e1; stroke-width: 1.5; stroke-dasharray: 6,6; }
      
      .zone-title { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
      
      .track-underglow { fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0.18; }
      .track-main { fill: none; stroke-linecap: round; stroke-linejoin: round; }
      
      .station-node { cursor: pointer; }
      .station-label { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 13px; fill: #0f172a; }
      .station-sub { font-family: 'Inter', sans-serif; font-weight: 500; font-size: 10.5px; fill: #475569; }
      .station-venue { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 700; }
      .station-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; text-anchor: middle; dominant-baseline: central; fill: #334155; }
      
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
  <rect x="50" y="60" width="640" height="120" rx="16" class="zone-bg-1 zone-border-1"/>
  <text x="70" y="84" class="zone-title" fill="#0284c7">Service-Oriented Architecture &amp; Distributed Control</text>

  <!-- Zone 6: High-Performance Workflow and Systems Runtimes (Tier 1 East) -->
  <rect x="710" y="60" width="710" height="120" rx="16" class="zone-bg-6 zone-border-6"/>
  <text x="735" y="84" class="zone-title" fill="#64748b">High-Performance Workflow &amp; Systems Runtimes</text>

  <!-- Zone 2: Network Optimizations and Edge (Tier 2 Full Width) -->
  <rect x="50" y="205" width="1580" height="145" rx="16" class="zone-bg-2 zone-border-2"/>
  <text x="70" y="228" class="zone-title" fill="#b45309">Network Optimizations, Edge Infrastructure &amp; Transport</text>

  <!-- Zone 5: Community and Indigenous (Tier 3 West) -->
  <rect x="50" y="370" width="680" height="145" rx="16" class="zone-bg-5 zone-border-5"/>
  <text x="70" y="394" class="zone-title" fill="#be123c">Community Informatics &amp; Indigenous Computing</text>

  <!-- Zone 4: Autonomous Systems and Trust (Tier 3 East) -->
  <rect x="830" y="370" width="550" height="145" rx="16" class="zone-bg-4 zone-border-4"/>
  <text x="850" y="394" class="zone-title" fill="#7c3aed">Autonomous Systems &amp; Decentralized Trust</text>

  <!-- Zone 3: Healthcare and Biomedical (Tier 4 Bottom-Most Full Width) -->
  <rect x="50" y="540" width="1580" height="155" rx="16" class="zone-bg-3 zone-border-3"/>
  <text x="70" y="564" class="zone-title" fill="#047857">Healthcare, Biomedical Imaging &amp; Telehealth Integration</text>

  <!-- Title Card Header -->
  <g transform="translate(60, 40)">
    <text class="title-main" x="0" y="0">KathiraveluLab Research Metro Map</text>
    <text class="title-sub" x="460" y="-2">Evolutionary Trajectory of Public Projects &amp; Publications (2015 – 2026)</text>
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
    <line x1="660" y1="615" x2="660" y2="645" stroke="#0f172a" stroke-width="6" stroke-linecap="round"/>

    <!-- Sintra terminus interchange (Line 2 to Line 3) -->
    <circle cx="1460" cy="460" r="24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>

    <!-- Bindaas terminus interchange (Line 1 to Line 3) -->
    <circle cx="80" cy="630" r="24" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>
  </g>

  <!-- Stations Rendering -->
  <g id="stations">
`;

  METRO_DATA.stations.forEach(station => {
    const primaryLine = METRO_DATA.lines.find(l => l.id === station.lines[0]);
    const color = primaryLine ? primaryLine.color : '#0284c7';
    
    // Station layout and label positioning logic
    const { labelX, labelY, subY, venueY, numY, textAnchor } = getStationLayout(station);

    const badgeText = station.mapBadge || (station.venues && station.venues.length > 0 ? station.venues[0].name : "");

    svg += `    <!-- Station: ${escapeXml(station.name)} (${station.number}) -->\n`;
    svg += `    <g id="station-${escapeXml(station.id)}" class="station-node" transform="translate(0, 0)">\n`;

    if (station.isMajorHub) {
      if (station.id === "viseu") {
        // Triple Interchange Hub: Line 2 (Amber) outer ring on mainline, Line 1 (Blue) middle ring, Line 4 (Purple) core
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="21" class="hub-outer" stroke="#d97706" stroke-width="4.5" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="14" fill="#ffffff" stroke="#0284c7" stroke-width="3.5"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="8" fill="#7c3aed"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="3.5" class="hub-inner"/>\n`;
        svg += `      <text x="${station.x}" y="${numY}" class="station-num" fill="#d97706">${station.number}</text>\n`;
      } else if (station.id === "beehive" || station.id === "sintra" || station.id === "bindaas" || station.id === "guarda" || station.id === "can") {
        // Dual Interchange Hub (Beehive, Sintra, Bindaas, GUARDA, CAN)
        const secondaryLine = METRO_DATA.lines.find(l => l.id === station.lines[1]);
        const innerColor = secondaryLine ? secondaryLine.color : color;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="17" class="hub-outer" stroke="${color}" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="11" fill="${innerColor}"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="6" class="hub-inner"/>\n`;
        svg += `      <text x="${station.x}" y="${numY}" class="station-num" fill="${color}">${station.number}</text>\n`;
      } else {
        // Major Interchange / Hub Node: double concentric rings with white fill
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="17" class="hub-outer" stroke="${color}" filter="url(#hub-shadow)"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="11" fill="${color}"/>\n`;
        svg += `      <circle cx="${station.x}" cy="${station.y}" r="6" class="hub-inner"/>\n`;
        svg += `      <text x="${station.x}" y="${numY}" class="station-num" fill="${color}">${station.number}</text>\n`;
      }
    } else {
      // Standard Station: white disc with colored stroke
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="10" fill="#ffffff" stroke="${color}" stroke-width="4.5" filter="url(#hub-shadow)"/>\n`;
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="4" fill="#0f172a"/>\n`;
      svg += `      <text x="${station.x}" y="${numY}" class="station-num" fill="#64748b">${station.number}</text>\n`;
    }

    // Text labels
    svg += `      <text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" class="station-label">${escapeXml(station.name)}</text>\n`;
    svg += `      <text x="${labelX}" y="${subY}" text-anchor="${textAnchor}" class="station-sub">${escapeXml(station.subtitle)}</text>\n`;
    if (badgeText) {
      const badgeColor = station.id === 'viseu' ? '#d97706' : color;
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
    <line x1="560" y1="42" x2="600" y2="42" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
    <circle cx="580" cy="42" r="4" fill="#ffffff" stroke="#e11d48" stroke-width="1.5"/>
    <text x="615" y="46" class="legend-text">Line 5: Community &amp; Indigenous Computing</text>

    <!-- Line 6 -->
    <line x1="940" y1="42" x2="980" y2="42" stroke="#64748b" stroke-width="6" stroke-linecap="round"/>
    <circle cx="960" cy="42" r="4" fill="#ffffff" stroke="#64748b" stroke-width="1.5"/>
    <text x="995" y="46" class="legend-text">Line 6: High-Performance Workflow &amp; Systems Runtimes</text>

    <!-- Symbols -->
    <g transform="translate(1330, 24)">
      <circle cx="0" cy="0" r="10" class="hub-outer" stroke="#0284c7" fill="#ffffff"/>
      <circle cx="0" cy="0" r="6" fill="#0284c7"/>
      <circle cx="0" cy="0" r="3" class="hub-inner"/>
      <text x="18" y="4" class="legend-text" font-size="10.5">Major Transfer Hub</text>
    </g>
  </g>
</svg>`;

  const outputPath = path.join(__dirname, 'assets', 'kathiravelulab-metro-map.svg');
  fs.writeFileSync(outputPath, svg, 'utf8');
  console.log(`Generated white-background SVG successfully at ${outputPath} (${svg.length} bytes)`);
}

generateSvg();
