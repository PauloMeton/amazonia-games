/* ============================================================================
   WALK-CONTROLS.JS — MOVIMENTO DO JOGADOR
   ============================================================================
   COMO FUNCIONA:
   - No celular/VR: olha pra baixo (>= 25 graus) para ANDAR na direção que olha
     olha pra frente/cima = PARA de andar (evita motion sickness)
   - No desktop: usa WASD ou setas do teclado

   POR QUE ASSIM:
   No Cardboard você não tem joystick. A solução mais natural é usar
   a inclinação da cabeça para iniciar/parar o movimento. Como o jogador
   olha pra baixo pra "ver pra onde está pisando", isso funciona intuitivamente.
   ============================================================================ */
AFRAME.registerComponent('walk-controls', {
  schema: {
    speed:       { type: 'number', default: 2.0 },   // metros por segundo
    tiltAngle:   { type: 'number', default: 25 },    // ângulo mínimo pra começar a andar
    maxDistance: { type: 'number', default: 35 }     // limite do mapa (não sai do círculo)
  },

  init: function () {
    this._dir = new THREE.Vector3();
    this._keys = { w: false, a: false, s: false, d: false };

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

    // Pega direção que a câmera está olhando
    camera.getWorldDirection(this._dir);
    // Pega o ângulo vertical (pitch) — em graus
    var pitchRad = Math.asin(-this._dir.y);  // -y porque getWorldDirection aponta pra frente
    var pitchDeg = pitchRad * 180 / Math.PI;

    // No celular: anda quando olha pra baixo
    var walkingByGaze = pitchDeg < -this.data.tiltAngle;

    // Direção horizontal (ignora vertical)
    var horiz = new THREE.Vector3(this._dir.x, 0, this._dir.z).normalize();
    var move = new THREE.Vector3();

    if (walkingByGaze) {
      // Move na direção que olha (horizontal)
      move.add(horiz.clone().multiplyScalar(this.data.speed * dt / 1000));
    }

    // Desktop: WASD
    if (this._keys.w) move.add(horiz.clone().multiplyScalar(this.data.speed * dt / 1000));
    if (this._keys.s) move.add(horiz.clone().multiplyScalar(-this.data.speed * dt / 1000));
    if (this._keys.a || this._keys.d) {
      var right = new THREE.Vector3(horiz.z, 0, -horiz.x);
      if (this._keys.d) move.add(right.clone().multiplyScalar(this.data.speed * dt / 1000));
      if (this._keys.a) move.add(right.clone().multiplyScalar(-this.data.speed * dt / 1000));
    }

    // Aplica movimento
    if (move.lengthSq() > 0) {
      var pos = rig.object3D.position;
      var newX = pos.x + move.x;
      var newZ = pos.z + move.z;
      // Limita ao círculo do mapa
      var distFromCenter = Math.sqrt(newX * newX + newZ * newZ);
      if (distFromCenter < this.data.maxDistance) {
        pos.x = newX;
        pos.z = newZ;
      }
    }
  }
});
