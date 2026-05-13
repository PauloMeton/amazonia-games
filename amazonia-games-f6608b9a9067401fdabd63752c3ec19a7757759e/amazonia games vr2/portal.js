/* ============================================================================
   PORTAL.JS — PORTAL ESPIRITUAL (versão melhorada)
   ============================================================================
   Visual: 2 anéis girando + disco interno pulsante + 8 partículas orbitando
   + feixe de luz subindo + base de pedras
   ============================================================================ */
AFRAME.registerComponent('portal', {
  schema: {
    destination: { type: 'string', default: '' },
    color:       { type: 'color',  default: '#7FFFD4' },
    label:       { type: 'string', default: 'Arena' },
    locked:      { type: 'boolean', default: false }
  },

  init: function () {
    var el = this.el;
    var c = this.data.color;
    var self = this;

    // ===== BASE DE PEDRAS NO CHÃO =====
    // (faz o portal parecer plantado no solo, não flutuando aleatoriamente)
    var baseY = -2.5;  // os portais estão a y=2.5, então base vai pra -2.5 relativo (chão)
    for (var i = 0; i < 6; i++) {
      var stone = document.createElement('a-sphere');
      var r = 0.2 + Math.random() * 0.15;
      stone.setAttribute('radius', r);
      stone.setAttribute('segments-width', 6);
      stone.setAttribute('segments-height', 4);
      var ang = (i / 6) * Math.PI * 2;
      stone.setAttribute('position',
        (Math.cos(ang) * 1.0) + ' ' + (baseY + r * 0.4) + ' ' + (Math.sin(ang) * 1.0));
      stone.setAttribute('scale', '1 0.6 1');
      stone.setAttribute('color', '#5C5C5C');
      stone.setAttribute('material', 'flatShading: true; roughness: 1');
      el.appendChild(stone);
    }

    // ===== ANEL EXTERNO (gira lento) =====
    var ring = document.createElement('a-torus');
    ring.setAttribute('radius', 1.2);
    ring.setAttribute('radius-tubular', 0.1);
    ring.setAttribute('segments-radial', 10);
    ring.setAttribute('segments-tubular', 28);
    ring.setAttribute('color', c);
    ring.setAttribute('material', 'emissive: ' + c + '; emissiveIntensity: 0.8; metalness: 0.5');
    ring.setAttribute('animation', 'property: rotation; to: 0 0 360; loop: true; dur: 10000; easing: linear');
    el.appendChild(ring);

    // ===== DISCO INTERNO (pulsante) =====
    var disc = document.createElement('a-circle');
    disc.setAttribute('radius', 1.1);
    disc.setAttribute('color', c);
    disc.setAttribute('material',
      'emissive: ' + c + '; emissiveIntensity: 0.5; opacity: 0.4; transparent: true; side: double; shader: flat');
    disc.setAttribute('animation__pulse',
      'property: material.opacity; from: 0.25; to: 0.6; dir: alternate; loop: true; dur: 1500; easing: easeInOutSine');
    el.appendChild(disc);

    // ===== ANEL INTERNO MENOR (gira no sentido oposto, mais rápido) =====
    var innerRing = document.createElement('a-torus');
    innerRing.setAttribute('radius', 0.85);
    innerRing.setAttribute('radius-tubular', 0.04);
    innerRing.setAttribute('segments-radial', 6);
    innerRing.setAttribute('segments-tubular', 20);
    innerRing.setAttribute('color', '#FFFFFF');
    innerRing.setAttribute('material', 'emissive: #FFFFFF; emissiveIntensity: 0.7');
    innerRing.setAttribute('animation', 'property: rotation; to: 0 0 -360; loop: true; dur: 4000; easing: linear');
    el.appendChild(innerRing);

    // ===== 8 PARTÍCULAS ORBITANDO O PORTAL =====
    for (var i = 0; i < 8; i++) {
      var orbit = document.createElement('a-entity');
      var dir = (i % 2 === 0) ? 360 : -360;
      orbit.setAttribute('animation',
        'property: rotation; to: 0 0 ' + dir + '; loop: true; dur: ' + (3000 + i * 300) + '; easing: linear');
      var spark = document.createElement('a-sphere');
      spark.setAttribute('radius', 0.06);
      spark.setAttribute('color', c);
      spark.setAttribute('material', 'emissive: ' + c + '; emissiveIntensity: 1; shader: flat');
      var radius = 1.3 + (i % 2) * 0.15;
      spark.setAttribute('position', radius + ' 0 0');
      orbit.appendChild(spark);
      el.appendChild(orbit);
    }

    // ===== FEIXE DE LUZ SUBINDO =====
    var beam = document.createElement('a-cylinder');
    beam.setAttribute('radius', 0.08);
    beam.setAttribute('height', 8);
    beam.setAttribute('position', '0 4 0');  // sobe 4m acima do portal
    beam.setAttribute('color', c);
    beam.setAttribute('material',
      'emissive: ' + c + '; emissiveIntensity: 0.7; opacity: 0.3; transparent: true; shader: flat');
    el.appendChild(beam);

    // ===== LUZ PONTUAL (ilumina o ambiente em volta) =====
    var ptLight = document.createElement('a-light');
    ptLight.setAttribute('type', 'point');
    ptLight.setAttribute('color', c);
    ptLight.setAttribute('intensity', 1.5);
    ptLight.setAttribute('distance', 6);
    el.appendChild(ptLight);

    // ===== ESTADO BLOQUEADO (escurece tudo) =====
    if (this.data.locked) {
      ring.setAttribute('material',
        'color: #444; emissive: #111; emissiveIntensity: 0.2; opacity: 0.5; transparent: true');
      disc.setAttribute('material',
        'color: #222; opacity: 0.3; transparent: true; shader: flat');
      beam.setAttribute('visible', false);
      ptLight.setAttribute('intensity', 0.3);
      ptLight.setAttribute('color', '#666');
    }

    // ===== HITBOX DE INTERAÇÃO =====
    var hit = document.createElement('a-circle');
    hit.setAttribute('radius', 1.4);
    hit.setAttribute('material', 'opacity: 0; transparent: true');
    hit.classList.add('gaze-target');
    hit.setAttribute('gaze-target', '');
    el.appendChild(hit);

    // ===== RÓTULO (aparece ao olhar) =====
    var label = document.createElement('a-text');
    label.setAttribute('value', this.data.locked ? this.data.label + ' (bloqueado)' : this.data.label);
    label.setAttribute('align', 'center');
    label.setAttribute('color', this.data.locked ? '#999' : '#FFFFFF');
    label.setAttribute('width', 4);
    label.setAttribute('position', '0 1.9 0');
    label.setAttribute('visible', false);
    el.appendChild(label);

    hit.addEventListener('gaze-enter', function () { label.setAttribute('visible', true); });
    hit.addEventListener('gaze-leave', function () { label.setAttribute('visible', false); });
    hit.addEventListener('gaze-fire', function () {
      if (self.data.locked) {
        self.el.sceneEl.emit('hub-message', { text: 'Este caminho ainda não se abriu para você.' });
      } else {
        self.el.sceneEl.emit('portal-activate', { destination: self.data.destination });
      }
    });
  }
});
