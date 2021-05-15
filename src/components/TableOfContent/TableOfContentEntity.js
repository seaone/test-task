import {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {TableOfContentContext} from "./TableOfContentContext";
import {TableOfContentList} from "./TableOfContentList";
import {getAncestorIds, getEntityById} from "./utils/";
import { ReactComponent as IconArrow } from "./svg/icon_arrow.svg"
import styles from "./styles/styles.module.css";

export const TableOfContentEntity = ({tocEntityData, activeTocEntityId = null, filteredIds = [], onSelectItem = () => {}}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const tocData = useContext(TableOfContentContext);
  const {entities} = tocData ?? {};
  const {id, title, level, parentId, url = '', anchor = '', pages = [], anchors = []} = tocEntityData;
  const entityUrl = url + anchor;
  const isAnchor = entities['anchors'][id] !== undefined;
  const childIds = [...anchors, ...pages];
  const hasChildPages = pages.length > 0;
  const hasAnchors = anchors.length > 0;
  const hasChildren = hasChildPages || hasAnchors;
  const activeTocEntityParentId = getActiveTocEntityParentId(activeTocEntityId, entities);
  const activeTocEntityAncestorIds = getAncestorIds(activeTocEntityParentId, entities);

  useEffect(() => {
    if (filteredIds.length > 0 && !filteredIds.includes(id)) {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [filteredIds, id]);

  useEffect(() => {
    activeTocEntityAncestorIds.forEach((itemId) => {
      if (itemId === id && hasChildren) {
        setIsExpanded(true);
      }
    });
  }, [activeTocEntityAncestorIds, hasChildren, id]);

  const hasActiveAnchors = () => {
    const parentId = entities['anchors'][activeTocEntityId]?.parentId;

    return parentId === id;
  }

  const getPaddingLeft = () => {
    const basePaddingLeft = 32;
    const indentSize = 16;
    let indent = basePaddingLeft + (level * indentSize);

    if (isAnchor) {
      const parentPageLevel = entities['pages'][parentId]['level'];
      indent = indent + (parentPageLevel * indentSize);
    }

    return indent;
  }

  const tocLinkStyles = {
    paddingLeft: `${getPaddingLeft()}px`,
  }

  const tocEntityClass = classNames(styles.tocEntity, {
    [styles.tocEntityAnchor]: isAnchor,
    [styles.tocEntityPage]: !isAnchor,
    [styles.tocEntityActive]: (hasActiveAnchors() && isExpanded) || (hasAnchors && isExpanded && activeTocEntityId === id),
  });

  const tocEntityExpandButtonClass = classNames(styles.tocEntityExpandButton, {
    [styles.tocEntityExpandButtonActive]: isExpanded,
  });

  const tocLinkClass = classNames(styles.tocLink, {
    [styles.tocLinkSelected]: activeTocEntityId === id,
    [styles.tocLinkFiltered]: isFiltered,
  });

  const selectTocItem = (event) => {
    if (event.target.closest('button')) {
      event.preventDefault();
    } else {
      onSelectItem(id);
    }

    if (hasChildren) {
      setIsExpanded(isExpanded => !isExpanded);
    }
  }

  return (
    <li className={tocEntityClass}>
      <Link
        style={tocLinkStyles}
        to={entityUrl}
        className={tocLinkClass}
        onClick={selectTocItem}
      >
        {hasChildPages &&
          <button
            type="button"
            className={tocEntityExpandButtonClass}
          >
            <IconArrow
              className={styles.tocEntityExpandButtonSVG}
            />
          </button>
        }

        <span className={styles.tocEntityTitle}>
          {title}
        </span>
      </Link>

      <TableOfContentList
        isVisible={hasChildren && isExpanded}
        ids={childIds}
        activeTocEntityId={activeTocEntityId}
        filteredIds={filteredIds}
        onSelectItem={onSelectItem}
      />
    </li>
  );
}

const getActiveTocEntityParentId = (activeTocEntityId, entities) => {
  return activeTocEntityId != null ? getEntityById(activeTocEntityId, entities)['parentId'] : null;
}