import React from "react";


const DemoVideo = () => (
    <div>
    <h3>Demo Video</h3>
        <p> Here's a quick demo on how to use the tool. </p>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/8HG23q-J09o?si=ft0n9gPNlNjBm82x" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      ></iframe>
     
  </div>
);

export default DemoVideo;
