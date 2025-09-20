(function(r,s){typeof exports=="object"&&typeof module<"u"?s(exports,require("lit"),require("lit/decorators.js")):typeof define=="function"&&define.amd?define(["exports","lit","lit/decorators.js"],s):(r=typeof globalThis<"u"?globalThis:r||self,s(r.TiltWrapper={},r.lit,r.decorators_js))})(this,function(r,s,_){"use strict";var w=Object.getOwnPropertyDescriptor,p=e=>{throw TypeError(e)},y=(e,t,i,o)=>{for(var n=o>1?void 0:o?w(t,i):t,l=e.length-1,c;l>=0;l--)(c=e[l])&&(n=c(n)||n);return n},g=(e,t,i)=>t.has(e)||p("Cannot "+i),f=(e,t,i)=>t.has(e)?p("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),h=(e,t,i)=>(g(e,t,"access private method"),i),a,d;const u="ontouchstart"in window||navigator.maxTouchPoints>0;r.Tilt=class extends s.LitElement{constructor(){super(...arguments),f(this,a),this._tiltForOrientation=async t=>{let i=t.beta?t.beta/180:0,o=t.gamma?t.gamma/90:0;this.tilt(i,o,1)},this._tiltForMouse=async t=>{let i=(t.x-window.innerWidth/2)/window.innerWidth,o=(window.innerHeight/2-t.y)/window.innerHeight;this.tilt(o,i)}}tilt(t,i,o=1){let n=parseFloat(this.getPropertyValue("--tiltX")||"0"),l=parseFloat(this.getPropertyValue("--tiltY")||"0"),c=parseFloat(this.getPropertyValue("--tiltFactorY")||"0"),T=parseFloat(this.getPropertyValue("--tiltFactorX")||"0"),v=n+t*T*o,m=l+i*c*o;this.style.setProperty("--_tileX",v.toString()),this.style.setProperty("--_tileY",m.toString()),t&&i&&(h(this,a,d).call(this,"tilt:tilting",{x:v,y:m}),clearTimeout(this.tiltTimeout),this.tiltTimeout=setTimeout(()=>this._resetTilt(),3e3))}getPropertyValue(t){return getComputedStyle(this).getPropertyValue(t)||""}_resetTilt(){let t=2;window.removeEventListener("deviceorientation",this._tiltForOrientation),window.removeEventListener("mousemove",this._tiltForMouse),this.tilt(0,0),h(this,a,d).call(this,"tilt:reset"),clearTimeout(this.resetTimeout),this.resetTimeout=setTimeout(()=>{u&&window.addEventListener("deviceorientation",this._tiltForOrientation),window.addEventListener("mousemove",this._tiltForMouse),h(this,a,d).call(this,"tilt:after_reset")},t*1e3)}async init(){u&&window.addEventListener("deviceorientation",this._tiltForOrientation),window.addEventListener("pointermove",this._tiltForMouse),this.tilt(0,0)}firstUpdated(){this.init()}disconnectedCallback(){super.disconnectedCallback(),u&&window.removeEventListener("deviceorientation",this._tiltForOrientation),window.removeEventListener("pointermove",this._tiltForMouse)}render(){return s.html`
      <div class="tilt">
        <slot></slot>
      </div>
    `}},a=new WeakSet,d=function(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,cancelable:!0,detail:t}))},r.Tilt.styles=[s.css`
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
    `],r.Tilt=y([_.customElement("div-tilt")],r.Tilt),Object.defineProperty(r,Symbol.toStringTag,{value:"Module"})});
