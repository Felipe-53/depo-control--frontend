/* An async function ALWAYS returns a promise. */
const fetchGetEndpoint = async (endpoint) => {

  /* Remember:
  1) localStorage.getItem('unknown') doesn't thow an error for
  unkown keys, but instead returns 'null'.
  2) the Promise returned by fetch only gets rejected in case
  of connexion problems.
  
  Given that, it's safe to assume the the following try block
  will only fail on connextion errors. */

  let response;
  try {
    response = await fetch(endpoint, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
    });
  } catch {
    throw Error('Problemas de conexão.')
  }
  
  /* If the execution got to this point, the fetch executed
  and got back a Response obj. */

  /* Every response with status different than 200 represents
  failure. The server still produces a response with the details
  of the error in the body of the request, in the 'message' key. */
  if (response.status !== 200) {
    /* Note that the server is not directly accessed by the client,
    but by a proxy middleware (be it Nginx in prodution or an Express
    proxy middleware in development) that is not programed to return
    json response. If the server is down, for instance, they will return
    a basic html page with a status code of either a 502 Bad Gateway [Nginx] or
    504 Gateway Timeout [Express middleware]. So we will look for these status
    codes and craft a the feedback messages ourselves. */
    if (response.status === 502 || response.status === 504) {
      throw Error('O servidor está adormecido.')
    }

    /* We will try to parse the json response */
    let badResponse_json;
    try {
      badResponse_json = await response.json()
    } catch {
      throw Error('O servidor retornou uma resposta inválida (not json)')
    }

    /* Get the message sent by the server */
    const message = badResponse_json['message'];

    throw Error(message);
  }

  let goodResponse_json;
  try {
    goodResponse_json = await response.json();
  } catch {
    throw Error('O servidor retornou uma resposta inválida (not json)')
  }

  /* Finally, if all other conditions were passed return the
  json data. */
  return goodResponse_json;
}


/* I might consider using the right HTTP methods later,
but for now, only POST will be used. */
const fetchPostEndpoint = async (endpoint, data) => {

  
  /* options obj of the fetch function */
  const options = {
    method: 'POST',
    
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(data),
  }

  let response;
  try {
    response = await fetch(endpoint, options);
  } catch (error) {
    throw Error('Problemas de conexão.')
  }
  
  /* If the execution got to this point, the fetch executed
  and got back a Response obj. */

  if (response.status !== 200) {
    /* Note that the server is not directly accessed by the client,
    but by a proxy middleware (be it Nginx in prodution or an Express
    proxy middleware in development) that is not programed to return
    json response. If the server is down, for instance, they will return
    a basic html page with a status code of either a 502 Bad Gateway [Nginx] or
    504 Gateway Timeout [Express middleware]. So we will look for these status
    codes and craft a the feedback messages ourselves. */
    if (response.status === 502 || response.status === 504) {
      throw Error('O servidor está adormecido.')
    }

    /* We will try to parse the json response */
    let badResponse_json;
    try {
      badResponse_json = await response.json()
    } catch {
      throw Error('O servidor retornou uma resposta inválida (not json)')
    }

    const message = badResponse_json['message'];

    throw Error(message);
  }

  let goodResponse_json;
  try {
    goodResponse_json = await response.json();
  } catch {
    throw Error('O servidor retornou uma resposta inválida (not json)')
  }


  /* Main difference between the get and post methods is
  that when using post, all the client wants is a feedback
  message to know if the action that was posted has had the
  desired effect. So we will always feedbak. Instead of
  defining the feedback message in the frontend (it had to
  passed as an arg to this func) we define it in the server
  for the case of POST endpoint, the feedback comming in the
  'message' key o the json obj. */

  const message = goodResponse_json['message'];
  return message;
}



/* The following code would be used if we were
to use service workers and https. */

/* helper: Connection Checker */
const hasConnection = async () => {
  /* fetch only reject on network failure or if
  anything prevented the request from completing. */
  try {
    await fetch('/api/connection_test');
    return true;
  }
  
  catch {
    return false;
  }
}

/* Can only use this code servering under HTTPS. */
const fetchConnAware = async (endpoint) => {

  const online = await hasConnection();

  const request = new Request(endpoint, {
    headers: {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
  });

  let cache = await caches.open('hey');

  let cachedResorce = await cache.match(request);

  if (online) {
    
    let response = await fetch(request);
    let response_copy = new Response(response);

    if (response.status !== 200) {

      let badResponse_json;
      try {
        badResponse_json = await response.json()
      } catch {
        throw Error('O servidor retornou uma resposta inválida (not json)')
      }

      const message = badResponse_json['message'];

      throw Error(message);
    }

    let fetchedResponse_json;
    try {
      fetchedResponse_json = await response.json();
    } catch {
      throw Error('O servidor retornou uma resposta inválida (not json)')
    }    

    if (cachedResorce) {
      
      let cachedResorce_json = await cachedResorce.json()

      if (fetchedResponse_json.length !== cachedResorce_json.length) {
        
        let deleted = await cache.delete(request);

        if (deleted) {
          cache.put(request, response_copy);
        }
      
      }
    
    }

    else {
      cache.put(request, response_copy);
    }

    return fetchedResponse_json;
  }

  if (cachedResorce) {

    const cachedResorce_json = await cachedResorce.json()

    return cachedResorce_json

  }

  throw Error('Sem conexão e sem dados salvos')
  
}

export {fetchGetEndpoint, fetchPostEndpoint, fetchConnAware};