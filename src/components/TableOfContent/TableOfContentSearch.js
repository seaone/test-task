import {useContext, useState, useEffect} from "react";
import {getAncestorIds, useDebounceSearch} from "./utils";
import {TableOfContentContext} from "./TableOfContentContext";
import styles from "./styles/styles.module.css";

export const TableOfContentSearch = ({onSearch = () => {}}) => {
  const [query, setQuery] = useState('');
  const tocData = useContext(TableOfContentContext);
  const [queryString, isCompleted] = useDebounceSearch(query, 500);

  useEffect(() => {
    const searchData = () => {
      onSearch({
        'searchResult': filterEntityIdsByQuery(queryString, tocData),
        'isSearchComplete': isCompleted,
      })
    }

    searchData();
    // eslint-disable-next-line
  }, [queryString, isCompleted]);

  const onChange = (event) => {
    setQuery(event.target.value);
  }

  return (
    <div className={styles.tocSearch}>
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="Search"
        className={styles.tocSearchInput}
      />
    </div>
  )
}

const filterEntityIdsByQuery = (query, data) => {
  const trimmedQuery = query.trim();

  if (data == null || trimmedQuery === '') {
    return [];
  }

  const {entities} = data ?? {};
  const {pages, anchors} = entities ?? {};

  const filteredPages = Object.values(pages).filter((entity) => {
    return entity['title'].toLowerCase().includes(trimmedQuery.toLowerCase());
  });

  const filteredAnchors = Object.values(anchors).filter((entity) => {
    return entity['title'].toLowerCase().includes(trimmedQuery.toLowerCase());
  });

  const filteredEntities = [...filteredPages, ...filteredAnchors];

  return filteredEntities.length > 0 ?
    Array.from(new Set(
      filteredEntities.map((entity) => getAncestorIds(entity['id'], entities)).flat()
    )) : null;
}