# Portfolio Site

A static personal portfolio listing projects and products, styled in an icy-mint light theme.
No name, photo, or personal contact details are shown anywhere on the page — the contact
form delivers messages without exposing an email address.

## Structure

```
index.html      Single-page site: Home, About, Projects, Products, Contact
css/style.css   Icy-mint light theme + layout
js/main.js      Mobile nav toggle, footer year, contact form submission
```

No build step — this is plain HTML/CSS/JS.

## Set up the contact form (Google Apps Script — no sign-ups required)

The form posts to a Google Apps Script Web App tied to your own Google account.
No third-party service, no account creation, and your email address is never
written anywhere in the code — the script just mails its own owner.

1. Go to [script.google.com](https://script.google.com) and create a new project.
2. Delete the default content and paste in the contents of [`apps-script/Code.gs`](apps-script/Code.gs).
3. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, authorize the script with your Google account when prompted, and copy the generated web app URL (ends in `/exec`).
5. In `index.html`, replace `YOUR_SCRIPT_ID` in the form's `action` attribute with that URL:
   ```html
   <form ... action="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" ...>
   ```
6. Submissions will now be emailed straight to your Gmail inbox (the Google account you deployed the script with).

Note: if you ever edit `Code.gs`, you need to deploy a **new version** (Deploy → Manage deployments → Edit → New version) for the changes to take effect at the same URL.

## Deploy with GitHub Pages

1. Push this repo to GitHub (already set up as the `origin` remote).
2. In the repo settings, go to **Pages** → set source to the `main` branch, root folder.
3. The site will be published at `https://<your-username>.github.io/<repo-name>/`.

## Editing content

- Projects/Products: edit the `<article class="card">` blocks in `index.html`.
- Tech stack tags: edit the `.tags` lists under the About section.
- Colors: adjust the CSS variables at the top of `css/style.css` (`:root`).
