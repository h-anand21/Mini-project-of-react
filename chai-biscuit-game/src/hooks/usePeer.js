import { useState, useEffect, useRef, useCallback } from 'react';

export const usePeer = (onReceiveData) => {
  const [peerId, setPeerId] = useState(null);
  const [status, setStatus] = useState('disconnected'); // disconnected, hosting, connecting, connected
  const [isHost, setIsHost] = useState(false);
  const peerRef = useRef(null);
  const connRef = useRef(null);

  const callbackRef = useRef(onReceiveData);
  useEffect(() => {
    callbackRef.current = onReceiveData;
  }, [onReceiveData]);

  const initHost = useCallback(() => {
    setStatus('hosting');
    // Generate a unique 6-character room ID
    const newId = 'chai-biscuit-' + Math.random().toString(36).substr(2, 6);
    const peer = new window.Peer(newId);
    
    peer.on('open', (id) => {
      setPeerId(id);
      setIsHost(true);
    });

    peer.on('connection', (conn) => {
      connRef.current = conn;
      setStatus('connected');
      
      conn.on('data', (data) => {
        if (callbackRef.current) callbackRef.current(data);
      });
      
      conn.on('close', () => setStatus('disconnected'));
    });

    peer.on('error', (err) => {
      console.error('PeerJS Error:', err);
      setStatus('disconnected');
    });
    
    peerRef.current = peer;
  }, []);

  const joinGame = useCallback((targetId) => {
    setStatus('connecting');
    const peer = new window.Peer();
    
    peer.on('open', () => {
      const conn = peer.connect(targetId);
      connRef.current = conn;
      
      conn.on('open', () => {
        setStatus('connected');
        setIsHost(false);
      });
      
      conn.on('data', (data) => {
        if (callbackRef.current) callbackRef.current(data);
      });
      
      conn.on('close', () => setStatus('disconnected'));
    });

    peer.on('error', (err) => {
      console.error('PeerJS Error:', err);
      setStatus('disconnected');
    });
    
    peerRef.current = peer;
  }, []);

  const sendData = useCallback((data) => {
    if (connRef.current && status === 'connected') {
      connRef.current.send(data);
    }
  }, [status]);
  
  const disconnect = useCallback(() => {
    if (connRef.current) connRef.current.close();
    if (peerRef.current) peerRef.current.destroy();
    setStatus('disconnected');
    setIsHost(false);
    setPeerId(null);
  }, []);

  return { peerId, status, isHost, initHost, joinGame, sendData, disconnect };
};
