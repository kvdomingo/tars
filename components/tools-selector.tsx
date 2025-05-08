import { getToolKeysAction } from '@/lib/ai/tools/client';
import { cn } from '@/lib/utils';
import useStore from '@/stores/store';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Command, CommandItem, CommandList } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Switch } from './ui/switch';

interface ToolsSelectorProps {
  disabled?: boolean;
}

export default function ToolsSelector({
  disabled = false,
}: ToolsSelectorProps) {
  const { selectedTools, setSelectedTools } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [toolKeys, setToolKeys] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const keys = await getToolKeysAction();
      setToolKeys(keys);

      const newTools = new Set(selectedTools);
      if (keys.length > 0) {
        newTools.add(keys[0]);
      }
      setSelectedTools(newTools);
    })();
  }, []);

  function handleToggleSelection(key: string, isSelected: boolean) {
    const newSelectedTools = new Set(selectedTools);
    if (isSelected) {
      newSelectedTools.delete(key);
    } else {
      newSelectedTools.add(key);
    }
    setSelectedTools(newSelectedTools);
  }

  return (
    <div className="flex gap-4">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            aria-expanded={isOpen}
            className="cursor-pointer"
            disabled={disabled}
          >
            <Globe
              className={cn({
                'text-sidebar-primary': isOpen || selectedTools.size > 0,
              })}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[330px] p-0" align="start">
          <Command>
            <CommandList>
              {toolKeys.map((key) => {
                const isSelected = selectedTools.has(key);

                return (
                  <CommandItem
                    key={key}
                    value={key}
                    onSelect={() => handleToggleSelection(key, isSelected)}
                    className="flex cursor-pointer items-start justify-between p-4"
                    disabled={disabled}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex flex-col">
                        <div
                          className={cn('text-black', {
                            'text-primary': isSelected,
                          })}
                        >
                          {key}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={isSelected}
                      onCheckedChange={(checked) =>
                        handleToggleSelection(key, !checked)
                      }
                      className="cursor-pointer"
                    />
                  </CommandItem>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
