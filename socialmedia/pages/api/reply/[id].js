export default async function handler(req, res) {
    const { headers } = req;
    const {id} = req.query
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`, {
        headers: {
          'Authorization': headers['authorization'],
        },
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
  