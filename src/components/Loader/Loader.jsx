import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <ThreeDots
        className={css.loader}
        height="80"
        width="80"
        radius="9"
        color="#ff4081"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
