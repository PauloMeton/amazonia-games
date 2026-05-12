/* ============================================================================
   WALK-CONTROLS.JS — MOVIMENTO DO JOGADOR
   ============================================================================
   COMO FUNCIONA:
   - No celular/VR: olha pra BAIXO (>= 25 graus) para ANDAR na direção horizontal
     que está olhando. Olha pra frente/cima = PARA de andar.
   - No desktop: WASD ou setas do teclado andam manualmente.
   ============================================================================ */
AFRAME.registerComponent('walk-controls', {
  schema: {
    speed:       { type: 'number', default: 2.0 },
    tiltAngle:   { type: 'number', default: 25 },
    maxDistance: { type: 'number', default: 35 }
  },

  init: function () {
    this._dir = new THREE.Vector3();
    this._horiz = new THREE.Vector3();
    this._keys = { w:false, a:false, s:false, d:false };

    var self = this;
    window.addEventListener('keydown', function (e) {
      var k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    self._keys.w = true;
      if (k === 's' || k === 'arrowdown')  self._keys.s = true;
      if (k === 'a' || k === 'arrowleft')  self._keys.a = true;
      if (k === 'd' || k === 'arrowright') self._keys.d = true;
    });
    window.addEventListener('keyup', function (e) {
      var k = e.key.toLowerCase();
      if (k === 'w' || k === 'arrowup')    self._keys.w = false;
      if (k === 's' || k === 'arrowdown')  self._keys.s = false;
      if (k === 'a' || k === 'arrowleft')  self._keys.a = false;
      if (k === 'd' || k === 'arrowright') self._keys.d = false;
    });
  },

  tick: function (time, dt) {
    if (!dt) return;
    var rig = this.el;
    var camera = this.el.sceneEl.camera;
    if (!camera) return;

    // Direção que a câmera está olhando (vetor 3D)
    camera.getWorldDirection(this._dir);

    // Quando olha pra BAIXO, _dir.y é NEGATIVO
    // Quando olha pra FRENTE, _dir.y ≈ 0
    // Quando olha pra CIMA, _dir.y é POSITIVO
    //
    // Se _dir.y < -0.4 → olhou pra baixo mais que ~24° → ANDA
    var lookingDown = this._dir.y < -Math.sin(this.data.tiltAngle * Math.PI / 180);

    // Direção horizontal (zera o componente vertical)
    this._horiz.set(this._dir.x, 0, this._dir.z);
    if (this._horiz.lengthSq() < 0.001) return; // olhou bem reto pra baixo — sem direção horizontal
    this._horiz.normalize();

    var step = this.data.speed * dt / 1000;
    var dx = 0, dz = 0;

    // Caminhada por inclinação (VR/Cardboard)
    if (lookingDown) {
      dx += this._horiz.x * step;
      dz += this._horiz.z * step;
    }

    // WASD (desktop)
    if (this._keys.w) { dx += this._horiz.x * step; dz += this._horiz.z * step; }
    if (this._keys.s) { dx -= this._horiz.x * step; dz -= this._horiz.z * step; }
    if (this._keys.a || this._keys.d) {
      // perpendicular à direção horizontal (lados)
      var rx = this._horiz.z, rz = -this._horiz.x;
      if (this._keys.d) { dx += rx * step; dz += rz * step; }
      if (this._keys.a) { dx -= rx * step; dz -= rz * step; }
    }

    if (dx === 0 && dz === 0) return;

    var pos = rig.object3D.position;
    var nx = pos.x + dx, nz = pos.z + dz;
    var dist = Math.sqrt(nx * nx + nz * nz);
    if (dist < this.data.maxDistance) {
      pos.x = nx;
      pos.z = nz;
    }
  }
});
