import {useEffect, useState} from "react";
import TocSkeletonPreloader from "./TocSkeletonPreloader";
import TocList from "./TocList";
import styles from "./styles.module.css";

const Toc = () => {
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

  const [activeTocItemId, setActiveTocItemId] = useState(null);

  const selectItem = (id) => {
    setActiveTocItemId(() => id);
  }

  return (
    <nav className={styles.toc}>
      {data != null ?
        <TocList
          ids={topLevelIds}
          allPages={pages}
          activeTocItemId={activeTocItemId}
          selectItem={selectItem}
        /> :
        <TocSkeletonPreloader/>
      }
    </nav>
  );
}

export default Toc;
