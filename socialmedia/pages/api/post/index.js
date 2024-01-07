export default async function handler(req, res) {
    const { headers } = req;
  
    try {
      const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all", {
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
  