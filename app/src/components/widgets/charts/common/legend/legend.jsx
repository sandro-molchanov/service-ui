import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defectTypesSelector } from 'controllers/project';
import { injectIntl, intlShape } from 'react-intl';
import { ScrollWrapper } from 'components/main/scrollWrapper';
import { getItemColor, getItemName, getItemNameConfig } from '../utils';
import styles from './legend.scss';

const cx = classNames.bind(styles);

@connect((state) => ({
  defectTypes: defectTypesSelector(state),
}))
@injectIntl
export class Legend extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    defectTypes: PropTypes.object.isRequired,
    items: PropTypes.array,
    colors: PropTypes.object,
    messages: PropTypes.object,
    noTotal: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    customBlock: PropTypes.node,
    uncheckedLegendItems: PropTypes.array,
    className: PropTypes.string,
  };

  static defaultProps = {
    items: [],
    colors: {},
    messages: {},
    noTotal: false,
    disabled: false,
    onClick: () => {},
    onMouseOver: () => {},
    onMouseOut: () => {},
    customBlock: null,
    uncheckedLegendItems: [],
    className: null,
  };

  onClick = (e) => {
    const target = this.getTarget(e);
    target.classList.toggle(cx('unchecked'));
    this.props.onClick(target.getAttribute('data-id'));
  };

  onMouseOver = (e) => {
    const target = this.getTarget(e);
    this.props.onMouseOver(target.getAttribute('data-id'));
  };

  getElements = () => {
    const {
      items,
      uncheckedLegendItems,
      disabled,
      noTotal,
      onMouseOut,
      intl: { formatMessage },
      colors,
      messages,
    } = this.props;

    return items.map((name) => {
      const nameConfig = getItemNameConfig(name);
      const isItemConfig = Object.keys(nameConfig).length > 0;

      return (
        <span
          key={name}
          data-id={name}
          className={cx('legend-item', {
            disabled,
            unchecked: uncheckedLegendItems.indexOf(name) !== -1,
          })}
          onClick={disabled ? null : this.onClick}
          onMouseOver={this.onMouseOver}
          onMouseOut={onMouseOut}
        >
          <span
            className={cx('color-mark')}
            style={{
              backgroundColor: isItemConfig
                ? getItemColor(nameConfig, this.props.defectTypes)
                : colors[name],
            }}
          />
          <span className={cx('item-name')}>
            {isItemConfig
              ? getItemName(nameConfig, this.props.defectTypes, formatMessage, noTotal)
              : formatMessage(messages[name])}
          </span>
        </span>
      );
    });
  };

  getTarget = ({ target }) => (target.getAttribute('data-id') ? target : target.parentElement);

  render() {
    const { customBlock, className } = this.props;

    return (
      <div className={className || cx('legend')}>
        <ScrollWrapper autoHide autoHeight autoHeightMax={65} hideTracksWhenNotNeeded>
          <div className={cx('content-wrapper')}>
            {customBlock ? (
              <div className={cx('with-custom-block')}>
                {customBlock}
                <div className={cx('legend-elements')}>{this.getElements()}</div>
              </div>
            ) : (
              this.getElements()
            )}
          </div>
        </ScrollWrapper>
      </div>
    );
  }
}
