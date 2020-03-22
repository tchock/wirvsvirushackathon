import * as React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction, { BottomNavigationActionProps } from '@material-ui/core/BottomNavigationAction';
import BasketIcon from '@material-ui/icons/ShoppingCartOutlined';
import BundleListIcon from '@material-ui/icons/MenuOutlined';
import { Confirmation } from '../../containers/Confirmation';
import { BundleOverview } from '../BundleOverview';
import { Route, Switch, matchPath, Link } from 'react-router-dom';
import { SvgIconProps, Box, Badge } from '@material-ui/core';
import styled from 'styled-components';
import { getSpacing } from '../../theme';
import { useQuery } from '@apollo/react-hooks';
import { GET_BASKET } from '../../queries';
import { Account } from '../../account/containers/Account';

const NAVIGATION = [
  {
    path: '/',
    exact: true,
    icon: BundleListIcon,
    component: BundleOverview,
  },
  {
    path: '/account',
    icon: BasketIcon,
    component: Account,
    renderIcon: ({ basketSize }) => (
      <Badge badgeContent={basketSize} color="primary">
        <BasketIcon />
      </Badge>
    )
  },
  {
    path: '/order-confirmation',
    component: Confirmation,
  },
];

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  &.Mui-selected {
    padding-top: ${getSpacing(2)}px;
  }
`;

const BottomNavigationActionLink = (props: BottomNavigationActionProps & { to: string }) => (
  <StyledBottomNavigationAction component={Link} {...(props as any)}></StyledBottomNavigationAction>
);

export function App(props) {
  const { data: basketData } = useQuery<any>(GET_BASKET);

  const visibleNavigation = NAVIGATION.filter(navItem => !!navItem.icon);
  const selectedNavItem = visibleNavigation.find((navItem => matchPath(props.location.pathname, {
    path: navItem.path,
    exact: navItem.exact,
    component: navItem.component,
  })));
  
  const basketSize = basketData?.basketItems.length ?? 0;

  return (
    <>
      <Box boxSizing="border-box" minHeight="100vh">
        <Switch>
          {NAVIGATION.map(navItem => (
            <Route path={navItem.path} exact={navItem.exact} component={navItem.component} />
          ))}
        </Switch>
      </Box>
      <Box position="sticky" bottom={0}>
        <BottomNavigation value={selectedNavItem?.path} >
          {visibleNavigation.map(navItem => {
            const Icon: React.SFC<SvgIconProps> = navItem.icon as React.SFC<SvgIconProps>;
            const actionIcon = navItem.renderIcon ? navItem.renderIcon({ basketSize }) : <Icon />;
            return (
              <BottomNavigationActionLink icon={actionIcon} value={navItem.path} to={navItem.path} />
            );
          })}
        </BottomNavigation>
      </Box>
    </>
  );
}
