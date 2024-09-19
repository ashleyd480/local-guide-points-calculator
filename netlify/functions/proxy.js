import fetch from 'node-fetch';

const handler = async (event) => {
    const targetUrl = `https://www.google.com${event.path.replace('/.netlify/functions/proxy', '')}`;

    try {
        const response = await fetch(targetUrl, {
            method: event.httpMethod,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
                'Access-Control-Allow-Origin': '*', // Allow all origins
            },
        });

        const data = await response.text(); // Or response.json() depending on what you're fetching

        return {
            statusCode: response.status,
            headers: {
                'Access-Control-Allow-Origin': '*', 
                // frontend is different origin than google 
                // this is intermediate proxy that makes call for us
                // * means even if original origin different we can still make call
                'Content-Type': response.headers.get('content-type'),
            },
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};