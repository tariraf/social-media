// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const response = await (await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/register`, {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(req.body)
    })).json()
    res.status(201).json({...response})
  }
  