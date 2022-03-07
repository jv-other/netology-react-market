import React, { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayloadAction } from "@reduxjs/toolkit";
import { RequestState, RequestStatus as Status } from "../slices";
import { Error, Loader } from "../components/Notice";

/**
 * HOC компонент с загрузкой данных
 *
 * @param {React.ComponentType} Component Исходный компонент
 * @param {function} operation Селектор запроса
 * @param {function} request Селектор состояния запроса
 * @returns {React.ComponentType} Компонент
 */
export const withDataLoader = (
  Component: FC<{ data: any }>,
  operation: (props: any) => (state: any) => PayloadAction<any> | void,
  request: (props: any) => (state: any) => RequestState
) => {
  const WithDataLoaderComponent = (props: any) => {
    const { status, data, error } = useSelector(request(props)) || {};
    const action = useSelector(operation(props));
    const dispatch = useDispatch();

    useEffect(() => {
      if (action) {
        dispatch(action);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      ((Status.PENDING === status) && (<Loader />))
      || ((Status.FAILURE === status) && (error?.statusCode === 404) && (<Navigate to="/404" replace />))
      || ((Status.FAILURE === status) && (<Error />))
      // eslint-disable-next-line react/jsx-props-no-spreading
      || ((Status.SUCCESS === status) && (<Component {...props} data={data} />))
      || (<> </>)
    );
  };
  return WithDataLoaderComponent;
};

export default withDataLoader;
