# REACO-PAGINATION

A ReactJS component that creates a pagination.

Reaco-Pagination is written over [AdeleD/react-paginate](https://github.com/AdeleD/react-paginate).

## Installation

Using npm:
```shell
$ npm install --save reaco-pagination
```

### Code example

```javascript
import React, { Component } from 'react';
import Pagination from 'reaco-pagination';

// finally the component to be render
<Pagination
      forcePage={0}
      total={150} 
      size={10} 
      dataSize={10}
      handlePageChange={this.onPageChange}
      handlePageOptionChange={this.onPageOptionChange} />
```

See the [App.js](https://github.com/ofbusiness/reaco/blob/master/src/App.js) for complete code example.

## Props
| Name                                       | Type        | Description  
| ---                                        | ---         | ---                                        
| `total`                                    | `Number`    | **Required.** The total number of data across the pages.
| `size`                                     | `Number`    | **Required.** The total number of maximum data per page i.e per page count.
| `dataSize`                                 | `Number`    | **Required.** The least number of rows per page i.e there may be less items on last page in compare to maximum count per page.
| `forcePage`                                | `Number`    | **Optional.** This is current page index.
| `handlePageChange`                         | `Function`  | **Optional.** This is the callback function hits on page number's click.
| `handlePageOptionChange`                   | `Function`  | **Optional.** This is the callback function hits on page count option's click.
| `pageOptions`                              | `Array`     | **Optional.** This is list of different page counts. ex: [10, 25, 50, 100]
| `pageSummaryText`                          | `String`    | **Optional.** This is text string of pagination summary. It must contain these words i.e '#first_count#, #last_count#, #total_counts#' to show 'inital count of page, last count of page and total counts of all pages' respectively. ex: 'Showing <strong>#first_count# to #last_count#</strong> of #total_counts# entries'

See the full Documentation of **react-paginate** [here](https://github.com/AdeleD/react-paginate).