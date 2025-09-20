import { css as m, LitElement as _, html as w } from "lit";
import { customElement as g } from "lit/decorators.js";
var y = Object.getOwnPropertyDescriptor, v = (t) => {
  throw TypeError(t);
}, F = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? y(e, i) : e, o = t.length - 1, a; o >= 0; o--)
    (a = t[o]) && (r = a(r) || r);
  return r;
}, f = (t, e, i) => e.has(t) || v("Cannot " + i), E = (t, e, i) => e.has(t) ? v("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), c = (t, e, i) => (f(t, e, "access private method"), i), s, l;
const d = "ontouchstart" in window || navigator.maxTouchPoints > 0;
let h = class extends _ {
  constructor() {
    super(...arguments), E(this, s), this._tiltForOrientation = async (t) => {
      let e = t.beta ? t.beta / 180 : 0, i = t.gamma ? t.gamma / 90 : 0;
      this.tilt(e, i, 1);
    }, this._tiltForMouse = async (t) => {
      let e = (t.x - window.innerWidth / 2) / window.innerWidth, i = (window.innerHeight / 2 - t.y) / window.innerHeight;
      this.tilt(i, e);
    };
  }
  /**
   * Tilts elements.
   * @param x the amount to tilt.
   * @param y the amount to tilt.
   * @param factor the multiplier of the tilt.
   * NOTE: Code forked from Content.rerotate()
   */
  tilt(t, e, i = 1) {
    let n = parseFloat(this.getPropertyValue("--tiltX") || "0"), r = parseFloat(this.getPropertyValue("--tiltY") || "0"), o = parseFloat(this.getPropertyValue("--tiltFactorY") || "0"), a = parseFloat(this.getPropertyValue("--tiltFactorX") || "0"), u = n + t * a * i, p = r + e * o * i;
    this.style.setProperty("--_tileX", u.toString()), this.style.setProperty("--_tileY", p.toString()), t && e && (c(this, s, l).call(this, "tilt:tilting", { x: u, y: p }), clearTimeout(this.tiltTimeout), this.tiltTimeout = setTimeout(() => this._resetTilt(), 3e3));
  }
  getPropertyValue(t) {
    return getComputedStyle(this).getPropertyValue(t) || "";
  }
  _resetTilt() {
    let t = 2;
    window.removeEventListener("deviceorientation", this._tiltForOrientation), window.removeEventListener("mousemove", this._tiltForMouse), this.tilt(0, 0), c(this, s, l).call(this, "tilt:reset"), clearTimeout(this.resetTimeout), this.resetTimeout = setTimeout(() => {
      d && window.addEventListener("deviceorientation", this._tiltForOrientation), window.addEventListener("mousemove", this._tiltForMouse), c(this, s, l).call(this, "tilt:after_reset");
    }, t * 1e3);
  }
  async init() {
    d && window.addEventListener("deviceorientation", this._tiltForOrientation), window.addEventListener("pointermove", this._tiltForMouse), this.tilt(0, 0);
  }
  firstUpdated() {
    this.init();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), d && window.removeEventListener("deviceorientation", this._tiltForOrientation), window.removeEventListener("pointermove", this._tiltForMouse);
  }
  render() {
    return w`
      <div class="tilt">
        <slot></slot>
      </div>
    `;
  }
};
s = /* @__PURE__ */ new WeakSet();
l = function(t, e) {
  this.dispatchEvent(new CustomEvent(t, {
    bubbles: !0,
    cancelable: !0,
    detail: e
  }));
};
h.styles = [
  m`
      :host {
        display: block;
        --tileX: 0;
        --tileY: 0;
        --perspective: 1000px;
        --tiltFactorY: 45;
        --tiltFactorX: 45;
        --_tileX: 0; /* internal usage for calculations. */
        --_tileY: 0; /* internal usage for calculations. */
      }

      .tilt {
        position: relative;
        padding: 1rem;
        background-color: grey;
        /* NOTE: Updating --_tiltN is the only way to tilt programmatically, oddly adding another CSS custom property and updating that doesn't work. */
        transform: perspective(var(--perspective))
          rotateX(calc(var(--_tileX) * 1deg))
          rotateY(calc(var(--_tileY) * 1deg))
        ;
        transition: transform 3s cubic-bezier(0,.67,.32,1);
      }
    `
];
h = F([
  g("div-tilt")
], h);
export {
  h as Tilt
};
