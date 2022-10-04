import Pagination from "react-bootstrap/Pagination";

export default function PaginationComponent(props) {
  const totalPages = props.pageNumbers;
  const currentPage = props.currentPage;
  const pageNumbers = [];
  for (let i = 0; i <= totalPages - 1; i++) {
    pageNumbers.push(i);
  }
  const paginateHandler = (num) => {
    props.changePage(num);
  };
  return (
    <div className="pagination-center">
      <Pagination>
        <Pagination.First className={currentPage === 0 ? "disabled" : ""} onClick={() => paginateHandler(0)}/>
        <Pagination.Prev className={currentPage === 0 ? "disabled" : ""} onClick={() => paginateHandler(currentPage-1)}/>
        {pageNumbers.map((number, index )=> (
            <Pagination.Item key={index} className={currentPage === number? "active" : ""} onClick={() => paginateHandler(number)}>{number+1}</Pagination.Item>
        ))}
        <Pagination.Next className={currentPage === totalPages - 1 || totalPages === 0 ? "disabled" : ""} onClick={() => paginateHandler(currentPage+1)}/>
        <Pagination.Last className={currentPage === totalPages - 1 || totalPages === 0 ? "disabled" : ""} onClick={() => paginateHandler(totalPages - 1)}/>
      </Pagination>
    </div>
  );
}
