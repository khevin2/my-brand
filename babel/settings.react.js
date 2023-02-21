"use strict";

// import { SettingsContainer } from "./components/SettingsContainer.js";
// import { SettingsNav } from "./components/SettingsNav.js";
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function SettingsApp() {
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showAccount = _React$useState2[0],
    setShowAccount = _React$useState2[1];
  function showEditAccountFn() {
    setShowAccount(true);
    handleMenuClick();
  }
  function showPasswordFn() {
    setShowAccount(false);
    handleMenuClick();
  }
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showMenu = _React$useState4[0],
    setShowMenu = _React$useState4[1];
  var handleMenuClick = function handleMenuClick() {
    setShowMenu(!showMenu);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-react-container"
  }, /*#__PURE__*/React.createElement(SettingsNav, {
    show: showAccount,
    showAccountProp: showEditAccountFn,
    showPasswordProp: showPasswordFn,
    showMenu: showMenu,
    handleMenuClick: handleMenuClick
  }), /*#__PURE__*/React.createElement(SettingsContainer, {
    show: showAccount,
    handleMenuClick: handleMenuClick,
    showMenu: showMenu
  }));
}
var rootNode = document.getElementById("settings-root");
var root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(SettingsApp));
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
function SettingsContainer(_ref2) {
  var show = _ref2.show,
    handleMenuClick = _ref2.handleMenuClick,
    showMenu = _ref2.showMenu;
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-container"
  }, /*#__PURE__*/React.createElement(SettingsProfile, {
    show: show
  }), /*#__PURE__*/React.createElement(SettingsChangePassword, {
    show: show
  }), /*#__PURE__*/React.createElement(SettingsMenu, {
    handleMenuClick: handleMenuClick,
    showMenu: showMenu
  }));
}
function SettingsProfile(_ref3) {
  var show = _ref3.show;
  return /*#__PURE__*/React.createElement("form", {
    className: "settings-profile ".concat(show ? "" : "d-nonne"),
    id: "settings-profile"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "settings-header"
  }, "Edit Account"), /*#__PURE__*/React.createElement("div", {
    className: "settings-profile-container"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("img", {
    src: "",
    id: "settings-user-img",
    alt: "profile picture"
  }), /*#__PURE__*/React.createElement("div", {
    className: "setting-add-img"
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "photo",
    className: "d-nonne"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "login"
  }, "Save")), /*#__PURE__*/React.createElement("div", {
    className: "settings-input-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "names",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.9998 4.66663C15.2375 4.66663 16.4245 5.15829 17.2997 6.03346C18.1748 6.90863 18.6665 8.09562 18.6665 9.33329C18.6665 10.571 18.1748 11.758 17.2997 12.6331C16.4245 13.5083 15.2375 14 13.9998 14C12.7622 14 11.5752 13.5083 10.7 12.6331C9.82484 11.758 9.33317 10.571 9.33317 9.33329C9.33317 8.09562 9.82484 6.90863 10.7 6.03346C11.5752 5.15829 12.7622 4.66663 13.9998 4.66663ZM13.9998 16.3333C19.1565 16.3333 23.3332 18.4216 23.3332 21V23.3333H4.6665V21C4.6665 18.4216 8.84317 16.3333 13.9998 16.3333Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "names",
    id: "",
    placeholder: "Names"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 8L12 13L4 8V6L12 11L20 6M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 4.89 21.1 4 20 4Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    id: "",
    placeholder: "Email"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "phone",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 35 35",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9.65417 15.7354C11.7542 19.8625 15.1375 23.2458 19.2646 25.3458L22.4729 22.1375C22.8813 21.7292 23.45 21.6125 23.9604 21.7729C25.5938 22.3125 27.3438 22.6042 29.1667 22.6042C29.5534 22.6042 29.9244 22.7578 30.1979 23.0313C30.4714 23.3048 30.625 23.6757 30.625 24.0625V29.1667C30.625 29.5534 30.4714 29.9244 30.1979 30.1979C29.9244 30.4714 29.5534 30.625 29.1667 30.625C22.5915 30.625 16.2857 28.013 11.6363 23.3637C6.98697 18.7143 4.375 12.4085 4.375 5.83333C4.375 5.44656 4.52865 5.07563 4.80214 4.80214C5.07563 4.52865 5.44656 4.375 5.83333 4.375H10.9375C11.3243 4.375 11.6952 4.52865 11.9687 4.80214C12.2422 5.07563 12.3958 5.44656 12.3958 5.83333C12.3958 7.65625 12.6875 9.40625 13.2271 11.0396C13.3875 11.55 13.2708 12.1188 12.8625 12.5271L9.65417 15.7354Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    name: "phone",
    id: "",
    placeholder: "Phone Number"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "dob",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11.5 0.5C12 0.75 13 2.4 13 3.5C13 4.6 12.33 5 11.5 5C10.67 5 10 4.85 10 3.75C10 2.65 11 2 11.5 0.5ZM18.5 9C21 9 23 11 23 13.5C23 15.06 22.21 16.43 21 17.24V23H12H3V17.24C1.79 16.43 1 15.06 1 13.5C1 11 3 9 5.5 9H10V6H13V9H18.5ZM12 16C12.663 16 13.2989 15.7366 13.7678 15.2678C14.2366 14.7989 14.5 14.163 14.5 13.5H16C16 14.163 16.2634 14.7989 16.7322 15.2678C17.2011 15.7366 17.837 16 18.5 16C19.163 16 19.7989 15.7366 20.2678 15.2678C20.7366 14.7989 21 14.163 21 13.5C21 12.837 20.7366 12.2011 20.2678 11.7322C19.7989 11.2634 19.163 11 18.5 11H5.5C4.83696 11 4.20107 11.2634 3.73223 11.7322C3.26339 12.2011 3 12.837 3 13.5C3 14.163 3.26339 14.7989 3.73223 15.2678C4.20107 15.7366 4.83696 16 5.5 16C6.16304 16 6.79893 15.7366 7.26777 15.2678C7.73661 14.7989 8 14.163 8 13.5H9.5C9.5 14.163 9.76339 14.7989 10.2322 15.2678C10.7011 15.7366 11.337 16 12 16Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "dob",
    id: "",
    placeholder: "Birth Date"
  }))));
}
function SettingsChangePassword(_ref4) {
  var show = _ref4.show;
  return /*#__PURE__*/React.createElement("form", {
    className: "settings-change-password ".concat(show ? "d-nonne" : ""),
    id: "settings-change-password-tab"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "settings-change-password-header",
    style: {
      marginTop: "63px"
    }
  }, "Change Password"), /*#__PURE__*/React.createElement("div", {
    className: "settings-input-group",
    style: {
      marginTop: "68px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "currentpwd",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "currentpwd",
    id: "",
    placeholder: "Current Password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "newpwd",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "newpwd",
    id: "",
    placeholder: "New Password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "confirmpwd",
    className: ""
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z",
    fill: "#2F80ED"
  }))), /*#__PURE__*/React.createElement("input", {
    type: "password",
    name: "confirmpwd",
    id: "",
    placeholder: "Re-enter New Password"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "login",
    style: {
      alignSelf: "center",
      marginTop: "40px"
    }
  }, "Save"));
}
function SettingsMenu(_ref5) {
  var handleMenuClick = _ref5.handleMenuClick,
    showMenu = _ref5.showMenu;
  var classlist = "bx ".concat(showMenu ? "bx-x-circle" : "bx-menu", " bx-md");
  return /*#__PURE__*/React.createElement("div", {
    className: "settings-menu"
  }, /*#__PURE__*/React.createElement("button", {
    className: "settings-menu-btn",
    onClick: handleMenuClick
  }, /*#__PURE__*/React.createElement("i", {
    className: classlist
  })));
}
function Input(_ref6) {
  var settings = _ref6.settings;
  var placeholder = settings.placeholder,
    svg = settings.svg,
    type = settings.type,
    name = settings.name;
  return /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: name,
    className: ""
  }, svg), /*#__PURE__*/React.createElement("input", {
    type: type,
    name: name,
    id: "",
    placeholder: placeholder
  }));
}