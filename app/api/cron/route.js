export async function POST() {
    let baseUrl = process.env.BASE_URL
    let result = await fetch(
      `${baseUrl}/api/sendemail`,
      {
        cache: 'no-store',
        method: "POST"
      },
    );
    console.log(result)
   
    return Response.json({ result }); 
  }