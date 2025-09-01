(function(e,n){typeof exports=="object"&&typeof module<"u"?n(exports,require("lit"),require("lit/decorators.js")):typeof define=="function"&&define.amd?define(["exports","lit","lit/decorators.js"],n):(e=typeof globalThis<"u"?globalThis:e||self,n(e.TiltWrapper={},e.lit,e.decorators_js))})(this,function(e,n,d){"use strict";var c=Object.defineProperty,u=Object.getOwnPropertyDescriptor,p=(l,t,r,i)=>{for(var o=i>1?void 0:i?u(t,r):t,s=l.length-1,a;s>=0;s--)(a=l[s])&&(o=(i?a(t,r,o):a(o))||o);return i&&o&&c(t,r,o),o};e.TiltWrapper=class extends n.LitElement{constructor(){super(...arguments),this.deviceOrientation=!0,this._tiltForOrientation=async t=>{let r=t.beta?t.beta/180:0,i=t.gamma?t.gamma/90:0;this._tilt(r,i,1)},this._tiltForMouse=async t=>{let r=(t.x-window.innerWidth/2)/window.innerWidth,i=(window.innerHeight/2-t.y)/window.innerHeight;this._tilt(i,r)}}_tilt(t,r,i=1){let o=t*i*parseFloat(getComputedStyle(this).getPropertyValue("--tiltFactorY")||"0"),s=r*i*parseFloat(getComputedStyle(this).getPropertyValue("--tiltFactorX")||"0");this.style.setProperty("--tileX",o.toString()),this.style.setProperty("--tileY",s.toString()),clearTimeout(this.tiltTimeout),this.tiltTimeout=setTimeout(()=>this._resetTilt(),3e3)}_resetTilt(){let t=2;window.DeviceOrientationEvent&&window.removeEventListener("deviceorientation",this._tiltForOrientation),window.removeEventListener("mousemove",this._tiltForMouse),this.style.setProperty("--tileX","0"),this.style.setProperty("--tileY","0"),setTimeout(()=>{window.addEventListener("deviceorientation",this._tiltForOrientation),window.addEventListener("mousemove",this._tiltForMouse)},t*1e3)}async init(){window.addEventListener("deviceorientation",this._tiltForOrientation),window.addEventListener("pointermove",this._tiltForMouse)}firstUpdated(){this.init()}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("deviceorientation",this._tiltForOrientation),window.removeEventListener("pointermove",this._tiltForMouse)}render(){return n.html`
      <div class="tilt">
        <slot></slot>
      </div>
    `}},e.TiltWrapper.styles=[n.css`
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
    `],p([d.property({type:Boolean,reflect:!0})],e.TiltWrapper.prototype,"deviceOrientation",2),e.TiltWrapper=p([d.customElement("tilt-wrapper")],e.TiltWrapper),Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
