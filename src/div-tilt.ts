import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('div-tilt')
export class Tilt extends LitElement {
  @property({ type: Boolean, reflect: true }) deviceOrientation = true;
  tiltTimeout !: ReturnType<typeof setTimeout>;
  resetTimeout !: ReturnType<typeof setTimeout>;

  static styles = [
    css`
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
    `,
  ];

  /**
  * Tilts contents with DeviceOrientationEvent.
  */
  _tiltForOrientation = async (ev: DeviceOrientationEvent) => {
    let x = ev.beta ? ev.beta / 180 : 0;  // In degree in the range [-180,180]
    let y = ev.gamma ? ev.gamma / 90 : 0; // In degree in the range [-90,90]
    this.tilt(x, y, 1);
  }

  /**
   * Tilts contents with MouseMove.
   */
  _tiltForMouse = async (ev: MouseEvent) => {
    let x = (ev.x - window.innerWidth / 2) / window.innerWidth;
    let y = (window.innerHeight / 2 - ev.y) / window.innerHeight;
    this.tilt(y, x); /// Reverse as per rotation axeses.
  }

  /**
   * Tilts elements.
   * @param x the amount to tilt.
   * @param y the amount to tilt.
   * @param factor the multiplier of the tilt.
   * NOTE: Code forked from Content.rerotate()
   */
  tilt(x: number, y: number, factor = 1) {
    let tiltX = parseFloat(this.getPropertyValue('--tiltX') || '0') * 0.01;
    let tiltY = parseFloat(this.getPropertyValue('--tiltY') || '0') * 0.01;
    let tiltFactorY = parseFloat(this.getPropertyValue('--tiltFactorY') || '0');
    let tiltFactorX = parseFloat(this.getPropertyValue('--tiltFactorX') || '0');
    let offsetX = (tiltX + x) * tiltFactorX * factor;
    let offsetY = (tiltY + y) * tiltFactorY * factor;

    this.style.setProperty('--_tileX', offsetX.toString());
    this.style.setProperty('--_tileY', offsetY.toString());

    clearTimeout(this.tiltTimeout);
    this.tiltTimeout = setTimeout(() => this._resetTilt(), 3000);
  }

  getPropertyValue(prop: string) {
    return getComputedStyle(this).getPropertyValue(prop) || '';
  }

  private _resetTilt() {
    let duration = 2;
    window.removeEventListener('deviceorientation', this._tiltForOrientation);
    window.removeEventListener('mousemove', this._tiltForMouse);

    this.tilt(0, 0);
    clearTimeout(this.resetTimeout);

    this.resetTimeout = setTimeout(() => {
      isTouchDevice && window.addEventListener('deviceorientation', this._tiltForOrientation)
      window.addEventListener('mousemove', this._tiltForMouse);
    }, duration * 1000)
  }

  async init() {
    isTouchDevice && window.addEventListener('deviceorientation', this._tiltForOrientation)
    window.addEventListener('pointermove', this._tiltForMouse)
    this.tilt(0, 0);
  }

  protected firstUpdated() {
    this.init();
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    isTouchDevice && window.removeEventListener('deviceorientation', this._tiltForOrientation);
    window.removeEventListener('pointermove', this._tiltForMouse);
  }

  render() {
    return html`
      <div class="tilt">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'div-tilt': Tilt
  }
}
