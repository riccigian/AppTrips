import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'trips',
    loadChildren: () =>
      import('./features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'trips/:id',
    loadChildren: () =>
      import('./features/detail-page/detail-page.module').then(
        (m) => m.DetailPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'trips',
    pathMatch: 'full',
  },
];

@NgModule({
  providers: [],
  imports: [
    RouterModule.forRoot(routes, {
      // Tell the router to use the HashLocationStrategy.
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
