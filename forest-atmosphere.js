/* ============================================================================
   FOREST-ATMOSPHERE.JS — DECORAÇÃO DA FLORESTA
   ============================================================================
   Espalha vegetação procedural pelo chão do hub:
   - Samambaias (cones verdes baixos)
   - Cogumelos (vermelhos com pontas brancas e marrons)
   - Pedras musgosas (esferas achatadas)
   - Troncos caídos (cilindros deitados)
   - Vagalumes (esferas amarelas pequenas que flutuam)
   - Flores roxas pequenas
   ============================================================================ */
AFRAME.registerComponent('forest-atmosphere', {
  schema: {
    radius:     { type: 'number', default: 30 },
    minDist:    { type: 'number', default: 4 },   // distância mínima da árvore central
    density:    { type: 'number', default: 1 }    // multiplicador (1 = padrão)
  },

  init: function () {
    var el = this.el;
    var d = this.data.density;

    // ===== SAMAMBAIAS (40 unidades x density) =====
    for (var i = 0; i < 40 * d; i++) {
      var p = this._randomPos();
      // Cada samambaia tem 3-5 "folhas" (cones inclinados)
      var clump = document.createElement('a-entity');
      clump.setAttribute('position', p.x + ' 0 ' + p.z);
      clump.setAttribute('rotation', '0 ' + (Math.random() * 360) + ' 0');
      var leaves = 3 + Math.floor(Math.random() * 3);
      for (var j = 0; j < leaves; j++) {
        var blade = document.createElement('a-cone');
        blade.setAttribute('radius-bottom', 0.05);
        blade.setAttribute('radius-top', 0.01);
        blade.setAttribute('height', 0.5 + Math.random() * 0.4);
        blade.setAttribute('segments-radial', 4);
        var angle = (j / leaves) * 360;
        blade.setAttribute('position', '0 0.3 0');
        blade.setAttribute('rotation', '70 ' + angle + ' 0');
        var greens = ['#1F4020', '#2E5D31', '#264C28', '#3F7042'];
        blade.setAttribute('color', greens[j % 4]);
        blade.setAttribute('material', 'flatShading: true; shader: standard; roughness: 0.95');
        clump.appendChild(blade);
      }
      el.appendChild(clump);
    }

    // ===== COGUMELOS (15 x density) =====
    for (var i = 0; i < 15 * d; i++) {
      var p = this._randomPos();
      var stem = document.createElement('a-cylinder');
      stem.setAttribute('radius', 0.04);
      stem.setAttribute('height', 0.18);
      stem.setAttribute('segments-radial', 5);
      stem.setAttribute('position', p.x + ' 0.09 ' + p.z);
      stem.setAttribute('color', '#FFF8E7');
      el.appendChild(stem);
      var cap = document.createElement('a-sphere');
      cap.setAttribute('radius', 0.1);
      cap.setAttribute('segments-width', 8);
      cap.setAttribute('segments-height', 4);
      cap.setAttribute('position', p.x + ' 0.2 ' + p.z);
      cap.setAttribute('scale', '1 0.5 1');
      cap.setAttribute('color', Math.random() > 0.5 ? '#B22222' : '#8B4513');
      cap.setAttribute('material', 'flatShading: true');
      el.appendChild(cap);
    }

    // ===== PEDRAS MUSGOSAS (20 x density) =====
    for (var i = 0; i < 20 * d; i++) {
      var p = this._randomPos();
      var rock = document.createElement('a-sphere');
      var r = 0.2 + Math.random() * 0.3;
      rock.setAttribute('radius', r);
      rock.setAttribute('segments-width', 6);
      rock.setAttribute('segments-height', 4);
      rock.setAttribute('position', p.x + ' ' + (r * 0.4) + ' ' + p.z);
      rock.setAttribute('scale', '1 0.6 1');
      rock.setAttribute('color', '#5C5C5C');
      rock.setAttribute('material', 'roughness: 1; flatShading: true');
      el.appendChild(rock);
      // Musgo no topo
      var moss = document.createElement('a-sphere');
      moss.setAttribute('radius', r * 0.7);
      moss.setAttribute('segments-width', 6);
      moss.setAttribute('segments-height', 4);
      moss.setAttribute('position', p.x + ' ' + (r * 0.6) + ' ' + p.z);
      moss.setAttribute('scale', '1 0.3 1');
      moss.setAttribute('color', '#52A256');
      moss.setAttribute('material', 'flatShading: true');
      el.appendChild(moss);
    }

    // ===== TRONCOS CAÍDOS (6 x density) =====
    for (var i = 0; i < 6 * d; i++) {
      var p = this._randomPos();
      var log = document.createElement('a-cylinder');
      log.setAttribute('radius', 0.18);
      log.setAttribute('height', 1.5 + Math.random());
      log.setAttribute('segments-radial', 6);
      log.setAttribute('position', p.x + ' 0.18 ' + p.z);
      log.setAttribute('rotation', '0 ' + (Math.random() * 360) + ' 90');
      log.setAttribute('color', '#4A2C1A');
      log.setAttribute('material', 'roughness: 1');
      el.appendChild(log);
    }

    // ===== FLORES ROXAS (25 x density) =====
    for (var i = 0; i < 25 * d; i++) {
      var p = this._randomPos();
      var stem = document.createElement('a-cylinder');
      stem.setAttribute('radius', 0.01);
      stem.setAttribute('height', 0.25);
      stem.setAttribute('position', p.x + ' 0.12 ' + p.z);
      stem.setAttribute('color', '#2E5D31');
      el.appendChild(stem);
      var flower = document.createElement('a-sphere');
      flower.setAttribute('radius', 0.04);
      flower.setAttribute('position', p.x + ' 0.26 ' + p.z);
      flower.setAttribute('color', Math.random() > 0.5 ? '#9966CC' : '#FFB6C1');
      flower.setAttribute('material', 'emissive: #4B0082; emissiveIntensity: 0.2');
      el.appendChild(flower);
    }

    // ===== VAGALUMES (30) — esferinhas amarelas que flutuam =====
    for (var i = 0; i < 30; i++) {
      var p = this._randomPos();
      var y = 0.5 + Math.random() * 2.5;
      var f = document.createElement('a-sphere');
      f.setAttribute('radius', 0.03);
      f.setAttribute('color', '#FFFF99');
      f.setAttribute('material', 'emissive: #FFFF66; emissiveIntensity: 1; shader: flat');
      f.setAttribute('position', p.x + ' ' + y + ' ' + p.z);
      // Flutua de cima pra baixo
      f.setAttribute('animation__float',
        'property: position; from: ' + p.x + ' ' + y + ' ' + p.z +
        '; to: ' + p.x + ' ' + (y + 0.5) + ' ' + p.z +
        '; dir: alternate; loop: true; dur: ' + (2000 + Math.random() * 2000));
      // Pisca
      f.setAttribute('animation__blink',
        'property: material.opacity; from: 0.3; to: 1; dir: alternate; loop: true; dur: ' + (800 + Math.random() * 1200));
      el.appendChild(f);
    }

    // ===== NEBLINA NO CHÃO (plano semi-transparente baixo) =====
    var mist = document.createElement('a-circle');
    mist.setAttribute('radius', this.data.radius);
    mist.setAttribute('rotation', '-90 0 0');
    mist.setAttribute('position', '0 0.5 0');
    mist.setAttribute('color', '#E8F5E8');
    mist.setAttribute('material', 'opacity: 0.12; transparent: true; shader: flat; side: double');
    mist.setAttribute('animation', 'property: rotation; to: -90 360 0; loop: true; dur: 60000; easing: linear');
    el.appendChild(mist);
  },

  _randomPos: function () {
    // Posição aleatória em coroa circular (entre minDist e radius)
    var angle = Math.random() * Math.PI * 2;
    var dist = this.data.minDist + Math.random() * (this.data.radius - this.data.minDist);
    return { x: Math.cos(angle) * dist, z: Math.sin(angle) * dist };
  }
});
