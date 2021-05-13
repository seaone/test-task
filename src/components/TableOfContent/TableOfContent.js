import {useState} from "react";
import {TableOfContentContext} from "./TableOfContentContext"
import {TableOfContentSkeletonPreloader} from "./TableOfContentSkeletonPreloader";
import {TableOfContentList} from "./TableOfContentList";
import styles from "./styles.module.css";

export const TableOfContent = ({tocData = null}) => {
  const {topLevelIds} = tocData ?? {};
  const [activeTocItemId, setActiveTocItemId] = useState(null);

  const onSelectItem = (id) => {
    setActiveTocItemId(() => id);
  }

  return (
    <nav className={styles.toc}>
      {tocData != null ?
        <TableOfContentContext.Provider value={tocData}>
          <TableOfContentList
            ids={topLevelIds}
            activeTocItemId={activeTocItemId}
            onSelectItem={onSelectItem}
          />
        </TableOfContentContext.Provider> :
        <TableOfContentSkeletonPreloader/>
      }
    </nav>
  );
}

