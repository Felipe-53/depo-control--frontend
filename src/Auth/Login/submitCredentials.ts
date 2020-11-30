interface credentials {
  login: string,
  password: string
}

interface successfullResponse {
  jwt: string,
  role: string,
  message: string,
}

interface failedResponse {
  message: string
}

async function submitCredentials (endpoint: string, data: credentials) {

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });
  } catch {
    throw Error('Sem conexão com a internet');
  }
  
  let jsonResponse: failedResponse | successfullResponse ;

  try {
    jsonResponse = await response.json();
  } catch {
    throw Error('Houve um problema com o servidor')
  }

  if (response.status !== 200 ) {
    throw Error(jsonResponse.message);
  }

  return jsonResponse;
}

export default submitCredentials;
