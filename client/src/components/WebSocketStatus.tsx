import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface WebSocketStatusProps {
  showControls?: boolean;
}

/**
 * WebSocketStatus component that displays the current connection status
 * with the server's WebSocket endpoint and allows for reconnection.
 */
export default function WebSocketStatus({ showControls = false }: WebSocketStatusProps) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [messages, setMessages] = useState<{type: string; content: string; timestamp: string}[]>([]);
  const [latency, setLatency] = useState<number | null>(null);
  const [lastPingTime, setLastPingTime] = useState<number | null>(null);

  // Connect to WebSocket
  const connect = useCallback(() => {
    setStatus('connecting');
    
    // Determine correct WebSocket protocol (ws or wss) based on the current protocol
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // Create WebSocket URL with the current host and the /ws path
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    try {
      const newSocket = new WebSocket(wsUrl);
      
      // Set up event handlers
      newSocket.onopen = () => {
        setStatus('connected');
        setMessages(prev => [
          { type: 'system', content: 'Connected to server', timestamp: new Date().toISOString() },
          ...prev
        ]);
      };
      
      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle ping-pong for latency measurement
          if (data.type === 'pong' && lastPingTime) {
            const pingLatency = Date.now() - lastPingTime;
            setLatency(pingLatency);
            setLastPingTime(null);
            
            setMessages(prev => [
              { 
                type: 'server', 
                content: `Pong received (${pingLatency}ms)`, 
                timestamp: data.timestamp || new Date().toISOString() 
              },
              ...prev
            ]);
          } else {
            setMessages(prev => [
              { 
                type: 'server', 
                content: data.message || JSON.stringify(data), 
                timestamp: data.timestamp || new Date().toISOString() 
              },
              ...prev
            ]);
          }
        } catch (e) {
          console.error('Error parsing WebSocket message:', e);
          setMessages(prev => [
            { type: 'error', content: `Failed to parse message: ${event.data}`, timestamp: new Date().toISOString() },
            ...prev
          ]);
        }
      };
      
      newSocket.onclose = () => {
        setStatus('disconnected');
        setMessages(prev => [
          { type: 'system', content: 'Disconnected from server', timestamp: new Date().toISOString() },
          ...prev
        ]);
        // Cleanup
        setSocket(null);
      };
      
      newSocket.onerror = () => {
        setStatus('error');
        setMessages(prev => [
          { type: 'error', content: 'WebSocket connection error', timestamp: new Date().toISOString() },
          ...prev
        ]);
      };
      
      setSocket(newSocket);
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      setStatus('error');
      setMessages(prev => [
        { type: 'error', content: `Failed to create WebSocket: ${error}`, timestamp: new Date().toISOString() },
        ...prev
      ]);
    }
  }, [lastPingTime]);
  
  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      setMessages(prev => [
        { type: 'system', content: 'Manually disconnected', timestamp: new Date().toISOString() },
        ...prev
      ]);
    }
  }, [socket]);
  
  // Send ping to measure latency
  const sendPing = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      setLastPingTime(Date.now());
      socket.send(JSON.stringify({ type: 'ping' }));
      
      setMessages(prev => [
        { type: 'client', content: 'Ping sent', timestamp: new Date().toISOString() },
        ...prev
      ]);
    } else {
      setMessages(prev => [
        { type: 'error', content: 'Cannot send ping: WebSocket is not connected', timestamp: new Date().toISOString() },
        ...prev
      ]);
    }
  }, [socket]);
  
  // Request diagnostics info
  const requestDiagnostics = useCallback(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'diagnostics' }));
      
      setMessages(prev => [
        { type: 'client', content: 'Diagnostics requested', timestamp: new Date().toISOString() },
        ...prev
      ]);
    } else {
      setMessages(prev => [
        { type: 'error', content: 'Cannot request diagnostics: WebSocket is not connected', timestamp: new Date().toISOString() },
        ...prev
      ]);
    }
  }, [socket]);

  // Connect on component mount
  useEffect(() => {
    connect();
    
    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect, socket]);

  // Status indicator component
  const getStatusIndicator = () => {
    switch (status) {
      case 'connecting':
        return (
          <div className="flex items-center text-yellow-500">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            <span>Connecting...</span>
          </div>
        );
      case 'connected':
        return (
          <div className="flex items-center text-green-500">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
            <span>Connected {latency !== null ? `(${latency}ms)` : ''}</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center text-gray-500">
            <div className="h-3 w-3 rounded-full bg-gray-400 mr-2" />
            <span>Disconnected</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-500">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
            <span>Connection Error</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Simplified version when controls are not shown
  if (!showControls) {
    return (
      <div className="flex items-center p-2">
        {getStatusIndicator()}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>WebSocket Status</CardTitle>
        <CardDescription>Connection status with the Visual English server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          {getStatusIndicator()}
        </div>
        
        {messages.length > 0 && (
          <div className="border rounded-md p-2 h-[150px] overflow-y-auto bg-muted/20">
            {messages.slice(0, 10).map((msg, idx) => (
              <div 
                key={idx} 
                className={`text-xs mb-1 p-1 rounded ${msg.type === 'server' ? 'bg-blue-100' : msg.type === 'error' ? 'bg-red-100' : msg.type === 'client' ? 'bg-green-100' : 'bg-gray-100'}`}
              >
                <span className="opacity-70 text-2xs">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                {' '}{msg.content}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        {status !== 'connected' ? (
          <Button onClick={connect} disabled={status === 'connecting'} className="flex-1">
            {status === 'connecting' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Connect
          </Button>
        ) : (
          <Button onClick={disconnect} variant="outline" className="flex-1">Disconnect</Button>
        )}
        <Button 
          onClick={sendPing} 
          disabled={status !== 'connected'} 
          variant="secondary"
          className="flex-1"
        >
          Ping
        </Button>
        <Button 
          onClick={requestDiagnostics} 
          disabled={status !== 'connected'} 
          variant="secondary"
          className="flex-1"
        >
          Diagnostics
        </Button>
      </CardFooter>
    </Card>
  );
}