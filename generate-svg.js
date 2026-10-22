// Node.js script to generate a crisp, standalone SVG metro map
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

function generateSvg() {
  const width = 1680;
  const height = 980;

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&amp;family=JetBrains+Mono:wght@500;700&amp;family=Inter:wght@400;500;600;700&amp;display=swap');
      
      .bg { fill: #070d18; }
      .grid-line { stroke: #1e293b; stroke-width: 0.5; stroke-dasharray: 4,4; }
      .zone-bg-1 { fill: #0284c7; fill-opacity: 0.05; }
      .zone-bg-2 { fill: #d97706; fill-opacity: 0.05; }
      .zone-bg-3 { fill: #059669; fill-opacity: 0.05; }
      .zone-bg-4 { fill: #7c3aed; fill-opacity: 0.05; }
      .zone-bg-5 { fill: #e11d48; fill-opacity: 0.05; }
      .zone-border { stroke: #334155; stroke-width: 1.2; stroke-dasharray: 6,6; }
      .zone-title { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
      
      .track-underglow { fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0.3; filter: blur(4px); }
      .track-main { fill: none; stroke-linecap: round; stroke-linejoin: round; }
      
      .station-node { cursor: pointer; }
      .station-label { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 13px; fill: #ffffff; filter: drop-shadow(0 1px 3px rgba(0,0,0,0.8)); }
      .station-sub { font-family: 'Inter', sans-serif; font-weight: 400; font-size: 10.5px; fill: #cbd5e1; }
      .station-venue { font-family: 'JetBrains Mono', monospace; font-size: 9.5px; font-weight: 600; fill: #38bdf8; }
      .station-num { font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 700; text-anchor: middle; dominant-baseline: central; fill: #0f172a; }
      
      .hub-outer { fill: #070d18; stroke-width: 3.5; }
      .hub-inner { fill: #ffffff; }
      
      .title-main { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; fill: #ffffff; letter-spacing: -0.5px; }
      .title-sub { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; fill: #94a3b8; }
      .title-badge { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; fill: #38bdf8; }
      
      .legend-title { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 700; fill: #cbd5e1; text-transform: uppercase; letter-spacing: 1px; }
      .legend-text { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; fill: #e2e8f0; }
    </style>
    
    <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
    <filter id="card-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="${width}" height="${height}" class="bg"/>

  <!-- Subtle Coordinate Grid -->
  <g opacity="0.3">
`;

  for (let x = 60; x < width; x += 60) {
    svg += `    <line x1="${x}" y1="0" x2="${x}" y2="${height}" class="grid-line"/>\n`;
  }
  for (let y = 60; y < height; y += 60) {
    svg += `    <line x1="0" y1="${y}" x2="${width}" y2="${y}" class="grid-line"/>\n`;
  }

  svg += `  </g>

  <!-- Research Domain Background Zones -->
  <!-- Zone 1: SOA and Middleware -->
  <rect x="50" y="60" width="710" height="205" rx="16" class="zone-bg-1 zone-border"/>
  <text x="70" y="88" class="zone-title" fill="#38bdf8">Service-Oriented Architecture &amp; Distributed Control</text>

  <!-- Zone 4: Autonomous Systems and Trust -->
  <rect x="880" y="60" width="750" height="225" rx="16" class="zone-bg-4 zone-border"/>
  <text x="900" y="88" class="zone-title" fill="#c084fc">Autonomous Systems &amp; Decentralized Trust</text>

  <!-- Zone 2: Network Optimizations and Edge -->
  <rect x="50" y="290" width="1580" height="185" rx="16" class="zone-bg-2 zone-border"/>
  <text x="70" y="318" class="zone-title" fill="#fbbf24">Network Optimizations, Edge Infrastructure &amp; Transport</text>

  <!-- Zone 3: Healthcare and Biomedical -->
  <rect x="50" y="505" width="1580" height="195" rx="16" class="zone-bg-3 zone-border"/>
  <text x="70" y="533" class="zone-title" fill="#34d399">Healthcare, Biomedical Imaging &amp; Telehealth Integration</text>

  <!-- Zone 5: Community and Indigenous -->
  <rect x="50" y="730" width="710" height="150" rx="16" class="zone-bg-5 zone-border"/>
  <text x="70" y="756" class="zone-title" fill="#fb7185">Community Informatics &amp; Indigenous Computing</text>

  <!-- Title Card Header -->
  <g transform="translate(60, 40)">
    <text class="title-main" x="0" y="0">KathiraveluLab Research Metro Map</text>
    <text class="title-sub" x="460" y="-2">Evolutionary Trajectory of Public Projects &amp; Publications (2015 – 2026)</text>
    <rect x="1100" y="-20" width="180" height="26" rx="6" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1"/>
    <text class="title-badge" x="1112" y="-3">UNIVERSITY OF ALASKA</text>
    <rect x="1295" y="-20" width="130" height="26" rx="6" fill="#7c3aed" fill-opacity="0.2" stroke="#c084fc" stroke-width="1"/>
    <text class="title-badge" x="1307" y="-3" fill="#c084fc">2026 EDITION</text>
  </g>

  <!-- Metro Line Tracks (Layer 1: Glow / Under-tracks) -->
  <g id="tracks-glow">
`;

  METRO_DATA.tracks.forEach(track => {
    const line = METRO_DATA.lines.find(l => l.id === track.lineId);
    const strokeWidth = line.dashed ? 6 : 10;
    const dashArray = line.dashed ? 'stroke-dasharray="10,8"' : '';
    svg += `    <path d="${track.path}" stroke="${line.color}" stroke-width="${strokeWidth + 8}" class="track-underglow" ${dashArray}/>\n`;
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
  <g id="interchange-connectors">
    <!-- Viseu interchange (Line 1 to Line 2) -->
    <line x1="800" y1="365" x2="800" y2="395" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>
    
    <!-- Beehive interchange (Line 3 to Line 5) -->
    <line x1="660" y1="605" x2="660" y2="635" stroke="#f8fafc" stroke-width="6" stroke-linecap="round"/>

    <!-- Sintra terminus interchange (Line 2 to Line 3) -->
    <circle cx="1460" cy="500" r="24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>
  </g>

  <!-- Stations Rendering -->
  <g id="stations">
`;

  METRO_DATA.stations.forEach(station => {
    const primaryLine = METRO_DATA.lines.find(l => l.id === station.lines[0]);
    const color = primaryLine ? primaryLine.color : '#0284c7';
    const accent = primaryLine ? primaryLine.accentColor : '#38bdf8';
    
    // Clean label positioning logic
    let labelY = station.y - 24;
    let subY = station.y - 10;
    let venueY = station.y + 24;
    let textAnchor = "middle";
    let labelX = station.x;

    // Custom adjustments to prevent overlap
    if (station.id === "control-core" || station.id === "viseu" || station.id === "beehive" || station.id === "awanta" || station.id === "niffler") {
      labelY = station.y + 28;
      subY = station.y + 42;
      venueY = station.y + 56;
    } else if (station.id === "sintra") {
      labelY = station.y - 32;
      subY = station.y - 18;
      venueY = station.y + 36;
    } else if (station.lines.includes("line-community")) {
      labelY = station.y - 18;
      subY = station.y - 32;
      venueY = station.y + 24;
    } else if (station.id === "iguana" || station.id === "impact") {
      labelX = station.x + 28;
      labelY = station.y - 8;
      subY = station.y + 6;
      venueY = station.y + 20;
      textAnchor = "start";
    } else if (station.id === "trace") {
      labelX = station.x + 24;
      labelY = station.y + 4;
      subY = station.y + 18;
      venueY = station.y + 32;
      textAnchor = "start";
    }

    const firstVenue = station.venues && station.venues.length > 0 ? station.venues[0].name : "";
    const tierBadge = station.venues && station.venues.length > 0 && station.venues[0].tier ? ` [${station.venues[0].tier}]` : "";

    svg += `    <!-- Station: ${escapeXml(station.name)} (${station.number}) -->\n`;
    svg += `    <g id="station-${escapeXml(station.id)}" class="station-node" transform="translate(0, 0)">\n`;

    if (station.isMajorHub) {
      // Major Interchange / Hub Node: double concentric rings
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="17" class="hub-outer" stroke="${color}"/>\n`;
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="11" fill="${color}"/>\n`;
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="6" class="hub-inner"/>\n`;
      svg += `      <text x="${station.x}" y="${station.y - 25}" class="station-num" fill="${accent}">${station.number}</text>\n`;
    } else {
      // Standard Station: colored disc
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="10" fill="#070d18" stroke="${color}" stroke-width="4.5"/>\n`;
      svg += `      <circle cx="${station.x}" cy="${station.y}" r="5" fill="#ffffff"/>\n`;
      svg += `      <text x="${station.x}" y="${station.y - 18}" class="station-num" fill="#94a3b8">${station.number}</text>\n`;
    }

    // Text labels with XML escaping
    svg += `      <text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" class="station-label">${escapeXml(station.name)}</text>\n`;
    svg += `      <text x="${labelX}" y="${subY}" text-anchor="${textAnchor}" class="station-sub">${escapeXml(station.subtitle)}</text>\n`;
    if (firstVenue) {
      svg += `      <text x="${labelX}" y="${venueY}" text-anchor="${textAnchor}" class="station-venue" fill="${accent}">${escapeXml(firstVenue)}${escapeXml(tierBadge)}</text>\n`;
    }

    svg += `    </g>\n\n`;
  });

  svg += `  </g>

  <!-- Map Legend (Bottom Panel) -->
  <g transform="translate(60, 895)">
    <!-- Legend Card Background -->
    <rect x="-10" y="-15" width="1560" height="85" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5" filter="url(#card-shadow)"/>
    
    <text x="15" y="10" class="legend-title">TRANSIT LINES</text>
    
    <!-- Line 1 -->
    <line x1="140" y1="6" x2="180" y2="6" stroke="#0284c7" stroke-width="6" stroke-linecap="round"/>
    <circle cx="160" cy="6" r="4" fill="#ffffff"/>
    <text x="195" y="10" class="legend-text">Line 1: Service-Oriented Middleware</text>

    <!-- Line 2 -->
    <line x1="480" y1="6" x2="520" y2="6" stroke="#d97706" stroke-width="6" stroke-linecap="round"/>
    <circle cx="500" cy="6" r="4" fill="#ffffff"/>
    <text x="535" y="10" class="legend-text">Line 2: Network Transport &amp; Edge</text>

    <!-- Line 3 -->
    <line x1="800" y1="6" x2="840" y2="6" stroke="#059669" stroke-width="6" stroke-linecap="round"/>
    <circle cx="820" cy="6" r="4" fill="#ffffff"/>
    <text x="855" y="10" class="legend-text">Line 3: Healthcare &amp; Biomedical Informatics</text>

    <!-- Line 4 -->
    <line x1="140" y1="42" x2="180" y2="42" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/>
    <circle cx="160" cy="42" r="4" fill="#ffffff"/>
    <text x="195" y="46" class="legend-text">Line 4: Autonomous Systems &amp; Decentralized Trust</text>

    <!-- Line 5 -->
    <line x1="560" y1="42" x2="600" y2="42" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
    <circle cx="580" cy="42" r="4" fill="#ffffff"/>
    <text x="615" y="46" class="legend-text">Line 5: Community &amp; Indigenous Computing</text>

    <!-- Shuttle -->
    <line x1="940" y1="42" x2="980" y2="42" stroke="#475569" stroke-width="5" stroke-dasharray="6,4" stroke-linecap="round"/>
    <text x="995" y="46" class="legend-text">Runtime Shuttle: High-Performance Workflow Engines</text>

    <!-- Symbols -->
    <g transform="translate(1330, 24)">
      <circle cx="0" cy="0" r="10" class="hub-outer" stroke="#38bdf8"/>
      <circle cx="0" cy="0" r="6" fill="#0284c7"/>
      <circle cx="0" cy="0" r="3" class="hub-inner"/>
      <text x="18" y="4" class="legend-text" font-size="10.5">Major Transfer Hub</text>
    </g>
  </g>
</svg>`;

  const outputPath = path.join(__dirname, 'assets', 'kathiravelulab-metro-map.svg');
  fs.writeFileSync(outputPath, svg, 'utf8');
  console.log(`Updated SVG successfully at ${outputPath} (${svg.length} bytes)`);
}

generateSvg();
