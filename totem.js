/* ============================================================================
   TOTEM.JS — O TOTEM DA FLORESTA (arma e símbolo do jogador)
   ============================================================================

   O QUE FAZ:
   Cria o totem que fica no canto da visão do jogador (como uma "arma na mão").
   Quando o jogador segura o botão do Cardboard / espaço / clique, o totem
   solta um feixe de luz turquesa que atinge inimigos e focos do Vazio.

   POR QUE EXISTE:
   É a "arma" do jogo. Na história, o totem é um artefato ancestral que
   conecta a criança ao Mundo das Lendas e tem o poder de purificar a
   corrupção do Vazio.

   COMO FUNCIONA:
   1. Monta o totem com peças (cilindro de madeira, anel dourado, cristal)
   2. Detecta quando o jogador aperta um botão (qualquer um: mouse, espaço, toque)
   3. Quando apertado, mostra um feixe de luz subindo do cristal
   4. Lança um raio invisível na direção que o jogador olha
   5. Se o raio bate em um inimigo (com classe "damageable"), causa dano
   6. Cada segundo de feixe gasta energia; quando para, energia regenera
   ============================================================================ */

AFRAME.registerComponent('totem', {

  // -----------------------------------------------------------------
  // CONFIGURAÇÕES:
  // -----------------------------------------------------------------
  schema: {
    energy:     { type: 'number', default: 100 },  // energia atual
    maxEnergy:  { type: 'number', default: 100 },  // energia máxima
    powerLevel: { type: 'number', default: 0 }     // nível de poder (0 a 5, aumenta após cada chefe)
  },

  // -----------------------------------------------------------------
  // init() — monta o totem visualmente e prepara o sistema de combate
  // -----------------------------------------------------------------
  init: function () {
    var el = this.el;

    // Ferramentas matemáticas para o "raio de combate"
    // (Three.js é a engine 3D que A-Frame usa por baixo)
    this._raycaster = new THREE.Raycaster();   // o lançador de raios
    this._tmpVec = new THREE.Vector3();        // ponto de origem do raio
    this._tmpDir = new THREE.Vector3();        // direção do raio

    // ===== PEÇA 1: Corpo do totem (cilindro de madeira escura) =====
    var body = document.createElement('a-cylinder');
    body.setAttribute('radius', 0.06);
    body.setAttribute('height', 0.4);
    body.setAttribute('segments-radial', 6);  // só 6 lados (low-poly, leve)
    body.setAttribute('color', '#6B3410');
    body.setAttribute('material', 'shader: standard; roughness: 0.85');
    el.appendChild(body);

    // ===== PEÇA 2: Anel dourado no meio (decoração) =====
    var ring = document.createElement('a-torus');
    ring.setAttribute('radius', 0.08);
    ring.setAttribute('radius-tubular', 0.012);
    ring.setAttribute('segments-radial', 6);
    ring.setAttribute('segments-tubular', 12);
    ring.setAttribute('position', '0 0.16 0');
    ring.setAttribute('color', '#D4AF37');
    ring.setAttribute('material', 'emissive: #5C4A1A; emissiveIntensity: 0.4');
    el.appendChild(ring);

    // ===== PEÇA 3: Cristal espiritual no topo (o que brilha e gira) =====
    var crystal = document.createElement('a-octahedron');  // formato de diamante
    crystal.setAttribute('radius', 0.05);
    crystal.setAttribute('position', '0 0.25 0');
    crystal.setAttribute('color', '#7FFFD4');
    crystal.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 0.8; opacity: 0.85; transparent: true');
    crystal.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 4000; easing: linear');
    el.appendChild(crystal);
    this.crystal = crystal;  // guarda referência para mudar de cor depois

    // ===== PEÇA 4: Luz que sai do cristal (ilumina os arredores) =====
    var light = document.createElement('a-light');
    light.setAttribute('type', 'point');           // luz que brilha em todas as direções
    light.setAttribute('color', '#7FFFD4');
    light.setAttribute('intensity', 0.6);
    light.setAttribute('distance', 3);             // alcance de 3 metros
    light.setAttribute('position', '0 0.25 0');
    el.appendChild(light);
    this.light = light;

    // ===== PEÇA 5: Feixe de combate (começa invisível) =====
    var beam = document.createElement('a-cylinder');
    beam.setAttribute('radius', 0.015);            // bem fino (1,5cm de raio)
    beam.setAttribute('height', 8);                // 8 metros de comprimento
    beam.setAttribute('position', '0 4.25 0');     // sobe para cima do cristal
    beam.setAttribute('color', '#7FFFD4');
    beam.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 1; opacity: 0.6; transparent: true; shader: flat');
    beam.setAttribute('visible', false);           // começa escondido
    el.appendChild(beam);
    this.beam = beam;

    // ===== ESTADO INTERNO =====
    this.beamActive = false;
    this.energy = this.data.energy;

    // Conecta os controles (botão, teclado, toque)
    this._bindInputs();
  },

  // -----------------------------------------------------------------
  // _bindInputs() — liga os botões/teclas/toques para disparar o feixe
  // -----------------------------------------------------------------
  _bindInputs: function () {
    var self = this;
    var fire = function (on) { self._setBeam(on); };  // "fire(true)" liga, "fire(false)" desliga

    // Mouse (desktop)
    window.addEventListener('mousedown', function () { fire(true); });
    window.addEventListener('mouseup',   function () { fire(false); });

    // Toque (celular / Cardboard)
    window.addEventListener('touchstart', function (e) { e.preventDefault(); fire(true); }, { passive: false });
    window.addEventListener('touchend',   function () { fire(false); });

    // Teclado (desktop) — barra de espaço
    window.addEventListener('keydown', function (e) { if (e.code === 'Space') fire(true); });
    window.addEventListener('keyup',   function (e) { if (e.code === 'Space') fire(false); });
  },

  // -----------------------------------------------------------------
  // _setBeam(on) — liga ou desliga o feixe de luz
  // -----------------------------------------------------------------
  _setBeam: function (on) {
    if (this.energy <= 0) on = false;  // sem energia → não pode disparar
    this.beamActive = on;
    this.beam.setAttribute('visible', on);
    this.el.emit(on ? 'totem-fire-start' : 'totem-fire-end');  // avisa outros componentes
  },

  // -----------------------------------------------------------------
  // tick() — chamado 60 vezes por segundo
  // gerencia energia e causa dano enquanto o feixe está ativo
  // -----------------------------------------------------------------
  tick: function (time, dt) {
    // "dt" = quanto tempo passou desde o último frame (em milissegundos)

    if (this.beamActive) {
      // Drena energia (8 pontos por segundo)
      this.energy = Math.max(0, this.energy - (dt / 1000) * 8);
      if (this.energy <= 0) this._setBeam(false);  // sem energia → desliga
      this._raycastAndDamage(dt);  // verifica se acertou alguém
    } else {
      // Sem disparar → regenera energia (5 pontos por segundo)
      this.energy = Math.min(this.data.maxEnergy, this.energy + (dt / 1000) * 5);
    }

    // Avisa a HUD (barra de energia) para atualizar
    this.el.emit('totem-energy', { value: this.energy, max: this.data.maxEnergy });
  },

  // -----------------------------------------------------------------
  // _raycastAndDamage() — lança um raio na direção do olhar e causa dano
  // -----------------------------------------------------------------
  _raycastAndDamage: function (dt) {
    var camera = this.el.sceneEl.camera;
    if (!camera) return;

    // Pega a posição e direção da câmera (para onde o jogador olha)
    camera.getWorldPosition(this._tmpVec);
    camera.getWorldDirection(this._tmpDir);

    // Configura o raio: começa na câmera, vai na direção do olhar, até 20 metros
    this._raycaster.set(this._tmpVec, this._tmpDir);
    this._raycaster.far = 20;

    // Procura todos os objetos com classe "damageable" (inimigos e focos do Vazio)
    var targets = Array.prototype.slice.call(document.querySelectorAll('.damageable'));
    var objs = [];
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].object3D) objs.push(targets[i].object3D);
    }

    // Verifica se o raio acertou algum deles
    var hits = this._raycaster.intersectObjects(objs, true);
    if (hits.length === 0) return;  // não acertou nada

    // Pega o primeiro objeto atingido
    var hitEl = null;
    for (var j = 0; j < hits.length; j++) {
      var o = hits[j].object;
      while (o && !o.el) o = o.parent;  // sobe na hierarquia até achar a entidade A-Frame
      if (o && o.el && o.el.classList.contains('damageable')) {
        hitEl = o.el;
        break;
      }
    }
    if (!hitEl) return;

    // Calcula o dano: 30 por segundo × multiplicador do nível de poder
    var dmg = (dt / 1000) * 30 * (1 + this.data.powerLevel * 0.2);

    // Chama o método takeDamage do alvo (se ele tiver)
    var comp = hitEl.components['enemy-base'] || hitEl.components['corruption-spot'];
    if (comp && typeof comp.takeDamage === 'function') {
      comp.takeDamage(dmg);
    }
  },

  // -----------------------------------------------------------------
  // evolve(legendName) — chamado quando uma lenda é purificada
  // Muda a cor do cristal e do feixe para a cor daquela lenda
  // -----------------------------------------------------------------
  evolve: function (legendName) {
    this.data.powerLevel++;  // aumenta o nível de poder

    var colors = {
      curupira:   '#90EE90',  // verde (mata)
      iara:       '#1E90FF',  // azul (rio)
      boitata:    '#FF4500',  // laranja (fogo)
      mapinguari: '#8B4513',  // marrom (terra)
      boto:       '#FFB6C1'   // rosa (boto)
    };
    var c = colors[legendName] || '#FFFFFF';

    this.crystal.setAttribute('color', c);
    this.crystal.setAttribute('material', 'emissive: ' + c + '; emissiveIntensity: 1; opacity: 0.9; transparent: true');
    this.light.setAttribute('color', c);
    this.beam.setAttribute('color', c);
  }
});
