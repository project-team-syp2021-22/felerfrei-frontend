import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../authprovider";
import { API_URL } from "../constants";

function AdminPage({ t, children }) {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(true);

  let router = useRouter();
  useEffect(async () => {
    await axios
      .get(`${API_URL}/auth/isAdmin`, {
        headers: { Authorization: `Bearer ${userToken.token}` },
      })
      .catch((err) => {
        router.push("/");
      });
    setLoading(false);
  }, []);
  if (!userToken) {
    return <div>You are not logged in</div>;
  }



  return (
    <div>
      {loading && (<div className="mt-5">Loading...</div>)}
      {!loading && children}
    </div>
  );
}

export default AdminPage;

export async function redirectIfNotAdmin(token) {
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      },
      props: {

      },
    };
  }
  return await axios.get(`${API_URL}/auth/isAdmin`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(_ => {
      return {
        props: {
        },
      };
    })
    .catch(_ => {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        },
        props: {

        },
      };
    });
}