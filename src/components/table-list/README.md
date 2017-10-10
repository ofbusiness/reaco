# REACO-TABLE-LIST

Reaco-Table-List is a React component for building and presenting data in a flexible, powerful way. It supports standard table features, like headers, columns, rows, header groupings, and both fixed-position and scrolling columns.

The table was designed to handle thousands of rows of data without sacrificing performance. Scrolling smoothly is a first-class goal of Reaco-Table-List and it's architected in a way to allow for flexibility and extensibility.

Reaco-Table-List is written over [schrodinger/fixed-data-table-2](https://github.com/schrodinger/fixed-data-table-2).
For pagination it uses [Reaco-Pagination](https://github.com/ofbusiness/reaco/tree/master/src/components/pagination), so you can directly use its properties here to manage pagination.

Features of Reaco-Table-List:
* Fixed headers and footer
* Fluid column widths
* Resizable columns
* Expanded rows
* Both fixed and scrollable columns
* Handling huge amounts of data
* Variable row heights (with adaptive scroll positions)
* Column resizing
* Performant scrolling
* Customizable styling
* Jumping to a row or column
* Controlled scroll API allows touch support
* Tooltips
* Responsive Resize
* Column Groups

## Installation

Using npm:
```shell
$ npm install --save reaco-table-list
```

### Code example

```javascript
import React, { Component } from 'react';
import TableList from 'reaco-table-list';

// fixed variables for pagination
const total = 150;
const dataSize = 10;

// table config 
const tableConfig = {
    sortUpIcon: '↡',
    sortDownIcon: '↟',
    sortByField: null,
    sortDirection: null,
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
    data: [{
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
    }],
};

// finally the component to be render
<TableList 
      tableConfig={tableConfig} 
      rowsCount={10} 
      forcePage={1}
      total={100} 
      size={10} 
      dataSize={10}
      handlePageChange={this.onPageChange}
      handlePageOptionChange={this.onPageOptionChange} />
```

See the [App.js](https://github.com/ofbusiness/reaco/blob/master/src/App.js) with complete code example.

## Props
| Name                          | Type        | Description                                                                             |
| ---                           | ---         | ---                                                     
| `tableConfig`                 | `Object`    | **Required.** The complete configuration of table data. See [Code Example](#code-example) for detail.
| `rowsCount`                   | `Number`    | **Required.** The least number of rows per page i.e there may be less items on last page in compare to maximum count per page.  
| `total`                       | `Number`    | **Required.** The total number of data across the pages.
| `size`                        | `Number`    | **Required.** The total number of maximum rows per page i.e per page count.
| `dataSize`                    | `Number`    | **Required.** The least number of rows per page i.e there may be less items on last page in compare to maximum count per page.
| `width`                       | `Number`    | **Optional.** The width of table.  
| `height`                      | `Number`    | **Optional.** The height of table. 
| `headerHeight`                | `Number`    | **Optional.** The height of header. 
| `rowHeight`                   | `Number`    | **Optional.** The height of each row.  
| `forcePage`                   | `Number`    | **Optional.** This is current page index will be use by pagination component.

See the full Documentation of **fixed-data-table-2** [here](https://github.com/schrodinger/fixed-data-table-2).