# idrn_client

A permset-enabled single-page application scaffolded by the [bookins.io](https://bookins.io) PaaS provisioner for `https://idrn.bookins.io`.

It uses the **Bookins.io PermSet Protocol** for zero-PII identity and sybil-resistant authorization:
1. **Public Humanity (`amihuman`):** Verifies a real human stands behind the handle across all Grokism ecosystem apps.
2. **Origin-Scoped Private PermSet (`https://idrn.bookins.io`):** Disclosed **only** to `https://idrn.bookins.io` and never to any other site.
3. **Zero PII in the App:** Name, email, and street address remain inside the isolated Bookins vault.

---

## 1. Clone & Customize Locally

```bash
git clone https://github.com/rob-grokism/idrn.git
cd idrn
npm install
npm start
```

Open `http://localhost:4200` in your browser to preview your changes locally.

---

## 2. What You Can Edit vs. Protected PermSet Protocol Files

### Safe to Customize Freely
- `src/app/pages/landing.component.ts` — Public landing page content and layout
- `src/app/pages/home.component.ts` — Protected member workspace / dashboard UI
- `src/styles.css` — Colors, typography, and custom styling
- Any new components, services, or routes you add under `src/app/`

### Protected Core (Do Not Remove or Bypass)
The GitHub Actions build pipeline (`.github/workflows/deploy.yml`) automatically verifies that the Bookins PermSet login and route guards remain intact before building the container image:
- `src/app/guards/private-permset.guard.ts` & `src/app/guards/amihuman.guard.ts` — Route guards enforcing public humanity + private origin-scoped PermSets
- `src/app/permset.service.ts` — Selective disclosure evaluator (`https://grokism.io/permsets`)
- `src/app/membership.service.ts` & `src/app/pages/join.component.ts` — Self-service **"Become a Member"** (`/join`) flow
- `src/app/app.component.ts` — Top-right **Your Credentials** header dropdown and `loginWithRedirect` / `logout` handlers

---

## 3. How to Deploy Your Changes to the Bookins.io Kubernetes Cluster

You do **not** need Kubernetes credentials or cluster secrets on your local machine to deploy:

1. **Commit and push your changes to `main`:**
   ```bash
   git add .
   git commit -m "Customize member dashboard UI"
   git push origin main
   ```
2. **Automated Container Build (GitHub Actions):**
   Pushing to `main` automatically runs `.github/workflows/deploy.yml`, which verifies the PermSet guards and pushes the compiled container image `ghcr.io/rob-grokism/idrn-fe:latest` using GitHub's built-in token.
3. **One-Click Cluster Rollout in `bookins.io`:**
   Log into your organization dashboard at [https://bookins.io](https://bookins.io), scroll to **Provisioned Organization Apps**, and click **"Deploy Latest from GitHub"**. Bookins will pull your newly built image into the K3s cluster and roll out your updated site at `https://idrn.bookins.io` with zero downtime.
