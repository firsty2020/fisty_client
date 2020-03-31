import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SidebarNav, PageContent, Page, Header } from '../../assets/vibe';
import Logo from '../../assets/images/logo_white.png';
import { navigation, adminRoutes } from './adminRoutes';
import { connect } from 'react-redux';
import { isLoadingSelector } from './adminReducer';
import { LoadSpinner } from '../ui';


const MOBILE_SIZE = 992;

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarCollapsed: false,
            isMobile: window.innerWidth <= MOBILE_SIZE,
        };
    }

    componentDidUpdate(prev) {
        if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
            this.toggleSideCollapse();
        }
    }

    toggleSideCollapse = () => {
        this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
    };


    render() {

        const { sidebarCollapsed } = this.state;
        const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
        return (
            <div className={`app ${sidebarCollapsedClass}`}>
                { this.props.isLoading ? <LoadSpinner/> : null}

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
                            routes={adminRoutes}
                        >
                        </Header>
                        <PageContent>
                            <Switch>
                                {adminRoutes.map((page, key) => (
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
