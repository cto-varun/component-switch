"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./styles.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Switch extends _react.Component {
  constructor() {
    return super(...arguments), this.state = {
      visibleIndex: 0
    }, this;
  }
  render() {
    const {
      children,
      data,
      component: {
        id,
        params: {
          conditions,
          styles,
          noState = false
        }
      }
    } = this.props;
    const {
      visibleIndex
    } = this.state;
    window[window.sessionStorage?.tabId][id] = this;
    window[window.sessionStorage?.tabId][`${id}--reset`] = () => {
      this.setState({
        visibleIndex: 0
      });
    };
    window[window.sessionStorage?.tabId][`${id}--update-visible-index`] = i => {
      this.setState({
        visibleIndex: i
      });
    };
    const childComponent = _react.default.Children.map(children, child => {
      if (children !== false) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          parentProps: this.props
        });
      }
      return null;
    });

    // No state cases
    let visible;
    if (id === 'payment-switch' || id === 'manage-account-switch') {
      visible = childComponent.map((item, index) => {
        return /*#__PURE__*/_react.default.createElement("div", {
          key: index,
          className: `switch-element-${index}`,
          style: {
            display: index === visibleIndex ? 'block' : 'none'
          }
        }, item);
      });
    }

    // Autopay status
    if (conditions) {
      if (conditions.autoPayStatus === data.data[0].autoPayStatus) {
        [visible] = childComponent;
      } else {
        [, visible] = childComponent;
      }
    }
    return (
      /*#__PURE__*/
      // Component Class
      _react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: styles
        }
      }), noState ? visible : childComponent[visibleIndex])
    );
  }
}
exports.default = Switch;
Switch.propTypes = {
  children: _propTypes.default.node.isRequired,
  data: _propTypes.default.shape({
    data: _propTypes.default.arrayOf(_propTypes.default.string)
  }).isRequired,
  component: _propTypes.default.shape({
    id: _propTypes.default.string,
    params: _propTypes.default.shape({
      conditions: _propTypes.default.objectOf(_propTypes.default.string),
      styles: _propTypes.default.string,
      noState: _propTypes.default.bool
    })
  })
};
Switch.defaultProps = {
  component: {
    id: undefined,
    params: {
      conditions: undefined,
      styles: undefined,
      noState: false
    }
  }
};
module.exports = exports.default;