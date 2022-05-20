export const Heading = ({ children }) => {
  return (
    <h1 className="py-4 text-2xl font-semibold text-neutral-900 leading-none">
      {children}
    </h1>
  );
};

export const SubHeading = ({ children }) => {
  return (
    <h1 className="py-4 text-2xl text-right font-semibold text-neutral-500 leading-none">
      {children}
    </h1>
  );
};

export const Hero = ({ children, left, right }) => {
  const justify = right ? "right" : left ? "left" : "center";
  return (
    <div className={`w-full py-12 flex justify-${justify}`}>
      <h1 className="font-extralight text-4xl">{children}</h1>
    </div>
  );
};
