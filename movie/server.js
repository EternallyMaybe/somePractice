var request = require('request');

request('https://movie.douban.com', (err, response, body) => {
    console.log('err:', err);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
})
