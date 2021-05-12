import {createRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import TocItem from "./TocItem";
import styles from "./styles.module.css";

const TocList = ({isVisible = true, ids = [], allPages = {}, activeTocItemId = null, selectItem = () => {}}) => {
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
        {ids.map((id) =>
          <TocItem
            key={id}
            page={allPages[id]}
            allPages={allPages}
            activeTocItemId={activeTocItemId}
            selectItem={selectItem}
          />
        )}
      </ul>
    </CSSTransition>
  )
}

export default TocList;