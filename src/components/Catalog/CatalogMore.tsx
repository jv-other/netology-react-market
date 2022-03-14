import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCatalogHasMore, loadMoreItems, selectRequestItems, RequestStatus
} from "../../slices";
import { Error, Loader } from "../Notice";

/**
 * Кнопка дозагрузки товаров
 * @component
 *
 */
export const CatalogMore = () => {
  const { status } = useSelector(selectRequestItems) || {};
  const hasMore = useSelector(selectCatalogHasMore);
  const dispatch = useDispatch();

  const handleClick = () => dispatch(loadMoreItems());

  if (!hasMore) {
    return (
      <>
      </>
    );
  }

  return (
    <>
      {(RequestStatus.PENDING === status) && (
        <Loader />
      )}
      {(RequestStatus.FAILURE === status) && (
        <Error />
      )}
      <div className="text-center">
        <button
          type="button"
          className="btn btn-outline-primary mt-3"
          onClick={handleClick}
          disabled={![RequestStatus.SUCCESS, RequestStatus.FAILURE].includes(status)}
        >
          Загрузить ещё
        </button>
      </div>
    </>
  );
};

export default CatalogMore;
