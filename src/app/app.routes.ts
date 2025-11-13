import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { OrdersPage } from './pages/orders-page/orders-page';
import { ProductsPage } from './pages/products-page/products-page';
import { UsersPage } from './pages/users-page/users-page';
import { ShoppingListPage } from './pages/shopping-list-page/shopping-list-page';
import { CategoriesPage } from './pages/categories-page/categories-page';

export const routes: Routes = [
    { path: 'login', component: LoginPage},
    { path: 'dashboard', component: DashboardPage},
    { path: 'orders', component: OrdersPage},
    { path: 'products', component: ProductsPage},
    { path: 'clients', component: UsersPage},
    { path: 'categories', component: CategoriesPage},
    { path: 'shopping-cart', component: ShoppingListPage},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
