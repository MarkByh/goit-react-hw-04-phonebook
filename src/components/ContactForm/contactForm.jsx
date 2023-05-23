import style from '../styles.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
export const Form = ({ newContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  // state = {
  //   name: '',
  //   number: '',
  // };
  const handleChange = e => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'number') {
      setNumber(e.target.value);
    }
    // this.setState({ [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    newContact({
      name: name,
      number: number,
      id: nanoid(6),
    });
    resetForm();
  };
  const resetForm = () => {
    setName('');
    setNumber('');
    // this.setState({ name: '', number: '' });
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <h2>Name</h2>
          <input
            className={style.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleChange}
            value={name}
          />
        </div>

        <div>
          <h2>Number</h2>
          <input
            className={style.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
            value={number}
          />
        </div>
        <button className={style.subButton} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
