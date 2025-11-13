import { visit } from 'unist-util-visit';

/**
 * Remark plugin to convert Obsidian-style wikilinks to regular markdown links
 * Converts [[Page]] to [Page](/notes/page)
 * Converts [[Page|Display Text]] to [Display Text](/notes/page)
 */
export function remarkWikilinks() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value || typeof node.value !== 'string') return;
      
      const wikilinkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
      
      if (!wikilinkRegex.test(node.value)) return;
      
      // Reset regex
      wikilinkRegex.lastIndex = 0;
      
      const newNodes = [];
      let lastIndex = 0;
      let match;
      
      while ((match = wikilinkRegex.exec(node.value)) !== null) {
        const [fullMatch, link, displayText] = match;
        const startIndex = match.index;
        
        // Add text before the wikilink
        if (startIndex > lastIndex) {
          newNodes.push({
            type: 'text',
            value: node.value.slice(lastIndex, startIndex)
          });
        }
        
        // Convert wikilink to regular link
        const slug = link.toLowerCase()
          .replace(/\s+/g, '-')           // spaces to hyphens
          .replace(/[^a-z0-9-]/g, '');    // remove special chars
        
        const text = displayText || link;
        const url = `/notes/${slug}`;
        
        // Create link node
        newNodes.push({
          type: 'link',
          url: url,
          children: [{ type: 'text', value: text }]
        });
        
        lastIndex = startIndex + fullMatch.length;
      }
      
      // Add remaining text
      if (lastIndex < node.value.length) {
        newNodes.push({
          type: 'text',
          value: node.value.slice(lastIndex)
        });
      }
      
      // Replace the text node with new nodes
      if (newNodes.length > 0 && parent && typeof index === 'number') {
        parent.children.splice(index, 1, ...newNodes);
        return index + newNodes.length;
      }
    });
  };
}

