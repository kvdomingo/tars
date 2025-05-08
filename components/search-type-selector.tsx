'use client';

import { cn } from '@/lib/utils';
import useStore from '@/stores/store';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface SearchTypeSelectorProps {
  disabled?: boolean;
}

export default function SearchTypeSelector({
  disabled = false,
}: SearchTypeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isReasoning, setIsReasoning } = useStore();

  return (
    <div className="flex gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpen}
            className="cursor-pointer"
            disabled={disabled}
          >
            {isReasoning ? 'Reasoning' : 'Default'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[330px] p-0" align="start">
          <Command>
            <CommandList>
              <CommandItem
                value="false"
                onSelect={() => setIsReasoning(false)}
                className="flex cursor-pointer items-start justify-between p-4"
              >
                <div className="flex items-start gap-2">
                  <div className="flex flex-col">
                    <div
                      className={cn('font-medium', {
                        'text-sidebar-primary': !isReasoning,
                      })}
                    >
                      Default
                    </div>
                  </div>
                </div>
                {!isReasoning && (
                  <Check
                    className={cn({
                      'text-sidebar-primary': !isReasoning,
                    })}
                  />
                )}
              </CommandItem>
              <CommandItem
                value="true"
                onSelect={() => setIsReasoning(true)}
                className="flex cursor-pointer items-start justify-between p-4"
              >
                <div className="flex items-start gap-2">
                  <div className="flex flex-col">
                    <div
                      className={cn('font-medium', {
                        'text-sidebar-primary': isReasoning,
                      })}
                    >
                      Reasoning
                    </div>
                  </div>
                </div>
                {isReasoning && (
                  <Check
                    className={cn({
                      'text-sidebar-primary': isReasoning,
                    })}
                  />
                )}
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
