import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { PermsetService } from '../permset.service';
import { OrgConfigService } from '../org-config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="card" *ngIf="orgConfig.config$ | async as cfg">
      <div class="eyebrow">Origin-Verified Member Session · {{ cfg.origin }}</div>
      <h2>{{ cfg.appName }} — Protected Member Workspace</h2>
      <p class="muted" *ngIf="auth.user$ | async as user">
        Authenticated Handle: <strong>&#64;{{ user.nickname || user.name || user.sub }}</strong>
        &mdash; click your handle in the top-right header at any time to inspect your disclosed
        credentials.
      </p>

      <ng-container *ngIf="permsets.access$ | async as evalState">
        <h3>Private — Disclosed Only to This App ({{ evalState.origin }})</h3>
        <p class="muted" *ngIf="evalState.originPrivatePermsets.length === 0">
          No private permsets disclosed for this origin.
        </p>
        <ul>
          <li *ngFor="let p of evalState.originPrivatePermsets">
            <code>{{ p.permset }}</code>
            <span class="tag tag-private" style="margin-left:8px">
              {{ cfg.orgName | lowercase }} · private
            </span>
            <span class="muted" *ngIf="p.description"> &mdash; {{ p.description }}</span>
          </li>
        </ul>

        <h3>Public — Visible Across the Grokism Ecosystem</h3>
        <p class="muted" *ngIf="evalState.publicPermsets.length === 0">None.</p>
        <ul>
          <li *ngFor="let p of evalState.publicPermsets">
            <code>{{ p.permset }}</code>
            <span class="tag tag-public" style="margin-left:8px">amihuman · human verified</span>
            <span class="muted" *ngIf="p.description"> &mdash; {{ p.description }}</span>
          </li>
        </ul>
      </ng-container>
    </div>
  `,
})
export class HomeComponent {
  constructor(
    public auth: AuthService,
    public permsets: PermsetService,
    public orgConfig: OrgConfigService
  ) {}
}
