/**
 * Created by yuqian on 2018/11/24.
 */
let fakeSlowNetwork;

(function() {
  let lsKey = 'fake-slow-network';
  let networkFakeDiv = document.querySelector('.network-fake');
  let checkbox = networkFakeDiv.querySelector('input');

  fakeSlowNetwork = Number(localStorage.getItem(lsKey)) || 0;

  networkFakeDiv.style.display = 'block';
  checkbox.checked = !!fakeSlowNetwork;

  checkbox.addEventListener('change', function() {
    localStorage.setItem(lsKey, Number(checkbox.checked));
    location.reload();
  });
}());

export function spawn(generatorFunc) {
  function continuer(verb, arg) {
    let result;
    try {
      result = generator[verb](arg);
    } catch (err) {
      return Promise.reject(err);
    }
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(callback, errback);
    }
  }
  let generator = generatorFunc();
  let callback = continuer.bind(continuer, "next");
  let errback = continuer.bind(continuer, "throw");
  return callback();
}

export function wait(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

export function get(url) {
  // Return a new promise.
  // We do all the work within the constructor callback.
  let fakeNetworkWait = wait(3000 * Math.random() * fakeSlowNetwork);

  let requestPromise = new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    let req = new XMLHttpRequest();
    req.open('get', url);

    req.onload = function() {
      // 'load' triggers for 404s etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });

  return Promise.all([fakeNetworkWait, requestPromise]).then(function(results) {
    return results[1];
  });
}

export function getJson(url) {
  return get(url).then(JSON.parse);
}

export function getSync(url) {
  let startTime = Date.now();
  let waitTime = 3000 * Math.random() * fakeSlowNetwork;

  let req = new XMLHttpRequest();
  req.open('get', url, false);
  req.send();

  while (waitTime > Date.now() - startTime);

  if (req.status == 200) {
    return req.response;
  }
  else {
    throw Error(req.statusText || "Request failed");
  }
}

export function getJsonSync(url) {
  return JSON.parse(getSync(url));
}

export function getJsonCallback(url, callback) {
  getJson(url).then(function(response) {
    callback(undefined, response);
  }, function(err) {
    callback(err);
  });
}

let storyDiv = document.querySelector('.story');

export function addHtmlToPage(content) {
  let div = document.createElement('div');
  div.innerHTML = content;
  storyDiv.appendChild(div);
}

export function addTextToPage(content) {
  let p = document.createElement('p');
  p.textContent = content;
  storyDiv.appendChild(p);
}
