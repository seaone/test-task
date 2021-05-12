import {useState} from "react";
import TocList from "./TocList";
import styles from "./styles.module.css";

const TocItem = ({page = {}, allPages = {}, activeTocItemId = null, selectItem = () => {}}) => {
  const {id, title, pages, level} = page;
  const hasChild = pages !== undefined;
  const [isExpanded, setIsExpanded] = useState(false);

  const getPaddingLeft = () => {
    const basePaddingLeft = 32;
    const indentSize = 16;

    return basePaddingLeft + (level*indentSize)
  }

  const tocLinkStyles = {
    paddingLeft: `${getPaddingLeft()}px`
  }

  const expandTocItem = (event) => {
    setIsExpanded((isExpanded) => !isExpanded);
    selectItem(id);
  }

  const tocItemIconExpandedClass = isExpanded ? styles.tocItemIconExpanded : '';
  const tocLinkSelectedClass = activeTocItemId === id ? styles.tocLinkSelected : '';

  return (
    <li className={styles.tocItem}>
      <a
        style={tocLinkStyles}
        href={`#${page['id']}`}
        className={`${styles.tocLink} ${tocLinkSelectedClass}`}
        onClick={expandTocItem}
      >
        {hasChild &&
        <svg
          viewBox="-5 -3 24 24"
          fill="currentColor"
          className={`${styles.tocItemIcon} ${tocItemIconExpandedClass}`}
        >
          <path d="M11 9l-6 5.25V3.75z"></path>
        </svg>
        }

        <span>
          {title}
        </span>
      </a>

      <TocList
        isVisible={hasChild && isExpanded}
        ids={pages}
        allPages={allPages}
        activeTocItemId={activeTocItemId}
        selectItem={selectItem}
      />
    </li>
  );
}

export default TocItem;
