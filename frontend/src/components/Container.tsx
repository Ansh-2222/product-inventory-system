// src/components/Container.tsx
type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {children}
    </div>
  );
};

export default Container;