import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import Checkbox from "./Checkbox/Checkbox";
import api from "../api";
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState(18);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //================FUNCTIONS==================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreeToTerms) {
      setRegistering(true);
      const user = await api
        .post("auth/register", {
          firstName,
          lastName,
          email,
          age,
          phone,
          address,
          password,
        })
        .catch((err) => {
          setError(true);
          setErrorMessage(err.response.data);
        });
      if (user) {
        window.location.href = "/";
      }
      setRegistering(false);
    } else {
      setError(true);
    }
  };
  return (
    <div className="mt-3 w-full">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label htmlFor="firstname">FirstName:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          className="p-2 outline-none border-[1px]"
          required
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">LastName:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          required
          min={18}
          value={age ? age : 0}
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setAge(e.target.value)}
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          required
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div>
          {error && <span className="text-red-500">{errorMessage}</span>}
        </div>
        <label htmlFor="confirmPassword">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="p-2 outline-none border-[1px]"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <Checkbox
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
          />
          <a href="#" className="text-sm text-gray-500">
            Agree to Terms and Policies
          </a>
        </div>
        <div>
          {!agreeToTerms && (
            <span className="text-red-500">You must agree to our terms</span>
          )}
        </div>
        <PrimaryButton type="submit">
          {registering ? "Registering..." : "Create Account"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default Register;
