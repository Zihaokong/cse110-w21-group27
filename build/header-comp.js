class HeaderComp extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}get completedCycles(){return this.completed}get cycleCount(){return this.count}connectedCallback(){this.completed=localStorage.getItem("sessionCounter"),this.count=4-this.completed%4;const a=document.createElement("nav");a.setAttribute("class","top-nav");const b=document.createElement("h2");b.setAttribute("id","date"),b.innerText=HeaderComp.createDate()?HeaderComp.createDate():`Today's date`;const c=document.createElement("section");c.setAttribute("id","cycle-count"),c.innerHTML=`      
    <span>
      <h2 id="completed-cycle" style="display: inline; color: #c4c4c4">
        | Not yet completed
      </h2>
    </span>`,a.appendChild(b),a.appendChild(c),this.shadowRoot.innerHTML=HeaderComp.headerStyle(),this.shadowRoot.appendChild(a),this.renderCounter(),this.renderCompletedCount(),this.renderText()}renderCounter(){const a=this.shadowRoot;if("0"===this.completedCycles)for(let b=0;4>b;b++){const b=document.createElement("span");b.setAttribute("class","dot"),a.getElementById("cycle-count").prepend(b)}else if(0!=this.completedCycles%4)for(let b=0;b<this.cycleCount;b++){const b=document.createElement("span");b.setAttribute("class","dot"),a.getElementById("cycle-count").prepend(b)}}renderCompletedCount(){if(0==this.completedCycles%4&&"0"!==this.completedCycles)for(let a=0;4>a;a++){const a=document.createElement("span");a.setAttribute("class","filled-dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}else for(let a=0;a<this.completedCycles%4;a++){const a=document.createElement("span");a.setAttribute("class","filled-dot"),this.shadowRoot.getElementById("cycle-count").prepend(a)}}renderText(){const a=this.shadowRoot.getElementById("completed-cycle");a.innerText=`| Completed Cycles: ${this.completedCycles}`}static headerStyle(){return`<style>
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