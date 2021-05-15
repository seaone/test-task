import {useEffect, useState} from "react";
import {getEntityIds} from "./utils";
import {TableOfContentContext} from "./TableOfContentContext"
import {TableOfContentEmptyState} from "./TableOfContentEmptyState";
import {TableOfContentList} from "./TableOfContentList";
import {TableOfContentSearch} from "./TableOfContentSearch";
import {TableOfContentSkeletonPreloader} from "./TableOfContentSkeletonPreloader";
import styles from "./styles/styles.module.css";

export const TableOfContent = ({tocData = null, activeItemId}) => {
  const [activeTocEntityId, setActiveTocEntityId] = useState(activeItemId);
  const [filteredIds, setFilteredIds] = useState([]);
  const [loadingSearchResult, setLoadingSearchResult] = useState(true);
  const {topLevelIds = []} = tocData ?? {};
  const entityIds = getEntityIds(topLevelIds, filteredIds);
  const isPreloaderVisible = tocData == null || loadingSearchResult;
  const isEmptyStateVisible = !isPreloaderVisible && entityIds.length === 0;
  const isTableOfContentVisible = !isPreloaderVisible && !isEmptyStateVisible;

  useEffect(() => {
    setActiveTocEntityId(() => activeItemId);
  }, [activeItemId]);

  const onEntitySearch = (searchData) => {
    const {searchResult, isSearchComplete} = searchData;

    setLoadingSearchResult(!isSearchComplete);
    setFilteredIds(searchResult);
  }

  const onSelectItem = (id) => {
    setActiveTocEntityId(() => id);
  }

  return (
    <TableOfContentContext.Provider value={tocData}>
      <nav className={styles.toc}>
        <TableOfContentSearch
          onSearch={onEntitySearch}
        />

        {isPreloaderVisible &&
          <TableOfContentSkeletonPreloader/>
        }

        {isEmptyStateVisible &&
          <TableOfContentEmptyState />
        }

        {isTableOfContentVisible &&
          <TableOfContentList
            isVisible={true}
            ids={entityIds}
            filteredIds={filteredIds}
            activeTocEntityId={activeTocEntityId}
            onSelectItem={onSelectItem}
          />
        }
      </nav>
    </TableOfContentContext.Provider>
  );
}

