export function Navbar_guest() {
  return `<a href="/register">Register</a>
  <a href="/login">Login</a>`;
}

export function Navbar_authUser() {
  return `<a href="/">Home</a>
  <a class="new-information">Notification<span class="info-icon"></span></a>
  <a class="reset-score">Reset Score</a>
  <a href="/reset-password">Reset Password</a>
  <a class="log-out">Log-Out</a>
  <a href="/delete-account">Delete Account</a>`;
}
