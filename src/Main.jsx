import React, {Component} from 'react';
import {Spinner, Table, Button} from 'reactstrap';
import SearchComponent from './SearchComponent';
import PersonCard from './PersonCard';
import AddPersonForm from './AddPersonForm';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: '',
      filteredDataSource: '',
      searchInput: '',
      isLoading: true,
      sort: {
        column: null,
        direction: 'desc',
      },
      currentPage: 1,
      rowsPerPage: 20,
      person: null,
      address: null,
      isFormDisplayed: false,
      form: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
    };
  }

  componentDidMount() {
    const url = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
      .then((res) => res.json())
      .then((dataSource) => this.setState({ dataSource, isLoading: false }))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  onSort = (event, sortKey) => {
    const { dataSource, sort } = this.state;
    console.log(dataSource)
    let direction;
    if (sort.column === sortKey) {
      direction = (sort.direction === 'asc') ? 'desc' : 'asc';
    } else {
      direction = 'asc';
    }

    const sortedData = [...dataSource].sort((a, b) => {
      const itemA = (typeof a[sortKey] !== 'number') ? a[sortKey].toLowerCase() : a[sortKey];
      const itemB = (typeof b[sortKey] !== 'number') ? b[sortKey].toLowerCase() : b[sortKey];

      if (itemA < itemB) return -1;
      if (itemA > itemB) return 1;
      return 0;
    });

    if (direction === 'desc') {
      sortedData.reverse();
    }

    this.setState({
      dataSource: sortedData,
      sort: {
        column: sortKey,
        direction,
      },
    });
  };

  setArrow = (column) => {
    let className = 'sort-direction';
    const { sort } = this.state;
    if (sort.column === column) {
      className += sort.direction === 'asc' ? ' asc' : ' desc';
    }
    return className;
  };

  handleClickOnRow = (item) => {
    this.setState({ person: item, address: item.address });
  };

  renderItems = (items) => {
    return (
      items && items.map((item) => (
        <tr
          key={`${item.id}${item.lastName}`} // ids in fetched data are not unique, and this is unique))
          onClick={() => this.handleClickOnRow(item)}
        >
          <td>{item.id}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
        </tr>
      ))
    );
  };

  handleSetFilteredData = (filteredData) => {
    this.setState({ filteredDataSource: filteredData });
  };

  handleSetSearchInput = (searchInput) => {
    this.setState({ searchInput });
  };

  handleClickOnPageNumber = (event) => {
    console.log(event.target.innerText)
    this.setState({
      currentPage: Number(event.target.innerText),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    this.setState((prevState) => ({
      dataSource: [form, ...prevState.dataSource],
    }
    ));
  };

  handleChangeField = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value,
      },
    });
  };

  clearForm = () => {
    this.setState({
      form: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
    });
  };

  toggleForm = () => {
    const { isFormDisplayed } = this.state;
    this.setState({ isFormDisplayed: !isFormDisplayed });
  };

  render() {
    const {
      dataSource, filteredDataSource, isLoading, searchInput,
      currentPage, rowsPerPage, person, address, isFormDisplayed,
      form,
    } = this.state;

    const data = searchInput.length ? filteredDataSource : dataSource;

    const indexOfLastTodo = currentPage * rowsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - rowsPerPage;
    const dataToDisplay = data.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          key={number}
          id={number}
          // className={pageClass}
          onClick={this.handleClickOnPageNumber}
        >
          <span>{number}</span>
        </li>
      );
    });

    const card = (person) ? <PersonCard person={person} address={address} /> : null;

    const addingPersonForm = (isFormDisplayed)
      ? <AddPersonForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChangeField}
        onClear={this.clearForm}
        toggle={this.toggleForm}
        form={form}
      />
      : <Button color="primary" onClick={this.toggleForm}>Add new person</Button>;

    return (
      <div className="wrapper">
        {!isLoading
          ? (
            <div>
              {addingPersonForm}
              <SearchComponent
                data={dataSource}
                handleSetFilteredData={this.handleSetFilteredData}
                handleSetSearchInput={this.handleSetSearchInput}
              />

              <Table size="sm" hover className="main-table">
                <thead>
                  <tr>
                    <th onClick={(e) => this.onSort(e, 'id')}>
                      #
                      <span className={this.setArrow('id')} />
                      <br />
                    </th>
                    <th onClick={(e) => this.onSort(e, 'firstName')}>
                      First Name
                      <span className={this.setArrow('firstName')} />
                      <br />
                    </th>
                    <th onClick={(e) => this.onSort(e, 'lastName')}>
                      Last Name
                      <span className={this.setArrow('lastName')} />
                      <br />
                    </th>
                    <th onClick={(e) => this.onSort(e, 'email')}>
                      Email
                      <span className={this.setArrow('email')} />
                      <br />
                    </th>
                    <th onClick={(e) => this.onSort(e, 'phone')}>
                      Phone
                      <span className={this.setArrow('phone')} />
                      <br />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderItems(dataToDisplay)}
                </tbody>
              </Table>
              <ul className="page-numbers">
                {renderPageNumbers}
              </ul>
              {card}
            </div>
          )
          : <Spinner className="spinner" style={{ width: '3rem', height: '3rem' }} type="grow" color="warning" />}
      </div>
    );
  }
}

export default Main;
