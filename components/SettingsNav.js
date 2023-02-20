"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsNav = SettingsNav;
function SettingsNav() {
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-nav"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
    id: "settings-edit-user-btn"
  }, "Edit Account"), /*#__PURE__*/React.createElement("li", {
    id: "settings-edit-password-btn"
  }, "Change Password"), /*#__PURE__*/React.createElement("li", {
    id: "settings-signout-btn"
  }, "Sign Out")));
}