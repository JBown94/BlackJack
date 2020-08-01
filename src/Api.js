const Api = {
    getResourceFromUrl: url => {
        const promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();

            request.onreadystatechange = () => {
                if (request.readyState === XMLHttpRequest.DONE) { 
                    switch (request.status) {
                        case 200: {
                            resolve(request.responseText);
                            break;
                        }
                        default: {
                            reject(request.status, request);
                        }
                    }
                }
            };

            request.open("GET", url, true);
            request.send();
        });

        return promise;
    }
  }

export default Api;
