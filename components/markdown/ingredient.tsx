import type { IngredientData } from '@/app/(chat)/api/mocks/ingredient/route';
import { cn, fetcher } from '@/lib/utils';
import { h } from 'hastscript';
import type { Root } from 'mdast';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import useSWR from 'swr';
import { visit } from 'unist-util-visit';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function remarkIngredient() {
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

      if (node.name !== 'ingredient') return;

      node.data ??= {};

      const data = node.data;
      const hast = h(node.name, node.attributes ?? {});

      data.hName = 'div';
      data.hProperties = {
        'data-id': hast.properties.id,
        'data-type': 'ingredient',
      };
    });
  };
}

export function HighlightedIngredient({
  children,
  className,
  properties,
}: PropsWithChildren & {
  className?: string;
  properties: Record<string, unknown>;
}) {
  const { data: ingredients = [] } = useSWR<IngredientData[]>(
    '/api/mocks/ingredient',
    fetcher,
  );

  const ingredient = ingredients.find(
    (ingredient) => ingredient.id === properties['data-id'],
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              'border border-sidebar-ring bg-sidebar-ring/30 font-mono text-base',
              {
                'cursor-pointer': !!ingredient,
              },
              className,
            )}
            {...properties}
          >
            {children}
          </Badge>
        </TooltipTrigger>
        {!!ingredient && (
          <TooltipContent className="flex w-[300px] flex-col gap-2 p-4">
            <div className="flex justify-between">
              <div>{ingredient.content.name}</div>
              <Badge variant="secondary" className="font-mono uppercase">
                {ingredient.type}
              </Badge>
            </div>

            <Separator />

            <div className="flex flex-col font-mono">
              <div className="flex justify-between">
                <div>
                  {Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(ingredient.content.search_metrics.volume)}
                </div>
                <div>Search Volume</div>
              </div>

              <div className="flex justify-between">
                <div
                  className={cn({
                    'text-green-500':
                      ingredient.content.search_metrics.yoy_change > 0,
                    'text-red-500':
                      ingredient.content.search_metrics.yoy_change < 0,
                  })}
                >
                  {ingredient.content.search_metrics.yoy_change > 0 && '+'}
                  {Intl.NumberFormat('en-US', {
                    notation: 'compact',
                    maximumFractionDigits: 1,
                  }).format(ingredient.content.search_metrics.yoy_change)}
                  %
                </div>
                <div>YoY Change</div>
              </div>
            </div>

            <Separator />

            {ingredient.content.description}

            <Separator />

            <div className="flex flex-col items-center gap-1">
              {ingredient.content.actions.map((a) => (
                <Link href={a.path} className="w-full">
                  <Button variant="outline" className="w-full rounded-full">
                    {a.button_text}
                  </Button>
                </Link>
              ))}
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
