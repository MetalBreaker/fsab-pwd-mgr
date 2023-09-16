import { useState, useEffect } from "react";
import axios from "axios";
import Password from "./Password";

const Passwords = () => {
  const [passwords, setPasswords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function removePassword(id: string) {
    const newList = passwords.filter((pwd) => pwd._id !== id);

    axios.delete("http://localhost:8080/passwords/" + id)

    setPasswords(newList);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/passwords")
      .then(function (response) {
        // handle success
        setPasswords(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        setIsLoading(false);
      })
  }, []);

  return !isLoading ? passwords.map((password) => (
    <Password
      id={password._id}
      name={password.name}
      icon={password.icon}
      username={password.username}
      password={password.password}
      removePassword={removePassword}
    />
  )) : "Loading...";
};

export default Passwords;
