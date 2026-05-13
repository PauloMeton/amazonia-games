/* ============================================================================
   FOREST-ATMOSPHERE.JS — DECORAÇÃO DENSA DE FLORESTA FECHADA (modo noturno)
   ============================================================================ */
AFRAME.registerComponent('forest-atmosphere', {
  schema: {
    radius:  { type: 'number', default: 35 },
    minDist: { type: 'number', default: 4 },
    density: { type: 'number', default: 2 }   // 2x mais denso
  },

  init: function () {
    var el = this.el;
    var d = this.data.density;

    // ===== ANEL INTERNO DE ÁRVORES (mais perto do jogador) =====
    for (var i = 0; i < 30; i++) {
      var ang = (i / 30) * Math.PI * 2 + (Math.random() * 0.2);
      var dist = 8 + Math.random() * 3;
      var x = Math.cos(ang) * dist;
      var z = Math.sin(ang) * dist;
      var h = 5 + Math.random() * 3;
      this._tree(x, z, h, true);
    }
    // ===== ANEL EXTERNO DENSO (forma o "muro" de mata fechada) =====
    for (var i = 0; i < 60; i++) {
      var ang = (i / 60) * Math.PI * 2 + (Math.random() * 0.15);
      var dist = 14 + Math.random() * 8;
      var x = Math.cos(ang) * dist;
      var z = Math.sin(ang) * dist;
      var h = 6 + Math.random() * 4;
      this._tree(x, z, h, false);
    }
    // ===== ANEL MUITO EXTERNO (limite do mapa, super denso) =====
    for (var i = 0; i < 80; i++) {
      var ang = (i / 80) * Math.PI * 2 + (Math.random() * 0.1);
      var dist = 24 + Math.random() * 8;
      var x = Math.cos(ang) * dist;
      var z = Math.sin(ang) * dist;
      var h = 7 + Math.random() * 5;
      this._tree(x, z, h, false);
    }

    // ===== SAMAMBAIAS (60 x density) =====
    for (var i = 0; i < 60 * d; i++) {
      var p = this._randomPos();
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
        var greens = ['#0F2A10','#1A3D1B','#1F4020','#264C28'];
        blade.setAttribute('color', greens[j % 4]);
        blade.setAttribute('material', 'flatShading: true');
        clump.appendChild(blade);
      }
      el.appendChild(clump);
    }

    // ===== COGUMELOS (25 x density) — cores brilhantes (à noite ficam destacados) =====
    for (var i = 0; i < 25 * d; i++) {
      var p = this._randomPos();
      var stem = document.createElement('a-cylinder');
      stem.setAttribute('radius', 0.04);
      stem.setAttribute('height', 0.18);
      stem.setAttribute('segments-radial', 5);
      stem.setAttribute('position', p.x + ' 0.09 ' + p.z);
      stem.setAttribute('color', '#F0F0E0');
      el.appendChild(stem);
      var cap = document.createElement('a-sphere');
      cap.setAttribute('radius', 0.1);
      cap.setAttribute('segments-width', 8);
      cap.setAttribute('segments-height', 4);
      cap.setAttribute('position', p.x + ' 0.2 ' + p.z);
      cap.setAttribute('scale', '1 0.5 1');
      var capColor = Math.random() > 0.5 ? '#B22222' : '#FF8C00';
      cap.setAttribute('color', capColor);
      cap.setAttribute('material', 'flatShading: true; emissive: ' + capColor + '; emissiveIntensity: 0.15');
      el.appendChild(cap);
    }

    // ===== PEDRAS MUSGOSAS (25) =====
    for (var i = 0; i < 25; i++) {
      var p = this._randomPos();
      var rock = document.createElement('a-sphere');
      var r = 0.2 + Math.random() * 0.35;
      rock.setAttribute('radius', r);
      rock.setAttribute('segments-width', 6);
      rock.setAttribute('segments-height', 4);
      rock.setAttribute('position', p.x + ' ' + (r * 0.4) + ' ' + p.z);
      rock.setAttribute('scale', '1 0.6 1');
      rock.setAttribute('color', '#3A3A3A');
      rock.setAttribute('material', 'flatShading: true');
      el.appendChild(rock);
      var moss = document.createElement('a-sphere');
      moss.setAttribute('radius', r * 0.7);
      moss.setAttribute('segments-width', 6);
      moss.setAttribute('segments-height', 4);
      moss.setAttribute('position', p.x + ' ' + (r * 0.6) + ' ' + p.z);
      moss.setAttribute('scale', '1 0.3 1');
      moss.setAttribute('color', '#1F4020');
      moss.setAttribute('material', 'flatShading: true');
      el.appendChild(moss);
    }

    // ===== TRONCOS CAÍDOS (10) =====
    for (var i = 0; i < 10; i++) {
      var p = this._randomPos();
      var log = document.createElement('a-cylinder');
      log.setAttribute('radius', 0.2);
      log.setAttribute('height', 1.5 + Math.random());
      log.setAttribute('segments-radial', 6);
      log.setAttribute('position', p.x + ' 0.2 ' + p.z);
      log.setAttribute('rotation', '0 ' + (Math.random() * 360) + ' 90');
      log.setAttribute('color', '#2A1810');
      el.appendChild(log);
    }

    // ===== FLORES BRILHANTES (40) — visíveis à noite =====
    for (var i = 0; i < 40; i++) {
      var p = this._randomPos();
      var stem = document.createElement('a-cylinder');
      stem.setAttribute('radius', 0.01);
      stem.setAttribute('height', 0.25);
      stem.setAttribute('position', p.x + ' 0.12 ' + p.z);
      stem.setAttribute('color', '#1F4020');
      el.appendChild(stem);
      var flower = document.createElement('a-sphere');
      flower.setAttribute('radius', 0.045);
      flower.setAttribute('position', p.x + ' 0.26 ' + p.z);
      var fc = Math.random() > 0.5 ? '#B388FF' : '#FF80AB';
      flower.setAttribute('color', fc);
      flower.setAttribute('material', 'emissive: ' + fc + '; emissiveIntensity: 0.6; shader: flat');
      el.appendChild(flower);
    }

    // ===== VAGALUMES (80) — bem mais à noite =====
    for (var i = 0; i < 80; i++) {
      var p = this._randomPos();
      var y = 0.5 + Math.random() * 3;
      var f = document.createElement('a-sphere');
      f.setAttribute('radius', 0.035);
      f.setAttribute('color', '#FFEE88');
      f.setAttribute('material', 'emissive: #FFEE66; emissiveIntensity: 1; shader: flat');
      f.setAttribute('position', p.x + ' ' + y + ' ' + p.z);
      f.setAttribute('animation__float',
        'property: position; from: ' + p.x + ' ' + y + ' ' + p.z +
        '; to: ' + p.x + ' ' + (y + 0.4 + Math.random()*0.4) + ' ' + p.z +
        '; dir: alternate; loop: true; dur: ' + (2000 + Math.random() * 2000));
      f.setAttribute('animation__blink',
        'property: material.opacity; from: 0.2; to: 1; dir: alternate; loop: true; dur: ' + (700 + Math.random() * 1500));
      el.appendChild(f);
    }
  },

  _tree: function (x, z, h, inner) {
    var el = this.el;
    // Tronco
    var trunk = document.createElement('a-cylinder');
    trunk.setAttribute('radius', inner ? 0.3 : 0.4);
    trunk.setAttribute('height', h);
    trunk.setAttribute('segments-radial', 6);
    trunk.setAttribute('position', x + ' ' + (h/2) + ' ' + z);
    trunk.setAttribute('color', '#1F1209');
    trunk.setAttribute('material', 'flatShading: true');
    el.appendChild(trunk);
    // Copa (2 esferas sobrepostas)
    var crown1 = document.createElement('a-sphere');
    var r1 = inner ? 1.6 : 2.2;
    crown1.setAttribute('radius', r1);
    crown1.setAttribute('segments-width', 8);
    crown1.setAttribute('segments-height', 5);
    crown1.setAttribute('position', x + ' ' + (h + 0.5) + ' ' + z);
    var shades = ['#0E2410','#142F15','#1A3D1B','#1F4020'];
    crown1.setAttribute('color', shades[Math.floor(Math.random()*4)]);
    crown1.setAttribute('material', 'flatShading: true');
    el.appendChild(crown1);
    var crown2 = document.createElement('a-sphere');
    crown2.setAttribute('radius', r1 * 0.75);
    crown2.setAttribute('segments-width', 8);
    crown2.setAttribute('segments-height', 5);
    crown2.setAttribute('position', x + ' ' + (h + 1.5) + ' ' + z);
    crown2.setAttribute('color', shades[Math.floor(Math.random()*4)]);
    crown2.setAttribute('material', 'flatShading: true');
    el.appendChild(crown2);
  },

  _randomPos: function () {
    var angle = Math.random() * Math.PI * 2;
    var dist = this.data.minDist + Math.random() * (this.data.radius - this.data.minDist);
    return { x: Math.cos(angle) * dist, z: Math.sin(angle) * dist };
  }
});
