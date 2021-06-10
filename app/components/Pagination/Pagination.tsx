import { Link } from "react-router-dom";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  basePath = "pages",
  currentPage,
  totalPages,
}) => {
  const previousPagePath =
    currentPage > 1 ? `/${basePath}/${currentPage - 1}` : undefined;
  const nextPagePath =
    currentPage < totalPages ? `/${basePath}/${currentPage + 1}` : undefined;

  return (
    <div>
      {previousPagePath && (
        <Link to={previousPagePath} className="mr-2 hover:underline">
          Previous
        </Link>
      )}
      {nextPagePath && (
        <Link to={nextPagePath} className="hover:underline">
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
