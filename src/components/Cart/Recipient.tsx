import React, {
  ChangeEvent, FC, FormEvent, useState
} from "react";
import { RecipientType } from "../../types";

/**
 * Получатель заказа
 *
 * @prop {function} onApply Callback оформления заказа
 */
export const Recipient: FC<{ onApply: (recipent: RecipientType) => void }> = ({ onApply }) => {
  const [form, setForm] = useState<RecipientType>({
    phone: "",
    address: ""
  });
  const [agreement, setAgreement] = useState<boolean>(false);
  const [formValid, setFormValid] = useState<boolean>(false);

  const formValidate = (
    data: { [key: string]: any }
  ) => !Object.values(data).filter((value) => !value).length;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
    setFormValid(formValidate({ ...form, agreement, [target.name]: target.value }));
  };

  const handleChangeAgreement = () => {
    setAgreement((prevValue) => !prevValue);
    setFormValid(formValidate({ ...form, agreement: !agreement }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onApply(form);
  };

  return (
    <div className="card">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Телефон</label>
          <input
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Ваш телефон"
            required
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Адрес доставки</label>
          <input
            className="form-control"
            id="address"
            name="address"
            required
            placeholder="Адрес доставки"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreement"
            checked={agreement}
            onChange={handleChangeAgreement}
          />
          <label className="form-check-label" htmlFor="agreement">
            Согласен с правилами доставки
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-outline-secondary"
          disabled={!formValid}
        >
          Оформить
        </button>
      </form>
    </div>
  );
};

export default Recipient;
