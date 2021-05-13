import {createRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {TableOfContentItem} from "./TableOfContentItem";
import styles from "./styles.module.css";

export const TableOfContentList = ({isVisible = true, ids = [], allPages = {}, allAnchors = {}, activeTocItemId = null, selectItem = () => {}}) => {
  const [tocListHeight, setTocListHeight] = useState(null);
  const tocListElement = createRef();
  const classNames = {
    enterActive: styles.tocListEnterActive,
    enterDone: styles.tocListEnterDone,
    exitActive: styles.tocListExitActive,
    exitDone: styles.tocListExitDone,
  }

  const tocListStyles = {
    height: tocListHeight != null ? `${tocListHeight}px` : 'auto'
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
        {ids.map((id) => {
          // console.log(allAnchors[id]);
          return (<TableOfContentItem
              key={id}
              page={allPages[id]}
              anchor={allAnchors[id]}
              allPages={allPages}
              allAnchors={allAnchors}
              activeTocItemId={activeTocItemId}
              selectItem={selectItem}
            />)
          }
        )}
      </ul>
    </CSSTransition>
  )
}
