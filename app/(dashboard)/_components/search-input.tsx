import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";

export const SearchInput = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>();
  const [debouncedValue, setDebouncedValue] = useDebounceValue(
    searchValue,
    500
  );
  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDebouncedValue(event.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-10"
        placeholder="Search Boards"
        onChange={inputOnChange}
        value={searchValue}
      />
    </div>
  );
};
