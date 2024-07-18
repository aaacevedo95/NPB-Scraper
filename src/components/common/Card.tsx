import Image from "next/image";
import { ReactNode, useState } from "react";

const Card = ({
  isExpandedDefault = false,
  title,
  children,
}: {
  isExpandedDefault?: boolean;
  title: string;
  children: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);

  const handleExpand = () => {
    setIsExpanded((wasExpanded) => !wasExpanded);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
        <button
          className="card-header-icon"
          aria-label="more options"
          onClick={handleExpand}
        >
          <span className="icon">
            {isExpanded ? (
              <Image
                src="/icons/expandIcon.svg"
                alt="expand"
                width={50}
                height={50}
              />
            ) : (
              <Image
                src="/icons/collapseIcon.svg"
                alt="collapse"
                width={50}
                height={50}
              />
            )}
          </span>
        </button>
      </header>

      <div
        className="card-content p-4"
        style={{ display: isExpanded ? "" : "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
