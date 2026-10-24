/**
 * KathiraveluLab Research Metro Map
 * Interactive Application Controller
 */

(function () {
  'use strict';

  // State Management
  const state = {
    activeLine: 'all',
    selectedStation: null,
    searchQuery: '',
    zoom: 1.0,
    panX: 0,
    panY: 0,
    minZoom: 0.15,
    maxZoom: 2.5,
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    theme: 'light'
  };

  // DOM Elements
  const viewport = document.getElementById('canvas-viewport');
  const surface = document.getElementById('canvas-surface');
  const svg = document.getElementById('metro-svg');
  const drawer = document.getElementById('station-drawer');
  const searchInput = document.getElementById('search-input');
  const themeToggle = document.getElementById('btn-theme-toggle');
  const exportBtn = document.getElementById('btn-export-svg');
  const closeDrawerBtn = document.getElementById('btn-close-drawer');
  const zoomInBtn = document.getElementById('btn-zoom-in');
  const zoomOutBtn = document.getElementById('btn-zoom-out');
  const resetViewBtn = document.getElementById('btn-reset-view');
  const filterContainer = document.getElementById('line-filters');

  // Detect if running inside iframe or embed parameter
  function detectEmbedded() {
    let embedded = false;
    try {
      embedded = window.self !== window.top;
    } catch (e) {
      embedded = true;
    }
    const params = new URLSearchParams(window.location.search);
    if (embedded || params.get('embed') === 'true') {
      document.body.classList.add('is-embedded');
    }
  }

  // Initialize Application
  function init() {
    detectEmbedded();
    renderSvgMap();
    setupPanAndZoom();
    setupFilterButtons();
    setupSearch();
    setupDrawer();
    setupThemeToggle();
    setupExport();

    // Initial responsive fit
    fitMapToContainer(false);
    setTimeout(() => fitMapToContainer(false), 80);

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', () => {
      if (!state.selectedStation) {
        fitMapToContainer(false);
      }
    });
  }

  // Utility: Escape XML entities for safe SVG serialization
  function escapeXml(unsafe) {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  // Consistent station label and badge coordinates preventing overlaps
  function getStationLayout(station) {
    let labelX = station.x;
    let numX = station.x;
    let textAnchor = "middle";
    let labelY, subY, venueY, numY;

    if (station.id === "sintra") {
      // Sintra labels above the purple line, to the left of node
      labelX = station.x - 28;
      textAnchor = "end";
      labelY = station.y - 32;
      subY = station.y - 18;
      venueY = station.y - 5;
      numY = station.y - 23;
    } else if (station.id === "chief") {
      // CHIEF is at (120, 290): Labels Above Node, shifted right to clear slanted track
      labelX = station.x + 28;
      textAnchor = "start";
      labelY = station.y - 38;
      subY = station.y - 25;
      venueY = station.y - 12;
      numX = station.x - 22; // Station number shifted left of node so vertical blue line doesn't cut it
      numY = station.y + 4;
    } else if (station.id === "bindaas") {
      // Bindaas is at (65, 630): Standard station before CONTROL-CORE on Line 3.
      // Labels Above Node (y = 590, 603, 616) to avoid collision with CONTROL-CORE
      labelX = station.x;
      textAnchor = "middle";
      labelY = station.y - 40;
      subY = station.y - 27;
      venueY = station.y - 14;
      numX = station.x;
      numY = station.y + 19;
    } else if (station.id === "control-core") {
      // CONTROL-CORE is at (120, 630): Western transfer hub bridging Line 3 and Line 1
      labelX = station.x;
      textAnchor = "middle";
      labelY = station.y + 25;
      subY = station.y + 39;
      venueY = station.y + 52;
      numX = station.x - 22; // Station number shifted left of node so vertical blue line doesn't cut it
      numY = station.y + 4;
    } else if (station.id === "viseu") {
      // Viseu is at (780, 290): Labels Below Node, perfectly centered under node
      labelX = station.x;
      textAnchor = "middle";
      labelY = station.y + 25;
      subY = station.y + 39;
      venueY = station.y + 52;
      numY = station.y - 23;
    } else if (station.id === "lagos") {
      // LAGOS is at (1560, 460): Labels Below Node, centered under node within Zone 4 box
      labelX = station.x;
      textAnchor = "middle";
      labelY = station.y + 25;
      subY = station.y + 39;
      venueY = station.y + 52;
      numY = station.y - 17;
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

    return { labelX, labelY, subY, venueY, numX, numY, textAnchor };
  }

  // Render SVG Map Elements
  function renderSvgMap() {
    const width = 1680;
    const height = 830;

    let markup = `
      <defs>
        <filter id="glow-soa" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#0284c7" flood-opacity="0.6"/>
        </filter>
        <filter id="glow-net" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#d97706" flood-opacity="0.6"/>
        </filter>
        <filter id="glow-health" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#059669" flood-opacity="0.6"/>
        </filter>
        <filter id="glow-trust" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#7c3aed" flood-opacity="0.6"/>
        </filter>
        <filter id="glow-community" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#e11d48" flood-opacity="0.6"/>
        </filter>
        <filter id="glow-shuttle" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#64748b" flood-opacity="0.6"/>
        </filter>
        <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
      </defs>

      <!-- Background Base -->
      <rect width="${width}" height="${height}" class="bg" fill="currentColor"/>

      <!-- Coordinate Grid -->
      <g class="grid-layer" opacity="0.25">
    `;

    for (let x = 60; x < width; x += 60) {
      markup += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="4,4"/>`;
    }
    for (let y = 60; y < height; y += 60) {
      markup += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="4,4"/>`;
    }

    markup += `
      </g>

      <!-- Research Domain Background Zones -->
      <g class="zones-layer">
        <!-- Zone 1: SOA & Middleware (Tier 1 West) -->
        <rect x="50" y="60" width="640" height="120" rx="16" fill="#0284c7" fill-opacity="0.05" stroke="#0284c7" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="70" y="84" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#38bdf8" letter-spacing="1.5">SERVICE-ORIENTED ARCHITECTURE &amp; DISTRIBUTED CONTROL</text>

        <!-- Zone 6: High-Performance Workflow & Systems Runtimes (Tier 1 East) -->
        <rect x="710" y="60" width="710" height="120" rx="16" fill="#64748b" fill-opacity="0.05" stroke="#64748b" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="735" y="84" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#94a3b8" letter-spacing="1.5">HIGH-PERFORMANCE WORKFLOW &amp; SYSTEMS RUNTIMES</text>

        <!-- Zone 2: Network Optimizations (Tier 2 Full Width) -->
        <rect x="50" y="205" width="1580" height="145" rx="16" fill="#d97706" fill-opacity="0.05" stroke="#d97706" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="70" y="228" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#fbbf24" letter-spacing="1.5">NETWORK OPTIMIZATIONS, EDGE INFRASTRUCTURE &amp; TRANSPORT</text>

        <!-- Zone 5: Community & Circumpolar (Tier 3 West) -->
        <rect x="150" y="370" width="660" height="145" rx="16" fill="#e11d48" fill-opacity="0.05" stroke="#e11d48" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="175" y="394" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#fb7185" letter-spacing="1.5">COMMUNITY INFORMATICS &amp; INDIGENOUS COMPUTING</text>

        <!-- Zone 4: Autonomous Systems & Trust (Tier 3 East) -->
        <rect x="830" y="370" width="800" height="145" rx="16" fill="#7c3aed" fill-opacity="0.05" stroke="#7c3aed" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="850" y="394" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#a78bfa" letter-spacing="1.5">AUTONOMOUS SYSTEMS &amp; DECENTRALIZED TRUST</text>

        <!-- Zone 3: Healthcare (Tier 4 Bottom-Most Full Width) -->
        <rect x="25" y="540" width="1605" height="155" rx="16" fill="#059669" fill-opacity="0.05" stroke="#059669" stroke-width="1.2" stroke-dasharray="6,6" stroke-opacity="0.35"/>
        <text x="45" y="564" font-family="var(--font-display)" font-size="12" font-weight="700" fill="#34d399" letter-spacing="1.5">HEALTHCARE, BIOMEDICAL IMAGING &amp; TELEHEALTH INTEGRATION</text>
      </g>

      <!-- Metro Line Tracks (Layer 1: Glow / Under-tracks) -->
      <g id="tracks-glow">
    `;

    METRO_DATA.tracks.forEach(track => {
      const line = METRO_DATA.lines.find(l => l.id === track.lineId);
      const strokeWidth = line.dashed ? 6 : 10;
      const dashArray = line.dashed ? 'stroke-dasharray="10,8"' : '';
      markup += `<path data-line="${track.lineId}" d="${track.path}" stroke="${line.color}" stroke-width="${strokeWidth + 8}" class="track-underglow" ${dashArray} fill="none" opacity="0.3" filter="blur(4px)"/>`;
    });

    markup += `
      </g>

      <!-- Metro Line Tracks (Layer 2: Core Solid Tracks) -->
      <g id="tracks-core">
    `;

    METRO_DATA.tracks.forEach(track => {
      const line = METRO_DATA.lines.find(l => l.id === track.lineId);
      const strokeWidth = line.dashed ? 5 : 8;
      const dashArray = line.dashed ? 'stroke-dasharray="10,6"' : '';
      markup += `<path id="${track.id}" data-line="${track.lineId}" d="${track.path}" stroke="${line.color}" stroke-width="${strokeWidth}" class="track-main" ${dashArray} fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    });

    markup += `
      </g>

      <!-- Transfer Connectors (purely decorative, no pointer interference) -->
      <g id="interchange-connectors" pointer-events="none">
        <line x1="780" y1="275" x2="780" y2="305" stroke="var(--text-primary)" stroke-width="6" stroke-linecap="round"/>
        <line x1="750" y1="615" x2="750" y2="645" stroke="var(--text-primary)" stroke-width="6" stroke-linecap="round"/>
        <circle cx="1460" cy="460" r="24" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>
        <circle cx="120" cy="630" r="24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>
        <circle cx="120" cy="290" r="24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.8"/>
      </g>

      <!-- Stations Layer -->
      <g id="stations-layer">
    `;

    METRO_DATA.stations.forEach(station => {
      const primaryLine = METRO_DATA.lines.find(l => l.id === station.lines[0]);
      const color = primaryLine ? primaryLine.color : '#0284c7';
      const accent = primaryLine ? primaryLine.accentColor : '#38bdf8';
      const lineIds = station.lines.join(' ');

      const { labelX, labelY, subY, venueY, numX, numY, textAnchor } = getStationLayout(station);

      const badgeText = station.mapBadge || (station.venues && station.venues.length > 0 ? station.venues[0].name : "");

      markup += `
        <g id="station-${station.id}" data-id="${station.id}" data-lines="${lineIds}" class="station-node" tabindex="0" role="button" aria-label="Station ${station.name}">
          <!-- Invisible stationary hitbox ensuring rock-solid clickability -->
          <circle cx="${station.x}" cy="${station.y}" r="28" fill="transparent" class="station-hitbox"/>
      `;

      if (station.isMajorHub) {
        if (station.id === "viseu") {
          markup += `
            <circle cx="${station.x}" cy="${station.y}" r="26" class="hub-outer-pulse" fill="#d97706" fill-opacity="0.25" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="20" class="station-core hub-outer" fill="var(--bg-primary)" stroke="#d97706" stroke-width="4.5" filter="url(#hub-shadow)"/>
            <circle cx="${station.x}" cy="${station.y}" r="14" fill="#ffffff" stroke="#0284c7" stroke-width="3.5" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="8" fill="#7c3aed" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="3.5" fill="#ffffff" pointer-events="none"/>
            <text x="${numX || station.x}" y="${numY}" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" fill="#d97706" pointer-events="none">${station.number}</text>
          `;
        } else if (station.id === "sintra") {
          markup += `
            <circle cx="${station.x}" cy="${station.y}" r="26" class="hub-outer-pulse" fill="#7c3aed" fill-opacity="0.25" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="20" class="station-core hub-outer" fill="var(--bg-primary)" stroke="#7c3aed" stroke-width="4.5" filter="url(#hub-shadow)"/>
            <circle cx="${station.x}" cy="${station.y}" r="14" fill="#ffffff" stroke="#d97706" stroke-width="3.5" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="8" fill="#059669" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="3.5" fill="#ffffff" pointer-events="none"/>
            <text x="${numX || station.x}" y="${numY}" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" fill="#a78bfa" pointer-events="none">${station.number}</text>
          `;
        } else if (station.id === "control-core" || station.id === "beehive" || station.id === "guarda" || station.id === "can" || station.id === "chief") {
          const secondaryLine = METRO_DATA.lines.find(l => l.id === station.lines[1]);
          const innerColor = secondaryLine ? secondaryLine.color : color;
          markup += `
            <circle cx="${station.x}" cy="${station.y}" r="22" class="hub-outer-pulse" fill="${color}" fill-opacity="0.25" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="16" class="station-core hub-outer" fill="var(--bg-primary)" stroke="${color}" stroke-width="4" filter="url(#hub-shadow)"/>
            <circle cx="${station.x}" cy="${station.y}" r="10" fill="${innerColor}" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="5" fill="#ffffff" pointer-events="none"/>
            <text x="${numX || station.x}" y="${numY}" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" fill="${accent}" pointer-events="none">${station.number}</text>
          `;
        } else {
          markup += `
            <circle cx="${station.x}" cy="${station.y}" r="22" class="hub-outer-pulse" fill="${color}" fill-opacity="0.25" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="16" class="station-core hub-outer" fill="var(--bg-primary)" stroke="${color}" stroke-width="4" filter="url(#hub-shadow)"/>
            <circle cx="${station.x}" cy="${station.y}" r="10" fill="${color}" pointer-events="none"/>
            <circle cx="${station.x}" cy="${station.y}" r="5" fill="#ffffff" pointer-events="none"/>
            <text x="${numX || station.x}" y="${numY}" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" fill="${accent}" pointer-events="none">${station.number}</text>
          `;
        }
      } else {
        markup += `
          <circle cx="${station.x}" cy="${station.y}" r="11" class="station-core" fill="var(--bg-primary)" stroke="${color}" stroke-width="4.5"/>
          <circle cx="${station.x}" cy="${station.y}" r="5" fill="#ffffff" pointer-events="none"/>
          <text x="${numX || station.x}" y="${numY}" font-family="var(--font-mono)" font-size="9" font-weight="700" text-anchor="middle" fill="var(--text-muted)" pointer-events="none">${station.number}</text>
        `;
      }

      markup += `
          <text x="${labelX}" y="${labelY}" text-anchor="${textAnchor}" class="station-label">${escapeXml(station.name)}</text>
          <text x="${labelX}" y="${subY}" text-anchor="${textAnchor}" class="station-sub">${escapeXml(station.subtitle)}</text>
      `;

      if (badgeText) {
        const badgeColor = station.id === 'viseu' ? '#fbbf24' : (station.id === 'sintra' ? '#a78bfa' : accent);
        markup += `
          <text x="${labelX}" y="${venueY}" text-anchor="${textAnchor}" class="station-venue" fill="${badgeColor}">${escapeXml(badgeText)}</text>
        `;
      }

      markup += `</g>`;
    });

    markup += `</g>`;

    svg.innerHTML = markup;

    // Attach Click and Keyboard Listeners to Stations
    document.querySelectorAll('.station-node').forEach(node => {
      const stationId = node.dataset.id;
      node.addEventListener('click', () => selectStation(stationId));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectStation(stationId);
        }
      });
    });
  }

  // Apply Transform with Optional Smooth Transition
  function updateTransform(smooth = false) {
    if (smooth) {
      surface.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        surface.style.transition = 'none';
      }, 350);
    } else {
      surface.style.transition = 'none';
    }
    surface.style.transform = `translate3d(${state.panX}px, ${state.panY}px, 0) scale(${state.zoom})`;
  }

  // Calculate and Apply Perfect Scale to Fit Entire SVG inside Viewport
  function fitMapToContainer(smooth = false) {
    const containerW = viewport.clientWidth;
    const containerH = viewport.clientHeight;
    if (!containerW || !containerH) return;

    // Actual visual content bounding box in SVG coordinate space:
    // X spans from ~45 (Zone 1/2/3 left) to ~1635 (Zone 4 right) -> width 1600, center 840
    // Y spans from ~50 (Zone 1/4 top) to ~890 (Zone 5 bottom) -> height 870, center 475
    const contentW = 1600;
    const contentH = 880;
    const contentCenterX = 840;
    const contentCenterY = 475;

    const padX = containerW < 600 ? 10 : containerW < 1000 ? 16 : 24;
    const padY = containerH < 500 ? 12 : containerH < 800 ? 20 : 28;

    const availW = Math.max(100, containerW - padX * 2);
    const availH = Math.max(100, containerH - padY * 2);

    const scaleX = availW / contentW;
    const scaleY = availH / contentH;
    const fitScale = Math.min(scaleX, scaleY);

    state.zoom = fitScale;
    state.minZoom = Math.min(0.2, fitScale * 0.5);
    state.maxZoom = 2.5;

    // Center content horizontally and guarantee safe vertical clearance below the header
    state.panX = Math.round((containerW / 2) - (contentCenterX * fitScale));
    const targetPanY = Math.round((containerH / 2) - (contentCenterY * fitScale));
    // Content starts at y: 50. Ensure the top never rises above padY in viewport space:
    const minSafePanY = padY - Math.round(50 * fitScale);
    state.panY = Math.max(minSafePanY, targetPanY);

    updateTransform(smooth);
  }

  // Zoom centered at a specific viewport point
  function zoomAtPoint(pointX, pointY, factor, smooth = false) {
    const newZoom = Math.max(state.minZoom || 0.15, Math.min(state.maxZoom || 2.5, state.zoom * factor));
    if (Math.abs(newZoom - state.zoom) < 0.0005) return;

    const scaleRatio = newZoom / state.zoom;
    state.panX = Math.round(pointX - (pointX - state.panX) * scaleRatio);
    state.panY = Math.round(pointY - (pointY - state.panY) * scaleRatio);
    state.zoom = newZoom;

    updateTransform(smooth);
  }

  // Pan and center smoothly on a specific station
  function panToStation(station) {
    if (!station) return;
    const focusZoom = Math.max(0.85, Math.min(1.5, (state.minZoom || 0.3) * 2.5));
    state.zoom = focusZoom;
    state.panX = Math.round((viewport.clientWidth / 2) - (station.x * focusZoom));
    state.panY = Math.round((viewport.clientHeight / 2) - (station.y * focusZoom));
    updateTransform(true);
  }

  // Setup 2D Pan and Zoom Navigation
  function setupPanAndZoom() {
    // Zoom via buttons
    zoomInBtn.addEventListener('click', () => {
      zoomAtPoint(viewport.clientWidth / 2, viewport.clientHeight / 2, 1.25, true);
    });
    zoomOutBtn.addEventListener('click', () => {
      zoomAtPoint(viewport.clientWidth / 2, viewport.clientHeight / 2, 0.8, true);
    });
    resetViewBtn.addEventListener('click', () => {
      fitMapToContainer(true);
    });

    // Mouse Dragging on Viewport
    viewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('.station-node') || e.target.closest('button') || e.target.closest('a')) return;
      state.isDragging = true;
      state.dragStart = { x: e.clientX, y: e.clientY };
      viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!state.isDragging) return;
      const dx = e.clientX - state.dragStart.x;
      const dy = e.clientY - state.dragStart.y;
      state.panX += dx;
      state.panY += dy;
      state.dragStart = { x: e.clientX, y: e.clientY };
      updateTransform(false);
    });

    window.addEventListener('mouseup', () => {
      if (state.isDragging) {
        state.isDragging = false;
        viewport.style.cursor = 'grab';
      }
    });

    // Touch Dragging & Pinch to Zoom
    let touchStartDist = 0;
    let touchStartZoom = 1.0;
    let touchStartCenter = { x: 0, y: 0 };

    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        if (e.target.closest('.station-node') || e.target.closest('button') || e.target.closest('a')) return;
        state.isDragging = true;
        state.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        state.isDragging = false;
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        touchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        touchStartZoom = state.zoom;
        touchStartCenter = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2
        };
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && state.isDragging) {
        const dx = e.touches[0].clientX - state.dragStart.x;
        const dy = e.touches[0].clientY - state.dragStart.y;
        state.panX += dx;
        state.panY += dy;
        state.dragStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        updateTransform(false);
      } else if (e.touches.length === 2 && touchStartDist > 0) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
        const factor = dist / touchStartDist;
        zoomAtPoint(touchStartCenter.x, touchStartCenter.y, factor, false);
        touchStartDist = dist;
      }
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      state.isDragging = false;
      touchStartDist = 0;
    });

    // Mouse Wheel Zoom toward pointer
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const pointX = e.clientX - rect.left;
      const pointY = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      zoomAtPoint(pointX, pointY, factor, false);
    }, { passive: false });

    // Keyboard Arrow Panning & Shortcuts
    viewport.addEventListener('keydown', (e) => {
      const step = 40;
      switch (e.key) {
        case 'ArrowLeft': state.panX += step; updateTransform(false); break;
        case 'ArrowRight': state.panX -= step; updateTransform(false); break;
        case 'ArrowUp': state.panY += step; updateTransform(false); break;
        case 'ArrowDown': state.panY -= step; updateTransform(false); break;
        case '+': case '=': zoomAtPoint(viewport.clientWidth / 2, viewport.clientHeight / 2, 1.25, true); break;
        case '-': case '_': zoomAtPoint(viewport.clientWidth / 2, viewport.clientHeight / 2, 0.8, true); break;
        case '0': fitMapToContainer(true); break;
        case 'Escape': closeDrawer(); break;
      }
    });
  }

  // Line Filtering
  function setupFilterButtons() {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      const lineId = btn.dataset.line;
      filterLine(lineId);
    });

    // Horizontal wheel scrolling for filter pills on smaller viewports
    filterContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        filterContainer.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  function filterLine(lineId) {
    state.activeLine = lineId;

    // Update buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.line === lineId);
    });

    const tracks = document.querySelectorAll('.track-main, .track-underglow');
    const stations = document.querySelectorAll('.station-node');

    if (lineId === 'all') {
      tracks.forEach(t => t.classList.remove('dimmed'));
      stations.forEach(s => s.classList.remove('dimmed'));
      return;
    }

    tracks.forEach(track => {
      track.classList.toggle('dimmed', track.dataset.line !== lineId);
    });

    stations.forEach(station => {
      const lines = station.dataset.lines.split(' ');
      station.classList.toggle('dimmed', !lines.includes(lineId));
    });
  }

  // Real-Time Search
  function setupSearch() {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      state.searchQuery = query;

      if (!query) {
        document.querySelectorAll('.station-node').forEach(s => s.classList.remove('dimmed', 'highlighted'));
        filterLine(state.activeLine);
        return;
      }

      const matches = METRO_DATA.stations.filter(st => {
        return st.name.toLowerCase().includes(query) ||
               st.subtitle.toLowerCase().includes(query) ||
               st.description.toLowerCase().includes(query) ||
               st.tech.some(t => t.toLowerCase().includes(query)) ||
               st.repos.some(r => r.toLowerCase().includes(query)) ||
               st.venues.some(v => v.name.toLowerCase().includes(query) || (v.note && v.note.toLowerCase().includes(query)));
      });

      const matchedIds = new Set(matches.map(m => m.id));

      document.querySelectorAll('.station-node').forEach(node => {
        const isMatch = matchedIds.has(node.dataset.id);
        node.classList.toggle('dimmed', !isMatch);
        node.classList.toggle('highlighted', isMatch);
      });
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim().toLowerCase();
        const firstMatch = METRO_DATA.stations.find(st => st.name.toLowerCase().includes(query));
        if (firstMatch) {
          selectStation(firstMatch.id);
        }
      }
    });
  }

  // Station Inspector Drawer
  function setupDrawer() {
    closeDrawerBtn.addEventListener('click', closeDrawer);
  }

  function selectStation(stationId) {
    const station = METRO_DATA.stations.find(s => s.id === stationId);
    if (!station) return;

    state.selectedStation = station;
    window.location.hash = `station=${station.id}`;

    // Highlight node
    document.querySelectorAll('.station-node').forEach(node => {
      node.classList.toggle('active-station', node.dataset.id === stationId);
    });

    // Populate Drawer
    const primaryLine = METRO_DATA.lines.find(l => l.id === station.lines[0]);
    const badgeBg = station.id === 'viseu' ? '#d97706' : (station.id === 'sintra' ? '#7c3aed' : (primaryLine ? primaryLine.color : '#0284c7'));
    document.getElementById('drawer-station-id').textContent = `#${station.number}`;
    document.getElementById('drawer-station-id').style.background = badgeBg;
    
    const lineNames = station.lines.map(lineId => {
      const line = METRO_DATA.lines.find(l => l.id === lineId);
      return line ? line.shortName : lineId;
    }).join(' • ');
    document.getElementById('drawer-station-line').textContent = lineNames;
    document.getElementById('drawer-title').textContent = station.name;
    if (station.isArchived) {
      document.getElementById('drawer-subtitle').innerHTML = `${escapeXml(station.subtitle)} <span class="archive-badge">Archived Milestone</span>`;
    } else {
      document.getElementById('drawer-subtitle').textContent = station.subtitle;
    }
    document.getElementById('drawer-desc').textContent = station.description;

    // Publications
    const venueList = document.getElementById('drawer-venues');
    venueList.innerHTML = '';
    if (station.venues && station.venues.length > 0) {
      station.venues.forEach(v => {
        const card = document.createElement('div');
        card.className = 'venue-card';
        card.innerHTML = `
          <div class="venue-header">
            <span class="venue-name">${v.name}</span>
            ${v.tier ? `<span class="venue-tier">${v.tier}</span>` : ''}
          </div>
          ${v.note ? `<div class="venue-note">${v.note}</div>` : ''}
        `;
        venueList.appendChild(card);
      });
    } else {
      venueList.innerHTML = '<p class="drawer-desc" style="color: var(--text-muted);">Ongoing research track &amp; active repository.</p>';
    }

    // Tech Stack Badges
    const techList = document.getElementById('drawer-tech');
    techList.innerHTML = '';
    station.tech.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = t;
      techList.appendChild(tag);
    });

    // Repositories
    const repoList = document.getElementById('drawer-repos');
    repoList.innerHTML = '';
    station.repos.forEach(repo => {
      const link = document.createElement('a');
      let repoUrl;
      let repoFullName;
      if (repo.startsWith('http://') || repo.startsWith('https://')) {
        repoUrl = repo;
        repoFullName = repo.replace(/^https?:\/\/github\.com\//, '');
      } else if (repo === 'controlcore-project') {
        repoUrl = 'https://github.com/controlcore-project';
        repoFullName = 'controlcore-project';
      } else if (repo.includes('/')) {
        repoUrl = `https://github.com/${repo}`;
        repoFullName = repo;
      } else {
        repoUrl = `https://github.com/KathiraveluLab/${repo}`;
        repoFullName = `KathiraveluLab/${repo}`;
      }
      link.href = repoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.innerHTML = `
        <span style="display: inline-flex; align-items: center; gap: 6px;">
          <span>${repoFullName}</span>
          ${(station.isArchived || repo.includes('sharmalab/')) ? '<span class="archive-badge" style="font-size: 9.5px; padding: 1px 6px;">Archived</span>' : ''}
        </span>
        <span>↗</span>
      `;
      repoList.appendChild(link);
    });

    // Connected Stations
    const connectedContainer = document.getElementById('drawer-connected');
    connectedContainer.innerHTML = '';
    let connectedStations = [];
    if (station.relatedStations && Array.isArray(station.relatedStations)) {
      connectedStations = METRO_DATA.stations.filter(s => station.relatedStations.includes(s.id));
    }
    const lineStations = METRO_DATA.stations.filter(s => {
      if (s.id === station.id) return false;
      if (connectedStations.some(cs => cs.id === s.id)) return false;
      return s.lines.some(l => station.lines.includes(l));
    });
    connectedStations = [...connectedStations, ...lineStations].slice(0, 5);

    connectedStations.forEach(cs => {
      const btn = document.createElement('button');
      btn.className = 'connected-btn';
      btn.textContent = `${cs.name} (#${cs.number})`;
      btn.addEventListener('click', () => {
        selectStation(cs.id);
        panToStation(cs);
      });
      connectedContainer.appendChild(btn);
    });

    // Open Drawer & Center Map
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    panToStation(station);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.querySelectorAll('.station-node').forEach(node => {
      node.classList.remove('active-station');
    });
    if (window.location.hash.startsWith('#station=')) {
      history.replaceState(null, '', ' ');
    }
  }

  // Theme Toggle
  function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
      state.theme = newTheme;
    });
  }

  // Standalone SVG Export
  function setupExport() {
    exportBtn.addEventListener('click', () => {
      const serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);
      
      // Add XML Declaration and namespace
      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

      const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'kathiravelulab-metro-map.svg';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });
  }

  // Handle URL Hash Navigation
  function handleHashChange() {
    const hash = window.location.hash;
    if (hash.startsWith('#station=')) {
      const stationId = hash.replace('#station=', '');
      selectStation(stationId);
    } else if (hash.startsWith('#line=')) {
      const lineId = hash.replace('#line=', '');
      filterLine(lineId);
      fitMapToContainer(true);
    } else {
      fitMapToContainer(false);
    }
  }

  // Bootstrapping
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
