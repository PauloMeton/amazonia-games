/* CUCA MÍNIMA — 7 primitivos, sem interação nem animação */
AFRAME.registerComponent('cuca-min', {
  init: function () {
    var el = this.el;

    // Vestido roxo
    var d = document.createElement('a-cone');
    d.setAttribute('radius-bottom', 0.4); d.setAttribute('radius-top', 0.2);
    d.setAttribute('height', 1); d.setAttribute('position', '0 0.5 0');
    d.setAttribute('color', '#4A2E7A');
    el.appendChild(d);

    // Cabeça verde
    var h = document.createElement('a-box');
    h.setAttribute('width', 0.3); h.setAttribute('height', 0.25); h.setAttribute('depth', 0.4);
    h.setAttribute('position', '0 1.3 0.05');
    h.setAttribute('color', '#6BAE3F');
    el.appendChild(h);

    // Olho esquerdo
    var e1 = document.createElement('a-sphere');
    e1.setAttribute('radius', 0.05);
    e1.setAttribute('position', '-0.07 1.4 0.2');
    e1.setAttribute('color', '#FFE034');
    el.appendChild(e1);

    // Olho direito
    var e2 = document.createElement('a-sphere');
    e2.setAttribute('radius', 0.05);
    e2.setAttribute('position', '0.07 1.4 0.2');
    e2.setAttribute('color', '#FFE034');
    el.appendChild(e2);

    // Chapéu
    var hat = document.createElement('a-cone');
    hat.setAttribute('radius-bottom', 0.25); hat.setAttribute('radius-top', 0.02);
    hat.setAttribute('height', 0.4); hat.setAttribute('position', '0 1.65 0');
    hat.setAttribute('color', '#5A2F8E');
    el.appendChild(hat);

    // Cajado
    var st = document.createElement('a-cylinder');
    st.setAttribute('radius', 0.025); st.setAttribute('height', 1.5);
    st.setAttribute('position', '-0.35 0.9 0');
    st.setAttribute('color', '#7A4D26');
    el.appendChild(st);

    // Pedra do cajado
    var o = document.createElement('a-sphere');
    o.setAttribute('radius', 0.05);
    o.setAttribute('position', '-0.35 1.7 0');
    o.setAttribute('color', '#7FFFD4');
    el.appendChild(o);
  }
});
