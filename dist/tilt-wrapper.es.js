import { css as d, LitElement as p, html as c } from "lit";
import { property as v, customElement as m } from "lit/decorators.js";
var h = Object.defineProperty, u = Object.getOwnPropertyDescriptor, a = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? u(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (o ? l(e, i, r) : l(r)) || r);
  return o && r && h(e, i, r), r;
};
let n = class extends p {
  constructor() {
    super(...arguments), this.deviceOrientation = !0, this._tiltForOrientation = async (t) => {
      let e = t.beta ? t.beta / 180 : 0, i = t.gamma ? t.gamma / 90 : 0;
      this._tilt(e, i, 1);
    }, this._tiltForMouse = async (t) => {
      let e = (t.x - window.innerWidth / 2) / window.innerWidth, i = (window.innerHeight / 2 - t.y) / window.innerHeight;
      this._tilt(i, e);
    };
  }
  /**
   * Tilts elements.
   * @param x the amount to tilt.
   * @param y the amount to tilt.
   * @param factor the multiplier of the tilt.
   * NOTE: Code forked from Content.rerotate()
   */
  _tilt(t, e, i = 1) {
    let o = t * i * parseFloat(getComputedStyle(this).getPropertyValue("--tiltFactorY") || "0"), r = e * i * parseFloat(getComputedStyle(this).getPropertyValue("--tiltFactorX") || "0");
    this.style.setProperty("--tileX", o.toString()), this.style.setProperty("--tileY", r.toString()), clearTimeout(this.tiltTimeout), this.tiltTimeout = setTimeout(() => this._resetTilt(), 3e3);
  }
  _resetTilt() {
    let t = 2;
    window.DeviceOrientationEvent && window.removeEventListener("deviceorientation", this._tiltForOrientation), window.removeEventListener("mousemove", this._tiltForMouse), this.style.setProperty("--tileX", "0"), this.style.setProperty("--tileY", "0"), setTimeout(() => {
      window.addEventListener("deviceorientation", this._tiltForOrientation), window.addEventListener("mousemove", this._tiltForMouse);
    }, t * 1e3);
  }
  async init() {
    window.addEventListener("deviceorientation", this._tiltForOrientation), window.addEventListener("pointermove", this._tiltForMouse);
  }
  firstUpdated() {
    this.init();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("deviceorientation", this._tiltForOrientation), window.removeEventListener("pointermove", this._tiltForMouse);
  }
  render() {
    return c`
      <div class="tilt">
        <slot></slot>
      </div>
    `;
  }
};
n.styles = [
  d`
      :host {
        display: block;
        --tileX: 0;
        --tileY: 0;
        --perspective: 1000px;
        --tiltFactorY: 45;
        --tiltFactorX: 45;
      }

      .tilt {
        position: relative;
        padding: 1rem;
        background-color: grey;
        transform: perspective(var(--perspective))
          rotateX(calc(var(--tileX) * 1deg))
          rotateY(calc(var(--tileY) * 1deg))
        ;
        transition: transform 3s cubic-bezier(0,.67,.32,1);
      }
    `
];
a([
  v({ type: Boolean, reflect: !0 })
], n.prototype, "deviceOrientation", 2);
n = a([
  m("tilt-wrapper")
], n);
export {
  n as TiltWrapper
};
