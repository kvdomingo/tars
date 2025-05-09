import { h } from 'hastscript';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkCite() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        !(
          node.type === 'containerDirective' ||
          node.type === 'leafDirective' ||
          node.type === 'textDirective'
        )
      )
        return;

      if (node.name !== 'cite') return;

      node.data ??= {};

      const data = node.data;
      const hast = h(node.name, node.attributes ?? {});

      data.hName = 'cite';
      data.hProperties = {
        'data-url': hast.properties.url,
      };
    });
  };
}
