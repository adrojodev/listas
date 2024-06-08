export const Card = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className="bg-card rounded-lg border border-input">{children}</div>
  );
};
