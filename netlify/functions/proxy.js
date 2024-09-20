// import fetch from 'node-fetch';


import axios from 'axios';

export const handler = async (event, context) => {
    const targetUrl = `https://www.google.com${event.path.replace('/.netlify/functions/proxy', '')}`;
  
    try {
      const response = await axios.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        },
      });
  
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow all origins
          'Content-Type': response.headers['content-type'],
        },
        body: JSON.stringify(response.data),
      };
    } catch (error) {
      console.error('Error fetching data:', error); // Log the error for debugging
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error fetching data', details: error.message }), // Include error details
      };
    }
  };

// const handler = async (event) => {
//     const targetUrl = `https://www.google.com${event.path.replace('/.netlify/functions/proxy', '')}`;

//     try {
//         const response = await fetch(targetUrl, {
//             method: event.httpMethod,
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
//                 'Access-Control-Allow-Origin': '*', // allow all origins
//             },
//         });

//         const data = await response.text(); 

//         return {
//             statusCode: response.status,
//             headers: {
//                 'Access-Control-Allow-Origin': '*', 
//                 // frontend is different origin than google 
//                 // this is intermediate proxy that makes call for us
//                 // * means even if original origin different we can still make call
//                 'Content-Type': response.headers.get('content-type'),
//             },
//             body: data,
//         };
//     } catch (error) {
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Failed to fetch data' }),
//         };
//     }
// };

// export default handler; 