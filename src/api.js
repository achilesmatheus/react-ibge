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

export function UpdateLocation(body, token) {
  return {
    url: API_URL + '/v2/ibge',
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        id: body.id,
        state: body.state,
        city: body.city,
      }),
    },
  };
}

export function DeleteLocation(id, token) {
  return {
    url: API_URL + '/v2/ibge?id=' + id,
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GetLocations(token, skip, take) {
  return {
    url: API_URL + '/v2/ibge?' + `skip=${skip}&take=${take}`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GetLocationByCode(token, code) {
  return {
    url: API_URL + '/v2/ibge/city/code/' + code,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function GetLocationByState(token, state) {
  return {
    url: API_URL + '/v2/ibge/state/' + state,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}
