const EXCLUDED_TAGS_FOR_TEXT = ['img', 'html', 'head', 'meta', 'title', 'script', 'iframe', 'link', 'body', 'style'];
let stack = []

function getWrapper (el) {
  // const wrappers = ['div', 'section', 'main', 'article', 'ul']

  if (
    // wrappers.includes(el.tagName.toLowerCase()) &&
    el.children.length > 1
  ) {
    return el
  } else {
    return getWrapper(el.parentElement)
  }
}

function getTextNodesIn (elem) {
  var textNodes = [];
  if (elem) {
    for (var nodes = elem.childNodes, i = nodes.length; i--;) {
      var node = nodes[i], nodeType = node.nodeType;
      if (nodeType === 3) {
        if (
          !EXCLUDED_TAGS_FOR_TEXT.includes(node.parentNode.nodeName.toLowerCase()) &&
          node.data.replace(/^\s+/, '').replace(/\s+$/, '').replace(/(\r\n|\n|\r)/gm,"") !== ''
        ) {
          textNodes.push(node);
        }
      }
      else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        textNodes = textNodes.concat(getTextNodesIn(node))
      }
    }
  }
  return textNodes;
}

export function removeStyles (el) {
  if (el.dataset.oldStyles) {
    const { cursor, backgroundColor } = JSON.parse(el.dataset.oldStyles)
    el.style.backgroundColor = backgroundColor
    el.style.cursor = cursor
    delete el.dataset.oldStyles   
  }
}

export function addStyles (el, color) {
  const { cursor, backgroundColor } = getComputedStyle(el)
  el.dataset.oldStyles = JSON.stringify({ cursor, backgroundColor })
  el.style.backgroundColor = `rgba(${color}, .5)`
  el.style.cursor = 'pointer'
}

function isCrawlerElement (el) {
  const log = document.querySelector('.crawler--log')
  const modal = document.querySelector('.crawler--modal')

  if (log.contains(el)) {
    return true
  } else if (modal && modal.contains(el)) {
    return true
  }

  return false
}

function addButton (el, parent, color, setActive) {
  const btn = document.createElement('div')
  btn.classList.add('crawler--parent-btn')
  btn.style.cssText = `
  position: absolute;
  background-color: rgba(${color}, 1);
  border-radius: 3px 3px 0 0;
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: -30px;
  color: lightseagreen;
  font-size: 11px;
  padding: 3px;
  z-index: 9999 !important;
  `
  btn.innerHTML = `
  <svg enable-background="new 0 0 48 48" height="16px" viewBox="0 0 48 48" width="16px">
    <g>
      <path fill='lightseagreen' d="M24,0C10.745,0,0,10.746,0,24c0,13.255,10.745,24,24,24s24-10.744,24-24C48,10.746,37.255,0,24,0z    M24.029,43.844c-11.023,0-19.959-8.936-19.959-19.958S13.006,3.926,24.029,3.926c11.022,0,19.959,8.936,19.959,19.959   S35.052,43.844,24.029,43.844z"/>
      <path fill='lightseagreen' d="M32.56,21.902h-6.458l0.008-6.576c-0.026-0.454-0.221-1.354-1.331-1.356L23.2,13.968   c-1.181-0.001-1.282,1.165-1.288,1.47l-0.008,6.463h-6.607c-1.22,0-1.323,0.941-1.328,1.21v1.809   c0.006,0.247,0.107,1.178,1.328,1.178h6.602l-0.008,6.602c-0.002,1.219,0.939,1.324,1.209,1.33l1.809,0.002   c0.247-0.006,1.178-0.107,1.18-1.326l0.008-6.607h6.581c0.454-0.027,1.354-0.223,1.354-1.333v-1.578   C34.031,22.007,32.865,21.908,32.56,21.902z" />
    </g>
  </svg>
  <span style='margin-left: 10px;'>wrapper</span>
  `

  btn.addEventListener('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    setActive(parent)
  })

  parent.prepend(btn)
}

export function removeButton () {
  const btn = document.querySelectorAll('.crawler--parent-btn')

  if (btn) {
    for (let i = 0; i < btn.length; i++) {
      btn[i].remove()
    }
  }
}

function cleanStack () {
  removeButton()
  for (let i = 0; i < stack.length; i++) {
    removeStyles(stack[i].el)
    removeStyles(stack[i].parent)
  } 

  stack = []
}

const isParentInStack = el => stack && stack.length && stack.find(({ parent }) => parent === el)

function createHandlers (el, parent, node, setActive) {
  return {
    onClick: function (e) {
      if (e.target === el) {
        e.preventDefault()
        // e.stopPropagation()
        setActive(e.target)
      }
    },
    onMouseEnter: function (e) {      
      if (stack.length) {
        cleanStack()
      }

      addStyles(el, '165, 236, 215')
      addButton(el, parent, '232, 254, 193', setActive)
      addStyles(parent, '232, 254, 193')   
     
      stack.push({ el, parent })
    },
    onMouseLeave: function (e) {
      removeStyles(el)
    },
    onParentClick: function (e) {
      if (e.target === parent && isParentInStack(e.target)) {
        e.preventDefault()
        setActive(e.target)
      }
    },
    onParentLeave: function (e) {
      if (stack.length) {
        cleanStack()
        // removeStyles(e.target)
        // removeButton()
      }
    }    
  }
}

export function addTextExtractionListeners (setActive) {
  const nodes = getTextNodesIn(document.body)

  nodes.forEach(function (node) {
    const el = node.parentElement

    if (isCrawlerElement(el)) {
      return
    }

    const parent = getWrapper(el.parentElement)
    const {
      onParentLeave,
      onParentClick,
      onMouseEnter,
      onMouseLeave,
      onClick 
    } = createHandlers(el, parent, node, setActive)
    
    el.parentElement.addEventListener('click', onClick)
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    parent.addEventListener('mouseleave', onParentLeave)
    parent.addEventListener('click', onParentClick)
  })
}