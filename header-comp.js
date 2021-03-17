class HeaderComp extends HTMLElement{static get observedAttributes(){return["completedcycles","isnewcycle"]}constructor(){super(),this.attachShadow({mode:"open"})}set completedCycles(a){this.setAttribute("completedcycles",a)}set isNewCycle(a){this.setAttribute("isnewcycle",a)}get completedCycles(){return this.getAttribute("completedcycles")}get isNewCycle(){return this.getAttribute("isnewcycle")}connectedCallback(){this.completedCycles=null===localStorage.getItem("sessionCounter")?0:localStorage.getItem("sessionCounter"),this.isNewCycle=0==this.completedCycles%4?"true":"false";const a=document.createElement("nav");a.setAttribute("class","top-nav");const b=document.createElement("h2");b.setAttribute("id","date"),b.innerText=HeaderComp.createDate()?HeaderComp.createDate():`Today's date`;const c=document.createElement("section");c.setAttribute("id","cycle-count"),c.innerHTML=`      
    <span>
      <h2 id="completed-cycle" style="display: inline; color: #c4c4c4">
      </h2>
    </span>`,a.appendChild(b),a.appendChild(c),this.shadowRoot.innerHTML=HeaderComp.headerStyle(),this.shadowRoot.appendChild(a),this.renderCounter(),this.renderCompletedCount()}attributeChangedCallback(a,b,c){if("completedcycles"===a){const a=this.shadowRoot.querySelector("section");a&&(a.innerHTML=`      
        <span>
          <h2 id="completed-cycle" style="display: inline; color: #c4c4c4">
          </h2>
        </span>`,this.renderCounter(),this.renderCompletedCount())}if("isnewcycle"===a&&"true"===c){const a=this.shadowRoot.querySelector("section");a&&(a.innerHTML=`      
          <span>
            <h2 id="completed-cycle" style="display: inline; color: #c4c4c4">
            </h2>
          </span>`,this.renderCounter(),this.renderCompletedCount())}}renderCounter(){if("0"===this.completedCycles||"true"===this.isNewCycle)for(let a=0;4>a;a++){const a=document.createElement("span");a.setAttribute("class","dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}else if(0!=this.completedCycles%4)for(let a=0;a<4-this.completedCycles%4;a++){const a=document.createElement("span");a.setAttribute("class","dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}}renderCompletedCount(){if(0==this.completedCycles%4&&"0"!==this.completedCycles&&"false"===this.isNewCycle)for(let a=0;4>a;a++){const a=document.createElement("span");a.setAttribute("class","filled-dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}else for(let a=0;a<this.completedCycles%4;a++){const a=document.createElement("span");a.setAttribute("class","filled-dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}}static headerStyle(){return`<style>
      .dot {
        height: 10px;
        width: 10px;
        padding: 10px;
        margin-right: 5px;
        background-color: #e5e5e5;
        border-radius: 77%;
        border: 2px solid #ef7869;
        display: inline-block;
      }
      
      .filled-dot {
        height: 10px;
        width: 10px;
        padding: 10px;
        margin-right: 5px;
        background-color: #f2998e;
        border-radius: 77%;
        border: 2px solid #ef7869;
        display: inline-block;
      }
      
      .top-nav {
        background: #2e4756;
        margin: 0;
        padding-top: 1%;
        padding-left: 50px;
        padding-bottom: 5px;
        width: 100%;
        color: #e5e5e5;
        font-size: 24px;
      }
      
      h2 {
        margin-top: 0;
        display: inline; 
        color:#C4C4C4;
        font-size: 1.5em;
        text-align: left;
        font-weight: bold;
        font-family: "Poppins", sans-serif;
      }
      
      </style>`}static createDate(){const a=new Date;return a.toLocaleDateString("en-us",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}}customElements.define("header-comp",HeaderComp),"undefined"!=typeof exports&&(module.exports={HeaderComp});