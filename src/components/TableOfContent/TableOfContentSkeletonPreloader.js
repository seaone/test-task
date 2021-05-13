import styles from "./styles.module.css";

export const TableOfContentSkeletonPreloader = () => (
  <div className={styles.tocSkeletonPreloader}>
    <svg
      role="img"
      viewBox="0 0 216 304"
      aria-labelledby="loading-aria"
      className={styles.tocSkeletonPreloaderSVG}
    >
      <title id="loading-aria">Loading...</title>
      <path
        d="M0 0h216v16H0zM0 256h216v16H0zM0 288h216v16H0zM16 32h168v16H16zM16 64h200v16H16zM16 96h168v16H16zM32 128h184v16H32zM32 160h152v16H32zM32 192h184v16H32zM32 224h152v16H32z"
      />
    </svg>
  </div>
)