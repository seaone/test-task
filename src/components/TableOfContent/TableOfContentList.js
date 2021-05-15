import {createRef, useContext, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {TableOfContentContext} from "./TableOfContentContext"
import {TableOfContentEntity} from "./TableOfContentEntity";
import styles from "./styles/styles.module.css";

export const TableOfContentList = ({
                                     isVisible = false,
                                     ids = [],
                                     filteredIds = [],
                                     activeTocEntityId = null,
                                     onSelectItem = () => {
                                     }
                                   }) => {
  const [tocListHeight, setTocListHeight] = useState(null);
  const tocListElement = createRef();
  const tocData = useContext(TableOfContentContext);
  const {entities} = tocData;
  const {pages = {}, anchors = {}} = entities;

  const classNames = {
    enterActive: styles.tocListEnterActive,
    enterDone: styles.tocListEnterDone,
    exitActive: styles.tocListExitActive,
    exitDone: styles.tocListExitDone,
  }

  const tocListStyles = {
    height: tocListHeight != null ? `${tocListHeight}px` : 'auto',
  }

  const onEnter = () => {
    setTocListHeight(() => tocListElement.current.offsetHeight);
  }

  const onEntered = () => {
    setTocListHeight(() => null);
  }

  const onExit = () => {
    setTocListHeight(() => tocListElement.current.offsetHeight);
  }

  const onExited = () => {
    setTocListHeight(() => null);
  }

  return (
    <CSSTransition
      in={isVisible}
      classNames={classNames}
      timeout={300}
      unmountOnExit
      nodeRef={tocListElement}
      onEnter={onEnter}
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
    >
      <ul
        style={tocListStyles}
        ref={tocListElement}
        className={styles.tocList}
      >
        {ids.map((id) =>
          <TableOfContentEntity
            key={id}
            filteredIds={filteredIds}
            tocEntityData={pages[id] ?? anchors[id]}
            activeTocEntityId={activeTocEntityId}
            onSelectItem={onSelectItem}
          />
        )}
      </ul>
    </CSSTransition>
  )
}
