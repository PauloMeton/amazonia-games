/* ============================================================================
   PAJE.JS — PAJÉ ESQUECIDO (guia narrativo do hub)
   ============================================================================
   Versão melhorada: mais detalhes visuais + voz grave (ancestral)
   ============================================================================ */
AFRAME.registerComponent('paje', {
  init: function () {
    var el = this.el;

    // ===== MANTO LONGO (cone marrom escuro) =====
    var robe = document.createElement('a-cone');
    robe.setAttribute('radius-bottom', 0.55);
    robe.setAttribute('radius-top', 0.18);
    robe.setAttribute('height', 1.5);
    robe.setAttribute('segments-radial', 10);
    robe.setAttribute('position', '0 0.75 0');
    robe.setAttribute('color', '#3D2817');
    robe.setAttribute('material', 'roughness: 0.95; flatShading: true');
    el.appendChild(robe);

    // ===== FAIXA DO MANTO (linha colorida em volta) =====
    var sash = document.createElement('a-torus');
    sash.setAttribute('radius', 0.42);
    sash.setAttribute('radius-tubular', 0.04);
    sash.setAttribute('segments-radial', 6);
    sash.setAttribute('segments-tubular', 14);
    sash.setAttribute('position', '0 1.0 0');
    sash.setAttribute('color', '#D62828');
    sash.setAttribute('material', 'emissive: #5C1010; emissiveIntensity: 0.3');
    el.appendChild(sash);

    // ===== CABEÇA =====
    var head = document.createElement('a-sphere');
    head.setAttribute('radius', 0.17);
    head.setAttribute('position', '0 1.65 0');
    head.setAttribute('color', '#8B5A3C');
    head.setAttribute('segments-width', 12);
    head.setAttribute('segments-height', 8);
    head.setAttribute('material', 'flatShading: true');
    el.appendChild(head);

    // ===== OLHOS BRILHANTES (pequenos pontos amarelos) =====
    var leftEye = document.createElement('a-sphere');
    leftEye.setAttribute('radius', 0.02);
    leftEye.setAttribute('position', '-0.05 1.68 0.16');
    leftEye.setAttribute('color', '#FFD700');
    leftEye.setAttribute('material', 'emissive: #FFD700; emissiveIntensity: 0.9; shader: flat');
    el.appendChild(leftEye);
    var rightEye = document.createElement('a-sphere');
    rightEye.setAttribute('radius', 0.02);
    rightEye.setAttribute('position', '0.05 1.68 0.16');
    rightEye.setAttribute('color', '#FFD700');
    rightEye.setAttribute('material', 'emissive: #FFD700; emissiveIntensity: 0.9; shader: flat');
    el.appendChild(rightEye);

    // ===== COCAR (7 plumas verticais) =====
    for (var i = -3; i <= 3; i++) {
      var feather = document.createElement('a-cone');
      feather.setAttribute('radius-bottom', 0.03);
      feather.setAttribute('radius-top', 0.005);
      feather.setAttribute('height', 0.34);
      feather.setAttribute('segments-radial', 4);
      feather.setAttribute('position', (i * 0.04) + ' 1.96 -0.04');
      feather.setAttribute('rotation', (i * -8) + ' 0 0');
      var cols = ['#8B0000','#D62828','#F77F00','#FCBF49','#F77F00','#D62828','#8B0000'];
      feather.setAttribute('color', cols[i + 3]);
      feather.setAttribute('material', 'flatShading: true');
      el.appendChild(feather);
    }

    // ===== FAIXA DO COCAR (em volta da cabeça) =====
    var band = document.createElement('a-torus');
    band.setAttribute('radius', 0.18);
    band.setAttribute('radius-tubular', 0.025);
    band.setAttribute('segments-radial', 5);
    band.setAttribute('segments-tubular', 12);
    band.setAttribute('position', '0 1.78 0');
    band.setAttribute('rotation', '90 0 0');
    band.setAttribute('color', '#FCBF49');
    band.setAttribute('material', 'emissive: #5C4A1A; emissiveIntensity: 0.4');
    el.appendChild(band);

    // ===== CAJADO =====
    var staff = document.createElement('a-cylinder');
    staff.setAttribute('radius', 0.028);
    staff.setAttribute('height', 1.7);
    staff.setAttribute('position', '0.42 0.85 0.05');
    staff.setAttribute('rotation', '0 0 -5');
    staff.setAttribute('color', '#5D4037');
    staff.setAttribute('material', 'roughness: 0.95');
    el.appendChild(staff);

    // ===== ENROLAMENTOS NO CAJADO (3 anéis pequenos) =====
    for (var i = 0; i < 3; i++) {
      var coil = document.createElement('a-torus');
      coil.setAttribute('radius', 0.04);
      coil.setAttribute('radius-tubular', 0.008);
      coil.setAttribute('segments-radial', 4);
      coil.setAttribute('segments-tubular', 8);
      coil.setAttribute('position', '0.4 ' + (1.2 - i * 0.15) + ' 0.05');
      coil.setAttribute('rotation', '0 0 85');
      coil.setAttribute('color', '#FCBF49');
      el.appendChild(coil);
    }

    // ===== PEDRA BRILHANTE NO TOPO DO CAJADO =====
    var stone = document.createElement('a-octahedron');
    stone.setAttribute('radius', 0.08);
    stone.setAttribute('position', '0.5 1.7 0.05');
    stone.setAttribute('color', '#7FFFD4');
    stone.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 0.8; opacity: 0.9; transparent: true');
    stone.setAttribute('animation__rot', 'property: rotation; to: 0 360 0; loop: true; dur: 6000; easing: linear');
    stone.setAttribute('animation__pulse', 'property: material.emissiveIntensity; from: 0.5; to: 1; dir: alternate; loop: true; dur: 1800');
    el.appendChild(stone);

    // ===== LUZ EMANANDO DA PEDRA =====
    var light = document.createElement('a-light');
    light.setAttribute('type', 'point');
    light.setAttribute('color', '#7FFFD4');
    light.setAttribute('intensity', 0.5);
    light.setAttribute('distance', 4);
    light.setAttribute('position', '0.5 1.7 0.05');
    el.appendChild(light);

    // ===== ESPÍRITO ORBITANDO O PAJÉ (1 esferinha azul) =====
    var orbitWrap = document.createElement('a-entity');
    orbitWrap.setAttribute('position', '0 1 0');
    orbitWrap.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 5000; easing: linear');
    var orbSpirit = document.createElement('a-sphere');
    orbSpirit.setAttribute('radius', 0.06);
    orbSpirit.setAttribute('color', '#B0E0E6');
    orbSpirit.setAttribute('material', 'emissive: #B0E0E6; emissiveIntensity: 1; shader: flat');
    orbSpirit.setAttribute('position', '0.8 0.3 0');
    orbitWrap.appendChild(orbSpirit);
    el.appendChild(orbitWrap);

    // ===== HITBOX DE INTERAÇÃO =====
    var hit = document.createElement('a-cylinder');
    hit.setAttribute('radius', 0.7);
    hit.setAttribute('height', 2.2);
    hit.setAttribute('position', '0 1.1 0');
    hit.setAttribute('material', 'opacity: 0; transparent: true');
    hit.classList.add('gaze-target');
    hit.setAttribute('gaze-target', 'hoverScale: 1.03');
    el.appendChild(hit);

    // ===== FALAS DO PAJÉ =====
    this.lines = [
      'A floresta não esqueceu de você... ainda.',
      'Cada lenda guarda um pedaço da Mata. Devolva-os.',
      'O Vazio cresce com nosso silêncio, criança.',
      'O totem é a memória ancestral. Segure-o firme.',
      'Olhe para o chão para caminhar. A mata guia seus pés.',
      'As lendas aguardam além dos portais. Vá em paz.'
    ];
    this.idx = 0;
    var self = this;

    hit.addEventListener('gaze-fire', function () { self._speak(); });
  },

  _speak: function () {
    var line = this.lines[this.idx % this.lines.length];
    this.idx++;
    this.el.sceneEl.emit('hub-message', { text: 'Pajé: "' + line + '"' });

    // VOZ GRAVE (ancestral) — pitch bem baixo + rate lento
    if ('speechSynthesis' in window) {
      var u = new SpeechSynthesisUtterance(line);
      u.lang = 'pt-BR';
      u.rate = 0.7;       // mais lento (era 0.85)
      u.pitch = 0.3;      // bem mais grave (era 0.7) — limite inferior
      u.volume = 1.0;

      // Tenta usar uma voz masculina em português, se disponível
      var voices = speechSynthesis.getVoices();
      var ptVoice = null;
      for (var i = 0; i < voices.length; i++) {
        var v = voices[i];
        if (v.lang && v.lang.indexOf('pt') === 0) {
          // Prioriza vozes masculinas (heurística pelo nome)
          var name = (v.name || '').toLowerCase();
          if (name.indexOf('male') >= 0 || name.indexOf('homem') >= 0 ||
              name.indexOf('daniel') >= 0 || name.indexOf('luciano') >= 0 ||
              name.indexOf('felipe') >= 0 || name.indexOf('ricardo') >= 0) {
            ptVoice = v;
            break;
          }
          if (!ptVoice) ptVoice = v;  // fallback: primeira voz PT
        }
      }
      if (ptVoice) u.voice = ptVoice;

      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }
});
