export function Home() {
  return `<header>
  <h1 class="heading">Rock, Paper, Scissors</h1>
</header>
<section>
  <p>Pick one</p>
  <div class="input-selections">
    <div class="input-options">🧱</div>
    <div class="input-options">📃</div>
    <div class="input-options">✂️</div>
  </div>
</section>
<section>
  <div class="players-container">
    <div class="selection-container">
      <p class="player">You</p>
      <div class="selection"></div>
    </div>
    <p class="versus">vs</p>
    <div class="selection-container">
      <p class="player">Comp</p>
      <div class="selection"></div>
    </div>
  </div>
</section>
<section>
  <p id="result"></p>
  <button id="new-game">Play Again</button>
</section>`;
}

export function Login() {
  return `<form class="form sign-in">
  <div class="title">Welcome</div>
  <div class="subtitle">Login to play!</div>
  <div class="input-container ic1">
    <input
      id="email"
      class="input"
      type="email"
      placeholder=" "
      autocomplete="email"
      autofocus
      required
    />
    <div class="cut"></div>
    <label for="email" class="placeholder">Email</label>
  </div>
  <div class="input-container ic2">
    <input
      id="password"
      class="input"
      type="password"
      placeholder=" "
      autocomplete="current-password"
      minlength="8"
      maxlength="15"      
      required
    />
    <div class="cut"></div>
    <label for="password" class="placeholder">Password</label>
  </div>
  <div class="checkbox__container">
    <input type="checkbox" id="checkbox"/>
    <label class="checkbox" for="checkbox">Show Password</label>
  </div>
  <button type="submit" class="submit">submit</button>
</form>
<aside>
  <p><a href="/password-recovery">Forgot Password?</a></p>
  <p><a href="/register">Don't have an account? Register!</a></p>
</aside>`;
}

export function Register() {
  return `<form class="form sign-up">
  <div class="title">Welcome</div>
  <div class="subtitle">Create an account to play!</div>
  <div class="input-container ic1">
    <input
      id="username"
      class="input"
      type="text"
      placeholder=" "
      autocomplete="username"
      minlength="3"
      maxlength="15"   
      autofocus
      required
    />
    <div class="cut"></div>
    <label for="username" class="placeholder">Username</label>
  </div>
  <div class="input-container ic2">
    <input
      id="email"
      class="input"
      type="email"
      placeholder=" "
      autocomplete="email"
      required
    />
    <div class="cut cut-short"></div>
    <label for="email" class="placeholder">Email</label>
  </div>
  <div class="input-container ic2">
    <input
      id="new-password"
      class="input"
      type="password"
      placeholder=" "
      autocomplete="new-password"
      minlength="8"
      maxlength="15"      
      required
    />
    <div class="cut"></div>
    <label for="password" class="placeholder">Password</label>
  </div>
  <div class="checkbox__container">
    <input type="checkbox" id="checkbox"/>
    <label class="checkbox" for="checkbox">Show Password</label>
  </div>
  <button type="submit" class="submit">submit</button>
</form>
<aside>
  <p><a href="/login">Already have an account? Login!</a></p>
</aside>`;
}

export function ResetPassword() {
  return `<form class="form sign-in reset-password">
  <div class="subtitle">Reset Password</div>
  <div class="input-container ic1">
    <input
      id="email"
      class="input"
      type="email"
      placeholder=" "
      autocomplete="email"
      autofocus
      required
    />
    <div class="cut"></div>
    <label for="email" class="placeholder">Email</label>
  </div>
  <div class="input-container ic2">
    <input
      id="password"
      class="input"
      type="password"
      placeholder=" "
      autocomplete="current-password"
      minlength="8"
      maxlength="15"      
      required
    />
    <div class="cut"></div>
    <label for="password" class="placeholder">Current Password</label>
  </div>
  <div class="input-container ic2">
    <input
      id="new-password"
      class="input"
      type="password"
      placeholder=" "
      autocomplete="new-password"
      minlength="8"
      maxlength="15"      
      required
    />
    <div class="cut"></div>
    <label for="repeat-password" class="placeholder">New Password</label>
  </div>
  <div class="checkbox__container">
    <input type="checkbox" id="checkbox"/>
    <label class="checkbox" for="checkbox">Show Password(s)</label>
  </div>
  <button type="submit" class="submit">submit</button>
</form>
<aside>
  <p><a class="back-button">Go back</a></p>
</aside>`;
}

export function RecoverPassword() {
  return `<div class="recover-password-instructions">Receive an email to recover password</div>
  <form class="form recover-password">
  <div class="subtitle">Forgot Password ?</div>
  <div class="input-container ic1">
    <input
      id="email"
      class="input"
      type="email"
      placeholder=" "
      autocomplete="email"
      autofocus
      required
    />
    <div class="cut"></div>
    <label for="email" class="placeholder">Email</label>
  </div>
  <button type="submit" class="submit">Reset Password</button>
</form>
<aside>
  <p><a class="back-button">Go back</a></p>
</aside>`;
}

export function DeleteCurrentUser() {
  return `<div class="delete-instructions">This action is irreversible!!!</div>
  <div class="delete-instructions">Are you sure you wish to delete your account?</div>
  <form class="form sign-in delete-account">
  <div class="subtitle">Delete Account</div>
  <div class="input-container ic1">
    <input
      id="email"
      class="input"
      type="email"
      placeholder=" "
      autocomplete="email"
      autofocus
      required
    />
    <div class="cut"></div>
    <label for="email" class="placeholder">Email</label>
  </div>
  <div class="input-container ic2">
    <input
      id="password"
      class="input"
      type="password"
      placeholder=" "
      autocomplete="current-password"
      minlength="8"
      maxlength="15"      
      required
    />
    <div class="cut"></div>
    <label for="password" class="placeholder">Password</label>
  </div>
  <div class="checkbox__container">
    <input type="checkbox" id="checkbox"/>
    <label class="checkbox" for="checkbox">Show Password</label>
  </div>
  <button type="submit" class="submit">DELETE ACCOUNT</button>
</form>
<aside>
  <p><a class="back-button">Go back</a></p>
</aside>`;
}

export function NotFound() {
  return `<h1 class="not-found">404</h1>
<p class="not-found-text">Page Not Found</p>`;
}
