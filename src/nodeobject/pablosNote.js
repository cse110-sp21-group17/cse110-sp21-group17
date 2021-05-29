// <note> custom web component
export default class pablosNote extends HTMLElement {
  constructor() {
    super();

    // templated HTML content
    const template = document.createElement('template');

    /*template.innerHTML = `
        <style>
            .entry {
                
            }
            .entry-title {
                
            }
            .entry-date {
                
            }
            .entry-comment {
                
            }
            .entry-weblink{
                
            }
            .entry-label{
                
            }
            .entry-image {
                
            }
            
        </style>
        <article class="entry">
            <h2 class="entry-title"></h2>
            <p class="entry-date"></p>
            <p class="entry-comment"></p>
        </article>
        `;
    */
    // create a shadow root for this web component
    this.attachShadow({ mode: 'open' })
    // attach cloned content of template to shadow DOM 
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  get entry() {
    return this.getAttribute('entry');
  }
  //Create a node
  set entry(entry) {
    var thisNode = this.shadowRoot;
    thisNode.querySelector('.entry-title').innerHTML = entry.title;
    thisNode.querySelector('.entry-date').innerHTML = entry.date;
    thisNode.querySelector('.entry-comment').innerHTML = entry.comment;
    thisNode.querySelector('.entry-weblink').innerHTML = entry.weblink;
    thisNode.querySelector('.entry-label').innerHTML = entry.label;
    thisNode.querySelector('.entry-priority').innerHTML = entry.priority;
  }

  //Updating attributes within node
  set title(newTitle) {
    thisNode.querySelector('.entry-title').innerHTML = newTitle;
  }
  set date(newDate) {
    thisNode.querySelector('.entry-date').innerHTML = newDate;
  }
  set comment(newComment) {
    thisNode.querySelector('.entry-comment').innerHTML = newComment;
  }
  set weblink(newWeblink) {
    thisNode.querySelector('.entry-weblink').innerHTML = newWeblink;
  }
  set label(newLabel) {
    thisNode.querySelector('.entry-label').innerHTML = newLabel;
  }
  set priority(newPriority) {
    thisNode.querySelector('.entry-priority').innerHTML = newPriority;
  }
}

//delete (node) should delete the node

customElements.define('note', Note);

/**
 * JSON Format:
 *
 * {
 *   title: 'foo',
 *   date: 'foo',
 *   comment: 'foo',
 *   weblink: 'foo',
 *   label: 'foo',
 *   priority: 'foo',
 *   image: {
 *     src: 'foo.com/bar.jpg',
 *     alt: 'foo'
 *   },
 * }
 */
