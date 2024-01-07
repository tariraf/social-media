// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const { headers } = req;
    const {id} = req.query
    const response = await (await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`, {
      method : "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': headers['authorization'],
      }
    })).json()
    res.status(200).json({...response})
  }
  