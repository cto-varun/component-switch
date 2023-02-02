import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Switch extends Component {
    state = {
        visibleIndex: 0,
    };

    render() {
        const {
            children,
            data,
            component: {
                id,
                params: { conditions, styles, noState = false },
            },
        } = this.props;

        const { visibleIndex } = this.state;

        window[window.sessionStorage?.tabId][id] = this;

        window[window.sessionStorage?.tabId][`${id}--reset`] = () => {
            this.setState({
                visibleIndex: 0,
            });
        };

        window[window.sessionStorage?.tabId][`${id}--update-visible-index`] = (i) => {
            this.setState({
                visibleIndex: i,
            });
        };

        const childComponent = React.Children.map(children, (child) => {
            if (children !== false) {
                return React.cloneElement(child, {
                    parentProps: this.props,
                });
            }
            return null;
        });

        // No state cases
        let visible;

        if (id === 'payment-switch' || id === 'manage-account-switch') {
            visible = childComponent.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`switch-element-${index}`}
                        style={{
                            display: index === visibleIndex ? 'block' : 'none',
                        }}
                    >
                        {item}
                    </div>
                );
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
            // Component Class
            <div>
                {/* Styles */}
                <style dangerouslySetInnerHTML={{ __html: styles }} />
                {/* Switch */}
                {noState ? visible : childComponent[visibleIndex]}
            </div>
        );
    }
}

Switch.propTypes = {
    children: PropTypes.node.isRequired,
    data: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    component: PropTypes.shape({
        id: PropTypes.string,
        params: PropTypes.shape({
            conditions: PropTypes.objectOf(PropTypes.string),
            styles: PropTypes.string,
            noState: PropTypes.bool,
        }),
    }),
};

Switch.defaultProps = {
    component: {
        id: undefined,
        params: {
            conditions: undefined,
            styles: undefined,
            noState: false,
        },
    },
};
