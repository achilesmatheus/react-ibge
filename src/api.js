export const API_URL = 'https://ibge-challenge.azurewebsites.net';

export function LoginUser(body) {
  return {
    url: API_URL + '/v2/user/login',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: {
          address: body.email,
        },
        password: {
          password: body.password,
        },
      }),
    },
  };
}

export function SignupUser(body) {
  return {
    url: API_URL + '/v2/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        email: {
          address: body.email,
        },
        password: {
          password: body.password,
        },
      }),
    },
  };
}

export function CreateLocation(body, token) {
  return {
    url: API_URL + '/v2/ibge',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        state: body.state,
        city: body.city,
      }),
    },
  };
}
