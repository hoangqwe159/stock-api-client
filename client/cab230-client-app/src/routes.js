import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StockListPage from './pages/StockListPage/StockListPage';
import StockDetailPage from './pages/StockDetailPage/StockDetailPage';

const routes = [
    {
        path: '/',
        exact: true,
        main: ({match, history}) => <HomePage match={match} history={history}/>
    },
    {
        path: '/stocks',
        exact: false,
        main: ({match, history}) => <StockListPage match={match} history={history}/>

    },
    {
        path: '/product/add',
        exact: false,
        main: ({history}) => <ProductActionPage history={history}/>
    },
    {
        path: '/product/:id/edit',
        exact: false,
        main: ({match, history}) => <ProductActionPage match={match} history={history}/>
    },
    {
        path: '/login',
        exact: false,
        main: ({history}) => <LoginPage history={history}/>
    },
    {
        path: '/register',
        exact: false,
        main: ({history}) => <RegisterPage history={history}/>
    },
    {
        path: '/stock/:symbol',
        exact: false,
        main: ({match, history}) => <StockDetailPage match={match} history={history}/>
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage/>
    },
    


];

export default routes;