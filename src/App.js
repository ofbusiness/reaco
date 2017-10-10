import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import TableList from './components/table-list/table-list.component';
import Pagination from './components/pagination/pagination.component';
import { SORT_TYPES } from './components/table-list/table-list.constants';
import './App.css';

const randomData = [{
  name: {
    value: 'foo',
    title: 'this is foo',
    url: 'https://github.com/ofbusiness/reaco',
  },
  age: {
    value: 30,
  },
  dob: {
    value: (new Date()),
  }
}, {
  name: {
    value: 'bar',
    title: 'this is foo',
    url: 'https://github.com/ofbusiness/reaco',
  },
  age: {
    value: 25,
  },
  dob: {
    value: (new Date()),
  }
}];

const total = 150;
const dataSize = 10;

const tableConfig = {
    sortUpIcon: '↡',
    sortDownIcon: '↟',
    sortByField: 'age',
    sortDirection: '',
    sortCallback: null,
    columns: {
      name: {
        header: 'name',
        type: 'link',
        width: 100,
        sortEnable: true,
      },
      age: {
        header: 'age',
        type: 'text',
        width: 100,
      },
      dob: {
        header: 'dob',
        type: 'date',
        dateFormat: 'MM DD YYYY',
        width: 50,
      }
    },
    data: ((total) => {
      const randomList = [];
      for (let i = 0; i < total; i++) {
        const index = Math.round(Math.random() * (randomData.length - 1));
        randomList.push(randomData[index]);
      }
      return randomList;
    })(total),
};

class App extends Component {
  constructor() {
    super();

    this.onPageChange = this.onPageChange.bind(this);
    this.onPageOptionChange = this.onPageOptionChange.bind(this);
    this.getTableList = this.getTableList.bind(this);
    this.getPagination = this.getPagination.bind(this);
    this.onSortChange = this.onSortChange.bind(this);

    this.state = {
      tableConfig,
      sortByField: null,
      sortDir: null,
      forcePage: 0,
      size: dataSize,
    }
  }

  onSortChange(columnKey, sortDir) {
    const sortIndexes = this.state.tableConfig.data;
    sortIndexes.sort((itemA, itemB) => {
      const valueA = itemA.name;
      const valueB = itemB.name;
      let sortVal = 0;
      if (valueA.value > valueB.value) {
        sortVal = 1;
      }
      if (valueA.value < valueB.value) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortDir === SORT_TYPES.ASC) {
        sortVal = sortVal * -1;
      }
      return sortVal;
    });
    this.setState({
      tableConfig,
      sortDir,
      sortByField: columnKey,
    });
  }

  onPageChange(data) {
    this.setState({
      forcePage: data.selected,
      size: data.size,
    });
  }

  onPageOptionChange(size) {
    this.setState({
      forcePage: 0,
      size,
    });
  }

  getTableList() {
    const currentPageSize = total - (this.state.forcePage * this.state.size);
    const listSize = Math.min(this.state.size, currentPageSize);
    const tableConfig = this.state.tableConfig;
    tableConfig.sortCallback = this.onSortChange;
    tableConfig.sortDirection = this.state.sortDir;
    tableConfig.sortByField = this.state.sortByField;
    return <TableList 
      tableConfig={tableConfig} 
      rowsCount={listSize} 
      forcePage={this.state.forcePage}
      total={total} 
      size={this.state.size} 
      dataSize={listSize}
      handlePageChange={this.onPageChange}
      handlePageOptionChange={this.onPageOptionChange} />
  }

  getPagination() {
    const currentPageSize = total - (this.state.forcePage * this.state.size);
    const listSize = Math.min(this.state.size, currentPageSize);
    return <Pagination
      forcePage={this.state.forcePage}
      total={total} 
      size={this.state.size} 
      dataSize={listSize}
      handlePageChange={this.onPageChange}
      handlePageOptionChange={this.onPageOptionChange} />
  }

  render() {
    const self = this;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Reaco</h1>
          <p>A directory of react components by ofbusiness.</p>
        </header>
        <div className="container">
          <div className="leftSideBar">
            <div className="scrollContent">
              <p><Link to="/reaco-table-list">reaco-table-list</Link></p>
              <p><Link to="/reaco-pagination">reaco-pagination</Link></p>
            </div>
          </div>
          <div className="content">
            <Switch>
              {/* <Route exact path='/' component={<div>Reaco components examples</div>} /> */}
              <Route exact path='/reaco-table-list' component={self.getTableList} />
              <Route exact path='/reaco-pagination' component={self.getPagination} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
