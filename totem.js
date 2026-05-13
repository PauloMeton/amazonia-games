/* ============================================================================
   TOTEM.JS — TOTEM DA FLORESTA + LANTERNA (versão noturna)
   ============================================================================
   - Cristal turquesa flutuante na "mão" do jogador
   - Lanterna: spotlight cônico sempre ligado, ilumina o caminho à frente
   - Botão segurado: feixe de combate (causa dano em inimigos/focos do Vazio)
   ============================================================================ */
AFRAME.registerComponent('totem', {
  schema: {
    energy:     { type: 'number', default: 100 },
    maxEnergy:  { type: 'number', default: 100 },
    powerLevel: { type: 'number', default: 0 }
  },

  init: function () {
    var el = this.el;
    this._raycaster = new THREE.Raycaster();
    this._tmpVec = new THREE.Vector3();
    this._tmpDir = new THREE.Vector3();

    // Corpo de madeira
    var body = document.createElement('a-cylinder');
    body.setAttribute('radius', 0.06);
    body.setAttribute('height', 0.4);
    body.setAttribute('segments-radial', 6);
    body.setAttribute('color', '#6B3410');
    el.appendChild(body);

    // Anel dourado
    var ring = document.createElement('a-torus');
    ring.setAttribute('radius', 0.08);
    ring.setAttribute('radius-tubular', 0.012);
    ring.setAttribute('segments-radial', 6);
    ring.setAttribute('segments-tubular', 12);
    ring.setAttribute('position', '0 0.16 0');
    ring.setAttribute('color', '#D4AF37');
    ring.setAttribute('material', 'emissive: #FFD700; emissiveIntensity: 0.7');
    el.appendChild(ring);

    // Cristal no topo
    var crystal = document.createElement('a-octahedron');
    crystal.setAttribute('radius', 0.06);
    crystal.setAttribute('position', '0 0.27 0');
    crystal.setAttribute('color', '#7FFFD4');
    crystal.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 1; opacity: 0.9; transparent: true');
    crystal.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear');
    el.appendChild(crystal);
    this.crystal = crystal;

    // Halo pontual ao redor do cristal (luz suave)
    var halo = document.createElement('a-light');
    halo.setAttribute('type', 'point');
    halo.setAttribute('color', '#7FFFD4');
    halo.setAttribute('intensity', 0.8);
    halo.setAttribute('distance', 4);
    halo.setAttribute('position', '0 0.27 0');
    el.appendChild(halo);
    this.halo = halo;

    // ===== LANTERNA: SPOTLIGHT CÔNICO APONTANDO PRA FRENTE =====
    // (vai estar sempre ligada — ilumina o caminho na floresta noturna)
    var flashlight = document.createElement('a-light');
    flashlight.setAttribute('type', 'spot');
    flashlight.setAttribute('color', '#FFF8DC');     // luz de tocha levemente amarelada
    flashlight.setAttribute('intensity', 2.5);
    flashlight.setAttribute('distance', 25);
    flashlight.setAttribute('angle', 35);            // abertura do cone (35 graus)
    flashlight.setAttribute('penumbra', 0.3);        // borda suave
    flashlight.setAttribute('decay', 1);
    flashlight.setAttribute('position', '0 0.3 0');
    flashlight.setAttribute('rotation', '-90 0 0');  // aponta pra frente do jogador
    flashlight.setAttribute('target', '#flashlight-target');
    el.appendChild(flashlight);
    this.flashlight = flashlight;

    // Cone visual da lanterna (semitransparente — efeito de "luz no ar")
    var beam_cone = document.createElement('a-cone');
    beam_cone.setAttribute('radius-bottom', 4);
    beam_cone.setAttribute('radius-top', 0.05);
    beam_cone.setAttribute('height', 15);
    beam_cone.setAttribute('segments-radial', 12);
    beam_cone.setAttribute('open-ended', true);
    beam_cone.setAttribute('position', '0 0.3 -7.5');  // à frente do totem
    beam_cone.setAttribute('rotation', '90 0 0');
    beam_cone.setAttribute('material', 'color: #FFF8DC; opacity: 0.08; transparent: true; shader: flat; side: double');
    el.appendChild(beam_cone);

    // ===== FEIXE DE COMBATE (escondido até ser ativado) =====
    var beam = document.createElement('a-cylinder');
    beam.setAttribute('radius', 0.02);
    beam.setAttribute('height', 8);
    beam.setAttribute('position', '0 4.25 0');
    beam.setAttribute('color', '#7FFFD4');
    beam.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 1; opacity: 0.7; transparent: true; shader: flat');
    beam.setAttribute('visible', false);
    el.appendChild(beam);
    this.beam = beam;

    this.beamActive = false;
    this.energy = this.data.energy;
    this._bindInputs();
  },

  _bindInputs: function () {
    var self = this;
    var fire = function (on) { self._setBeam(on); };
    window.addEventListener('mousedown', function () { fire(true); });
    window.addEventListener('mouseup',   function () { fire(false); });
    window.addEventListener('touchstart', function (e) { e.preventDefault(); fire(true); }, { passive: false });
    window.addEventListener('touchend',   function () { fire(false); });
    window.addEventListener('keydown', function (e) { if (e.code === 'Space') fire(true); });
    window.addEventListener('keyup',   function (e) { if (e.code === 'Space') fire(false); });
  },

  _setBeam: function (on) {
    if (this.energy <= 0) on = false;
    this.beamActive = on;
    this.beam.setAttribute('visible', on);
    // Intensifica a lanterna ao disparar (efeito "carga ativa")
    this.flashlight.setAttribute('intensity', on ? 4 : 2.5);
    this.flashlight.setAttribute('color', on ? '#7FFFD4' : '#FFF8DC');
  },

  tick: function (time, dt) {
    if (this.beamActive) {
      this.energy = Math.max(0, this.energy - (dt / 1000) * 8);
      if (this.energy <= 0) this._setBeam(false);
      this._raycastAndDamage(dt);
    } else {
      this.energy = Math.min(this.data.maxEnergy, this.energy + (dt / 1000) * 5);
    }
    this.el.emit('totem-energy', { value: this.energy, max: this.data.maxEnergy });
  },

  _raycastAndDamage: function (dt) {
    var camera = this.el.sceneEl.camera;
    if (!camera) return;
    camera.getWorldPosition(this._tmpVec);
    camera.getWorldDirection(this._tmpDir);
    this._raycaster.set(this._tmpVec, this._tmpDir);
    this._raycaster.far = 25;

    var targets = Array.prototype.slice.call(document.querySelectorAll('.damageable'));
    var objs = [];
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].object3D) objs.push(targets[i].object3D);
    }
    var hits = this._raycaster.intersectObjects(objs, true);
    if (hits.length === 0) return;

    var hitEl = null;
    for (var j = 0; j < hits.length; j++) {
      var o = hits[j].object;
      while (o && !o.el) o = o.parent;
      if (o && o.el && o.el.classList.contains('damageable')) { hitEl = o.el; break; }
    }
    if (!hitEl) return;

    var dmg = (dt / 1000) * 30 * (1 + this.data.powerLevel * 0.2);
    var comp = hitEl.components['enemy-base'] || hitEl.components['corruption-spot'];
    if (comp && typeof comp.takeDamage === 'function') comp.takeDamage(dmg);
  },

  evolve: function (legendName) {
    this.data.powerLevel++;
    var colors = { curupira:'#90EE90', iara:'#1E90FF', boitata:'#FF4500', mapinguari:'#8B4513', boto:'#FFB6C1' };
    var c = colors[legendName] || '#FFFFFF';
    this.crystal.setAttribute('color', c);
    this.crystal.setAttribute('material', 'emissive: ' + c + '; emissiveIntensity: 1; opacity: 0.9; transparent: true');
    this.halo.setAttribute('color', c);
    this.beam.setAttribute('color', c);
  }
});
