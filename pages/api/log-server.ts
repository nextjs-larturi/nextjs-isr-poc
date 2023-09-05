import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const serverIpAddress = req.socket.localAddress;
    const serverPort = req.socket.localPort;
    
    return res.status(200).json({ message: `Servidor en IP: ${serverIpAddress}, Puerto: ${serverPort}` });
}
