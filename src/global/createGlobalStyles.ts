interface GlobalStylesOptions {
  backgroundColor?: string
}

export function createGlobalStyles({ backgroundColor }: GlobalStylesOptions) {
  /**
   * Create a `style` tag.
   * Set some default styles based on the user's `Options`.
   * Attach the `style` element to the document head.
   */
  const style = document.createElement('style')
  style.innerHTML = `
    body {
      margin: 0;
      overflow: hidden;
    }

    #canvas {
      background: ${backgroundColor || 'white'};
    }
  `
  document.head.appendChild(style)
}
