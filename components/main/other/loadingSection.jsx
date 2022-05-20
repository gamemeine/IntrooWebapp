import { Loader } from "./loader";

export const LoadingSection = ({ isLoading, children }) => {
  return isLoading ? (
    <div className="w-full mt-16 flex justify-center">
      <Loader />
    </div>
  ) : (
    <div>{children}</div>
  );
};
