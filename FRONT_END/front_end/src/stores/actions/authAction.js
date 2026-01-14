const SERVER = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function req(path, options = {}) {
  return fetch(SERVER + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  }).then(async (ret) => {
    if (!ret.ok) throw await ret.text();
    return ret.json();
  });
}

function endPointInFunctieDeRol(role) {
  let list = "/authors";
  let create = "/author";

  if (role === "REVIEWER") {
    list = "/reviewers";
    create = "/reviewer";
  }
  if (role === "ORGANISER") {
    list = "/organisers";
    create = "/organiser";
  }

  return { list, create };
}

// export function login(role, fullName, email) {
//   const work = async () => {
//     const { list, create } = endPointInFunctieDeRol(role);

//     const users = await req(list);
//     const existing = (users || []).find(
//       (u) => (u.email || "").toLowerCase() === email.toLowerCase()
//     );

//     if (existing) return existing;

//     const created = await req(create, {
//       method: "POST",
//       body: JSON.stringify({ email }),
//     });

//     return created.data || created;
//   };

//   return {
//     type: "AUTH_LOGIN",
//     payload: work(),
//   };
// }

export function login(email) {
  return {
    type: "AUTH_LOGIN",
    payload: req("/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  };
}

export function registerUser({ fullName, email, role }) {
  const normalizedRole = (role || "").toUpperCase();
  const { create } = endPointInFunctieDeRol(normalizedRole);

  return {
    type: "AUTH_REGISTER",
    payload: req(create, {
      method: "POST",
      body: JSON.stringify({ fullName, email, role: normalizedRole }),
    }).then((ret) => ret.data || ret),
  };
}
