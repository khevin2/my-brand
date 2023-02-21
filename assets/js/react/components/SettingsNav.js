export default function SettingsNav({
  showAccountProp,
  showPasswordProp,
  showMenu,
  handleMenuClick,
}) {
  function handleClick(e) {
    const id = e.target.id;
    if (id == "settings-edit-user-btn") showAccountProp();
    if (id == "settings-edit-password-btn") showPasswordProp();
    if (id == "settings-signout-btn") handleSignout();
  }

  function handleSignout() {
    sessionStorage.clear();
    window.location = "/login.html";
  }
  return (
    <div
      className={`settings-nav ${showMenu ? "" : "d-sm-none"}`}
      onBlur={handleMenuClick}
    >
      <ul onClick={handleClick}>
        <li id="settings-edit-user-btn">Edit Account</li>
        <li id="settings-edit-password-btn">Change Password</li>
        <li id="settings-signout-btn">Sign Out</li>
      </ul>
    </div>
  );
}
