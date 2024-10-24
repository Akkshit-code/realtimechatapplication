// command.jsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Command as CommandPrimitive } from "cmdk";
import { Command as CommandBase } from "@/components/ui/command";
import { X } from "lucide-react";

// Change to named export to match the import
export const Command = ({ 
  column = { selectedItems: [] },
  command = [],
  inputValue = "", 
  onInputChange, 
  onItemSelect, 
  onRemove 
}) => {
  const selectedItems = column?.selectedItems || [];

  return (
    <CommandBase className="rounded-lg border shadow-md">
      <div className="flex items-center border-b px-3">
        <CommandPrimitive.Input
          value={inputValue}
          onValueChange={onInputChange}
          className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Select items..."
        />
      </div>
      <div className="flex flex-wrap gap-1 p-2">
        {selectedItems.map((item) => (
          <Badge key={item.value} variant="secondary" className="hover:bg-secondary">
            {item.label}
            <button
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRemove(item);
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={() => onRemove(item)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex flex-col">
        <CommandPrimitive.List>
          <CommandPrimitive.Empty className="py-6 text-center text-sm">
            No items found.
          </CommandPrimitive.Empty>
          {command.map((item) => (
            <CommandPrimitive.Item
              key={item.value}
              value={item.value}
              onSelect={() => onItemSelect(item)}
              className="flex cursor-pointer items-center px-4 py-2 text-sm hover:bg-accent"
            >
              {item.label}
            </CommandPrimitive.Item>
          ))}
        </CommandPrimitive.List>
      </div>
    </CommandBase>
  );
};

