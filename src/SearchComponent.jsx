import React, { Component } from 'react';
import { Input } from 'reactstrap';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  handleChange = ({ target }) => {
    const val = target.value;
    const { handleSetSearchInput } = this.props;

    this.setState({ searchInput: val }, () => this.searchInFields());
    handleSetSearchInput(val);
  };

  searchInFields = () => {
    const { data, handleSetFilteredData } = this.props;
    const { searchInput } = this.state;

    const check = (field) => field
      .toString()
      .toLowerCase()
      .includes(searchInput.slice().toString().toLowerCase());

    const filteredData = data.filter(value => {
      const { id, firstName, lastName, email, phone } = value;

      return check(id) || check(firstName) || check(lastName) || check(lastName)
        || check(email) || check(phone);
    });
    handleSetFilteredData(filteredData);
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div>
        <Input
          name="searchInput"
          value={searchInput}
          onChange={this.handleChange}
          placeholder="Enter a substring to search all fields (case insensitive)"
          label="Search"
        />
      </div>
    );
  }
}
