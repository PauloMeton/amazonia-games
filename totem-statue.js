/* ============================================================================
   TOTEM-STATUE.JS — TOTEM ANCESTRAL (versão grande no cenário)
   ============================================================================
   Totem fixo no chão, estilizado seguindo a referência:
   - Topo: cabeça de coruja/águia com asas estendidas
   - Meio: rosto humanoide
   - Inferior: rosto com olhos hexagonais
   - Base: coluna com padrões geométricos (zigue-zague, losangos)
   - Animações: olhos pulsantes, asas oscilando, leve bobbing
   ============================================================================ */
AFRAME.registerComponent('totem-statue', {
  init: function () {
    var el = this.el;

    // Container animável (bobbing geral)
    var container = document.createElement('a-entity');
    container.setAttribute('animation',
      'property: position; from: 0 0 0; to: 0 0.08 0; dir: alternate; loop: true; dur: 3500; easing: easeInOutSine');
    el.appendChild(container);

    // ===== BASE INFERIOR (cone arredondado fincado no chão) =====
    var foot = document.createElement('a-cone');
    foot.setAttribute('radius-bottom', 0.25);
    foot.setAttribute('radius-top', 0.4);
    foot.setAttribute('height', 0.4);
    foot.setAttribute('segments-radial', 8);
    foot.setAttribute('position', '0 0.2 0');
    foot.setAttribute('color', '#5C3A1A');
    foot.setAttribute('material', 'flatShading: true');
    container.appendChild(foot);

    // ===== COLUNA BASE COM PADRÕES =====
    // Anel teal/verde claro no pé
    var band1 = document.createElement('a-cylinder');
    band1.setAttribute('radius', 0.42); band1.setAttribute('height', 0.08);
    band1.setAttribute('segments-radial', 8);
    band1.setAttribute('position', '0 0.42 0');
    band1.setAttribute('color', '#4A8B7A');
    container.appendChild(band1);

    // Pequeno anel amarelo
    var band2 = document.createElement('a-cylinder');
    band2.setAttribute('radius', 0.43); band2.setAttribute('height', 0.04);
    band2.setAttribute('segments-radial', 8);
    band2.setAttribute('position', '0 0.49 0');
    band2.setAttribute('color', '#D4A82C');
    container.appendChild(band2);

    // Faixa de triângulos amarelos (4 lados)
    for (var t = 0; t < 4; t++) {
      var tri = document.createElement('a-cone');
      tri.setAttribute('radius-bottom', 0.12); tri.setAttribute('radius-top', 0.001);
      tri.setAttribute('height', 0.15); tri.setAttribute('segments-radial', 3);
      var ang = (t / 4) * Math.PI * 2;
      tri.setAttribute('position', (Math.cos(ang) * 0.42) + ' 0.62 ' + (Math.sin(ang) * 0.42));
      tri.setAttribute('rotation', '0 ' + (-t * 90) + ' 0');
      tri.setAttribute('color', '#D4A82C');
      container.appendChild(tri);
    }

    // Coluna marrom principal
    var column1 = document.createElement('a-cylinder');
    column1.setAttribute('radius', 0.4);
    column1.setAttribute('height', 0.7);
    column1.setAttribute('segments-radial', 8);
    column1.setAttribute('position', '0 1.0 0');
    column1.setAttribute('color', '#7A4D26');
    column1.setAttribute('material', 'flatShading: true');
    container.appendChild(column1);

    // Losango vermelho no meio da coluna (4 lados)
    for (var d = 0; d < 4; d++) {
      var diamond = document.createElement('a-box');
      diamond.setAttribute('width', 0.16); diamond.setAttribute('height', 0.22); diamond.setAttribute('depth', 0.02);
      var dAng = (d / 4) * Math.PI * 2;
      diamond.setAttribute('position', (Math.cos(dAng) * 0.41) + ' 1.0 ' + (Math.sin(dAng) * 0.41));
      diamond.setAttribute('rotation', '0 ' + (-d * 90) + ' 45');
      diamond.setAttribute('color', '#C04030');
      container.appendChild(diamond);
      // Centro amarelo do losango
      var dCenter = document.createElement('a-box');
      dCenter.setAttribute('width', 0.08); dCenter.setAttribute('height', 0.08); dCenter.setAttribute('depth', 0.025);
      dCenter.setAttribute('position', (Math.cos(dAng) * 0.41) + ' 1.0 ' + (Math.sin(dAng) * 0.41));
      dCenter.setAttribute('rotation', '0 ' + (-d * 90) + ' 45');
      dCenter.setAttribute('color', '#D4A82C');
      container.appendChild(dCenter);
    }

    // Faixa zigue-zague verde (acima dos losangos)
    var zigBase = document.createElement('a-cylinder');
    zigBase.setAttribute('radius', 0.41); zigBase.setAttribute('height', 0.12);
    zigBase.setAttribute('segments-radial', 8);
    zigBase.setAttribute('position', '0 1.5 0');
    zigBase.setAttribute('color', '#4A8B7A');
    container.appendChild(zigBase);
    // Triângulos amarelos do zigue-zague (8 ao redor)
    for (var z = 0; z < 8; z++) {
      var zAng = (z / 8) * Math.PI * 2;
      var zTri = document.createElement('a-cone');
      zTri.setAttribute('radius-bottom', 0.08); zTri.setAttribute('radius-top', 0.001);
      zTri.setAttribute('height', 0.1); zTri.setAttribute('segments-radial', 3);
      zTri.setAttribute('position', (Math.cos(zAng) * 0.42) + ' 1.55 ' + (Math.sin(zAng) * 0.42));
      zTri.setAttribute('rotation', '0 ' + (-z * 45 + 90) + ' 0');
      zTri.setAttribute('color', '#D4A82C');
      container.appendChild(zTri);
    }

    // ===== ROSTO INFERIOR (com olhos hexagonais) =====
    var face1 = document.createElement('a-box');
    face1.setAttribute('width', 0.8); face1.setAttribute('height', 0.6); face1.setAttribute('depth', 0.7);
    face1.setAttribute('position', '0 1.95 0');
    face1.setAttribute('color', '#7A4D26');
    face1.setAttribute('material', 'flatShading: true');
    container.appendChild(face1);

    // Olhos hexagonais amarelos (com pulsação)
    function hexEye(x, y, z, parent) {
      var ring = document.createElement('a-octahedron');
      ring.setAttribute('radius', 0.13);
      ring.setAttribute('position', x + ' ' + y + ' ' + z);
      ring.setAttribute('color', '#D4A82C');
      ring.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.4');
      ring.setAttribute('animation',
        'property: material.emissiveIntensity; from: 0.3; to: 0.9; dir: alternate; loop: true; dur: 2000');
      parent.appendChild(ring);
      var pupil = document.createElement('a-box');
      pupil.setAttribute('width', 0.08); pupil.setAttribute('height', 0.08); pupil.setAttribute('depth', 0.02);
      pupil.setAttribute('position', x + ' ' + y + ' ' + (z + 0.03));
      pupil.setAttribute('color', '#1A0F0A');
      parent.appendChild(pupil);
    }
    hexEye(-0.2, 2.05, 0.36, container);
    hexEye(0.2, 2.05, 0.36, container);

    // Boca quadrada vermelha
    var mouth1 = document.createElement('a-box');
    mouth1.setAttribute('width', 0.16); mouth1.setAttribute('height', 0.06); mouth1.setAttribute('depth', 0.02);
    mouth1.setAttribute('position', '0 1.78 0.36');
    mouth1.setAttribute('color', '#C04030');
    container.appendChild(mouth1);

    // ===== ROSTO MEIO (humanoide) =====
    var face2 = document.createElement('a-box');
    face2.setAttribute('width', 0.85); face2.setAttribute('height', 0.5); face2.setAttribute('depth', 0.7);
    face2.setAttribute('position', '0 2.55 0');
    face2.setAttribute('color', '#5C3A1A');
    face2.setAttribute('material', 'flatShading: true');
    container.appendChild(face2);
    // Faixa amarela superior (tipo testa)
    var brow2 = document.createElement('a-box');
    brow2.setAttribute('width', 0.85); brow2.setAttribute('height', 0.08); brow2.setAttribute('depth', 0.72);
    brow2.setAttribute('position', '0 2.74 0');
    brow2.setAttribute('color', '#D4A82C');
    container.appendChild(brow2);
    // Olhos losango (face do meio)
    var eye2L = document.createElement('a-box');
    eye2L.setAttribute('width', 0.14); eye2L.setAttribute('height', 0.14); eye2L.setAttribute('depth', 0.02);
    eye2L.setAttribute('position', '-0.2 2.6 0.36'); eye2L.setAttribute('rotation', '0 0 45');
    eye2L.setAttribute('color', '#D4A82C');
    eye2L.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.5');
    container.appendChild(eye2L);
    var eye2R = document.createElement('a-box');
    eye2R.setAttribute('width', 0.14); eye2R.setAttribute('height', 0.14); eye2R.setAttribute('depth', 0.02);
    eye2R.setAttribute('position', '0.2 2.6 0.36'); eye2R.setAttribute('rotation', '0 0 45');
    eye2R.setAttribute('color', '#D4A82C');
    eye2R.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.5');
    container.appendChild(eye2R);
    // Nariz vermelho (triângulo)
    var nose = document.createElement('a-cone');
    nose.setAttribute('radius-bottom', 0.06); nose.setAttribute('radius-top', 0.001);
    nose.setAttribute('height', 0.1); nose.setAttribute('segments-radial', 3);
    nose.setAttribute('position', '0 2.5 0.4'); nose.setAttribute('rotation', '90 0 0');
    nose.setAttribute('color', '#C04030');
    container.appendChild(nose);
    // Boca aberta amarela
    var mouth2 = document.createElement('a-box');
    mouth2.setAttribute('width', 0.18); mouth2.setAttribute('height', 0.08); mouth2.setAttribute('depth', 0.02);
    mouth2.setAttribute('position', '0 2.4 0.36');
    mouth2.setAttribute('color', '#D4A82C');
    container.appendChild(mouth2);

    // ===== TOPO: CABEÇA DE PÁSSARO COM ASAS =====
    // Topo da cabeça
    var topHead = document.createElement('a-box');
    topHead.setAttribute('width', 0.7); topHead.setAttribute('height', 0.4); topHead.setAttribute('depth', 0.7);
    topHead.setAttribute('position', '0 3.05 0');
    topHead.setAttribute('color', '#7A4D26');
    topHead.setAttribute('material', 'flatShading: true');
    container.appendChild(topHead);
    // Faixa teal acima
    var topBand = document.createElement('a-box');
    topBand.setAttribute('width', 0.72); topBand.setAttribute('height', 0.06); topBand.setAttribute('depth', 0.72);
    topBand.setAttribute('position', '0 3.27 0');
    topBand.setAttribute('color', '#4A8B7A');
    container.appendChild(topBand);

    // Olhos do pássaro (losangos amarelos)
    var birdEyeL = document.createElement('a-box');
    birdEyeL.setAttribute('width', 0.13); birdEyeL.setAttribute('height', 0.13); birdEyeL.setAttribute('depth', 0.02);
    birdEyeL.setAttribute('position', '-0.18 3.1 0.36'); birdEyeL.setAttribute('rotation', '0 0 45');
    birdEyeL.setAttribute('color', '#D4A82C');
    birdEyeL.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.5');
    container.appendChild(birdEyeL);
    var birdEyeR = document.createElement('a-box');
    birdEyeR.setAttribute('width', 0.13); birdEyeR.setAttribute('height', 0.13); birdEyeR.setAttribute('depth', 0.02);
    birdEyeR.setAttribute('position', '0.18 3.1 0.36'); birdEyeR.setAttribute('rotation', '0 0 45');
    birdEyeR.setAttribute('color', '#D4A82C');
    birdEyeR.setAttribute('material', 'emissive: #D4A82C; emissiveIntensity: 0.5');
    container.appendChild(birdEyeR);
    // Pupila preta dos losangos
    var pupL = document.createElement('a-box');
    pupL.setAttribute('width', 0.06); pupL.setAttribute('height', 0.06); pupL.setAttribute('depth', 0.025);
    pupL.setAttribute('position', '-0.18 3.1 0.37'); pupL.setAttribute('rotation', '0 0 45');
    pupL.setAttribute('color', '#000000');
    container.appendChild(pupL);
    var pupR = document.createElement('a-box');
    pupR.setAttribute('width', 0.06); pupR.setAttribute('height', 0.06); pupR.setAttribute('depth', 0.025);
    pupR.setAttribute('position', '0.18 3.1 0.37'); pupR.setAttribute('rotation', '0 0 45');
    pupR.setAttribute('color', '#000000');
    container.appendChild(pupR);

    // BICO amarelo (triângulo grande pra frente)
    var beak = document.createElement('a-cone');
    beak.setAttribute('radius-bottom', 0.18); beak.setAttribute('radius-top', 0.005);
    beak.setAttribute('height', 0.35); beak.setAttribute('segments-radial', 4);
    beak.setAttribute('position', '0 2.95 0.5'); beak.setAttribute('rotation', '90 45 0');
    beak.setAttribute('color', '#D4A82C');
    beak.setAttribute('material', 'flatShading: true');
    container.appendChild(beak);

    // ORELHAS / TUFOS no topo da cabeça
    var earL = document.createElement('a-cone');
    earL.setAttribute('radius-bottom', 0.1); earL.setAttribute('radius-top', 0.005);
    earL.setAttribute('height', 0.3); earL.setAttribute('segments-radial', 4);
    earL.setAttribute('position', '-0.2 3.5 0'); earL.setAttribute('color', '#5C3A1A');
    container.appendChild(earL);
    var earR = document.createElement('a-cone');
    earR.setAttribute('radius-bottom', 0.1); earR.setAttribute('radius-top', 0.005);
    earR.setAttribute('height', 0.3); earR.setAttribute('segments-radial', 4);
    earR.setAttribute('position', '0.2 3.5 0'); earR.setAttribute('color', '#5C3A1A');
    container.appendChild(earR);

    // Detalhes vermelhos nos tufos
    var earInL = document.createElement('a-cone');
    earInL.setAttribute('radius-bottom', 0.04); earInL.setAttribute('radius-top', 0.001);
    earInL.setAttribute('height', 0.15); earInL.setAttribute('segments-radial', 3);
    earInL.setAttribute('position', '-0.2 3.5 0.06'); earInL.setAttribute('color', '#C04030');
    container.appendChild(earInL);
    var earInR = document.createElement('a-cone');
    earInR.setAttribute('radius-bottom', 0.04); earInR.setAttribute('radius-top', 0.001);
    earInR.setAttribute('height', 0.15); earInR.setAttribute('segments-radial', 3);
    earInR.setAttribute('position', '0.2 3.5 0.06'); earInR.setAttribute('color', '#C04030');
    container.appendChild(earInR);

    // ===== ASAS ESTENDIDAS (esquerda e direita) =====
    // Grupo da asa esquerda (com animação de balanço)
    var wingL = document.createElement('a-entity');
    wingL.setAttribute('position', '-0.35 3.05 0');
    wingL.setAttribute('animation',
      'property: rotation; from: 0 0 5; to: 0 0 -5; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine');
    container.appendChild(wingL);
    // Parte interna da asa
    var wingLInner = document.createElement('a-box');
    wingLInner.setAttribute('width', 0.5); wingLInner.setAttribute('height', 0.4); wingLInner.setAttribute('depth', 0.3);
    wingLInner.setAttribute('position', '-0.35 0 0');
    wingLInner.setAttribute('color', '#5C3A1A');
    wingLInner.setAttribute('material', 'flatShading: true');
    wingL.appendChild(wingLInner);
    // Padrão vermelho/teal
    var wingLPattern = document.createElement('a-box');
    wingLPattern.setAttribute('width', 0.16); wingLPattern.setAttribute('height', 0.16); wingLPattern.setAttribute('depth', 0.02);
    wingLPattern.setAttribute('position', '-0.35 0 0.16');
    wingLPattern.setAttribute('color', '#4A8B7A');
    wingL.appendChild(wingLPattern);
    var wingLDiamond = document.createElement('a-box');
    wingLDiamond.setAttribute('width', 0.08); wingLDiamond.setAttribute('height', 0.08); wingLDiamond.setAttribute('depth', 0.025);
    wingLDiamond.setAttribute('position', '-0.35 0 0.18'); wingLDiamond.setAttribute('rotation', '0 0 45');
    wingLDiamond.setAttribute('color', '#D4A82C');
    wingL.appendChild(wingLDiamond);

    // Asa direita (espelhada)
    var wingR = document.createElement('a-entity');
    wingR.setAttribute('position', '0.35 3.05 0');
    wingR.setAttribute('animation',
      'property: rotation; from: 0 0 -5; to: 0 0 5; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine');
    container.appendChild(wingR);
    var wingRInner = document.createElement('a-box');
    wingRInner.setAttribute('width', 0.5); wingRInner.setAttribute('height', 0.4); wingRInner.setAttribute('depth', 0.3);
    wingRInner.setAttribute('position', '0.35 0 0');
    wingRInner.setAttribute('color', '#5C3A1A');
    wingR.appendChild(wingRInner);
    var wingRPattern = document.createElement('a-box');
    wingRPattern.setAttribute('width', 0.16); wingRPattern.setAttribute('height', 0.16); wingRPattern.setAttribute('depth', 0.02);
    wingRPattern.setAttribute('position', '0.35 0 0.16');
    wingRPattern.setAttribute('color', '#4A8B7A');
    wingR.appendChild(wingRPattern);
    var wingRDiamond = document.createElement('a-box');
    wingRDiamond.setAttribute('width', 0.08); wingRDiamond.setAttribute('height', 0.08); wingRDiamond.setAttribute('depth', 0.025);
    wingRDiamond.setAttribute('position', '0.35 0 0.18'); wingRDiamond.setAttribute('rotation', '0 0 45');
    wingRDiamond.setAttribute('color', '#D4A82C');
    wingR.appendChild(wingRDiamond);

    // Luz pontual brilhando do topo do totem (aura)
    var totemLight = document.createElement('a-light');
    totemLight.setAttribute('type', 'point');
    totemLight.setAttribute('color', '#FFD700');
    totemLight.setAttribute('intensity', 0.7);
    totemLight.setAttribute('distance', 6);
    totemLight.setAttribute('position', '0 3.2 0.3');
    container.appendChild(totemLight);
  }
});
