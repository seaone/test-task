import {useState, useContext} from "react";
import {Link} from "react-router-dom";
import classNames from "classnames";
import {TableOfContentContext} from "./TableOfContentContext";
import {TableOfContentList} from "./TableOfContentList";
import styles from "./styles.module.css";

export const TableOfContentItem = ({tocItemData, activeTocItemId = null, onSelectItem = () => {}}) => {
  const {id, title, level, parentId, url = '', anchor = '', pages = [], anchors = []} = tocItemData;
  const isAnchor = anchor !== ''; // is not robust solution, try to find a better one
  const hasChildPages = pages.length > 0;
  const hasAnchors = anchors.length > 0;
  const ids = [...anchors, ...pages];
  const tocData = useContext(TableOfContentContext);
  const {entities} = tocData ?? {};
  const [isExpanded, setIsExpanded] = useState(false);

  const getPaddingLeft = () => {
    const basePaddingLeft = 32;
    const indentSize = 16;
    let indent = basePaddingLeft + (level * indentSize);

    if (isAnchor) {
      const parentPageLevel = entities['pages'][parentId]['level'];
      indent = indent + (parentPageLevel * indentSize)
    }

    return indent;
  }

  const getUrl = () => {
    return url + anchor;
  }

  const tocLinkStyles = {
    paddingLeft: `${getPaddingLeft()}px`
  }

  const hasActiveAnchors = () => {
    const parentId = entities['anchors'][activeTocItemId]?.parentId;
    return parentId === id;
  }

  const tocItemClass = classNames(styles.tocItem, {
    [styles.tocItemAnchor]: isAnchor,
    [styles.tocItemPage]: !isAnchor,
    [styles.tocItemActive]: hasActiveAnchors() || (hasAnchors && isExpanded && activeTocItemId === id)
  });

  const tocItemExpandIconClass = classNames(styles.tocItemIcon, {
    [styles.tocItemIconExpanded]: isExpanded
  });

  const tocLinkClass = classNames(styles.tocLink, {
    [styles.tocLinkSelected]: activeTocItemId === id
  });

  const selectTocItem = (event) => {
    if (hasChildPages || hasAnchors) {
      setIsExpanded((isExpanded) => !isExpanded);
    }

    onSelectItem(id);
  }

  return (
    <li className={tocItemClass}>
      <Link
        style={tocLinkStyles}
        to={getUrl()}
        className={tocLinkClass}
        onClick={selectTocItem}
      >
        {hasChildPages &&
        <svg
          viewBox="-5 -3 24 24"
          fill="currentColor"
          className={tocItemExpandIconClass}
        >
          <path d="M11 9l-6 5.25V3.75z"></path>
        </svg>
        }

        <span>
          {title}
        </span>
      </Link>

      <TableOfContentList
        isVisible={(hasChildPages || hasAnchors) && isExpanded}
        ids={ids}
        activeTocItemId={activeTocItemId}
        onSelectItem={onSelectItem}
      />
    </li>
  );
}

