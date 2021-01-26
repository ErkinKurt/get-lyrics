import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useProviderAuth from "../../contexts/authContext/useProviderAuth";

const AuthRedirect = () => {
  const { signin } = useProviderAuth();
  const history = useHistory();

  useEffect(() => {
    signin();
    history.push('/');
  }, [history, signin]);
  return (
    <div>
      <h1>Redirecting</h1>
    </div>
  );
};

export default AuthRedirect;
