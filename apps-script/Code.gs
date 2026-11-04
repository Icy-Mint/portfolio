/**
 * Google Apps Script Web App that emails contact-form submissions
 * to the script owner's own Gmail — no email address is ever
 * hardcoded here or exposed on the website.
 *
 * Shared across multiple sites/apps: each form includes a hidden
 * "source" field identifying which one it came from, so submissions
 * landing in the same inbox stay distinguishable.
 *
 * Setup: see README.md in the repo root.
 */
function doPost(e) {
  var params = e.parameter;

  // Honeypot: if filled in, silently drop (likely a bot).
  if (params._gotcha) {
    return ContentService.createTextOutput('ok');
  }

  var name = params.name || '(no name)';
  var email = params.email || '(no email)';
  var message = params.message || '';
  var source = params.source || 'unknown source';

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: 'Contact form [' + source + ']: ' + name,
    body: 'Source: ' + source + '\nName: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message,
    replyTo: email
  });

  return ContentService.createTextOutput('ok');
}
