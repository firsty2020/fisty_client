import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SidebarNav, PageContent, Page } from '../../assets/vibe';
import Logo from '../../assets/images/logotype-Firsty-fixed.png';
import { connect } from 'react-redux';
import { isLoadingSelector } from '../common/commonReducer';
import Header from './Header';


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { sidebarCollapsed: false };
    }

    toggleSideCollapse = () => {
        this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    };


    render() {

        const { sidebarCollapsed } = this.state;
        const { navigation, routes } = this.props;

        const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
        return (
            <div className={`app ${sidebarCollapsedClass}`}>
                <div className="app-body">
                    <SidebarNav
                        nav={navigation}
                        logo={Logo}
                        isSidebarCollapsed={sidebarCollapsed}
                        toggleSidebar={this.toggleSideCollapse}
                        {...this.props}
                    />
                    <Page>
                        <Header
                            toggleSidebar={this.toggleSideCollapse}
                            isSidebarCollapsed={sidebarCollapsed}
                            {...this.props}
                            routes={routes}
                        >
                        </Header>
                        <PageContent>
                            <Switch>
                                {routes.map((page, key) => (
                                    <Route
                                        path={page.path}
                                        component={page.component}
                                        key={key}
                                        exact
                                    />
                                ))}
                            </Switch>
                        </PageContent>
                    </Page>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: isLoadingSelector(state)
});


export default connect(mapStateToProps, null)(Dashboard);
