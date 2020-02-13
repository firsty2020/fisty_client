import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Header, SidebarNav, PageContent, Page } from '../../assets/vibe';
import Logo from '../../assets/images/logo_white.png';
import routes from './routes';

const MOBILE_SIZE = 992;

export default class DashboardLayout extends Component {

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
                            nav={routes}
                            logo={Logo}
                            logoText="Firsty"
                            isSidebarCollapsed={sidebarCollapsed}
                            toggleSidebar={this.toggleSideCollapse}
                            {...this.props}
                        />
                        <Page>
                            <Header
                                toggleSidebar={this.toggleSideCollapse}
                                isSidebarCollapsed={sidebarCollapsed}
                                routes={routes}
                                {...this.props}
                            >
                            </Header>
                            <PageContent>
                                <Switch>
                                    {[ ...routes.top, ...routes.bottom].map((page, key) => (
                                        <Route path={page.url}
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
