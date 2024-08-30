import * as React from "react";
import { useCallback, useEffect, useRef } from "react";
import {
  type ContextMenuComponentProps,
  type ContextMenuItem,
} from "react-datasheet-grid";

const customRenderItem = (item: ContextMenuItem) => {
  switch (item.type) {
    case "CUT":
      return <>Wytnij</>;
    case "COPY":
      return <>Kopiuj</>;
    case "PASTE":
      return <>Wklej</>;
    case "DELETE_ROW":
      return <>Usuń wiersz</>;
    case "INSERT_ROW_BELLOW":
      return <>Wstaw wiersz poniżej</>;
    case "MERGE_CELLS":
      return <>Scal komórki</>;
    default:
      return <>{item.type}</>;
  }
};

function CustomContextMenu({
  clientX,
  clientY,
  items,
  close,
}: ContextMenuComponentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      className="custom-context-menu"
      style={{ left: clientX + "px", top: clientY + "px" }}
      ref={containerRef}
    >
      {items.map((item) => (
        <div
          key={item.type}
          onClick={item.action}
          className="custom-context-menu-item"
        >
          {customRenderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default CustomContextMenu;
