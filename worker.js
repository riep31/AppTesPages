export default {

  async fetch(request){

    const url =
    new URL(request.url);

    const target =
    url.searchParams.get("url");

    if(!target){

      return new Response(
        "Missing URL",
        { status:400 }
      );
    }

    try{

      const response =
      await fetch(target,{

        headers:{
          "User-Agent":
          "Mozilla/5.0 Mobile"
        }

      });

      const contentType =
      response.headers.get("content-type");

      const body =
      await response.text();

      return new Response(body,{

        status:200,

        headers:{

          "Content-Type":
          contentType || "text/html",

          "Access-Control-Allow-Origin":"*",

          "X-Frame-Options":"ALLOWALL",

          "Content-Security-Policy":
          "frame-ancestors *"
        }

      });

    }catch(err){

      return new Response(

        "Proxy Error: " + err.message,

        { status:500 }
      );
    }

  }

}
