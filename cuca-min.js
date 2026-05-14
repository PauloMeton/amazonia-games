/* CUCA MÍNIMA v2 — mais detalhes visuais, ainda sem interação nem animação */
AFRAME.registerComponent('cuca-min', {
  init: function () {
    var el = this.el;

    // VESTIDO roxo
    var d = document.createElement('a-cone');
    d.setAttribute('radius-bottom', 0.4); d.setAttribute('radius-top', 0.2);
    d.setAttribute('height', 1); d.setAttribute('position', '0 0.5 0');
    d.setAttribute('color', '#4A2E7A');
    el.appendChild(d);

    // CINTO preto
    var belt = document.createElement('a-torus');
    belt.setAttribute('radius', 0.28); belt.setAttribute('radius-tubular', 0.025);
    belt.setAttribute('segments-radial', 4); belt.setAttribute('segments-tubular', 12);
    belt.setAttribute('position', '0 0.75 0');
    belt.setAttribute('color', '#1A0F2C');
    el.appendChild(belt);

    // CABEÇA verde (mais larga, formato jacaré)
    var h = document.createElement('a-box');
    h.setAttribute('width', 0.3); h.setAttribute('height', 0.25); h.setAttribute('depth', 0.3);
    h.setAttribute('position', '0 1.3 0');
    h.setAttribute('color', '#6BAE3F');
    el.appendChild(h);

    // FOCINHO (caixa pra frente, mais alongada)
    var sn = document.createElement('a-box');
    sn.setAttribute('width', 0.2); sn.setAttribute('height', 0.15); sn.setAttribute('depth', 0.3);
    sn.setAttribute('position', '0 1.26 0.28');
    sn.setAttribute('color', '#6BAE3F');
    el.appendChild(sn);

    // OLHO esquerdo
    var e1 = document.createElement('a-sphere');
    e1.setAttribute('radius', 0.05);
    e1.setAttribute('position', '-0.07 1.4 0.14');
    e1.setAttribute('color', '#FFE034');
    el.appendChild(e1);

    // OLHO direito
    var e2 = document.createElement('a-sphere');
    e2.setAttribute('radius', 0.05);
    e2.setAttribute('position', '0.07 1.4 0.14');
    e2.setAttribute('color', '#FFE034');
    el.appendChild(e2);

    // BOCA preta
    var m = document.createElement('a-box');
    m.setAttribute('width', 0.16); m.setAttribute('height', 0.03); m.setAttribute('depth', 0.2);
    m.setAttribute('position', '0 1.18 0.32');
    m.setAttribute('color', '#1A0010');
    el.appendChild(m);

    // 3 DENTES brancos
    for (var t = -1; t <= 1; t++) {
      var tooth = document.createElement('a-box');
      tooth.setAttribute('width', 0.02); tooth.setAttribute('height', 0.04); tooth.setAttribute('depth', 0.02);
      tooth.setAttribute('position', (t * 0.05) + ' 1.16 0.38');
      tooth.setAttribute('color', '#FFFFFF');
      el.appendChild(tooth);
    }

    // CABELO verde (4 cones pra trás)
    for (var k = 0; k < 4; k++) {
      var hair = document.createElement('a-cone');
      hair.setAttribute('radius-bottom', 0.04); hair.setAttribute('radius-top', 0.005);
      hair.setAttribute('height', 0.3);
      hair.setAttribute('position', ((k - 1.5) * 0.07) + ' 1.2 -0.15');
      hair.setAttribute('color', '#7E8E2A');
      el.appendChild(hair);
    }

    // CHAPÉU cone roxo
    var hat = document.createElement('a-cone');
    hat.setAttribute('radius-bottom', 0.25); hat.setAttribute('radius-top', 0.02);
    hat.setAttribute('height', 0.45);
    hat.setAttribute('position', '0 1.68 -0.02');
    hat.setAttribute('color', '#5A2F8E');
    el.appendChild(hat);

    // ABA do chapéu (cilindro achatado)
    var brim = document.createElement('a-cylinder');
    brim.setAttribute('radius', 0.38); brim.setAttribute('height', 0.03);
    brim.setAttribute('position', '0 1.45 -0.02');
    brim.setAttribute('color', '#4A2570');
    el.appendChild(brim);

    // FIVELA amarela
    var bk = document.createElement('a-box');
    bk.setAttribute('width', 0.06); bk.setAttribute('height', 0.06); bk.setAttribute('depth', 0.015);
    bk.setAttribute('position', '0 1.5 0.2');
    bk.setAttribute('color', '#FFD700');
    el.appendChild(bk);

    // CAUDA (cone deitado atrás)
    var tail = document.createElement('a-box');
    tail.setAttribute('width', 0.1); tail.setAttribute('height', 0.1); tail.setAttribute('depth', 0.6);
    tail.setAttribute('position', '0 0.3 -0.4');
    tail.setAttribute('color', '#6BAE3F');
    el.appendChild(tail);

    // CAJADO
    var st = document.createElement('a-cylinder');
    st.setAttribute('radius', 0.025); st.setAttribute('height', 1.5);
    st.setAttribute('position', '-0.35 0.9 0');
    st.setAttribute('color', '#7A4D26');
    el.appendChild(st);

    // PEDRA do cajado
    var o = document.createElement('a-sphere');
    o.setAttribute('radius', 0.05);
    o.setAttribute('position', '-0.35 1.7 0');
    o.setAttribute('color', '#7FFFD4');
    el.appendChild(o);
  }
});
