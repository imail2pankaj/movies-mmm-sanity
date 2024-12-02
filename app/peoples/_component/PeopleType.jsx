"use client"
import * as React from "react"
import { Check, LucideIcon, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function PeopleType({
  title = "People Types",
  types,
}) {
  console.log(types)
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const selected = params.has("type") ? params.get("type").split(",").map(Number) : [];
 
  const [selectedValues, setSelectedValues] = React.useState(selected.length > 0 ? types.filter(x => selected.includes(x.id)) : []);

  React.useEffect(() => {
    if (selectedValues.length) {
      const param = []
      selectedValues.map(x => {
        param.push(x.id);
      })
      params.set("type", param.join(","))
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("type")
      replace(`${pathname}?${params.toString()}`);
    }
  }, [selectedValues, selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border">
          <PlusCircle className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.length > 0 && (
            <>
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  types
                    .filter((option) => selectedValues.find(x => option.id === x.id))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.id}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="h-40">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {types.map((option) => {
                const isSelected = selectedValues.find(x => option.id === x.id);

                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues(x => x.filter(s => s.id !== option.id))
                      } else {
                        setSelectedValues(x => [...x, ...(types.filter(t => t.id === option.id))])
                      }

                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
          {selectedValues.length > 0 && (
            <>
              {/* <CommandSeparator /> */}
              <CommandGroup>
                <CommandItem
                  onSelect={() => setSelectedValues([])}
                  className="justify-center text-center"
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
// https://codesandbox.io/p/devbox/vite-shadcn-boilerplate-6vpmrw?file=%2Fsrc%2Fcomponents%2FExampleTable%2Fcomponents%2Fdata-table.tsx%3A80%2C48