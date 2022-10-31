import Wrapper from "../assets/wrappers/PageBtnContainer.js";
import { useAppContext } from "./AppContext.js";
import { GiPreviousButton, GiNextButton } from "react-icons/gi";

export default function PageBtnContainer() {
  const { numOfPages, pageChange, page } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() => {
          let pageNo = page - 1;
          if (pageNo < 1) pageNo = numOfPages;

          pageChange(pageNo);
        }}
      >
        <GiPreviousButton />
        <span>Prev Page</span>
      </button>
      {pages.map((pageNo) => (
        <button
          className={pageNo === page ? "pageBtn active" : "pageBtn"}
          type="button"
          key={pageNo}
          onClick={() => {
            pageChange(pageNo);
          }}
        >
          {pageNo}
        </button>
      ))}
      <button
        className="next-btn"
        onClick={() => {
          let pageNo = page + 1;
          if (pageNo > numOfPages) pageNo = 1;
          pageChange(pageNo);
        }}
      >
        <span>Next Page</span>
        <GiNextButton />
      </button>
    </Wrapper>
  );
}
