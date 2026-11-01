/**
 * Google Apps Script Web App that emails contact-form submissions
 * to the script owner's own Gmail — no email address is ever
 * hardcoded here or exposed on the website.
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

  MailApp.sendEmail({
    to: Session.getEffectiveUser().getEmail(),
    subject: 'Portfolio contact form: ' + name,
    body: 'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message,
    replyTo: email
  });

  return ContentService.createTextOutput('ok');
}
