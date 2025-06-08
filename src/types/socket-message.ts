export interface SocketMessage<T> {
    type:string,
    sender_id:string,
    message:T,
};