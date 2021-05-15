import styles from "./styles/styles.module.css";

export const TableOfContentEmptyState = () => (
  <div className={styles.tocEmptyState}>

    <h3 className={styles.tocEmptyStateTitle}>
      Sorry...<br/>
      No results found
    </h3>
  </div>
);
