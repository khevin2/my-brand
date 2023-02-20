"use strict";

// import { SettingsContainer } from "./components/SettingsContainer.js";
// import { SettingsNav } from "./components/SettingsNav.js";

function SettingsApp() {
  const [showAccount, setShowAccount] = React.useState(true);
  function showEditAccountFn() {
    setShowAccount(true);
    handleMenuClick();
  }
  function showPasswordFn() {
    setShowAccount(false);
    handleMenuClick();
  }

  const [showMenu, setShowMenu] = React.useState(false);
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="settings-react-container">
      <SettingsNav
        show={showAccount}
        showAccountProp={showEditAccountFn}
        showPasswordProp={showPasswordFn}
        showMenu={showMenu}
        handleMenuClick={handleMenuClick}
      />
      <SettingsContainer
        show={showAccount}
        handleMenuClick={handleMenuClick}
        showMenu={showMenu}
      />
    </div>
  );
}
const rootNode = document.getElementById("settings-root");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(SettingsApp));

function SettingsNav({
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

function SettingsContainer({ show, handleMenuClick, showMenu }) {
  return (
    <div className="settings-container">
      <SettingsProfile show={show} />
      <SettingsChangePassword show={show} />
      <SettingsMenu handleMenuClick={handleMenuClick} showMenu={showMenu} />
    </div>
  );
}

function SettingsProfile({ show }) {
  return (
    <form
      className={`settings-profile ${show ? "" : "d-nonne"}`}
      id="settings-profile"
    >
      <h3 className="settings-header">Edit Account</h3>
      <div className="settings-profile-container">
        <span>
          <img src="" id="settings-user-img" alt="profile picture" />
          <div className="setting-add-img"></div>
          <input type="file" name="photo" className="d-nonne" />
        </span>
        <button type="submit" className="login">
          Save
        </button>
      </div>
      <div className="settings-input-group">
        <div className="input">
          <label htmlFor="names" className="">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9998 4.66663C15.2375 4.66663 16.4245 5.15829 17.2997 6.03346C18.1748 6.90863 18.6665 8.09562 18.6665 9.33329C18.6665 10.571 18.1748 11.758 17.2997 12.6331C16.4245 13.5083 15.2375 14 13.9998 14C12.7622 14 11.5752 13.5083 10.7 12.6331C9.82484 11.758 9.33317 10.571 9.33317 9.33329C9.33317 8.09562 9.82484 6.90863 10.7 6.03346C11.5752 5.15829 12.7622 4.66663 13.9998 4.66663ZM13.9998 16.3333C19.1565 16.3333 23.3332 18.4216 23.3332 21V23.3333H4.6665V21C4.6665 18.4216 8.84317 16.3333 13.9998 16.3333Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input type="text" name="names" id="" placeholder="Names" />
        </div>
        <div className="input">
          <label htmlFor="email" className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 8L12 13L4 8V6L12 11L20 6M20 4H4C2.89 4 2 4.89 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 4.89 21.1 4 20 4Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input type="email" name="email" id="" placeholder="Email" />
        </div>
        <div className="input">
          <label htmlFor="phone" className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 35 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.65417 15.7354C11.7542 19.8625 15.1375 23.2458 19.2646 25.3458L22.4729 22.1375C22.8813 21.7292 23.45 21.6125 23.9604 21.7729C25.5938 22.3125 27.3438 22.6042 29.1667 22.6042C29.5534 22.6042 29.9244 22.7578 30.1979 23.0313C30.4714 23.3048 30.625 23.6757 30.625 24.0625V29.1667C30.625 29.5534 30.4714 29.9244 30.1979 30.1979C29.9244 30.4714 29.5534 30.625 29.1667 30.625C22.5915 30.625 16.2857 28.013 11.6363 23.3637C6.98697 18.7143 4.375 12.4085 4.375 5.83333C4.375 5.44656 4.52865 5.07563 4.80214 4.80214C5.07563 4.52865 5.44656 4.375 5.83333 4.375H10.9375C11.3243 4.375 11.6952 4.52865 11.9687 4.80214C12.2422 5.07563 12.3958 5.44656 12.3958 5.83333C12.3958 7.65625 12.6875 9.40625 13.2271 11.0396C13.3875 11.55 13.2708 12.1188 12.8625 12.5271L9.65417 15.7354Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input type="tel" name="phone" id="" placeholder="Phone Number" />
        </div>
        <div className="input">
          <label htmlFor="dob" className="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 0.5C12 0.75 13 2.4 13 3.5C13 4.6 12.33 5 11.5 5C10.67 5 10 4.85 10 3.75C10 2.65 11 2 11.5 0.5ZM18.5 9C21 9 23 11 23 13.5C23 15.06 22.21 16.43 21 17.24V23H12H3V17.24C1.79 16.43 1 15.06 1 13.5C1 11 3 9 5.5 9H10V6H13V9H18.5ZM12 16C12.663 16 13.2989 15.7366 13.7678 15.2678C14.2366 14.7989 14.5 14.163 14.5 13.5H16C16 14.163 16.2634 14.7989 16.7322 15.2678C17.2011 15.7366 17.837 16 18.5 16C19.163 16 19.7989 15.7366 20.2678 15.2678C20.7366 14.7989 21 14.163 21 13.5C21 12.837 20.7366 12.2011 20.2678 11.7322C19.7989 11.2634 19.163 11 18.5 11H5.5C4.83696 11 4.20107 11.2634 3.73223 11.7322C3.26339 12.2011 3 12.837 3 13.5C3 14.163 3.26339 14.7989 3.73223 15.2678C4.20107 15.7366 4.83696 16 5.5 16C6.16304 16 6.79893 15.7366 7.26777 15.2678C7.73661 14.7989 8 14.163 8 13.5H9.5C9.5 14.163 9.76339 14.7989 10.2322 15.2678C10.7011 15.7366 11.337 16 12 16Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input type="date" name="dob" id="" placeholder="Birth Date" />
        </div>
      </div>
    </form>
  );
}

function SettingsChangePassword({ show }) {
  return (
    <form
      className={`settings-change-password ${show ? "d-nonne" : ""}`}
      id="settings-change-password-tab"
    >
      <h3
        className="settings-change-password-header"
        style={{ marginTop: "63px" }}
      >
        Change Password
      </h3>
      <div className="settings-input-group" style={{ marginTop: "68px" }}>
        <div className="input">
          <label htmlFor="currentpwd" className="">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input
            type="password"
            name="currentpwd"
            id=""
            placeholder="Current Password"
          />
        </div>
        <div className="input">
          <label htmlFor="newpwd" className="">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input
            type="password"
            name="newpwd"
            id=""
            placeholder="New Password"
          />
        </div>
        <div className="input">
          <label htmlFor="confirmpwd" className="">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9996 19.8332C14.6184 19.8332 15.2119 19.5873 15.6495 19.1498C16.0871 18.7122 16.3329 18.1187 16.3329 17.4998C16.3329 16.2048 15.2829 15.1665 13.9996 15.1665C13.3808 15.1665 12.7873 15.4123 12.3497 15.8499C11.9121 16.2875 11.6663 16.881 11.6663 17.4998C11.6663 18.1187 11.9121 18.7122 12.3497 19.1498C12.7873 19.5873 13.3808 19.8332 13.9996 19.8332ZM20.9996 9.33317C21.6184 9.33317 22.2119 9.579 22.6495 10.0166C23.0871 10.4542 23.3329 11.0477 23.3329 11.6665V23.3332C23.3329 23.952 23.0871 24.5455 22.6495 24.9831C22.2119 25.4207 21.6184 25.6665 20.9996 25.6665H6.99959C6.38075 25.6665 5.78726 25.4207 5.34968 24.9831C4.91209 24.5455 4.66626 23.952 4.66626 23.3332V11.6665C4.66626 10.3715 5.71626 9.33317 6.99959 9.33317H8.16626V6.99984C8.16626 5.45274 8.78084 3.96901 9.8748 2.87505C10.9688 1.78109 12.4525 1.1665 13.9996 1.1665C14.7656 1.1665 15.5242 1.31739 16.2319 1.61054C16.9396 1.90369 17.5827 2.33337 18.1244 2.87505C18.6661 3.41672 19.0957 4.05978 19.3889 4.76752C19.682 5.47525 19.8329 6.23379 19.8329 6.99984V9.33317H20.9996ZM13.9996 3.49984C13.0713 3.49984 12.1811 3.86859 11.5247 4.52496C10.8683 5.18134 10.4996 6.07158 10.4996 6.99984V9.33317H17.4996V6.99984C17.4996 6.07158 17.1308 5.18134 16.4745 4.52496C15.8181 3.86859 14.9279 3.49984 13.9996 3.49984Z"
                fill="#2F80ED"
              />
            </svg>
          </label>
          <input
            type="password"
            name="confirmpwd"
            id=""
            placeholder="Re-enter New Password"
          />
        </div>
      </div>
      <button
        type="submit"
        className="login"
        style={{ alignSelf: "center", marginTop: "40px" }}
      >
        Save
      </button>
    </form>
  );
}

function SettingsMenu({ handleMenuClick, showMenu }) {
  const classlist = `bx ${showMenu ? "bx-x-circle" : "bx-menu"} bx-md`;
  return (
    <div className="settings-menu">
      <button className="settings-menu-btn" onClick={handleMenuClick}>
        <i className={classlist}></i>
      </button>
    </div>
  );
}
