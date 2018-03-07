import React, { Component } from 'react';
import { PaginationComponentStyle } from './styled';
import ClassName from 'classnames';

export class PaginationComponent extends Component {
  state = {
    pageData: null
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.pageData !== nextProps.pageData) {
      this.setState({ pageData: nextProps.pageData });
    }
  }

  onPageChange = page => {
    const { onPageChange } = this.props;
    if (typeof onPageChange === 'function') onPageChange(page);
  };

  renderPagination = (display, target, isActive, isDisabled) => {
    if (target < 0) return null;

    return (
      <li className={ClassName('page-item', { disabled: isDisabled, active: isActive })} key={display}>
        <button
          className="page-link"
          onClick={() => {
            this.onPageChange(target);
          }}
        >
          {display}
        </button>
      </li>
    );
  };

  renderPaginationList = () => {
    const { pageData } = this.state;
    let pageAll = Math.ceil(pageData.item_count / pageData.item_per_page);
    let pagination = [];

    pagination.push(this.renderPagination('Previous', pageData.page - 1, false, pageData.page <= 1));

    for (let page = 1; page <= pageAll; page++) {
      if (Math.abs(page - pageData.page) <= 2) pagination.push(this.renderPagination(page, page, page === pageData.page, false));
    }

    pagination.push(this.renderPagination('Next', pageData.page + 1, false, pageData.page >= pageAll));

    return pagination;
  };

  render() {
    const { pageData } = this.state;

    if (!pageData || !pageData.item_count) return null;

    let pageAll = Math.ceil(pageData.item_count / pageData.item_per_page);

    return (
      <PaginationComponentStyle>
        {pageAll > 1 && (
          <nav aria-label="Page navigation " className="float-right clearfix">
            <ul className="pagination">{this.renderPaginationList()}</ul>
          </nav>
        )}
      </PaginationComponentStyle>
    );
  }
}
