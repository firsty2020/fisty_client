import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { SidebarNav, PageContent, Page, Header } from '../../assets/vibe';
import Logo from '../../assets/images/logo_white.png';
import { navigation, adminRoutes } from './adminRoutes';


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
                        >
                        </Header>
                        <PageContent>
                            <Switch>
                                {adminRoutes.map((page, key) => (
                                    <Route
                                        path={page.path}
                                        component={page.component}
                                        key={key}
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


export default Dashboard;
