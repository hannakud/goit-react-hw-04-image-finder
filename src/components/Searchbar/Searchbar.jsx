import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    const value = search.toLowerCase().trim();
    if (value) onSearch(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.button}>
          <FiSearch />
        </button>
        <input
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={event => {
            setSearch(event.target.value);
          }}
          value={search}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
