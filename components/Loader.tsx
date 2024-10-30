import { Html, useProgress } from "@react-three/drei";
import styles from '../app/styles/Loader.module.css';

export default function Loader() {
    const { progress } = useProgress()
    return (
      <Html center>
          <div className="flex flex-col items-center">
              <div className={styles.loaderSpinner}></div>
              <p className="text-white text-xl mt-2">{progress.toFixed(1)}%</p>
          </div>
      </Html>
    );
  }