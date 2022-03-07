import React, { FC } from "react";

/**
 * Уведомление об успешной операции
 * @compoenent
 */
export const Success: FC = () => (
  <div className="alert alert-success my-5 mx-auto text-center w-50 p-3">
    Операция выполнена успешно.
  </div>
);

/**
 * Уведомление об ошибке
 * @component
 */
export const Error: FC = () => (
  <div className="alert alert-danger my-5 mx-auto text-center w-50 p-3">
    Произошлка ошибка. Попробуйте повторить запрос снова
  </div>
);

/**
 * Уведомление
 * @component
 *
 * @prop {string} message Сообщение
 * @prop {string} level Уровень сообщение, по умолчанию "warning"
 */
export const Message: FC<{ message: string, level: string }> = ({ message, level }) => (
  <div className={`alert alert-${level} my-5 mx-auto text-center w-50 p-3`}>
    {message}
  </div>
);
