import { Task, Note, Event } from "../classes/entry_classes.js";

// <record-node> custom web component
class RecordNode extends HTMLElement {
    constructor() {
        super();
        
        const template = document.createElement('template');
        
        template.innerHTML = `
          <style>
              .node {
                  background-color: rgb(202, 235, 204);
                  list-style-type: none;
                  width: 100%;
                  transition-duration: .4s;
                  margin-bottom:20px;
              }
 
            .gridbox {
                display: flex;
                flex-direction: row;
                
            }

            .gridbox * {
                display: block;
                margin: -5px 0px;
            }

            .gridbox .cycle {
                margin-left:20px;
                margin-right:5px;
            }

            
              .node-content {
                  font-size: 15px;
              }

              .node-sep {
                width:100%;
                text-align:left;
                margin-left:0; 
                border-color: gray;
                height:0; 
                border:0; 
                border-top:1px solid gray; 
              }

  
              .node-date {
                color: black;
                margin-bottom: 5px;
                margin-top: 5px;
                margin-left: 5px;
              }
              
              .node-image {
                  height: 30%;
                  max-height: 40%;
                  max-width: 300px;
                  margin-left: 5px;
              }
  
              .node-title {
                color: rgb(23, 13, 63);
                font-size: 15px;
                margin-left: 5px;
              }

              .subnode-title {
                color: black;
                font-size: 14px;
                margin-left: 5px;
              }

              .task-title {
                color: rgb(23, 13, 63);
                font-size: 14px;
                margin-left: 5px;
              }

              li.note::marker {
                  content: "- ";
              }

              li.task-inc::marker {
                  content: "⊙ ";
              }

              li.subtask-inc::marker {
                  content: "⊡ ";
              }

              li.event-inc::marker {
                  content: "◆ ";
              }


          </style>
          <article class="node">
              <h2 class="node-date"></h2>
              <ul class=""></ul>
          </article>
          `;
        
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    get node() {}
    
    // Just like the entry-page  Update the node by the node-list ----- on router.js file's  "gotoPage" function state "mainPage"
    set node(node) {
        this.shadowRoot.querySelector('.node-date').innerText = node.date;
        for (let entry of node.entries) {
            if (entry instanceof Note) {
                // handle like note
                let li = document.createElement("li");
                li.className = "note";
                li.innerText = entry.description;
                this.shadowRoot.querySelector("ul").appendChild(li);
            } else if (entry instanceof Event) {
                // handle like note
                let li = document.createElement("li");
                // TODO: event completeness
                li.className = "event-inc";
                li.innerText = entry.description;
                this.shadowRoot.querySelector("ul").appendChild(li);
            } else {
                // it's a task.
                // create the task itself first
                let li = document.createElement("li");
                // TODO: task completeness
                li.className = "task-inc";
                li.innerText = entry.t.description;
                this.shadowRoot.querySelector("ul").appendChild(li);

                // then add the children
                for (st of entry.sts) {
                    let li = document.createElement("li");
                    // TODO: task completeness
                    li.className = "subtask-inc";
                    li.innerText = entry.t.description;
                    this.shadowRoot.querySelector("ul").appendChild(li);
                }
            }
        }

        if (node.image) {
            let nodeImage = document.createElement('img');
            nodeImage.classList.add('node-image');
            nodeImage.src = node.image.src;
            nodeImage.alt = node.image.alt;
            this.shadowRoot.querySelector('.node').appendChild(nodeImage);
        }
        let sep = document.createElement('hr');
        sep.classList.add('node-sep');
        this.shadowRoot.querySelector('.node').appendChild(sep);

    }
    
}

customElements.define('record-node', RecordNode);
