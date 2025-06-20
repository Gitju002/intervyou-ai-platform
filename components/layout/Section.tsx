import { forwardRef } from "react";

interface SectionProps {
  padding?: true | false;
  children: React.ReactNode;
  className?: string;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = "", padding = true }, ref) => {
    return (
      <section
        ref={ref}
        className={`${
          padding === true ? "py-8 lg:py-24" : "py-0"
        } ${className}`}
      >
        {children}
      </section>
    );
  }
);

export default Section;
