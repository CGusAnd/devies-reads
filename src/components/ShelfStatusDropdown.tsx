import { ShelfStatus } from "@/enums/shelfStatus";
import { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "react-bootstrap";

export function ShelfStatusDropdown({
  value,
  onChange
}: {
  value: ShelfStatus | null;
  onChange: Function;
}) {
  const [label, setLabel] = useState(getLabel(value));

  function handleClick(newValue: ShelfStatus) {
    setLabel(getLabel(newValue));
    onChange(newValue);
  }

  return (
    <Dropdown>
      <DropdownToggle id="shelf-status-dropdown">{label}</DropdownToggle>

      <DropdownMenu>
        <DropdownItem onClick={() => handleClick(ShelfStatus.Read)}>
          Has read
        </DropdownItem>
        <DropdownItem onClick={() => handleClick(ShelfStatus.Reading)}>
          Currently reading
        </DropdownItem>
        <DropdownItem onClick={() => handleClick(ShelfStatus.WantToRead)}>
          Want to read
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

function getLabel(val: ShelfStatus | null) {
  if (!val) return "Set state";
  else {
    switch (val) {
      case ShelfStatus.Read:
        return "Read";
      case ShelfStatus.Reading:
        return "Currently reading";
      case ShelfStatus.WantToRead:
        return "Want to read";
    }
  }
}
