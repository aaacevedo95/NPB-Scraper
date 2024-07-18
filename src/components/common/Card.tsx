import { ReactNode, useState } from "react";

const expandIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-layout-navbar-expand"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#2c3e50"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    <path d="M4 9h16" />
    <path d="M10 14l2 2l2 -2" />
  </svg>
);

const collapseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-layout-bottombar-expand"
    width="44"
    height="44"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="#2c3e50"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20 6v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2z" />
    <path d="M20 15h-16" />
    <path d="M14 10l-2 -2l-2 2" />
  </svg>
);

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
          <span className="icon">{isExpanded ? expandIcon : collapseIcon}</span>
        </button>
      </header>

      {isExpanded && <div className="card-content">{children}</div>}
    </div>
  );
};

export default Card;
