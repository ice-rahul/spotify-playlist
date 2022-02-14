// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data, List } from '../../types/Playlist';


var client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
var client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;
const playListURL = process.env.NEXT_PUBLIC_FEATURED_PLAYLIST || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const responseRAW = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
  const response = await responseRAW.json();
  if(response.error){
    res.status(400).json(response)
  }
  const { access_token } = response;

  const listRAW = await fetch(playListURL, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  })
  const list:List = await listRAW.json();
  res.status(200).json(list.playlists.items)
}
