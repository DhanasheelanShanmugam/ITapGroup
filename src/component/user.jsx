import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { ConstantLabel, generateUserId } from "../common/Common";
import "../styles/user.css";

const User = () => {
  const [userlist, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userData, setuserData] = useState({
    email: "",
    phoneNo: "",
    website: "",
  });

  const onSelectUser = (user) => {
    setCurrentUser(user.name);
    setuserData((prevState) => ({
      ...prevState,
      email: user.email,
      phoneNo: user.phone,
      website: user.website,
    }));
  };

  useEffect(() => {
    fetch(ConstantLabel.URL)
      .then((response) => {
        if (response.ok) {
          setUserList([]);
          return response.json();
        }
      })
      .then((responseJson) => {
        if (responseJson) {
          responseJson.map((item) => {
            setUserList((prevArray) => [
              ...prevArray,
              {
                name: item.username,
                id: generateUserId(),
                email: item.email,
                phone: item.phone,
                website: item.website,
              },
              {
                name: item.email,
                id: generateUserId(),
                email: item.email,
                phone: item.phone,
                website: item.website,
              },
            ]);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onClearUserData = () => {
    setCurrentUser("");
  };

  return (
    <div className="userContainer">
      <ReactSearchAutocomplete
        items={userlist}
        onSelect={onSelectUser}
        value={currentUser}
        autoFocus
        showIcon={false}
        placeholder="Search by username or email... "
        onClear={onClearUserData}
      />
      {userData.email && currentUser ? (
        <div className="userlistDataEmail">Email:{" " + userData.email}</div>
      ) : (
        ""
      )}
      {userData.phoneNo && currentUser ? (
        <div className="userlistData">Phone:{" " + userData.phoneNo}</div>
      ) : (
        ""
      )}
      {userData.website && currentUser ? (
        <div className="userlistData">Website:{" " + userData.website}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
