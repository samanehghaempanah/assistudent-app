import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/dashboard/dashboard.module').then(
                (m) => m.DashboardPageModule
              ),
          },
          {
            path: 'iframe/:name/:title',
            loadChildren: () =>
              import('./home/iframe/iframe.module').then(
                (m) => m.IframePageModule
              ),
          },
          {
            path: 'booklet',
            children: [
              {
                path: '',
                loadChildren: () => import('./home/booklet/booklet-list/booklet-list.module').then(m => m.BookletListPageModule)
              },
              {
                path: ':id',
                loadChildren: () => import('./home/booklet/booklet-view/booklet-view.module').then(m => m.BookletViewPageModule)
              },
            ]
          },
          {
            path: 'places',
            loadChildren: () =>
              import('./home/places/places.module').then(
                (m) => m.PlacesPageModule
              ),
          },
          {
            path: 'track',
            loadChildren: () =>
              import('./home/track/track.module').then(
                (m) => m.TrackPageModule
              ),
          },
          {
            path: 'visa',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./home/Visa/visa-list/visa-list.module').then(
                    (m) => m.VisaListPageModule
                  ),
              },
              {
                path: ':selectedTab/:formId/:userFormId',
                loadChildren: () =>
                  import('./home/Visa/visa-view/visa-view.module').then(
                    (m) => m.VisaViewPageModule
                  ),
              },
            ],
          },
          {
            path: 'form',
            children: [
              {
                path: '',
                loadChildren: () => import('./home/form/form-list/form-list.module').then(m => m.FormListPageModule)
              },
              {
                path: ':selectedTab',
                loadChildren: () => import('./home/form/form-list/form-list.module').then(m => m.FormListPageModule)
              },
              {
                path: ':formType',
                loadChildren: () => import('./home/form/form-list/form-list.module').then(m => m.FormListPageModule)
              },
              {
                path: ':selectedTab/:userFormId',
                loadChildren: () => import('./home/form/form-list/form-list.module').then(m => m.FormListPageModule)
              },
              {
                path: 'view/:formId/:userFormId',
                loadChildren: () => import('./home/form/form-view/form-view.module').then(m => m.FormViewPageModule)
              }
            ],
          },
          {
            path: 'facility',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import(
                    './home/facility/facility-list/facility-list.module'
                  ).then((m) => m.FacilityListPageModule),
              },
              {
                path: ':name/:id',
                loadChildren: () =>
                  import(
                    './home/facility/facility-view/facility-view.module'
                  ).then((m) => m.FacilityViewPageModule),
              },
            ],
          },
          {
            path: 'profile',
            loadChildren: () =>
              import('../privates/user/profile/profile.module').then(
                (m) => m.ProfilePageModule
              ),
          },
          {
            path: 'offer',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./home/offer/offer-list/offer-list.module').then(
                    (m) => m.OfferListPageModule
                  ),
              },
              {
                path: ':id',
                loadChildren: () =>
                  import('./home/offer/offer-view/offer-view.module').then(
                    (m) => m.OfferViewPageModule
                  ),
              },
              {
                path: 'company/:id',
                loadChildren: () =>
                  import('./home/offer/company-view/company-view.module').then(
                    (m) => m.CompanyViewPageModule
                  ),
              },
            ],
          },
          {
            path: 'studentCard',
            children: [
              {
                path: '',
                loadChildren: () => import('./home/studentCard/student-card-list/student-card-list.module').then(m => m.StudentCardListPageModule)
              }
            ]
          },
          {
            path: 'payment/:lastpage/:paymenttype/:referenceid',
            children: [
              {
                path: '',
                loadChildren: () => import('./home/payment/payment.module').then(m => m.PaymentPageModule)
              },
            ],
          }
        ],
      },
      {
        path: 'chat',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./chat/chat-list/chat-list.module').then(
                (m) => m.ChatListPageModule
              ),
          },
          {
            path: 'view/:id',
            loadChildren: () =>
              import('./chat/chat-view/chat-view.module').then(
                (m) => m.ChatViewPageModule
              ),
          },
        ],
      },
      {
        path: 'notification',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './notification/notification-list/notification-list.module'
              ).then((m) => m.NotificationListPageModule),
          },
          {
            path: 'view',
            loadChildren: () =>
              import(
                './notification/notification-view/notification-view.module'
              ).then((m) => m.NotificationViewPageModule),
          },
        ],
      },
      {
        path: 'setting',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../privates/setting/setting.module').then(
                (m) => m.SettingPageModule
              ),
          },
        ],
      },
      {
        path: 'score',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../privates/score/score.module').then(
                (m) => m.ScorePageModule
              ),
          }
        ]
      },
      {
        path: 'wallet',
        loadChildren: () => import('../privates/wallet/wallet.module').then(m => m.WalletPageModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../privates/user/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: 'userGate',
        loadChildren: () => import('./home/userGate/user-gate-list/user-gate-list.module').then(m => m.UserGateListPageModule)
      },
      {
        path: 'classroom',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./classroom/classroom.module').then(
                (m) => m.ClassroomPageModule
              ),
          },
          {
            path: 'student',
            children: [
              {
                path: 'reference/:id',
                loadChildren: () =>
                  import('./classroom/student/reference/reference.module').then(
                    (m) => m.ReferencePageModule
                  ),
              },
            ],
          },
          {
            path: 'teacher',
            children: [
              {
                path: 'reference',
                loadChildren: () =>
                  import(
                    './classroom/teacher/reference/reference-list/reference-list.module'
                  ).then((m) => m.ReferenceListPageModule),
              },
              {
                path: ':id',
                loadChildren: () =>
                  import(
                    './classroom/teacher/reference/reference-view/reference-view.module'
                  ).then((m) => m.ReferenceViewPageModule),
              },
              {
                path: 'studentList',
                loadChildren: () =>
                  import(
                    './classroom/teacher/student-list/student-list.module'
                  ).then((m) => m.StudentListPageModule),
              },
            ],
          },
        ],
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
