/**
 * Возвращает строковое представление суммы
 * @function
 *
 * @param {number} value Числовое значение
 * @returns {string} Строковое представление
 */
export const toMoney = (value: number): string => `${value.toLocaleString()} руб.`;

export default toMoney;
