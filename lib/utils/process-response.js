export default function processResponse(response) {
  let isOk = response.ok;

  return response
    .text()
    .then(
      body => {
        let jsonBody;

        try {
          jsonBody = JSON.parse(body);
        } catch (error) {
          if (isOk) {
            isOk = false;
          }
        }
        console.log(jsonBody, response);

        if (isOk) {
          return jsonBody;
        }

        throw new Error({ ...jsonBody, statusCode: response.status });
      }
    );
}
