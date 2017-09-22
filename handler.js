'use strict';
const https = require('https');

module.exports.apps = (event, context, callback) => {
  let request = {
        host: 'api-develop.aevi-test.io',
        headers: {'user-agent': 'AlexaSkill/0.1'},
        path: '/api/public/marketplace'
    };

    https.get(request, res => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
            body = JSON.parse(body);

            callback(null, {
                version: '1.0',
                response: {
                    outputSpeech: {
                        type: 'PlainText',
                        text: `There are ${body.total} apps available. They are: ${body.list.map((item) => {
                            return `${item.name} by ${item.partner.name}. `
                        })}`,
                    },
                    shouldEndSession: true,
                },
            });
        });
    });
};
