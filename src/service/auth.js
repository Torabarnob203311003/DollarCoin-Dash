export const login = async (payload) => {
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/login`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
     });

     const data = await res.json();
     return data;
};

export const forgot_password = async (payload) => {
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/forgot-password`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
     });
     const data = await res.json();
     return data;
};
export const reset_password = async (payload) => {
     const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/reset-password`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
     });

     const data = await res.json();
     return data;
};
