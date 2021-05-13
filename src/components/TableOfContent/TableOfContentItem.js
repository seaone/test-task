import {useState} from "react";
import {TableOfContentList} from "./TableOfContentList";
import styles from "./styles.module.css";

export const TableOfContentItem = ({page, anchor, allPages = {}, allAnchors = {}, activeTocItemId = null, selectItem = () => {}}) => {
  const {id, title, pages, level, anchors} = page ?? anchor;
  const hasChildPages = pages !== undefined && pages.length > 0;
  const hasAnchors = anchors !== undefined && anchors.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  const getPaddingLeft = () => {
    const basePaddingLeft = 32;
    const indentSize = 16;
    let indent = basePaddingLeft + (level * indentSize);

    if (anchor != null) {
      const parentPage = allPages[anchor.parentId];

      indent = indent + (parentPage.level * indentSize)
    }

    return indent;
  }

  const tocLinkStyles = {
    paddingLeft: `${getPaddingLeft()}px`
  }

  const selectTocItem = (event) => {
    if (hasChildPages || hasAnchors) {
      setIsExpanded((isExpanded) => !isExpanded);
    }

    selectItem(id);
  }

  const ids = []

  if (hasAnchors) {
    ids.push(...anchors)
  }

  if (hasChildPages) {
    ids.push(...pages)
  }

  const hasActiveAnchors = () => {
    const parentId = allAnchors[activeTocItemId]?.parentId;
    console.log(parentId);

    return parentId === id
  }

  const tocItemClassNames = page != null ? styles.tocItemPage : styles.tocItemAnchor;
  const tocItemActiveClassNames = hasActiveAnchors() || (hasAnchors && isExpanded && activeTocItemId === id) ? styles.tocItemActive : '';
  const tocItemIconExpandedClassNames = isExpanded ? styles.tocItemIconExpanded : '';
  const tocLinkSelectedClassNames = activeTocItemId === id ? styles.tocLinkSelected : '';

  return (
    <li className={`${styles.tocItem} ${tocItemClassNames} ${tocItemActiveClassNames}`}>
      <a
        style={tocLinkStyles}
        href={`#${id}`}
        className={`${styles.tocLink} ${tocLinkSelectedClassNames}`}
        onClick={selectTocItem}
      >
        {hasChildPages &&
        <svg
          viewBox="-5 -3 24 24"
          fill="currentColor"
          className={`${styles.tocItemIcon} ${tocItemIconExpandedClassNames}`}
        >
          <path d="M11 9l-6 5.25V3.75z"></path>
        </svg>
        }

        <span>
          {title}
        </span>
      </a>

      <TableOfContentList
        isVisible={(hasChildPages || hasAnchors) && isExpanded}
        ids={ids}
        allPages={allPages}
        allAnchors={allAnchors}
        activeTocItemId={activeTocItemId}
        selectItem={selectItem}
      />
    </li>
  );
}

