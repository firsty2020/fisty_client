import React, { Component } from 'react';
import * as Feather from 'react-feather';
import NavBadge from './NavBadge';
import NavSingleItem from './NavSingleItem';

export default class NavDropdownItem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    
    componentDidMount() {
        this.props.item.children.map((child) => {
            if (child.url === window.location.pathname) {
                 this.setState({ open: true });
            }
            return null;
        })
    }

    toggle = e => {
        this.setState(prevState => ({open: !prevState.open}));
        e.preventDefault();
        e.stopPropagation();
    };

    render() {
        const { item } = this.props;
        const isExpanded = this.state.open ? 'open' : '';
        const Icon = item.icon ? Feather[item.icon] : null;
        const ExpandIcon = isExpanded
            ? Feather.ChevronDown
            : Feather.ChevronRight;
        return (
            <li className={`nav-item has-submenu ${isExpanded}`}>
                <a href="#!" role="button" onClick={this.toggle}>
                    {item.icon && Icon && <Icon className="side-nav-icon"/>}
                    <span className="nav-item-label">{item.name}</span>{' '}
                    {item.badge && (
                        <NavBadge color={item.badge.variant}
                                  text={item.badge.text}/>
                    )}
                    <ExpandIcon className="menu-expand-icon"/>
                </a>
                {(this.state.open || this.props.isSidebarCollapsed) && (
                    <ul className="nav-submenu">
                        {item.children.map((item, index) => (
                            <NavSingleItem item={item} key={index}/>
                        ))}
                    </ul>
                )}
            </li>
        );
    }
}
