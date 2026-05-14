/* CUCA v3 — Versão parecida com a referência */
AFRAME.registerComponent('cuca-min', {
  init: function () {
    var el = this.el;

    // ===== VESTIDO ROXO (cone com babado rasgado embaixo) =====
    var dress = document.createElement('a-cone');
    dress.setAttribute('radius-bottom', 0.5);
    dress.setAttribute('radius-top', 0.25);
    dress.setAttribute('height', 1.1);
    dress.setAttribute('segments-radial', 10);
    dress.setAttribute('position', '0 0.55 0');
    dress.setAttribute('color', '#5A2F8E');
    dress.setAttribute('material', 'flatShading: true; shader: standard; roughness: 0.85');
    el.appendChild(dress);

    // BABADO RASGADO (8 triângulos na barra)
    for (var t = 0; t < 8; t++) {
      var ang = (t / 8) * Math.PI * 2;
      var tatter = document.createElement('a-cone');
      tatter.setAttribute('radius-bottom', 0.1);
      tatter.setAttribute('radius-top', 0.02);
      tatter.setAttribute('height', 0.18);
      tatter.setAttribute('segments-radial', 3);
      tatter.setAttribute('position', (Math.cos(ang)*0.48) + ' 0.1 ' + (Math.sin(ang)*0.48));
      tatter.setAttribute('rotation', '180 0 0');
      tatter.setAttribute('color', '#4A2570');
      el.appendChild(tatter);
    }

    // CINTO preto
    var belt = document.createElement('a-torus');
    belt.setAttribute('radius', 0.32);
    belt.setAttribute('radius-tubular', 0.03);
    belt.setAttribute('segments-radial', 4);
    belt.setAttribute('segments-tubular', 14);
    belt.setAttribute('position', '0 0.78 0');
    belt.setAttribute('rotation', '90 0 0');
    belt.setAttribute('color', '#1A0F2C');
    el.appendChild(belt);

    // REMENDO marrom no vestido
    var patch = document.createElement('a-box');
    patch.setAttribute('width', 0.09);
    patch.setAttribute('height', 0.09);
    patch.setAttribute('depth', 0.01);
    patch.setAttribute('position', '0 0.4 0.4');
    patch.setAttribute('color', '#5C3A1A');
    el.appendChild(patch);

    // ===== CABEÇA jacaré (caixa verde) =====
    var head = document.createElement('a-box');
    head.setAttribute('width', 0.35);
    head.setAttribute('height', 0.28);
    head.setAttribute('depth', 0.3);
    head.setAttribute('position', '0 1.35 0');
    head.setAttribute('color', '#6BAE3F');
    head.setAttribute('material', 'flatShading: true');
    el.appendChild(head);

    // FOCINHO (caixa pra frente, alongada)
    var snout = document.createElement('a-box');
    snout.setAttribute('width', 0.24);
    snout.setAttribute('height', 0.17);
    snout.setAttribute('depth', 0.32);
    snout.setAttribute('position', '0 1.3 0.3');
    snout.setAttribute('color', '#6BAE3F');
    snout.setAttribute('material', 'flatShading: true');
    el.appendChild(snout);

    // NARINAS (2 buracos pretos no focinho)
    var nostril1 = document.createElement('a-box');
    nostril1.setAttribute('width', 0.03); nostril1.setAttribute('height', 0.03); nostril1.setAttribute('depth', 0.02);
    nostril1.setAttribute('position', '-0.05 1.34 0.46');
    nostril1.setAttribute('color', '#1A2A10');
    el.appendChild(nostril1);
    var nostril2 = document.createElement('a-box');
    nostril2.setAttribute('width', 0.03); nostril2.setAttribute('height', 0.03); nostril2.setAttribute('depth', 0.02);
    nostril2.setAttribute('position', '0.05 1.34 0.46');
    nostril2.setAttribute('color', '#1A2A10');
    el.appendChild(nostril2);

    // SOBRANCELHAS verde-escuras raivosas
    var browL = document.createElement('a-box');
    browL.setAttribute('width', 0.12); browL.setAttribute('height', 0.03); browL.setAttribute('depth', 0.04);
    browL.setAttribute('position', '-0.09 1.48 0.16');
    browL.setAttribute('rotation', '0 0 15');
    browL.setAttribute('color', '#3D5F1F');
    el.appendChild(browL);
    var browR = document.createElement('a-box');
    browR.setAttribute('width', 0.12); browR.setAttribute('height', 0.03); browR.setAttribute('depth', 0.04);
    browR.setAttribute('position', '0.09 1.48 0.16');
    browR.setAttribute('rotation', '0 0 -15');
    browR.setAttribute('color', '#3D5F1F');
    el.appendChild(browR);

    // OLHOS amarelos com pupila preta
    var eyeWhiteL = document.createElement('a-sphere');
    eyeWhiteL.setAttribute('radius', 0.075);
    eyeWhiteL.setAttribute('position', '-0.09 1.4 0.16');
    eyeWhiteL.setAttribute('color', '#FFE034');
    eyeWhiteL.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.4; shader: flat');
    el.appendChild(eyeWhiteL);
    var pupilL = document.createElement('a-box');
    pupilL.setAttribute('width', 0.02); pupilL.setAttribute('height', 0.06); pupilL.setAttribute('depth', 0.02);
    pupilL.setAttribute('position', '-0.09 1.4 0.23');
    pupilL.setAttribute('color', '#000000');
    el.appendChild(pupilL);

    var eyeWhiteR = document.createElement('a-sphere');
    eyeWhiteR.setAttribute('radius', 0.075);
    eyeWhiteR.setAttribute('position', '0.09 1.4 0.16');
    eyeWhiteR.setAttribute('color', '#FFE034');
    eyeWhiteR.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.4; shader: flat');
    el.appendChild(eyeWhiteR);
    var pupilR = document.createElement('a-box');
    pupilR.setAttribute('width', 0.02); pupilR.setAttribute('height', 0.06); pupilR.setAttribute('depth', 0.02);
    pupilR.setAttribute('position', '0.09 1.4 0.23');
    pupilR.setAttribute('color', '#000000');
    el.appendChild(pupilR);

    // BOCA aberta (caixa escura)
    var mouth = document.createElement('a-box');
    mouth.setAttribute('width', 0.2); mouth.setAttribute('height', 0.06); mouth.setAttribute('depth', 0.25);
    mouth.setAttribute('position', '0 1.2 0.34');
    mouth.setAttribute('color', '#1A0010');
    el.appendChild(mouth);

    // DENTES superiores (3 caninos)
    for (var d = -1; d <= 1; d++) {
      var tooth = document.createElement('a-cone');
      tooth.setAttribute('radius-bottom', 0.022); tooth.setAttribute('radius-top', 0.001);
      tooth.setAttribute('height', d === 0 ? 0.05 : 0.07);
      tooth.setAttribute('segments-radial', 4);
      tooth.setAttribute('position', (d * 0.07) + ' 1.21 0.42');
      tooth.setAttribute('rotation', '180 0 0');
      tooth.setAttribute('color', '#FFF8DC');
      el.appendChild(tooth);
    }
    // DENTES inferiores (2 caninos)
    for (var dd = -1; dd <= 1; dd += 2) {
      var lowTooth = document.createElement('a-cone');
      lowTooth.setAttribute('radius-bottom', 0.018); lowTooth.setAttribute('radius-top', 0.001);
      lowTooth.setAttribute('height', 0.05);
      lowTooth.setAttribute('segments-radial', 4);
      lowTooth.setAttribute('position', (dd * 0.05) + ' 1.18 0.42');
      lowTooth.setAttribute('color', '#FFF8DC');
      el.appendChild(lowTooth);
    }

    // ===== CABELO VOLUMOSO (12 cones verde-oliva longos) =====
    // Lados e atrás
    for (var h = 0; h < 12; h++) {
      var hair = document.createElement('a-cone');
      hair.setAttribute('radius-bottom', 0.06);
      hair.setAttribute('radius-top', 0.01);
      hair.setAttribute('height', 0.45 + Math.random() * 0.25);
      hair.setAttribute('segments-radial', 4);
      var hAng = (h / 12) * Math.PI * 1.4 + Math.PI * 0.3;
      var hx = Math.cos(hAng) * 0.22;
      var hz = -0.05 + Math.sin(hAng) * 0.18;
      hair.setAttribute('position', hx + ' 1.15 ' + hz);
      hair.setAttribute('rotation', (15 + Math.random() * 25) + ' ' + (Math.random() * 30 - 15) + ' ' + (Math.random() * 30 - 15));
      var colors_hair = ['#7E8E2A', '#6F7F25', '#8A9A2F'];
      hair.setAttribute('color', colors_hair[h % 3]);
      hair.setAttribute('material', 'flatShading: true');
      el.appendChild(hair);
    }

    // ===== CHAPÉU DE BRUXA =====
    var hat = document.createElement('a-cone');
    hat.setAttribute('radius-bottom', 0.3);
    hat.setAttribute('radius-top', 0.02);
    hat.setAttribute('height', 0.6);
    hat.setAttribute('segments-radial', 10);
    hat.setAttribute('position', '0 1.78 -0.02');
    hat.setAttribute('rotation', '-8 0 8');
    hat.setAttribute('color', '#5A2F8E');
    hat.setAttribute('material', 'flatShading: true');
    el.appendChild(hat);

    // ABA larga
    var brim = document.createElement('a-cylinder');
    brim.setAttribute('radius', 0.45);
    brim.setAttribute('height', 0.04);
    brim.setAttribute('segments-radial', 12);
    brim.setAttribute('position', '0 1.5 -0.02');
    brim.setAttribute('rotation', '-5 0 5');
    brim.setAttribute('color', '#4A2570');
    brim.setAttribute('material', 'flatShading: true');
    el.appendChild(brim);

    // FAIXA marrom escura
    var band = document.createElement('a-torus');
    band.setAttribute('radius', 0.23);
    band.setAttribute('radius-tubular', 0.035);
    band.setAttribute('segments-radial', 4);
    band.setAttribute('segments-tubular', 14);
    band.setAttribute('position', '0 1.56 -0.02');
    band.setAttribute('rotation', '85 0 8');
    band.setAttribute('color', '#3D2817');
    el.appendChild(band);

    // FIVELA quadrada amarela
    var buckle = document.createElement('a-box');
    buckle.setAttribute('width', 0.1); buckle.setAttribute('height', 0.1); buckle.setAttribute('depth', 0.025);
    buckle.setAttribute('position', '0 1.58 0.22');
    buckle.setAttribute('color', '#D4A82C');
    el.appendChild(buckle);
    // Buraco da fivela
    var buckleHole = document.createElement('a-box');
    buckleHole.setAttribute('width', 0.05); buckleHole.setAttribute('height', 0.05); buckleHole.setAttribute('depth', 0.03);
    buckleHole.setAttribute('position', '0 1.58 0.235');
    buckleHole.setAttribute('color', '#3D2817');
    el.appendChild(buckleHole);

    // ===== BRAÇO ESQUERDO segurando cajado =====
    var armL = document.createElement('a-cylinder');
    armL.setAttribute('radius', 0.055);
    armL.setAttribute('height', 0.55);
    armL.setAttribute('segments-radial', 6);
    armL.setAttribute('position', '-0.32 0.92 0.08');
    armL.setAttribute('rotation', '0 0 15');
    armL.setAttribute('color', '#6BAE3F');
    armL.setAttribute('material', 'flatShading: true');
    el.appendChild(armL);

    // Mão esquerda + garras
    var handL = document.createElement('a-sphere');
    handL.setAttribute('radius', 0.08);
    handL.setAttribute('position', '-0.42 0.64 0.08');
    handL.setAttribute('color', '#6BAE3F');
    el.appendChild(handL);
    for (var cL = -1; cL <= 1; cL++) {
      var clawL = document.createElement('a-cone');
      clawL.setAttribute('radius-bottom', 0.018); clawL.setAttribute('radius-top', 0.001);
      clawL.setAttribute('height', 0.07); clawL.setAttribute('segments-radial', 4);
      clawL.setAttribute('position', (-0.42 + cL * 0.03) + ' 0.55 0.13');
      clawL.setAttribute('rotation', '180 0 0');
      clawL.setAttribute('color', '#D4A82C');
      el.appendChild(clawL);
    }

    // ===== BRAÇO DIREITO estendido =====
    var armR = document.createElement('a-cylinder');
    armR.setAttribute('radius', 0.055);
    armR.setAttribute('height', 0.5);
    armR.setAttribute('segments-radial', 6);
    armR.setAttribute('position', '0.32 0.95 0.18');
    armR.setAttribute('rotation', '-30 0 -20');
    armR.setAttribute('color', '#6BAE3F');
    el.appendChild(armR);

    // Mão direita + garras
    var handR = document.createElement('a-sphere');
    handR.setAttribute('radius', 0.08);
    handR.setAttribute('position', '0.48 0.75 0.36');
    handR.setAttribute('color', '#6BAE3F');
    el.appendChild(handR);
    for (var cR = -1; cR <= 1; cR++) {
      var clawR = document.createElement('a-cone');
      clawR.setAttribute('radius-bottom', 0.018); clawR.setAttribute('radius-top', 0.001);
      clawR.setAttribute('height', 0.07); clawR.setAttribute('segments-radial', 4);
      clawR.setAttribute('position', (0.48 + cR * 0.03) + ' 0.7 0.44');
      clawR.setAttribute('rotation', '90 0 0');
      clawR.setAttribute('color', '#D4A82C');
      el.appendChild(clawR);
    }

    // ===== CAJADO de madeira com ponta curva =====
    var staff = document.createElement('a-cylinder');
    staff.setAttribute('radius', 0.028);
    staff.setAttribute('height', 1.9);
    staff.setAttribute('segments-radial', 6);
    staff.setAttribute('position', '-0.5 1 0.08');
    staff.setAttribute('color', '#7A4D26');
    staff.setAttribute('material', 'flatShading: true');
    el.appendChild(staff);
    // Ponta curva (torus parcial)
    var staffTop = document.createElement('a-torus');
    staffTop.setAttribute('radius', 0.11);
    staffTop.setAttribute('radius-tubular', 0.028);
    staffTop.setAttribute('segments-radial', 4);
    staffTop.setAttribute('segments-tubular', 12);
    staffTop.setAttribute('arc', 270);
    staffTop.setAttribute('position', '-0.5 1.95 0.08');
    staffTop.setAttribute('color', '#7A4D26');
    el.appendChild(staffTop);

    // ===== CAUDA com espinhos =====
    var tail1 = document.createElement('a-box');
    tail1.setAttribute('width', 0.16); tail1.setAttribute('height', 0.16); tail1.setAttribute('depth', 0.35);
    tail1.setAttribute('position', '0 0.35 -0.35');
    tail1.setAttribute('color', '#6BAE3F');
    tail1.setAttribute('material', 'flatShading: true');
    el.appendChild(tail1);

    var tail2 = document.createElement('a-box');
    tail2.setAttribute('width', 0.12); tail2.setAttribute('height', 0.12); tail2.setAttribute('depth', 0.3);
    tail2.setAttribute('position', '0 0.32 -0.65');
    tail2.setAttribute('color', '#6BAE3F');
    tail2.setAttribute('material', 'flatShading: true');
    el.appendChild(tail2);

    var tail3 = document.createElement('a-cone');
    tail3.setAttribute('radius-bottom', 0.08); tail3.setAttribute('radius-top', 0.005);
    tail3.setAttribute('height', 0.3); tail3.setAttribute('segments-radial', 4);
    tail3.setAttribute('position', '0 0.32 -0.92');
    tail3.setAttribute('rotation', '90 0 0');
    tail3.setAttribute('color', '#6BAE3F');
    el.appendChild(tail3);

    // ESPINHOS na cauda
    for (var s = 0; s < 5; s++) {
      var spike = document.createElement('a-cone');
      spike.setAttribute('radius-bottom', 0.04); spike.setAttribute('radius-top', 0.001);
      spike.setAttribute('height', 0.1); spike.setAttribute('segments-radial', 3);
      spike.setAttribute('position', '0 ' + (0.45 + s * 0.005) + ' ' + (-0.25 - s * 0.18));
      spike.setAttribute('color', '#3D5F1F');
      el.appendChild(spike);
    }

    // ===== SAPATOS de salto pretos =====
    var shoeL = document.createElement('a-box');
    shoeL.setAttribute('width', 0.12); shoeL.setAttribute('height', 0.12); shoeL.setAttribute('depth', 0.2);
    shoeL.setAttribute('position', '-0.13 0.06 0.08');
    shoeL.setAttribute('color', '#1A0F2C');
    el.appendChild(shoeL);
    // Salto
    var heelL = document.createElement('a-box');
    heelL.setAttribute('width', 0.04); heelL.setAttribute('height', 0.06); heelL.setAttribute('depth', 0.04);
    heelL.setAttribute('position', '-0.13 0.03 -0.04');
    heelL.setAttribute('color', '#1A0F2C');
    el.appendChild(heelL);

    var shoeR = document.createElement('a-box');
    shoeR.setAttribute('width', 0.12); shoeR.setAttribute('height', 0.12); shoeR.setAttribute('depth', 0.2);
    shoeR.setAttribute('position', '0.13 0.06 0.08');
    shoeR.setAttribute('color', '#1A0F2C');
    el.appendChild(shoeR);
    var heelR = document.createElement('a-box');
    heelR.setAttribute('width', 0.04); heelR.setAttribute('height', 0.06); heelR.setAttribute('depth', 0.04);
    heelR.setAttribute('position', '0.13 0.03 -0.04');
    heelR.setAttribute('color', '#1A0F2C');
    el.appendChild(heelR);
  }
});
