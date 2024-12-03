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

export default function Genres({
  title = "Genres",
  genres,
}) {

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const selected = params.has("genres") ? params.get("genres").split(",").map(Number) : [];
 
  const [selectedValues, setSelectedValues] = React.useState(selected.length > 0 ? genres.filter(x => selected.includes(Number(x.id))) : []);

  React.useEffect(() => {
    if (selectedValues.length) {
      const param = []
      selectedValues.map(x => {
        param.push(x.id);
      })
      params.set("genres", param.join(","))
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.delete("genres")
      replace(`${pathname}?${params.toString()}`);
    }
  }, [selectedValues, selected]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-solid">
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
                  genres
                    .filter((option) => selectedValues.find(x => Number(option.id) === Number(x.id)))
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
              {genres.map((option) => {
                const isSelected = selectedValues.find(x => option.id === x.id);

                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {

                      if (isSelected) {
                        setSelectedValues(x => x.filter(s => s.id !== option.id))
                      } else {
                        setSelectedValues(x => [...x, ...(genres.filter(t => t.id === option.id ))])
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