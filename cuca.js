/* ============================================================================
   CUCA.JS — A CUCA (substituindo o Pajé)
   ============================================================================
   Bruxa-jacaré do folclore brasileiro:
   - Cabeça de jacaré verde com focinho longo
   - Olhos amarelos brilhantes
   - Chapéu de bruxa roxo com fivela amarela
   - Cabelo verde-oliva espetado
   - Vestido roxo rasgado
   - Cauda de réptil
   - Cajado de madeira com ponta curvada
   - Voz feminina grave (de bruxa)
   ============================================================================ */
AFRAME.registerComponent('cuca', {
  init: function () {
    var el = this.el;

    // ===== CONTAINER ANIMÁVEL (para respiração geral) =====
    var body = document.createElement('a-entity');
    body.setAttribute('animation__breath',
      'property: position; from: 0 0 0; to: 0 0.04 0; dir: alternate; loop: true; dur: 2500; easing: easeInOutSine');
    el.appendChild(body);

    // ===== VESTIDO ROXO (cone alongado, base rasgada) =====
    var dress = document.createElement('a-cone');
    dress.setAttribute('radius-bottom', 0.45);
    dress.setAttribute('radius-top', 0.22);
    dress.setAttribute('height', 1.0);
    dress.setAttribute('segments-radial', 10);
    dress.setAttribute('position', '0 0.5 0');
    dress.setAttribute('color', '#4A2E7A');
    dress.setAttribute('material', 'flatShading: true; roughness: 0.85');
    body.appendChild(dress);

    // Babado/franja rasgada da barra do vestido (8 triângulos)
    for (var i = 0; i < 10; i++) {
      var ang = (i / 10) * Math.PI * 2;
      var tatter = document.createElement('a-cone');
      tatter.setAttribute('radius-bottom', 0.08);
      tatter.setAttribute('radius-top', 0.02);
      tatter.setAttribute('height', 0.18);
      tatter.setAttribute('segments-radial', 3);
      tatter.setAttribute('position', (Math.cos(ang)*0.42) + ' 0.09 ' + (Math.sin(ang)*0.42));
      tatter.setAttribute('rotation', '180 0 0');
      tatter.setAttribute('color', '#3A1F5A');
      body.appendChild(tatter);
    }

    // Cinto preto
    var belt = document.createElement('a-torus');
    belt.setAttribute('radius', 0.32);
    belt.setAttribute('radius-tubular', 0.025);
    belt.setAttribute('segments-radial', 4);
    belt.setAttribute('segments-tubular', 14);
    belt.setAttribute('position', '0 0.75 0');
    belt.setAttribute('color', '#1A0F2C');
    body.appendChild(belt);

    // Remendo marrom no vestido (detalhe da imagem)
    var patch = document.createElement('a-box');
    patch.setAttribute('width', 0.08);
    patch.setAttribute('height', 0.08);
    patch.setAttribute('depth', 0.01);
    patch.setAttribute('position', '0 0.4 0.32');
    patch.setAttribute('color', '#5C3A1A');
    body.appendChild(patch);

    // ===== CABEÇA DE JACARÉ =====
    var headGroup = document.createElement('a-entity');
    headGroup.setAttribute('position', '0 1.3 0');
    // Pequena oscilação da cabeça (olhar)
    headGroup.setAttribute('animation__sway',
      'property: rotation; from: 0 -10 0; to: 0 10 0; dir: alternate; loop: true; dur: 5000; easing: easeInOutSine');
    body.appendChild(headGroup);

    // Crânio (caixa horizontal alongada)
    var skull = document.createElement('a-box');
    skull.setAttribute('width', 0.32);
    skull.setAttribute('height', 0.28);
    skull.setAttribute('depth', 0.35);
    skull.setAttribute('color', '#6BAE3F');
    skull.setAttribute('material', 'flatShading: true');
    headGroup.appendChild(skull);

    // Focinho (caixa horizontal saindo pra frente)
    var snout = document.createElement('a-box');
    snout.setAttribute('width', 0.22);
    snout.setAttribute('height', 0.16);
    snout.setAttribute('depth', 0.35);
    snout.setAttribute('position', '0 -0.04 0.32');
    snout.setAttribute('color', '#6BAE3F');
    snout.setAttribute('material', 'flatShading: true');
    headGroup.appendChild(snout);

    // Narina (caixinha em cima do focinho)
    var nostril = document.createElement('a-box');
    nostril.setAttribute('width', 0.18);
    nostril.setAttribute('height', 0.04);
    nostril.setAttribute('depth', 0.04);
    nostril.setAttribute('position', '0 0.03 0.48');
    nostril.setAttribute('color', '#558A30');
    headGroup.appendChild(nostril);

    // Olhos amarelos (esferas levemente achatadas)
    function makeEye(x) {
      var eye = document.createElement('a-sphere');
      eye.setAttribute('radius', 0.07);
      eye.setAttribute('color', '#FFE034');
      eye.setAttribute('material', 'emissive: #FFD700; emissiveIntensity: 0.7; shader: flat');
      eye.setAttribute('position', x + ' 0.1 0.13');
      headGroup.appendChild(eye);
      // Pupila preta
      var pupil = document.createElement('a-box');
      pupil.setAttribute('width', 0.015);
      pupil.setAttribute('height', 0.06);
      pupil.setAttribute('depth', 0.015);
      pupil.setAttribute('position', x + ' 0.1 0.19');
      pupil.setAttribute('color', '#000000');
      headGroup.appendChild(pupil);
    }
    makeEye(-0.08);
    makeEye(0.08);

    // Sobrancelhas raivosas (caixinhas inclinadas)
    var browL = document.createElement('a-box');
    browL.setAttribute('width', 0.1); browL.setAttribute('height', 0.025); browL.setAttribute('depth', 0.04);
    browL.setAttribute('position', '-0.08 0.18 0.14'); browL.setAttribute('rotation', '0 0 15');
    browL.setAttribute('color', '#3D5F1F'); headGroup.appendChild(browL);
    var browR = document.createElement('a-box');
    browR.setAttribute('width', 0.1); browR.setAttribute('height', 0.025); browR.setAttribute('depth', 0.04);
    browR.setAttribute('position', '0.08 0.18 0.14'); browR.setAttribute('rotation', '0 0 -15');
    browR.setAttribute('color', '#3D5F1F'); headGroup.appendChild(browR);

    // Boca aberta (caixa escura dentro do focinho)
    var mouth = document.createElement('a-box');
    mouth.setAttribute('width', 0.2); mouth.setAttribute('height', 0.05); mouth.setAttribute('depth', 0.2);
    mouth.setAttribute('position', '0 -0.09 0.36'); mouth.setAttribute('color', '#1A0010');
    headGroup.appendChild(mouth);
    // Dentes (3 cones brancos)
    for (var t = -1; t <= 1; t++) {
      var tooth = document.createElement('a-cone');
      tooth.setAttribute('radius-bottom', 0.018); tooth.setAttribute('radius-top', 0.001);
      tooth.setAttribute('height', 0.05); tooth.setAttribute('segments-radial', 4);
      tooth.setAttribute('position', (t * 0.06) + ' -0.07 0.43');
      tooth.setAttribute('color', '#FFF8DC');
      tooth.setAttribute('rotation', '180 0 0');
      headGroup.appendChild(tooth);
    }

    // ===== CABELO VERDE-OLIVA (atrás e dos lados) =====
    var hairColors = ['#8A9A2F', '#6F7F25', '#7E8E2A'];
    for (var h = 0; h < 18; h++) {
      var hair = document.createElement('a-cone');
      hair.setAttribute('radius-bottom', 0.04);
      hair.setAttribute('radius-top', 0.005);
      hair.setAttribute('height', 0.35 + Math.random()*0.3);
      hair.setAttribute('segments-radial', 4);
      var hAng = (h / 18) * Math.PI * 1.6 + Math.PI * 0.2;
      var hx = Math.cos(hAng) * 0.18;
      var hz = -0.05 + Math.sin(hAng) * 0.15;
      hair.setAttribute('position', hx + ' ' + (-0.18) + ' ' + hz);
      hair.setAttribute('rotation', (10 + Math.random()*20) + ' ' + (Math.random()*30 - 15) + ' ' + (Math.random()*20 - 10));
      hair.setAttribute('color', hairColors[h % 3]);
      hair.setAttribute('material', 'flatShading: true');
      // Animação leve de balanço
      hair.setAttribute('animation',
        'property: rotation; to: ' + (15 + Math.random()*15) + ' ' + (Math.random()*30 - 15) + ' ' + (Math.random()*25 - 12) +
        '; dir: alternate; loop: true; dur: ' + (3000 + Math.random()*1500));
      headGroup.appendChild(hair);
    }

    // ===== CHAPÉU DE BRUXA (cone roxo) =====
    var hat = document.createElement('a-cone');
    hat.setAttribute('radius-bottom', 0.28);
    hat.setAttribute('radius-top', 0.02);
    hat.setAttribute('height', 0.55);
    hat.setAttribute('segments-radial', 10);
    hat.setAttribute('position', '0 0.45 -0.02');
    hat.setAttribute('rotation', '-10 0 5');  // levemente inclinado (estilo bruxa)
    hat.setAttribute('color', '#5A2F8E');
    hat.setAttribute('material', 'flatShading: true');
    headGroup.appendChild(hat);

    // Aba do chapéu (disco achatado largo)
    var brim = document.createElement('a-cylinder');
    brim.setAttribute('radius', 0.42);
    brim.setAttribute('height', 0.04);
    brim.setAttribute('segments-radial', 12);
    brim.setAttribute('position', '0 0.18 -0.02');
    brim.setAttribute('rotation', '-5 0 3');
    brim.setAttribute('color', '#4A2570');
    brim.setAttribute('material', 'flatShading: true');
    headGroup.appendChild(brim);

    // Faixa marrom no chapéu
    var hatband = document.createElement('a-torus');
    hatband.setAttribute('radius', 0.21);
    hatband.setAttribute('radius-tubular', 0.025);
    hatband.setAttribute('segments-radial', 4);
    hatband.setAttribute('segments-tubular', 12);
    hatband.setAttribute('position', '0 0.25 -0.02');
    hatband.setAttribute('rotation', '85 0 5');
    hatband.setAttribute('color', '#3D2817');
    headGroup.appendChild(hatband);

    // Fivela amarela do chapéu
    var buckle = document.createElement('a-box');
    buckle.setAttribute('width', 0.08); buckle.setAttribute('height', 0.08); buckle.setAttribute('depth', 0.02);
    buckle.setAttribute('position', '0 0.27 0.18'); buckle.setAttribute('color', '#FFD700');
    headGroup.appendChild(buckle);

    // ===== BRAÇO ESQUERDO (segurando cajado) =====
    var armL = document.createElement('a-cylinder');
    armL.setAttribute('radius', 0.05); armL.setAttribute('height', 0.6);
    armL.setAttribute('segments-radial', 6);
    armL.setAttribute('position', '-0.32 0.85 0.05');
    armL.setAttribute('rotation', '0 0 15');
    armL.setAttribute('color', '#6BAE3F');
    armL.setAttribute('material', 'flatShading: true');
    body.appendChild(armL);

    // Mão garra esquerda
    var handL = document.createElement('a-sphere');
    handL.setAttribute('radius', 0.07);
    handL.setAttribute('position', '-0.42 0.55 0.05');
    handL.setAttribute('color', '#6BAE3F');
    handL.setAttribute('material', 'flatShading: true');
    body.appendChild(handL);
    // Garras (3 cones amarelos)
    for (var c = -1; c <= 1; c++) {
      var claw = document.createElement('a-cone');
      claw.setAttribute('radius-bottom', 0.015); claw.setAttribute('radius-top', 0.002);
      claw.setAttribute('height', 0.06); claw.setAttribute('segments-radial', 4);
      claw.setAttribute('position', (-0.42 + c * 0.02) + ' 0.48 0.1');
      claw.setAttribute('color', '#FFD700');
      body.appendChild(claw);
    }

    // ===== BRAÇO DIREITO (estendido pra frente como na imagem) =====
    var armR = document.createElement('a-cylinder');
    armR.setAttribute('radius', 0.05); armR.setAttribute('height', 0.55);
    armR.setAttribute('segments-radial', 6);
    armR.setAttribute('position', '0.32 0.9 0.15');
    armR.setAttribute('rotation', '-30 0 -20');
    armR.setAttribute('color', '#6BAE3F');
    body.appendChild(armR);
    // Mão direita garra (3 garras visíveis)
    var handR = document.createElement('a-sphere');
    handR.setAttribute('radius', 0.07);
    handR.setAttribute('position', '0.48 0.7 0.32');
    handR.setAttribute('color', '#6BAE3F');
    body.appendChild(handR);
    for (var c2 = -1; c2 <= 1; c2++) {
      var clawR = document.createElement('a-cone');
      clawR.setAttribute('radius-bottom', 0.015); clawR.setAttribute('radius-top', 0.002);
      clawR.setAttribute('height', 0.07); clawR.setAttribute('segments-radial', 4);
      clawR.setAttribute('position', (0.48 + c2 * 0.025) + ' 0.65 0.4');
      clawR.setAttribute('rotation', '70 0 0');
      clawR.setAttribute('color', '#FFD700');
      body.appendChild(clawR);
    }

    // ===== CAJADO DE MADEIRA (haste reta + ponta curva) =====
    var staff = document.createElement('a-cylinder');
    staff.setAttribute('radius', 0.025);
    staff.setAttribute('height', 1.8);
    staff.setAttribute('segments-radial', 6);
    staff.setAttribute('position', '-0.45 0.9 0.05');
    staff.setAttribute('color', '#7A4D26');
    staff.setAttribute('material', 'roughness: 0.95');
    body.appendChild(staff);
    // Ponta curva (torus parcial)
    var staffTop = document.createElement('a-torus');
    staffTop.setAttribute('radius', 0.1);
    staffTop.setAttribute('radius-tubular', 0.025);
    staffTop.setAttribute('segments-radial', 4);
    staffTop.setAttribute('segments-tubular', 12);
    staffTop.setAttribute('arc', 270);
    staffTop.setAttribute('position', '-0.45 1.8 0.05');
    staffTop.setAttribute('rotation', '0 0 0');
    staffTop.setAttribute('color', '#7A4D26');
    body.appendChild(staffTop);

    // Pedra brilhante no topo do cajado (símbolo místico)
    var orb = document.createElement('a-sphere');
    orb.setAttribute('radius', 0.05);
    orb.setAttribute('position', '-0.45 1.95 0.05');
    orb.setAttribute('color', '#A8E6CF');
    orb.setAttribute('material', 'emissive: #7FFFD4; emissiveIntensity: 0.8; shader: flat');
    orb.setAttribute('animation', 'property: material.emissiveIntensity; from: 0.5; to: 1; dir: alternate; loop: true; dur: 1600');
    body.appendChild(orb);

    // Luz no cajado
    var staffLight = document.createElement('a-light');
    staffLight.setAttribute('type', 'point');
    staffLight.setAttribute('color', '#7FFFD4');
    staffLight.setAttribute('intensity', 0.6);
    staffLight.setAttribute('distance', 3);
    staffLight.setAttribute('position', '-0.45 1.95 0.05');
    body.appendChild(staffLight);

    // ===== CAUDA DE JACARÉ (3 segmentos cônicos com espinhos) =====
    var tailGroup = document.createElement('a-entity');
    tailGroup.setAttribute('position', '0 0.3 -0.3');
    // Animação ondulando
    tailGroup.setAttribute('animation',
      'property: rotation; from: 0 -8 0; to: 0 8 0; dir: alternate; loop: true; dur: 2000; easing: easeInOutSine');
    body.appendChild(tailGroup);

    var tailSegs = [
      { x:0, y:0,   z:0,    h:0.4, r:0.12 },
      { x:0, y:-0.05, z:-0.35, h:0.35, r:0.09 },
      { x:0, y:-0.1, z:-0.65, h:0.3, r:0.06 }
    ];
    tailSegs.forEach(function (s, idx) {
      var seg = document.createElement('a-cone');
      seg.setAttribute('radius-bottom', s.r); seg.setAttribute('radius-top', s.r * 0.6);
      seg.setAttribute('height', s.h); seg.setAttribute('segments-radial', 6);
      seg.setAttribute('position', s.x + ' ' + s.y + ' ' + s.z);
      seg.setAttribute('rotation', '90 0 0');
      seg.setAttribute('color', '#6BAE3F');
      seg.setAttribute('material', 'flatShading: true');
      tailGroup.appendChild(seg);
      // Espinhos triangulares no topo da cauda
      var spike = document.createElement('a-cone');
      spike.setAttribute('radius-bottom', 0.03); spike.setAttribute('radius-top', 0.001);
      spike.setAttribute('height', 0.08); spike.setAttribute('segments-radial', 3);
      spike.setAttribute('position', s.x + ' ' + (s.y + s.r * 0.7) + ' ' + s.z);
      spike.setAttribute('color', '#FFD700');
      tailGroup.appendChild(spike);
    });

    // ===== SAPATOS PRETOS (de salto) =====
    var shoeL = document.createElement('a-box');
    shoeL.setAttribute('width', 0.1); shoeL.setAttribute('height', 0.1); shoeL.setAttribute('depth', 0.18);
    shoeL.setAttribute('position', '-0.12 0.05 0.05');
    shoeL.setAttribute('color', '#1A0F2C');
    body.appendChild(shoeL);
    var shoeR = document.createElement('a-box');
    shoeR.setAttribute('width', 0.1); shoeR.setAttribute('height', 0.1); shoeR.setAttribute('depth', 0.18);
    shoeR.setAttribute('position', '0.12 0.05 0.05');
    shoeR.setAttribute('color', '#1A0F2C');
    body.appendChild(shoeR);

    // ===== HITBOX DE INTERAÇÃO =====
    var hit = document.createElement('a-cylinder');
    hit.setAttribute('radius', 0.7);
    hit.setAttribute('height', 2.0);
    hit.setAttribute('position', '0 1 0');
    hit.setAttribute('material', 'opacity: 0; transparent: true');
    hit.classList.add('gaze-target');
    hit.setAttribute('gaze-target', 'hoverScale: 1.03');
    el.appendChild(hit);

    // ===== FALAS DA CUCA (com personalidade de bruxa) =====
    this.lines = [
      'Achou que estava sozinha aqui, criança? Pobrezinha...',
      'O Vazio devora tudo. Até as lendas que me geraram.',
      'Vai? Vai mesmo enfrentar o que mora atrás dos portais? Hehehe...',
      'Esse totem... ainda é forte. Mas será o bastante?',
      'Olhe para baixo se quiser caminhar. Olhe para cima e descanse.',
      'Cuidado com o Curupira. Os pés dele apontam para onde ele veio... mas a fome dele aponta para você.'
    ];
    this.idx = 0;
    var self = this;
    hit.addEventListener('gaze-fire', function () { self._speak(); });
  },

  _speak: function () {
    var line = this.lines[this.idx % this.lines.length];
    this.idx++;
    this.el.sceneEl.emit('hub-message', { text: 'Cuca: "' + line + '"' });

    if ('speechSynthesis' in window) {
      var u = new SpeechSynthesisUtterance(line);
      u.lang = 'pt-BR';
      u.rate = 0.75;     // lento, ameaçador
      u.pitch = 0.55;    // grave (voz feminina baixa, tipo bruxa)
      u.volume = 1.0;

      // Tenta usar voz feminina em português
      var voices = speechSynthesis.getVoices();
      var picked = null;
      for (var i = 0; i < voices.length; i++) {
        var v = voices[i];
        if (v.lang && v.lang.indexOf('pt') === 0) {
          var name = (v.name || '').toLowerCase();
          // Prioriza vozes femininas conhecidas
          if (name.indexOf('female') >= 0 || name.indexOf('mulher') >= 0 ||
              name.indexOf('maria') >= 0 || name.indexOf('luciana') >= 0 ||
              name.indexOf('helena') >= 0 || name.indexOf('vitoria') >= 0 ||
              name.indexOf('catarina') >= 0) {
            picked = v; break;
          }
          if (!picked) picked = v;
        }
      }
      if (picked) u.voice = picked;

      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }
});
