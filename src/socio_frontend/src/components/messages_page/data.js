const messages = [
    ...Array(20).fill().map((_, i) => ({
        messageId: i + 1,
        sender: `User${i + 1}`,
        message: `This is a message from User${i + 1}`,
        timestamp: `2024-02-24T${String(i + 9).padStart(2, '0')}:00:00Z`
    }))
];  
export default messages;