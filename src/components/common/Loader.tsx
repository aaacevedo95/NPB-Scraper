import PuffLoader from "react-spinners/PuffLoader";

const Loader = ({ isLoading }: { isLoading: boolean }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <PuffLoader
      color="#006b5b"
      loading={isLoading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
);

export default Loader;
