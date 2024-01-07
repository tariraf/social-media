// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const {id} = req.query
    const { headers } = req;
    const response = await (await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`, {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': headers['authorization'],
      }
    })).json()
    res.status(201).json({...response})
}
  