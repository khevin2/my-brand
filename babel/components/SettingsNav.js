"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SettingsNav;
function SettingsNav(_ref) {
  var showAccountProp = _ref.showAccountProp,
    showPasswordProp = _ref.showPasswordProp,
    showMenu = _ref.showMenu,
    handleMenuClick = _ref.handleMenuClick;
  function handleClick(e) {
    var id = e.target.id;
    if (id == "settings-edit-user-btn") showAccountProp();
    if (id == "settings-edit-password-btn") showPasswordProp();
    if (id == "settings-signout-btn") handleSignout();
  }
  function handleSignout() {
    sessionStorage.clear();
    window.location = "/login.html";
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-nav ".concat(showMenu ? "" : "d-sm-none"),
    onBlur: handleMenuClick
  }, /*#__PURE__*/React.createElement("ul", {
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("li", {
    id: "settings-edit-user-btn"
  }, "Edit Account"), /*#__PURE__*/React.createElement("li", {
    id: "settings-edit-password-btn"
  }, "Change Password"), /*#__PURE__*/React.createElement("li", {
    id: "settings-signout-btn"
  }, "Sign Out")));
}