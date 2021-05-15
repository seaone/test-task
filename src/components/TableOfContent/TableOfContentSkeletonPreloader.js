import { ReactComponent as ImageSkeleton } from "./svg/img_skeleton.svg"
import styles from "./styles/styles.module.css";

export const TableOfContentSkeletonPreloader = () => (
  <div className={styles.tocSkeletonPreloader}>
    <ImageSkeleton
      className={styles.tocSkeletonPreloaderSVG}
    />
  </div>
)
