import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {getAncestorIds} from "./utils/";
import {TableOfContentContext} from "./TableOfContentContext";
import {TableOfContentList} from "./TableOfContentList";
import {ReactComponent as IconArrow} from "./svg/icon_arrow.svg"
import styles from "./styles/styles.module.css";

export const TableOfContentEntity = ({tocEntityData = null, activeTocEntityId = null, filteredIds = [], onSelectItem = () => {}}) => {
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
  const activeTocEntityAncestorIds = getAncestorIds(activeTocEntityId, entities);

  useEffect(() => {
    const isFiltered = filteredIds.length > 0 && !filteredIds.includes(id);
    setIsFiltered(isFiltered);
  }, [filteredIds, id]);

  useEffect(() => {
    if (activeTocEntityAncestorIds.length > 0) {
      activeTocEntityAncestorIds.forEach((itemId) => {
        if (itemId === id && hasChildren) {
          setIsExpanded(true);
        }
      });
    }
    // eslint-disable-next-line
  }, [activeTocEntityId]);

  const hasActiveAnchors = () => {
    const parentId = entities['anchors'][activeTocEntityId]?.parentId;

    return parentId === id;
  }

  const hasActivePages = () => {
    const parentId = entities['pages'][activeTocEntityId]?.parentId;

    return parentId === id;
  }

  const hasActiveChildren = hasActiveAnchors() || hasActivePages();

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

  const onSelectTocItem = (event) => {
    if (event.target.closest('button')) {
      event.preventDefault();
      setIsExpanded(isExpanded => !isExpanded);
    } else {
      onSelectItem(id);
      if (hasChildren && !hasActiveChildren) {
        setIsExpanded(isExpanded => !isExpanded);
      }
    }
  }

  return (
    <li className={tocEntityClass}>
      <Link
        style={tocLinkStyles}
        to={entityUrl}
        className={tocLinkClass}
        onClick={onSelectTocItem}
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
        isVisible={isExpanded}
        ids={childIds}
        activeTocEntityId={activeTocEntityId}
        filteredIds={filteredIds}
        onSelectItem={onSelectItem}
      />
    </li>
  );
}
