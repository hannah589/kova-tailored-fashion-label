import { Link } from "react-router-dom";

function PageHeader({ title, description, link }) {
  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>

      {link && (
        <Link to={link.to}>
          {link.label}
        </Link>
      )}
    </header>
  );
}

export default PageHeader;