import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./publics/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'login/:username',
    loadChildren: () => import('./publics/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./publics/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'download',
    loadChildren: () => import('./publics/download/download.module').then(m => m.DownloadPageModule)
  },
  {
    path: 'about',
    children: [
      {
        path: '',
        loadChildren: () => import('./publics/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: ':selectedTab',
        loadChildren: () => import('./publics/about/about.module').then(m => m.AboutPageModule)
      }
    ]
  },
  {
    path: 'university',
    children: [
      {
        path: '',
        loadChildren: () => import('./publics/university/university-list/university-list.module').then( m => m.UniversityListPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./publics/university/university-view/university-view.module').then(m => m.UniversityViewPageModule)
      }
    ]
  },
  {
    path: 'register',
    loadChildren: () => import('./publics/register/register.module').then( m => m.RegisterPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
