import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { ScrollWrapper } from 'components/main/scrollWrapper';
import { SpinningPreloader } from 'components/preloaders/spinningPreloader/spinningPreloader';
import { NoResultsForFilter } from 'pages/inside/common/noResultsForFilter';
import styles from './filtersList.scss';
import { FiltersItem } from '../filtersItem';
import { FORM_APPEARANCE_MODE_EDIT } from '../common/constants';

const cx = classNames.bind(styles);

export const FiltersList = ({
  search,
  userId,
  activeId,
  filters,
  loading,
  onChange,
  onEdit,
  onLazyLoad,
  noItemsMessage,
  noItemsAdditionalMessage,
}) => (
  <div className={cx('filter-list')}>
    <ScrollWrapper onLazyLoad={onLazyLoad}>
      {filters.map((item) => (
        <FiltersItem
          search={search || ''}
          userId={userId}
          filter={item}
          activeFilterId={activeId}
          key={item.id}
          onChange={onChange}
          onEdit={(event) => onEdit(event, FORM_APPEARANCE_MODE_EDIT, item)}
        />
      ))}
      {loading && <SpinningPreloader />}
      {!filters.length &&
        !loading && (
          <NoResultsForFilter
            filter={search || ''}
            notFoundMessage={noItemsMessage}
            notFoundAdditionalMessage={noItemsAdditionalMessage}
          />
        )}
    </ScrollWrapper>
  </div>
);

FiltersList.propTypes = {
  userId: PropTypes.string,
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  activeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onLazyLoad: PropTypes.func,
  noItemsMessage: PropTypes.object,
  noItemsAdditionalMessage: PropTypes.object,
};

FiltersList.defaultProps = {
  activeId: '',
  userId: '',
  search: '',
  loading: false,
  onChange: () => {},
  onEdit: () => {},
  onLazyLoad: null,
  noItemsMessage: {},
  noItemsAdditionalMessage: null,
};
