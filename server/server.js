import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: { origin: '*' }, // Allow all origins (for testing)
});

io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('sendMessage', (message) => {
        console.log('Message received:', message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server on port 3001
httpServer.listen(3001, () => {
    console.log('Socket.io server running on http://localhost:3001');
});
