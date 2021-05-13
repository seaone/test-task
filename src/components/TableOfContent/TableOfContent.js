import {useEffect, useState} from "react";
import {TableOfContentSkeletonPreloader} from "./TableOfContentSkeletonPreloader";
import {TableOfContentList} from "./TableOfContentList";
import styles from "./styles.module.css";

export const TableOfContent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        '/data/HelpTOC.json',
      );

      const data = await result.json()

      setData(data);
    }

    fetchData();
  }, []);

  const {topLevelIds, entities} = data ?? {};
  const {pages} = entities ?? {};
  const {anchors} = entities ?? {};

  const [activeTocItemId, setActiveTocItemId] = useState(null);

  const selectItem = (id) => {
    setActiveTocItemId(() => id);
  }

  return (
    <nav className={styles.toc}>
      {data != null ?
        <TableOfContentList
          ids={topLevelIds}
          allPages={pages}
          allAnchors={anchors}
          activeTocItemId={activeTocItemId}
          selectItem={selectItem}
        /> :
        <TableOfContentSkeletonPreloader/>
      }
    </nav>
  );
}

